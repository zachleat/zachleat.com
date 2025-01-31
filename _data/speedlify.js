import EleventyFetch from "@11ty/eleventy-fetch";

export default async function() {
	let url = "https://www.speedlify.dev/api/urls.json";
	let json = await EleventyFetch(url, {
		duration: "1d",
		type: "json",
	});

	return json;
};
