import Fetch from "@11ty/eleventy-fetch";

const SERVICE_URL = "https://zachleat.github.io/is-this-still-being-maintained/";
const FETCH_OPTIONS = {
	type: "json",
	duration: process.env.ELEVENTY_RUN_MODE === "build" ? "2m" : "30m",
};

let report = await Fetch(SERVICE_URL + "report.json", FETCH_OPTIONS);
let sparklinesByPackageJson = await Fetch(SERVICE_URL + "report-sparklines.json", FETCH_OPTIONS);

export const sparklinesByPackage = sparklinesByPackageJson.packages;

let sparklineAggregateJson = await Fetch(SERVICE_URL + "report-sparkline-aggregate.json", FETCH_OPTIONS);

export const sparklineAggregate = sparklineAggregateJson.monthlyReleases;

export const packages = report.projects.sort((a, b) => {
	return b.score - a.score;
});

let totalCounts = {
	githubArchived: 0,
	npmDeprecated: 0,
	prs: { open: 0, closed: 0, merged: 0, },
	issues: { open: 0, closed: 0 },
	stars: 0,
	downloads: 0,
	publishes: 0,
	customElements: 0,
	audits: 0,
	packages: 0,
};

let reposSeen = new Set();
for(let pkg of report.projects) {
	totalCounts.githubArchived += pkg.isArchived ? 1 : 0;
	totalCounts.npmDeprecated += pkg.npmDeprecated ? 1 : 0;
	totalCounts.publishes += pkg.publishCount || 0;
	totalCounts.downloads += pkg.downloads || 0;
	totalCounts.customElements += pkg.isWebComponent ? 1 : 0;

	if(!pkg.isArchived && !pkg.npmDeprecated) {
		totalCounts.audits += pkg.openVulnerabilities || 0;
	}

	if(pkg.publishCount > 0) {
		totalCounts.packages++;
	}

	// Workspace counts would duplicate if we didn’t check
	if(reposSeen.has(pkg.url)) {
		continue;
	}
	reposSeen.add(pkg.url);

	totalCounts.prs.merged += pkg.mergedPRs || 0;
	totalCounts.prs.closed += (pkg.mergedPRs || 0) + (pkg.closedPRs || 0);
	totalCounts.issues.closed += pkg.closedIssues || 0;
	totalCounts.stars += pkg.stars || 0;

	if(!pkg.isArchived && !pkg.npmDeprecated) {
		totalCounts.prs.open += pkg.openPRs || 0;
		totalCounts.issues.open += pkg.openIssues || 0;
	}
}

export const totals = totalCounts;

export const generatedAt = report.generatedAt;
export const healthRating = report.healthRating;

// Repositories pinned on GitHub, via the upstream report’s `isPinned`
// The report is per-package, so a repo with workspaces is listed more than once—prefer the entry
// for the repository itself over any of its workspace packages.
let pinnedByRepo = new Map();
for(let pkg of report.projects) {
	if(!pkg.isPinned) {
		continue;
	}

	let existing = pinnedByRepo.get(pkg.nameWithOwner);
	if(!existing || (existing.workspacePath && !pkg.workspacePath)) {
		pinnedByRepo.set(pkg.nameWithOwner, pkg);
	}
}

export const pinnedProjects = Array.from(pinnedByRepo.values())
	.sort((a, b) => b.stars - a.stars)
	.map(pkg => {
		let [owner, name] = pkg.nameWithOwner.split("/");

		return {
			owner,
			name,
			url: pkg.url,
			description: pkg.description || "",
		};
	});
