// One-time export of all webmention.io history: node _11ty/webmentions/export-webmention-io.js
import "dotenv/config";
import fs from "node:fs";

const PER_PAGE = 1000;
const FIELDS = ["type", "author", "url", "published", "wm-received", "wm-id", "wm-source", "wm-target", "wm-property"];

let entries = [];
for(let page = 0;; page++) {
	let res = await fetch(`https://webmention.io/api/mentions.jf2?domain=www.zachleat.com&token=${process.env.WEBMENTION_IO_TOKEN}&per-page=${PER_PAGE}&page=${page}`);
	let { children = [] } = await res.json();
	for(let entry of children) {
		let slim = Object.fromEntries(FIELDS.filter(key => entry[key] != null).map(key => [key, entry[key]]));
		if(entry.content?.text) {
			// Templates hide anything over 5000 characters
			slim.content = { text: entry.content.text.slice(0, 5001) };
		}
		entries.push(slim);
	}
	console.log(`Page ${page}: ${children.length}`);
	if(children.length < PER_PAGE) {
		break;
	}
}

fs.writeFileSync(new URL("./archive.json", import.meta.url), JSON.stringify(entries));
console.log(`Wrote ${entries.length} webmentions.`);
