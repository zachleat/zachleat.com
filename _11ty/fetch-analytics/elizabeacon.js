require('dotenv').config();

const { AssetCache } = require("@11ty/eleventy-fetch");

const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
	secret: process.env.FAUNA_SECRET_KEY,
});

module.exports.queryData = async function queryData() {
	let asset = new AssetCache("elizabeacon_data");

	// check if the cache is fresh within the last day
	let data;

	if(asset.isCacheValid("12h")) {
		console.log( "[elizabeacon] Using cached data." );
		data = await asset.getCachedValue();
	} else {
		try {
			let query = await client.query(
				q.Map(
					q.Paginate(q.Documents(q.Collection('hits')), {
						size: 10000, // maximum 10k documents
					}),
					q.Lambda(show => q.Get(show))
				)
			);
			data = query.data;

			await asset.save(data, "json");
		} catch(e) {
			console.error( "[elizabeacon] Error:", e );
			data = await asset.getCachedValue();
		}
	}

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
	console.log( "[elizabeacon] Found", data.length, "URLs with", total, "Pageviews" );

	return ret;
}
