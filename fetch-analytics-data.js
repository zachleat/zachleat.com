require('dotenv').config();

const fs = require("fs");
const glob = require("fast-glob");
const matter = require("gray-matter");
const { queryData: queryGoogleData } = require("./_11ty/fetch-analytics/google-analytics.js");
const { queryData: queryElizabeaconData } = require("./_11ty/fetch-analytics/elizabeacon.js");

const MINIMUM_PAGEVIEWS = 50;

async function fetchAnalyticsData() {
	let googleData = await queryGoogleData();
	let elizabeaconData = await queryElizabeaconData();

	let unordered = [];
	let visited = {};
	for(let [url, pageViews] of googleData) {
		if(url.startsWith("/opengraph/")) {
			continue;
		}

		visited[url] = true;
		unordered.push({
			url,
			pageViews: parseInt(pageViews) + (elizabeaconData[url]?.count || 0),
		})
	}
	// add urls not in google data
	for(let url in elizabeaconData) {
		if(url.startsWith("/opengraph/")) {
			continue;
		}

		if(!visited[url]) {
			unordered.push({
				url,
				pageViews: elizabeaconData[url].count
			})
		}
	}

	return unordered.sort((a, b) => {
		return b.pageViews - a.pageViews;
	});
};

function getInputMap(globs) {
	let results = {};
	let entries = glob.sync(globs);
	for(inputPath of entries) {
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
	return results;
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
	let inputMap = getInputMap(["./_posts/*.md"]);

	let analyticsData = await fetchAnalyticsData();

	let j = 1;
	let totalPageViews = 0;
	for(let entry of analyticsData) {
		if(inputMap[entry.url]) {
			entry.from = inputMap[entry.url];

			let pageViewsPerDay = entry.pageViews / ((Date.now() - entry.from.time) / (1000*60*60*24));
			entry.pageViewsPerDay = pageViewsPerDay;

			entry.rankTotal = j;
			j++;

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
