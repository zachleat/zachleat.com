import fs from "node:fs";
import path from "node:path";
import Image, { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { getImageColors } from "@11ty/image-color";

const SIZES_INLINE = "(min-width: 75em) 44.5625em, (min-width: 61.25em) 40.6875em, (min-width: 41.25em) 36.8125em, 96vw";

const CACHEBUSTER = process.env.PRODUCTION_BUILD ? "_20250802" : "_localdev1";

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
			duration: "14d",
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

			return `${fullUrl}${size}/${format}/${CACHEBUSTER}/`;
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
function getScreenshotUrlFromPath(path, options, cacheBusterOverride) {
	let u = new URL(getFullUrlFromPath(path));

	// bust cache for the screenshot target URL, useful when the open graph images need a refresh
	u.searchParams.set("cache", cacheBusterOverride || CACHEBUSTER);

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
		urlPath: "/img/built/",
		outputDir: ".cache/@11ty/img/",
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
		eleventyConfig.on("eleventy.after", () => {
			fs.cpSync(".cache/@11ty/img/", path.join(eleventyConfig.directories.output, "img/built/"), { recursive: true });
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
	eleventyConfig.addFilter("isRecentPost", function(date) {
		return Math.abs(Date.now() - date.getTime()) < 1000*60*60*24*2;
	});
	eleventyConfig.addLiquidShortcode("ogImageSource", function({url, inputPath, date}) {
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

