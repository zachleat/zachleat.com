---
title: Eleventy’s New Performance Leaderboard
tags:
  - eleventy
eleventyComputed:
  titleHtml: '{% imgavatar "eleven_ty", "z-avatar-eq" %}Eleventy’s New Performance Leaderboard'
---
Last week, the [AMP project](https://amp.dev/) and Eleventy crossed paths when AMP released an [official AMP plugin for Eleventy](https://blog.amp.dev/2020/03/11/easier-amp-development-with-the-new-amp-optimizer/).

Much has already been said about the [AMP project and how they exert influence over technology choices by setting up bad-for-the-web incentives via their power over search results](http://ampletter.org/). The higher search ranking via AMP carousel placement and the special lightning icon for sites using AMP has led many to feel like they’re required to use AMP to compete in the search results space and it’s hard to argue with that line of thinking.

_Related: I’ve also created an [AMP topic page on my twitter archive](/twitter/topic/amp/) and avoid [sharing AMP urls](/twitter/amp/)._

In light of all of this, last week I decided to [poke a little fun](https://twitter.com/zachleat/status/1237810370049441792) at the [AMP](amp.dev) project. On the Eleventy site we allow developers to submit their site to be listed on our _Built With Eleventy_ showcase. I created [a special carousel for AMP sites](https://www.11ty.dev/docs/sites/#any-site-using-amp) buried at the very bottom of our showcase. If AMP sites can be ranked higher on search results, they can be ranked lower in my little corner of the web. This is fun right? 😅 I’m having fun.

As the week progressed, I thought more about AMP’s special treatment in search and how it could be applied to any sufficiently speedy site. But hey, I could practice what I preach here too! I don’t have a search engine but I do have a list of sites that are kind of like search results! (Have a look at what the [showcase looked like before](https://v0-10-0.11ty.dev/docs/sites/).)

I set to work. I used the [`lighthouse` CLI plugin](https://github.com/GoogleChrome/lighthouse#readme) to run performance tests on all sites listed on the showcase. Initially I did a single Lighthouse run (mobile, network and CPU throttled) which proved fairly reliable in terms of repeatability for the Performance score specifically. This is the primary rank. The tiebreaker is the SpeedIndex score. However, SpeedIndex scores were a _little_ more variable than I would have liked. So, I switched to three runs for each site and picked the median of the three. The code for [these tests is all here](https://github.com/11ty/11ty-website/blob/4b898c72780e62afb50dee50af973a5ab07ee685/node-performance-rank.js). It’d probably be worth moving into its own plugin, if others want to use it too.

<div class="primarylink"><a href="https://www.11ty.dev/docs/sites/">The Built With Eleventy Performance Leaderboard</a></div>

The top 11 sites are given a bit more prominent design treatment and screenshots are shown. But the real surprise here to me were the aggregate performance results across all of the sites. At time of writing:

* `200` Sites Tested
* `98` Median Lighthouse Performance Score
* `93.7` Mean Lighthouse Performance Score
* `2,082` Median Speed Index
* `2,515` Mean Speed Index
* `1,577` Median First Contentful Paint
* `1,727` Mean First Contentful Paint

Wow. A **MEDIAN 98 LIGHTHOUSE PERFORMANCE SCORE**. Staggering. I knew y’all were good—but wow. 161 of the 200 sites tested 90 or higher on Lighthouse performance tests. Incredible.

After launch I’ve already received multiple reports of people updating their sites to be _even faster_ to try and break into the Top Eleven results. I’ve also received [a request to do Accessibility rankings too](https://twitter.com/starfalldocs/status/1239043864838766593), which I think is a lovely idea.

Eleventy doesn’t do any special optimizations out of the box to make your sites fast. It doesn’t protect you from making a slow site. But importantly it also doesn’t add anything extra either. This sort of developer empowerment over the final product has seemed to attract an amazing group of performance oriented developers using the project and I am so grateful to every one of you.

Keep it speedy, y’all. 🏆🏆🏆

---

**Update:** I’ve pulled the leaderboard code out from the 11ty website and created the [`performance-leaderboard` npm package](https://github.com/zachleat/performance-leaderboard). Try it out! Build your own performance leaderboard!
