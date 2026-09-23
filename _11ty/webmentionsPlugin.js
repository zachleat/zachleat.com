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

	// Matches @user, @user.bsky.social, and @user@instance.social (but not emails)
	const handlePattern = "[\\w-]+(?:\\.[\\w-]+)*(?:@[\\w-]+(?:\\.[\\w-]+)+)?";
	const mentionRegex = new RegExp(`(^|[^\\w@/.])@(${handlePattern})`, "g");
	const leadingMentionsRegex = new RegExp(`^\\s*((?:@${handlePattern}(?:\\s+|$))+)`);

	const toPill = handle => `<span class="static-comments-mention">${handle}</span>`;

	eleventyConfig.addFilter('webmentionMentionPills', (text = "") => {
		let replyingTo = "";
		text = text.replace(leadingMentionsRegex, (match, mentions) => {
			let handles = mentions.trim().split(/\s+/).map(handle => toPill(handle.slice(1)));
			replyingTo = `<span class="static-comments-replying-to">Replying to ${handles.join(" ")}</span>`;
			return "";
		});

		return replyingTo + text.replace(mentionRegex, (match, prefix, handle) => `${prefix}${toPill(handle)}`);
	});

	const authorUrls = [
		"https://bsky.app/profile/zachleat.com",
		"https://fediverse.zachleat.com/@zachleat",
		"https://twitter.com/zachleat",
	];
	const authorDisqusNames = ["Zach Leatherman", "zachleat"];

	eleventyConfig.addFilter('webmentionIsOriginalPoster', webmention => isOriginalPoster(webmention));

	eleventyConfig.addFilter('commentIsOriginalPoster', (comment) => {
		return authorDisqusNames.includes(comment?.author);
	});

	const isOriginalPoster = webmention => authorUrls.includes(webmention?.author?.url);

	const getLeadingMentions = (text = "") => {
		let match = text.match(leadingMentionsRegex);
		return match ? match[1].trim().split(/\s+/).map(handle => handle.slice(1).toLowerCase()) : [];
	};

	// e.g. bsky.app/profile/user.bsky.social, twitter.com/user, instance.social/@user
	const getAuthorHandles = (webmention) => {
		try {
			let url = new URL(webmention?.author?.url);
			let [first, second] = url.pathname.split("/").filter(Boolean);
			if(url.hostname === "bsky.app" && first === "profile") {
				return [second.toLowerCase()];
			}
			if(first?.startsWith("@")) {
				let user = first.slice(1).toLowerCase();
				return [user, `${user}@${url.hostname}`];
			}
			if(first) {
				return [first.toLowerCase()];
			}
		} catch(e) {}
		return [];
	};

	// Nests my own replies under the most recent earlier comment by the first person I mention
	eleventyConfig.addFilter('webmentionThreads', (webmentions = []) => {
		let nodes = webmentions.map(entry => ({ ...entry, replies: [] }));
		let threads = [];
		nodes.forEach((node, index) => {
			let parent;
			if(isOriginalPoster(node)) {
				let mentions = getLeadingMentions(node.content?.text);
				for(let mention of mentions) {
					parent = nodes.slice(0, index).reverse().find(candidate => getAuthorHandles(candidate).includes(mention));
					if(parent) {
						break;
					}
				}
			}
			(parent ? parent.replies : threads).push(node);
		});
		return threads;
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

	eleventyConfig.addFilter('webmentionPlatformIcon', webmention => getPlatformIcon(webmention));

	function getPlatformIcon(webmention) {
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
	}

	const isBlocked = entry => webmentionBlockList.some(blockedUrl => `${entry.url}`.includes(blockedUrl));

	// Nearby webmentions on the same post are grouped into one row
	const groupCountKeys = { "like-of": "likes", "repost-of": "reposts", "bookmark-of": "bookmarks", "in-reply-to": "replies", "mention-of": "mentions" };
	const GROUP_WINDOW = 1000 * 60 * 60 * 24;
	const getDateString = entry => entry.published || entry['wm-received'];
	// Dates without an offset are UTC
	const getDate = entry => {
		let str = getDateString(entry) || "";
		return new Date(/(Z|[+-]\d\d:?\d\d)$/.test(str) ? str : `${str}Z`).getTime() || 0;
	};

	const addCounts = (group, counts) => {
		for(let key in counts) {
			group[key] += counts[key];
		}
	};

	// Newest sitewide activity (excluding my own), with nearby webmentions on the same post grouped together
	// Cached per webmentions object, this runs on every page
	let recentActivityCache = new WeakMap();
	eleventyConfig.addFilter('webmentionsRecentActivity', (webmentions, limit = 8) => {
		if(!webmentions) {
			return [];
		}
		let cached = recentActivityCache.get(webmentions)?.[limit];
		if(cached) {
			return cached;
		}

		let entries = Object.entries(webmentions?.mentions || {})
			.flatMap(([target, list]) => list.map(webmention => ({ target, webmention, time: getDate(webmention) })))
			.filter(({ target, webmention }) => getBaseUrl(webmention['wm-target']) === target && !isOriginalPoster(webmention) && !isBlocked(webmention))
			.sort((a, b) => b.time - a.time);

		let items = [];
		let openGroups = {};
		let knownUrls = new Set();
		let knownAuthors = new Set();
		for(let { target, webmention, time } of entries) {
			let type = webmention['wm-property'];
			// Hacker News submissions count their points and comments
			let counts = webmention['hn-points'] != null ? { likes: webmention['hn-points'], replies: webmention['hn-comments'] } : groupCountKeys[type] && { [groupCountKeys[type]]: 1 };
			if(!counts) {
				continue;
			}

			if(webmention.url) {
				if(knownUrls.has(webmention.url)) {
					continue;
				}
				knownUrls.add(webmention.url);
			}

			// Each person shows up once
			let author = webmention.author?.url || webmention.author?.name;
			if(author) {
				if(knownAuthors.has(author)) {
					continue;
				}
				knownAuthors.add(author);
			}

			let group = openGroups[target];
			if(group && group.time - time > GROUP_WINDOW) {
				group = openGroups[target] = undefined;
			}
			// Back-to-back rows for the same post are combined
			if(!group && items.at(-1)?.target === target) {
				group = openGroups[target] = items.at(-1);
			}

			if(group) {
				group.webmentions.push(webmention);
				addCounts(group, counts);
				continue;
			}

			if(items.length >= limit) {
				if(Object.values(openGroups).some(group => group && group.time - time <= GROUP_WINDOW)) {
					continue;
				}
				break;
			}

			let date = new Date(time).toISOString();
			group = openGroups[target] = { type: "group", target, date, time, webmentions: [webmention], likes: 0, reposts: 0, bookmarks: 0, replies: 0, mentions: 0 };
			addCounts(group, counts);
			items.push(group);
		}

		recentActivityCache.set(webmentions, { ...recentActivityCache.get(webmentions), [limit]: items });
		return items;
	});

	const platformNames = {
		"fab:bluesky": "Bluesky",
		"fab:mastodon": "Mastodon",
		"fab:hacker-news": "Hacker News",
	};
	const getPlatformName = webmention => platformNames[getPlatformIcon(webmention)] || "the web";

	eleventyConfig.addFilter('webmentionPlatformName', getPlatformName);

	// e.g. "Bluesky, Mastodon, or Hacker News"
	eleventyConfig.addFilter('webmentionPlatformNames', (webmentions = []) => {
		let found = new Set(webmentions.map(getPlatformName));
		let names = [...Object.values(platformNames), "the web"].filter(name => found.has(name));
		if(names.length < 3) {
			return names.join(" or ");
		}
		return `${names.slice(0, -1).join(", ")}, or ${names.at(-1)}`;
	});

	// My own social posts that share a url (only the earliest per platform)
	eleventyConfig.addFilter('webmentionSyndication', (webmentions, url, includeHackerNews = true) => {
		let seenPlatforms = new Set();
		return (webmentions?.mentions?.[url] || [])
			.filter(entry => entry['wm-property'] === "syndication" && (entry['hn-points'] == null || includeHackerNews && entry['hn-comments'] > 0))
			// Hacker News last
			.sort((a, b) => (a['hn-points'] != null) - (b['hn-points'] != null) || getDate(a) - getDate(b))
			.filter(entry => {
				if(!isOriginalPoster(entry)) {
					return true;
				}
				let platform = getPlatformName(entry);
				if(seenPlatforms.has(platform)) {
					return false;
				}
				seenPlatforms.add(platform);
				return true;
			});
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
				let bdate = b.published || b['wm-received'];
				if(bdate < adate) {
					return 1;
				} else if(bdate > adate) {
					return -1;
				}
				return 0;
			});
	});
};
