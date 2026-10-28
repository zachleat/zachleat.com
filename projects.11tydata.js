import Fetch from "@11ty/eleventy-fetch";

const SERVICE_URL = "https://zachleat.github.io/is-this-still-being-maintained/";
const FETCH_OPTIONS = {
	type: "json",
	duration: process.env.ELEVENTY_RUN_MODE === "build" ? "2m" : "30m",
};

let report = await Fetch(SERVICE_URL + "report.json", FETCH_OPTIONS);
let sparklinesByPackageJson = await Fetch(SERVICE_URL + "report-sparklines.json", FETCH_OPTIONS);

export const sparklinesByPackage = sparklinesByPackageJson.packages;

// A sparkline is unitless, so each one needs the range it was drawn against to be readable.
// Liquid has no numeric min/max, hence deriving it here.
function getRangesBySeries(seriesName) {
	return Object.fromEntries(
		Object.entries(sparklinesByPackageJson.packages).map(([packageName, entry]) => {
			let counts = entry[seriesName]?.counts || [];

			return [packageName, counts.length ? {
				min: Math.min(...counts),
				max: Math.max(...counts),
			} : null];
		})
	);
}

export const downloadsRangeByPackage = getRangesBySeries("monthlyDownloads");
export const releasesRangeByPackage = getRangesBySeries("monthlyReleases");
export const cdnHitsRangeByPackage = getRangesBySeries("monthlyCdnHits");

// jsDelivr hits have no running total in report.json the way npm downloads do (`pkg.downloads`),
// so the sparkline’s own window is summed here to get an equivalent number to show beside it.
export const cdnHitsTotalByPackage = Object.fromEntries(
	Object.entries(sparklinesByPackageJson.packages).map(([packageName, entry]) => {
		let counts = entry.monthlyCdnHits?.counts || [];

		return [packageName, counts.reduce((sum, count) => sum + count, 0)];
	})
);

let sparklineAggregateJson = await Fetch(SERVICE_URL + "report-sparkline-aggregate.json", FETCH_OPTIONS);

export const sparklineAggregate = sparklineAggregateJson.monthlyReleases;

function formatMonth(ym) {
	if(!ym) {
		return "";
	}

	let [year, month] = ym.split("-").map(Number);
	return new Date(Date.UTC(year, month - 1)).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

// Open counts carry the lowest/highest ever seen, which a monthly series loses when a month’s snapshot is overwritten.
function getAggregateSparkline(series) {
	let counts = series?.counts || [];

	return {
		counts,
		min: series?.low ?? (counts.length ? Math.min(...counts) : 0),
		max: series?.high ?? (counts.length ? Math.max(...counts) : 0),
		minMonth: formatMonth(series?.lowMonth),
		maxMonth: formatMonth(series?.highMonth),
	};
}

export const downloadsAggregate = getAggregateSparkline(sparklineAggregateJson.monthlyDownloads);
export const cdnHitsAggregate = getAggregateSparkline(sparklineAggregateJson.monthlyCdnHits);
export const auditsAggregate = getAggregateSparkline(sparklineAggregateJson.monthlyOpenVulnerabilities);
export const openIssuesAggregate = getAggregateSparkline(sparklineAggregateJson.monthlyOpenIssues);
export const openPRsAggregate = getAggregateSparkline(sparklineAggregateJson.monthlyOpenPRs);

export const packages = report.projects.sort((a, b) => {
	// Archived projects sort to the bottom, whatever their score
	if(a.isArchived !== b.isArchived) {
		return a.isArchived ? 1 : -1;
	}

	return b.score - a.score;
});

let totalCounts = {
	githubArchived: 0,
	npmDeprecated: 0,
	prs: { open: 0, closed: 0, merged: 0, },
	issues: { open: 0, closed: 0 },
	stars: 0,
	downloads: 0,
	cdnHits: 0,
	publishes: 0,
	customElements: 0,
	audits: 0,
	packages: 0,
	activeProjects: 0,
	activePackages: 0,
};

let reposSeen = new Set();
for(let pkg of report.projects) {
	totalCounts.githubArchived += pkg.isArchived ? 1 : 0;
	totalCounts.npmDeprecated += pkg.npmDeprecated ? 1 : 0;
	totalCounts.publishes += pkg.publishCount || 0;
	totalCounts.downloads += pkg.downloads || 0;
	// jsDelivr hits are keyed by package name in the sparklines data, same as downloads—so
	// this sums the same way `downloads` does, one npm package at a time, workspaces included.
	totalCounts.cdnHits += cdnHitsTotalByPackage[pkg.packageName] || 0;
	totalCounts.customElements += pkg.isWebComponent ? 1 : 0;

	if(!pkg.isArchived && !pkg.npmDeprecated) {
		totalCounts.activeProjects++;
		totalCounts.audits += pkg.openVulnerabilities || 0;
	}

	if(pkg.publishCount > 0) {
		totalCounts.packages++;
		totalCounts.activePackages += pkg.npmDeprecated ? 0 : 1;
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

// Archived repos without a project (e.g. folded into a monorepo) keep their stars and closed issues.
for(let repo of report.archivedRepos || []) {
	if(reposSeen.has(repo.url)) {
		continue;
	}
	reposSeen.add(repo.url);

	totalCounts.issues.closed += repo.closedIssues || 0;
	totalCounts.stars += repo.stars || 0;
}

export const totals = totalCounts;

export const generatedAt = report.generatedAt;
export const healthRating = report.healthRating;

// npm releases per year, folded up from the same monthly aggregate that feeds the sparkline
function getReleasesByYear({ start, counts }) {
	let [startYear, startMonth] = start.split("-").map(Number);
	let byYear = new Map();

	for(let index = 0; index < counts.length; index++) {
		let year = startYear + Math.floor((startMonth - 1 + index) / 12);
		byYear.set(year, (byYear.get(year) || 0) + counts[index]);
	}

	let busiest = Math.max(...byYear.values());

	return Array.from(byYear, ([year, count]) => {
		return { year, count, fraction: count / busiest };
	});
}

export const releasesByYear = getReleasesByYear(sparklineAggregate);

// Distribution of Neglect scores across the projects that still show one (archived projects are
// excluded—the table leaves their Neglect cell blank).
const NEGLECT_BUCKET_SIZE = 2.5;
const NEGLECT_LABEL_INTERVAL = 5;
const NEGLECT_MAX = 50;

function getNeglectDistribution(projects) {
	let scored = projects.filter(pkg => !pkg.isArchived && typeof pkg.score === "number");
	if(scored.length === 0) {
		return [];
	}

	// A perfect score isn’t a range, so it sits in its own bucket ahead of the continuous axis
	let buckets = [{ start: 0, end: 0, isZero: true, showLabel: true, count: 0 }];

	// The axis always spans the full 0–100% range, however the scores actually cluster
	for(let index = 0; index < NEGLECT_MAX / NEGLECT_BUCKET_SIZE; index++) {
		let start = index * NEGLECT_BUCKET_SIZE;

		buckets.push({
			start,
			end: start + NEGLECT_BUCKET_SIZE,
			isZero: false,
			// Bars step every bucket, but the axis is only labeled every NEGLECT_LABEL_INTERVAL.
			// 0% is labeled twice on purpose: once for the exact-zero bar, once where the
			// continuous axis begins.
			showLabel: start % NEGLECT_LABEL_INTERVAL === 0,
			count: 0,
		});
	}

	for(let pkg of scored) {
		if(pkg.score <= 0) {
			buckets[0].count++;
			continue;
		}

		let index = Math.min(Math.floor(pkg.score / NEGLECT_BUCKET_SIZE), buckets.length - 2);
		buckets[index + 1].count++;
	}

	// Bars are sized against the busiest bucket, as a unitless fraction so CSS can do math with it
	let busiest = Math.max(...buckets.map(bucket => bucket.count));
	for(let bucket of buckets) {
		bucket.fraction = bucket.count / busiest;
	}

	return buckets;
}

export const neglectDistribution = getNeglectDistribution(report.projects);
