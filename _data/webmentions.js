import 'dotenv/config';

import fs from "node:fs";
import { DateTime } from "luxon";
import lodash from 'lodash';
import { AssetCache } from "@11ty/eleventy-fetch";

import getBaseUrl from "../_includes/getBaseUrl.js";
import getSocialMentions, { getPrivateBlueskyAuthors, getBlockedBlueskyAuthors, htmlToText } from "../_11ty/webmentions/social.js";
import getHackerNewsMentions from "../_11ty/webmentions/hackernews.js";
import getLobstersMentions from "../_11ty/webmentions/lobsters.js";
import getYoutubeMentions from "../_11ty/webmentions/youtube.js";

// Social posts from the last N days are refetched on every build
const LIVE_DAYS = 60;
const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "2d" : "2h";
// Mentions of urls without a template, from _11ty/webmentions/import.js
const LEFTOVERS_FILE = "_11ty/webmentions/leftovers.json";
const IGNORED_DIRECTORIES = ["node_modules", "_site", ".cache", ".git", "_data", "_11ty"];
const PROPERTIES = { likes: "like-of", reposts: "repost-of", bookmarks: "bookmark-of" };
const COMMENT_PROPERTIES = { reply: "in-reply-to", mention: "mention-of" };

// Imported items back to webmention.io’s jf2 shape so the templates keep working
function toEntry(item, key) {
	let property = key === "comments" ? COMMENT_PROPERTIES[item.type] : PROPERTIES[key];
	if(!property || !item.target) {
		return;
	}
	let { avatarUrl, ...author } = item.author || {};
	let entry = {
		type: "entry",
		author: { type: "card", ...author, photo: avatarUrl || "" },
		url: item.url,
		published: item.date,
		"wm-received": item.date,
		"wm-id": item.id,
		"wm-source": item.source,
		"wm-target": item.target,
		"wm-property": property,
	};
	if(item.private) {
		entry["content-hidden"] = true;
	} else if(item.content) {
		entry.content = { text: htmlToText(item.content) };
	}
	return entry;
}

// webmention.io data files written next to templates by _11ty/webmentions/import.js
function getImportedWebmentions() {
	let entries = [];
	let missingTargets = 0;
	let files = fs.globSync("**/*.json", { exclude: path => IGNORED_DIRECTORIES.includes(path) || path.endsWith("package.json") || path.endsWith("package-lock.json") });
	if(fs.existsSync(LEFTOVERS_FILE)) {
		files.push(LEFTOVERS_FILE);
	}
	for(let file of files) {
		let data = JSON.parse(fs.readFileSync(file, "utf8"));
		for(let key of ["comments", ...Object.keys(PROPERTIES)]) {
			if(!Array.isArray(data?.[key])) {
				continue;
			}
			for(let item of data[key]) {
				if(item.via !== "webmention") {
					continue;
				}
				let entry = toEntry(item, key);
				if(entry) {
					entries.push(entry);
				} else if(!item.target) {
					missingTargets++;
				}
			}
		}
	}
	if(missingTargets) {
		console.warn(`[zachleat.com] Skipped ${missingTargets} imported webmentions without a target (rerun the import with @11ty/import that keeps \`target\`).`);
	}
	return entries;
}

async function fetchWebmentions() {
	let imported = getImportedWebmentions();

	// Bridgy copies only supply dates for likes and reposts (the social APIs don’t have them)
	let knownDates = Object.fromEntries(imported.map(entry => [entry.url, entry["wm-received"]]));
	let blockedAuthors = await getBlockedBlueskyAuthors().catch(e => {
		console.warn("[zachleat.com] Unable to fetch Bluesky blocks:", e);
		return new Set();
	});
	let live = await getSocialMentions({ days: LIVE_DAYS, knownDates, blockedAuthors });
	live.push(...await getHackerNewsMentions().catch(e => {
		console.warn("[zachleat.com] Unable to fetch Hacker News:", e);
		return [];
	}));
	live.push(...await getLobstersMentions().catch(e => {
		console.warn("[zachleat.com] Unable to fetch Lobsters:", e);
		return [];
	}));
	live.push(...await getYoutubeMentions().catch(e => {
		console.warn("[zachleat.com] Unable to fetch YouTube:", e);
		return [];
	}));

	// Live data wins over imported copies of the same like, repost, or reply
	let liveKeys = new Set(live.map(entry => `${entry.url} ${entry["wm-target"]}`));
	let results = [...imported.filter(entry => !liveKeys.has(`${entry.url} ${entry["wm-target"]}`)), ...live];

	results = results.filter(entry => !blockedAuthors.has(entry.author?.url?.toLowerCase()));

	// Keep the mention but not the content of unlisted Mastodon posts or Bluesky authors who hide from logged-out viewers
	let privateAuthors = await getPrivateBlueskyAuthors(results);
	results = results.map(entry => entry.visibility && entry.visibility !== "public" || privateAuthors.has(entry.author?.url) ? { ...entry, content: undefined, images: undefined, "content-hidden": true } : entry);

	if(process.env.ELEVENTY_RUN_MODE === "build") {
		console.log( `[zachleat.com] Found ${results.length} total webmentions (${live.length} live).` );
	}

	return results;
}

// Stored on globalThis so re-imports during --serve rebuilds reuse it
const SERVE_CACHE_KEY = Symbol.for("zachleat.com/webmentions");

export default async function(data) {
	if(process.env.PRODUCTION_BUILD) {
		return getWebmentions(data);
	}
	if(process.env.ELEVENTY_RUN_MODE !== "serve") {
		return getDiskCachedWebmentions(data);
	}
	if(!globalThis[SERVE_CACHE_KEY]) {
		globalThis[SERVE_CACHE_KEY] = getDiskCachedWebmentions(data).catch(e => {
			delete globalThis[SERVE_CACHE_KEY];
			throw e;
		});
	}
	return globalThis[SERVE_CACHE_KEY];
}

// Processed results are cached to disk outside of production builds
async function getDiskCachedWebmentions(data) {
	let asset = new AssetCache("zachleat_webmentions_processed");
	if(asset.isCacheValid(CACHE_DURATION)) {
		return Object.freeze(await asset.getCachedValue());
	}
	let webmentions = await getWebmentions(data);
	await asset.save(webmentions, "json");
	return webmentions;
}

async function getWebmentions({ eleventy }) {
	let webmentionsResults = await fetchWebmentions();

	let mentions = {};
	for(let webmention of webmentionsResults) {
		let url = getBaseUrl(webmention["wm-target"]);
		if(!mentions[url]) {
			mentions[url] = [];
		}

		mentions[url].push(webmention);
	}

	let totalCount = 0;
	for(let url in mentions) {
		mentions[url] = lodash.uniqBy(mentions[url], function(entry) {
			return entry["wm-id"];
		});

		totalCount += mentions[url].length;
		mentions[url].sort((a, b) => {
			return DateTime.fromISO(b.published || b["wm-received"], { zone: "utc" }).toJSDate().getTime() - DateTime.fromISO(a.published || a["wm-received"], { zone: "utc" }).toJSDate().getTime();
		});
	}

	// IF YOU’RE WANTING TO FILTER A HOST OUT OF BEING LISTED IN WEBMENTIONS
	// DO THIS IN .eleventy.js -> webmentionsForUrl filter
	// Frozen so Eleventy shares one object across pages instead of copying it (keeps filter caches warm)
	return Object.freeze({
		count: totalCount,
		mentions,
	});
}
