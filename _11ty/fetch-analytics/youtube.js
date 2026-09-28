import 'dotenv/config'
import { getYoutubePosts, getYoutubeVideos } from "../webmentions/youtube.js";

// Video views keyed by the url path of the post that embeds the video
async function fetchData() {
	if(!process.env.YOUTUBE_API_KEY) {
		console.warn("[zachleat.com] unable to fetch YouTube views: no YOUTUBE_API_KEY specified in environment.");
		return {};
	}

	let posts = getYoutubePosts();
	let videos = await getYoutubeVideos(Object.keys(posts));
	let ret = {};
	for(let video of videos) {
		let urlPath = new URL(posts[video.id]).pathname;
		ret[urlPath] = { count: (ret[urlPath]?.count || 0) + (Number(video.statistics?.viewCount) || 0) };
	}
	return ret;
}

export { fetchData };
