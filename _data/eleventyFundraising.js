const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	try {
		let json = await EleventyFetch("https://www.11ty.dev/api/fundraising-status.json", {
			type: "json",
			duration: process.env.ELEVENTY_RUN_MODE === "build" ? "0s" : "1h",
			directory: ".cache/eleventy-fetch/",
			dryRun: false,
		});

		return json;
	} catch(e) {
		if(process.env.NODE_ENV === "production") {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.log( "Failed getting fundraising API amount, returning 0" );
		return {
			monthly: {
				value: 0
			}
		};
	}
};
