const Image = require("@11ty/eleventy-img");
const { createHash } = require("crypto");

function getCryptoHash(src) {
		let hash = createHash("sha1");
		hash.update(src);
		return hash.digest('hex').substring(0, 8);
}

async function imageShortcode(attrs = {}, options = {}) {
	options = Object.assign({},{
		widths: [null],
		formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", "jpeg"] : ["webp", "jpeg"],
		urlPath: "/img/built/",
		outputDir: "./_site/img/built/",
		sharpAvifOptions: {},
	}, options);

	let metadata = await Image(attrs.src || attrs.path, options);

	let imageAttributes = Object.assign({
		loading: "lazy",
		decoding: "async",
	}, attrs);

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes, {
		whitespaceMode: "inline"
	});
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
	Image(src, options);

	return `url('/img/built/${filename}')`;
}

function pad(num) {
	return `${num}`.padStart(2, '0');
}
function getDailyServiceCacheBuster() {
	if(process.env.ELEVENTY_PRODUCTION) {
		let d = new Date();
		return `_z${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`;
	}

	// return a throwaway constant cachebuster ref so that we don’t accidentally request production urls during local dev before they’re available online.
	return "_localdev";
}
function getWeeklyServiceCacheBuster() {
	if(process.env.ELEVENTY_PRODUCTION) {
		let d = new Date();
		// Weekly
		return `_z${d.getFullYear()}${pad(d.getMonth()+1)}_${d.getDate() % 7}`;
	}

	// return a throwaway constant cachebuster ref so that we don’t accidentally request production urls during local dev before they’re available online.
	return "_localdev";
}

function getFullUrlFromPath(path) {
	let domain = "https://www.zachleat.com";
	return domain + path;
}

function opengraphImageHtml(targetUrl) {
	let fullUrl = `https://v1.opengraph.11ty.dev/${encodeURIComponent(targetUrl)}/`;

	let options = {
		formats: ["webp", "jpeg"], // careful, AVIF here is a little slow!
		widths: [375, 650], // 1200 is not used, max rendered size is about 450px.
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
		alt: `OpenGraph image for ${targetUrl}`,
		loading: "lazy",
		decoding: "async",
		sizes: "(min-width: 64em) 50vw, 100vw",
		class: "project_img",
	});
}

function getImageServiceHtml(targetUrl, width, height, outputWidths = [], alt="") {
	let fullUrl = `https://v1.image.11ty.dev/${encodeURIComponent(targetUrl)}/`;

	let options = {
		formats: ["webp", "jpeg"], // careful, AVIF here is a little slow!
		widths: outputWidths,
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
		formats: ["jpeg"],
		widths: ["auto"],
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
	// eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
	eleventyConfig.addLiquidShortcode("image", imageShortcode);
	eleventyConfig.addLiquidFilter("backgroundimage", backgroundImageFilter);
	// eleventyConfig.addJavaScriptFunction("image", imageShortcode);

	/* Hosted image service to optimize webmention photos */
	eleventyConfig.addLiquidFilter("eleventyImageServiceAvatar", (url) => {
		return `https://v1.image.11ty.dev/${encodeURIComponent(url)}/jpeg/72/`;
	});

	eleventyConfig.addLiquidShortcode("eleventyImageServiceHtml", getImageServiceHtml);

	eleventyConfig.addLiquidShortcode("opengraphImageHtmlFullUrl", opengraphImageHtml);

	eleventyConfig.addLiquidShortcode("opengraphImageHtml", function({url}) {
		return opengraphImageHtml(getFullUrlFromPath(url));
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

	eleventyConfig.addLiquidShortcode("cachebuster", function() {
		return getWeeklyServiceCacheBuster();
	});
};

module.exports.screenshotImageHtmlFullUrl = screenshotImageHtmlFullUrl;
