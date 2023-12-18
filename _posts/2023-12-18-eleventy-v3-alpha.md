---
title: Eleventy v3 with ESM support now on the canary channel
tags:
  - eleventy
---
The very first Eleventy v3 alpha release is out in the wild and you can try it out on your web site. The two big flagship features (so far) are ESM support (while keeping CommonJS support) and asynchronous configuration callbacks in both ESM and CommonJS.

`eleventy.config.js` (in a CommonJS project) or `eleventy.config.cjs` (in an ESM project):

```js
module.exports = async function(eleventyConfig) {
	// …
}
```

`eleventy.config.js` (in an ESM project):

```js
export default async function(eleventyConfig) {
	// …
}
```

Try it out!

_Read more: [`11ty.dev/blog/canary-eleventy-v3/`](https://www.11ty.dev/blog/canary-eleventy-v3/)_

{% originalPostEmbed "https://www.11ty.dev/blog/canary-eleventy-v3/" %}