import EleventyFetch from "@11ty/eleventy-fetch";

// https://github.com/zachleat/is-this-still-being-maintained, the source for every Neglect score,
// popularity sparkline, and release history on the site. Global data (rather than a `_11ty/`
// module imported by several `_data/` files) so `project-card.html` can render on any page.
const SERVICE_URL = "https://zachleat.github.io/is-this-still-being-maintained/";
const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "build" ? "2m" : "30m";

function fetchJson(path) {
	return EleventyFetch(SERVICE_URL + path, {
		type: "json",
		duration: CACHE_DURATION,
	});
}

// A sparkline is unitless, so each one needs the range it was drawn against to be readable.
// Liquid has no numeric min/max, hence deriving it here.
function getRangesBySeries(packages, seriesName) {
	return Object.fromEntries(
		Object.entries(packages).map(([packageName, entry]) => {
			let counts = entry[seriesName]?.counts || [];

			return [packageName, counts.length ? {
				min: Math.min(...counts),
				max: Math.max(...counts),
			} : null];
		})
	);
}

// jsDelivr hits have no running total in report.json the way npm downloads do (`pkg.downloads`),
// so the sparkline’s own window is summed here to get an equivalent number to show beside it.
function getCdnHitsTotals(packages) {
	return Object.fromEntries(
		Object.entries(packages).map(([packageName, entry]) => {
			let counts = entry.monthlyCdnHits?.counts || [];

			return [packageName, counts.reduce((sum, count) => sum + count, 0)];
		})
	);
}

// The report has one row per package, so a repo can hold several. Neither name identifies a row on
// its own: a workspace repo repeats `nameWithOwner`, and two repos can even publish the same
// `packageName` (11ty/api-opengraph-image and 11ty/api-indieweb-avatar both say
// eleventy-api-indieweb-avatar), so a row is keyed by the pair. Templates build the same key with
// `nameWithOwner | append: "|" | append: packageName`.
// Note: `default` must be this file's ONLY export—Eleventy only unwraps a data file's default
// export when it stands alone, otherwise templates receive the raw module namespace.
function getRowKey(pkg) {
	return `${pkg.nameWithOwner}|${pkg.packageName || ""}`;
}

function slugify(value) {
	return value.replace(/^@/, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// The projects table and a project card both use these, so the `#` a card shows and the row its
// deep link lands on are always the same row.
function getRowsByPackage(projects) {
	// same order the projects table renders in: archived last, then Neglect descending
	let sorted = [...projects].sort((a, b) => {
		// Archived projects sort to the bottom, whatever their score
		if(a.isArchived !== b.isArchived) {
			return a.isArchived ? 1 : -1;
		}

		return b.score - a.score;
	});

	let ids = {};
	let ranks = {};
	let usedIds = new Set();
	for(let index = 0; index < sorted.length; index++) {
		let pkg = sorted[index];
		let key = getRowKey(pkg);

		// the repo's first row gets the plain repo anchor; the rest add their package name, so
		// every row is addressable and the page never emits a duplicate `id`
		let id = `project-${slugify(pkg.nameWithOwner)}`;
		if(usedIds.has(id)) {
			id = `${id}--${slugify(pkg.packageName || String(index))}`;
		}
		while(usedIds.has(id)) {
			id = `${id}-${index}`;
		}
		usedIds.add(id);
		ids[key] = id;

		// the table leaves the rank cell blank for archived projects
		if(!pkg.isArchived) {
			ranks[key] = index + 1;
		}
	}

	return { rowIdByPackage: ids, rankByPackage: ranks };
}

export default async function() {
	try {
		let [report, sparklinesJson, aggregateJson] = await Promise.all([
			fetchJson("report.json"),
			fetchJson("report-sparklines.json"),
			fetchJson("report-sparkline-aggregate.json"),
		]);

		let sparklinesByPackage = sparklinesJson.packages;

		return {
			report,
			...getRowsByPackage(report.projects),
			sparklinesByPackage,
			downloadsRangeByPackage: getRangesBySeries(sparklinesByPackage, "monthlyDownloads"),
			releasesRangeByPackage: getRangesBySeries(sparklinesByPackage, "monthlyReleases"),
			cdnHitsRangeByPackage: getRangesBySeries(sparklinesByPackage, "monthlyCdnHits"),
			cdnHitsTotalByPackage: getCdnHitsTotals(sparklinesByPackage),
			sparklineAggregate: aggregateJson.monthlyReleases,
		};
	} catch(e) {
		if(process.env.NODE_ENV === "production") {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.log("Failed getting the project report, returning empty");
		return {
			report: { projects: [] },
			rowIdByPackage: {},
			rankByPackage: {},
			sparklinesByPackage: {},
			downloadsRangeByPackage: {},
			releasesRangeByPackage: {},
			cdnHitsRangeByPackage: {},
			cdnHitsTotalByPackage: {},
			sparklineAggregate: { start: "2018-01", counts: [] },
		};
	}
};
