---
title: Trying out a new Font Stack
author: Zach Leatherman
layout: post
permalink: /a-new-font-stack/
categories: null
tags: null
distVersion: 0.3.8
---

*Update: This was an April Fools’ Joke. While it was originally implemented site-wide, moving forward I’ve kept the code for this approach quarantined to this page. Don’t use this font loading strategy. Feel free to use Comic Neue though, it seems solid.*

I’ve decided to move away from my old, trusty, font stack foundation of Lato and try out a new font loading strategy with a new font stack. A few details:

1. I’ve purposefully disabled the `sessionStorage` trick that optimized font loading for repeat views. This should ensure that every visitor receives a Flash of Unstyled Text, or FOUT.
1. I’ve purposefully set a minimum FOUT delay of 3 seconds, to ensure that the FOUT is highly visible. Even if the font request finishes before 3 seconds have passed, the script will wait until the 3 second delay has completed to render the web font. This is a new strategy I’m calling _3G for Everyone_.
1. The new system font stack is now: `Comic Sans MS, Chalkboard SE, sans-serif` (see full support on [fontfamily.io](http://fontfamily.io/Comic_Sans_MS,Chalkboard_SE,sans-serif)). Chalkboard SE was included to add support for iOS.
1. The new webfont typeface is [Comic Neue](http://comicneue.com/), a lovely open licensed (SIL) alternative to Comic Sans developed by [Craig Rozynski](https://twitter.com/craigrozynski).
1. I’m not using the latest and greatest font loading technique (which, in my opinion, is a combination of [Critical Web Fonts](/web/critical-webfonts/) and [Data URIs](/web/web-font-data-uris/)). Instead I am using the [FOFT technique](/web/foft/). They’re all pretty similar to set up but the benefit to using the newest technique is that it all but eliminates FOUT (which is amazing). Given the first two points above, that is not the sort of beautiful user experience we want here.

As you can clearly see, this technique pairs the great typography of system fonts with the beauty and control of web fonts. Hope you enjoyed it!
