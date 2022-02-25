const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	let url = "https://www.speedlify.dev/api/urls.json";
	let json = await EleventyFetch(url, {
		duration: "1d",
		type: "json",
	});

	return json;
};