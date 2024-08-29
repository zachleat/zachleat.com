---
title: heading-anchors Web Component
titleHtml: '&lt;heading-anchors&gt; Web Component'
tags:
  - project
  - web-components
seo:
  openGraphBackgroundImage: /og/sources/boat-anchor.jpg
  openGraphAlt: Looking out to sea over Peel Beach and Peel Castle, a rusted boat anchor sits on grass
posterImage:
  showOnPage: true
  height: 22em
  name: James Qualtrough
  source: https://unsplash.com/photos/anchor-on-grass-shore-during-day-fXzcEptNAmQ
---
`<heading-anchors>` adds sibling anchor links for heading elements (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) when they have an `id` attribute and positions those anchor links visually as though they were nested inside of the heading.

* [Demo](https://zachleat.github.io/heading-anchors/demo.html)
* [Source code on GitHub](https://github.com/zachleat/heading-anchors)

Inspired by [David Darnes’ component of the same name](https://github.com/daviddarnes/heading-anchors).

Currently in use on v9 of the [`eleventy-base-blog` project](https://github.com/11ty/eleventy-base-blog) (and on this very web site, too).

## Features

* Useful when you want preserve heading text as is (selectable, able to nest other links, etc).
* Useful when you want to exclude anchor links from your RSS feed.
* Links are _positioned_ alongside heading text, but not nested inside of heading markup (for improved screen-reader compatibility and accessibility)
* Establishes a placeholder element to establish space for the anchor link and so that heading text doesn’t reflow during interaction
* Prefers the CSS Anchoring API (where available) but works using JavaScript positioning when the API is not available.
* Automatically matches font styling of the heading (font-family, line-height, font-size, and font-weight)

## Prior Art

* [https://github.com/daviddarnes/heading-anchors](https://github.com/daviddarnes/heading-anchors)
* [https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/](https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/) (which has a lot of good related content too)