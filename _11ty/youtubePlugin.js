const { YoutubeTranscript } = require("youtube-transcript");
const { AssetCache } = require("@11ty/eleventy-fetch");

async function fetchTranscript(videoId) {
	let asset = new AssetCache(`youtube_transcript_${videoId}`);
	if(asset.isCacheValid("7d")) {
		return asset.getCachedValue();
	}

	// Remote call
	let transcript = await YoutubeTranscript.fetchTranscript(videoId);
	await asset.save(transcript, "json");
	return transcript;
}

module.exports = function(eleventyConfig) {
	let leftpad = eleventyConfig.getFilter("leftpad");

	eleventyConfig.addShortcode("fetchTranscript", async videoId => {
		let content = await fetchTranscript(videoId);
		let html = `<div><youtube-deep-link videoid="${videoId}">${content.map(({offset, text}, index) => {
			let offsetSeconds = Math.round(parseInt(offset, 10) / 1000);
			let minutes = Math.floor(offsetSeconds / 60);
			let seconds = Math.floor(offsetSeconds - minutes * 60);

			return `${index % 4 === 0 ? `<br><br>` : ""}<span data-offset="${offsetSeconds}"><button type="button">${leftpad(minutes, 2)}:${leftpad(seconds, 2)}</button>${text.trim()}</span>`;
		}).join("")}</youtube-deep-link></div>`;

		return html;
	});
};
