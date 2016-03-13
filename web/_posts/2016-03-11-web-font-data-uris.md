---
title: 'Web Font Anti-pattern: Data URIs'
author: Zach Leatherman
layout: post
permalink: /web-font-data-uris/
categories: 
tags:
 - research
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

This approach is an anti-pattern for a few reasons:

1. It puts a large Data URI in the critical path. Remember that CSS blocks rendering. Remember the goal here, we’re trying to avoid a Flash of Invisible Text (FOIT) and minimize our Flash of Unstyled Text (FOUT). It obviously isn’t a good tradeoff to delay the entire page render to avoid FOIT and FOUT. Since [42% of web sites load more than 40KB of web font page weight](http://httparchive.org/interesting.php#bytesFont), most sites would need to put 40KB of Data URIs in their critical path, far exceeding the recommended 14KB window for critical content. To be fair, the developer above was suggesting embedding only the critical subset font as a Data URI. I’d still consider that 9KB font file to be too large to put into the critical path. 9KB is 64% of your 14KB budget, and that leaves you only 5KB for HTML and CSS. That is just not enough.
1. The font format you embed is probably not optimal. If you embed a Data URI, you’ll probably embed the WOFF format to give you ubiquity (better browser support) even though the WOFF2 format usually has about a 30% smaller footprint. Embedding a single format removes the benefit of automatic format selection that a typical comma separated `src` attribute provides. You aren’t required to list only one `src` here, but for example let’s say you embed a WOFF2 format Data URI and list the WOFF format as an alternate external url in the `src` attribute. There are still quite a few modern browsers that don’t support WOFF2 and they would load that big Data URI and still have to resort to using a fallback format URL. *(See [Example 1, Data URI and Fallback src](#example-1) below.)*
1. The other drawback [Bram Stein mentions in his latest presentation (and has a great waterfall showing it, too)](https://speakerdeck.com/bramstein/web-fonts-performance?slide=103): if you have multiple web fonts, making them all Data URIs forces them to be loaded sequentially (bad) instead of in parallel (good).

For those three reasons, *this method is considered to be an anti-pattern* and should not be utilized on a production site. It may seem superficially beneficial, but it’s actually **bad for performance**.


<span id="example-1"></span>
## Example 1, Data URI and Fallback src

{% highlight css %}
/* In many browsers it loads the giant Data URI but isn’t able to use it */
src: url("data:application/font-woff2;charset=utf-8;base64,...") format("woff2"), url( /path/to/webfont.woff );
{% endhighlight %}