---
title: Netlify’s Disingenuous Survey-based Attack on Next.js (and Eleventy, too)
tags:
  - eleventy
  - jamstack
seo:
  openGraphBackgroundImage: /og/sources/thumb-tacks.jpg
  openGraphAlt: A hand sticks a red thumb tack into a paper on a cork board.
posterImage:
  #showOnPage: true
  #height: auto
  name: Volodymyr Hryshchenko
  source: https://unsplash.com/photos/shallow-focus-photo-of-white-paper-sheet-mounted-on-cork-board-ZT9gjcJog6U
---
As [Netlify distances itself from Jamstack](/web/jamstack-future/) in an attempt to survive a VC-funded battle with Vercel, they have also rebranded the _Jamstack Community Survey_ to a more generic [_The State of Web Development_ report](https://www.netlify.com/resources/ebooks/the-state-of-web-development-2023/) (behind an email signup form). It _should_ be called the Netlify Community Survey (as the results only represent Netlify customers) but I digress.

A few disclaimers before we get started:
1. I am the creator and maintainer of [Eleventy](https://www.11ty.dev/).
1. From 2020–2023 I was [employed](https://www.zachleat.com/resume/#professional) by Netlify.
1. In 2021 I worked on the Jamstack Community Survey results website (but was not involved in the survey data collection nor the results content).

## Problems

This year’s report has a few changes to the presentation of results that I think have traversed the report into territory that I called [“intellectually dishonest”](https://fediverse.zachleat.com/@zachleat/111598996307378754)  on Mastodon. My default in these situations is to let these things go but enough people have tagged me on this—while also drawing some damaging conclusions from the disingenuity in this report—that I feel the need to weigh in (though frankly I’m a little annoyed that I need to spend time on it at all).

My primary beef with this year’s report is on page 10 (of 13) and features a section on rendering frameworks and site generators, with one and only one chart documenting changes in satisfaction score versus change in usage.

{% imageInline "./web/img/posts/netlify-nextjs/frameworks.jpg" "This chart shows Astro’s stellar growth this year, the runaway winner for increased satisfaction and usage. Next and 11ty are shown in the bottom left corner, losing usage and satisfaction" %}

This chart looks bad for Next. It also looks bad for Eleventy. But the bigger problem here is that this chart shows _changes_ without any context of absolute scores. Next might have gotten some caveats in the text written in the section but 11ty did not.

In previous years, the report [discussed absolute scores prior to deltas](https://jamstack.org/survey/2022/#web-frameworks) because *this context is important*.

_(I also took special note that the label for Gatsby—a framework purchased by Netlify and under very recent [criticism](https://twitter.com/FredKSchott/status/1693007599803752638) for languishing investment—was obscured behind Gridsome)_

On page 32 (of 39) of the report buried _deep_ into the Appendices section the report finally includes the real scores (conveniently unordered):

{% imageInline "./web/img/posts/netlify-nextjs/sentiment.jpg" "Astro has the best positive sentiment too at 87%, Next is 78% and Eleventy is 74%" %}

Now we learn that Next.js is ranked #3 (tied with SolidStart and Remix) for satisfaction and 11ty is ranked #6 (tied with Nuxt).

Here’s what the chart looks like using absolute values for satisfaction percentages and usage, painting a story that Netlify probably doesn’t want to share:

{% imageInline "./web/img/posts/netlify-nextjs/better.jpg" "Next.js is the clear winner here. A cluster of Nuxt, Astro, 11ty, and Sveltekit all sit together with high scores and similar usage. Gatsby is an outlier with large usage but low satisfaction." %}

## Without ascribing malice

I am aware that Netlify has historically employed a Data Scientist with statistics and data analysis background to conduct this survey and prepare the report. This person departed the company months ago. The Data Scientist in question was very good at documenting and publishing the survey and report’s methodology and you can see [one such (2022) document](https://jamstack.org/survey/2022/community-survey-2022-methodology.pdf).

The 2023 report did not include a methodology document.

The 2022 methodology document reported _how_ the data was collected (sources) and margins of error and included the following notable section at the end:

> Conclusions we cannot draw:
>
> We do not believe these results are indicative of preferences amongst web developers as a whole. We are also not making claims as to:
>
> * Popularity (or not) of Netlify products and services, given bias in respondents

The 2023 report name change to _The State of Web Development_ seemingly goes against the first point.

The 2023 report also goes against the second point by eschewing any mention of bias. It (surprisingly) includes a section on the popularity of Netlify itself:

{% imageInline "./web/img/posts/netlify-nextjs/netlify.jpg" "88% of Netlify customers want to use Netlify more. 79% of Netlify customers want to use Vercel more." %}

I was taken-aback that Netlify would _publish_ statistics to show what percentage of Netlify customers want to use Vercel more—but apparently it’s 79%.

## Conclusions

Importantly: After Eleventy’s [Netlify-induced setbacks](/web/eleventy-side-project/) this year, we are [back on our feet](https://www.11ty.dev/blog/canary-eleventy-v3/) and we will continue to punch far above our `node_modules` weight-class. Many of the alternative frameworks discussed here are VC-funded with full-time developers and have _millions_ in funding. We don’t.

Eleventy’s project goals are different: stay focused, keep our core feature set small, and ruthlessly minimize our external dependencies for a long-term future.

On Astro (since folks have asked), I will say that Astro and Eleventy share the same zero JavaScript footprint vision for the web and in that regard we are allies in the web development framework melee.

Reading the report, it’s clear that Netlify has a vested interest in elevating Astro because Astro is best poised to dethrone Next.js. If Astro wins, Netlify wins. Perhaps surprisingly I *also* believe that if Astro wins, Eleventy wins! It is _not_ a zero-sum game and I know that 2022 Netlify [believed this](/web/jamstackconf-oss-panel/) (even if 2023 Netlify does not).

Appreciate y’all—and keep building for the web!