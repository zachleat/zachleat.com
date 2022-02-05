require('dotenv').config();

const fs = require("fs");
const glob = require("fast-glob");
const matter = require("gray-matter");

const { google } = require("googleapis");
const analytics = google.analytics('v3');

const VIEW_ID = "ga:966455";
const START_DATE = "2006-09-05";
const MAX_RESULTS = 1000;
const MINIMUM_PAGEVIEWS = 50;


if(!process.env.GOOGLE_AUTH_CLIENT_EMAIL || !process.env.GOOGLE_AUTH_PRIVATE_KEY) {
	throw new Error("Missing environment variables for Google auth.")
}

const scopes = ["https://www.googleapis.com/auth/analytics.readonly"];
const jwt = new google.auth.JWT({
  email: process.env.GOOGLE_AUTH_CLIENT_EMAIL,
  key: process.env.GOOGLE_AUTH_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  scopes,
});

async function queryData() {
	let results = await analytics.data.ga.get({
		auth: jwt,
		ids: VIEW_ID,
		metrics: "ga:pageviews",
		dimensions: "ga:pagePath",
		"start-date": START_DATE,
		"end-date": "today",
		sort: "-ga:pageviews",
		"max-results": MAX_RESULTS,
	});
	if(results.data && results.data.rows) {
		return results.data.rows;
	}
	console.error( "No data.rows found in return data:", results );
	return [];
}

async function fetchAnalyticsData() {
	let data = await queryData();
	let ordered = [];
	for(let [url, pageViews] of data) {
		if(url.startsWith("/opengraph/")) {
			continue;
		}

		ordered.push({
			url,
			pageViews: parseInt(pageViews),
		})
	}
	return ordered;
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
	let inputMap = getInputMap(["./web/_posts/*.md"]);
	
	let analyticsData = await fetchAnalyticsData();
	
	let j = 1;
	for(let entry of analyticsData) {
		if(inputMap[entry.url]) {
			entry.from = inputMap[entry.url];

			let pageViewsPerDay = entry.pageViews / ((Date.now() - entry.from.time) / (1000*60*60*24));
			entry.pageViewsPerDay = pageViewsPerDay;

			entry.rankTotal = j;
			j++;
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
	console.log( `Wrote ${globalDataFilePath}` );
})();
