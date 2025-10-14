import EleventyFetch from "@11ty/eleventy-fetch";

export default async function() {
	try {
		let json = await EleventyFetch("https://www.11ty.dev/api/fundraising-status.json", {
			type: "json",
			duration: "*",
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
