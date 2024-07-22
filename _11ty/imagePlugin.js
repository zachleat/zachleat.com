const path = require("node:path");
const Image = require("@11ty/eleventy-img");
const { createHash } = require("crypto");
const { eleventyImageOnRequestDuringServePlugin } = require("@11ty/eleventy-img");

function getCryptoHash(src) {
		let hash = createHash("sha1");
		hash.update(src);
		return hash.digest('hex').substring(0, 8);
}

async function imageShortcode(attrs = {}, options = {}, isFullWidth = false) {
	options = Object.assign({},{
		widths: [null],
		formats: process.env.PRODUCTION_BUILD ? ["avif", "jpeg"] : ["auto"],
		transformOnRequest: process.env.ELEVENTY_RUN_MODE === "serve",
		urlPath: "/img/built/",
		outputDir: "./_site/img/built/",
		sharpAvifOptions: {},
	}, options);

	// @11ty/eleventy-img
	let metadata = await Image(attrs.src || attrs.path, options);

	let imageAttributes = Object.assign({
		loading: "lazy",
		decoding: "async",
	}, attrs);

	if(options.widths.length > 1) {
		if(isFullWidth) {
			imageAttributes.sizes = "(min-width: 106.25em) 82.75em, (min-width: 61.25em) calc(91.43vw - 13.25em), 100vw";
		} else {
			// imageAttributes.sizes = "(min-width: 75em) 44.5625em, (min-width: 61.25em) calc(100vw - 20em), 100vw"
			imageAttributes.sizes = "(min-width: 75em) 44.5625em, (min-width: 61.25em) 40.6875em, (min-width: 41.25em) 36.8125em, 96vw";
		}
	}

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes);
}

function backgroundImageFilter(src, width, options = {}) {
	let filename = `${getCryptoHash(src)}.jpeg`;

	options = Object.assign({},{
		widths: [width || "auto"],
		formats: ["jpeg"],
		urlPath: "/img/built/",
		outputDir: "./_site/img/built/",
		filenameFormat: function (id, src, width, format, options) {
			return filename;
		},
		sharpAvifOptions: {
			lossless: true,
		},
	}, options);

	if(!src.startsWith("http://") && !src.startsWith("https://")) {
		src = `.${src}`;
	}

	// async
	// @11ty/eleventy-img
	Image(src, options);

	return `url('/img/built/${filename}')`;
}

function pad(num) {
	return `${num}`.padStart(2, '0');
}
function _getCacheBuster(date, suffix) {
	if(process.env.PRODUCTION_BUILD) {
		return `_x${date.getFullYear()}${pad(date.getMonth()+1)}${suffix}`;
	}

	// return a throwaway constant cachebuster ref so that we don’t accidentally request production urls during local dev before they’re available online.
	return "_localdev1";
}
function getDailyServiceCacheBuster() {
	let date = new Date();
	return _getCacheBuster(date, pad(date.getDate()));
}
function getWeeklyServiceCacheBuster() {
	let date = new Date();
	return _getCacheBuster(date, `_${date.getDate() % 7}`);
}

function getFullUrlFromPath(path) {
	let domain = "https://www.zachleat.com";
	return domain + path;
}

function opengraphImageHtmlWithClass(targetUrl, alt = "", cls = "") {
	let fullUrl = `https://v1.opengraph.11ty.dev/${encodeURIComponent(targetUrl)}/`;

	let options = {
		// careful, AVIF here is a little slow!
		formats: ["webp", "jpeg"],
		widths: [375, 650], // 1200 is not used, max rendered size is about 450px.
		statsOnly: true,
		urlFormat: function({width, format}) {
			let size;
			if(width <= 400) {
				size = "small";
			} else if(width <= 700) {
				size = "medium";
			} else {
				size = "auto";
			}

			return `${fullUrl}${size}/${format}/${getDailyServiceCacheBuster()}/`;
		}
	};

	let stats = Image.statsByDimensionsSync(fullUrl, 1200, 630, options);
	return Image.generateHTML(stats, {
		alt: alt ?? `OpenGraph image for ${targetUrl}`,
		loading: "lazy",
		decoding: "async",
		sizes: "(min-width: 64em) 50vw, 100vw",
		class: cls || "",
	});
}

function opengraphImageHtml(targetUrl, alt = "") {
	return opengraphImageHtmlWithClass(targetUrl, alt, "project_img");
}

function getImageServiceHtml(targetUrl, width, height, outputWidths = [], alt="") {
	let fullUrl = `https://v1.image.11ty.dev/${encodeURIComponent(targetUrl)}/`;

	let options = {
		// careful, AVIF here is a little slow!
		formats: ["webp", "jpeg"],
		widths: outputWidths,
		statsOnly: true,
		urlFormat: function({width, format}) {
			return `${fullUrl}${format}/${width}/`;
		}
	};

	let stats = Image.statsByDimensionsSync(fullUrl, width, height, options);
	return Image.generateHTML(stats, {
		alt,
		loading: "lazy",
		decoding: "async",
		sizes: "(min-width: 61.25em) calc(100vw - 20.625em), 100vw"
	});
}

function getScreenshotUrl(fullUrl, options = {}) {
	let o = [];
	for(let key in options) {
		o.push(`_${key}:${options[key]}`);
	}
	return `https://v1.screenshot.11ty.dev/${encodeURIComponent(fullUrl)}/opengraph/${getWeeklyServiceCacheBuster()}${o.join("")}/`;
}
function getScreenshotUrlFromPath(path, options) {
	return getScreenshotUrl(getFullUrlFromPath(path), options);
}

function screenshotImageHtmlFullUrl(fullUrl) {
	let targetUrl = getScreenshotUrl(fullUrl);
	let options = {
		// format here is static
		formats: ["jpeg"],
		widths: ["auto"],
		statsOnly: true,
		urlFormat: function() {
			return targetUrl;
		}
	};

	let stats = Image.statsByDimensionsSync(targetUrl, 1200, 630, options);
	return Image.generateHTML(stats, {
		alt: `Screenshot image for ${targetUrl}`,
		loading: "lazy",
		decoding: "async",
		class: "",
	});
}

module.exports = function(eleventyConfig) {
	// Serve images on request
	eleventyConfig.addPlugin(eleventyImageOnRequestDuringServePlugin);

	eleventyConfig.addAsyncShortcode("imageInline", (src, alt, isFullWidth) => {
		let attrs = {
			src: path.join(".", src),
			alt,
			loading: "eager",
		};
		let options = {
			widths: [400, 980, 1324, 2000],
			eleventyConfig,
		};
		return imageShortcode(attrs, options, isFullWidth);
	});

	eleventyConfig.addAsyncShortcode("image", (attrs, options = {}) => {
		options.eleventyConfig = eleventyConfig;

		return imageShortcode(attrs, options);
	});
	eleventyConfig.addLiquidFilter("backgroundimage", backgroundImageFilter);

	/* Hosted image service to optimize webmention photos */
	eleventyConfig.addLiquidFilter("eleventyImageServiceAvatar", (url) => {
		return `https://v1.image.11ty.dev/${encodeURIComponent(url)}/jpeg/72/`;
	});

	// Screenshots
	eleventyConfig.addLiquidShortcode("eleventyImageServiceHtml", getImageServiceHtml);

	eleventyConfig.addLiquidShortcode("opengraphImageHtml", function({url}, alt) {
		return opengraphImageHtml(getFullUrlFromPath(url), alt);
	});

	eleventyConfig.addLiquidShortcode("screenshotImageHtmlFullUrl", screenshotImageHtmlFullUrl);
	eleventyConfig.addLiquidShortcode("rawScreenshotImageFromFullUrl", function(fullUrl, options) {
		return getScreenshotUrl(fullUrl, options);
	});
	eleventyConfig.addLiquidShortcode("rawScreenshotImage", function(postUrl, options) {
		return getScreenshotUrlFromPath(postUrl, options);
	});

	eleventyConfig.addLiquidShortcode("ogImageSource", function({url, inputPath}) {
		// special title og images, only for _posts
		if(inputPath.startsWith("./_posts/")) {
			return getScreenshotUrlFromPath(`/opengraph${url}`);
		}

		// raw screenshot
		return getScreenshotUrlFromPath(url);
		// return getScreenshotUrlFromPath("/og/default.jpeg");
	});
};

module.exports.imageShortcode = imageShortcode;
module.exports.screenshotImageHtmlFullUrl = screenshotImageHtmlFullUrl;
module.exports.opengraphImageHtml = opengraphImageHtmlWithClass;

