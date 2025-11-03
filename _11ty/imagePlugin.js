import fs from "node:fs";
import path from "node:path";
import Image, { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { getImageColors } from "@11ty/image-color";
import { getCreatedTimestamp } from "./git.js";

const SIZES_INLINE = "(min-width: 75em) 44.5625em, (min-width: 61.25em) 40.6875em, (min-width: 41.25em) 36.8125em, 96vw";

const ONE_DAY = 24*60*60*1000;
const DEFAULT_CACHEBUSTER = "_20251031";
const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "30d" : "1d";

async function imageFactory(src, options = {}) {
	options = Object.assign({},{
		widths: ["auto"],
		formats: ["avif", "jpeg"],
		failOnError: false,
		transformOnRequest: process.env.ELEVENTY_RUN_MODE === "serve",
		urlPath: "/img/built/",
		outputDir: "./_site/img/built/",
		sharpAvifOptions: {},
		cacheOptions: {
			duration: CACHE_DURATION,
		},
	}, options);

	// @11ty/eleventy-img
	return {
		options,
		metadata: await Image(src, options),
	}
}

function getFullUrlFromPath(path) {
	let domain = "https://www.zachleat.com";
	return domain + path;
}

export function getOpenGraphImageUrl(url, format = "") {
	let u = new URL(url);

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

			return `${fullUrl}${size}/${format}/`;
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

function getScreenshotUrl(fullUrl, options = {}) {
	let o = [];
	for(let key in options) {
		o.push(`_${key}:${options[key]}`);
	}
	let suffix = "";
	if(o.length > 0) {
		suffix = o.join("") + "/";
	}
	return `https://screenshot.11ty.app/${encodeURIComponent(fullUrl)}/opengraph/${suffix}`;
}
function getScreenshotUrlFromPath(path, options, cacheBustOverride) {
	let u = new URL(getFullUrlFromPath(path));

	// bust cache for the screenshot target URL, useful when the open graph images need a refresh
	u.searchParams.set("cache", cacheBustOverride || DEFAULT_CACHEBUSTER);

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
	if(process.env.ELEVENTY_RUN_MODE !== "build") {
		return [];
	}

	try {
		let colors = await getImageColors(target);
		return colors.filter(c => {
			// colors with good contrast with light text or extra good with dark text (white is boring)
			return (c.contrast.light >= 4.5 || c.contrast.dark > 7) && c.colorjs.oklch.l < .95;
		}).sort((a, b) => {
			// lightest + chroma colors first
			return (b.colorjs.oklch.l + b.colorjs.oklch.c) - (a.colorjs.oklch.l + a.colorjs.oklch.c);
		});
	} catch(e) {
		console.warn(`Error fetching colors for ${target}`, e.message);
		return [];
	}
}

export default function(eleventyConfig) {
	let TEMP_DIR = ".cache/@11ty/img/";
	let IMAGE_OUTPUT_DIR = path.join(eleventyConfig.directories.output, "img/built/");

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		urlPath: "/img/built/",
		// go through .cache on build
		outputDir: process.env.ELEVENTY_RUN_MODE === "build" ? TEMP_DIR : IMAGE_OUTPUT_DIR,
		failOnError: false,
		formats: ["svg", "avif", "jpeg"],
		svgShortCircuit: true,
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
				sizes: SIZES_INLINE
			},
			pictureAttributes: {},
		}
	});

	if(process.env.ELEVENTY_RUN_MODE === "build") {
		// copy .cache to output folder
		eleventyConfig.on("eleventy.after", () => {
			fs.cpSync(TEMP_DIR, IMAGE_OUTPUT_DIR, { recursive: true });
		});
	}


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

	/* Hosted image service to optimize webmention photos */
	eleventyConfig.addLiquidFilter("eleventyImageServiceAvatar", (url) => {
		return `https://v1.image.11ty.dev/${encodeURIComponent(url)}/jpeg/72/`;
	});

	// Screenshots
	eleventyConfig.addLiquidShortcode("screenshotImageHtmlFullUrl", screenshotImageHtmlFullUrl);
	eleventyConfig.addLiquidShortcode("rawScreenshotImageFromFullUrl", function(fullUrl, options) {
		return getScreenshotUrl(fullUrl, options);
	});
	eleventyConfig.addLiquidShortcode("rawScreenshotImage", function(postUrl, options) {
		return getScreenshotUrlFromPath(postUrl, options);
	});

	// Used to add eleventy:ignore to opengraph images that aren’t yet available for image optimization (would result in 404 not found opengraph images)
	function isRecentPost(date) {
		return (Date.now() - date.getTime()) < ONE_DAY*14;
	}
	eleventyConfig.addFilter("shouldSkipOpenGraphImageOptimization", async post => {
		return isRecentPost(post.date);
	});
	eleventyConfig.addLiquidShortcode("ogImageSource", async function({url, inputPath, date}) {

		// special title og images, only for _posts
		if(inputPath.startsWith("./_posts/")) {
			let cacheBustOverride;
			if(isRecentPost(date)) {
				let hasGitCreatedTimestamp = Boolean(await getCreatedTimestamp(inputPath));
				if(!hasGitCreatedTimestamp) {
					// if not checked into git
					return "";
				} else if(process.env.PRODUCTION_BUILD) {
					// recent posts have a cache bust specific to the latest build time (race condition, atomic deploys no longer exist apparently)
					cacheBustOverride = `_p${Date.now()}`;
				}
			}
			return getScreenshotUrlFromPath(`/opengraph${url}`, undefined, cacheBustOverride);
		}

		// raw screenshot
		return getScreenshotUrlFromPath(url);
	});
};

export {
	screenshotImageHtmlFullUrl,
	opengraphImageHtmlWithClass as opengraphImageHtml,
};

