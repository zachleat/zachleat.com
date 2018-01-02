---
title: 'The Web Fonts: Preloaded'
author: Zach Leatherman
layout: post
permalink: /preload/
categories:
  - font-loading
tags:
  - research
  - highlight
  - font-loading
  - popular-posts
  - popular-posts-total
postRank: 11
daysPosted: 637
yearsPosted: 1.7
postRankTotalViews: 16
---

***Summary**: If you’re not currently using a font loading strategy, using `preload` with web fonts will reduce the amount of FOIT visitors will see when they visit your site—paid for by sacrificing initial render time. Don’t preload too much or the cost to initial render will be too high. For devs using a font loading strategy, the same rules apply. Try to only preload a single web font, whether that be the only font in a single stage load or the subset font in the first stage of a two stage load. Further, `preload` is an improvement over Data URIs for two stage font loads in supporting browsers, and I will be happy to welcome it as a best practice when its browser support grows.*

After the recent release of [`loadCSS` 1.0](https://github.com/filamentgroup/loadCSS#recommended-usage-pattern) updated the utility into a `<link rel="preload">` polyfill for CSS and [Yoav Weiss’ excellent Smashing Magazine post on `preload`](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/), I decided to experiment with `preload` to see if it could improve the variety of web font loading approaches I’ve written about in the past.

Here’s all you need to add to the `<head>` of your page to start preloading:

```
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```
<span class="caption">via <a href="https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/">Preload: What Is It Good For? by Yoav Weiss</a>

*If you have WOFF2 formats in your `@font-face` block, make sure you preload the WOFF2 format. In fact, you should probably limit preload to the first format in your `@font-face` `src` stack. If you `preload` a WOFF file and have WOFF2 first in your stack, the browser will download both. This is undesirable.*

## Benchmarks

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
			<td>980ms <div class="worse">(+71%)</div></td>
			<td>1.23s <div class="worse">(+114%)</div></td>
			<td>1.38s <div class="worse">(+140%)</div></td>
		</tr>
		<tr>
			<th>Roman Loaded</th>
			<td>2.12s</td>
			<td>888ms <div class="better">(-138%)</div></td>
			<td>1.18s <div class="better">(-44%)</div></td>
			<td>1.42s <div class="better">(-33%)</div></td>
			<td>1.75s <div class="better">(-17%)</div></td>
		</tr>
		<tr>
			<th>Italic Loaded</th>
			<td>2.12s</td>
			<td>1.83s <div class="better">(-13%)</div></td>
			<td>1.10s <div class="better">(-48%)</div></td>
			<td>1.33s <div class="better">(-37%)</div></td>
			<td>1.56s <div class="better">(-26%)</div></td>
		</tr>
		<tr>
			<th>Bold Loaded</th>
			<td>2.20s</td>
			<td>1.96s <div class="better">(-10%)</div></td>
			<td>1.92s <div class="better">(-12%)</div></td>
			<td>1.46s <div class="better">(-33%)</div></td>
			<td>1.75s <div class="better">(-20%)</div></td>
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

Perhaps obviously, the more fonts you preload the more initial render time suffers. It’s even more interesting when you compare to the numbers I ran on [Data URIs](/web/web-font-data-uris/).

*(Times generated using Chrome Canary’s Developer Tools Network Throttling in Regular 3G mode)*

<table id="results-compare-preload-data-uri">
	<caption>Compare <code>preload</code> with Data URI</caption>
	<thead>
		<tr>
			<th></th>
			<th>Default Behavior</th>
			<th>Inline Roman Data URI</th>
			<th>Preload Roman</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Initial Render</th>
			<td>573ms</td>
			<td>953ms</td>
			<td>795ms <div class="better">(-16%)</div></td>
		</tr>
		<tr>
			<th>Roman Loaded</th>
			<td>2.12s</td>
			<td>1.01s</td>
			<td>888ms <div class="better">(-12%)</div></td>
		</tr>
		<tr>
			<th>Italic Loaded</th>
			<td>2.12s</td>
			<td>2.05s</td>
			<td>1.83s <div class="better">(-10%)</div></td>
		</tr>
		<tr>
			<th>Bold Loaded</th>
			<td>2.20s</td>
			<td>2.11s</td>
			<td>1.96s <div class="better">(-7%)</div></td>
		</tr>
		<tr>
			<th>Bold Italic Loaded</th>
			<td>N/A</td>
			<td>N/A</td>
			<td>N/A</td>
		</tr>
	</tbody>
</table>

`preload` affects initial render less than Data URIs and from a maintenance perspective it operates much cleaner. `preload` improves the performance of all four drawbacks on listed on the [Data URI post](/web/web-font-data-uris/):

1. They don’t directly block render, although as shown above in low bandwidth situations they can delay initial render.
1. You can add a `type` attribute to declare the font format to download. Right now only Chrome Canary has a working implementation of this feature and it also supports WOFF2. But this type attribute protects you if a browser implements `preload` without a newer font format (or vice versa).
1. Works great with browser cache.
1. Multiple preloaded fonts load in parallel (although I wouldn’t recommend preloading multiple web fonts).

## Best Practice?

If the alternative is doing nothing (please don’t), then yes I would recommend preloading the most often used web font on your site. In the example above, `Lato-Regular.woff2` was 25KB. If you preload more file weight (or more fonts), the tradeoff in initial render time might make it more difficult to accept.

## Use with a Font Loading Strategy

`preload` isn’t a panacea because it’s not sufficient by itself as a font loading strategy. There are two major considerations to font loading: *(1)* Eliminating the Flash of Invisible Text (FOIT) by showing a Flash of Unstyled Text (FOUT) and *(2)* Speeding up font loading to minimize the amount of time that fallback text is shown. We want to reduce the jarring reflows that happen when content is re-rendered with our new, shiny web fonts. An ideal strategy would eliminate both FOIT *and* FOUT.

`preload` helps our second point but does nothing for the first. We still need to implement a FOUT strategy—of course, my favorite is still [Critical FOFT](/web/critical-webfonts/) with an [inline Data URI for the first stage](/web/web-font-data-uris). This strategy has shown to eliminate FOIT and FOUT, but at a cost documented above (and in the Data URI post). Let’s see how `preload` plays out there:

*(Times generated using Chrome Canary’s Developer Tools Network Throttling in Regular 3G mode)*

<table id="results-strategy">
	<caption>2-Stage Font Loading Strategies</caption>
	<thead>
		<tr>
			<th></th>
			<th>Critical FOFT</th>
			<th>Critical FOFT Roman Data URI</th>
			<th>Critical FOFT <code>preload</code></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Initial Render</th>
			<td>588ms <div>&#160;</div> 58.6KB HTML</td>
			<td>619ms <div class="worse">(+5%)</div> 65.7KB HTML</td>
			<td>675ms <div class="worse">(+14%)</div> 58.6KB HTML</td>
		</tr>
		<tr>
			<th>Stage 1 Render <div>(Critical Roman)</div></th>
			<td>1.04s</td>
			<td>619ms <div class="better">(-40%)</div></td>
			<td>675ms <div class="better">(-35%)</div></td>
		</tr>
		<tr>
			<th>Stage 2 Render <div>(Roman, Italic, Bold, Bold Italic)</div></th>
			<td>2.57s</td>
			<td>2.44s <div class="better">(-5%)</div></td>
			<td>2.29s <div class="better">(-10%)</div></td>
		</tr>
	</tbody>
</table>

The results are pretty good for a Two Stage font loading approach. If your web font requirements are a little simpler and you’re only loading a single web font (One Stage font loading), then `preload` will have a similar beneficial performance gain. However, if you’re loading multiple web fonts in a grouped load (again, One Stage) with a single repaint/reflow step, `preload` isn’t wise: if you `preload` one of the fonts, the repaint/reflow will not happen until all web fonts have completed and it will be wasted; if you `preload` all of them, the sacrifices to initial render are too costly.

## Conclusion

The benefits to `preload` for fonts are numerous—especially over the Two Stage Data URI approach. The only nail in the `preload` coffin now is browser support. Once browser support for this is better, I will definitely switch from using Data URIs in the first stage of Critical FOFT to simply preloading the hosted first stage WOFF2 file (or similarly if you’re only loading a single web font). Always measure the sacrifice in initial render time to determine if this trade-off is worth it for your site.

<div class="retweettoshare">
	<h3 class="retweettoshare_title">Retweet to share this post</h3>
	<div class="retweettoshare_widget">
		<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">★ The Web Fonts: Preloaded <a href="https://t.co/Sk76FYXaIr">https://t.co/Sk76FYXaIr</a> A look at using `&lt;link rel=&quot;preload&quot;&gt;` for web fonts.</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/720593422063525889">April 14, 2016</a></blockquote>
	</div>
</div>
