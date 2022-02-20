const getTwitterAvatarUrl = require("twitter-avatar-url");
const eleventyImage = require("@11ty/eleventy-img");

if(process.env.ELEVENTY_PRODUCTION) {
	eleventyImage.concurrency = 3;
}

function getImageOptions(username) {
	return {
		widths: [72],
		urlPath: "/img/avatars/",
		outputDir: "./_site/img/avatars/",
		formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", "jpeg"] : ["webp", "jpeg"],
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

async function imgAvatar(username, classes = "") {
	// We know where the images will be
	let fakeUrl = `https://twitter.com/${username}.jpg`;
	let imgData = eleventyImage.statsByDimensionsSync(fakeUrl, 400, 400, getImageOptions(username));
	let markup = eleventyImage.generateHTML(imgData, {
		alt: `${username}’s Avatar`,
		class: "z-avatar" + (classes ? ` ${classes}` : ""),
		loading: "lazy",
		decoding: "async",
	}, {
		whitespaceMode: "inline"
	});
	
	return markup;
}

module.exports = function(eleventyConfig) {
	let usernames;

	eleventyConfig.on("beforeBuild", () => {
		usernames = new Set();
	});
	eleventyConfig.on("afterBuild", () => {
		let arr = Array.from(usernames);
		console.log( `[zachleat.com] Generating ${arr.length} Twitter avatars.` );
		getTwitterAvatarUrl(arr).then(results => {
			for(let result of results) {
				fetchImageData(result.username, result.url.large);
			}
		});
	});

	async function twitterAvatarHtml(username, classes = "") {
		usernames.add(username.toLowerCase());
		return imgAvatar(username, classes);
	}

	eleventyConfig.addLiquidShortcode("imgavatar", twitterAvatarHtml);
	eleventyConfig.addLiquidShortcode("twitterAvatar", twitterAvatarHtml);


	function indieAvatarHtml(url = "", classes = "z-avatar") {
		let screenshotUrl = `https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(url)}/`;
		return `<img alt="IndieWeb Avatar for ${url}" class="${classes}" loading="lazy" decoding="async" src="${screenshotUrl}" width="60" height="60">`;
	}

	eleventyConfig.addLiquidShortcode("indieAvatar", indieAvatarHtml);
};