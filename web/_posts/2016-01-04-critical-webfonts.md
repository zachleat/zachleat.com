---
title: Critical Web Fonts
author: Zach Leatherman
layout: post
permalink: /critical-webfonts/
categories:
  - font-loading
tags:
  - research
  - highlight
  - font-loading
  - popular-posts
  - popular-posts-total
postRank: 8
daysPosted: 729
yearsPosted: 2
postRankTotalViews: 9
---

The history of web font loading has included many different iterations:

1. *Doing nothing*: including a `@font-face` CSS block and using it in your CSS without qualification. I consider this to be an anti-pattern. It introduces a Flash of Invisible Text (FOIT) in some browsers and worse, creates a single point of failure in browsers that do not have a font loading timeout (WebKit).
1. *Data URIs* for the Flash of Unstyled Text (FOUT): Loading a [CSS stylesheet asynchronously](https://www.filamentgroup.com/lab/font-loading.html) (or using an AJAX Request) with the web fonts embedded as Data URIs (and putting it into localStorage for repeat views). This approach is deprecated because it can introduce a short Flash of Invisible Text (FOIT) on some older lower powered devices.
1. *A Scoped Class* for the Flash of Unstyled Text (FOUT): Using the CSS Font Loading API (or a polyfill to do the same, like [FontFaceOnload](https://github.com/zachleat/fontfaceonload/) or [fontfaceobserver](https://github.com/bramstein/fontfaceobserver)) to [add a scoping class protecting our content from our web fonts before they load](https://dev.opera.com/articles/better-font-face/) (also documented on the [Filament Group Lab](https://www.filamentgroup.com/lab/font-events.html)). This is what I’d consider to be a bare minimum best practice, or Intro to Font Loading 101.
1. *Two Scoped Classes* for the Flash of Faux Text (FOFT): This method complicates things a little bit more and uses two different stages of scoped classes. The first stage loads only the Roman font, then any variations of that are loaded in the second stage: Bold, Italic, Bold Italic. It’s great for slower connections in that it puts the biggest amount of reflow later in your page load waterfall to make it less noticeable and less impactful to end users. I’d classify this approach as Intermediate Font Loading 201.

## The Next Iteration: Critical FOFT

This method builds on the Flash of Faux Text (FOFT) using a two stages loading process (sounds like, but is not actually rocket science), but instead of a full Roman web font in the first stage, it loads a small subset of the Roman web font, in this case with only the upper case and lower case alphabetic characters. You could optionally include numbers here as well.

I have implemented this technique live on my web site. Here I use four webfonts: Lato Roman, Lato Bold, Lato Italic, and Lato Bold Italic.

* The original Lato Roman is 25KB in WOFF2 format.
* Lato Roman with only the `A-Za-z` glyphs is only 9KB in WOFF2 format (**36% of the original**)

The shrinks the first stage quite significantly.

## Filmstrip Comparisons

The yellow frame highlights when the roman web font (used for most body content) has loaded and rendered. Note that all of these film strips were captured on [zachleat.com](http://www.zachleat.com/web/) using Chrome’s “Regular 3G” network throttling feature.

### Default

<img src="/web/img/posts/critical-fonts/default-3.png" alt="Default Font Loading Filmstrip showing FOIT" class="primary">

### Scoped class for FOUT

<img src="/web/img/posts/critical-fonts/fout-1.png" alt="Font Loading Filmstrip showing FOUT" class="primary">

### Two scoped classes for FOFT

<img src="/web/img/posts/critical-fonts/foft-1.png" alt="Font Loading Filmstrip showing FOFT" class="primary">

### Two scoped classes for Critical FOFT

<img src="/web/img/posts/critical-fonts/critical-foft-2.png" alt="Font Loading Filmstrip showing Critical + FOFT" class="primary">

## Performance Comparison

<img src="/web/img/posts/critical-fonts/benchmarks.svg" onerror="this.src='/web/img/posts/critical-fonts/benchmarks.png'; this.onerror=null;" alt="A visual comparison showing the waterfalls for Default, FOUT, FOFT, and Critical FOFT">

We’re essentially lengthening the load complete time at the end of the waterfall to reduce the jarring reflow shown to the user. Once `font-size-adjust` is implemented in more than just Firefox, the need for this technique will be reduced, if not rendering it unnecessary. But until then, I consider this approach essential to reducing interruption to the user’s reading flow.

Enable 3G throttling in your favorite web browser (some of you may not have to enable anything to have a slow connection) and watch the page render. The web fonts do feel faster, even if the total time spent loading web fonts is greater.

## The Code

The [code used to implement this approach can be viewed on GitHub](https://github.com/zachleat/zachleat.com/blob/5369a74e3edf32e861d5b0bfdbf0177dbc3e596f/web/js/fonts.js). It’s using FontFaceOnload for the font loading polyfill.

If you’re interested, I’ve also implemented the [same approach using promises and Bram Stein’s FontFaceObserver](https://github.com/zachleat/zachleat.com/blob/5369a74e3edf32e861d5b0bfdbf0177dbc3e596f/web/js/fonts-fontfaceobserver.js).

For repeat views, you can continue using the same mechanism you were using before. I use [Bram Stein’s `sessionStorage` trick](https://speakerdeck.com/bramstein/web-fonts-performance?slide=115) so that I don’t have to do anything server-side. You can see the implementation in code on GitHub in [initial.js](https://github.com/zachleat/zachleat.com/blob/0bf3acde8ad9c7ad99bcd32e2332465004c765ce/web/js/initial.js#L27) and [fonts.js](https://github.com/zachleat/zachleat.com/blob/5369a74e3edf32e861d5b0bfdbf0177dbc3e596f/web/js/fonts.js#L6) (also lines [15](https://github.com/zachleat/zachleat.com/blob/5369a74e3edf32e861d5b0bfdbf0177dbc3e596f/web/js/fonts.js#L15) and [37](https://github.com/zachleat/zachleat.com/blob/5369a74e3edf32e861d5b0bfdbf0177dbc3e596f/web/js/fonts.js#L37)).

## Ideas for Improvement

Some font loading services already provide mechanisms to subset and modify your web fonts dynamically. [Dynamic Subsetting](http://www.ascendercorp.us/services/screen-imaging-solutions/dynamicsubsetting) generates a subset of a font on the fly using only the glyphs used on a page. [Dynamic Augmentation](http://blog.typekit.com/2015/06/15/announcing-east-asian-web-font-support/) add glyphs to an already loaded font on the fly, sort of like font streaming.

You could use extend this approach using something similar to the Critical CSS workflow and scan the page to find out what actual characters are used in a fixed viewport (`grunt-criticalcss` uses `1200x900`) to subset the web font more accurately to perhaps an even smaller size. This will require more care, given that it would need to run ahead of time for every unique URL on static content. Or, it could run dynamically using JavaScript on page load which would probably require a hefty library and a performance hit.

In fact, you could wire up something similar to this using the amazing [Plumin.js](http://www.pluminjs.com/) but unfortunately the library is too large (~`400KB` minimized) for this use case. For now, I’ll just stick with a simple `9KB` baseline WOFF2 that gets replaced with a `25KB` full version. The library would need to at least be smaller than your baseline to get good mileage out of a dynamic font (but I would never dream of equating a web font KB with a JavaScript KB—they have different performance impacts).

[Live Font Interpolation on the Web](http://alistapart.com/article/live-font-interpolation-on-the-web), an article written for A List Apart by [Andrew Johnson](https://twitter.com/aetherpoint) is also worth mentioning. Keep an eye on this approach—it would allow us to dynamically generate weights and styles from font masters, hopefully saving bytes on the wire for designs using a wide variety of weights and styles. I’d love to see this web-standardized.

<div class="retweettoshare">
	<h3 class="retweettoshare_title">Retweet to share this post</h3>
	<div class="retweettoshare_widget">
		<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">★ Critical Web Fonts, a two stage font loading approach to further minimize reflow impact from web fonts: <a href="https://t.co/vWNVagaGmr">https://t.co/vWNVagaGmr</a></p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/684747486397779969">January 6, 2016</a></blockquote>
	</div>
</div>
