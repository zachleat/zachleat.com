---
title: 'FOIT vs. FOUT, a Side by Side Comparison'
author: Zach Leatherman
layout: post
permalink: /fout-vs-foit/
categories:
  - font-loading
tags:
  - font-loading
  - project
  - popular-posts
headvideo: /web/img/posts/foutvsfoit/demo.mp4
postRank: 20
daysPosted: 82
yearsPosted: 0.2
---

<em>Prerequisite: not sure what FOUT or FOIT are? Read the <a href="/web/webfont-glossary/#foit">definitions on the Web Font Loading Glossary</a>.</em>

<a href="/foitfout/"><video autoplay muted preload src="/web/img/posts/foutvsfoit/demo.mp4"></video></a>

Before we continue, check out <a href="/foitfout/">this demo that showcases the difference between FOIT and FOUT</a>—side by side—in order to more easily compare and constrast the functional differences between the two. Decide for yourself—which feels faster? Which feels more stable? *(Keep reading for my opinion)*

<p class="primarylink"><a href="/foitfout/">Check out FOIT vs. FOUT</a></p>

A few things stuck out to me after playing around with it:

1. FOUT feels faster, obviously. Instant rendering is faster than a delay.
1. FOIT feels more stable if you can guarantee your fonts will load before the timeout (note: you can’t). This is likely why I’m seeing more developers gravitating to a `font-display: optional` (render only if cached) approach.
1. FOIT with fonts that hit the timeout and render using the fallback feel more unstable that FOUT!
1. Page stability is *greatly increased* when you group your repaints (using the CSS Font Loading API or a polyfill).

## Related

* [The source code for FOIT vs. FOUT is on GitHub](https://github.com/zachleat/foitfout)
* Blog Post: [A Historical Look at FOUT and FOIT](/web/fout-foit-history/)
* Blog Post: [The Web Font Loading Glossary](/web/webfont-glossary/)

## Context

In researching <a href="/web/fout-foit-history/">the history of web font loading behavior</a>, I was struck by how much influence Apple had when they introduced FOIT to the world on WebKit. It’s almost as if two worlds collided, pitting the idealists that believe that a web page should only be rendered in its finished state against the realists that understand network conditions will always necessitate the construction of planes mid-air.

For historical context, here are an anonymized quote from an Apple employee on the earliest discussion I could find (~2009, about six months after FOIT was first introduced):

> We might consider displaying something after a timeout, but no way are we going to draw the wrong thing immediately and then flicker to the right thing.  That would look terrible.

This quote seems to suggest that FOIT was not introduced to hide the “ugly” fallback fonts, as some developers have suggested. After all, Apple has invested heavily in their own [system fonts](https://developer.apple.com/videos/play/wwdc2015/804/).

Rather, FOIT was introduced to reduce the jarring visual impact of the transition that swapping to the web font introduces—reflowing text with new metrics (not all fonts are the same size—*gasp!*) and repainting with a new style. If the system font and web font are metric compatible (meaning they are the same size—which is very rare but [some fonts are developed with this in mind](https://en.wikipedia.org/wiki/Liberation_fonts)), reflow should be non-existent and I am very curious if those original FOIT advocates would still complain about the repaint. My hunch is that the answer is yes—but I’m not sure. If I ever meet them, I’ll be sure to ask!

In retrospect the unintented side effects of hiding text are clear now, primarily because repaints amongst different web fonts for a single typeface are not grouped together by default. This creates race conditions leading to the [Mitt Romney Web Font Problem](/web/mitt-romney-webfont-problem/), changing the actual meaning of sentences that mix two or more web fonts together.

<p class="primarylink"><a href="/foitfout/#800,800,3000,3000">Demo of The Mitt Romney Web Font Problem</a></p>

Where does this leave us? Hopefully the demo has convinced you that FOIT isn’t really a good default font loading behavior for web browsers. Note that the alternative doesn’t have to be FOUT. It isn’t a dichotomy. There are font loading strategies that eliminate FOIT and greatly reduce FOUT reflow. You can read about those out on my <a href="/web/comprehensive-webfonts/">Comprehensive Guide to Font Loading Strategies</a>.

