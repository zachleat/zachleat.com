const { DateTime } = require("luxon");
const { URL } = require("url");
const sanitizeHTML = require('sanitize-html')
const pluginRss = require("@11ty/eleventy-plugin-rss");
const siteData = require("./_data/site.json");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
// TODO replace with https://www.npmjs.com/package/striptags
// const stripHtml = require("string-strip-html");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight);

	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.setLiquidOptions({
		strict_filters: true
	});

	eleventyConfig.addLayoutAlias('default', 'layouts/default.liquid');
	eleventyConfig.addLayoutAlias('page', 'layouts/page.liquid');
	eleventyConfig.addLayoutAlias('post', 'layouts/post.liquid');

	eleventyConfig.addPassthroughCopy("css/fonts");
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("wp-content");
	eleventyConfig.addPassthroughCopy("dist");

	eleventyConfig.addLiquidFilter("medialengthCleanup", str => {
		let split = str.split(" ");
		return `${split[0]}<span aria-hidden="true">m</span><span class="sr-only"> minutes</span>`;
	});

	eleventyConfig.addLiquidFilter("simpleTagStrip", str => {
		return str.replace(/<[^>]*>/g, "");
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

	eleventyConfig.addLiquidFilter("timePosted", date => {
		let numDays = ((Date.now() - date) / (1000 * 60 * 60 * 24));
		let daysPosted = Math.round( parseFloat( numDays ) );
		let yearsPosted = parseFloat( (numDays / 365).toFixed(1) );

		if( daysPosted < 365 ) {
			return daysPosted + " day" + (daysPosted !== 1 ? "s" : "");
		} else {
			return yearsPosted + " year" + (yearsPosted !== 1 ? "s" : "");
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

	eleventyConfig.addLiquidFilter("readableDateFromISO", dateStr => {
		return DateTime.fromISO(dateStr).toFormat("dd LLL yyyy 'at' hh:mma");
	});

	eleventyConfig.addFilter('dateFromTimestamp', timestamp => {
		return DateTime.fromISO(timestamp, { zone: 'utc' }).toJSDate()
	});

	eleventyConfig.addLiquidFilter("longWordWrap", str => {
		let words = {
			"domcontentloaded": true,
			"getelementsbytagname": true
		};

		return str.split(" ").map(function(word) {
			return word.split("—").map(function(word) {
				return word.split("(").map(function(word) {
					return word.split(")").map(function(word) {
						return words[word.toLowerCase()] || word.length >= 12 ? `<span class="long-word">${word}</span>` : word;
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
		return `<span aria-hidden="true">${content}</span>`;
	});

	eleventyConfig.addLiquidFilter("wordcount", function(content) {
		let words = content.split(" ").length;
		let wordsLabel = "word" + (words !== 1 ? "s" : "");
		return `${words} ${wordsLabel}`;
	});

	eleventyConfig.addLiquidShortcode("youtubeEmbed", function(slug) {
		return `<div class="fullwidth"><div class="fluid-width-video-wrapper"><iframe class="youtube-player" src="https://www.youtube.com/embed/${slug}/" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>`;
	});

	function getPosts(collectionApi) {
		return collectionApi.getFilteredByGlob("./_posts/*").reverse().filter(function(item) {
			return !!item.data.permalink;
		});
	}

	eleventyConfig.addCollection("posts", function(collection) {
		return getPosts(collection);
	});

	eleventyConfig.addCollection("feedPosts", function(collection) {
		return getPosts(collection).filter(function(item) {
			return !item.data.tags ||
				item.data.tags.indexOf("deprecated") === -1 &&
				!item.data.deprecated &&
				!item.data.feedtrim &&
				item.data.tags.indexOf("pending") === -1 &&
				item.data.tags.indexOf("draft") === -1;
		});
	});

	eleventyConfig.addCollection("noteTagList", function(collection) {
		let noteTags = new Set();
		collection.getAll().forEach(function(item) {
			if(Array.isArray(item.data["note-tags"])) {
				for(let noteTag of item.data["note-tags"]) {
					noteTags.add(noteTag);
				}
			}
		});
		return Array.from(noteTags).sort();
	});

	eleventyConfig.addCollection("noteTagCollections", function(collection) {
		let resultArrays = {};
		collection.getAll().forEach(function(item) {
			if(Array.isArray(item.data["note-tags"])) {
				for(let noteTag of item.data["note-tags"]) {
					if( !resultArrays[noteTag] ) {
						resultArrays[noteTag] = [];
					}
					resultArrays[noteTag].push(item);
				}
			}
		});
		return resultArrays;
	});


	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if( n < 0 ) {
			return array.slice(n);
		}
		return array.slice(0, n);
	});

	function hasTag(post, tag) {
		return "tags" in post.data && post.data.tags && post.data.tags.indexOf(tag) > -1;
	}
	eleventyConfig.addCollection("latestPosts", function(collection) {
		let posts = collection.getSortedByDate().reverse();
		let items = [];
		for( let item of posts ) {
			if( !!item.inputPath.match(/\/_posts\//) && !hasTag(item, "external") ) {
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
			return "categories" in item.data && item.data.categories && item.data.categories.indexOf("presentations") > -1 || hasTag(item, "speaking");
		}).reverse();
	});

	eleventyConfig.addCollection("popularPostsRanked", function(collection) {
		return collection.getFilteredByTag("popular-posts").sort(function(a, b) {
			return b.data.postRank - a.data.postRank;
		}).reverse();
	});

	eleventyConfig.addCollection("popularPostsTotalRanked", function(collection) {
		return collection.getFilteredByTag("popular-posts-total").sort(function(a, b) {
			return b.data.postRankTotalViews - a.data.postRankTotalViews;
		}).reverse();
	});

	// Webmentions Filter
	eleventyConfig.addFilter('webmentionsForUrl', (webmentions, url) => {
		const allowedTypes = ['mention-of', 'in-reply-to']
		const allowedHTML = {
			allowedTags: ['b', 'i', 'em', 'strong', 'a'],
			allowedAttributes: {
				a: ['href']
			}
		}

		const clean = entry => {
			const { content } = entry
			if (content && content['content-type'] === 'text/html') {
				content.value = sanitizeHTML(content.value, allowedHTML)
			}
			return entry
		}

		return webmentions
			.filter(entry => entry['wm-target'] === url)
			.filter(entry => allowedTypes.includes(entry['wm-property']))
			// .filter(entry => !!entry.content)
			.map(clean)
	})

	return {
		"templateFormats": [
			"liquid",
			"md",
			"njk",
			"html"
		],
		"pathPrefix": "/web/",
		"passthroughFileCopy": true,
		"dataTemplateEngine": false,
		"htmlTemplateEngine": "liquid",
		"markdownTemplateEngine": "liquid"
	};
};