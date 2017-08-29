---
title: The Mitt Romney Web Font Problem
author: Zach Leatherman
layout: post
permalink: /mitt-romney-webfont-problem/
headimage: 'https://www.zachleat.com/web/img/posts/mittromney/face.jpg'
categories:
  - font-loading
tags:
  - highlight
  - research
  - font-loading
---

<figure>
	<img src="/web/img/posts/mittromney/face.jpg" alt="Mitt Romney at Caster Concepts">
	<figcaption><a href="https://www.flickr.com/photos/davelawrence8/6791949310">Mitt Romney at Caster Concepts by Dave Lawrence, on Flickr</a></figcaption>
</figure>

If you’ve read [the](https://dev.opera.com/articles/better-font-face/) [neverending](http://www.zachleat.com/web/foft/) [series](http://www.filamentgroup.com/lab/font-loading.html) of blog posts I’ve written about how fonts load on the web, you’re probably already become very familiar with the The Flash of Invisible Text (FOIT), or how the browser hides the text while the web font is loading.

I wanted to highlight a particular variant of FOIT, which I’ll forever refer to as the Mitt Romney Web Font Problem. This specific problem occurs when you use multiple weights and styles of the same typeface together.

In January, [James Muspratt](https://twitter.com/jmuspratt) tweeted the following image:

<figure>
	<img src="/web/img/posts/mittromney/foit.jpg" alt="Screenshot of a FOIT problem on slate.com">
	<figcaption><a href="https://twitter.com/jmuspratt/status/561239961924403200">A tweet from James Muspratt</a></figcaption>
</figure>

The headline from Slate.com was important breaking news about Mitt Romney’s intention to run for President. The headline was rendered using the <del>[Apres](http://www.fontbureau.com/fonts/Apres/)</del> [Titling Gothing FB](http://www.fontbureau.com/fonts/TitlingGothicFB/) typeface but using two different web fonts, one for bold and one for combination bold and italic. If you don’t see the italic variation above, I’ll explain why.

_**Correction: As [Stephen Coles notes in the comments](http://www.zachleat.com/web/mitt-romney-webfont-problem/#comment-2055839587) the typeface is Titling Gothic, not Apres.**_

This is how the page looks when all of the web fonts have finished loading:

<img src="/web/img/posts/mittromney/complete.jpg" alt="The finished rendering for slate.com">

Why did this happen? As you may already be aware, each web font incurs its own separate FOIT. By combining two web fonts together in a single headline, the FOIT has created a race condition that alters the integrity of the content. A glance at the headline indicates that Mitt Romney is indeed running for President. When the page finishes loading, the real message is revealed: he is, in fact, not running for President. Obviously, this is bad, and especially so for a news organization that depends on clarity and accuracy.

## What can web developers do?

1. You can use the font loading solution I’ve been prescribing and documented [over at Dev.Opera](https://dev.opera.com/articles/better-font-face/). This is by far the easiest method and will eliminate FOIT by switching to unstyled fallback text while the font is loading.
1. If you aren’t comfortable with eliminating FOIT, you can also group your font loads into a single repaint, shown in the Appendix 1 code sample below.
1. You can also use the previously documented [Flash of Faux Text](/web/foft/) approach, utilizing font-synthesis to show browser generated bold and italic fallbacks while the real web fonts load.

## What should web browsers do?

I only feel more strongly now that web browsers should fix this problem natively. They should apply the blocking font-rendering behavior in a smarter way. The browser knows when it is loading multiple `@font-face` fonts of the same typeface that have matching `font-family` properties and vary only by `font-weight` and `font-style`. It could use this information to assign a smarter priority level to each `@font-face` block.

* `font-weight` priority list: `400`, `500`, `300`, `200`, `100`, `600`, `700`, `800`, `900`
* `font-style` priority list: `normal`, `italic`, `oblique`

Coincidentally, this matches the order in which the `@font-face` matching algorithm looks for a `@font-face` block to match up with a default styled element (`font-weight: 400; font-style: normal`).

For example, if the browser is loading `@font-face` blocks for the Roman and Bold variations of a typeface, place a higher priority on the lighter weight web font (maybe even treating the heavier weights similar to how the browser treats non-matching `media` stylesheets like `print`). If the lighter Roman version finishes first, the browser can then use `font-synthesis` to also remove the FOIT for the Bold variation, showing more text sooner. When the Bold variation finishes, it can swap in to replace the Faux Bold version.

This proposed browser default behavior would solve the Mitt Romney Web Font Problem without web developers having to apply fixes to their own sites individually.

## What should Mitt Romney do?

Those of us that remember [Mitt Romney’s sordid remarks about 47% of Americans](http://www.washingtonpost.com/blogs/the-fix/wp/2013/03/04/why-mitt-romneys-47-percent-comment-was-so-bad/) know that his words may have cost him the 2012 US Presidential Election.

It is unlikely to be coincidence that just a few short weeks after the Mitt Romney Web Font Problem was documented on Twitter, HTTP Archive reported that [web font usage among the top 1000 web sites grew to 47%](http://httparchive.org/trends.php?s=Top1000&minlabel=May+15+2014&maxlabel=May+15+2015#perFonts).

The 47% continue to plague his legacy. I expect that we’ll see a press release from his media team shortly.

## Appendix 1: Keeping FOIT, Grouping Repaints

Example variable names are for the [Raleway typeface](https://www.google.com/fonts/specimen/Raleway) but are easily changed for any web font.

### CSS

{% highlight css %}
.raleway-loading body {
	color: transparent;
}
.raleway-fallback body,
.raleway-loaded body {
	color: inherit;
}
.raleway-fallback body {
	font-family: serif;
}
.raleway-loaded body {
	font-family: Raleway, serif;
}
{% endhighlight %}

### JavaScript

{% highlight js %}
var docEl = document.documentElement;
docEl.className += " raleway-loading";

// This example uses a 1 second timeout,
// adjust as needed.
window.setTimeout(function() {
	docEl.className += " raleway-fallback";
}, 1000);

// Using the CSS Font Loading API
Promise.all([
	document.fonts.load("400 1em Raleway"),
	document.fonts.load("700 1em Raleway")
]).then(function () {
	docEl.className += " raleway-loaded";
});

// Converting this to use a Polyfill syntax
// is an exercise left to the reader.
{% endhighlight %}

<div class="retweettoshare">
	<h3 class="retweettoshare_title">Retweet to share this post</h3>
	<div class="retweettoshare_widget">
		<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">★ The Mitt Romney Web Font Problem <a href="http://t.co/isHBqCaTdb">http://t.co/isHBqCaTdb</a> or why loading multiple web fonts for a single typeface is dangerous.</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/605364712663093248">June 1, 2015</a></blockquote>
	</div>
</div>
