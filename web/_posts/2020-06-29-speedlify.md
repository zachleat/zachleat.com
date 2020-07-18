---
title: Use Speedlify to Continuously Measure Site Performance
tags:
  - project
  - popular-posts
postRank: 2
---
When launching a brand new web site, it’s fairly common to run testing tools to ensure that the site is fast and follows best practices. One popular tool to accomplish these goals is [Google’s Lighthouse](https://developers.google.com/web/tools/lighthouse). It works great and is pretty comprehensive.

Here are some of the ways I’ve used Lighthouse to help test my sites:

* Chrome Developer Tools (this is where people usually start)
* [Bookmarklet (for easy access in Firefox) via @adactio](https://adactio.com/journal/16523)
* [Lighthouse Metrics (created by @chriswdmr)](https://lighthouse-metrics.com/) for quick and easy worldwide testing
* [Lighthouse CLI](https://www.npmjs.com/package/lighthouse#using-the-node-cli) via the [`performance-leaderboard`](https://github.com/zachleat/performance-leaderboard) package, which will do multiple runs and select the median.
* [Eleventy Leaderboards](https://www.11ty.dev/leaderboard/) allow the Eleventy community to compete on site performance and accessibility (also using `performance-leaderboard`).
* [Lighthouse Viewer](https://googlechrome.github.io/lighthouse-ci/viewer/) can diff two different Lighthouse logs to see how the performance changed.

Instantaneous measurement is a good first step. But how do we ensure that the site maintains good performance and best practices when deploys are happening every day? How do we keep the web site fast? The second step is continuous measurement. This is where Speedlify comes in. It’s an [{% imgavatar "eleven_ty" %}Eleventy](https://www.11ty.dev/)-generated web site published as an open source repository to help automate continuous performance measurements.

<div class="primarylink"><a href="https://www.speedlify.dev/ssg/">Speedlify Demo, for Static Site Generator web sites</a></div>

## Source Code

* **[Speedlify on GitHub](http://github.com/zachleat/speedlify)**

* **DIY**: Run it manually, locally on your computer and check in the data to your repo.
* **Automated**: If you want to automate it, Speedlify can run entirely self-contained on Netlify. Be aware that there’s a maximum of 15 minutes per build (if you do 3 runs each, I’d guess this will let you test a maximum of around 20 pages). [Netlify’s free tier](https://www.netlify.com/pricing/) gives you 300 build minutes per month.

<div class="fullwidth"><a href="https://www.speedlify.dev/ssg/"><img src="/web/img/posts/speedlify/screenshot-1x.png" srcset="/web/img/posts/speedlify/screenshot-1x.png 600w, /web/img/posts/speedlify/screenshot-2x.png 1400w" sizes="(min-width: 60em) calc(100vw - 13.5rem), 100vw" alt="A very zoomed out screenshot of Speedlify" width="600" height="540"></a></div>

## Next Steps

Speedlify is intended as a stepping stone to more robust performance monitoring solutions like:

* [SpeedCurve](https://speedcurve.com/)
* [Calibre](https://calibreapp.com/)

Use it to sell ’em on the benefits and if you have budget, pay for something better 😅

