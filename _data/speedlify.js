import EleventyFetch from "@11ty/eleventy-fetch";

const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "30d" : "1d";

export default async function() {
	// TODO get rid of this (it only gates which pages add <speedlify-score> in footer now)
	// let url = "https://zachleat.github.io/speedlify2/api/urls.json";
	let url = "https://www.speedlify.dev/api/urls.json";
	let json = await EleventyFetch(url, {
		duration: CACHE_DURATION,
		type: "json",
	});

	return json;
};
