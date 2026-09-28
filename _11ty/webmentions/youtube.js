import fs from "node:fs";
import path from "node:path";
import Fetch from "@11ty/eleventy-fetch";
import { toEntry } from "./social.js";

const API_KEY = process.env.YOUTUBE_API_KEY;
const POSTS_DIR = "./_posts/";

// Post urls keyed by the `metadata.youtubeId` in their front matter
function getYoutubePosts() {
	let posts = {};
	for(let filename of fs.readdirSync(POSTS_DIR)) {
		if(!filename.endsWith(".md")) {
			continue;
		}
		let frontMatter = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8").split(/^---$/m)[1] || "";
		let youtubeId = frontMatter.match(/^\s+youtubeId:\s*['"]?([\w-]+)/m)?.[1];
		if(youtubeId) {
			let fileSlug = path.parse(filename).name.replace(/^\d{4}-\d{2}-\d{2}-/, "");
			let permalink = frontMatter.match(/^permalink:\s*['"]?([^'"\s]+)/m)?.[1] || `/web/${fileSlug}/`;
			posts[youtubeId] = `https://www.zachleat.com${permalink}`;
		}
	}
	return posts;
}

const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "2d" : "2h";

async function youtube(method, params) {
	let url = new URL(`https://www.googleapis.com/youtube/v3/${method}`);
	for(let [key, value] of Object.entries({ ...params, key: API_KEY })) {
		if(value) {
			url.searchParams.set(key, value);
		}
	}
	return Fetch(url.toString(), {
		type: "json",
		duration: CACHE_DURATION,
	});
}

// Every page of a list endpoint
async function youtubeAll(method, params) {
	let items = [];
	let pageToken;
	do {
		let json = await youtube(method, { ...params, maxResults: 100, pageToken });
		items.push(...(json.items || []));
		pageToken = json.nextPageToken;
	} while(pageToken);
	return items;
}

function toCommentEntry(comment, videoId, target, parent) {
	let { snippet } = comment;
	return toEntry({
		url: `https://www.youtube.com/watch?v=${videoId}&lc=${comment.id}`,
		target,
		property: "in-reply-to",
		author: { name: snippet.authorDisplayName, photo: snippet.authorProfileImageUrl || "", url: snippet.authorChannelUrl?.replace(/^http:/, "https:") },
		published: snippet.publishedAt,
		received: snippet.publishedAt,
		text: snippet.textDisplay,
		parent,
	});
}

// Comments and their replies, nested under the video
async function getComments(videoId, target) {
	let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
	let threads = await youtubeAll("commentThreads", { part: "snippet,replies", videoId, textFormat: "plainText" });
	let entries = [];
	for(let thread of threads) {
		let topLevel = toCommentEntry(thread.snippet.topLevelComment, videoId, target, videoUrl);
		entries.push(topLevel);
		// Threads only include a few replies
		let replies = thread.replies?.comments || [];
		if(thread.snippet.totalReplyCount > replies.length) {
			replies = await youtubeAll("comments", { part: "snippet", parentId: thread.id, textFormat: "plainText" });
		}
		entries.push(...replies.map(reply => toCommentEntry(reply, videoId, target, topLevel.url)));
	}
	return entries;
}

// Likes on videos embedded in posts (counted like story submission points) and their comments
export default async function getYoutubeMentions() {
	if(!API_KEY) {
		console.warn("[zachleat.com] unable to fetch YouTube stats: no YOUTUBE_API_KEY specified in environment.");
		return [];
	}

	let posts = getYoutubePosts();
	let ids = Object.keys(posts);
	let videos = [];
	// 50 ids per request is the API maximum
	for(let i = 0; i < ids.length; i += 50) {
		let { items = [] } = await youtube("videos", { part: "snippet,statistics", id: ids.slice(i, i + 50).join(",") });
		videos.push(...items);
	}

	let comments = [];
	for(let video of videos.filter(video => Number(video.statistics?.commentCount) > 0)) {
		// Comments can be disabled per video
		comments.push(...await getComments(video.id, posts[video.id]).catch(e => {
			console.warn(`[zachleat.com] Unable to fetch YouTube comments for ${video.id}:`, e);
			return [];
		}));
	}

	return videos
		.filter(video => Number(video.statistics?.likeCount) > 0 || Number(video.statistics?.commentCount) > 0)
		.map(video => ({
			...toEntry({
				url: `https://www.youtube.com/watch?v=${video.id}`,
				target: posts[video.id],
				property: "syndication",
				author: { name: video.snippet.channelTitle, photo: "", url: `https://www.youtube.com/channel/${video.snippet.channelId}` },
				published: video.snippet.publishedAt,
				received: video.snippet.publishedAt,
				text: video.snippet.title,
			}),
			"story-points": Number(video.statistics.likeCount) || 0,
			// Comments are counted individually
			"story-comments": 0,
		}))
		.concat(comments);
}
