---
title: "Which Generator builds Markdown the fastest?"
---
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

<iframe style="width: 100%; aspect-ratio: 1.61725067;" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRZ2twipZhRDnkvUZOjRh3ufR2h05O1DlHbsNDnc-qVpwrodiRaqv3g1pV9FljuuSqhdeCZPwMQJcs7/pubchart?oid=296294569&amp;format=interactive" frameborder="0" scrolling="no"></iframe>

* [_View on Google Sheets_](https://docs.google.com/spreadsheets/d/1wFWKkpNRsToixdGyWeznA8xaUB0ZJggpLiTPLnaeL4k/)

<details>
<summary>Show table of results</summary>

Times are in seconds.

|Generator|250× `.md`|500× `.md`|1000× `.md`|2000× `.md`|4000× `.md`|
|---|---|---|---|---|---|
|Astro `1.0.0-rc2`|3.044|4.361|7.331|13.349|30.258|
|Eleventy `1.0.1`|0.584|0.683|0.914|1.250|1.938|
|Gatsby `4.19.0` (cli)|14.462|15.722|17.967|22.356|29.059|
|Hugo `v0.101.0`|0.071|0.110|0.171|0.352|0.684|
|Next.js `12.2.3`|6.552|6.932|8.034|9.582|13.409|
|Remix `1.6.5`|2.876|8.258|46.918|349.125|&lt; 1800\*|

_\* Force quit at 30 minutes—it didn’t finish._

</details>

Note that the above chart uses a logarithmic scale. Each run was repeated 3 times and the lowest/fastest time was selected. This result set was generated on a MacBook Air (M1, 2020), macOS Monterey 12.5, 16 GB memory.

All of the code for [this benchmark is fully open source](https://github.com/zachleat/bench-framework-markdown) and welcomes review.

## Test Notes

For each generator sample I attempted to create a reduced project with the sole use case of processing markdown files. I opt-ed out of TypeScript when options were presented in various cli tools to do so. Output folders and framework specific cache folders were deleted before each run.

* For Astro I used the [Blog example](https://github.com/withastro/astro/tree/latest/examples/blog?on=github) which uses a pre-release of Astro 1.0.
* For Eleventy I used [`eleventy-base-blog`](https://github.com/11ty/eleventy-base-blog), even though it has a few extra plugins and templates in play on top of the barebones core experience.
* For Gatsby, I used `npm init gatsby` with Markdown support (not MDX).
* For Hugo, I went through the [Quickstart (skipping the theme)](https://gohugo.io/getting-started/quick-start/)
* For Next.js I deleted a bunch of things out of the [`blog-starter` example](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) linked from the docs on [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended).
* For Remix I went through the [Blog tutorial](https://remix.run/docs/en/v1/tutorials/blog) but did not use a database.

I put out a [Twitter poll](https://twitter.com/zachleat/status/1552723709395406849) to gauge how folks felt about project sizes. 1000 files was considered a Large project by 58.8% of voters, Medium for 36.8% of voters. Markdown samples borrowed from [Sean C Davis’s SSG Build Performance Comparison repository](https://github.com/seancdavis/ssg-build-performance-tests). I have not yet added tests for Jekyll or Nuxt but [I’m open to it!](https://github.com/zachleat/bench-framework-markdown/issues)

### Summary

1. Hugo remains the undisputed speed champ—no question about that.
1. Eleventy was the fastest JavaScript-based generator.
1. Generators that create per-page JavaScript bundles (for single page apps, primarily) are usually slower to build, unsurprisingly. Heavier pages aren’t exclusively slower for end users—they’re slower for developers too.
1. Astro was on-par with Next.js at mid-range (1k) and on-par with Gatsby at the upper-range (4k) of this benchmark.
1. I would [welcome a code review on the Remix site](https://twitter.com/zachleat/status/1553056554966040578)—it scaled so poorly that I suspect that I may have misconfigured something? I would be happy to update with corrections.

### Bonus: `npm install` Benchmarks

<iframe style="width: 100%; aspect-ratio: 1.61725067;" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTQRE6QkRJgCj-Tr_LfevwmrjzU68TqjhontCqJO0-hdVZO02BmBo9i6zPtMVeKk1LGWC6uP6bXOCyZ/pubchart?oid=1884126262&amp;format=interactive" frameborder="0" scrolling="no"></iframe>

* [_View on Google Sheets_](https://docs.google.com/spreadsheets/d/1q38KB7cmD6Mk3Fxm7vY-pdmFdrN6kbq3DhuMmB9kij0/)

<details>
<summary>Show table of results</summary>

Times are in seconds.

|Framework|`npm install`|
|---|---|
|Astro `1.0.0-rc2`|19.870s|
|Eleventy `1.0.1`|15.168s|
|Eleventy `2.0.0-canary.14`|7.195s|
|Gatsby `4.19.0` (cli)|68.516s|
|Next.js `12.2.3`|15.589s|
|Remix `1.6.5`|28.619s|

</details>

Each run was repeated 5 times and the lowest/fastest time was selected. `npm cache clean --force` was run before each to ensure a cold install. This result set was generated on a MacBook Air (M1, 2020), macOS Monterey 12.5, 16 GB memory.