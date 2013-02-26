---
title: 'FitText + BigText: A Tale of <span class="widow">Two Plugins</span>'
author: Zach Leatherman
layout: post
permalink: /fittext-and-bigtext/
categories:
  - JavaScript
---
# 

Earlier this week, [@TrentWalton][1] [tweeted][2]:

 [1]: http://twitter.com/trentwalton
 [2]: http://twitter.com/TrentWalton/status/67972022776508416

> We at [@paravelinc][3] happily present to you FitText—a jQuery plugin for inflating web type: 

 [3]: http://twitter.com/paravelinc

Naturally, I wondered how it compared to BigText, a plugin of my own creation to Make Text Big. Trent [continued][4]:

 [4]: http://twitter.com/TrentWalton/status/67989004427079682

> It’s in the GitHub readme, but I want to recognize BigText from [@zachleat][5] as another font sizer for non-fluid sites: 

 [5]: http://twitter.com/zachleat

I was delighted to get some attribution from Trent, and even more delighted to see their plugin. It’s really a great piece of work. However, his statement that BigText is just for non-fluid sites is not quite accurate. Let’s dive in.

[![][7]][7]

 []: http://www.zachleat.com/web/bigtext-makes-text-big/

[![][8]][8]

 []: http://fittextjs.com/

On the surface, BigText and FitText might seem very similar. In fact, they are quite different and approach what might seem to be a similar problem (resizing text to fit a container) in very different ways.

At its simplest, we can boil it down like this: If you’re crafting a specific design with **copy that is not going to change**, use FitText. If your **text is dynamic** (maybe user generated), use BigText.

Here’s more detail:

 

BigText

FitText

Demos

[BigText Fiddle][8]

[FitText Fiddle][9]

 

*Try resizing the demo windows above.*

Algorithm

**Sizes text automatically** from a base up to fit the element width, regardless of initial font size.

Uses the width of the element and a configurable JavaScript argument (the ratio) to **scale text down** to smaller widths. This ratio argument must be set manually.

Responsive Design

Both plugins work with **responsive design techniques**, operating correctly with media queries, fluid designs, and window resizing.

Speed

Fast

Faster

Text

Works with user generated text, or any text isn’t cemented at design time. See the [BigText Demo Wizard][10].

Requires up front configuration to specific text.

Resize Event

Works with existing debounced resize libraries, if they exist on the page.

Does not use a debounced resize event.

Unobtrusive

CSS and BigText font-sizes are independent of each other.

FitText uses your CSS font-size as a maximum font size.

 

*Don’t forget to set sane CSS font-size defaults when JavaScript isn’t available.*

Unit Tested

Full Test Suite

-

**FitText is very lightweight and fast**, even considering it doesn’t yet use a debounced resize event. The [FitText algorithm][11] is **quite beautiful**. A huge well done to [Paravel][12].

 [8]: http://jsfiddle.net/zachleat/anJpE/
 [9]: http://jsfiddle.net/zachleat/ExhDC/
 [10]: http://www.zachleat.com/bigtext/demo/
 [11]: https://github.com/davatron5000/FitText.js/blob/master/jquery.fittext.js
 [12]: http://paravelinc.com/

FitText relies on the fact that there is a **linear relationship between font-sizes and element widths**. Once you’ve established the ratio between the two, it’s off to the races. In fact, it would probably be technically possible to determine the ratio solely on the initial inner-width of the text and the initial font-size. I’ll have to play around with that approach but if it works it would give an amazing speed improvement to BigText.

`font-size = outer-width / configurable-ratio`

In a perfect world, BigText and FitText could be combined, to create a *mutant auto-text-sizing plugin baby* that gives the best of both worlds.