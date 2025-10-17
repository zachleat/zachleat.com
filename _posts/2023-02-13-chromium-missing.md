---
title: "'Could not find Chromium' with Puppeteer 19"
external_icon_url: https://pptr.dev/
---
Kept seeing this error on my Netlify builds of the [Speedlify project](https://www.speedlify.dev/) after upgrading to Puppeteer 19:

```bash
/opt/build/repo/node_modules/puppeteer-core/lib/cjs/puppeteer/node/ProductLauncher.js:127

Error: Could not find Chromium (rev. 1095492). This can occur if either
 1. you did not perform an installation before running the script (e.g. `npm install`) or
 2. your cache path is incorrectly configured (which is: /opt/buildhome/.cache/puppeteer).

For (2), check out our guide on configuring puppeteer at https://pptr.dev/guides/configuration.
```

With Puppeteer 19, the [Chromium download has been moved to a new folder](https://pptr.dev/troubleshooting#could-not-find-expected-browser-locally): `~/.cache/puppeteer` (on Netlify this is `/opt/buildhome/.cache/puppeteer/`).

The problem here is that Puppeteer only downloads Chromium when it is installed and the folder it downloads to is outside of the expected and previously working folders that Netlify persists across builds (like `node_modules`).

The solution here is to either move this Chromium download folder to a location that does get persisted (via [`PUPPETEER_CACHE_DIR` environment variable or a `puppeteer.config.cjs` config file](https://pptr.dev/troubleshooting#could-not-find-expected-browser-locally)) or persist it yourself via a Netlify build plugin.

I chose the latter. The [`netlify-plugin-cache` build plugin](https://github.com/jakejarvis/netlify-plugin-cache) will probably do this for you, but its so few lines of code that I used my own:

<details>
<summary><strong>Expand to see the <code>keep-data-cache</code> Netlify build plugin</strong></summary>

```js
// speedlify/plugins/keep-data-cache/index.js
module.exports = {
  async onPreBuild({ utils }) {
    await utils.cache.restore('/opt/buildhome/.cache/puppeteer/');
  },

  async onPostBuild({ utils }) {
    await utils.cache.save('/opt/buildhome/.cache/puppeteer/');
  }
};
```

which is referenced in my `netlify.toml`:

```toml
# netlify.toml
[[plugins]]
package = "./plugins/keep-data-cache"
```

You can see this [in action on the `speedlify` project](https://github.com/zachleat/speedlify/tree/79fada569f9f69b600e99fc8daec4f6d11db1879/plugins/keep-data-cache).

</details>


After applying this change, make sure you force Netlify to reinstall your `node_modules` by clearing the [build cache](https://docs.netlify.com/site-deploys/manage-deploys/#retry-deploy-from-latest-branch-commit) or changing a dependency version in your `package.json`.