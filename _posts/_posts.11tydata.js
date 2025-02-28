import { getOpenGraphImageUrl } from "../_11ty/imagePlugin.js";

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
					return getOpenGraphImageUrl(data.external_url, "jpeg");
				}
				if(data.metadata && data.metadata.youtubeId) {
					return getOpenGraphImageUrl(`https://www.youtube.com/watch?v=${data.metadata.youtubeId}` ,"jpeg");
				}
			}
		}
	}
}
