const CacheAsset = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
	let url = "https://www.speedlify.dev/api/urls.json";
	let json = await CacheAsset(url, {
		duration: "1d",
		type: "json",
	});

	return json;
};