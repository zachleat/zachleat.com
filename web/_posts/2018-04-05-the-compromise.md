---
title: “The Compromise”—a Modern but Compatible Font Loading Strategy
permalink: /the-compromise/
tags:
  - font-loading
  - popular-posts
postRank: 4
---

<style>
ol ol {
  list-style: lower-alpha;
}
</style>

Let’s be frank: the next evolution in advanced web font loading is overdue. I’m not talking about `font-display`, which is great—a quick and easy win for introductory font loading. I’m talking about evolving our multi-stage font loading approaches to squeeze every last drop of performance out of our web font rendering.

The next evolution will come when we **retire our font loading polyfills**.

## Retirement Benefits

Polyfill retirement is the next step and is especially important as these JavaScripts are usually inlined in the _critical path_. The time spent parsing and executing polyfill JavaScript is essentially wasted on browsers that support the native CSS Font Loading API. For example, take the following two examples from my [`web-font-loading-recipes` repository](https://github.com/zachleat/web-font-loading-recipes):

* [`fout-with-class-polyfill.html`](https://github.com/zachleat/web-font-loading-recipes/blob/master/fout-with-class-polyfill.html) using a polyfill: `8.46 KB` (uncompressed)
* [`fout-with-class.html`](https://github.com/zachleat/web-font-loading-recipes/blob/master/fout-with-class.html) using only the CSS Font Loading API: `2.17 KB` (uncompressed)

## No… Please—Don’t go?

Can we just remove the polyfills wholesale and switch our code to use the CSS Font Loading API? Well, not quite yet. The browser-provided [CSS Font Loading API has pretty broad support](https://caniuse.com/#feat=font-loading) and has been around for a _long time_ but is confoundedly still missing from all available versions of Microsoft Edge.

| Web Browser | CSS Font Loading<br>Support Added |
| - | - |
| Chrome v35 | May 19, 2014 |
| Opera v22 | June 2, 2014 |
| Firefox v41 | September 21, 2015 |
| Samsung Internet v4 | April 18, 2016 |
| UC Browser v11.8 | August 16, 2016 |
| Mobile Safari v10 | September 12, 2016 |
| Safari v10 | September 19, 2016 |
| Internet Explorer | 🚫 _Not supported_ |
| Microsoft Edge | 🚫 _Not supported_ |

[Microsoft Platform status](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/cssfontloadingapi/?q=css%20font%20loading) has given no signals of intent to implement. At time of writing, the [CSS Font Loading API UserVoice entry](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6509785-css-font-loading) (a voting platform for developers to help Microsoft prioritize features) has 796 votes, which is [#49 on the list](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/filters/top?page=3) (ordered by total votes). That’s 350 votes behind the Web MIDI API and 553 votes behind Scrollbar Styling 🙄.

**_Ahem_**, I digress.

## Fonts for Auction

How do we go polyfill-less in modern browsers without completely sacrificing our web fonts on IE and Edge? This blog post would be pretty silly if it ended without answering that question…

In September of 2017, eBay engineers Senthil Padmanabhan ([@senthil_hi](https://twitter.com/senthil_hi)) and Raja Ramu ([@rajaramu](https://twitter.com/rajaramu)) wrote a blog post titled [eBay’s Font Loading Strategy](https://www.ebayinc.com/stories/blogs/tech/ebays-font-loading-strategy/). It may have been one of the most underrated font loading blog posts of 2017.

The eBay strategy was novel for two reasons, the first being that it emulated `font-display: optional` using JavaScript. JavaScript was important because at that time [only Chrome supported the `font-display` descriptor](https://caniuse.com/#feat=css-font-rendering-controls). Practically speaking, `font-display: optional` means that an empty-cache view kicks off requests for web fonts but doesn’t render them. Web fonts are only rendered when they are already in available in cache. This minimizes both FOIT and FOUT, as well as nasty text reflows.

The second novelty was that it _took steps to partially eliminate polyfill usage_! Namely it did not inline a font loading polyfill! Instead it used the CSS Font Loading API if it was available and if not, asynchronously loaded the font loading polyfill to load the web fonts (again, only on IE and Edge).

<p class="primarylink primarylink-demo"><a href="https://www.zachleat.com/web-fonts/demos/ebay-method.html">The eBay Method</a></p>

I’ve also added the [eBay Method to `web-font-loading-recipes`](https://github.com/zachleat/web-font-loading-recipes#the-ebay-method) if you want to check out the code.

## The Compromise

Senthil and Raja’s eBay method is great! However, I would make one small change to their approach (and this is also why I don’t prefer `font-display: optional`)—I like rendering web fonts on an empty cache load! Thus, the Compromise is born, borrowing _heavily_ from eBay’s approach.

If you’ve been following along at [The Comprehensive Guide to Font Loading Strategies](/web/comprehensive-webfonts/), you may be aware that my personal favorite method is currently transitioning to [Critical FOFT with preload](/web/comprehensive-webfonts/#critical-foft-preload), given that [preload](https://caniuse.com/#feat=link-rel-preload) support is on the cusp of widespread support.

_Curious what FOFT is? Check the [Web Font Loading Glossary](/web/webfont-glossary/)._

Let’s Frankenstein the eBay method and the Critical FOFT method together:

<p class="primarylink primarylink-demo"><a href="https://www.zachleat.com/web-fonts/demos/critical-foft-preload-fallback-optional.html">“The Compromise”</a></p>

You can review the [HTML](https://github.com/zachleat/web-font-loading-recipes/blob/master/critical-foft-preload-fallback-optional.html) and [Lazy loaded JavaScript](https://github.com/zachleat/web-font-loading-recipes/blob/master/critical-foft-preload-fallback-optional.js) (only used if the CSS Font Loading API is not supported). The Compromise is also on [`web-font-loading-recipes`](https://github.com/zachleat/web-font-loading-recipes#the-compromise-critical-foft-with-preload-with-a-polyfill-fallback-emulating-font-display-optional).

In this example, we used a traditional 4+1 Lato setup: Roman (plus a super subset `A-Za-z` Roman), Italic, Bold, Italic Bold.

1. Preload the super subset Roman (WOFF2)
2. If `sessionStorage` key exists for repeat views, add the `fonts-loaded-2` class and stop here!
3. If CSS Font Loading API is supported, load the fonts:
    1. Use CSS Font Loading API to load Stage 1: super subset Roman
    2. Render super subset Roman (add `fonts-loaded-1` class)
    3. Use CSS Font Loading API to load Stage 2: Roman, Italic, Bold, and Italic Bold.
    4. Render Roman, Italic, Bold, and Italic Bold versions (add `fonts-loaded-2` class)
    5. Skip to step 5.
4. If CSS Font Loading API is _not_ supported, load the fonts:
    1. Asynchronously lazy load the polyfill (in this example [`critical-foft-preload-fallback-optional.js`](https://github.com/zachleat/web-font-loading-recipes/blob/master/critical-foft-preload-fallback-optional.js))
    2. Use the polyfill to load only Stage 2: Roman, Italic, Bold, and Italic Bold.
    3. Do not render these fonts (no classes added)
    4. Skip to step 5.
5. All the fonts have confirmed to be loaded, add the `sessionStorage` key for repeat views.

## In the wild

It’s frustrating that Microsoft browsers don’t support the CSS Font Loading API. But this is where The Compromise shines—it allows us to serve and render web fonts using the CSS Font Loading API (no polyfills) on an empty-cache page loads. If a browser doesn’t support the CSS Font Loading API (uh, IE and Edge) we take a more relaxed `font-display: optional`-ish repeat-view approach.

_The Compromise_ has been battle tested. It has been in production on this web site for quite some time (zachleat.com) and is the strategy we used for the font loading on the lovely redesign of [Smashing Magazine](https://www.smashingmagazine.com/) (although with FOFT instead of Critical FOFT).

Keep those web fonts frosty, y’all 👍.

## Addendum

_If some of the terms in the above article were new to you, you may want to look them up on the [Web Font Loading Glossary](/web/webfont-glossary/)._
