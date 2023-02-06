---
title: "A Historical Reference of React Criticism"
---
There have been a number of criticisms levied at the React project over the years, some of them handled and some of them still wavering in the wind. In this post, I’ll summarize the ones that are most prominent in my memory as a way of maintaining a record (primarily for my own use but maybe you’ll find it useful too). If you have others, [please send them my way](https://fediverse.zachleat.com/@zachleat)!

## {{ "12 Dec 2014" | timePosted }} ago

[Researching the Performance costs of JavaScript MVC Frameworks—John Bender](https://www.filamentgroup.com/lab/mv-initial-load-times/) _(December 12, 2014)_

To my knowledge this was the first data-backed criticism of the SPA/clientside rendering model. It showed an average React performance baseline of 1.26 seconds to first render on a mobile device over 3G (prior to adding any application code).

The React popularization of client-side rendering did not exist in a vacuum. It was happening _as_ developers struggled to make this model of client-side React work on an increasingly diverse and demanding world-wide mobile device landscape, especially as [Responsive Web Design won](https://www.zachleat.com/twitter/1262795599390420994) over m-dot architectures for most web work.

<div class="livedemo" data-demo-label="Side Note">

_I’m reminded of Mark Zuckerburg famously [admitting that Facebook bet _too much_ on HTML5 for mobile](https://www.youtube.com/watch?v=GBp_xCGIATk), although I haven’t seen a connection between that 2012 quote and React’s initial release in 2013_

</div>

In the post, John states:

> There are practical approaches we can already use today to reliably produce very fast rendering times, but they work best when HTML content is delivered from the server side rather than generating it solely on the client. That approach benefits many areas of user experience aside from performance alone…

The above quote seems incredibly prescient in hindsight and still (somehow) relevant to modern day React discourse as they finally _begin_ to pivot away from `create-react-app`.

But notably, **{{ "12 Dec 2014" | timePosted }}** after the blog post was written, that pivot is as of now only an [idea](https://github.com/reactjs/reactjs.org/pull/5487#issuecomment-1409720741). Currently the React documentation still recommends clientside rendering:

> [“If you’re learning React or creating a new single-page app, use Create React App.”](https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains)

It hasn’t improved with the new beta React Docs either:

> [“If you’re learning React, we recommend Create React App. It is the most popular way to try out React and build a new single-page, client-side application”](https://beta.reactjs.org/learn/start-a-new-react-project)

<div class="livedemo" data-demo-label="Side Note">

_It **is** interesting that they have anointed Next.js as the official chosen full-featured framework moving forward in the Beta documentation. I’m sure it has nothing to do with [Next.js 13 being](https://twitter.com/RyanCarniato/status/1584973099740499968) the [“real React 18 release”](https://twitter.com/acdlite/status/1549853625673023488)._

</div>

## {{ "16 Jun 2016" | timePosted }} ago

_(Update, this entry was added after publishing)_

[Thomas A. Powell notes that in June 2016](https://fosstodon.org/@thomasapowell/109819540720439366), React’s home page was changed to remove copy touting the performance benefits of Virtual DOM with a pivot to a focus on efficiency benefits instead.

Prior to this change it declared:

> “React abstracts away the DOM, giving a simpler programming model and better performance.”—`https://facebook.github.io./react/`

## {{ "10 Dec 2016" | timePosted }} ago

Alright, so you’re _not_ a beginner or you’re not building an app. You know better than to fall into the Create React App pit of performance problems and use a React framework that uses Server Side Rendering, right? Well, _not so fast_.

[🌟 When everything's important, nothing is! 🌟—Paul Lewis](https://aerotwist.com/blog/when-everything-is-important-nothing-is/) _(December 10, 2016)_

This post was a very early criticism of how Server Side Rendered frameworks using Virtual DOM still block the main thread in a pretty bad way:

> SSR typically gets you a faster First Meaningful Paint. That's great for perceived performance, but for libraries / frameworks that recreate the DOM virtually, TTI seems to be pushed back, sometimes a long way. I guess the diffing of real DOM to make VDOM is more expensive than starting fresh?

The Progressive Booting section (to me) reads as the precursor to [Islands architecture](https://jasonformat.com/islands-architecture/) _(August 11, 2020)_, with a special call in both this and the Islands architecture post to make more use of `requestIdleCallback` in frameworks, which as far as I could tell is [not included with React 18](https://github.com/facebook/react/issues/21662#issuecomment-859671432) (with or without Suspense).

## {{ "24 Oct 2017" | timePosted }} ago

Rob Dodson filed [RFC: Plan for custom element attributes/properties in React ~~17~~, ~~18~~, 19 #11347](https://github.com/facebook/react/issues/11347)

React 18.2.0 passes 0/14 of the advanced tests on the [Custom Elements Everywhere tests](https://custom-elements-everywhere.com/). An experimental build of React is available but it is not (and at this point may never ship?) in a stable release.

## {{ "21 Apr 2020" | timePosted }} ago

[The Cost of Javascript Frameworks—Tim Kadlec](https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/) _(April 21, 2020)_

A study of 4.3 million desktop and 5.4 million mobile URLs showed that React sites spent far more scripting related CPU time on the main thread than sites built with Angular, Vue.js, or jQuery.

> …while Angular sites shipped more JavaScript than React sites, they (Angular) actually spend less time on the CPU—much less time.

## {{ "13 Sep 2021" | timePosted }} ago

> “øJS is coming to Next 🔜”—[@rauchg](https://twitter.com/rauchg/status/1437494013137805312)

I remember this tweet pretty vividly, even now! What an exciting possibility—and “soon”!

The tweet was posted on September 13, 2021, a full year before [Next.js v13 shipped on October 25, 2022](https://nextjs.org/blog/next-13). Astute readers might note that Next.js v13 did not ship with øJS. The Next.js v13 bundle size was **44 kB larger** than v12—about **half of one React library larger**, in fact.

<div class="livedemo" data-demo-label="Side Note">

_As an aside, I’m curious how much of this had to do with miscommunicated expectations around React Server Components, given the criticisms [also levied by the Remix team](https://twitter.com/FredKSchott/status/1587095801917865984)._

</div>

We might also remember that these frameworks are recommended by the React team on the official documentation for _content sites_ and that [Next.js, Gatsby, and Remix have long used the _blog site_ as the quintessential starter project in their respective Getting Started documentation](/web/build-benchmark/).

Here are a few baseline bundle sizes:

* Next.js (v13) was [90 kB (compressed), 272 kB (uncompressed)](https://www.zachleat.com/twitter/1584995586918731776/) (as of 25 Oct 2022)
* Remix (v1.5.1) was [67.7 kB (compressed)](https://www.zachleat.com/twitter/1534588439580090368/) (as of 8 Jun 2022)
* Next.js (v12) was [72.2 kB (compressed), 228 kB (uncompressed)](https://www.zachleat.com/twitter/1468419834501337088) (as of 7 Dec 2021)


## {{ "14 Oct 2021" | timePosted }} ago

[Ryan Carniato: JavaScript Framework TodoMVC Size Comparison](https://dev.to/this-is-learning/javascript-framework-todomvc-size-comparison-504f) _(October 14, 2021)_

A great analysis of how different frameworks grow in relation to application size.

| |Preact|React|Solid|Svelte|Vue|
|---|---|---|---|---|---|
|Vendor Size|4.39 kb|36.22 kb|3.86 kb|1.85 kb|16.89 kb|
|Component Size|1.21 kb|1.23 kb|1.26 kb|1.88 kb|1.10 kb|

_(sizes shown are Brotli compressed)_

> Alex's goal was 5 seconds TTI on a slower device and network. For some industries like eCommerce that target should be more like 3 seconds. 70kb - 25kb = ~45kb budget here. How can a larger library like React even compete?

I do want to also call out a similar but far more comprehensive (and maintained) analysis of [framework bundle sizes was done at `webcomponents.dev`](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/#bundle-size) (first published in [February 2020](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component-mar2020/)).

## {{ "4 Feb 2023" | timePosted }} ago

[Alex Russell: _The Market for Lemons_](https://infrequently.org/2023/02/the-market-for-lemons/) _(February 4, 2023)_

This post includes a breathtaking array of receipts, especially in the [Sandy Foundations section](https://infrequently.org/2023/02/the-market-for-lemons/#sandy-foundations). I won’t attempt to summarize them here, but it’s definitely worth a read.

## Today

An analysis of Core Web Vitals across 9.3 million web sites as of February 6, 2023 shows that Core Web Vitals for both [React and Next.js shows that both perform **worse**](https://lookerstudio.google.com/s/lD9m_MQgyGU) **than the aggregation of all other sites** in the archive for _both_ mobile and desktop.

Currently only _26% of sites using Next.js have good Core Web Vitals_. This is lower than React at-large (32.81%) and the entirety of all sites in the data set (39.37%).

## Addendum:

* [The self-fulfilling prophecy of React—Josh Collinsworth](https://joshcollinsworth.com/blog/self-fulfilling-prophecy-of-react) _(July 27, 2022)_
* [`krausest/js-framework-benchmark`](https://github.com/krausest/js-framework-benchmark) (with commits dating back to 2016) with [results](https://krausest.github.io/js-framework-benchmark/)
* In this post I didn’t mention the [rise and fall of CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b) (a phenomenon of its own in the React ecosystem), attempting to introduce a JavaScript runtime and dependency for CSS.