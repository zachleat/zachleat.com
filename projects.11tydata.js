import Fetch from "@11ty/eleventy-fetch";

export const minimumDownloads = 2500;
export const minimumStars = 200;

let report = await Fetch("https://zachleat.github.io/is-this-still-being-maintained/report.json", {
	type: "json",
	duration: "10m",
});

export const packages = report.projects.sort((a, b) => {
	return b.score - a.score;
});

let totalCounts = {
	prs: { open: 0, closed: 0 },
	issues: { open: 0, closed: 0 },
	stars: 0,
	downloads: 0,
	publishes: 0
};
let reposSeen = new Set();
for(let pkg of report.projects) {
	totalCounts.publishes += pkg.publishCount || 0;
	totalCounts.downloads += pkg.downloads || 0;

	// Workspace counts would duplicate if we didn’t check
	if(reposSeen.has(pkg.url)) {
		continue;
	}
	reposSeen.add(pkg.url);

	totalCounts.prs.open += pkg.openPRs || 0;
	totalCounts.prs.closed += (pkg.mergedPRs || 0) + (pkg.closedPRs || 0);
	totalCounts.issues.open += pkg.openIssues || 0;
	totalCounts.issues.closed += pkg.closedIssues || 0;
	totalCounts.stars += pkg.stars || 0;
}

export const totals = totalCounts;

export const npmAlsoShowRepoName = [
	"eleventy"
];

export const generatedAt = report.generatedAt;
