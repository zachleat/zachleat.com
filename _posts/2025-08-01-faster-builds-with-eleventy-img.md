---
title: One weird trick to reduce Eleventy Image Build Times by 60%
tags: eleventy
iconAttributes:
  trophy:
    alt: "(trophy icon)"
---
This web site does a fair bit of build-time Image Optimization using the [HTML Transform method provided by the Eleventy Image plugin](https://www.11ty.dev/docs/plugins/image/#html-transform). I took a bit of a set-it-and-forget-it approach with the plugin on this site, mostly for my own convenience. My usage looked something like this:


```js
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		failOnError: false,
		formats: ["svg", "avif", "jpeg"],
		svgShortCircuit: true,
	});
};
```

Eleventy Image includes a [fair number of caches and performance optimizations](https://www.11ty.dev/docs/plugins/image/#build-performance) to make this default behavior pretty fast.

- It uses a memory cache to de-duplicates multiple requests to optimize the same image.
- It uses an on-request image processing engine to avoid processing images during local development.
- It uses a hash for output file name and checks the target file location to avoid reprocessing images.

The biggest drawback with the third method is that when you’re building on a deployment server, these environments start with an empty output folder (and thus, an empty disk cache). What can we do to re-use the disk cache and avoid reprocessing unchanged images on each new deploy?

With just a [few lines of configuration code](https://github.com/zachleat/zachleat.com/commit/eead25b5b38431d3b61bfb318a186d3214c45260) to create an intermediate output folder in a location that is persisted between builds (`.cache`), I was able to drop my site’s build time from an embarrasing `9:40` down to a respectable `3:56` {% icon "fas:trophy", iconAttributes.trophy %} (for throughput info, the output folder has 7,779 files weighing 492.7 MB).

I think this approach is **very reusable** and we’ll likely bundle it into a future version of Eleventy Image. Until then, you can use it yourself by adding the following lines of configuration:

```diff-js
+import fs from "node:fs";
 import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

 export default function(eleventyConfig) {
+	const IMAGE_OUTPUT_DIR = path.join(eleventyConfig.directories.output, "/img/built/");

 	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
+		urlPath: "/img/built/",
+		outputDir: process.env.ELEVENTY_RUN_MODE === "build" ? ".cache/@11ty/img/" : IMAGE_OUTPUT_DIR,
 		failOnError: false,
 		formats: ["svg", "avif", "jpeg"],
 		svgShortCircuit: true,
 	});

+	if(process.env.ELEVENTY_RUN_MODE === "build") {
+		eleventyConfig.on("eleventy.after", () => {
+			fs.cpSync(".cache/@11ty/img/", IMAGE_OUTPUT_DIR, {
+				recursive: true
+			});
+		});
+	}
 };
```

You may also need to [persist `.cache` on your web host](https://www.11ty.dev/docs/deployment/#persisting-cache). This behavior is provided for-free if you’re using Vercel or Cloudflare Pages.

_Subscribe to [`github.com/11ty/eleventy-img/issues/285`](https://github.com/11ty/eleventy-img/issues/285) for future updates._