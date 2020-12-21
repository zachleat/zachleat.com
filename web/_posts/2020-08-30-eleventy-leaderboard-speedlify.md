---
title: Eleventy Leaderboards v2 via Speedlify
tags:
  - project
---
Wow—this entire thing has been a journey. The idea for the Eleventy Leaderboards was originally borne out of some lighthearted fun poking at the [AMP Carousel in Google Search results](/web/performance-dashboard/).

And now we have a fully fledged independent, self-hosted performance dashboard, monitoring solution. Let’s have a look at the final result, ranking the Lighthouse and Axe scores of the nearly 400 web sites in the Built With Eleventy showcase. Every site has historical results complete with a data visualization chart of that data over time.

<div class="primarylink"><a href="https://www.11ty.dev/speedlify/">Eleventy Leaderboards (powered by Speedlify)</a></div>

Follow [{% imgavatar "speedlify" %}speedlify](https://twitter.com/speedlify) on Twitter or check out [speedlify.dev](https://www.speedlify.dev/).

## What’s New

* It’s using [Speedlify](/web/speedlify/)! That means full historical Lighthouse results and full Axe scans (some Axe violations don’t show in Lighthouse).
* You can add `<speedlify-score>` to your web site to show your latest Eleventy Leaderboard rank and score! Here’s a live example of the leaderboard entry for zachleat.com: <div class="livedemo livedemo-mixed" data-demo-label="Example for zachleat.com"><speedlify-score speedlify-url="https://www.11ty.dev/speedlify" hash="bbfa43c1" score weight rank rank-change></speedlify-score></div>The Eleventy Leaderboards also provide the `<speedlify-score>` markup you need to integrate the component on your site. Just copy and paste: <img src="/web/img/posts/11ty-leaderboard-source.png" alt="Example of how to copy speedlify-score markup on the Eleventy Leaderboards"> Add or remove the `score`, `weight`, `rank`, `rank-change`, and `requests` attributes to your needs.
* Eleventy Author pages now show screenshots *and* Speedlify scores from the Leaderboard. e.g. [the {% imgavatar "zachleat" %}zachleat Eleventy Author page](https://www.11ty.dev/authors/zachleat/). A quick shout out to [{% imgavatar "smthdotuk" %}Sam Smith](https://www.11ty.dev/authors/smthdotuk/), who at time of writing had perfect scores on every one of the six sites listed on their Eleventy Author page.
* As a bonus feature to Speedlify, we now show a warning on the results when redirects are impacting site performance. If someone forgot a trailing slash on their URL or a `www.`, I’ll usually fix those manually but sometimes they are legitimate parts of the experience (e.g. a redirect from `/` to `/en/` for internationalization).

### “The Algorithm” and Tiebreaker Changes

In the current version of the Eleventy Leaderboards (via Speedlify), ranking order is determined as follows:

1. Sort by largest sum of all four Lighthouse categories
	* In contrast, previous versions were limited to Performance and Accessibility scores only.
2. If equal, sort by fewest Axe violations
3. If equal, sort by lowest ratio of Speed Index to Page Weight. If Speed Index is equal the larger site wins. If Page Weight is equal the lower Speed Index wins.
	* In contrast, previous versions used lowest Speed Index as a final tiebreaker (smaller sites usually won here) and highest number of Axe passes (larger sites usually won here).

View [the code for the ranking algorithm in `performance-leaderboard`](https://github.com/zachleat/performance-leaderboard/blob/fb15b25fe7badbde1311092c83a66f9d2a73b92f/src/ResultLogger.js#L120).

## The Journey

Those interested in the history of the thing might want to read about a few of the steps along the way:

* Some early iterations iteration of the Built with Eleventy showcase didn’t have any ranking—they were a simple list of sites built using Eleventy. You can check out the versions for old docs: [v0.7.0](https://v0-7-0.11ty.dev/docs/sites/) with 49 sites, [v0.8.0](https://v0-8-0.11ty.dev/docs/sites/) with 69 sites (nice), [v0.9.0](https://v0-9-0.11ty.dev/docs/sites/) with 110 sites, and [v0.10.0](https://v0-10-0.11ty.dev/docs/sites/) with 141 sites.
* The first release of the [Eleventy Performance Leaderboard](https://v0-11-0.11ty.dev/leaderboard/perf/) (on the v0.11.0 docs) ranking each of 312 sites by its Lighthouse Performance Score. These results were run using Lighthouse version 5. Next came the [Eleventy Accessibility Leaderboard](https://v0-11-0.11ty.dev/leaderboard/a11y/) and the [Eleventy Combined Leaderboard Top 11](https://v0-11-0.11ty.dev/leaderboard/combined/) to rank both together.
* Then [Eleventy author pages](https://v0-11-0.11ty.dev/authors/) to show all of the sites an author has built listed on the showcase.
* The biggest leap forward here was to decouple the whole thing to create [Speedlify](https://www.speedlify.dev/), a self-hosted isolated solution to continuously measure your site’s Lighthouse and Axe scores ([Blog post](https://www.zachleat.com/web/speedlify/)).
* Then a web component to consume Speedlify scores from an API to show [Lighthouse Scores in my page’s footer](https://www.zachleat.com/web/lighthouse-in-footer/).
* Then I added Speedlify results to all of the [Eleventy Starter Projects](https://www.11ty.dev/docs/starter/) to more easily differentiate between them. Read the [`speedlify-score` blog post](https://www.zachleat.com/web/11ty-lighthouse/).
