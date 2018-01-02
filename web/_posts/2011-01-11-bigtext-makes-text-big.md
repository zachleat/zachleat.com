---
title: BigText Makes Text Big
author: Zach Leatherman
layout: post
permalink: /bigtext-makes-text-big/
description: >-
  The BigText jQuery plugin takes a single element and sizes the text inside of
  its child block elements to fit the width of the parent element.
headimage: /web/wp-content/uploads/2009/12/Screen-shot-2011-01-14-at-6.46.00-PM.png
project_name: BigText
categories:
  - project
  - font-loading
tags:
  - highlight
  - project
  - font-loading
  - popular-posts
  - popular-posts-total
postRank: 3
daysPosted: 2548
yearsPosted: 7
postRankTotalViews: 1
---

*I like shortcuts: Fork [BigText on Github][github] or Check out the [BigText Demo Wizard][wizard]

 [github]: https://github.com/zachleat/BigText
 [wizard]: /bigtext/demo/

It all began with a simple web foray to [Designing Monsters][designingmonsters]. Their simple, typographic design was beautiful. But why? Their combination of the beautiful League Gothic font, use of [Lettering.JS][lettering], and some simple font scaling gave the page a wonderful consistent vertical alignment. Like the Million Dollar Homepage, I wanted to rebuild it — but I didn’t want to spend a lot of time manually adjusting font sizes. So I did what any programmer with the jQuery Golden Hammer would do, I turned my problem into a nail.

 [designingmonsters]: http://designingmonsters.com/
 [lettering]: http://letteringjs.com/

 ![][screenshot]

 [screenshot]: /web/wp-content/uploads/2011/01/Screen-shot-2011-01-11-at-7.37.54-PM.png

At its simplest, the BigText jQuery plugin takes a single element and **sizes the text inside of its child `<div>`s to fit the width of the parent element**. Gives the text that lovely vertical alignment.

    <div id="bigtext" style="width: 300px">
        <div>The elusive</div>
        <div>BIGTEXT</div>
        <div>plugin exclusively</div>
        <div>captured on film</div>
    </div>

    $('#bigtext').bigtext();

## Implementation Details

The plugin itself is more than just a simple font-size incrementer. I wasn’t happy with the performance of simply iterating through font sizes with a single fixed interval. I decided it would be better to test multiple decreasing intervals. For each line, it increments first by `16em` until it detects a line break, backs off an interval then increments by `8em`. It continues with `4em`, `2em`, `1em`, `0`.`1em`, until it finds the correct font-size to the nearest hundredth of an em. It’s noteworthy that Webkit does not respect font-sizes to the nearest hundredth, it’s precision is maxed out at tenths. This algorithm results in fewer tests in most cases, especially where the resulting font-size will be very large. Performance is always important. After font-size, it moves to word-spacing as a backup for extra precision, especially needed on Webkit.

## [The BigText Demo Wizard][wizard]

This is where the magic happens.

 * Editable text (`contenteditable`), and BigText will run on every keyup event to resize what you’re typing.
 * Dynamic horizontal and vertical centering using [Alex Russell’s Flex Box CSS classes][flexbox] (This is easy now, hooray!)
 * 3D transforms (browser support checked using [Modernizr][modernizr], currently only available in Safari. Note: Chrome flattens to 2D space)
 * Custom fonts are loaded using [Google’s Font Loader JavaScript API][googlefonts]
 * [Ben Alman’s Throttle Plugin][throttle]
 * The rest is mostly jQuery UI with the [Aristo theme][aristo]

 [flexbox]: http://infrequently.org/2009/08/css-3-progress/
 [modernizr]: http://www.modernizr.com/
 [googlefonts]: http://code.google.com/apis/webfonts/docs/webfont_loader.html
 [throttle]: http://benalman.com/projects/jquery-throttle-debounce-plugin/
 [aristo]: http://taitems.tumblr.com/post/482577430/introducing-aristo-a-jquery-ui-theme

Turns out, the *BigText Demo Wizard* makes for really easy [Kinetic Typography][ke] screencasts (not amazing, but surely easy):

 [ke]: http://vimeo.com/channels/kinetictypography

<div class="fluid-width-video-wrapper"><iframe class="youtube-player" type="text/html" width="640" height="385" src="https://www.youtube.com/embed/OuqB6e6NPRM" frameborder="0"></iframe></div>

The above is simply the manual process of typing lyrics into the *BigText Demo Wizard*. You can easily make one of these too, with the help of the following keyboard shortcuts:

 * CTRL + ALT + X: Set the text to a random 3D transform angle.
 * CTRL + ALT + C: Toggles between white and black background.
 * CTRL + ALT + R: Reset 3D to default state.
 * **CTRL + ALT + SPACE: Fade out current text, clears the text, sets a random 3D transform angle, ready to type!**
 * CTRL + ALT + ENTER: Same as CTRL + ALT + SPACE, but keeps the same 3D transform angle.

The fun part about the *BigText Demo Wizard* for me was that it almost turned into a non-musical instrument when I used it real-time to complement music. Feel free to cruise Pandora and type lyrics to the music until your wrists get sore. **What can you make with it?**

*The BigText Demo Wizard was tested manually in Safari 5, Chrome 8, Opera 11, Firefox 3.6, and Internet Explorer 8. The BigText jQuery plugin has a full JsTestDriver suite, available on [GitHub][github]. Just run ./test.sh or test.bat*
