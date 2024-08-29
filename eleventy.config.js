const fs = require("node:fs");
const path = require("node:path");
const { DateTime } = require("luxon");
const { URL } = require("url");
const numeral = require("numeral");
const markdownIt = require("markdown-it");
const markdownItToc = require("markdown-it-table-of-contents");
const { encode } = require("html-entities");
const { YoutubeTranscript } = require("youtube-transcript");
const { AssetCache } = require("@11ty/eleventy-fetch");

const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginWebc = require("@11ty/eleventy-plugin-webc");

const siteData = require("./_data/site.json");
const pluginImage = require("./_11ty/imagePlugin.js");
const { imageShortcode, opengraphImageHtml, screenshotImageHtmlFullUrl } = pluginImage;

const pluginSass = require("./_11ty/sassPlugin.js");
const pluginImageAvatar = require("./_11ty/imageAvatarPlugin.js");
const pluginWebmentions = require("./_11ty/webmentionsPlugin.js");
const pluginAnalytics = require("./_11ty/analyticsPlugin.js");

const JS_ENABLED = true;

module.exports = async function(eleventyConfig) {
	const { RenderPlugin, IdAttributePlugin } = await import("@11ty/eleventy");
	const { default: memoize } = await import("memoize");

	eleventyConfig.addGlobalData("JS_ENABLED", () => JS_ENABLED);

	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	// More in .eleventyignore
	if(!process.env.PRODUCTION_BUILD) {
		eleventyConfig.ignores.add("./follow/*");
		eleventyConfig.ignores.add("./web/opengraph-images.liquid");
	}

	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setDataDeepMerge(true);
	eleventyConfig.setQuietMode(true);

	eleventyConfig.setLiquidOptions({
		jsTruthy: true
	});

	eleventyConfig.setServerOptions({
		domDiff: false,
		// showVersion: true,
	});

	/* PLUGINS */
	eleventyConfig.addPlugin(pluginSass);
	eleventyConfig.addPlugin(pluginSyntaxHighlight);
	eleventyConfig.addPlugin(pluginImage);
	eleventyConfig.addPlugin(pluginImageAvatar);
	eleventyConfig.addPlugin(IdAttributePlugin);

	if(process.env.PRODUCTION_BUILD) {
		eleventyConfig.addPlugin(feedPlugin, {
			outputPath: "/web/feed/atom.xml",
			collection: {
				name: "feedPosts",
				limit: 10,
			},
			metadata: {
				language: "en",
				title: siteData.name,
				subtitle: siteData.description,
				base: siteData.url,
				author: {
					name: siteData.name,
				}
			}
		});
	}
	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"_components/**/*.webc",
			"npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc",
		],
	});

	eleventyConfig.addPlugin(pluginWebmentions);
	eleventyConfig.addPlugin(RenderPlugin, {
		accessGlobalData: true,
	});
	eleventyConfig.addPlugin(pluginAnalytics);

	/* COPY */
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	eleventyConfig
		.addPassthroughCopy({
			// WebC assets
			"_components/*.{css,js}": `static/`,

			// CSS/JS
			"static/fonts": "static/fonts",
			"static/js": "static/js",
			"static/*.{css,js}": "static/",

			// External modules
			"node_modules/@zachleat/details-utils/details-utils.js": `static/details-utils.js`,
			"node_modules/speedlify-score/speedlify-score.{css,js}": `static/`,
			"node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}": `static/`,
			"node_modules/infinity-burger/infinity-burger.{css,js}": `static/`,
			"node_modules/artificial-chart/artificial-chart.{css,js}": `static/`,
			"node_modules/@zachleat/table-saw/table-saw.js": `static/table-saw.js`,
			"node_modules/@zachleat/browser-window/browser-window.js": `static/browser-window.js`,
			"node_modules/@zachleat/squirminal/squirminal.js": `static/squirminal.js`,
			"node_modules/@zachleat/pagefind-search/pagefind-search.js": `static/pagefind-search.js`,
			"node_modules/@zachleat/snow-fall/snow-fall.js": `static/snow-fall.js`,
			"node_modules/@zachleat/carouscroll/carouscroll.js": `static/carouscroll.js`,
			"node_modules/@zachleat/heading-anchors/heading-anchors.js": `static/heading-anchors.js`,
		})
		.addPassthroughCopy("humans.txt")
		.addPassthroughCopy("resume/index.css")
		.addPassthroughCopy("img/")
		.addPassthroughCopy("web/img")
		.addPassthroughCopy("web/wp-content")
		.addPassthroughCopy("og/*.{jpeg,png}")
		.addPassthroughCopy("og/sources/")
		.addPassthroughCopy("presentations/");

	// Production only passthrough copy
	if(process.env.PRODUCTION_BUILD) {
		eleventyConfig
			.addPassthroughCopy("keybase.txt")
			.addPassthroughCopy("_redirects")
			.addPassthroughCopy("demos/")
			.addPassthroughCopy("resume/resume.pdf")
			.addPassthroughCopy("archive/")
			.addPassthroughCopy("web-fonts/foitfout/")
			.addPassthroughCopy("test/")
			.addPassthroughCopy("alarmd/");
	}

	/* LAYOUTS */
	eleventyConfig.addLayoutAlias("default", "layouts/default.liquid");
	eleventyConfig.addLayoutAlias("post", "layouts/post.liquid");

	/* FILTERS */

	eleventyConfig.addFilter("tweetbackUrl", async (url) => {
		const { transform } = await import("@tweetback/canonical");
		return transform(url);
	});

	eleventyConfig.addFilter("archiveUrl", (url, targetYear) => {
		if(!targetYear) {
			targetYear = (new Date).getFullYear();
		}
		return `https://web.archive.org/web/20230000000000*/${url}`;
	});

	function leftpad(str, length = 3) {
		let padding = Array.from({length}).map(t => "0").join("");
		return (padding + str).substring((""+str).length);
	}
	eleventyConfig.addFilter("leftpad", leftpad);

	eleventyConfig.addFilter("truncate", (str, len = 280) => { // tweet sized default
		let suffix = str.length > len ? `… <span class="tag-inline">Truncated</span>` : "";
		return str.substr(0, len) + suffix;
	});

	eleventyConfig.addFilter("selectRandomFromArray", (arr) => {
		let index = Math.floor(Math.random() * arr.length);
		return arr[index];
	});

	eleventyConfig.addLiquidFilter("numberString", function(num) {
		let strs = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
		if( num < strs.length ) {
			return strs[num];
		}
		return num;
	});

	// Count total number of items that have speaking metadata set
	eleventyConfig.addLiquidFilter("getSpeakingCount", function(allCollection, propName, propValueMatch) {
		let count = 0;
		for(let item of allCollection) {
			if(item.data.metadata && item.data.metadata.speaking && item.data.metadata.speaking[propName] && (!propValueMatch || item.data.metadata.speaking[propName] === propValueMatch)) {
				count++;
			}
		}
		return count;
	});

	// Count unique number of items for a speaking metadata property
	eleventyConfig.addLiquidFilter("getSpeakingUniqueCount", function(allCollection, propName) {
		let count = new Set();
		for(let item of allCollection) {
			if(item.data.metadata && item.data.metadata.speaking && item.data.metadata.speaking[propName]) {
				count.add(item.data.metadata.speaking[propName]);
			}
		}
		return count.size;
	});

	eleventyConfig.addLiquidFilter("renderNumber", function renderNumber(num) {
		return numeral(parseInt(num, 10)).format("0,0");
	});

	eleventyConfig.addLiquidFilter("round", function(num, digits = 2) {
		return parseFloat(num).toFixed(digits);
	});

	eleventyConfig.addLiquidFilter("medialengthCleanup", str => {
		let split = str.split(" ");
		return `${split[0]}<span aria-hidden="true">m</span><span class="sr-only"> minutes</span>`;
	});

	eleventyConfig.addLiquidFilter("encodeUriComponent", str => {
		return encodeURIComponent(str);
	});

	eleventyConfig.addLiquidFilter("htmlEntities", memoize(str => {
		return encode(str);
	}));

	eleventyConfig.addLiquidFilter("absoluteUrl", (url, base) => {
		if( !base ) {
			base = siteData.url;
		}
		try {
			return (new URL(url, base)).toString();
			} catch(e) {
			console.log(`Trying to convert ${url} to be an absolute url with base ${base} and failed.`);
			return url;
		}
	});

	eleventyConfig.addFilter("timePosted", (startDate, endDate = Date.now()) => {
		if(typeof startDate === "string") {
			startDate = Date.parse(startDate);
		}
		if(typeof endDate === "string") {
			endDate = Date.parse(endDate);
		}
		let numDays = ((endDate - startDate) / (1000 * 60 * 60 * 24));
		let prefix = "";
		if(numDays < 0) {
			prefix = "in ";
			numDays = Math.abs(numDays);
		}

		let daysPosted = Math.round( parseFloat( numDays ) );
		let yearsPosted = parseFloat( (numDays / 365).toFixed(1) );

		if( daysPosted < 365 ) {
			return prefix + daysPosted + " day" + (daysPosted !== 1 ? "s" : "");
		} else {
			return prefix + yearsPosted + " year" + (yearsPosted !== 1 ? "s" : "");
		}
	});

	eleventyConfig.addNunjucksFilter("rssNewestUpdatedDate", collection => {
		if( !collection || !collection.length ) {
			throw new Error( "Collection is empty in lastUpdatedDate filter." );
		}

		return DateTime.fromJSDate(collection[ 0 ].date).toISO({ includeOffset: true, suppressMilliseconds: true });
	});

	eleventyConfig.addFilter("readableDate", dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat("LLLL dd, yyyy");
	});

	eleventyConfig.addLiquidFilter("readableDateFromISO", (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
		return DateTime.fromISO(dateStr).toFormat(formatStr);
	});

	eleventyConfig.addLiquidFilter("twitterUsernameFromUrl", (url) => {
		if( url.indexOf("https://twitter.com/") > -1 ) {
			return "@" + url.replace("https://twitter.com/", "");
		}
	});

	eleventyConfig.addLiquidFilter("getPostCountForYear", (posts, year) => {
		return posts.filter(function(post) {
			return post.data.page.date.getFullYear() === parseInt(year, 10);
		}).length;
	});

	//<img src="https://v1.sparkline.11ty.dev/400/100/1,4,10,3,2,40,5,6,20,40,5,1,10,100,5,90/red/" width="400" height="100">
	eleventyConfig.addLiquidFilter("getYearlyPostCount", (posts, startYear = 2007) => {
		let years = [];
		for(let j = startYear; j <= (new Date()).getFullYear(); j++) {
			let year = j;
			let count = posts.filter(function(post) {
				return post.data.page.date.getFullYear() === parseInt(year, 10);
			}).length;
			years.push(count);
		}
		return years.join(",");
	});

	eleventyConfig.addLiquidFilter("getMonthlyPostCount", (posts, year) => {
		let months = [];
		for(let month = 0; month < 12; month++) {
			let count = posts.filter(function(post) {
				let d = post.data.page.date;
				return d.getFullYear() === parseInt(year, 10) && d.getMonth() === month;
			}).length;

			months.push(count);
		}
		return months.join(",");
	});

	eleventyConfig.addLiquidFilter("hostnameFromUrl", (url) => {
		let urlObject = new URL(url);
		return urlObject.hostname;
	});

	eleventyConfig.addLiquidFilter("emoji", function(content) {
		return `<span aria-hidden="true" class="emoji">${content}</span>`;
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if( n < 0 ) {
			return array.slice(n);
		}
		return array.slice(0, n);
	});

	eleventyConfig.addFilter("localUrl", (absoluteUrl) => {
		return absoluteUrl.replace("https://www.zachleat.com", "");
	});

	eleventyConfig.addFilter("nameToFlag", (countryName = "") => {
		let flag = {
			"germany": "🇩🇪",
			"us": "🇺🇸",
			"usa": "🇺🇸",
			"netherlands": "🇳🇱",
			"canada": "🇨🇦",
			"spain": "🇪🇸",
			"belarus": "🇧🇾",
			"united kingdom": "🇬🇧",
			"nigeria": "🇳🇬",
			"romania": "🇷🇴",
		}[countryName.toLowerCase()] || "";

		return `<span role="img" aria-label="${countryName}">${flag}</span>`;
	});

	eleventyConfig.addJavaScriptFunction("fetchYoutubeTranscript", async (videoId) => {
		let asset = new AssetCache(`youtube_transcript_${videoId}`);
		if(asset.isCacheValid("*")) {
			return asset.getCachedValue();
		}

		// Remote call
		let transcript = await YoutubeTranscript.fetchTranscript(videoId);
		await asset.save(transcript, "json");
		return transcript;
	});
	/* END FILTERS */

	/* SHORTCODES */
	eleventyConfig.addLiquidShortcode("originalPostEmbed", function(url, skipIcon = false, mode = "screenshot") {
		if(url.startsWith("https://www.youtube.com/") || url.startsWith("https://youtube.com/")) {
			mode = "opengraph";
		}

		let imageHtml = "";
		if(mode === "screenshot") {
			imageHtml = screenshotImageHtmlFullUrl(url);
		} else if(mode === "opengraph") {
			imageHtml = opengraphImageHtml(url);
		}

		return `${JS_ENABLED ? `<script type="module" src="/static/browser-window.js"></script>` : ""}
<div><browser-window mode="dark"${skipIcon ? "" : " icon"} url="${url}" shadow flush><a href="${url}" class="favicon-optout">${imageHtml}</a></browser-window></div>`;
	});

	/* COLLECTIONS */
	function getPosts(collectionApi) {
		return collectionApi.getFilteredByGlob("./_posts/*").reverse().filter(function(item) {
			return !!item.data.permalink;
		});
	}

	eleventyConfig.addCollection("posts", function(collection) {
		return getPosts(collection);
	});

	eleventyConfig.addCollection("activePosts", function(collection) {
		return getPosts(collection).filter(function(item) {
			return !item.data.deprecated;
		});
	});

	eleventyConfig.addCollection("pinnedPosts", function(collection) {
		return getPosts(collection).filter(({data}) => data.pinned === true)
	});

	eleventyConfig.addCollection("homepageNewestPosts", function(collection) {
		return getPosts(collection)
			.filter(({data}) => data.showOnHomePage === true)
			.sort((a, b) => {
				if(a.data.pinned && b.data.pinned) {
					return 0;
				}
				if(a.data.pinned) {
					return -1;
				}
				if(b.data.pinned) {
					return 1;
				}
				return 0;
			})
	});

	eleventyConfig.addCollection("upcomingTalks", function(collection) {
		return getPosts(collection).reverse().filter(item => {
			let tags = item.data?.tags || [];
			return tags.includes("future-event") && tags.includes("speaking");
		});
	});

	eleventyConfig.addCollection("feedPosts", function(collection) {
		return getPosts(collection).reverse().filter(function(item) {
			return !item.data.tags ||
				!item.data.deprecated &&
				item.data.tags.indexOf("future-event") === -1;
		});
	});

	function hasTag(post, tag) {
		return "tags" in post.data && post.data.tags && post.data.tags.indexOf(tag) > -1;
	}
	function hasCategory(post, category) {
		return "categories" in post.data && post.data.categories && post.data.categories.indexOf(category) > -1;
	}
	function isWriting(item) {
		if(!item.inputPath.match(/\/_posts\//)) {
			return false;
		}

		if(hasTag(item, "writing")) {
			return true;
		}

		if(hasTag(item, "speaking") || hasCategory(item, "presentations")) {
			return false;
		}

		return true;
	}
	function isSpeaking(item) {
		return "categories" in item.data &&
			(item.data.categories || []).indexOf("presentations") > -1 || hasTag(item, "speaking");
	}

	eleventyConfig.addLiquidFilter("getFilterCategories", function(collectionItem) {
		let categories = [];
		if(isSpeaking(collectionItem)) {
			categories.push("speaking");
		}
		if(isWriting(collectionItem)) {
			categories.push("writing");
		}
		if(hasTag(collectionItem, "font-loading") || hasCategory(collectionItem, "font-loading")) {
			categories.push("web-fonts");
		}

		let tags = [
			"eleventy",
			"project",
			"web-components",
			"jamstack",
		];
		for(let tag of tags) {
			if(hasTag(collectionItem, tag)) {
				categories.push(tag);
			}
		}
		return categories.join(",");
	});

	eleventyConfig.addCollection("writing", function(collection) {
		return collection.getSortedByDate().reverse().filter(item => {
			return isWriting(item);
		});
	});
	eleventyConfig.addCollection("latestPosts", function(collection) {
		let posts = collection.getSortedByDate().reverse();
		let items = [];
		for( let item of posts ) {
			if( !!item.inputPath.match(/\/_posts\//)) {
				items.push( item );
				if( items.length >= 5 ) {
					return items;
				}
			}
		}
	});

	// font-loading category mapped to collection
	eleventyConfig.addCollection("font-loading", function(collection) {
		return collection.getAllSorted().filter(function(item) {
			return "categories" in item.data && item.data.categories && item.data.categories.indexOf("font-loading") > -1 || hasTag(item, "font-loading");
		}).reverse();
	});

	// presentations category mapped to collection
	eleventyConfig.addCollection("presentations", function(collection) {
		return collection.getAllSorted().filter(function(item) {
			return isSpeaking(item);
		}).reverse();
	});

	/* Markdown */
	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdLib.use(markdownItToc, {
			includeLevel: [2, 3, 4],
			slugify: eleventyConfig.getFilter("slug"),
			format: function(heading) {
				return heading;
			},
			transformLink: function(link) {
				if(typeof link === "string") {
					// remove backticks from markdown code
					return link.replace(/\%60/g, "");
				}
				return link;
			}
		})
	});

	let md = markdownIt({
		html: true,
		breaks: true,
		linkify: true,
	});

	eleventyConfig.addPairedShortcode("markdown", function(content, inline = false) {
		if(inline) {
			return md.renderInline(content);
		}
		return md.render(content);
	});

	eleventyConfig.addLiquidFilter("includes", function(arr = [], value) {
		return arr.includes(value);
	});

	eleventyConfig.addLiquidFilter("removeNewlines", function(str) {
		return str.replace(/\n/g, "");
	});

	// TODO this could be a webc component
	eleventyConfig.addShortcode("slides", async function (prefix, indeces, alts, links) {
		const {nanoid} = await import("nanoid");

		let [indexStart, indexEnd] = indeces.split("-");
		indexStart = parseInt(indexStart, 10);
		indexEnd = parseInt(indexEnd, 10) || indexStart; // "33" becomes "33-33"
		let isSingleSlide = indexStart === indexEnd;
		let id = `carouscroll-id-${nanoid(4)}`;

		let html = [];
		if(JS_ENABLED) {
			html.push(`<script type="module" src="/static/browser-window.js"></script>`);
		}
		html.push(`<div><browser-window shadow flush><is-land on:idle on:visible>`);
		if(JS_ENABLED) {
			html.push(`<template data-island><script type="module" src="/static/carouscroll.js"></script></template>`);
		}
		html.push(`<carou-scroll tabindex="0" id="${id}" class="carouscroll${isSingleSlide ? " carouscroll-single" : ""}"${isSingleSlide ? " disabled" : ""}>`);

		for(let j=indexStart, k=indexEnd; j <= k; j++) {
			let slidePath = path.join(".", `${prefix}${leftpad(j, 3)}.jpeg`);
			if(fs.existsSync(slidePath)) {
				if(links && links[j]) {
					html.push(`<a href="${links[j]}">`)
				}
				let alt = alts[j] ? alts[j] : `Slide ${j}`;
				html.push(await imageShortcode({
					src: slidePath,
					alt
				}, {
					widths: [600, 1000],
					eleventyConfig,
				}, true));

				// Fallback for perf if non_production?
				// html.push(`<img src="${slideUrl}" alt="${alt}" width="1920" height="1080" loading="lazy" decoding="async">`)
				if(links && links[j]) {
					html.push(`</a>`)
				}
			}
		}

		html.push(`</carou-scroll>`);
		if(!isSingleSlide) {
			html.push(`<div class="carouscroll-meta">`)
			html.push(`<button type="button" disabled data-carousel-previous="${id}">&lt; Previous</button>`);
			html.push(`<output data-carousel-output="${id}"></output>`);
			html.push(`<button type="button" disabled data-carousel-next="${id}">Next &gt;</button>`);
			html.push(`</browser-window></div>`)
		}
		html.push(`</is-land></div>`);

		return html.join("");
	});
};

module.exports.config = {
	templateFormats: [
		"liquid",
		"md",
		"njk",
		"html",
		"11ty.js",
	],
	htmlTemplateEngine: "liquid",
	markdownTemplateEngine: "liquid"
};
