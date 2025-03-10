import { createHash } from "node:crypto";
import Image, { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { getImageColors } from "@11ty/image-color";

const SIZES_INLINE = "(min-width: 75em) 44.5625em, (min-width: 61.25em) 40.6875em, (min-width: 41.25em) 36.8125em, 96vw";
export const CACHEBUSTER = "20250229";

function getCryptoHash(src) {
		let hash = createHash("sha1");
		hash.update(src);
		return hash.digest('hex').substring(0, 8);
}

async function imageFactory(src, options = {}) {
	options = Object.assign({},{
		widths: ["auto"],
		formats: process.env.PRODUCTION_BUILD ? ["avif", "jpeg"] : ["auto"],
		transformOnRequest: process.env.ELEVENTY_RUN_MODE === "serve",
		urlPath: "/img/built/",
		outputDir: "./_site/img/built/",
		sharpAvifOptions: {},
		cacheOptions: {
			duration: "14d",
		},
	}, options);

	// @11ty/eleventy-img
	return {
		options,
		metadata: await Image(src, options),
	}
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
		cacheOptions: {
			duration: "14d",
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

function getFullUrlFromPath(path) {
	let domain = "https://www.zachleat.com";
	return domain + path;
}

export function getOpenGraphImageUrl(url, format = "") {
	let u = new URL(url);

	// Not used, _${CACHEBUSTER} is applied directly to opengraph path in `opengraphImageHtmlWithClass`
	// u.searchParams.set("cache", CACHEBUSTER);

	return `https://v1.opengraph.11ty.dev/${encodeURIComponent(u.toString())}/${format ? `auto/${format}/` : ""}`;
}

function opengraphImageHtmlWithClass(targetUrl, alt = "", cls = "") {
	let fullUrl = getOpenGraphImageUrl(targetUrl);

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

			if(process.env.PRODUCTION_BUILD) {
				// Can probably remove CACHEBUSTER in about a week from 2025-02-28
				return `${fullUrl}${size}/${format}/_${CACHEBUSTER}/`;
			}

			// This could be better
			return `${fullUrl}${size}/${format}/_localdev1/`;
		}
	};

	let stats = Image.statsByDimensionsSync(fullUrl, 1200, 630, options);
	return Image.generateHTML(stats, {
		alt: alt ?? `OpenGraph image for ${targetUrl}`,
		loading: "lazy",
		decoding: "async",
		sizes: "(min-width: 64em) 50vw, 100vw",
		class: cls || "",
		"eleventy:ignore": "",
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
		sizes: "(min-width: 61.25em) calc(100vw - 20.625em), 100vw",
		"eleventy:ignore": "",
	});
}

function getScreenshotUrl(fullUrl, options = {}) {
	let o = [];
	for(let key in options) {
		o.push(`_${key}:${options[key]}`);
	}
	return `https://v1.screenshot.11ty.dev/${encodeURIComponent(fullUrl)}/opengraph/${o.join("")}/`;
}
function getScreenshotUrlFromPath(path, options) {
	let u = new URL(getFullUrlFromPath(path));

	// bust cache for the screenshot target URL, useful when the open graph images need a refresh
	u.searchParams.set("cache", CACHEBUSTER);

	return getScreenshotUrl(u.toString(), options);
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
		"eleventy:ignore": "",
	});
}

export async function getFilteredImageColors(target) {
	let colors = await getImageColors(target);
	return colors.filter(c => {
		// colors with good contrast with light text or extra good with dark text (white is boring)
		return (c.contrast.light >= 4.5 || c.contrast.dark > 7) && c.colorjs.oklch.l < .95;
	}).sort((a, b) => {
		// lightest + chroma colors first
		return (b.colorjs.oklch.l + b.colorjs.oklch.c) - (a.colorjs.oklch.l + a.colorjs.oklch.c);
	});
}

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
				sizes: SIZES_INLINE
			},
			pictureAttributes: {},
		}
	});

	// Only one image format, and return only the URL
	eleventyConfig.addAsyncShortcode("getUrlForImage", async (src, width = "auto", format = "auto") => {
		let options = {
			eleventyConfig,
			formats: [ format ],
			widths: [ width ],
		};
		let { metadata } = await imageFactory(src, options);
		let outputFormat = Object.keys(metadata).pop();
		return metadata[outputFormat][0].url;
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
	});
};

export {
	screenshotImageHtmlFullUrl,
	opengraphImageHtmlWithClass as opengraphImageHtml,
};

