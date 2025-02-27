import 'dotenv/config'
import fs from "fs";
import glob from "fast-glob";
import matter from "gray-matter";

import { queryData as queryElizabeaconData } from "./_11ty/fetch-analytics/elizabeacon.js";
import { fetchData as queryGoatcounterData } from "./_11ty/fetch-analytics/goatcounter.js";

import googleData from "./_11ty/fetch-analytics/google-analytics-export.json" with { type: "json" };

const MINIMUM_PAGEVIEWS = 50;

async function fetchAnalyticsData() {
	let elizabeaconData = await queryElizabeaconData();
	let goatcounterData = await queryGoatcounterData();

	let unordered = [];
	let visited = {};
	for(let entry of Object.values(googleData)) {
		let {url, pageViews} = entry;
		if(url.startsWith("/opengraph/")) {
			continue;
		}

		visited[url] = true;
		unordered.push({
			url,
			pageViews: parseInt(pageViews) + (elizabeaconData[url]?.count || 0) + (goatcounterData[url]?.count || 0),
		})
	}

	// add urls not in google data
	for(let url in elizabeaconData) {
		if(url.startsWith("/opengraph/")) {
			continue;
		}

		if(!visited[url]) {
			visited[url] = true;
			unordered.push({
				url,
				pageViews: elizabeaconData[url].count + (goatcounterData[url]?.count || 0)
			})
		}
	}

	// add urls not in google data
	for(let url in goatcounterData) {
		if(url.startsWith("/opengraph/")) {
			continue;
		}

		if(!visited[url]) {
			visited[url] = true;
			unordered.push({
				url,
				pageViews: goatcounterData[url].count
			})
		}
	}

	return unordered.sort((a, b) => {
		return b.pageViews - a.pageViews;
	});
};

function getInputMap(globs) {
	let results = {};
	let alternates = {};
	let entries = glob.sync(globs);
	for(let inputPath of entries) {
		let result = {
			inputPath,
		};

		let matcher = inputPath.match(/(\d{4}\-\d{2}\-\d{2})\-([^\/]+)/);
		if(matcher && matcher.length) {
			let [, date, filename] = matcher;
			let slugSplit = filename.split(".");
			slugSplit.pop();
			let slug = slugSplit.join(".");
			result.url = `/web/${slug}/`;

			// old /YYYY/MM/DD/ urls
			alternates[`/web/${date.split("-").join("/")}/${slug}/`] = result.url;

			result.date = date;
			result.time = (new Date(date)).getTime();
		}

		// if permalink set in front matter, use that.
		let content = fs.readFileSync(inputPath, 'utf8');
		let frontmatter = matter( content );
		if(frontmatter.data.permalink) {
			result.url = frontmatter.data.permalink;
		}

		results[result.url] = result;
	}
	return {
		inputMap: results,
		alternates,
	};
}

function getPageViewsPerDayRanks(analyticsData) {
	let ranksForDaysPosted = [];
	for(let entry of analyticsData) {
		if(entry.from) {
			ranksForDaysPosted.push({
				url: entry.url,
				pageViewsPerDay: entry.pageViewsPerDay,
			});
		}
	}
	ranksForDaysPosted.sort((a, b) => {
		return b.pageViewsPerDay - a.pageViewsPerDay;
	});
	let lookupRanksForDaysPosted = {};
	let k = 1;
	for(let entry of ranksForDaysPosted) {
		lookupRanksForDaysPosted[entry.url] = k;
		k++;
	}
	return lookupRanksForDaysPosted;
}

(async () => {
	let { inputMap, alternates } = getInputMap(["./_posts/**/*.md"]);

	let analyticsData = await fetchAnalyticsData();

	// Important: these may not exist in analytics data
	let alternatesPageViews = {};
	for(let entry of analyticsData) {
		let rootUrl = alternates[entry.url];
		if(rootUrl) {
			if(!alternatesPageViews[rootUrl]) {
				alternatesPageViews[rootUrl] = 0;
			}
			alternatesPageViews[rootUrl] += entry.pageViews;
		}
	}

	// Add /web/YYYY/MM/DD/slug urls to root /web/slug data
	for(let entry of analyticsData) {
		if(alternatesPageViews[entry.url]) {
			entry.pageViews += alternatesPageViews[entry.url];
		}
	}

	let j = 1;
	let totalPageViews = 0;
	for(let entry of analyticsData) {
		if(entry.url.startsWith("/search?") || entry.url.startsWith("/translate_c?")) {
			continue;
		}

		if(inputMap[entry.url]) {
			entry.from = inputMap[entry.url];

			let pageViewsPerDay = entry.pageViews / ((Date.now() - entry.from.time) / (1000*60*60*24));
			entry.pageViewsPerDay = pageViewsPerDay;

			entry.rankTotal = j;
			j++;
		}

		if(entry.pageViews) {
			totalPageViews += entry.pageViews;
		}
	}

	let rankedPageViewsPerDay = getPageViewsPerDayRanks(analyticsData);
	for(let entry of analyticsData) {
		if(rankedPageViewsPerDay[entry.url]) {
			entry.rankPerDaysPosted = rankedPageViewsPerDay[entry.url];
		}
	}

	let finalResults = {};
	for(let entry of analyticsData) {
		if(entry.pageViews > MINIMUM_PAGEVIEWS) {
			finalResults[entry.url] = entry;
		}
	}
	let globalDataFilePath = "./_data/analytics.json";
	fs.writeFileSync(globalDataFilePath, JSON.stringify(finalResults, null, 2), "utf8");
	console.log( `Wrote ${globalDataFilePath} with ${totalPageViews} total page views.` );
})();
