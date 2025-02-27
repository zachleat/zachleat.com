import eleventyImage from "@11ty/eleventy-img";

function getTwitterAvatarImageOptions(username) {
	return {
		widths: [72],
		urlPath: "/img/avatars/",
		outputDir: "./img/avatars/",
		formats: process.env.PRODUCTION_BUILD ? ["avif", "jpeg"] : ["jpeg"],
		dryRun: true,
		cacheDuration: "*",
		filenameFormat: function(id, src, width, format) {
			return `${username.toLowerCase()}.${format}`;
		}
	};
}

async function twitterImageAvatar(username, classes = "") {
	// We know where the images will be
	let fakeUrl = `https://twitter.com/${username}.jpg`;
	let imgData = eleventyImage.statsByDimensionsSync(fakeUrl, 400, 400, getTwitterAvatarImageOptions(username));
	let markup = eleventyImage.generateHTML(imgData, {
		alt: `${username}’s Avatar`,
		class: "z-avatar" + (classes ? ` ${classes}` : ""),
		loading: "lazy",
		decoding: "async",
		"eleventy:ignore": "",
	}, {
		whitespaceMode: "inline"
	});

	return markup;
}

export default function(eleventyConfig) {
	// this will no longer generate new images so don’t use it
	eleventyConfig.addAsyncShortcode("twitterImageAvatar", twitterImageAvatar);

	function indieAvatarHtml(url = "", classes = "z-avatar", onerror = "") {
		let screenshotUrl = `https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(url)}/`;
		return `<img alt="IndieWeb Avatar for ${url}" class="${classes}" loading="lazy" decoding="async" src="${screenshotUrl}" width="60" height="60"${onerror ? ` onerror="${onerror}"`: ""} eleventy:ignore>`;
	}

	eleventyConfig.addLiquidShortcode("indieAvatar", indieAvatarHtml);

	// TODO remove this?
	eleventyConfig.addLiquidShortcode("indieAvatarBare", function(url = "", classes = "") {
		let origin;
		try {
			origin = (new URL(url)).origin;
		} catch(e) {
			origin = url;
		}

		return indieAvatarHtml(origin, classes, "this.parentNode.classList.add('error')");
	});
};
