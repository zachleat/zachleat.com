---
title: 'WebFonts: Preloaded'
author: Zach Leatherman
layout: post
permalink: /preload/
categories: 
tags:
 - research
 - highlight
 - pending
---

After the recent release of [`loadCSS` 1.0](https://github.com/filamentgroup/loadCSS#recommended-usage-pattern) updated the utility into a `<link rel="preload">` polyfill for CSS and [Yoav Weiss’ excellent Smashing Magazine post on `preload`](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/), I decided to experiment with `preload` to see if it could improve the variety of web font loading approaches I’ve written about in the past.

Here’s all you need to add to the `<head>` of your page to start preloading:

<figure>
{% highlight html %}
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
{% endhighlight %}

<figcaption>via <a href="https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/">Preload: What Is It Good For? by Yoav Weiss</a></figcaption>
</figure>

Let’s look first at the effect of `preload` on my own site without any font loading strategy:

*(Times generated using Chrome Canary’s Developer Tools Network Throttling in Regular 3G mode)*

<table>
	<caption>With <code>&lt;link rel="preload"&gt;</code></caption>
	<thead>
		<tr>
			<th></th>
			<th>No Preload</th>
			<th>Preload Roman</th>
			<th>and Preload Italic</th>
			<th>and Preload Bold</th>
			<th>and Preload Bold Italic</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Initial Render</th>
			<td>573ms</td>
			<td>795ms <div class="worse">(+38%)</div></td>
			<td>980ms <div class="worse">(+23%)</div></td>
			<td>1.23s <div class="worse">(+25%)</div></td>
			<td>1.38s <div class="worse">(+12%)</div></td>
		</tr>
		<tr>
			<th>Roman Loaded</th>
			<td>2.12s</td>
			<td>888ms <div class="better">(-58%)</div></td>
			<td>1.18s <div class="worse">(+32%)</div></td>
			<td>1.42s <div class="worse">(+20%)</div></td>
			<td>1.75s <div class="worse">(+23%)</div></td>
		</tr>
		<tr>
			<th>Italic Loaded</th>
			<td>2.12s</td>
			<td>1.83s <div class="better">(-13%)</div></td>
			<td>1.10s <div class="better">(-39%)</div></td>
			<td>1.33s <div class="worse">(+20%)</div></td>
			<td>1.56s <div class="worse">(+17%)</div></td>
		</tr>
		<tr>
			<th>Bold Loaded</th>
			<td>2.20s</td>
			<td>1.96s <div class="better">(-10%)</div></td>
			<td>1.92s <div class="better">(-2%)</div></td>
			<td>1.46s <div class="better">(-23%)</div></td>
			<td>1.75s <div class="worse">(+19%)</div></td>
		</tr>
		<tr>
			<th>Bold Italic Loaded</th>
			<td><em>N/A</em></td>
			<td><em>N/A</em></td>
			<td><em>N/A</em></td>
			<td><em>N/A</em></td>
			<td>1.63s</td>
		</tr>
	</tbody>
</table>

Perhaps obviously, the more fonts you preload the more your initial render time suffers. I expected this to be true in low bandwidth situations, but perhaps not so severe. It’s even more interesting when you compare to the numbers I ran on [Data URIs](/web/web-font-data-uris/#results-default). `preload` affects initial render less than Data URIs and it operates more cleanly as well. It improves the performance of all four drawbacks on listed on the Data URI post:

1. They don’t directly block render, although as shown above in low bandwidth situations they can clog the pipe while the HTML is downloading and delay initial render.
1. You can add a `type` attribute to declare the font format to download. Right now only Chrome Canary has a working implementation of this feature, and it also supports WOFF2. But this type attribute protects you if a browser implements `preload` without a newer font format (or vice versa).
1. Works great with browser cache.
1. Multiple preloaded fonts load in parallel.

## Best Practice?

If the alternative is doing nothing (please don’t do nothing), then yes I would whole-heartedly recommend preloading one font small WOFF2 font. In the example above, `Lato-Regular.woff2` was 25KB. If you preload more, the tradeoffs for initial render time make it more difficult to accept.

This isn’t a panacea, obviously. There are two major considerations to font loading: 1. Eliminating the Flash of Invisible Text (FOIT) by showing a Flash of Unstyled Text (FOUT) and 2. Speeding up font loading to minimize the amount of time that Unstyled (or fallback) Text is shown. We want to reduce the jarring reflows that happen when content is re-rendered with our new, shiny web fonts.

So, `preload` helps our second point but does nothing for the first. We still need to implement a FOUT strategy—of course, my favorite is still the [Critical FOFT](/web/critical-webfonts/) method. Let’s modify it and see how it plays out with `preload` instead of a Data URI or normal URL `src` attribute value.



Scenarios:
* No font loading strategy. Preload the Roman font only. Great first render and limit FOIT on Roman, but the remaining 2 weights FOIT pretty badly.
		* Side note: These examples use 4 different font styles/weights, if you’re only loading a single web font—this scenario will match most to your needs and should convince you to preload it.
		* Side note: You may be thinking to yourself, can we preload a subset critical Roman font here and include it in the font-family stack? Something like `font-family: LatoSubset, Lato, sans-serif`.Unfortunately, no this is an anti-pattern—if any characters on the page are not represented in the subset font the browser will FOIT on all text while the full Roman font loads. Not only that, but mixing `LatoSubset` and `Lato` like this will create undesirable results with ligatures and problems if `unicode-range` isn’t supported.
* No font loading strategy. Preload all fonts. Delays initial render considerably. Very bad FOIT.




* Talk about how preload Critical FOFT is almost like no FOUT at all. Peak font loading finishes loading the font before first render—better than FOIT, better than FOUT, renders almost like a local font.