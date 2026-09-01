import fs from "node:fs";
import path from "node:path";

// Matches `@import "file.css";` and `@import url("file.css");`
const IMPORT = /^[\t ]*@import\s+(?:url\(\s*)?(["'])(.+?)\1\s*\)?\s*;[\t ]*$/gm;

function isRelative(specifier) {
	return !/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(specifier);
}

// Inlines relative `@import` rules so each entry ships as a single stylesheet.
function bundle(content, filePath, seen) {
	return content.replace(IMPORT, (fullMatch, quote, specifier) => {
		// Leave remote stylesheets (and anything protocol-relative) to the browser.
		if(!isRelative(specifier)) {
			return fullMatch;
		}

		let importPath = path.join(path.dirname(filePath), specifier);
		if(seen.has(importPath)) {
			return `/* @import "${specifier}" (already bundled) */`;
		}
		seen.add(importPath);

		return bundle(fs.readFileSync(importPath, "utf8"), importPath, seen);
	});
}

export default function(eleventyConfig) {
	eleventyConfig.addTemplateFormats("css");

	// These are passthrough copied (to output paths this extension can’t produce),
	// so keep them out of template processing.
	eleventyConfig.ignores.add("_components/*.css");
	eleventyConfig.ignores.add("resume/*.css");

	eleventyConfig.addExtension("css", {
		compileOptions: {
			cache: false,
		},
		outputFileExtension: "css",
		compile: function(inputContent, inputPath) {
			// Skip partials, they’re inlined into the entry files that import them.
			if(path.basename(inputPath).startsWith("_")) {
				return;
			}

			let seen = new Set([ inputPath ]);
			let content = bundle(inputContent, inputPath, seen);

			this.addDependencies(inputPath, Array.from(seen));

			return () => content;
		}
	});
};
