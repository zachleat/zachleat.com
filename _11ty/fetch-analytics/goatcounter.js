import 'dotenv/config'
import EleventyFetch from "@11ty/eleventy-fetch";

async function fetchData() {
	try {
		if(!process.env.GOATCOUNTER_TOKEN) {
			throw new Error("Missing GOATCOUNTER_TOKEN environment variable");
		}

		// The results are sorted by count descending
		let json = await EleventyFetch("https://zachleat.goatcounter.com/api/v0/stats/hits?start=2024-08-30&limit=100&daily=true", {
			type: "json",
			duration: process.env.ELEVENTY_RUN_MODE === "build" ? "0s" : "1h",
			directory: ".cache/eleventy-fetch/",
			dryRun: false,
			fetchOptions: {
				headers: {
					"Authorization": `Bearer ${process.env.GOATCOUNTER_TOKEN}`
				},
			},
		});

		let ret = {};
		let total = 0;
		json.hits.forEach(entry => {
			total += entry.count;

			let urlPath = entry.path + (!entry.path.endsWith("/") ? "/" : "");
			ret[urlPath] = {
				count: entry.count,
				path: urlPath,
			}
		});

		console.log( "[goatcounter] Found", json.hits.length, "URLs (max: 100) with", total, "Pageviews" );
		return ret;
	} catch(e) {
		if(process.env.NODE_ENV === "production") {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.log( "Error retrieving goatcounter data", e );
		return {};
	}
};

export { fetchData };
