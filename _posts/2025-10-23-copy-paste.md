---
title: Copy *and* Paste? …in this Economy?
tags: eleventy
tag_icon: "far:copy"
modules:
  - https://unpkg.com/@awesome.me/webawesome@3.0.0/dist-cdn/components/copy-button/copy-button.js
---
Astute visitors to the [Eleventy Documentation](https://www.11ty.dev/) will notice something new on the code blocks on the site.

<style>
#demo-fa-copy-button {
	wa-copy-button { line-height: 1; vertical-align: text-bottom; }
	wa-copy-button::part(button) { padding: 0; }
	wa-copy-button::part(copy-icon),
	wa-copy-button::part(success-icon),
	wa-copy-button::part(error-icon) { font-size: 1.3125em;  }
}
</style>
<div id="demo-fa-copy-button"><p><em>A wild copy-to-clipboard component has appeared: <wa-copy-button tooltip-placement="right" value="Unparalleled synergy">{% icon "far:copy" %}</wa-copy-button></em></p></div>

This feature been a _long_ time coming and is our first use of [{% icon "fab:web-awesome" %}Web Awesome](https://webawesome.com/) on the docs (via the [`<wa-copy-button>` custom element](https://webawesome.com/docs/components/copy-button/)). Take special note of the unparalleled _synergy_ of the Font Awesome icon used by the Web Awesome component used on the _Eleventy_ docs.

- Progressive Enhancement behavior: this is a JavaScript-only feature and has no before/without JavaScript experience. You might call this a [JavaScript Web Component](/web/a-taxonomy-of-web-component-types/#javascript-web-components).
- Performance-focused:
	- This is using a [build-time component bundle](https://github.com/11ty/11ty-website/blob/afd92d6f44332323eda33a9380d5e3979074b497/eleventy.config.js#L479) (read more about Bundling below)
	- The JavaScript code for the component only loads when an instance is visible (via [`<is-land>`](/docs/plugins/is-land/))

## Usage

### Direct from CDN

There are a few ways to use the Copy Button component stock, with the easiest being to load the script directly from the CDN, like so (via [`jsdelivr`](https://www.jsdelivr.com/)):

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3.0.0/dist-cdn/components/copy-button/copy-button.js"></script>
```

Or via [`unpkg`](https://www.jsdelivr.com/):

```html
<script type="module" src="https://unpkg.com/@awesome.me/webawesome@3.0.0/dist-cdn/components/copy-button/copy-button.js"></script>
```

### Bundling

For this implementation we used `esbuild` to create a focused bundle for the single Web Awesome component (though this `esbuild` code would work for any JavaScript file).

We went with this method for improved runtime performance and to reduce the number of third-party dependencies on the web site (with a nod to [André Jaenisch](https://jaenis.ch/!)). You can do the same with the following bit of [Eleventy configuration](https://www.11ty.dev/docs/config/) (e.g. in a `eleventy.config.js` file):

```js
// eleventy.config.js
// don’t forget to `npm install esbuild -D`
import esbuild from "esbuild";
import { fileURLToPath } from "node:url";

async function esbuildToFile(entryPoints, outfile, options = {}) {
	return esbuild.build(Object.assign({
		entryPoints,
		platform: "browser",
		format: "esm",
		bundle: true,
		minify: true,
		banner: {
			js: `/* via ${entryPoints} */`,
		},
		outfile,
	}, options));
}

async function bundleModuleToFile(modulePath, outfile) {
	let sourcefile = fileURLToPath(import.meta.resolve(modulePath));
	return esbuildToFile([ sourcefile ], outfile);
}

export default async function(eleventyConfig) {
	let outfile = path.join(eleventyConfig.directories.output, "js/copy-button.js");

	// This will run once per build/serve/watch
	// (not with subsequent builds, save for config file changes)
	await bundleModuleToFile("@awesome.me/webawesome/dist/components/copy-button/copy-button.js", outfile);
}
```

## Markdown Code Block Wrappers

This task also served as the impetus for fixes related to [wrapper elements around code blocks in Markdown](/web/markdown-code-wrapper/), documented in the previous blog post on this very web site.