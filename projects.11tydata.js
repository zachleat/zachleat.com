import Fetch from "@11ty/eleventy-fetch";

const SERVICE_URL = "https://zachleat.github.io/is-this-still-being-maintained/";

let report = await Fetch(SERVICE_URL + "report.json", {
	type: "json",
	duration: "10m",
});

let sparklinesByPackageJson = await Fetch(SERVICE_URL + "report-sparklines.json", {
	type: "json",
	duration: "10m",
});

export const sparklinesByPackage = sparklinesByPackageJson.packages;

let sparklineAggregateJson = await Fetch(SERVICE_URL + "report-sparkline-aggregate.json", {
	type: "json",
	duration: "10m",
});

export const sparklineAggregate = sparklineAggregateJson.monthlyReleases;

export const packages = report.projects.sort((a, b) => {
	return b.score - a.score;
});

let totalCounts = {
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
	totalCounts.publishes += pkg.publishCount || 0;
	totalCounts.downloads += pkg.downloads || 0;
	totalCounts.customElements += pkg.isWebComponent ? 1 : 0;
	totalCounts.audits += pkg.openVulnerabilities || 0;

	if(pkg.publishCount > 0) {
		totalCounts.packages++;
	}

	// Workspace counts would duplicate if we didn’t check
	if(reposSeen.has(pkg.url)) {
		continue;
	}
	reposSeen.add(pkg.url);

	totalCounts.prs.open += pkg.openPRs || 0;
	totalCounts.prs.merged += pkg.mergedPRs || 0;
	totalCounts.prs.closed += (pkg.mergedPRs || 0) + (pkg.closedPRs || 0);
	totalCounts.issues.open += pkg.openIssues || 0;
	totalCounts.issues.closed += pkg.closedIssues || 0;
	totalCounts.stars += pkg.stars || 0;
}

export const totals = totalCounts;

export const generatedAt = report.generatedAt;
export const healthRating = report.healthRating;
