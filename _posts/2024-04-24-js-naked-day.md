---
title: Celebrate JavaScript Naked Day every year on April 24
external_url: https://js-naked-day.org/
external_url_screenshotmode: opengraph
tags:
  - external
---
Today my personal web site is being served _sans-JavaScript_ in honor of JavaScript Naked Day.

I implemented this on my web site using a [global `JS_ENABLED` in my Eleventy configuration file](https://github.com/zachleat/zachleat.com/commit/455147b1f2c84b4039c1cdca721b3585962b3e22) (propagated to templates via Eleventy’s global data). This removed the `<script>` elements in the output of the site’s build.

## Origin Story

It started [with a toot](https://fediverse.zachleat.com/@zachleat/112242172947339214) celebrating CSS Naked Day:

> It’s #CSSNakedDay! I love this trend—it highlights the importance of a foundation of good HTML. We need a similar one for JavaScript! #JSNakedDay should be April 10 😅

_Related: I first wrote about [CSS Naked Day](/web/css-naked-day/) in April 2020._

And then [Simon MacDonald ran with it](https://simonmacdonald.com/blog/posts/2024-04-12-introducing-js-naked-day), settling on April 24:

> In some countries, “April 24” can be written as “4/24” — which is also the HTTP error code for a failed dependency. JS Naked Day promotes the fact that websites should work without a dependency on JavaScript.

Simon even built a web site: [`js-naked-day.org`](https://js-naked-day.org/)
