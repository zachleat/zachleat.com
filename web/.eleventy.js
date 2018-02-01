const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight);

	eleventyConfig.addLayoutAlias('default', 'layouts/default.liquid');
	eleventyConfig.addLayoutAlias('page', 'layouts/page.liquid');
	eleventyConfig.addLayoutAlias('post', 'layouts/post.liquid');

	eleventyConfig.addFilter("readableDate", dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
	});

	eleventyConfig.addLiquidFilter("reading_time", function(content) {
		let wordsPerMinute = 100;
		let words = content.split(" ").length;
		let minutes = Math.floor(words / wordsPerMinute);
		let minutesLabel = "minute" + (minutes !== 1 ? "s" : "");
		return minutes > 0 ? `about ${minutes} ${minutesLabel}` : 'less than a minute';
	});

	function postsMarkdown(item) {
		// Only return content that was originally a markdown file
		let extension = item.inputPath.split('.').pop();
		return item.inputPath.indexOf("./_posts/") === 0 && extension === "md";
	}

	eleventyConfig.addCollection("posts", function(collection) {
		return collection.getAllSorted().reverse().filter(postsMarkdown);
	});

	// font-loading category mapped to collection
	eleventyConfig.addCollection("font-loading", function(collection) {
		return collection.getAllSorted().filter(function(item) {
			return "categories" in item.data && item.data.categories && item.data.categories.indexOf("font-loading") > -1;
		}).reverse();
	});

	// projects
	eleventyConfig.addCollection("projects", function(collection) {
		return collection.getFilteredByTag("project").reverse();
	});

	// presentations category mapped to collection
	eleventyConfig.addCollection("presentations", function(collection) {
		return collection.getAllSorted().filter(function(item) {
			return "categories" in item.data && item.data.categories && item.data.categories.indexOf("presentations") > -1;
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

	eleventyConfig.addCollection("feedPosts", function(collection) {
		return collection.getAllSorted().reverse().filter(postsMarkdown).filter(function(item) {
			return !item.data.tags ||
				item.data.tags.indexOf("deprecated") === -1 &&
				item.data.tags.indexOf("feedtrim") === -1 &&
				item.data.tags.indexOf("upcoming") === -1 &&
				item.data.tags.indexOf("pending") === -1;
		});
	});

	return {
		"templateFormats": [
			"liquid",
			"md",
			"njk",
			"html",
			"woff2",
			"woff",
			"css",
			"js",
			"jpg",
			"png",
			"webp",
			"mp4"
		],
		"pathPrefix": "/web/",
		"passthroughFileCopy": true,
		"htmlTemplateEngine": "liquid",
		"markdownTemplateEngine": "liquid"
	};
};