import { decode, encode } from "html-entities";
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

// Pinned repositories from https://github.com/zachleat (the GraphQL API for these requires auth,
// so we read the same values off of the public profile page)
const PINNED_PROFILE_URL = "https://github.com/zachleat";

const URL_PATTERN = /https?:\/\/[^\s<>"]+/g;
const MAX_DISPLAY_URL_LENGTH = 32;

// `https://www.zachleat.com/web/recipes/` displays as `zachleat.com/web/recipes`
function getDisplayUrl(url) {
	let display = url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

	if(display.length > MAX_DISPLAY_URL_LENGTH) {
		display = `${display.slice(0, MAX_DISPLAY_URL_LENGTH - 1).trimEnd()}…`;
	}

	return display;
}

// Repository descriptions are plain text: escape every segment individually so that the URLs we
// linkify are matched against the raw text but are still safe in both the href and the link text.
function escapeAndLinkify(text) {
	let html = "";
	let lastIndex = 0;

	for(let match of text.matchAll(URL_PATTERN)) {
		let url = match[0];

		// Punctuation that ends the sentence isn’t part of the URL
		let trailing = url.match(/[.,;:!?)\]}'"]+$/);
		if(trailing) {
			url = url.slice(0, -trailing[0].length);
		}

		html += encode(text.slice(lastIndex, match.index));
		html += `<a href="${encode(url)}">${encode(getDisplayUrl(url))}</a>`;
		lastIndex = match.index + url.length;
	}

	return html + encode(text.slice(lastIndex));
}

function parsePinnedRepositories(html) {
	let projects = [];

	for(let entry of html.split(`js-pinned-item-list-item`).slice(1)) {
		// Limit each match to a single list item
		let end = entry.indexOf("</li>");
		if(end > -1) {
			entry = entry.slice(0, end);
		}

		let repo = entry.match(/href="\/([^"\/]+)\/([^"\/]+)"/);
		if(!repo) {
			continue;
		}

		let [, owner, name] = repo;
		let description = entry.match(/class="pinned-item-desc[^"]*"[^>]*>([^<]*)</);

		projects.push({
			owner,
			name,
			url: `https://github.com/${owner}/${name}`,
			descriptionHtml: description ? escapeAndLinkify(decode(description[1]).trim()) : "",
		});
	}

	return projects;
}

async function getPinnedProjects() {
	try {
		let html = await Fetch(PINNED_PROFILE_URL, {
			...FETCH_OPTIONS,
			type: "text",
		});

		let projects = parsePinnedRepositories(html);
		if(projects.length === 0) {
			throw new Error("No pinned repositories found.");
		}
		return projects;
	} catch(e) {
		// The markup on the profile page is not an API—if it changes, skip this section quietly.
		console.warn(`[zachleat.com] Could not read pinned repositories from ${PINNED_PROFILE_URL}:`, e.message);
		return [];
	}
}

export const pinnedProjects = await getPinnedProjects();
