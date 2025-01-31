import data from "./fauna-export.json" with { type: "json" };

async function queryData() {
	let ret = {};
	let total = 0;
	for(let entry of data) {
		let url = entry.data.url;
		if(url.startsWith("https://www.zachleat.com/")) {
			let key = url.slice("https://www.zachleat.com".length);
			ret[key] = {
				count: entry.data.count,
			};
			total += entry.data.count;
		}
	}

	console.log( "[elizabeacon] Cached export found", data.length, "URLs with", total, "Pageviews" );

	return ret;
}

export { queryData };
