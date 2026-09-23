import fs from "node:fs";
import crypto from "node:crypto";
import Fetch from "@11ty/eleventy-fetch";
import sanitizeHTML from "sanitize-html";
import { decode } from "html-entities";

const BLUESKY_API = "https://public.api.bsky.app/xrpc";
const BLUESKY_ACTOR = "zachleat.com";
const MASTODON_API = "https://fediverse.zachleat.com/api/v1";
const MASTODON_ACCOUNT_ID = "109286461031266152";
const SITE_HOSTNAMES = ["www.zachleat.com", "zachleat.com"];
const STORE_URL = new URL("./social.json", import.meta.url);

const RECENT = process.env.ELEVENTY_RUN_MODE === "serve" ? "2d" : "2h";
const OLD = "1w";
const RECENT_WINDOW = 1000 * 60 * 60 * 24 * 30;

const getDuration = date => Date.now() - new Date(date).getTime() < RECENT_WINDOW ? RECENT : OLD;

export function getTargets(urls = []) {
	let targets = new Set();
	for(let url of urls) {
		try {
			let { hostname, pathname } = new URL(url);
			if(SITE_HOSTNAMES.includes(hostname)) {
				targets.add(`https://www.zachleat.com${pathname}`);
			}
		} catch(e) {}
	}
	return [...targets];
}

function htmlToText(html = "") {
	html = html.replace(/<\/p>\s*<p>/g, "\n\n").replace(/<br\s*\/?>/g, "\n");
	return decode(sanitizeHTML(html, { allowedTags: [], allowedAttributes: {} })).trim();
}

// Matches webmention.io’s jf2 shape so the templates keep working
export function toEntry({ url, target, property, author, published, received, text, parent, visibility }) {
	let entry = {
		type: "entry",
		author: { type: "card", ...author },
		url,
		published: published || null,
		"wm-received": received,
		"wm-id": crypto.createHash("sha1").update(`${url} ${target}`).digest("hex").slice(0, 12),
		"wm-source": url,
		"wm-target": target,
		"wm-property": property,
	};
	if(text) {
		entry.content = { text };
	}
	if(parent) {
		entry["in-reply-to"] = parent;
	}
	if(visibility) {
		entry.visibility = visibility;
	}
	return entry;
}

/* Bluesky */

async function bluesky(method, params, duration) {
	let url = new URL(`${BLUESKY_API}/${method}`);
	for(let [key, value] of Object.entries(params)) {
		if(value) {
			url.searchParams.set(key, value);
		}
	}
	return Fetch(url.toString(), { type: "json", duration });
}

async function blueskyPaginate(method, params, key, duration) {
	let results = [];
	let cursor;
	do {
		let json = await bluesky(method, { ...params, cursor, limit: 100 }, duration);
		results.push(...(json[key] || []));
		cursor = json.cursor;
	} while(cursor);
	return results;
}

const blueskyAuthor = actor => ({
	name: actor.displayName || actor.handle,
	photo: actor.avatar || "",
	url: `https://bsky.app/profile/${actor.handle}`,
});

const blueskyPostUrl = post => `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split("/").pop()}`;

function getBlueskyLinks(post) {
	let embed = post.embed?.media || post.embed;
	return [
		embed?.external?.uri,
		...(post.record.facets || []).flatMap(facet => facet.features.map(feature => feature.uri)),
	].filter(Boolean);
}

async function getBlueskyPosts(since) {
	let posts = [];
	let cursor;
	do {
		let json = await bluesky("app.bsky.feed.getAuthorFeed", { actor: BLUESKY_ACTOR, filter: "posts_with_replies", limit: 100, cursor }, cursor ? OLD : RECENT);
		for(let { post, reason } of json.feed || []) {
			if(reason || post.author.handle !== BLUESKY_ACTOR) {
				continue;
			}
			if(new Date(post.record.createdAt) < since) {
				return posts;
			}
			posts.push(post);
		}
		cursor = json.cursor;
	} while(cursor);
	return posts;
}

// Parent is the url of the reply being replied to (unset for direct replies to the root post)
async function getBlueskyReplies(uri, duration) {
	let { thread } = await bluesky("app.bsky.feed.getPostThread", { uri, depth: 1000, parentHeight: 0 }, duration);
	let flatten = (node, parent) => (node?.replies || []).filter(reply => reply.post).flatMap(reply => [{ reply: reply.post, parent }, ...flatten(reply, blueskyPostUrl(reply.post))]);
	return flatten(thread);
}

async function getBlueskyMentions(since) {
	let byPost = {};
	for(let post of await getBlueskyPosts(since)) {
		let targets = getTargets(getBlueskyLinks(post));
		if(!targets.length) {
			continue;
		}

		let duration = getDuration(post.record.createdAt);
		let postUrl = blueskyPostUrl(post);
		let params = { uri: post.uri };
		let entries = [];
		byPost[postUrl] = { date: post.record.createdAt, entries };

		let likes = post.likeCount ? await blueskyPaginate("app.bsky.feed.getLikes", params, "likes", duration) : [];
		let reposts = post.repostCount ? await blueskyPaginate("app.bsky.feed.getRepostedBy", params, "repostedBy", duration) : [];
		let quotes = post.quoteCount ? await blueskyPaginate("app.bsky.feed.getQuotes", params, "posts", duration) : [];
		let replies = post.replyCount ? await getBlueskyReplies(post.uri, duration) : [];

		for(let target of targets) {
			if(!post.record.reply) {
				entries.push(toEntry({ url: postUrl, target, property: "syndication", author: blueskyAuthor(post.author), published: post.record.createdAt, received: post.record.createdAt, text: post.record.text }));
			}
			for(let { actor, createdAt } of likes) {
				entries.push(toEntry({ url: `${postUrl}#liked_by_${actor.did}`, target, property: "like-of", author: blueskyAuthor(actor), received: createdAt }));
			}
			for(let actor of reposts) {
				entries.push(toEntry({ url: `${postUrl}#reposted_by_${actor.did}`, target, property: "repost-of", author: blueskyAuthor(actor) }));
			}
			for(let quote of quotes) {
				entries.push(toEntry({ url: blueskyPostUrl(quote), target, property: "mention-of", author: blueskyAuthor(quote.author), published: quote.record.createdAt, received: quote.indexedAt, text: quote.record.text }));
			}
			for(let { reply, parent } of replies) {
				entries.push(toEntry({ url: blueskyPostUrl(reply), target, property: "in-reply-to", author: blueskyAuthor(reply.author), published: reply.record.createdAt, received: reply.indexedAt, text: reply.record.text, parent }));
			}
		}
	}
	return byPost;
}

/* Mastodon */

async function mastodonPaginate(url, duration) {
	let results = [];
	while(url) {
		let response = await Fetch(url, { type: "json", duration, returnType: "response" });
		results.push(...response.body);
		url = response.headers?.link?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
	}
	return results;
}

const mastodonAuthor = account => ({
	name: account.display_name || account.username,
	photo: account.avatar || "",
	url: account.url,
});

const getMastodonLinks = status => [status.card?.url, ...[...status.content.matchAll(/href="([^"]+)"/g)].map(match => decode(match[1]))];

async function getMastodonPosts(since) {
	let posts = [];
	let maxId;
	while(true) {
		let url = `${MASTODON_API}/accounts/${MASTODON_ACCOUNT_ID}/statuses?exclude_reblogs=true&limit=40${maxId ? `&max_id=${maxId}` : ""}`;
		let statuses = await Fetch(url, { type: "json", duration: maxId ? OLD : RECENT });
		if(!statuses.length) {
			return posts;
		}
		for(let status of statuses) {
			if(new Date(status.created_at) < since) {
				return posts;
			}
			posts.push(status);
		}
		maxId = statuses.at(-1).id;
	}
}

async function getMastodonReplies(id, duration) {
	return (await Fetch(`${MASTODON_API}/statuses/${id}/context`, { type: "json", duration })).descendants;
}

async function getMastodonMentions(since) {
	let byPost = {};
	for(let status of await getMastodonPosts(since)) {
		let targets = getTargets(getMastodonLinks(status));
		if(!targets.length) {
			continue;
		}

		let duration = getDuration(status.created_at);
		let statusApi = `${MASTODON_API}/statuses/${status.id}`;
		let entries = [];
		byPost[status.url] = { date: status.created_at, entries };
		let likes = status.favourites_count ? await mastodonPaginate(`${statusApi}/favourited_by?limit=80`, duration) : [];
		let reposts = status.reblogs_count ? await mastodonPaginate(`${statusApi}/reblogged_by?limit=80`, duration) : [];
		let replies = status.replies_count ? (await Fetch(`${statusApi}/context`, { type: "json", duration })).descendants : [];

		for(let target of targets) {
			if(!status.in_reply_to_id) {
				entries.push(toEntry({ url: status.url, target, property: "syndication", author: mastodonAuthor(status.account), published: status.created_at, received: status.created_at, text: htmlToText(status.content) }));
			}
			for(let account of likes) {
				entries.push(toEntry({ url: `${status.url}#favorited-by-${account.id}`, target, property: "like-of", author: mastodonAuthor(account) }));
			}
			for(let account of reposts) {
				entries.push(toEntry({ url: `${status.url}#reblogged-by-${account.id}`, target, property: "repost-of", author: mastodonAuthor(account) }));
			}
			let replyUrls = Object.fromEntries(replies.map(reply => [reply.id, reply.url]));
			for(let reply of replies) {
				entries.push(toEntry({ url: reply.url, target, property: "in-reply-to", author: mastodonAuthor(reply.account), published: reply.created_at, received: reply.created_at, text: htmlToText(reply.content), parent: replyUrls[reply.in_reply_to_id], visibility: reply.visibility }));
			}
		}
	}
	return byPost;
}

/* Bluesky authors who hide from logged-out viewers */

export async function getPrivateBlueskyAuthors(entries) {
	let byHandle = {};
	for(let entry of entries) {
		let match = entry.content?.text && entry.author?.url?.match(/^https:\/\/bsky\.app\/profile\/([^/]+)$/);
		if(match) {
			byHandle[match[1]] = entry.author.url;
		}
	}

	let handles = Object.keys(byHandle);
	let privateUrls = new Set();
	for(let i = 0; i < handles.length; i += 25) {
		let url = new URL(`${BLUESKY_API}/app.bsky.actor.getProfiles`);
		for(let handle of handles.slice(i, i + 25)) {
			url.searchParams.append("actors", handle);
		}
		try {
			let { profiles } = await Fetch(url.toString(), { type: "json", duration: OLD });
			for(let profile of profiles) {
				let authorUrl = byHandle[profile.handle] || byHandle[profile.did];
				if(authorUrl && profile.labels?.some(label => label.val === "!no-unauthenticated")) {
					privateUrls.add(authorUrl);
				}
			}
		} catch(e) {
			console.warn("[zachleat.com] Unable to fetch Bluesky profiles:", e.message);
		}
	}
	return privateUrls;
}

/* Social posts older than the rolling window are kept in a source controlled store (written by local builds) */

function readStore() {
	try {
		return JSON.parse(fs.readFileSync(STORE_URL, "utf8"));
	} catch(e) {
		return {};
	}
}

export default async function getSocialMentions({ days, knownDates = {} }) {
	let since = new Date(Date.now() - days * 1000 * 60 * 60 * 24);
	let results = await Promise.allSettled([getBlueskyMentions(since), getMastodonMentions(since)]);

	let store = readStore();
	let storedDates = Object.fromEntries(Object.values(store).flat().map(entry => [entry.url, entry["wm-received"]]));
	let now = new Date().toISOString().replace(/\.\d+Z$/, "Z");

	let updated = { ...store };
	for(let result of results) {
		if(result.status !== "fulfilled") {
			console.warn("[zachleat.com] Unable to fetch social mentions:", result.reason);
			continue;
		}
		for(let [postUrl, { date, entries }] of Object.entries(result.value)) {
			// Likes and reposts have no date: new ones on a tracked post are dated when first seen, backlog on a newly tracked post uses the post’s date
			let fallback = store[postUrl] ? now : date;
			for(let entry of entries) {
				entry["wm-received"] ||= knownDates[entry.url] || storedDates[entry.url] || fallback;
			}
			updated[postUrl] = entries;
		}
	}

	// Stored Mastodon replies from before visibility was recorded
	for(let [postUrl, entries] of Object.entries(updated)) {
		if(!postUrl.startsWith("https://fediverse.zachleat.com/") || !entries.some(entry => entry["wm-property"] === "in-reply-to" && !entry.visibility)) {
			continue;
		}
		try {
			let visibilities = Object.fromEntries((await getMastodonReplies(postUrl.split("/").pop(), OLD)).map(reply => [reply.url, reply.visibility]));
			for(let entry of entries) {
				if(entry["wm-property"] === "in-reply-to" && visibilities[entry.url]) {
					entry.visibility = visibilities[entry.url];
				}
			}
		} catch(e) {}
	}

	updated = Object.fromEntries(Object.entries(updated).sort(([a], [b]) => a.localeCompare(b)));
	let json = JSON.stringify(updated, null, "\t");
	if(json !== JSON.stringify(store, null, "\t")) {
		try {
			fs.writeFileSync(STORE_URL, json);
		} catch(e) {}
	}

	return Object.values(updated).flat();
}
