---
title: "The JavaScript Site Generator Review, 2023"
toot: https://fediverse.zachleat.com/@zachleat/109920627317840768
---
It’s time again for every framework author’s favorite: The JavaScript Site Generator Review, February 2023 edition.

<details><summary>Expand for the table of contents</summary>

[[toc]]

</details>

Here is the list of site generators reviewed in alphabetical order::

* Astro `2.0.15`
* Eleventy `2.0.0`
* Gatsby `5.7.0`
* Next.js `13.2.1`
* Nuxt `3.2.2`
* Remix `1.13.0`
* SvelteKit `1.8.3`

Each example site was created using a fresh run of the Quick Start or Getting Started tutorial on each respective generator’s web site.

## Previous Reviews

* [Next.js v13 review](/twitter/1584995586918731776/)—_October 2022_
* [Markdown benchmark](/web/build-benchmark/) and [`npm install` Benchmark](/web/build-benchmark/#bonus:-npm-install-benchmarks)—_July 2022_
* [Remix v1.5.1 review](/twitter/1534588439580090368/)—_June 2022_
* [Next.js review](/twitter/1534588439580090368/)—_December 2021_
* [Who Pays for Web Frameworks?](/web/monetization/)—_Last updated October 2022_

## `npm install` Times

_Times shown are in seconds. Lower is better._

<is-land on:visible>
<div id="npminstall-chart" style="height: 450px" aria-hidden="true"></div>
<template data-island>
<link rel="stylesheet" href="/static/artificial-chart.css">
<script type="module">
import "https://d3js.org/d3.v7.min.js";
import { HorizontalBar } from "/static/artificial-chart.js";
new HorizontalBar("npminstall-chart", "npminstall-datatable", {
  showLegend: false,
  showInlineBarValues: "outside",
  valueType: ["float"],
  margin: {
    left: 170
  }
});
</script>
</template>
</is-land>

<details>
<summary>Expand to show table of results</summary>
<table id="npminstall-datatable">
<thead>
  <tr>
    <th>Framework</th>
    <th><code>npm install</code> Time</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Astro <code>2.0.15</code></td>
    <td>12.52</td>
  </tr>
  <tr>
    <td>Eleventy <code>2.0.0</code></td>
    <td>5.81</td>
  </tr>
  <tr>
    <td>Gatsby <code>5.7.0</code></td>
    <td>43.36</td>
  </tr>
  <tr>
    <td>Next.js <code>13.2.1</code></td>
    <td>3.72</td>
  </tr>
  <tr>
    <td>Nuxt <code>3.2.2</code></td>
    <td>14.77</td>
  </tr>
  <tr>
    <td>Remix <code>1.13.0</code></td>
    <td>40.14</td>
  </tr>
  <tr>
    <td>SvelteKit <code>1.8.3</code></td>
    <td>6.78</td>
  </tr>
</tbody>
</table>
</details>

Notes:

* Next bundles all of its dependencies (save for `react` and `react-dom`) and as such bypasses functionality provided by npm.
* `npm cache clean --force` was used to clean the cache before each install.
* [npm auditing](https://docs.npmjs.com/cli/v9/commands/npm-audit?v=true) was enabled for these tests.

## Client JavaScript Baseline

_Weights shown are in kilobytes of uncompressed resource size (not transfer size)._

<is-land on:visible>
<div id="client-js-chart" style="height: 450px" aria-hidden="true"></div>
<template data-island>
<link rel="stylesheet" href="/static/artificial-chart.css">
<script type="module">
import "https://d3js.org/d3.v7.min.js";
import { HorizontalBar } from "/static/artificial-chart.js";
new HorizontalBar("client-js-chart", "client-js-datatable", {
  showLegend: false,
  showInlineBarValues: "outside",
  valueType: ["float"],
  margin: {
    left: 170
  }
});
</script>
</template>
</is-land>

<details>
<summary>Expand to show table of results</summary>
<table id="client-js-datatable">
<thead>
  <tr>
    <th>Framework</th>
    <th>Client JavaScript Baseline (kB)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Astro <code>2.0.15</code></td>
    <td>0</td>
  </tr>
  <tr>
    <td>Eleventy <code>2.0.0</code></td>
    <td>0</td>
  </tr>
  <tr>
    <td>Gatsby <code>5.7.0</code></td>
    <td>210</td>
  </tr>
  <tr>
    <td>Next.js <code>13.2.1</code></td>
    <td>248</td>
  </tr>
  <tr>
    <td>Nuxt <code>3.2.2</code></td>
    <td>191</td>
  </tr>
  <tr>
    <td>Remix <code>1.13.0</code></td>
    <td>228</td>
  </tr>
  <tr>
    <td>SvelteKit <code>1.8.3</code></td>
    <td>53</td>
  </tr>
</tbody>
</table>
</details>

## `node_modules` Weight

_Weights shown are in megabytes._

<is-land on:visible>
<div id="nodemodules-chart" style="height: 450px" aria-hidden="true"></div>
<template data-island>
<link rel="stylesheet" href="/static/artificial-chart.css">
<script type="module">
import "https://d3js.org/d3.v7.min.js";
import { HorizontalBar } from "/static/artificial-chart.js";
new HorizontalBar("nodemodules-chart", "nodemodules-datatable", {
  showLegend: false,
  showInlineBarValues: "outside",
  valueType: ["float"],
  margin: {
    left: 170
  }
});
</script>
</template>
</is-land>

<details>
<summary>Expand to show table of results</summary>
<table id="nodemodules-datatable">
<thead>
  <tr>
    <th>Framework</th>
    <th>node_modules Weight (MB)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Astro <code>2.0.15</code></td>
    <td>169</td>
  </tr>
  <tr>
    <td>Eleventy <code>2.0.0</code></td>
    <td>34</td>
  </tr>
  <tr>
    <td>Gatsby <code>5.7.0</code></td>
    <td>583</td>
  </tr>
  <tr>
    <td>Next.js <code>13.2.1</code></td>
    <td>158</td>
  </tr>
  <tr>
    <td>Nuxt <code>3.2.2</code></td>
    <td>164</td>
  </tr>
  <tr>
    <td>Remix <code>1.13.0</code></td>
    <td>497</td>
  </tr>
  <tr>
    <td>SvelteKit <code>1.8.3</code></td>
    <td>111</td>
  </tr>
</tbody>
</table>
</details>

## npm Auditing

Some frameworks use `create-*` packages (sometimes with `npm init`) and include a step that helpfully installs your `npm` dependencies for you. However, some of these tools also hide npm auditing results (including those about high severity security vulnerabilities).

These tools hide `npm audit` reports:

* Astro ⚠️
* Gatsby ⚠️
* Next ⚠️ (via bundling its dependencies)

These tools show standard `npm audit` reports during project creation:

* Eleventy ✅
* Nuxt ✅
* Remix ✅
* SvelteKit ✅

## Telemetry

Telemetry is the practice of collecting anonymous data on usage of the tool. Some tools have this enabled (opt-in) by default and require an opt-out. This isn’t necessarily bad but some folks are very surprised by this default (and education here is important as this default may not comply with your organization’s security policies).

These tools require you to opt-out of Telemetry:

* Astro ⚠️
* Next.js ⚠️
* Gatsby ⚠️
* Nuxt ⚠️

Has Telemetry but it is opt-in:

* _None_

No known Telemetry or data collection:

* Eleventy ✅
* Remix ✅
* SvelteKit ✅

Notably and delightfully, Nuxt v2 prompts you to ask if you want to participate in Telemetry when you first run the development server. Though it is still technically opt-out, this seems like a great middle ground. Unfortunately I didn’t see this prompt when creating a Nuxt v3 project.

## Feedback

Let me know if you have feedback—I’d also welcome recommendations on aspects of these tools that you’d like to see reviewed for next time!

<svg style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;">
  <defs>
    <linearGradient id="gradient-sunrise-h">
      <stop offset="0%" stop-color="#F0047F"/>
      <stop offset="100%" stop-color="#FC814A"/>
    </linearGradient>
    <linearGradient id="gradient-sunrise-v" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#F0047F"/>
      <stop offset="100%" stop-color="#FC814A"/>
    </linearGradient>
    <linearGradient id="gradient-blue-h">
      <stop offset="0%" stop-color="#0090c9"/>
      <stop offset="100%" stop-color="#00c0ad"/>
    </linearGradient>
    <linearGradient id="gradient-blue-v" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#0090c9"/>
      <stop offset="100%" stop-color="#00c0ad"/>
    </linearGradient>
    <linearGradient id="gradient-sun-h">
      <stop offset="0%" stop-color="#FFC803"/>
      <stop offset="100%" stop-color="#FC814A"/>
    </linearGradient>
    <linearGradient id="gradient-sun-v" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#FFC803"/>
      <stop offset="100%" stop-color="#FC814A"/>
    </linearGradient>
  </defs>
</svg>