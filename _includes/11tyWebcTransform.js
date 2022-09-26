module.exports = function(eleventyConfig) {
	let componentsMap = false; // cache the glob search
	let count = 0;

	eleventyConfig.on("eleventy.before", () => {
		count = 0;
	});

	eleventyConfig.on("eleventy.after", () => {
		console.log( `[11ty/webc] ${count} HTML file${count !== 1 ? "s" : ""} processed.` );
	});

	eleventyConfig.addTransform("webc", async function(content) {
		try {
			if(!this.inputPath.endsWith(".webc") && this.outputPath?.endsWith(".html")) {
				const { WebC } = await import("@11ty/webc");
				let page = new WebC();
				page.setBundlerMode(false);
				if(componentsMap === false) {
					componentsMap = WebC.getComponentsMap("./_includes/webc/**/*.webc");
				}
				page.defineComponents(componentsMap);
				page.setContent(content, this.outputPath);

				let { html } = await page.compile();
				count++;
				return html;
			}
		} catch(e) {
			console.error( "Error transforming", this.inputPath, e );
		}

		return content;
	});
}