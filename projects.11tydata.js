import Fetch from "@11ty/eleventy-fetch";

export const minimumDownloads = 1000;
export const minimumStars = 200;

let report = await Fetch("https://zachleat.github.io/is-this-still-being-maintained/report.json", {
	type: "json",
	duration: "30m",
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
	totalCounts.publishes += pkg.publishCount;
	totalCounts.downloads += pkg.downloads;

	// Workspace counts would duplicate if we didn’t check
	if(reposSeen.has(pkg.url)) {
		continue;
	}
	reposSeen.add(pkg.url);

	totalCounts.prs.open += pkg.openPRs;
	totalCounts.prs.closed += pkg.mergedPRs + pkg.closedPRs;
	totalCounts.issues.open += pkg.openIssues;
	totalCounts.issues.closed += pkg.closedIssues;
	totalCounts.stars += pkg.stars;
}

export const totals = totalCounts;

export const npmAlsoShowRepoName = [
	"eleventy",
	"@11ty/eleventy"
];

export const generatedAt = report.generatedAt;
