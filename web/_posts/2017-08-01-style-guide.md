---
title: I made a style guide for my personal web site and you should too.
author: Zach Leatherman
layout: post
permalink: /now-with-style-guide/
categories: null
tags:
  - popular-posts
postRank: 9
daysPosted: 154
yearsPosted: 0.4
---

As my own little corner of the web uncermoniously turned _ten years old_ this year, it’s really starting to feel more like a garden than a piece of software. I certainly enjoy tending to it. I can plant what I like and with proper care it can grow into something useful.

After ten years, it’s time to stop tearing open seed packets and carelessly throwing seeds around. It’s time to get out a trowel (or whatever people use for gardening) and organize the components I’ve built for this garden into a [style guide](/web/style-guide/). It isn’t an elaborate design system like the fancy ones on [styleguides.io](http://styleguides.io/), but it’s mine and I am getting a lot of use out of it all the same.

<p class="primarylink"><a href="/web/style-guide/">Check out the zachleat.com Style Guide</a></p>

Not only has it helped collate all of the components I’ve built for individual blog posts in the past, it’s a great way to test larger CSS changes I make to my site. In a way, it provides a worry-reducing comfort much in the same way that unit testing does, albeit less automated.

There are a few cool things in there:
* Shows the different stages in web font loading and how they each render.
* Tests for hyphenation and ligatures on web fonts.
* `text-decoration-skip-ink: auto` on links (to avoid overlap between descenders and link underlines) with feature tested fallback to a gradient approach.
* Fluid (and breakout full width) images, videos (including third party players) using only CSS.
* Inline resizable demos.

Having a style guide, in my mind, has little to do with the size, scope, or scale of your web site. Style guides are about code consistency and—more importantly—code longevity.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Say you took a client and they said &quot;design me a website that will look great with no changes in 10 years&quot;. You would ______</p>&mdash; Chris Coyier (@chriscoyier) <a href="https://twitter.com/chriscoyier/status/890650132143906820">July 27, 2017</a></blockquote>

Software will always require changes, but speaking from someone who has maintained a web site for ten years running I’m happy to have a style guide to assist with any future changes I make. If your web site is in it for the long haul (and why wouldn’t that be your goal?), I highly encourage you to make a style guide of your own!

---

<p class="caption">(Read—but don’t judge—my <a href="/web/checklist-for-web-applications/">first post from February 2007</a>.)</p>

<div class="retweettoshare">
	<h3 class="retweettoshare_title">Retweet to share this post</h3>
	<div class="retweettoshare_widget">
		<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">★ I made a style guide for my personal web site and you should too. <a href="https://t.co/RJqcBPFYUx">https://t.co/RJqcBPFYUx</a><br><br>Style guide: <a href="https://t.co/kh7gR5CA8X">https://t.co/kh7gR5CA8X</a></p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/892719561191153664">August 2, 2017</a></blockquote>
	</div>
</div>
