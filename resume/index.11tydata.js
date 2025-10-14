import EleventyFetch from "@11ty/eleventy-fetch";

const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "30d" : "1d";

function fetch(url) {
	return EleventyFetch(url, {
		duration: CACHE_DURATION,
		type: "json",
	})
}

export default async function({eleventy}) {
	// https://developer.github.com/v3/repos/#get
	try {
		let initialData = {
			now: new Date(),
			stargazers: {},
			twitter: {},
			meetup: {}
		};

		let data = Object.assign({}, initialData);
		let promises = [];

		promises.push(fetch("https://api.github.com/repos/11ty/eleventy")
			.then(json => {
				if(json.message) {
					console.log( json.message );
				}
				if(eleventy.env.runMode !== "serve") {
					console.log( `[zachleat.com] eleventy star count: ${json.stargazers_count}.` );
				}
				data.stargazers.eleventy = json.stargazers_count;
			}));

		await Promise.all(promises);

		return data;
	} catch(e) {
		throw new Error( "Failed fetching resume counts: " + e.message );
	}
};
