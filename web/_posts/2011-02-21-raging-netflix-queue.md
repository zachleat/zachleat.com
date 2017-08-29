---
title: 'Raging Netflix Queue, a Google Chrome Extension'
author: Zach Leatherman
layout: post
permalink: /raging-netflix-queue/
headimage: /web/wp-content/uploads/2011/02/Screen-shot-2011-02-21-at-10.15.44-AM.png
description: >-
  This Google Chrome extension will recognize movie web sites and one click on
  the extension will automatically add that title to your queue.
categories:
  - retired-projects
tags:
  - project
  - deprecated
---

The premise is simple. When attempting to find movies to watch in my local theater, I often stumble upon titles that I feel to be more rental quality than theater quality. So I wanted an easier way to add those movies to my Netflix queue. I created a Google Chrome extension to accomplish just that.

[![][screenshot]][2]When Raging Netflix Queue recognizes the site you’re browsing to be a movie web site, it will show a small green Netflix icon in the address bar. Clicking that icon will add the title to your queue. If the title is available for Instant Viewing, it will go into your Instant Queue. If not available for Instant View, it will go into your DVD Queue. If the title is still in theaters and not yet available on DVD, it will go into the Saved portion of your DVD Queue, and Netflix will automatically add it to your DVD Queue when it becomes available.

 [screenshot]: /web/wp-content/uploads/2011/02/Screen-shot-2011-02-21-at-10.15.44-AM.png

Raging Netflix Queue supports Rotten Tomatoes, IMDB, Google Movies, Apple Trailers, Movie Fone, movies.com, Yahoo Movies, and Fandango. Let me know if you have others you’d like to see added.

## [Download Raging Netflix Queue][2]

 [2]: https://chrome.google.com/extensions/detail/nbnnepgogimidfbfkbcfmdeimmfadmmp

## Screencast

<div class="fluid-width-video-wrapper"><iframe title="YouTube video player" src="https://www.youtube.com/embed/YuRuYdfvTA0" frameborder="0" allowfullscreen></iframe></div>

## Hiccups

### Years

The extension will parse the release year from the movie page, in order to guarantee better accuracy of results (There are a ton of remakes out there with the same titles). However, the actual year may vary. Some sites report theater release date, while others DVD release date, or the movie may have gone through a small showing and then a larger showing later. Thus, we allow plus or minus one year leverage when searching Netflix. See [Cedar Rapids (2011) on Rotten Tomatoes][3].

 [3]: http://www.rottentomatoes.com/m/cedar_rapids_2010/

### Use of “The” or And/&

Apple’s entry for [The Adjustment Bureau][4] does not include “The” in the title. While this would be solved if Netflix allowed partial name matches in their OData API, Raging Netflix Queue does an additional search prepending “The” to the title, if no titles were found on the first go.

 [4]: http://trailers.apple.com/trailers/universal/adjustmentbureau/

Netflix requires exact name matches in their API and prefers “and” over “&” in my tests. Raging Netflix Queue does a simple string replace there.

### Single Quotes

Titles like “The King’s Speech” don’t match, due to another limitation with the [Netflix OData API][5]. There is no way to escape single quotes in the query string. I’m waiting on Netflix for an answer there.

 [5]: http://developer.netflix.com/docs/oData_Catalog

## Hindsight

It’s true that I have built a [web browser plugin (to an add-on) before][6], and even a [plug-in to a ported web browser add-on][7], but it was a great experience to build an actual web browser extension and Google Chrome has made it very easy to do so. This was also a **jQuery-free project**, as I would think that all Google Chrome extensions would be. jQuery is intended to solve cross browser compatibility issues, and a web browser specific extension shouldn’t have any of those. Sure, it feels like you’re being spoiled to use native String `trim()`, Array `forEach`, and `document.querySelector`. But damn it, I deserve nice things every once in awhile.

 [6]: /web/2007/04/18/javascript-code-coverage-tool-for-firebug/
 [7]: /web/2010/07/19/dom-sailbloat/

[*I’m getting such a huge queue right now.*][8]

 [8]: http://www.southparkstudios.com/clips/155280/raging-clues
