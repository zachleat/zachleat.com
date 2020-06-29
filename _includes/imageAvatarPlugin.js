const getTwitterAvatarUrl = require("twitter-avatar-url");
const eleventyImg = require("@11ty/eleventy-img");
const RemoteCache = require("@11ty/eleventy-cache-assets");
const AssetCache = RemoteCache.AssetCache;

function getImageMarkup(imageData, props = {}) {
	if(!props.alt) {
		throw new Error("alt property required in `img` shortcode.")
	}

	let webp = imageData.webp[0];
	let jpeg = imageData.jpeg[0];

	return `<picture>
<source type="${webp.sourceType}" srcset="${webp.srcset}">
<img alt="${props.alt}" src="${jpeg.url}" width="${jpeg.width}" height="${jpeg.height}"${props.class ? ` class="${props.class}"` : ""}${props.loading ? ` loading="${props.loading}"` : ""}>
</picture>`;
};

async function getImageData(url) {
	if(!url) {
		throw new Error("src property required in `img` shortcode.");
	}

	let imageData = await eleventyImg(url, {
		widths: [72],
		urlPath: "/img/",
		outputDir: "img",
		formats: ["webp", "jpeg"],
		cacheDuration: "4w",
	});

	return imageData;
}

module.exports = function(eleventyConfig) {

	eleventyConfig.addLiquidShortcode("imgavatar", async function(username) {
		let asset = new AssetCache(`twitter-avatar-url-${username}`);
		if(asset.isCacheValid("4w")) {
			return asset.getCachedValue();
		}

		let avatarInfo = await getTwitterAvatarUrl(username);
		console.log( `Twitter image for ${username}:`, avatarInfo.url.large );
		let imgData = await getImageData(avatarInfo.url.large);
		let markup = getImageMarkup(imgData, {
			alt: `${username}’s Avatar`,
			class: "z-avatar",
			loading: "lazy"
		});

		asset.save(markup, "text");

		return markup;
	});
};