import Fetch from "@11ty/eleventy-fetch";
import { getTargets, toEntry } from "./social.js";

// Skips submissions nobody noticed
const MIN_POINTS = 1;

// Every Hacker News submission of a site url, full history in one request
export default async function getHackerNewsMentions() {
	let url = "https://hn.algolia.com/api/v1/search?query=zachleat.com&restrictSearchableAttributes=url&tags=story&hitsPerPage=1000";
	let { hits = [] } = await Fetch(url, {
		type: "json",
		duration: process.env.ELEVENTY_RUN_MODE === "serve" ? "2d" : "2h",
	});

	return hits.filter(hit => hit.points >= MIN_POINTS).flatMap(hit => getTargets([hit.url]).map(target => ({
		...toEntry({
			url: `https://news.ycombinator.com/item?id=${hit.objectID}`,
			target,
			property: "syndication",
			author: { name: hit.author, photo: "", url: `https://news.ycombinator.com/user?id=${hit.author}` },
			published: hit.created_at,
			received: hit.created_at,
			text: hit.title,
		}),
		"story-points": hit.points,
		"story-comments": hit.num_comments || 0,
	})));
}
