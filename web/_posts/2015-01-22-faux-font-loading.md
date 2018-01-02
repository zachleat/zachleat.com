---
title: Flash of Faux Text—still more on Font Loading
author: Zach Leatherman
layout: post
permalink: /foft/
categories:
  - font-loading
tags:
  - research
  - highlight
  - font-loading
  - popular-posts
  - popular-posts-total
postRank: 14
daysPosted: 1076
yearsPosted: 2.9
postRankTotalViews: 14
---

***Summary**: After we’ve defeated the Flash of Invisible Text, we also want to decrease the amount of reflow a user sees when the font switches from fallback to `@font-face`. We already split our CSS into critical and deferred, why not fonts? Prioritize your fonts by **loading only your roman (or plain/normal) font first, which will cause the browser to use font synthesis to create faux-bold/italic versions automatically**. Next, trigger requests for the real bold and italic fonts. This will minimize the amount of reflow while the user is reading the content.*

<br/>

By now you’re no doubt tired of hearing my endless blathering about the perils of using the default font loading behavior. The phenomenon known as the Flash of Invisible Text, or hiding the content while the Web font loads, is terrible for the perceived performance of the web.

## Minimizing Reflow

One technique to solve this problem uses the CSS Font Loading API to add classes signifying that our fonts have successfully loaded. We can then use those classes in our CSS selectors to kill the FOIT altogether. Usually this involves a class (and a repaint/reflow) for each individual font that loads. You can read more about this technique at [Dev.Opera](https://dev.opera.com/articles/better-font-face/).

Another technique to solve this problem involves embedding fonts as Data URIs inside of a single CSS file that we load asynchronously. This method groups our fonts into one large request that only triggers a single combined repaint/reflow for your font bundle. You can read more about this technique in the [Filament Group Lab](http://www.filamentgroup.com/lab/font-loading.html).

Of course, the amount of repaint/reflow is really up to you and is not tied to either method. You could use a single class addition (one repaint/reflow) when all of the fonts have successfully loaded using the CSS Font Loading API or you could load individual CSS files with Data URIs (multiple repaints/reflows). If you’d like code snippets showing how to achieve this, please ask me on [twitter](https://twitter.com/zachleat/).

## Font Variants

An important piece of this puzzle is that the fonts that we choose to load are sometimes different weights and styles of the same typeface. For example, this site uses Lato (with a roman font-weight, 400, and normal font-style), but also Lato (bold), Lato (italic), and Lato (bold italic). This is four different font files.

<table>
	<thead>
		<tr>
			<th>Lato Font Format</th>
			<th>Combined Size of Four Variants</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>TrueType</td>
			<td>254 KB</td>
		</tr>
		<tr>
			<td>WOFF</td>
			<td>128 KB</td>
		</tr>
		<tr>
			<td>WOFF2</td>
			<td>102 KB</td>
		</tr>
	</tbody>
</table>

Remember that after we’ve defeated the Flash of Invisible Text, we’ve decreased the delay in which a user must suffer before they can become a reader of our content. So what happens when the web fonts finish loading while the user is in the middle of reading a particularly juicy paragraph on our page? If your fallback font has a different `line-height` than your web font, it could reflow your user’s viewport to a completely different location in the text.

Of course, one way to attempt to solve this problem is to fiddle with the `line-height` and `letter-spacing` of your fallback font. [Jason Pamental has covered this topic extensively in his Fonts.com post: *Web Font Tune-up Time: A Fun Font Fallback Event*](http://blog.fonts.com/2011/08/web-font-tune-up-time-a-fun-font-fallback-event/).

## Prioritize Your Fonts

However, here I’m proposing that we split our font bundles into two separate packages. First, we would just load the Roman weight (`font-weight: normal;` and `font-style: normal;`). This would cause the biggest reflow to our content. **This will also trigger the browser to use [`font-synthesis`](https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/) to create faux-bold and faux-italic versions of our web font**. We’ll use these fake variants while we trigger the second request for our real Bold, Italic, and Bold Italic variants.

<table>
	<thead>
		<tr>
			<th>Lato Font Format</th>
			<th>Stage 1:<br/>Roman Size</th>
			<th>Stage 2:<br/>Combined Size of Bold, Italic, Bold Italic Variants</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>TrueType</td>
			<td>63 KB</td>
			<td>191 KB</td>
		</tr>
		<tr>
			<td>WOFF</td>
			<td>31 KB</td>
			<td>97 KB</td>
		</tr>
		<tr>
			<td>WOFF2</td>
			<td>25 KB</td>
			<td>77 KB</td>
		</tr>
	</tbody>
</table>

On slower connections, this purposefully moves from a single delayed reflow to a two-stage reflow, the first of which should be the most jarring to our reader. We move that first reflow up the waterfall to happen as soon as possible and the likely more minimal faux-bold/italic to real-bold/italic reflow would happen later.

Try it out on this page, I’ve implemented this approach on my site. Open up the Chrome DevTools with device mode enabled and throttle your Network connection down to EDGE. Try reloading this page and watch the three stages:

[![Flash of Unstyled Text for zachleat.com](/web/img/posts/foft/fout.png)](/web/img/posts/foft/fout.png)
*Stage 0 **FOUT**: Flash of Unstyled Text, zero web fonts loaded.*

[![Flash of Faux-Text for zachleat.com](/web/img/posts/foft/foft.png)](/web/img/posts/foft/foft.png)
*Stage 1 **FOFT**: Flash of Faux Text, only one web font loaded.*

[![Finished screenshot of zachleat.com](/web/img/posts/foft/finished.png)](/web/img/posts/foft/finished.png)
*Stage 2 **Finished**: All web fonts loaded.*

## The Code

As mentioned, my blog is currently using this experiment in font loading. Here is the JavaScript and CSS I used to implement it, using the [`fontfaceonload` polyfill](https://github.com/zachleat/fontfaceonload).

{% highlight js %}
FontFaceOnload( "Lato", {
	success: function() {
		var docEl = doc.documentElement;
		
		// Stage 1 Complete
		// FOFT engaged
		docEl.className += " lato-loaded";

		var counter = 0;
		var success = function() {
			counter++;
			if( counter === 3 ) {
				// Stage 2 Complete
				// All Fonts Loaded
				docEl.className += " lato-b-loaded";
			}
		};

		FontFaceOnload( "LatoBold", {
			weight: 700,
			success: success
		});
		FontFaceOnload( "LatoItalic", {
			style: 'italic',
			success: success
		});
		FontFaceOnload( "LatoBoldItalic", {
			weight: 700,
			style: 'italic',
			success: success
		});
	}
});
{% endhighlight %}

[*See the full JavaScript for the zachleat.com Implementation of the FOFT.*](https://github.com/zachleat/zachleat.com/blob/e7912017032a731cf6f958c94cacaae35b23a839/web/js/initial.js#L42)

{% highlight css %}
body {
	font-family: sans-serif;
}
/* Stage 1 */
.lato-loaded body {
	font-family: Lato, sans-serif;
}

/* 
 * Stage 2
 * The rest of this CSS is to work around
 * the separate font-family limitation
 * described below.
 */

.lato-b-loaded h1,
.lato-b-loaded h2,
.lato-b-loaded h3,
.lato-b-loaded h4,
.lato-b-loaded h5,
.lato-b-loaded strong {
	font-family: LatoBold;
}
.lato-b-loaded em,
.lato-b-loaded blockquote {
	font-family: LatoItalic;
}
.lato-b-loaded strong em,
.lato-b-loaded strong blockquote,
.lato-b-loaded em strong,
.lato-b-loaded blockquote strong {
	font-family: LatoBoldItalic;
}
{% endhighlight %}

*[See the full CSS for the zachleat.com Implementation of the FOFT](https://github.com/zachleat/zachleat.com/blob/e7912017032a731cf6f958c94cacaae35b23a839/web/css/_buttsweater.scss) with the [`@font-face` blocks hidden at the bottom](https://github.com/zachleat/zachleat.com/blob/e7912017032a731cf6f958c94cacaae35b23a839/web/css/_buttsweater.scss#L636).*

***Important Note**: you have to use different aliased `font-family` names for each `@font-face` block used here. If not, your second stage (the Flash of Faux-Text) will suffer the same Flash of Invisible Text problem that we’re trying to avoid with font loading.*

This does make one wonder if it would be useful to have Browsers use this internally by making bold and italic variants a lower priority than roman. Blink already uses a similar approach with non-applicable `media` queries on `<link>` elements for CSS, why not fonts?

<div class="retweettoshare">
	<h3 class="retweettoshare_title">Retweet to share this post</h3>
	<div class="retweettoshare_widget">
		<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">★ The Flash of Faux-Text—still more on Font Loading: <a href="http://t.co/1ubntrjKgd">http://t.co/1ubntrjKgd</a> Load normal weight first; show faux-bold while real bold loads.</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/558608085309468672">January 23, 2015</a></blockquote>
	</div>
</div>
