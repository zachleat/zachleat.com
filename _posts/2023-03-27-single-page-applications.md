---
title: Defaulting on Single Page Applications (SPA)
tags: eleventy
external_url: https://www.11ty.dev/docs/single-page-applications/
external_url_location: end
---
If you’re trying to build a single page application (SPA), you should probably use a tool designed primarily for the job. Site generators focused on performance, shipping low to zero-client-JavaScript (e.g. the one I work on, [Eleventy](https://www.11ty.dev/)) typically use full page navigations. SPA advocates have rebranded this architecture as a Multi-Page Application (MPA) but fundamentally this is how the web has always operated.

Classic multi-page architecture has a few benefits:

* **Better empty-cache performance**: your site can render faster.
	* As web browsers become more privacy-focused and users spread their browsing across multiple web-capable devices, empty-caches visits are increasingly common.
	* Faster sites make more money. Read [WPO Stats](https://wpostats.com/).
	* Search engines use [site performance as a search ranking signal](https://developers.google.com/search/blog/2020/11/timing-for-page-experience), which makes good performance crucial.
* **Inclusive and robust by default**: You are in full control the minimum requirements necessary to visit your site. You needn’t put any undue burden on the capabilities of the web browser of your visitors. You needn’t place your site behind a “Best Viewed In” browser-compatibility warning. If they can view HTML, they can view your site.
* **Energy-efficiency**: Lighter pages result in safer long sessions that are more energy efficient and won’t drain your visitors’ laptop or mobile device batteries.
* **Privacy-focused**: working without client-JavaScript allows visitors full control over their viewing experience. This allows you to create sites that work best in the harsh real world environment of browser extensions, content and ad-blockers; even working with those rare folks that browse with JavaScript disabled.
* **Searchable by default**: A simpler architecture for server rendered content makes it straightforward for search engines to find you.
* **Better defaults** for accessibility-focused page navigations, preserving scroll position, forward/back button support, etc.

Single Page Application frameworks in the last few years have pivoted away from client-side rendering to server-rendering and we welcome this improvement. However, the large starting size of client JavaScript bundles customary to SPA persist: Remix (228 kB), Next.js (248 kB), Gatsby (210 kB), and Nuxt (191 kB) <a href="/web/site-generator-review/#client-javascript-baseline" class="notes_link">source</a>. Notably, these large bundle sizes are only the minimum for a Hello World project and will only grow as your project grows (and as the frameworks grow over time, too).

You can’t JavaScript your way out of an excess-JavaScript problem. **These large JavaScript bundles are costly to site performance.**

Single Page Application advocates argue these large, costly bundles enable performance gains for future navigations, seamless media playback during transition, and fancy transition animations. While we can debate (and even agree on some of) those points (recognizing also that they will fade into irrelevance as the web platform progresses), take a moment to consider **whether or not this trade-off should be made for you as a default**.

The **data supports the case that Single Page Applications are a bad default for the web** too. An analysis of Core Web Vitals across 9.3 million web sites in February 2023 [shows that only 26% of sites built using the most popular Single Page Application framework (Next.js) have good Core Web Vitals](https://lookerstudio.google.com/u/0/reporting/55bc8fad-44c2-4280-aa0b-5f3f0cd3d2be/page/M6ZPC?s=lD9m_MQgyGU), far lower than the web at large (40%).

## Alternatives

Learn more about alternative approaches that can provide some of the same SPA benefits without the drawbacks:

* Use the [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions/) to do smooth cross-page animations on navigation.
* [Example code using the View Transitions API in an Eleventy project](https://github.com/pepelsbey/pepelsbey.dev/commit/accf0da) from Vadim Makeev.
* [Predictive Prefetching can speed up navigations](https://addyosmani.com/blog/prefetching/).
* Prefetching JavaScript libraries:
	* [quicklink](https://getquick.link/)
	* [instant.page](https://instant.page/)

## Trade-offs

* [Why I'm not the biggest fan of Single Page Applications](https://www.matuzo.at/blog/2023/single-page-applications-criticism/) by Manuel Matuzović.
* [When JavaScript Fails](https://scribe.rip/@jason.godesky/when-javascript-fails-52eef47e90db) by Jason Godesky.
* [Netflix functions without client-side React, and it’s a good thing](https://jakearchibald.com/2017/netflix-and-react/) by Jake Archibald.
* [SPA navigation may be slower than MPA navigation](https://twitter.com/jaffathecake/status/1433317536754458628), a tweet from Jake Archibald.
* [Which has a better FMP? 8.5 MB of HTML or one SPA-rendered Tweet](https://www.zachleat.com/twitter/1169998370041208832/)
