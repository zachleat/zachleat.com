---
title: 'No @font-face Syntax will ever be Bulletproof, Nor Should It Be.'
author: Zach Leatherman
layout: post
permalink: /retire-bulletproof-syntax/
categories:
  - font-loading
tags:
  - font-loading
  - highlight
---

[***No @font-face Syntax will ever be Bulletproof, Nor Should It Be* was originally posted on the perfplanet.com Performance Calendar.**](http://calendar.perfplanet.com/2016/no-font-face-bulletproof-syntax/)

When you’ve been in the web development game long enough, you see patterns repeat themselves. It wasn’t all that long ago that developers attempted the Sisyphean task of making all  experiences identical for every user independent of their web browser or device’s technical capability. We’ve since learned to shed those shackles in pursuit of something far better: reach.

But even after this shift occurred, we carried the baggage of our old ways forward with web fonts. We described our @font-face syntax with one of the heaviest-duty adjectives available: Bulletproof. This word almost became synonymous with @font-face syntax. You see it everywhere:

* [Bulletproof @font-face Syntax (2009)](https://www.paulirish.com/2009/bulletproof-font-face-implementation-syntax/)
* [The New Bulletproof @font-face Syntax (2011)](http://blog.fontspring.com/2011/02/the-new-bulletproof-font-face-syntax/)
* [Further Hardening of the Bulletproof @font-face Syntax (2011)](http://blog.fontspring.com/2011/02/further-hardening-of-the-bulletproof-syntax/), with “Extra Bulletproofiness” 😀
* [How to Bulletproof @font-face Web Fonts (2011)](http://sixrevisions.com/css/font-face-web-fonts-issues/)
* [Bulletproof Icon Fonts (2014)](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html) (eek, I wrote this one, see addendum below)

The web font world has changed. It’s time to move the chains forward. Given that web fonts for readable content fall back to system fonts when formats are not supported, it’s ok to be progressive here. Here’s the modern @font-face syntax I’d recommend:

```
@font-face {
  font-family: Open Sans;
  src: url(opensans.woff2) format('woff2'),
       url(opensans.woff) format('woff');
}
```

Pretty simple, right? Just two formats. Much simpler than what we were using before:

```
@font-face {
  font-family: Open Sans;
  src: url('opensans.eot');
  src: url('opensans.eot?#iefix') format('embedded-opentype'),
       url('opensans.woff') format('woff'),
       url('opensans.ttf')  format('truetype'),
       url('opensans.svg#svgFontName') format('svg');
}
```

We’ve eliminated the [Embedded OpenType (EOT) format](http://caniuse.com/#feat=eot) (supported only by Internet Explorer and is the format served to IE versions up to 11) which required a strange double `src` declaration to workaround a syntax bug. [Bram Stein](https://twitter.com/bram_stein), renowned web font performance expert, notes that while EOT formats _can_ be compressed they are often served uncompressed, which is less than optimal given that newer WOFF files include compression by default.

We’ve eliminated the standalone [TrueType/OpenType format](http://caniuse.com/#feat=ttf) because most web browsers support both WOFF and \[True\|Open\]Type. It’s also worth noting that WOFF is just a container format—it adds a wrapper around existing TrueType/OpenType files.

Most importantly, we’ve eliminated the [SVG font format](http://caniuse.com/#feat=svg-fonts). This archaic format is no longer necessary and using it over better formats like WOFF can be harmful. In fact, Chrome took the unusual step of removing SVG font format support from their web browser (with the exception of older Windows versions). How often do things get removed from the web platform? Rarely! You can read more about the history of issues with SVG fonts at [@scottjehl’s Device Bugs repository](https://github.com/scottjehl/Device-Bugs/issues/43).

So, that leaves us with only two font formats: WOFF2 and WOFF. The ordering here is very important: WOFF2 and then WOFF.

To summarize, here is a list of browsers we’ve relegated to use system fonts with this reduced format syntax:

* IE 8
* Firefox 3.5
* Chrome 4
* Safari 3 through 5
* Opera 10.1
* Mobile Safari (iOS) 3.2 through 4.3
* Android 2.2 through 4.3

Android is perhaps the most contentious on this list: as of writing these operating system versions [make up about 16.4% of Android usage](https://developer.android.com/about/dashboards/index.html). This does not count users of these operating systems that have installed Chrome on their devices manually—we’re specifically talking about users of the Android Browser here.

But don’t cry for these users—content will still be readable.

Simplified syntax is better for code health, cognitive load, and general software maintenance. Decreasing the number of formats also decreases the possibility that developers will list their font formats in the `src` attribute out of order. Remember that browsers use the first format they find that works—so if you don’t order them correctly the browser could waste resources (or render poorly) with a less-than optimal format.

Decreasing the number of font formats also simplifies the self-hosting your web fonts. Self hosting can allow more advanced and fine-grained control over how your web fonts are loaded to achieve maximum rendering performance[1]. I’ve written a slew of [web font loading articles that showcase advanced font loading techniques](https://www.zachleat.com/web/comprehensive-webfonts/), and the more advanced two-stage loading methods are easier to implement when self hosting.

*[1] Act now and buy two bottles of web font loading drink powder mix to achieve maximum rendering performance and the third bottle is free.*

## Addendum: Okay, but what about icon fonts?

I did contribute to the Bulletproof @font-face phenomenon. However, a closer read of [the icon font article I wrote](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html) reveals no discussion of @font-face syntax. Said differently: a bulletproof @font-face syntax won’t save your icon fonts. Just because the font format *can* be read and interpreted by an older web browser doesn’t mean that it won’t have loading issues, FOUT fallback inconsistencies, or that glyphs will be misread by screen readers. **Unlike content fonts, icon fonts do not use progressive enhancement by default.** They need additional care: to be paired with a font loading strategy and with default screen-reader-accessible fallback text. I’d recommend that you [read the article](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html) to learn more about the myriad of issues with icon fonts.

Or, you could look toward the future and use SVG icons instead.

## Addendum: Thank You

A big thank you to [Bram Stein](https://twitter.com/bram_stein) for reviewing and providing feedback on this post before publication.
