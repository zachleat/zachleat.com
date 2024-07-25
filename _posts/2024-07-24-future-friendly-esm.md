---
title: Improved error messaging for require(ESM) in Node.js
tags: eleventy
---
The [Eleventy](https://www.11ty.dev/) code-base is now written using ESM.

However, Eleventy projects can be written using CommonJS or ESM (and we’ll continue to support both moving forward).

As Eleventy is a command line tool, this offers a bit of wiggle room navigating the CommonJS/ESM divide. That is, until we started bundling application plugins in the core library.

Consider this application configuration file, making use of [Eleventy’s Render Plugin](https://www.11ty.dev/docs/plugins/render/).

```js
const { EleventyRenderPlugin } = require("@11ty/eleventy");
```

If you try to import an ESM package in CommonJS, you’ll receive a pretty helpful error message:

> require() of ES Module ./node_modules/@11ty/eleventy/src/Eleventy.js from ./eleventy.config.js not supported. Instead change the require of Eleventy.js in ./eleventy.config.js to a dynamic import() which is available in all CommonJS modules.

This error message is decent! But I think we can do better, and doing better will mean that folks will have an easier time upgrading to Eleventy v3. In order to add my own custom error messaging, I used the [Conditional Exports feature](https://nodejs.org/api/packages.html#conditional-exports) (the `exports` property in `package.json`):

```json
{
	"type": "module",
	"main": "./Eleventy.js",
	"exports": {
		"import": "./Eleventy.js",
		"require": "./EleventyCommonJs.cjs"
	}
}
```

ESM code using `import` will receive `Eleventy.js` and CommonJS code using `require` will receive `EleventyCommonJS.cjs`.

Conditional Exports are typically used for dual publishing packages. When folks dual publish their packages it often involves additional tooling complexity to convert the code from its format as-written to ESM (or CommonJS). Additionally, that complexity would only be a temporary win: [Node.js is adding first-party support for require(ESM) in the future](https://joyeecheung.github.io/blog/2024/03/18/require-esm-in-node-js/) (yay!).

I do want to use this feature to provide a better error message!

Inside of `./EleventyCommonJs.cjs`, it looks something like this:

```js
try {
	// Eleventy.js is ESM so this throws if require(ESM) is not supported.
	module.exports = require("./Eleventy.js");
} catch(e) {
	if(e.code === "ERR_REQUIRE_ESM") {
		throw new Error("Your custom error message here");
	}

	throw e;
}
```

<p class="livedemo livedemo-mixed" data-demo-label="Maybe don’t do any of this">Notably, the above is only necessary because I wanted a custom error message. If you’re fine with Node’s provided error message, <strong>don’t do any of this</strong>.</p>

This feature-tested approach allows a custom error message limited to folks using CommonJS and will automatically go away when used with Node’s new `--experimental-require-module` flag (or when Node opts into this behavior by default in a future version).

Here’s the helpful error message this approach unlocked in Eleventy and should help folks making the upgrade:

> Eleventy cannot be loaded via `require("@11ty/eleventy")` in 3.0 and newer. Instead, you have a few options:
>
> 1. (Easiest) Change the `require` to use a dynamic import inside of an asynchronous CommonJS configuration callback, for example:
>```js
>   module.exports = async function {
>     const {EleventyRenderPlugin} = await import("@11ty/eleventy");
>   }
>```
>
> 2. (Easier) Update the JavaScript syntax in your configuration file from CommonJS to ESM (change `require` to use `import` and rename the file to have an `.mjs` file extension).
> 3. (More work) Change your project to use ESM-first by adding `"type": "module"` to your package.json. Any `.js` will need to be ported to use ESM syntax (or renamed to `.cjs`.)
> 4. (Short term workaround) Use the --experimental-require-module flag to enable this behavior. Read more: https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require It is possible that the newest version of Node has this enabled by default—you can try upgrading your version of Node.js.
