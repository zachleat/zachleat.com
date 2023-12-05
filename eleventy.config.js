const pkg = require("./package.json");

const { DateTime } = require("luxon");
const { URL } = require("url");
const numeral = require("numeral");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItToc = require("markdown-it-table-of-contents");
const {encode} = require("html-entities");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

const siteData = require("./_data/site.json");

const pluginImage = require("./_11ty/imagePlugin.js");
const screenshotImageHtmlFullUrl = pluginImage.screenshotImageHtmlFullUrl;
const pluginSass = require("./_11ty/sassPlugin.js");
const pluginImageAvatar = require("./_11ty/imageAvatarPlugin.js");
const pluginWebmentions = require("./_11ty/webmentionsPlugin.js");
const pluginAnalytics = require("./_11ty/analyticsPlugin.js");

module.exports = function(eleventyConfig) {
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	// More in .eleventyignore
	if(!process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.ignores.add("./follow/*");
		eleventyConfig.ignores.add("./web/feed/*");
		eleventyConfig.ignores.add("./web/opengraph-images.liquid");
	}

	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setDataDeepMerge(true);
	eleventyConfig.setQuietMode(true);

	eleventyConfig.setLiquidOptions({
		jsTruthy: true
	});

	eleventyConfig.setServerOptions({
		domdiff: false,
		showVersion: false,
	});

	/* PLUGINS */
	eleventyConfig.addPlugin(pluginSass);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight);
	eleventyConfig.addPlugin(pluginImage);
	eleventyConfig.addPlugin(pluginImageAvatar);

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"_components/**/*.webc",
			"npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc",
		],
		useTransform: true,
		transformData: {
			pkg
		}
	});

	eleventyConfig.addPlugin(pluginWebmentions);
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(pluginAnalytics);

	/* COPY */
	eleventyConfig
		.addPassthroughCopy({
			// WebC assets
			"_components/*.{css,js}": `static/`,

			// CSS/JS
			"static/fonts": "static/fonts",
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
	if(process.env.ELEVENTY_PRODUCTION) {
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
	eleventyConfig.addFilter("archiveUrl", (url, targetYear) => {
		if(!targetYear) {
			targetYear = (new Date).getFullYear();
		}
		return `https://web.archive.org/web/20230000000000*/${url}`;
	});

	eleventyConfig.addFilter("leftpad", (str, length = 3) => {
		let padding = Array.from({length}).map(t => "0").join("");
		return (padding + str).substring((""+str).length);
	});

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

	eleventyConfig.addLiquidFilter("htmlEntities", str => {
		return encode(str);
	});

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

	eleventyConfig.addLiquidFilter("timePosted", (startDate, endDate = Date.now()) => {
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

	eleventyConfig.addLiquidFilter("longWordWrap", str => {
		if( !str || typeof str === "string" && str.indexOf("<") > -1 && str.indexOf(">") > str.indexOf("<")) {
			return str;
		}

		let words = {
			"domcontentloaded": true,
			"getelementsbytagname": true
		};

		return str.split(" ").map(function(word) {
			return word.split("—").map(function(word) {
				return word.split("(").map(function(word) {
					return word.split(")").map(function(word) {
						return words[word.toLowerCase()] || word.length >= 11 ? `<span class="long-word">${word}</span>` : word;
					}).join(")");
				}).join("(");
			}).join("—");
		}).join(" ");
	});

	eleventyConfig.addLiquidFilter("orphanWrap", str => {
		return str.split("—").map(function(str, index, dashSplit) {
			// Uncomment this to prevent orphans only at the end of the string, not before every —
			// if( index !== dashSplit.length - 1 ) {
			// 	return str;
			// }

			let splitSpace = str.split(" ");
			let after = "";
			if( splitSpace.length > 1 ) {
				if( splitSpace.length > 2 ) {
					after += " ";
				}

				// TODO strip HTML from this?
				let lastWord = splitSpace.pop();
				let secondLastWord = splitSpace.pop();
				// skip when last two words are super long 😭
				if(`${secondLastWord} ${lastWord}`.length >= 15) {
					after += `${secondLastWord} ${lastWord}`;
				} else {
					after += `<span class="prevent-orphan">${secondLastWord} ${lastWord}</span>`;
				}
			}

			return splitSpace.join(" ") + after;
		}).join("​—​");
	});

	eleventyConfig.addLiquidFilter("emoji", function(content) {
		return `<span aria-hidden="true" class="emoji">${content}</span>`;
	});

	eleventyConfig.addLiquidFilter("wordcount", function(content) {
		let words = content.split(" ").length;
		let wordsLabel = "word" + (words !== 1 ? "s" : "");
		return `${words} ${wordsLabel}`;
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if( n < 0 ) {
			return array.slice(n);
		}
		return array.slice(0, n);
	});

	eleventyConfig.addFilter('localUrl', (absoluteUrl) => {
		return absoluteUrl.replace("https://www.zachleat.com", "");
	});

	eleventyConfig.addFilter("processAsWebC", async function(content) {
		content = `<template webc:nokeep webc:nobundle>${content}</template>`;

		return eleventyConfig.javascriptFunctions.renderTemplate.call(this, content, "webc");
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

	/* END FILTERS */

	/* SHORTCODES */
	eleventyConfig.addLiquidShortcode("originalPostEmbed", function(url, skipIcon = false) {
		return `<script type="module" src="/static/browser-window.js"></script>
<div><browser-window mode="dark"${skipIcon ? "" : " icon"} url="${url}" shadow flush><a href="${url}" class="favicon-optout">${screenshotImageHtmlFullUrl(url)}</a></browser-window></div>`;
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

	eleventyConfig.addCollection("homepageNewestPosts", function(collection) {
		return getPosts(collection).filter(({data}) => data.showOnHomePage === true);
	});

	eleventyConfig.addCollection("upcomingTalks", function(collection) {
		return getPosts(collection).reverse().filter(item => {
			let tags = item.data?.tags || [];
			return tags.includes("future-event") && tags.includes("speaking");
		});
	});

	eleventyConfig.addCollection("feedPosts", function(collection) {
		return getPosts(collection).filter(function(item) {
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
			"note",
			"web-components",
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
	let options = {
		html: true,
		breaks: true,
		linkify: true
	};

	let md = markdownIt(options).use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.ariaHidden({
			placement: "after",
			class: "direct-link",
			symbol: "#",
			level: [1,2,3,4],
		}),
		slugify: eleventyConfig.getFilter("slug")
	}).use(markdownItToc, {
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
	});;

	eleventyConfig.setLibrary("md", md);

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

	return {
		"templateFormats": [
			"liquid",
			"md",
			"njk",
			"html",
			"11ty.js",
		],
		"htmlTemplateEngine": "liquid",
		"markdownTemplateEngine": "liquid"
	};
};
