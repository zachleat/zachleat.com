import analyticsData from "../_data/analytics.json" with { type: "json" };

export default function(eleventyConfig) {
	let total = 0;
	for(let url in analyticsData) {
		total += analyticsData[url].pageViews;
	}
	eleventyConfig.addGlobalData("totalAnalyticsPageViews", total);

	eleventyConfig.addCollection("popularPostsRanked", function(collection) {
		return collection.getFilteredByGlob("./_posts/**/*.md").filter(item => {
			if(!analyticsData[item.url]) {
				return false;
			}
			return true;
		}).sort(function(a, b) {
			return analyticsData[b.url].rankPerDaysPosted - analyticsData[a.url].rankPerDaysPosted;
		}).reverse().slice(0, 20);
	});

	eleventyConfig.addCollection("popularPostsTotalRanked", function(collection) {
		return collection.getFilteredByGlob("./_posts/**/*.md").filter(item => {
			if(!analyticsData[item.url]) {
				return false;
			}
			return true;
		}).sort(function(a, b) {
			return analyticsData[b.url].rankTotal - analyticsData[a.url].rankTotal;
		}).reverse().slice(0, 20);
	});

};
