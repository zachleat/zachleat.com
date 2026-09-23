import 'dotenv/config';
import Fetch from "@11ty/eleventy-fetch";

const DAYS = 7;
const MINIMUM_DAILY_VIEWS = 250;

// Days in the last week where a blog post had at least MINIMUM_DAILY_VIEWS page views
export default async function() {
	if(!process.env.GOATCOUNTER_TOKEN) {
		console.warn("[zachleat.com] unable to fetch traffic spikes: no GOATCOUNTER_TOKEN specified in environment.");
		return [];
	}

	let start = new Date(Date.now() - DAYS * 1000 * 60 * 60 * 24).toISOString().slice(0, 10);
	try {
		let json = await Fetch(`https://zachleat.goatcounter.com/api/v0/stats/hits?start=${start}&daily=true&limit=100`, {
			type: "json",
			duration: process.env.ELEVENTY_RUN_MODE === "serve" ? "1d" : "1h",
			fetchOptions: {
				headers: {
					"Authorization": `Bearer ${process.env.GOATCOUNTER_TOKEN}`
				},
			},
		});

		let spikes = [];
		for(let { path, stats } of json?.hits || []) {
			let urlPath = path + (!path.endsWith("/") ? "/" : "");
			if(!urlPath.startsWith("/web/")) {
				continue;
			}
			for(let { day, daily } of stats || []) {
				if(daily >= MINIMUM_DAILY_VIEWS) {
					spikes.push({ target: `https://www.zachleat.com${urlPath}`, time: new Date(`${day}T00:00:00Z`).getTime(), views: daily });
				}
			}
		}
		return spikes;
	} catch(e) {
		console.warn("[zachleat.com] Unable to fetch traffic spikes:", e);
		return [];
	}
}
