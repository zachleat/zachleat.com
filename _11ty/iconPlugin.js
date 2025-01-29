const { library, findIconDefinition, icon } = require("@fortawesome/fontawesome-svg-core");
const { fas } = require("@fortawesome/free-solid-svg-icons");
const { fab } = require("@fortawesome/free-brands-svg-icons");
const { far } = require("@fortawesome/free-regular-svg-icons");

library.add(fas); // `house` or `fas:house`
library.add(far); // `user` or `far:user`
library.add(fab); // `fab:bluesky` (requires prefix)

function faIconToHtml(selector) {
	let [prefix, iconName] = selector.split(":");
	let iconInfo = { prefix, iconName };
	let iconDef = findIconDefinition(iconInfo);

	let svg = icon(iconDef, {
		symbol: true,
	});

	let html = svg?.html;

	if(!iconDef || !html || !Array.isArray(html)) {
		throw new Error("Could not find icon: " + selector);
	}

	return {
		ref: `${prefix}-fa-${iconName}`,
		html: html.join(""),
	}
}


module.exports = function(eleventyConfig) {
	eleventyConfig.addBundle("svg");

	eleventyConfig.addShortcode("icon", function(selector) {
		let {ref, html: iconHtml} = faIconToHtml(selector); //, color we don’t want the color embedded in the icon

		let {svg: svgBundle} = eleventyConfig.getBundleManagers();
		if(!svgBundle) {
			throw new Error("Could not find svg bundle for icon: " + selector);
		}
		svgBundle.addToPage(this.page.url, iconHtml);

		return `<svg class="z-fa-icon z-${ref}"><use href="#${ref}" xlink:href="#${ref}"></use></svg>`;
	})
}
