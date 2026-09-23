import Fetch from "@11ty/eleventy-fetch";
import { getTargets, toEntry } from "./social.js";

// Skips submissions nobody noticed
const MIN_SCORE = 3;

// Every Lobsters submission of a site url, paginated by domain
export default async function getLobstersMentions() {
	let stories = [];
	for(let page = 1;; page++) {
		let results = await Fetch(`https://lobste.rs/domains/zachleat.com/page/${page}.json`, {
			type: "json",
			duration: process.env.ELEVENTY_RUN_MODE === "serve" ? "2d" : "2h",
			fetchOptions: {
				headers: { "user-agent": "zachleat.com webmentions" },
			},
		});
		if(!results?.length) {
			break;
		}
		stories.push(...results);
	}

	return stories.filter(story => story.score >= MIN_SCORE).flatMap(story => getTargets([story.url]).map(target => ({
		...toEntry({
			url: story.comments_url,
			target,
			property: "syndication",
			author: { name: story.submitter_user, photo: "", url: `https://lobste.rs/~${story.submitter_user}` },
			published: story.created_at,
			received: story.created_at,
			text: story.title,
		}),
		"story-points": story.score,
		"story-comments": story.comment_count || 0,
	})));
}
