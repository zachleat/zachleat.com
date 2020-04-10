---
title: The Web Font Loading Glossary
categories:
  - font-loading
tags:
  - font-loading
---

After publishing [The Comprehensive Guide to Font Loading Strategies](/web/comprehensive-webfonts/), I had a few requests to define a few terms used there. This document is a response to those requests. If something is missing below, please [let me know on Twitter @zachleat](https://twitter.com/zachleat) or in the comments.

<ul>
	<li><a href="#foft">FOFT</a></li>
	<li><a href="#foit">FOIT</a></li>
	<li><a href="#descriptor">@font-face Descriptors</a></li>
	<li><a href="#font-face-matching">Font Matching Algorithm</a></li>
	<li><a href="#font-synthesis">Font Synthesis, also Faux-bold and Faux-italic</a></li>
	<li><a href="#fout">FOUT</a></li>
	<li><a href="#roman">Roman font</a></li>
	<li><a href="#subsetting">Subsetting</a></li>
	<li><a href="#system-fonts">System Fonts</a></li>
</ul>

---

<dl>
	<dt id="descriptor">@font-face Descriptors</dt>
	<dd>Descriptors are key-value pairs inside of the <code>font-face</code> block. Often incorrectly referred to as properties (properties are on the DOM elements themselves). Examples include <code>font-display</code>, <code>font-weight</code>, <code>font-style</code>, and a few others.</dd>
	<dt id="font-face-matching">Font Matching Algorithm</dt>
	<dd>How the browser matches a <code>font-family</code> CSS property on an element to an appropriate <code>@font-face</code> block. Not all the properties have to match exactly to descriptors—just the <code>font-family</code>. The rest are fuzzy-matched. If there isn’t an exact match, this may result in <a href="#font-synthesis">font synthesis</a>. Read more at <em><a href="/web/lazy-loading-webfonts/">Lazy Loading Web Fonts is Probably Not What You Want</a></em> and the <a href="https://www.w3.org/TR/css-fonts-3/#font-matching-algorithm">W3C specification</a>.</dd>
	<dt id="font-synthesis">Font Synthesis, also Faux-bold and Faux-italic</dt>
	<dd>Controls how bold and italic variations of a roman web font are rendered, if independent web fonts for these variations don’t have appropriately matched @font-face blocks. Also known as <strong>Faux-bold</strong> or <strong>Faux-italic</strong> rendering. Use the <a href="https://github.com/filamentgroup/faux-pas">Faux-pas</a> project to highlight when this happens on your site. A few browsers support the <code>font-synthesis</code> CSS property to control this (see the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis#Browser_Compatibility">MDN Browser Compatibility for <code>font-synthesis</code></a>). Read more at the <a href="https://www.w3.org/TR/css-fonts-3/#font-synthesis-prop">W3C Specification</a>.</dd>
	<dt id="system-fonts">System Fonts</dt>
	<dd>Fonts that are available locally on an operating system without making any network requests. Think Helvetica or Arial, Times or Times New Roman. Availability varies by operating system. Search <a href="http://fontfamily.io/">fontfamily.io</a> for compatibility information.</dd>
	<dt id="subsetting">Subsetting</dt>
	<dd>Modifying the font file to include only a small portion of the original glyphs and features, typically used to optimize a font file for a single language on the web. This can be dangerous because no language is an island—proper nouns can crop up in many different places! This results in smaller font files but may also violate your font’s license agreement. Use with the <code>unicode-range</code> descriptor for even better results. The <a href="https://github.com/filamentgroup/glyphhanger">glyphhanger</a> tool can help you diagnose what characters you need on a statically generated site to better subset your web font files.</dd>
	<dt id="roman">Roman font</dt>
	<dd>Traditionally lowercased, roman is used to mean non-italic but in my experience (while perhaps not pedantically correct) it’s usually extended to non-bold as well. The “regular” font. Read a <a href="https://english.stackexchange.com/questions/16090/whats-the-most-appropriate-name-for-non-italicized-text-roman-or-upright">Non-italicized FAQ on Stack Exchange</a> or <a href="https://en.wikipedia.org/wiki/Emphasis_(typography)#Design">Emphasis on Wikipedia</a>.</dd>
</dl>

## Acronyms

<dl>
	<dt id="foit">FOIT</dt>
	<dd>Flash of Invisible Text: Default browser behavior to render text invisible while the web font is loading. In modern browsers, FOIT lasts a maximum of three seconds. Sometimes when I’m being incredibly accurate (pedantic), I’ll differentiate between FOIT ∞ and FOIT 3s by including the timeout as a suffix. When people say that web fonts are blocking resources, they are likely referring to FOIT. FOIT is our enemy.</dd>
	<dt id="fout">FOUT</dt>
	<dd>Flash of Unstyled Text: Default behavior to render text with the fallback <a href="#system-fonts">system font</a> while the web font has loaded. Fallback text renders after the FOIT timeout has passed—usually three seconds. Internet Explorer and Edge don’t wait—they render fallback text <em>immediately</em> ❤️. FOUT is preferable to FOIT but care must be taken to minimize its reflow effect.</dd>
	<dt id="foft">FOFT</dt>
	<dd><a href="/web/foft/">Flash of Faux Text</a>: A font loading strategy to render a roman web font first, and then use <code>font-synthesis</code> to render bold and italic variations immediately while the remaining true bold and true italic web font variations continue to load.</dd>
</dl>

<div class="retweettoshare">
	<h3 class="retweettoshare_title">Retweet to share this post</h3>
	<div class="retweettoshare_widget">
		<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">★ The Web Font Loading Glossary, a companion to the Font Loading Strategies Guide <a href="https://t.co/RRzVWDrPMB">https://t.co/RRzVWDrPMB</a><br><br>Hopefully more beginner-friendly!</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/897092905617281024">August 14, 2017</a></blockquote>
	</div>
</div>
