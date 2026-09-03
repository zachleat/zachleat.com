import EleventyFetch from "@11ty/eleventy-fetch";

const SERVICE_URL = "https://zachleat.github.io/is-this-still-being-maintained/report.json";
const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "build" ? "2m" : "30m";

// Keyed by `nameWithOwner` (the same `owner/repo` shape a post's `githubProjectName` front
// matter uses), so a post can look up its own project’s current Neglect score directly.
export default async function() {
	try {
		let report = await EleventyFetch(SERVICE_URL, {
			type: "json",
			duration: CACHE_DURATION,
		});

		let byProject = {};
		for(let project of report.projects) {
			byProject[project.nameWithOwner] = project;
		}
		return byProject;
	} catch(e) {
		if(process.env.NODE_ENV === "production") {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.log("Failed getting Neglect project report, returning empty");
		return {};
	}
};
