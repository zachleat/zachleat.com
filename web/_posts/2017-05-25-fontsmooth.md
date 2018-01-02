---
title: Laissez-faire Font Smoothing and Anti-aliasing
author: Zach Leatherman
layout: post
permalink: /font-smooth/
categories:
  - font-loading
tags:
  - research
  - highlight
  - popular-posts
postRank: 17
daysPosted: 222
yearsPosted: 0.6
---

_Recently, Twitter made a global anti-aliasing CSS change to their website. Before writing this post, I didn’t know very much about anti-aliasing—so I decided to learn everything I could about it to better understand the reasoning behind a decision like that. Here’s what I learned._

Controlling anti-aliasing modes in CSS is easy. A little too easy <a href="https://en.wikipedia.org/wiki/Tin_foil_hat"><img src="/web/img/posts/font-smooth/tinfoilhat.png" alt="Tin foil hat" style="height: 1em"></a>. There are two non-standardized, implemented vendor-prefixed properties to control anti-aliasing on text: <code class="nowrap">-webkit-font-smoothing</code> and <code class="nowrap">-moz-osx-font-smoothing</code>. The full browser support matrix is available under <a href="http://caniuse.com/#feat=font-smooth">`font-smooth`on Can I Use</a>. But before we dive in, let’s level set on what the values for these properties are:

* Disabled:
	* `-webkit-font-smoothing: none`
	* In my tests, Firefox had no mechanism to disable font smoothing 👍
* Grayscale anti-aliasing (also known as Full pixel or Traditional anti-aliasing)
	* `-webkit-font-smoothing: antialiased;`
	* `-moz-osx-font-smoothing: grayscale;`
* [Subpixel anti-aliasing](https://en.wikipedia.org/wiki/Subpixel_rendering)
	* `-webkit-font-smoothing: subpixel-antialiased`
* Let the browser decide (Uses subpixel anti-aliasing when available; this is the default)
	* `-webkit-font-smoothing: auto`
	* `-moz-osx-font-smoothing: auto`

### Try it out on this page

<form class="livedemo">
	<fieldset class="fs-fieldset fs-choose" id="fs-choose">
		Anti-aliasing: 
		<label><input type="radio" name="choose" value="fs-none"><code>None</code></label>
		<label><input type="radio" name="choose" value="fs-antialias"><code>Grayscale</code></label>
		<label><input type="radio" name="choose" value="fs-auto" checked><code>Auto</code></label>
		<label><input type="radio" name="choose" value="fs-subpixel"><code>Subpixel</code></label>
	</fieldset>
</form>

## What’s the difference between these modes?

To get a closer look, I strapped a cheap 25x macro lens to my smartphone and took some pictures. They’re pretty distorted around the edges because of the lens, but they’re good enough to see what’s going on.

<video controls preload="metadata" loop src="/web/img/posts/font-smooth/antialiasing.mp4">
  Sorry, your browser doesn't support embedded videos. Try <a href="/web/img/posts/font-smooth/antialiasing.mp4">downloading it</a> instead.
</video>

When you zoom in on the image, you can see the individual pixels—each with their own red, green, and blue lights! Fascinating!

Compare the three different modes below. _These photos were taken of 24px text using the Times typeface displayed on an LG UM95 Ultra Widescreen monitor (109dpi, a low DPI makes it easier to see)._

<div class="grid-3">
	<figure>
		<img src="/web/img/posts/font-smooth/disabled.jpg" alt="">
		<figcaption>Anti-aliasing is disabled.</figcaption>
	</figure>
	<figure>
		<img src="/web/img/posts/font-smooth/grayscale.jpg" alt="">
		<figcaption>Grayscale or full pixel anti-aliasing.</figcaption>
	</figure>
	<figure>
		<img src="/web/img/posts/font-smooth/subpixel.jpg" alt="">
		<figcaption>Subpixel anti-aliasing.</figcaption>
	</figure>
</div>

<div class="grid-3">
	<figure>
		<img src="/web/img/posts/font-smooth/disabled-zoom-annotated.jpg" alt="">
		<figcaption>Anti-aliasing is disabled. Note that the pixel is either on or off. Not partially illuminated.</figcaption>
	</figure>
	<figure>
		<img src="/web/img/posts/font-smooth/grayscale-zoom-annotated.jpg" alt="">
		<figcaption>Grayscale or full pixel anti-aliasing. Note that the highlighted pixel is partially illuminated (with each red, green, and blue light illuminated the same amount).</figcaption>
	</figure>
	<figure>
		<img src="/web/img/posts/font-smooth/subpixel-zoom-annotated.jpg" alt="">
		<figcaption>Subpixel anti-aliasing. Note that in the highlighted pixel, the red and green lights are illuminated but the blue is not.</figcaption>
	</figure>
</div>

Remember that hexadecimal color values have 2 hex digits for red, 2 digits for green, and 2 digits for blue? Note that when those values are all the same (`#eeeeee`, `#222222`, or `#666666`), the color is a shade of gray. The same principle applies for the pixels in grayscale anti-aliasing. When each red, green, and blue light are illuminated the same, the pixel appears to be gray.

Subpixel anti-aliasing uses a similar technique, but with the full RGB color pallette. Making a pixel red means that only the left third of the pixel will be illuminated, which gives us additional rendering precision.

While subpixel anti-aliasing is considered to be state of the art, hardware advancements are rendering `(͡° ͜ʖ ͡°)` it unnecessary. On HDPi or retina screens, subpixel anti-aliasing is increasingly unnecessary to render an accurate portrayal of a glyph. The more pixels you have to work with, the more effective grayscale anti-aliasing is. That’s why it’s unlikely that iOS will ever support subpixel anti-aliasing, saving them the work of supporting the `font-smooth` property.

<figure>
	<img src="/web/img/posts/font-smooth/apple-iphone-6-grayscale.jpg" alt="">
	<figcaption>Apple’s iPhone 6 (326dpi), showing horizontal stripe pixel geometry, <span style="background-color: #f00; color: #fff; padding: 0 .25em">Red</span><span style="background-color: #0f0; color: #fff; padding: 0 .25em">Green</span><span style="background-color: #00f; color: #fff; padding: 0 .25em">Blue</span>, and grayscale anti-aliasing. Note that this display also <a href="http://www.anandtech.com/show/8509/understanding-dual-domain-pixels-in-the-iphone-6-and-iphone-6-plus">uses “Dual Domain” pixels, which are skewed at alternating angles</a>.</figcaption>
</figure>

But not all screens share the same horizontal stripe [pixel geometry](https://en.wikipedia.org/wiki/Pixel_geometry#cite_note-1). Here’s a Google Pixel smartphone, using a diamond subpixel shape called [PenTile](https://en.wikipedia.org/wiki/PenTile_matrix_family) (trademarked by Samsung). As the picture shows, PenTile clearly does support subpixel anti-aliasing, but does *not* support controlling it with the `-webkit-font-smoothing` property. A diamond configuration is likely to handle subpixel rendering in different orientations better than a horizontal stripe could.

<figure>
	<img src="/web/img/posts/font-smooth/google-pixel-subpixel.jpg" alt="">
	<figcaption>Google’s Pixel (441dpi), showing <a href="https://en.wikipedia.org/wiki/PenTile_matrix_family">PenTile pixel geometry</a> (a diamond shape) with subpixel anti-aliasing.</figcaption>
</figure>

## So, Twitter made a change

Recently [twitter.com](https://twitter.com/) switched their website to force grayscale anti-aliasing on HiDPI screens:

{% highlight css %}
@media screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 2dppx) {
	body {
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
	}
}
{% endhighlight %}

Asthetically as we’ve seen, using grayscale anti-aliasing makes things appear lighter and thinner. It’s usually employed to lighten text or icons that are placed on dark backgrounds, almost as a shortcut to avoid loading an additional (but perhaps more appropriate) Light or Hairline web font. It is unusual to apply this change to a site globally but from a technical perspective it is consistent with iOS’ preference for grayscale anti-aliasing. Perhaps it would clash with Android’s embrace of subpixel anti-aliasing if `-webkit-font-smoothing` were supported there.

To see more big players in the `font-smooth` game, <a href="https://developer.microsoft.com/en-us/microsoft-edge/platform/usage/css/-webkit-font-smoothing/">check out the Microsoft Edge CSS Usage list</a>. _Related: <a href="https://twitter.com/zachleat/status/872073432883712000">yahoo.com does some weird stuff.</a>_

## Conclusion

Taking a “smoke ’em if you got ’em” approach to subpixel anti-aliasing feels warranted here. It seems silly to opt-out of a technically superior subpixel approach if it’s supported on the user’s platform and browser.

Platforms that support subpixel rendering may or may not support `font-smooth` to control it—Android is a prime example of this. After reading issues on web browser bug trackers, it almost seems like the browsers that did implement this now regret doing so. But independent of `font-smooth` support, subpixel anti-aliasing is not going away any time soon—even if iOS holds out forever.

The safe bet here is to defer to browser and platform defaults and only use `font-smooth` overrides sparingly and as a last resort.

## Sources

* [Please Stop “Fixing” Font Smoothing](http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/) (2012) from [Dmitry Fadeyev](https://twitter.com/usabilitypost)
* [Anti-aliasing 101](https://www.html5rocks.com/en/tutorials/internals/antialiasing-101/) (2013) from [Paul Lewis (@aerotwist)](https://twitter.com/aerotwist). It appears that some of the layering criteria may be outdated here. The first three sections are great though.
* [MDN `font-smooth`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth)
* [Font Smoothing Explained](http://szafranek.net/blog/2009/02/22/font-smoothing-explained/) (2009) from [Krzysztof Szafranek](https://twitter.com/szafranek)
* [Sub-pixel text rendering](https://bjango.com/articles/subpixeltext/) (2012) by [Bjango](https://twitter.com/bjango)
* [Understanding Sub-Pixel (LCD Screen) Anti-Aliased Font Rendering](http://alienryderflex.com/sub_pixel/) (2007) from Darel Rex Finley
* [Anti-Aliasing on the iPhone](https://daringfireball.net/2007/12/anti_aliasing_on_the_iphone) (2007) from John Gruber

<div class="retweettoshare">
	<h3 class="retweettoshare_title">Retweet to share this post</h3>

	<div class="retweettoshare_widget">
		<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">★ Laissez-Faire Font Smoothing and Anti-aliasing <a href="https://t.co/mIxWPADXel">https://t.co/mIxWPADXel</a><br><br>Learn about `-webkit-font-smoothing` and `-moz-osx-font-smoothing`</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/874968707239297025">June 14, 2017</a></blockquote>
	</div>
</div>

<style>
.fs-choose {
	display: none;
}
@media ( max-width: 34.9375em /* 559px */ ) {
	.fs-choose label {
		display: block;
	}
}
.fs-fieldset {
	border: none;
	padding: .5em 0;
}
.fs-auto {
	-webkit-font-smoothing: auto;
	-moz-osx-font-smoothing: auto;
}
.fs-antialias {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.fs-subpixel {
	-webkit-font-smoothing: subpixel-antialiased;
}
.fs-none {
	-webkit-font-smoothing: none;
	-moz-osx-font-smoothing: unset;
}
</style>
<script>
(function() {
	if( "querySelectorAll" in document && "classList" in document.body ) {
		var chooser = document.getElementById( "fs-choose" );
		chooser.style.display = "block";

		// Radio picker
		var radios = Array.prototype.slice.call( chooser.querySelectorAll( 'input[type="radio"]' ) );
		var classes = [];
		var docEl = document.documentElement;
		radios.forEach(function( radio ) {
			classes.push( radio.value );
			radio.addEventListener( "click", function( e ) {
				if( this.checked ) {
					classes.forEach(function( cls ) {
						docEl.classList.remove( cls );
					});
					docEl.classList.add( this.value );
				}
			}, false );
		});
	}
})();
</script>
