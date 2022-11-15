module.exports = class {
	data() {
		return {
			permalink: "/follow/follow.rss",
			layout: false,
			eleventyExcludeFromCollections: true
		}
	}

	async render() {
		const { ActivityFeed } = await import("@11ty/eleventy-activity-feed");

		let feed = new ActivityFeed();

		feed.setCacheDuration("1h"); // cache is persisted now, so we’ll update this at maximum once per hour

		feed.addSource("youtubeUser", "YouTube", "UCMlSs0Ltg57qpYdFwUVLR2A");
		feed.addSource("atom", "Blog","https://www.zachleat.com/web/feed/");
		feed.addSource("rss", "Mastodon", "https://fediverse.zachleat.com/users/zachleat.rss");
		feed.addSource("twitterUser", "Twitter", "zachleat", "96383");

		return feed.toRssFeed({
			title: "Zach Leatherman’s Activity Feed",
			language: "en",
			url: "https://www.zachleat.com/follow.rss",
			subtitle: "One centralized feed of Eleventy activity across the web.",
		});
	}
};
