require('dotenv').config();

const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
	secret: process.env.FAUNA_SECRET_KEY,
});

module.exports.queryData = async function queryData() {
	let query = await client.query(
		q.Map(
			q.Paginate(q.Documents(q.Collection('hits')), {
				size: 10000, // maximum 10k documents
			}),
			q.Lambda(show => q.Get(show))
		)
	);
	let { data } = query;
	let sorted = data.map(entry => entry.data).sort((a, b) => {
		return b.count - a.count;
	});

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
