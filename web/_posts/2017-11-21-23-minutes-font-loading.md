---
title: 23 Minutes of Work for Better Font Loading
author: Zach Leatherman
layout: post
permalink: 23-minutes/
categories:
  - font-loading
tags:
  - font-loading
  - popular-posts
  - popular-posts-total
postRank: 1
daysPosted: 42
yearsPosted: 0.1
postRankTotalViews: 18
---

Last night I hopped on Twitter after my daughter went to sleep with a little bit of time to kill before a 9 PM <a href="https://twitter.com/nejsconf">NEJS CONF</a> 2018 planning meeting. What greeted me was perhaps the most tailored, best targetted content I’ve seen on the platform since Donald’s Twitter account was deactivated for a blissful 11 minutes.

## 8:29 PM, 31 minutes to meeting

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">i need to figure out that font situation. i really should be making someone load all that nonsense</p>&mdash; jenn-bit art (@jennschiffer) <a href="https://twitter.com/jennschiffer/status/932798087462088704?ref_src=twsrc%5Etfw">November 21, 2017</a></blockquote>

[I can do that! I can do that! Move move move move, I can do that I can do that!](https://www.youtube.com/watch?v=-rPEguSf35c)

## 8:33 PM, 27 minutes to meeting

To confirm that code changes I made would be helpful, I asked:

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">do u accept pull requests</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/932799222847606785?ref_src=twsrc%5Etfw">November 21, 2017</a></blockquote>

She replied quickly with a confirmation.

## 8:37 PM, _23 minutes_ to meeting

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">hell yeah, fonts</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/932800010923671553?ref_src=twsrc%5Etfw">November 21, 2017</a></blockquote>

Work was underway. I have not worked on this project before. I didn’t know anything about the project’s structure or build process—but as luck would have it, they were all tools I’d used before. I forked the repo. I pulled the code down using git. I set up a virtual host for localhost previews. It was all happening. I did a project search for `@font-face` and found two: `8bit Art Sans` and `VT323`.

### Let’s make some changes

1. Delete all of the web font files that aren’t TTF files from the project—we’re gonna make our own.
1. Use [`glyphhanger`](https://github.com/filamentgroup/glyphhanger) to subset the fonts automatically to the code points used on the actual site (while also including ASCII). I ran:
  * `glyphhanger http://make8bitart.localhost/ --US_ASCII --subset=assets/fonts/*.ttf`
  * Note that `glyphhanger` outputs optimized subset WOFF2, WOFF (with zopfli encoding for more savings), and TTF files.
1. Update the `@font-face` CSS blocks to point to the new subset files and remove all of the other formats—we’re only using WOFF2, WOFF, and TTF here. Maybe `glyphhanger` needs a feature to help with this step too!
1. Add `font-display: swap` for full FOUT on supporting browsers (just Chrome right now but support will grow over time).
1. `preload` both web fonts to make requests start earlier and reduce FOIT and FOUT:
  * `<link rel="preload" href="FILE_PATH.woff2" as="font" type="font/woff2" crossorigin>`
1. Update the Service Worker to cache the WOFF2 versions only, since [Service Worker](https://caniuse.com/#feat=serviceworkers) is a browser support subset of [WOFF2](https://caniuse.com/#feat=woff2).
1. Check it all in and make a [pull request](https://github.com/jennschiffer/make8bitart/pull/62)

<figure>
	<img src="/web/img/posts/make8bitart/glyphhanger.png" alt="" class="primary">
	<figcaption><code>glyphhanger</code> command output, automatically subsetting both web fonts.</figcaption>
</figure>


## 9:01 PM, -1 minute to meeting

Whew. Well—okay, so I was a little late to the meeting but the [pull request](https://github.com/jennschiffer/make8bitart/pull/62) was opened at 9:00 PM on the dot so I’m counting it.

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/jennschiffer?ref_src=twsrc%5Etfw">@jennschiffer</a> here you go, a bunch of web font optimizations for make8bitart: <a href="https://t.co/G9VBC8TZ2Y">https://t.co/G9VBC8TZ2Y</a></p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/932806240685690880?ref_src=twsrc%5Etfw">November 21, 2017</a></blockquote>

## Performance

_(Fast 3G network throttled, Chrome)_

Let’s see how the page loads before and after we made changes.

### Before

* First paint: 773ms (screenshots do not include network time)
* Page weight: 296 KB (dang, Jenn—_nice work_)
* Font weight (TTF and WOFF): 7.1 KB + 84.8KB = 91.1 KB
* FOIT:
  * 773ms -> 1.91s for `8bit Art Sans`: 1.137s total
  * 773ms -> 3.72s for `VT323`: 2.947s total (just under that 3s FOIT timeout window)
* FOUT: none

### After

* First paint: 763ms (similar)
* Page weight: 215 KB
* Font weight (WOFF2): 4.2 KB + 6.5 KB = 10.8 KB **(11% of original, savings of 80.3KB)**
* FOIT: **none**, `font-display` would have kicked in if `preload` hadn’t beat it to the punch.
* FOUT:
  * **none** for `8bit Art Sans`, `preload` is killing it.
  * **none** for `VT323`, `preload` is killing it.

## Recap

Font loading can be daunting and even a little confusing at times. If you’re feeling overwhelmed by the topic, the above steps can serve as a shortlist of things you can quickly do to make an improvement to your site. It doesn’t have to be the best—just make it better!

Jenn really has a nice site here. It was simple, easy to work on, and to be fair—fast already. But for web fonts, there were a few changes that helped. We saved 80KB of web font content by subsetting. We’ve **eliminated FOUT and FOIT** on a Fast 3G connection using `preload`. If on a slower connection, we’re using `font-display` in browsers that support it to FOUT instead of FOIT. 

Not bad for _23 minutes_ worth of work.
