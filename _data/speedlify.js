import EleventyFetch from "@11ty/eleventy-fetch";

const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "7d" : "1d";

export default async function() {
	let url = "https://www.speedlify.dev/api/urls.json";
	let json = await EleventyFetch(url, {
		duration: CACHE_DURATION,
		type: "json",
	});

	return json;
};
