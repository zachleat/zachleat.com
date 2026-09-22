import sanitizeHTML from "sanitize-html";

import webmentionBlockList from "../_data/webmentionsBlockList.json" with { type: "json" };
import getBaseUrl from "../_includes/getBaseUrl.js";

export default function(eleventyConfig) {

	const allowedHTML = {
		allowedTags: ['b', 'i', 'em', 'strong', 'a'],
		allowedAttributes: {
			a: ['href']
		}
	};

	eleventyConfig.addLiquidFilter('sanitizeHTML', content => {
		return content ? sanitizeHTML(content, allowedHTML) : "";
	});

	eleventyConfig.addFilter('webmentionIsType', (webmention, type) => {
		return type === webmention['wm-property'];
	});

	const platformIcons = {
		bluesky: "fab:bluesky",
		mastodon: "fab:mastodon",
		twitter: "fab:x-twitter",
		github: "fab:github",
		reddit: "fab:reddit",
		hackernews: "fab:hacker-news",
		flickr: "fab:flickr",
		instagram: "fab:instagram",
		facebook: "fab:facebook",
	};

	const platformHostnames = {
		"bsky.app": "bluesky",
		"twitter.com": "twitter",
		"x.com": "twitter",
		"github.com": "github",
		"www.reddit.com": "reddit",
		"reddit.com": "reddit",
		"news.ycombinator.com": "hackernews",
	};

	eleventyConfig.addFilter('webmentionPlatformIcon', (webmention) => {
		try {
			let source = new URL(webmention['wm-source']);
			if(source.hostname === "brid.gy") {
				// e.g. https://brid.gy/comment/mastodon/…
				let platform = source.pathname.split("/")[2];
				if(platformIcons[platform]) {
					return platformIcons[platform];
				}
			} else if(source.hostname === "ap.brid.gy") {
				return platformIcons.mastodon;
			}
		} catch(e) {}

		try {
			let url = new URL(webmention.url);
			let platform = platformHostnames[url.hostname];
			if(platform) {
				return platformIcons[platform];
			}
			// Mastodon-style profile paths
			if(url.pathname.startsWith("/@")) {
				return platformIcons.mastodon;
			}
		} catch(e) {}

		return "fas:globe";
	});

	eleventyConfig.addFilter('webmentionsForUrl', (webmentions, url, allowedTypes) => {
		if( !allowedTypes ) {
			// all types
			allowedTypes = ['mention-of', 'in-reply-to', 'like-of', 'repost-of', 'bookmark-of'];
		} else {
			allowedTypes = allowedTypes.split(",");
		}

		if(!url || !webmentions.mentions || !webmentions.mentions[url]) {
			return [];
		}

		let knownUrls = {};
		return webmentions.mentions[url]
			.filter(entry => {
				if(!allowedTypes.includes(entry['wm-property'])) {
					return false;
				}

				if(webmentionBlockList.filter(blockedUrl => {
					return `${entry.url}`.startsWith(blockedUrl) || entry.url.indexOf(blockedUrl) > -1
				}).length > 0) {
					return false;
				}
				if(getBaseUrl(entry['wm-target']) !== url) {
					return false;
				}
				// no dupes
				if(entry.url) {
					if(knownUrls[entry.url]) {
						return false;
					}
					knownUrls[entry.url] = true;
				}
				return true;
			}).sort((a, b) => {
				// Show oldest entries first
				let adate = a.published || a['wm-received'];
				let bdate = b.published || a['wm-received'];
				if(bdate < adate) {
					return 1;
				} else if(bdate > adate) {
					return -1;
				}
				return 0;
			});
	});
};
