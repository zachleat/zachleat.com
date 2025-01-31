function openGraphImageUrl(url) {
	return `https://v1.opengraph.11ty.dev/${encodeURIComponent(url)}/auto/jpeg/`;
}

export default {
	author: "Zach Leatherman",
	layout: "layouts/post.liquid",
	permalink: function({page}) {
		return `/web/${ page.fileSlug }/`
	},
	tags: ["blog-post"],
	showOnHomePage: true,
	eleventyComputed: {
		seo: {
			openGraphBackgroundImage: function(data) {
				if(data.seo && data.seo.openGraphBackgroundImage) {
					return data.seo.openGraphBackgroundImage;
				}
				if(data.external_url && data.external_url.startsWith("https://www.youtube.com/watch?v=")) {
					return openGraphImageUrl(data.external_url);
				}
				if(data.metadata && data.metadata.youtubeId) {
					return openGraphImageUrl(`https://www.youtube.com/watch?v=${data.metadata.youtubeId}`);
				}
			}
		}
	}
}
