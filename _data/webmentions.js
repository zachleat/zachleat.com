import 'dotenv/config';

import { DateTime } from "luxon";
import lodash from 'lodash';
import Fetch from "@11ty/eleventy-fetch";

import siteData from "./site.json" with { type: "json" };
import getBaseUrl from "../_includes/getBaseUrl.js";

// Configuration Parameters
const { domain } = siteData;
const API_ORIGIN = 'https://webmention.io/api/mentions.jf2';
const TOKEN = process.env.WEBMENTION_IO_TOKEN;
const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "30d" : "1d";

async function getWebmentionPage(pageNumber = 0) {
	// https://github.com/aaronpk/webmention.io#api
	// TODO move to use since_id instead of since date
	let url = `${API_ORIGIN}?domain=${domain}&token=${TOKEN}&per-page=9999&page=${pageNumber}`;
	// if (since) {
	// 	url += `&since=${since}`;
	// }

	return Fetch(url, {
		type: "json",
		duration: CACHE_DURATION,
	});
}

async function fetchWebmentions() {
	if (!domain || domain === 'myurl.com') {
		// If we dont have a domain name, abort
		console.warn(
			'[zachleat.com] unable to fetch webmentions: no domain specified in metadata.'
		);
		return [];
	}
	if (!TOKEN) {
		// If we dont have a domain access token, abort
		console.warn(
			'[zachleat.com] unable to fetch webmentions: no access token specified in environment.'
		);
		return [];
	}

	let results = [];
	let keepFetching = true;
	let page = 0;
	while(keepFetching) {
		let feed = await getWebmentionPage(page);
		let resultCount = feed?.children?.length || 0;
		results.push(...feed?.children || []);

		if(resultCount === 0 || resultCount < 9999) {
			keepFetching = false;
			break;
		}
		page++;
	}

	if(process.env.ELEVENTY_RUN_MODE === "build") {
		console.log( `[zachleat.com] Found ${results.length} total webmentions.` );
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
	return {
		count: totalCount,
		mentions,
	};
}
