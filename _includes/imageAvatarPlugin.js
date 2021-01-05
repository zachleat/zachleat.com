const getTwitterAvatarUrl = require("twitter-avatar-url");
const eleventyImage = require("@11ty/eleventy-img");

function getImageOptions(username) {
	return {
		widths: [72],
		urlPath: "/img/avatars/",
		outputDir: "./_site/img/avatars/",
		formats: ["avif", "webp", "jpeg"],
		cacheDuration: "4w",
		filenameFormat: function(id, src, width, format) {
			return `${username.toLowerCase()}.${format}`;
		}
	};
}

function fetchImageData(username, url) {
	if(!url) {
		throw new Error("src property required in `img` shortcode.");
	}
	
	// return nothing, even though this returns a promise
	eleventyImage(url, getImageOptions(username)).then(function() {
		
	});
}

module.exports = function(eleventyConfig) {
	let usernames;

	eleventyConfig.on("beforeBuild", () => {
		usernames = new Set();
	});
	eleventyConfig.on("afterBuild", () => {
		let arr = Array.from(usernames);
		console.log( `Generating ${arr.length} Twitter avatars.` );
		getTwitterAvatarUrl(arr).then(results => {
			for(let result of results) {
				fetchImageData(result.username, result.url.large);
			}
		});
	});


	eleventyConfig.addLiquidShortcode("imgavatar", async function(username) {
		usernames.add(username.toLowerCase());

		// We know where the images will be
		let fakeUrl = `https://twitter.com/${username}.jpg`;
		let imgData = eleventyImage.statsByDimensionsSync(fakeUrl, 400, 400, getImageOptions(username));
		let markup = eleventyImage.generateHTML(imgData, {
			alt: `${username}’s Avatar`,
			class: "z-avatar",
			loading: "lazy",
			decoding: "async",
		}, {
			whitespaceMode: "inline"
		});

		return markup;
	});
};