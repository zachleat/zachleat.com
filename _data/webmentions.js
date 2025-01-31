import 'dotenv/config';

import fs from 'node:fs';
import { DateTime } from "luxon";
import lodash from 'lodash';

import siteData from "./site.json" with { type: "json" };
import getBaseUrl from "../_includes/getBaseUrl.js";

// Configuration Parameters
const { domain } = siteData;
const CACHE_DIR = '.cache';
const API_ORIGIN = 'https://webmention.io/api/mentions.jf2';
const TOKEN = process.env.WEBMENTION_IO_TOKEN;

async function fetchWebmentions(since) {
	if (!domain || domain === 'myurl.com') {
		// If we dont have a domain name, abort
		console.warn(
			'[zachleat.com] unable to fetch webmentions: no domain specified in metadata.'
		);
		return false;
	}
	if (!TOKEN) {
		// If we dont have a domain access token, abort
		console.warn(
			'[zachleat.com] unable to fetch webmentions: no access token specified in environment.'
		);
		return false;
	}

	// https://github.com/aaronpk/webmention.io#api
	// TODO move to use since_id instead of since date
	let url = `${API_ORIGIN}?domain=${domain}&token=${TOKEN}&per-page=9999&page=0`;
	if (since) {
		url += `&since=${since}`;
	}
	console.log( `[zachleat.com] Fetching webmentions from: ${url}` );

	// TODO use eleventy-fetch
	const response = await fetch(url);
	if (response.ok) {
		const feed = await response.json();
		console.log(`[zachleat.com] ${feed.children.length} webmentions fetched from ${API_ORIGIN}`);
		return feed;
	}

	return null;
}

// save combined webmentions in cache file
function writeToCache(data) {
	const filePath = `${CACHE_DIR}/webmentions.json`;
	const fileContent = JSON.stringify(data, null, 2);

	// create cache folder if it doesnt exist already
	if (!fs.existsSync(CACHE_DIR)) {
		fs.mkdirSync(CACHE_DIR, { recursive: true });
	}
	// write data to cache json file
	fs.writeFileSync(filePath, fileContent);
	console.log(`[zachleat.com] webmentions cached to ${filePath}`);
}

function webmentionsEnabled() {
	return process.env.ELEVENTY_FEATURES && process.env.ELEVENTY_FEATURES.split(",").indexOf("webmentions") > -1;
}

// get cache contents from json file
async function readFromCache() {
	const filePath = `${CACHE_DIR}/webmentions.json`;
	let cacheExists = fs.existsSync(filePath);

	if (cacheExists) {
		const cacheFile = fs.readFileSync(filePath);
		return JSON.parse(cacheFile);
	}

	return {
		lastFetched: null,
		mentions: {}
	};
}

export default async function({ eleventy }) {
	const cache = await readFromCache();
	const { lastFetched, mentions } = cache;

	if (webmentionsEnabled() || !lastFetched) {
		const feed = await fetchWebmentions(lastFetched);

		if (feed) {
			for(let webmention of feed.children) {
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

			const webmentions = {
				lastFetched: new Date().toISOString(),
				count: totalCount,
				mentions: mentions
			};

			writeToCache(webmentions);
			console.log( `[zachleat.com] Wrote ${webmentions.count} webmentions to cache.` );
			return webmentions;
		}
	}

	// IF YOU’RE WANTING TO FILTER A HOST OUT OF BEING LISTED IN WEBMENTIONS
	// DO THIS IN .eleventy.js -> webmentionsForUrl filter
	if(eleventy.env.runMode !== "serve") {
		console.log(`[zachleat.com] Loaded ${cache.count} webmentions from cache.`);
	}
	return cache;
}
