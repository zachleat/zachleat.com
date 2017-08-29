---
title: A Font Family Reunion
author: Zach Leatherman
layout: post
categories:
  - project
  - font-loading
tags:
  - project
  - highlight
  - font-loading
permalink: /font-family-reunion/
---

*Go directly to [Font Family Reunion](http://fontfamily.io/) or read more about it:*

For my last side project I decided to redo the [iconic W3C specification status banners using CSS](/web/w3c-status-banners/). While that project went relatively well, with a side benefit of learning a little bit more about W3C process, one of the first questions I was asked was about the [use of the local Gill Sans font](https://twitter.com/svgeesus/status/504262420203057153) instead of a web font. I immediately wondered two things:

1. How strict are the W3C brand standards?
1. How well supported is Gill Sans across different operating system and browser combinations?

Turns out the brand standards were not really strict, as [Chris informed me later](https://twitter.com/svgeesus/status/506441366344568833)—a fallback sans-serif webfont would work fine. For the second question, things were more ambiguous. There wasn't an easy way to lookup default font lists for different operating systems, especially not specifically for ones that needed to be available through CSS `font-family`. What I really wanted was a [caniuse.com](http://caniuse.com/) for default local fonts.

## Building [fontfamily.io](http://fontfamily.io/)

I set out to build such a system. I already had a very nice head start, having built my own utility ([`fontfaceonload`](https://github.com/zachleat/fontfaceonload)) to test if remote web fonts had loaded successfully. You might remember this utility from [my research into icon fonts](https://github.com/filamentgroup/a-font-garde). It only required a few minor tweaks in order to test local fonts in addition to remote fonts. Of course, none of this is necessary if you have the CSS font loading API available to you, but I wanted to test operating system and web browsers that were older than the newly minted native API.

If you’re curious how `fontfaceonload` works internally, [documentation is available on GitHub](https://github.com/zachleat/fontfaceonload#how-it-works).

But there was another hurdle. There is no API through which you can retrieve a list of all the installed fonts, so I had to compile a list manually. If you have access to the shell on the host operating system, *nix machines provide a `fc-list` command to retrieve a list of installed fonts. Also, most operating systems actually publish a [list of installed fonts on the web in their support pages](https://github.com/zachleat/font-family-reunion/blob/master/artifacts/source-list.txt), so I compiled [one big giant list of font families](https://github.com/zachleat/font-family-reunion/blob/master/test/src/font-families.json) from a bunch of these sources.

The test page then iterates through the list and tests over 1000 different font family names to see if the current browser supports them. I used [Browserstack](browserstack.com) for most of this, as well as one of the best perks of working at [Filament Group](http://filamentgroup.com/), a home device test lab. Running the test page on a bunch of devices and virtual machines gives us a nice list of results: the default installed fonts.

## Default Keywords are Browser Madness

But that’s not all. Font Family Reunion will also tell you what the five standard CSS keyword font-families are aliased to in each operating system. They are `serif`, `sans-serif`, `monospace`, and the lesser known `fantasy` and `cursive`. This is where browsers diverged from operating system standards into browser specific behavior. Browsers have made their own decisions about what the defaults should be and boy do they vary.

Predictably, many browsers defer to the default web browser’s default fonts, especially on Mac OS and iOS (Safari). If you’re gonna use [`font-family: fantasy`](http://fontfamily.io/fantasy) on an Apple device, it’s gonna be [Papyrus](http://fontfamily.io/Papyrus) (stylistically probably a bad choice, but at least it’s consistent).

Then you open up Windows. On Windows, default fonts are a free-for-all, even between versions of their own browser, Internet Explorer.

<blockquote class="twitter-tweet" data-cards="hidden" lang="en"><p>shout out to whoever changed `font-family: serif` from Times New Roman to the Korean typeface Batang in IE9 and IE10 <a href="http://t.co/ApjQsjXXYC">http://t.co/ApjQsjXXYC</a></p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/514067972626087936">September 22, 2014</a></blockquote>

[`font-family: fantasy`](http://fontfamily.io/fantasy) is aliased to four different typefaces across six different browsers on Windows 7, and three different typefaces across four different browsers on Windows 8. Unless you think that Impact and Papyrus look alike (they don’t), I would stay away from `font-family: fantasy` for now.

[`font-family: cursive`](http://fontfamily.io/cursive) is a little better, but not much. The aliases there range from [Comic Sans](http://fontfamily.io/Comic_Sans_MS) to [Apple Chancery](http://fontfamily.io/Apple_Chancery) to [Snell Roundhand](http://fontfamily.io/Snell_Roundhand).

It was also interesting to note that on Windows 7 and up, both Chrome and Opera decided to forgo the standard [`monospace`](http://fontfamily.io/monospace) favorite of [Courier New](http://fontfamily.io/Courier_New) (on Windows) and instead go with [Consolas](http://fontfamily.io/Consolas), a newer and better Microsoft creation. Given the free-for-all that is default keywords on Internet Explorer, I would have guessed that Microsoft would be more progressive with their `monospace` choice—but I’ll leave that to the missed connections section on Craigslist.

The other little factoid that Font Family Reunion exposed is the Mac/Windows duel that is Helvetica/Arial and Times/Times New Roman. Did you know that on Windows, [Helvetica](http://fontfamily.io/Helvetica) is aliased to [Arial](http://fontfamily.io/Arial) but on Mac both Helvetica and Arial are available separately? Same with [Times](http://fontfamily.io/Times) (aliased to Times New Roman on Windows) and [Times New Roman](http://fontfamily.io/Times_New_Roman) (available on both). So, [`font-family: Helvetica, Arial`](http://fontfamily.io/Helvetica,Arial) and [`font-family: Arial, Helvetica`](http://fontfamily.io/Arial,Helvetica) operate much differently.

And if all of that wasn’t confusing enough, Android tries to be tricky and uses typefaces that are not actually exposed through CSS font-family. It keeps them hidden behind aliases. [Droid Sans](http://fontfamily.io/Droid_Sans) is available as an explicit font-family name, but Droid Sans Mono (the default monospace) and Droid Serif (the default serif) are not.

## A Manageable Mess

So, what have we learned? The rules keep things pretty simple:

1. Always specify a default CSS keyword fallback, don’t let the browser use its own default choice of serif (it doesn’t necessarily even match `font-family: serif`).
1. Don’t use `fantasy` or `cursive`.
1. Don’t go overboard with your stack. `font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;` is the first stack listed on [CSSFontStack.com](http://cssfontstack.com/). Running this through [fontfamily.io reveals](http://fontfamily.io/Arial,Helvetica_Neue,Helvetica,sans-serif) that Arial is used everywhere (and aliased on Android). The middle two families are never used.

It would be interesting to test out the font-family stacks on [CSS Tricks](http://css-tricks.com/snippets/css/font-stacks/) or [Designer Daily](http://www.designer-daily.com/10-fonts-that-are-safe-to-use-with-css-34474) and see what comes out!

Remember, when you’re using `@font-face` to load custom web fonts, the fallback font-family experience—what shows while the remote font is loading—is important too. Maybe you could even go without using a few custom web fonts, or not use any at all? It’s certainly worth asking the question.

## Go to your [Font Family Reunion](http://fontfamily.io/).
