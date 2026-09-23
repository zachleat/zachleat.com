// One-time backfill of my own Bluesky/Mastodon posts that link to the site: node _11ty/webmentions/backfill-syndication.js 2025-01-01
import fs from "node:fs";
import { STORE_URL, toEntry, getTargets, htmlToText, blueskyAuthor, blueskyPostUrl, getBlueskyLinks, getBlueskyPosts, mastodonAuthor, getMastodonLinks, getMastodonPosts } from "./social.js";

const since = new Date(process.argv[2] || "2025-01-01");
const store = JSON.parse(fs.readFileSync(STORE_URL, "utf8"));
let added = 0;

function add(postUrl, entries) {
	if(!entries.length || store[postUrl]) {
		return;
	}
	store[postUrl] = entries;
	added++;
}

for(let post of await getBlueskyPosts(since)) {
	if(post.record.reply) {
		continue;
	}
	let postUrl = blueskyPostUrl(post);
	add(postUrl, getTargets(getBlueskyLinks(post)).map(target => toEntry({ url: postUrl, target, property: "syndication", author: blueskyAuthor(post.author), published: post.record.createdAt, received: post.record.createdAt, text: post.record.text })));
}

for(let status of await getMastodonPosts(since)) {
	if(status.in_reply_to_id) {
		continue;
	}
	add(status.url, getTargets(getMastodonLinks(status)).map(target => toEntry({ url: status.url, target, property: "syndication", author: mastodonAuthor(status.account), published: status.created_at, received: status.created_at, text: htmlToText(status.content) })));
}

let sorted = Object.fromEntries(Object.entries(store).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(STORE_URL, JSON.stringify(sorted, null, "\t"));
console.log(`Added ${added} social posts.`);
