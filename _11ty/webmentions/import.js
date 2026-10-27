// Writes webmention.io data files next to templates: node _11ty/webmentions/import.js
import "dotenv/config";
import fs from "node:fs";
import matter from "@11ty/gray-matter";
import { Importer } from "@11ty/import";

const TEMPLATE_EXTENSIONS = ["md", "html", "liquid", "njk", "11ty.js"];
const IGNORED = fs.readFileSync(".eleventyignore", "utf8").split("\n").map(line => line.trim()).filter(line => line && !line.startsWith("#"));

// Netlify `_redirects` rules with a 3xx status (rewrites and proxies are skipped)
const REDIRECTS = fs.readFileSync("_redirects", "utf8").split("\n")
	.map(line => line.trim().split(/\s+/))
	.filter(([from, to, status]) => from && !from.startsWith("#") && to?.startsWith("/") && status?.startsWith("3"))
	.map(([from, to]) => {
		let pattern = from.replace(/\/$/, "").replace(/[.?+()]/g, "\\$&").replace(/:(\w+)/g, "(?<$1>[^/]+)").replace(/\*$/, "(?<splat>.*)");
		return { regex: new RegExp(`^${pattern}/?$`), to };
	});

function findTemplate(stem) {
	return TEMPLATE_EXTENSIONS.map(ext => `${stem}.${ext}`).find(path => fs.existsSync(path));
}

// Template file path for a url (posts in _posts drop the /web/ prefix)
function findTemplateForPath(pathname) {
	if(pathname.startsWith("/web/")) {
		let post = findTemplate(`_posts${pathname.slice("/web".length, -1)}`);
		if(post) {
			return post;
		}
	}

	let dir = pathname.slice(1);
	let template = (dir && findTemplate(dir.slice(0, -1))) || findTemplate(`${dir}index`);
	if(template && !IGNORED.some(ignored => template.startsWith(ignored))) {
		return template;
	}
}

// Follows redirects until a template matches (existing pages take precedence, as on Netlify)
function getTemplate(pathname) {
	pathname = pathname.replace(/\.html$/, "/").replace(/\/?$/, "/");

	let template = findTemplateForPath(pathname);
	for(let i = 0; !template && i < 10; i++) {
		let rule = REDIRECTS.find(({ regex }) => regex.test(pathname));
		if(!rule) {
			return;
		}
		let { groups = {} } = pathname.match(rule.regex);
		pathname = rule.to.replace(/:(\w+)/g, (match, name) => groups[name] ?? match).split("?")[0];
		template = findTemplateForPath(pathname);
	}
	if(!template) {
		return;
	}

	// Skip templates that render to some other url (or more than one)
	if(!template.endsWith(".js")) {
		let { data } = matter(fs.readFileSync(template, "utf8"));
		if(data.pagination || (data.permalink !== undefined && data.permalink !== pathname)) {
			return;
		}
	}
	return template;
}

let importer = new Importer();
importer.setOutputFolder(".");
importer.setCacheDuration("2h");
importer.setAvatarReferenceType("disabled");

importer.addSource("webmentions", {
	url: "www.zachleat.com",
	// Data file paths swap the extension for .json
	filepathFormat: (url, fallbackPath) => {
		let template = getTemplate(fallbackPath);
		return template ? template.replace(/\.11ty\.js$/, ".js") : false;
	},
});

// Query string variants (e.g. ?ref=) and redirected urls are separate entries for the same template
let entries = new Map();
for(let entry of await importer.getEntries({ target: "fs" })) {
	let existing = entries.get(entry.filePath);
	if(!existing) {
		entries.set(entry.filePath, entry);
		continue;
	}
	for(let key of Importer.DATA_KEYS) {
		if(entry[key]) {
			existing[key] = [...(existing[key] || []), ...entry[key]];
		}
	}
}

await importer.toFiles([...entries.values()]);
importer.logResults();
