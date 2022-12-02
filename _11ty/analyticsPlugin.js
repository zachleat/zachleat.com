const analyticsData = require("../_data/analytics.json");

module.exports = function(eleventyConfig) {
	let total = 0;
	for(let url in analyticsData) {
		total += analyticsData[url].pageViews;
	}
	eleventyConfig.addGlobalData("totalAnalyticsPageViews", total);

	eleventyConfig.addCollection("popularPostsRanked", function(collection) {
		return collection.getFilteredByGlob("./_posts/*.md").filter(item => {
			if(process.env.ELEVENTY_PRODUCTION && item.data.tags && item.data.tags.includes("draft")) {
				return false;
			}
			if(!analyticsData[item.url]) {
				return false;
			}
			return true;
		}).sort(function(a, b) {
			return analyticsData[b.url].rankPerDaysPosted - analyticsData[a.url].rankPerDaysPosted;
		}).reverse().slice(0, 20);
	});

	eleventyConfig.addCollection("popularPostsTotalRanked", function(collection) {
		return collection.getFilteredByGlob("./_posts/*.md").filter(item => {
			if(process.env.ELEVENTY_PRODUCTION && item.data.tags && item.data.tags.includes("draft")) {
				return false;
			}
			if(!analyticsData[item.url]) {
				return false;
			}
			return true;
		}).sort(function(a, b) {
			return analyticsData[b.url].rankTotal - analyticsData[a.url].rankTotal;
		}).reverse().slice(0, 20);
	});

};
