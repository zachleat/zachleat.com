require('dotenv').config();

const { google } = require("googleapis");
const analytics = google.analytics('v3');

const VIEW_ID = "ga:966455";
const START_DATE = "2006-09-05";
// the long tail is very long and it didn’t change the results to add more entries here.
const MAX_RESULTS = 5000;

if(!process.env.GOOGLE_AUTH_CLIENT_EMAIL || !process.env.GOOGLE_AUTH_PRIVATE_KEY) {
	throw new Error("Missing environment variables for Google auth.")
}

const scopes = ["https://www.googleapis.com/auth/analytics.readonly"];
const jwt = new google.auth.JWT({
  email: process.env.GOOGLE_AUTH_CLIENT_EMAIL,
  key: process.env.GOOGLE_AUTH_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  scopes,
});

module.exports.queryData = async function queryData() {
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
		console.log( "[google analytics]", "Found", results.data.rows.length, "URLs." );
		return results.data.rows;
	}
	throw new Error( "No data.rows found in return data. Returned: " + results );
}
