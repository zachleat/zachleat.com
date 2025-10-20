import { pairedShortcode } from "@11ty/eleventy-plugin-syntaxhighlight";

const TRIPLE_TICK = "```";
const HIGHLIGHT_PLUGIN_OPTIONS = {
	lineSeparator: "\n",
	preAttributes: {
		tabindex: "0",
	},
};

export default function(eleventyConfig) {
	eleventyConfig.addPairedShortcode("highlight", function(code, language = "") {
		if(!language) {
			console.warn(`Missing language for code block in ${this.page.inputPath}`)
		}

		if(this.page.inputPath.endsWith(".md")) {
			return `\n\n${TRIPLE_TICK}${language}${code.startsWith("\n") ? code : `\n${code}` }\n${TRIPLE_TICK}\n\n`;
		}

		return pairedShortcode(code, language, "", HIGHLIGHT_PLUGIN_OPTIONS);
	});

	// This controls the triple-tick syntax
	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdLib.set({
			highlight: function(code, language) {
				return pairedShortcode(code, language, "", HIGHLIGHT_PLUGIN_OPTIONS);
			}
		})
	});
};
