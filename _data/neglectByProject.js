import EleventyFetch from "@11ty/eleventy-fetch";

const SERVICE_URL = "https://zachleat.github.io/is-this-still-being-maintained/report.json";
const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "build" ? "2m" : "30m";

// Keyed by `nameWithOwner` (the same `owner/repo` shape a post's `githubProjectName` front
// matter uses), so a post can look up its own project directly. Each value is an Array: a
// workspace repo publishes several packages under one `nameWithOwner` and a post about the repo
// shows a card for each, with the package at the repo root leading (e.g. speedlify2 before
// speedlify2-score).
export default async function() {
	try {
		let report = await EleventyFetch(SERVICE_URL, {
			type: "json",
			duration: CACHE_DURATION,
		});

		let byProject = {};
		for(let project of report.projects) {
			(byProject[project.nameWithOwner] ??= []).push(project);
		}

		// The repo-root package leads; the rest keep report order
		for(let projects of Object.values(byProject)) {
			projects.sort((a, b) => Boolean(a.workspacePath) - Boolean(b.workspacePath));
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
