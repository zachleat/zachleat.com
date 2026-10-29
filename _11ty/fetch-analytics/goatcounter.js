import 'dotenv/config'
import EleventyFetch from "@11ty/eleventy-fetch";

const START_DATE = "2024-08-30";

// One request per calendar year since the full range is too slow for GoatCounter (500s), `end` is inclusive to the hour.
function getYearlyRanges() {
	let currentYear = new Date().getUTCFullYear();
	let ranges = [];
	for(let year = parseInt(START_DATE); year <= currentYear; year++) {
		ranges.push({
			start: year === parseInt(START_DATE) ? `${START_DATE}T00:00:00Z` : `${year}-01-01T00:00:00Z`,
			end: year < currentYear ? `${year}-12-31T23:59:59Z` : undefined,
		});
	}
	return ranges;
}

async function fetchRange({ start, end }) {
	let url = new URL("https://zachleat.goatcounter.com/api/v0/stats/hits");
	url.searchParams.set("start", start);
	if(end) {
		url.searchParams.set("end", end);
	}
	url.searchParams.set("limit", 100);

	return EleventyFetch(url.toString(), {
		type: "json",
		// Past years are complete so they never need refetching.
		duration: end ? "*" : (process.env.ELEVENTY_RUN_MODE === "build" ? "0s" : "1h"),
		directory: ".cache/eleventy-fetch/",
		dryRun: false,
		fetchOptions: {
			headers: {
				"Authorization": `Bearer ${process.env.GOATCOUNTER_TOKEN}`
			},
		},
	});
}

// Throws on failure so the import never writes analytics data missing GoatCounter views.
async function fetchData() {
	if(!process.env.GOATCOUNTER_TOKEN) {
		throw new Error("Missing GOATCOUNTER_TOKEN environment variable");
	}

	let ret = {};
	let total = 0;
	for(let range of getYearlyRanges()) {
		// The results are sorted by count descending
		// Warning: each year only returns its top 100 paths, so a path outside one year’s top 100 is missing that year’s views (minimum is logged below)
		let json = await fetchRange(range);
		let minimum = 99999;
		for(let entry of json.hits) {
			total += entry.count;

			let urlPath = entry.path + (!entry.path.endsWith("/") ? "/" : "");
			if(!ret[urlPath]) {
				ret[urlPath] = {
					count: 0,
					path: urlPath,
				};
			}
			ret[urlPath].count += entry.count;

			if(entry.count < minimum) {
				minimum = entry.count;
			}
		}

		console.log( "[goatcounter]", range.start.slice(0, 4), "found", json.hits.length, "URLs (max: 100). Smallest path had", minimum, "views" );
	}

	console.log( "[goatcounter] Found", Object.keys(ret).length, "URLs with", total, "views" );
	return ret;
};

export { fetchData };
