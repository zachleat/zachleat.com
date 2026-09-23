import 'dotenv/config';

import { DateTime } from "luxon";
import lodash from 'lodash';
import Fetch from "@11ty/eleventy-fetch";

import getBaseUrl from "../_includes/getBaseUrl.js";
import getSocialMentions, { getPrivateBlueskyAuthors, getBlockedBlueskyAuthors } from "../_11ty/webmentions/social.js";
import getHackerNewsMentions from "../_11ty/webmentions/hackernews.js";
import getLobstersMentions from "../_11ty/webmentions/lobsters.js";
import archive from "../_11ty/webmentions/archive.json" with { type: "json" };

// Social posts from the last N days are refetched on every build
const LIVE_DAYS = 60;
const TOKEN = process.env.WEBMENTION_IO_TOKEN;
const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "2d" : "2h";
const PER_PAGE = 1000;

// Webmentions received after the archive
async function fetchNewWebmentionIo() {
	if(!TOKEN) {
		console.warn('[zachleat.com] unable to fetch webmentions: no access token specified in environment.');
		return [];
	}

	let sinceId = Math.max(...archive.map(entry => entry["wm-id"]));
	let results = [];
	for(let page = 0;; page++) {
		let feed = await Fetch(`https://webmention.io/api/mentions.jf2?domain=www.zachleat.com&token=${TOKEN}&since_id=${sinceId}&per-page=${PER_PAGE}&page=${page}`, {
			type: "json",
			duration: CACHE_DURATION,
		});
		let children = feed?.children || [];
		results.push(...children);
		if(children.length < PER_PAGE) {
			break;
		}
	}

	return results;
}

const isBridgy = entry => entry["wm-source"]?.startsWith("https://brid.gy/");

async function fetchWebmentions() {
	let recent = await fetchNewWebmentionIo().catch(e => {
		console.warn("[zachleat.com] Unable to fetch webmention.io:", e);
		return [];
	});

	// Bridgy copies only supply dates for likes and reposts (the social APIs don’t have them)
	let knownDates = Object.fromEntries([...archive, ...recent.filter(isBridgy)].map(entry => [entry.url, entry["wm-received"]]));
	let blockedAuthors = await getBlockedBlueskyAuthors().catch(e => {
		console.warn("[zachleat.com] Unable to fetch Bluesky blocks:", e);
		return new Set();
	});
	let live = await getSocialMentions({ days: LIVE_DAYS, knownDates, blockedAuthors });
	live.push(...recent.filter(entry => !isBridgy(entry)));
	live.push(...await getHackerNewsMentions().catch(e => {
		console.warn("[zachleat.com] Unable to fetch Hacker News:", e);
		return [];
	}));
	live.push(...await getLobstersMentions().catch(e => {
		console.warn("[zachleat.com] Unable to fetch Lobsters:", e);
		return [];
	}));

	// Live data wins over archived copies of the same like, repost, or reply
	let liveKeys = new Set(live.map(entry => `${entry.url} ${entry["wm-target"]}`));
	let results = [...archive.filter(entry => !liveKeys.has(`${entry.url} ${entry["wm-target"]}`)), ...live];

	results = results.filter(entry => !blockedAuthors.has(entry.author?.url?.toLowerCase()));

	// Keep the mention but not the content of unlisted Mastodon posts or Bluesky authors who hide from logged-out viewers
	let privateAuthors = await getPrivateBlueskyAuthors(results);
	results = results.map(entry => entry.visibility && entry.visibility !== "public" || privateAuthors.has(entry.author?.url) ? { ...entry, content: undefined, "content-hidden": true } : entry);

	if(process.env.ELEVENTY_RUN_MODE === "build") {
		console.log( `[zachleat.com] Found ${results.length} total webmentions (${live.length} live).` );
	}

	return results;
}

export default async function({ eleventy }) {
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
