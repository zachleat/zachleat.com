---
title: 'FitText + BigText: A Tale of Two Plugins'
author: Zach Leatherman
layout: post
permalink: /fittext-and-bigtext/
categories:
  - font-loading
tags:
  - highlight
  - project
  - font-loading
  - popular-posts
  - popular-posts-total
postRank: 16
daysPosted: 2427
yearsPosted: 6.6
postRankTotalViews: 5
---

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

[![][7img]][7]

 [7]: http://www.zachleat.com/web/bigtext-makes-text-big/
 [7img]: /web/wp-content/uploads/2011/05/Screen-shot-2011-05-12-at-11.05.26-PM.png "BigText"

[![][fittextimg]][fittext]

 [fittext]: http://fittextjs.com/
 [fittextimg]: /web/wp-content/uploads/2011/05/Screen-shot-2011-05-12-at-11.10.01-PM.png "FitText"

On the surface, BigText and FitText might seem very similar. In fact, they are quite different and approach what might seem to be a similar problem (resizing text to fit a container) in very different ways.

At its simplest, we can boil it down like this: If you’re crafting a specific design with **copy that is not going to change**, use FitText. If your **text is dynamic** (maybe user generated), use BigText.

Here’s more detail:

<table>
<thead>
<tr>
<th>&#160;</th>
<th>BigText</th>
<th>FitText</th>
</tr>
</thead>
<tbody>
<tr>
<th>Demos</th>
<td><a href="http://jsfiddle.net/zachleat/anJpE/">BigText Fiddle</a></td>
<td><a href="http://jsfiddle.net/zachleat/ExhDC/">FitText Fiddle</a></td>
</tr>
<tr>
<th>&#160;</th>
<td colspan="2"><em>Try resizing the demo windows above.</em></td>
</tr>
<tr>
<th>Algorithm</th>
<td><strong>Sizes text automatically</strong> from a base up to fit the element width, regardless of initial font size.</td>
<td>Uses the width of the element and a configurable JavaScript argument (the ratio) to <strong>scale text down</strong> to smaller widths. This ratio argument must be set manually.</td>
</tr>
<tr>
<th>Responsive Design</th>
<td colspan="2">Both plugins work with <strong>responsive design techniques</strong>, operating correctly with media queries, fluid designs, and window resizing.</td>
</tr>
<tr>
<th>Speed</th>
<td>Fast</td>
<td>Faster</td>
</tr>
<tr>
<th>Text</th>
<td>Works with user generated text, or any text isn&#8217;t cemented at design time. See the <a href="http://www.zachleat.com/bigtext/demo/">BigText Demo Wizard</a>.</td>
<td>Requires up front configuration to specific text.</td>
</tr>
<tr>
<th>Resize Event</th>
<td>Works with existing debounced resize libraries, if they exist on the page.</td>
<td>Does not use a debounced resize event.</td>
</tr>
<tr>
<th>Unobtrusive</th>
<td>CSS and BigText font-sizes are independent of each other.</td>
<td>FitText uses your CSS font-size as a maximum font size.</td>
</tr>
<tr>
<th>&#160;</th>
<td colspan="2"><em>Don&#8217;t forget to set sane CSS font-size defaults when JavaScript isn&#8217;t available.</em></td>
</tr>
<tr>
<th>Unit Tested</th>
<td>Full Test Suite</td>
<td>-</td>
</tr>
</tbody>
</table>


**FitText is very lightweight and fast**, even considering it doesn’t yet use a debounced resize event. The [FitText algorithm][11] is **quite beautiful**. A huge well done to [Paravel][12].

 [8]: http://jsfiddle.net/zachleat/anJpE/
 [9]: http://jsfiddle.net/zachleat/ExhDC/
 [10]: http://www.zachleat.com/bigtext/demo/
 [11]: https://github.com/davatron5000/FitText.js/blob/master/jquery.fittext.js
 [12]: http://paravelinc.com/

FitText relies on the fact that there is a **linear relationship between font-sizes and element widths**. Once you’ve established the ratio between the two, it’s off to the races. In fact, it would probably be technically possible to determine the ratio solely on the initial inner-width of the text and the initial font-size. I’ll have to play around with that approach but if it works it would give an amazing speed improvement to BigText.

`font-size = outer-width / configurable-ratio`

In a perfect world, BigText and FitText could be combined, to create a *mutant auto-text-sizing plugin baby* that gives the best of both worlds.
