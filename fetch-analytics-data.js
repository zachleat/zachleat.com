require('dotenv').config();

const fs = require("fs");
const glob = require("fast-glob");
const matter = require("gray-matter");

const google = require("googleapis");
const VIEW_ID = "ga:966455";
const START_DATE = "2006-09-05";
const MAX_RESULTS = 1000;
const MINIMUM_PAGEVIEWS = 50;


if(!process.env.GOOGLE_AUTH_CLIENT_EMAIL || !process.env.GOOGLE_AUTH_PRIVATE_KEY) {
	throw new Error("Missing environment variables for Google auth.")
}

async function queryData(analytics, jwtClient) {
	return new Promise((resolve, reject) => {
		analytics.data.ga.get(
			{
				auth: jwtClient,
				ids: VIEW_ID,
				metrics: "ga:pageviews",
				dimensions: "ga:pagePath",
				"start-date": START_DATE,
				"end-date": "today",
				sort: "-ga:pageviews",
				"max-results": MAX_RESULTS,
			},
			function(err, data) {
				if (err) {
					reject(err);
				} else {
					resolve(data.rows);
				}
			}
		);
	})
}

async function getClient() {
	let jwtClient = new google.auth.JWT(
		process.env.GOOGLE_AUTH_CLIENT_EMAIL,
		null,
		process.env.GOOGLE_AUTH_PRIVATE_KEY.replace(/\\n/gm, "\n"),
		["https://www.googleapis.com/auth/analytics.readonly"],
		null
	);

	return new Promise((resolve, reject) => {
		jwtClient.authorize(function(err, tokens) {
			if (err) {
				reject(err);
			} else {
				let analytics = google.analytics("v3");
				resolve({
					analytics,
					client: jwtClient
				});
			}
		});
	})
}

async function fetchAnalyticsData() {
	let { analytics, client } = await getClient();
	let data = await queryData(analytics, client);

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
	fs.writeFileSync("./_data/analytics.json", JSON.stringify(finalResults, null, 2), "utf8");
})();
