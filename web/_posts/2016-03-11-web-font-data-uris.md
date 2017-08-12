---
title: 'Web Font Anti-pattern: Data URIs'
author: Zach Leatherman
layout: post
permalink: /web-font-data-uris/
categories:
  - font-loading
tags:
  - research
  - highlight
  - font-loading
  - popular-posts
postRank: 14
---

After I posted my [Critical Web Fonts](/web/critical-webfonts/) article on Twitter, I had an interesting conversation with a developer named [Wim Leers](https://twitter.com/wimleers/) about embedding Web Fonts as Data URIs.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/zachleat">@zachleat</a> <a href="https://twitter.com/MarcDrummond">@MarcDrummond</a> Why not just embed as a data URI in the critical CSS? Cached, no FOUT. Example: <a href="https://t.co/tqQ03G3dhf">https://t.co/tqQ03G3dhf</a>.</p>&mdash; Wim Leers (@wimleers) <a href="https://twitter.com/wimleers/status/684874106962100224">January 6, 2016</a></blockquote>

His suggestion was to embed the font directly in a style block on the server rendered markup, something like:

{% highlight html %}
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<style>
	@font-face {
		font-family: Open Sans;
		src: url("data:application/x-font-woff;charset=utf-8;base64,...") format("woff");
		font-weight: 400;
		font-style: normal;
	}
	</style>
</head>
…
</html>
{% endhighlight %}

This approach should not to be confused with the [asynchronous `loadCSS` Data URI approach](https://www.filamentgroup.com/lab/font-loading.html) documented (but deprecated) on the Filament Group blog.

I’ve seen a similar variant of this Data URI approach used by Alibaba.com, although their approach used an external stylesheet rather than an inline style element. I talked a little bit about it at [Velocity last year](https://speakerdeck.com/zachleat/the-performance-and-usability-of-font-loading-velocity-santa-clara-2015?slide=159).

I consider this approach to be an anti-pattern for normal font loading scenarios for a few reasons:

1. It puts a large Data URI in the critical path. Remember that CSS blocks rendering. The goal here is to avoid a Flash of Invisible Text (FOIT) and minimize our Flash of Unstyled Text (FOUT). It obviously isn’t a good tradeoff to delay the entire page render to avoid FOIT and FOUT. Since [42% of web sites load more than 40KB of web font page weight](http://httparchive.org/interesting.php#bytesFont), many sites would need to put 40KB of Data URIs in their critical path, far exceeding the recommended 14KB window for critical content.
1. The font format you embed is probably not optimal. If you embed a Data URI, you’ll probably embed the WOFF format to give you ubiquity (better browser support) even though the WOFF2 format usually has about a 30% smaller footprint. Embedding a single format removes the benefit of automatic format selection that a typical comma separated `src` attribute provides. You aren’t required to list only one `src` here, but for example let’s say you embed a WOFF2 format Data URI and list the WOFF format as an alternate external url in the `src` attribute. There are still quite a few modern browsers that don’t support WOFF2 and they would load that big Data URI and still have to resort to using a fallback format URL. *(See [Appendix 1, Data URI and Fallback src](#appendix-1) below.)*
1. Ability to cache fonts suffers. This approach worsens with repeat views because the Data URI is tightly coupled to the markup and will not be cached (unless the user visits the same destination twice).
1. The other drawback [Bram Stein mentions in his latest presentation (and has a great waterfall showing it, too)](https://speakerdeck.com/bramstein/web-fonts-performance?slide=103): if you have multiple web fonts, making them all Data URIs forces them to be loaded sequentially (bad) instead of in parallel (good).

***Update**: Wim Leers has since informed me that the approach he was proposing was not inlined critical CSS, but rather a blocking CSS stylesheet, a la the approach used by Alibaba and Medium. The above drawbacks still stand, save for #3. What’s more, this approach probably exacerbates drawback #1, given the performance gains we already know exist when using Critical CSS.*

For those reasons, *this method is considered to be an anti-pattern* and should not be utilized on a production site. It may seem superficially beneficial, but it’s actually **bad for performance**.

But just for the sake of argument, let’s put it into action and see how it affects the fonts on my web site:

*(Times generated using Chrome Canary’s Developer Tools Network Throttling in Regular 3G mode)*

<table id="results-default">
	<thead>
		<tr>
			<th></th>
			<th>Default Font Loading</th>
			<th>Roman Data URI</th>
			<th>and Italic Data URI</th>
			<th>and Bold Data URI</th>
			<th>and Bold Italic Data URI</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Initial Render</th>
			<td>573ms <div>&#160;</div> 54KB HTML</td>
			<td>953ms <div class="worse">(+66%)</div> 95.7KB HTML</td>
			<td>1.27s <div class="worse">(+121%)</div> 133KB HTML</td>
			<td>1.94s <div class="worse">(+238%)</div> 175KB HTML</td>
			<td>2.30s <div class="worse">(+301%)</div> 212KB HTML</td>
		</tr>
		<tr>
			<th>Roman Loaded</th>
			<td>2.12s</td>
			<td>1.01s <div class="better">(-52%)</div></td>
			<td>1.53s <div class="better">(-28%)</div></td>
			<td>2.03s <div class="better">(-4%)</div></td>
			<td>2.38s <div class="worse">(+12%)</div></td>
		</tr>
		<tr>
			<th>Italic Loaded</th>
			<td>2.12s</td>
			<td>2.05s <div class="better">(-3%)</div></td>
			<td>1.53s <div class="better">(-28%)</div></td>
			<td>2.03s <div class="better">(-4%)</div></td>
			<td>2.38s <div class="worse">(+12%)</div></td>
		</tr>
		<tr>
			<th>Bold Loaded</th>
			<td>2.20s</td>
			<td>2.11s <div class="better">(-4%)</div></td>
			<td>2.16s <div class="better">(-2%)</div></td>
			<td>2.03s <div class="better">(-8%)</div></td>
			<td>2.38s <div class="worse">(+8%)</div></td>
		</tr>
		<tr>
			<th>Bold Italic Loaded</th>
			<td><em>N/A</em></td>
			<td><em>N/A</em></td>
			<td><em>N/A</em></td>
			<td><em>N/A</em></td>
			<td>2.38s</td>
		</tr>
	</tbody>
</table>

Interestingly enough, if you only inline the Roman version and you’re willing to sacrifice almost 400ms of extra time for initial render (wow, that is a big sacrifice), you can cut a whole second off the Roman web font rendering time. Initial render suffers even worse with a second inlined font, and if you inline more than two fonts (ignoring web font SPOF concerns) performance-wise you’re better off doing nothing (compare the 1st and 4th columns). Also note that I didn’t test repeat views in the above table because the data was conclusively negative without it.

## But wait…

The discussion started with embedding the entire web font, but what if we apply this idea to the Critical FOFT approach? What if we only inline the critical subset font? My hunch is that the subset 11KB WOFF font file (much smaller than the 40KB average) is probably still too large to put into the critical path, but let’s test it out.

*(Times generated using Chrome Canary’s Developer Tools Network Throttling in Regular 3G mode)*

_**Update March 17, 2016**: Per a discussion with [@pixelambacht](https://twitter.com/zachleat/status/710136938196443136), we were able to optimize the WOFF font file to only 5KB! I’ve updated the results below. This shaved about 5-10 more milliseconds off in the tests that I ran, so depending on your design preferences you should make your own choices about whether those optimizations are worth it._

<table id="results-foft">
	<caption>Empty Cache Visit</caption>
	<thead>
		<tr>
			<th></th>
			<th>Critical FOFT</th>
			<th>Critical Roman Data URI</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Initial Render</th>
			<td>570ms <div>&#160;</div> 58.2KB HTML</td>
			<td>580ms <div class="worse">(+1.7%)</div> 65.4KB HTML</td>
		</tr>
		<tr>
			<th>Stage 1 Render <div>(Critical Roman)</div></th>
			<td>967ms</td>
			<td>580ms <div class="better">(-40%)</div></td>
		</tr>
		<tr>
			<th>Stage 2 Render <div>(Roman, Italic, Bold, Bold Italic)</div></th>
			<td>2.70s</td>
			<td>2.42s <div class="better">(-10%)</div></td>
		</tr>
	</tbody>
</table>

Wow! No visible FOUT! This is a huge deal. The critical web font is available on first render with an empty cache on 3G. This is great! The only problem here, of course, is that for repeat views the Data URI is still inlined on the page. Let’s test that out:

<table>
	<caption>Repeat Views</caption>
	<thead>
		<tr>
			<th></th>
			<th>Critical FOFT</th>
			<th>Critical Roman Data URI</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Initial Render</th>
			<td>309ms</td>
			<td>293ms <div class="better">(-5.1%)</div></td>
		</tr>
		<tr>
			<th>Critical Roman Loaded</th>
			<td>479ms</td>
			<td>435ms <div class="better">(-12%)</div></td>
		</tr>
		<tr>
			<th>Roman Loaded</th>
			<td>479ms</td>
			<td>435ms <div class="better">(-9%)</div></td>
		</tr>
		<tr>
			<th>Italic Loaded</th>
			<td>479ms</td>
			<td>435ms <div class="better">(-9%)</div></td>
		</tr>
		<tr>
			<th>Bold Loaded</th>
			<td>479ms</td>
			<td>435ms <div class="better">(-9%)</div></td>
		</tr>
		<tr>
			<th>Bold Italic Loaded</th>
			<td>479ms</td>
			<td>435ms <div class="better">(-9%)</div></td>
		</tr>
	</tbody>
</table>

Times look marginally better here too. Huh. I think I’m gonna roll with this approach on my website and see how it plays out live. Thanks for the discussion Wim! I guess I learned here that just because something is an anti-pattern doesn’t mean you should throw the baby out with the bath water. You might get some benefit from using a piece of the approach. Data URI Critical FOFT!

<div id="appendix-1" style="margin-top: 8em"></div>
## Appendix 1, Data URI and Fallback src

{% highlight css %}
@font-face {
	/* In many browsers it loads the giant Data URI but isn’t able to use it */
	src: url("data:application/font-woff2;charset=utf-8;base64,...") format("woff2"), url( /path/to/webfont.woff ) format( "woff" );
}
{% endhighlight %}

<div class="retweettoshare">
	<h3 class="retweettoshare_title">Retweet to share this post</h3>
	<div class="retweettoshare_widget">
		<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">★ Web Font Anti-pattern: Data URIs: <a href="https://t.co/518QDCoh2W">https://t.co/518QDCoh2W</a> (or is it??)</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/709374507350249472">March 14, 2016</a></blockquote>
	</div>
</div>
