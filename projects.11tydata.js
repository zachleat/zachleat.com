import Fetch from "@11ty/eleventy-fetch";

export const minimumDownloads = 1000;
export const minimumStars = 200;

let report = await Fetch("https://zachleat.github.io/is-this-still-being-maintained/report.json", {
	type: "json",
	duration: "5m",
});

export const packages = report.projects.sort((a, b) => {
	return b.score - a.score;
});

let totalCounts = {
	prs: { open: 0, closed: 0 },
	issues: { open: 0, closed: 0 },
	stars: 0,
	downloads: 0,
};
for(let pkg of report.projects) {
	totalCounts.prs.open += pkg.openPRs;
	totalCounts.prs.closed += pkg.mergedPRs + pkg.closedPRs;
	totalCounts.issues.open += pkg.openIssues;
	totalCounts.issues.closed += pkg.closedIssues;
	totalCounts.stars += pkg.stars;
	totalCounts.downloads += pkg.downloads;
}

export const totals = totalCounts;
