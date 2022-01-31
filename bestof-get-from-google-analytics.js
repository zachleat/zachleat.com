require('dotenv').config();

const google = require("googleapis");
const fs = require("fs");
const VIEW_ID = "ga:966455";

if(!process.env.GOOGLE_AUTH_CLIENT_EMAIL || !process.env.GOOGLE_AUTH_PRIVATE_KEY) {
	throw new Error("Missing environment variables for Google auth.")
}

let jwtClient = new google.auth.JWT(
	process.env.GOOGLE_AUTH_CLIENT_EMAIL,
	null,
	process.env.GOOGLE_AUTH_PRIVATE_KEY.replace(/\\n/gm, "\n"),
	["https://www.googleapis.com/auth/analytics.readonly"],
	null
);

jwtClient.authorize(function(err, tokens) {
	if (err) {
		console.log(err);
		return;
	}
	let analytics = google.analytics("v3");
	queryData(analytics);
});

function queryData(analytics) {
	analytics.data.ga.get(
		{
			auth: jwtClient,
			ids: VIEW_ID,
			metrics: "ga:pageviews",
			dimensions: "ga:pagePath",
			"start-date": "2006-09-05",
			"end-date": "today",
			sort: "-ga:pageviews",
			"max-results": 1500,
			filters: "ga:pagePath=~/web/"
		},
		function(err, response) {
			if (err) {
				console.log(err);
				return;
			}
			fs.writeFileSync("./_cache/zachleat-bestof.json", JSON.stringify(response, null, 2), "utf8");
		}
	);
}
