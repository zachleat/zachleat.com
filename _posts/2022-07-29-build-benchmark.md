---
title: "Which Generator builds Markdown the fastest?"
stylesheetsDist:
  - "artificial-chart.css"
---
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

Blogging. The quintessential starter project for most—if not all—[site generators](https://jamstack.org/generators/). Here’s a few samples:

* Next.js guides new developers to [`Learn Next.js`](https://nextjs.org/learn/basics/create-nextjs-app) _“by creating a very simple blog app.”_
* [Gatsby’s tutorial](https://www.gatsbyjs.com/docs/tutorial/part-1/) guides folks to create their _“first Gatsby site: a blog site…”_
* Remix’s home page has a prominent _Get Started_ call to action button that links to their [Blog Tutorial](https://remix.run/docs/en/v1/tutorials/blog).

<div class="livedemo livedemo-evil livedemo-sm">
  Some of these adamantly SPA-first *web app* frameworks have really focused their documentation on content-based *web site* use cases—but let’s not read into that too much…
</div>

Given that Markdown is a very popular document format for blogging, this gives us the opportunity to compare the performance of different site generators for this pervasive use case (highlighted on each generator’s documentation, as noted above).

Let’s see how each generator stacks up when consuming markdown files from the local project’s file system and building into a production-ready project.

_(Order is alphabetical. Disclosure: I am the maintainer of [Eleventy](https://www.11ty.dev/))_

## Benchmark Results

<is-land on:visible>
<style>
#markdown-bench-chart svg { overflow: visible; }
</style>
<div id="markdown-bench-chart" style="height: 850px"></div>
<script type="module/island">
import "https://d3js.org/d3.v7.min.js";
import { Line } from "/web/dist/{{pkg.version}}/artificial-chart.js";
new Line("markdown-bench-chart", "markdown-bench-datatable", {
  showLegend: false,
  valueType: ["float"],
  max: {
    y: 70
  },
  margin: {
    left: 25,
    right: 70,
  }
});
</script>
</is-land>

_Times shown are in seconds. Lower is better._

<table id="markdown-bench-datatable">
<thead>
<tr>
<th>Markdown Files:</th>
<th class="numeric">250</th>
<th class="numeric">500</th>
<th class="numeric">1000</th>
<th class="numeric">2000</th>
<th class="numeric">4000</th>
</tr>
</thead>
<tbody>
<tr>
<td>Astro <code>1.0.0-rc2</code></td>
<td class="numeric">3.044</td>
<td class="numeric">4.361</td>
<td class="numeric">7.331</td>
<td class="numeric">13.349</td>
<td class="numeric">30.258</td>
</tr>
<tr>
<td>Eleventy <code>1.0.1</code></td>
<td class="numeric">0.584</td>
<td class="numeric">0.683</td>
<td class="numeric">0.914</td>
<td class="numeric">1.250</td>
<td class="numeric">1.938</td>
</tr>
<tr>
<td>Gatsby <code>4.19.0-cli</code></td>
<td class="numeric">14.462</td>
<td class="numeric">15.722</td>
<td class="numeric">17.967</td>
<td class="numeric">22.356</td>
<td class="numeric">29.059</td>
</tr>
<tr>
<td>Hugo <code>v0.101.0</code></td>
<td class="numeric">0.071</td>
<td class="numeric">0.110</td>
<td class="numeric">0.171</td>
<td class="numeric">0.352</td>
<td class="numeric">0.684</td>
</tr>
<tr>
<td>Next.js <code>12.2.3</code> (JS routing)</td>
<td class="numeric">6.552</td>
<td class="numeric">6.932</td>
<td class="numeric">8.034</td>
<td class="numeric">9.582</td>
<td class="numeric">13.409</td>
</tr>
<tr>
<td>Next.js <code>12.2.3</code> (File routing)</td>
<td class="numeric">7.958</td>
<td class="numeric">9.551</td>
<td class="numeric">14.304</td>
<td class="numeric">25.038</td>
<td class="numeric">70.653</td>
</tr>
<tr>
<td>Remix <code>1.6.5</code> (File routing)</td>
<td class="numeric">2.876</td>
<td class="numeric">8.258</td>
<td class="numeric">46.918</td>
<td class="numeric">349.125</td>
<td class="numeric"><em>1800</em></td>
</tr>
</tbody>
</table>

<div class="caption">The last Remix (File routing) test was force-quit at 1800 seconds (30 minutes)—it had not completed.</div>

<table>
<thead>
<tr>
<th>Markdown Files:</th>
<th class="numeric">250</th>
<th class="numeric">500</th>
<th class="numeric">1000</th>
<th class="numeric">2000</th>
<th class="numeric">4000</th>
</tr>
</thead>
<tbody>
<tr>
<td>Remix <code>1.6.5</code> (JS routing)</td>
<td class="numeric">0.868</td>
<td class="numeric">0.834</td>
<td class="numeric">0.891</td>
<td class="numeric">0.887</td>
<td class="numeric">0.901</td>
</tr>
</tbody>
</table>
<div class="caption"><em>Updated August 3, 2022:</em> Perhaps controversially, the Remix (JS routing) method is excluded from the chart because it does not perform any processing of markdown. One <em>could</em> argue that this is the fastest way but also simultaneously irrelevant to this benchmark! Make sure you read the <a href="#remix-addendum">Remix addendum below</a>.</div>

Each run was repeated 3 times and the lowest/fastest time was selected. This result set was generated on a MacBook Air (M1, 2020), macOS Monterey 12.5, 16 GB memory.

All of the code for [this benchmark is fully open source](https://github.com/zachleat/bench-framework-markdown) and welcomes review.

## Test Notes

For each generator sample I attempted to create a reduced project with the sole use case of processing markdown files. I opt-ed out of TypeScript when options were presented in various cli tools to do so. Output folders and framework specific cache folders were deleted before each run.

* For Astro I used the [Blog example](https://github.com/withastro/astro/tree/latest/examples/blog?on=github) which uses a pre-release of Astro 1.0.
* For Eleventy I used [`eleventy-base-blog`](https://github.com/11ty/eleventy-base-blog), even though it has a few extra plugins and templates in play on top of the barebones core experience.
* For Gatsby, I used `npm init gatsby` with Markdown support (not MDX).
* For Hugo, I went through the [Quickstart (skipping the theme)](https://gohugo.io/getting-started/quick-start/)
* For Next.js I deleted a bunch of things out of the [`blog-starter` example](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) linked from the docs on [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended).
* For Remix I went through the [Blog tutorial](https://remix.run/docs/en/v1/tutorials/blog) but did not use a database. _(Read the [Remix addendum](#remix-addendum) below)._

I put out a [Twitter poll](https://twitter.com/zachleat/status/1552723709395406849) to gauge how folks felt about project sizes. 1000 files was considered a Large project by 58.8% of voters, Medium for 36.8% of voters. Markdown samples borrowed from [Sean C Davis’s SSG Build Performance Comparison repository](https://github.com/seancdavis/ssg-build-performance-tests). I have not yet added tests for Jekyll or Nuxt but [I’m open to it!](https://github.com/zachleat/bench-framework-markdown/issues)

### Summary

_Updated August 3, 2022 with notes about file-based routing of markdown in Remix and Next.js, as well as Astro MDX._

1. Hugo remains the undisputed speed champ—no question about that.
1. Eleventy was the fastest JavaScript-based generator.
1. Generators that create per-page JavaScript bundles (for single page apps, primarily) are usually slower to build, unsurprisingly. Heavier pages aren’t exclusively slower for end users—they’re slower for developers too.
1. File-based routing of markdown files in _both Next.js and Remix_ is a bit slow! Take care to add the additional boilerplate routing code needed to load markdown files more efficiently.
    * Read more on [(nextjs.org) Advanced Features: Using MDX with Next.js](https://nextjs.org/docs/advanced-features/using-mdx) and [(remix.run) MDX](https://remix.run/docs/en/v1/guides/mdx) and on the [Remix addendum](#remix-addendum) below.
1. Astro was on-par with Next.js at mid-range (1k) and on-par with Gatsby at the upper-range (4k) of this benchmark.
    * [Jon Neal submitted a PR to do Astro markdown processing via the MDX plugin](https://github.com/zachleat/bench-framework-markdown/pull/7). I re-ran the tests but the data for Astro didn’t change in a statistically significant way (yet?). Likely more to come there, this feature is _brand new_!
1. ~~I would [welcome a code review on the Remix site](https://twitter.com/zachleat/status/1553056554966040578)—it scaled so poorly that I suspect that I may have misconfigured something? I would be happy to update with corrections.~~
    * As noted in point 4 above, it is recommended for Remix projects by the Remix team to **not use file-system based routing for `.mdx` or `.md` files**. _(Read the [Remix addendum](#remix-addendum) below)._

### Bonus: `npm install` Benchmarks

<is-land on:visible>
<div id="npm-install-chart"></div>
<script type="module/island">
import "https://d3js.org/d3.v7.min.js";
import { HorizontalBar } from "/web/dist/{{pkg.version}}/artificial-chart.js";
new HorizontalBar("npm-install-chart", "npm-install-datatable", {
  showLegend: false,
  showInlineBarValues: "outside",
  valueType: ["float"],
  margin: {
    left: 170
  }
});
</script>
</is-land>

_Times shown are in seconds. Lower is better._

<details>
<summary>Show table of results</summary>

<table id="npm-install-datatable">
<thead>
  <tr>
    <th>Framework</th>
    <th><code>npm install</code> Time</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Astro <code>1.0.0-rc2</code></td>
    <td>19.870</td>
  </tr>
  <tr>
    <td>Eleventy <code>1.0.1</code></td>
    <td>15.168</td>
  </tr>
  <tr>
    <td>Eleventy <code>2.0.0-canary.14</code></td>
    <td>7.195</td>
  </tr>
  <tr>
    <td>Gatsby <code>4.19.0-cli</code></td>
    <td>68.516</td>
  </tr>
  <tr>
    <td>Next.js <code>12.2.3</code></td>
    <td>15.589</td>
  </tr>
  <tr>
    <td>Remix <code>1.6.5</code></td>
    <td>28.619</td>
  </tr>
</tbody>
</table>

</details>

Each run was repeated 5 times and the lowest/fastest time was selected. `npm cache clean --force` was run before each to ensure a cold install. This result set was generated on a MacBook Air (M1, 2020), macOS Monterey 12.5, 16 GB memory.

## Remix Addendum

_Updated August 3, 2022 (this entire section is new)_

I understand why Remix folks think this benchmark is unfair to Remix. I’ve heard **lots** of feedback and some of it has been decidedly unfriendly—but I do get it. I don’t really have any desire to wade into some of the larger debates about Remix or Jamstack on this post.

From my perspective, the benchmark encountered a build performance-related bug in how Remix—a request-time architected tool—performs a build-time precompilation of Markdown routes. It doesn’t have to be any more than a build-performance related bug. Once the bug is fixed (or if the approach is deprecated), I’ll make updates to this post.

<div class="livedemo" data-demo-label="Technical Detail">

For completeness and a bit more technical detail, the Remix team has asked me to highlight that it is **not recommended to use MDX file-system based routing** for `.mdx` or `.md` files. **Specifically: do not put `.md` or `.mdx` files into your `app/routes/` folder.** Make sure you read/heed the warnings on the [Remix MDX plugin documentation](https://remix.run/docs/en/v1/guides/mdx).

</div>

I maintain that markdown file-based routing is a useful feature and it seems likely that the Remix folks will be able to (at some point in the future) allow a peaceful coexistence of markdown routes _without_ a heavy build-time compilation step. The demand clearly exists as many other frameworks do support it!

But until then the Remix team recommends to opt out of file-based routing for Markdown to bypass the costly build-time compilation step. You can use a scripted route file to load Markdown files from the file system in a different source directory (not `app/routes/`). You can see an [implementation example](https://github.com/zachleat/bench-framework-markdown/tree/main/remix/my-remix-app) from [@ebey_jacob](https://twitter.com/ebey_jacob) in the `bench-framework-markdown` repository.

### One last note about Build Performance

> “While you were waiting for your static site to build, distributed web infra­structure got really good. Break through the static.”—https://remix.run/

The only other thing I’d like to say here is that whether a tool spits out bundled JavaScript for runtime server deployment on the Edge or HTML in a static build for the CDN, whether it’s categorized as a Static Site Generator or a Site Generator or none of the above: all of the tools tested in this benchmark are **performing a build step** to generate code for deployment and can encounter build-related performance issues.

All that to say: I think we can agree that build performance is not a concern exclusive to static site generators! There will always be a healthy tension between request-time and build-time and the tools that make use of both to complement each other will likely end up being the most useful to developers.

Keep measuring and keep building—appreciate y’all!