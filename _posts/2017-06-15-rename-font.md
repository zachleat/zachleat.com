---
title: 'Font Aliasing, or How to Rename a Font in CSS'
categories:
  - font-loading
tags:
  - research
  - highlight
tweet: https://twitter.com/zachleat/status/880392657847160832
---

Are you tired of developers abusing the smooth traditionalism of Helvetica? Do you wish your web page was a little bit more fun? Do you also want to avoid discussing things with your peers? Well, do I have some code for you. Add this little block into your project and it will globally alias (rename) Helvetica to Comic Sans MS (and Chalkboard SE, [browser support](https://fontfamily.zachleat.dev/Comic_Sans_MS,Chalkboard_SE)). _(Yes, I know I recently wrote a blog post about [anti-aliasing](/web/font-smooth/)—that’s a different thing.)_

``` css
@​font-face {
	font-family: Helvetica;
	src: local(Comic Sans MS), local(Chalkboard SE);
}
```

If you follow me on Twitter, you may have seen this idea before in <a href="https://twitter.com/zachleat/status/599600783399739392">2015</a>, and, uh, also in <a href="https://twitter.com/zachleat/status/540267060702744576">2014</a>.

<style>
@font-face {
	font-family: Helvetica;
	src: local(Comic Sans MS), local(Chalkboard SE);
}
</style>

<p class="livedemo" style="font-family: Helvetica">&lt;p style=&quot;font-family: Helvetica&quot;&gt;This is an end-around for any font family properties you have specified, no matter the block’s selector specificity. Think you can use <code>!important</code> to override? Think again.&lt;/p&gt;</p>

Let’s check [the specification](https://www.w3.org/TR/css-fonts-3/#font-family-desc):

> If the font family name is the same as a font family available in a given user's environment, it effectively hides the underlying font for documents that use the stylesheet. This permits a web author to freely choose font-family names without worrying about conflicts with font family names present in a given user's environment.

The specification allows for this because the alternative—worrying about naming conflicts on every user agent—would be horrific!

## Valid local()’s

What are valid values for `local()`? If you’re think you can just add any `font-family` name—no, not quite. Let’s consult [the specification](https://www.w3.org/TR/2013/WD-css3-fonts-20130212/#src-desc) again:

> The locally installed &lt;font-face-name&gt; is a format-specific string that uniquely identifies a single font face within a larger family.

> For OpenType and TrueType fonts, this string is used to match only the Postscript name or the full font name in the name table of locally available fonts. Which is used varies by platform and font, so authors should include both of these names to assure proper matching across platforms.

Okay, we feed `local()` a PostScript or Full Font name. How do we find those?

If you have Mac OS, open up the default font browser—Font Book—and select a font. In the menu bar, select `View ➡ Show Font Info` and the right pane will show both the PostScript name and Full name values.

<picture>
  <source type="image/webp" srcset="/web/img/posts/aliasing/font-info.webp">
  <img src="/web/img/posts/aliasing/font-info.png" alt="How to find the Full Font and PostScript font names in Font Book">
</picture>

Keep in mind that you can’t override generic family keywords, like `serif`, `sans-serif`, `cursive`, `fantasy`, or `monospace`. Not even if you quote them in your `font-family` property, although pedantically speaking this should probably work since `font-family: "serif"` refers to something different than `font-family: serif`.

## Facebook’s San Francisco Trick

Sometimes I casually browse how different web sites I’m visiting are using @font-face. I [stumbled upon Facebook using this trick](https://twitter.com/zachleat/status/872578935921545216) to their advantage in a clever way. Have a look:

``` css
@font-face {
	font-family: 'San Francisco';
	font-weight: 300;
	src: local('-apple-system')
}

@font-face {
	font-family: 'San Francisco';
	font-weight: 400;
	src: local('.SFNSText-Regular')
}

@font-face {
	font-family: 'San Francisco';
	font-weight: 500;
	src: local('-apple-system')
}

@font-face {
	font-family: 'San Francisco';
	font-weight: 600;
	src: local('-apple-system')
}

@font-face {
	font-family: 'San Francisco';
	font-weight: 700;
	src: local('.SFNSText-Semibold')
}

@font-face {
	font-family: 'San Francisco';
	font-weight: 800;
	src: local('-apple-system')
}

#facebook ._-kb.sf {
	font-family: San Francisco, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
}
```

Very cool! They’ve aliased a bunch of `local` references in the @font-face sources to simplify their `font-family` property value a bit, varying local sources by `font-weight`. Let’s dive in with some reduced/separated demos and test cases to fully understand it.

_Update: I discovered later that the [System Font CSS](#system-font-css) project used this approach back in 2015, likely predating Facebook’s implementation._

## Live Demos

*Note: The fallbacks in the demos below are mapped to `fantasy`. If you see `fantasy`, the alias didn’t work. On Apple products (where San Francisco is likely to be available) [`fantasy` renders as Papyrus](https://fontfamily.zachleat.dev/fantasy).*

### -apple-system

``` css
@font-face {
	font-family: San Francisco Apple System;
	src: local(-apple-system);
}
```

<style>
@font-face {
	font-family: San Francisco Apple System;
	src: local(-apple-system);
}
</style>

<span class="livedemo" style="font-family: San Francisco Apple System, fantasy;">San Francisco aliased from <code>local(-apple-system)</code></span> <span class="caption"><strong>Supported</strong> in Safari (Mobile and Desktop) and <strong>Not Supported</strong> in Chrome, Firefox (as of 54)</span>

### BlinkMacSystemFont

``` css
@font-face {
	font-family: San Francisco Blink;
	src: local(BlinkMacSystemFont);
}
```

<style>
@font-face {
	font-family: San Francisco Blink;
	src: local(BlinkMacSystemFont);
}
</style>

<span class="livedemo" style="font-family: San Francisco Blink, fantasy;">San Francisco aliased from <code>local(BlinkMacSystemFont)</code></span> <span class="caption"><strong>Not Supported</strong> in Chrome, Firefox (as of 54), Safari (as of 10.1)</span>

### PostScript Names

``` css
@font-face {
	font-family: San Francisco PostScript Name;
	src: local(.SFNSText-Regular);
}
```

<style>
@font-face {
	font-family: San Francisco PostScript Name;
	src: local(.SFNSText-Regular);
}
</style>

<span class="livedemo" style="font-family: San Francisco PostScript Name, fantasy;">San Francisco aliased from <code>local(.SFNSText-Regular)</code></span> <span class="caption"><strong>Not Supported</strong> in Chrome, Firefox (as of 54), Safari (as of 10.1)</span>

``` css
@font-face {
	font-family: San Francisco PostScript Name Quoted;
	src: local('.SFNSText-Regular');
}
```

<style>
@font-face {
	font-family: San Francisco PostScript Name Quoted;
	src: local('.SFNSText-Regular');
}
</style>

<span class="livedemo" style="font-family: San Francisco PostScript Name Quoted, fantasy;">San Francisco aliased from <code>local('.SFNSText-Regular')</code></span> <span class="caption"><strong>Supported</strong> in Firefox, Safari (Desktop) and <strong>Not Supported</strong> in Chrome, Mobile Safari</span>

### system-ui

Standardization is taking place around [the `system-ui` value](https://drafts.csswg.org/css-fonts-4/#system-ui-def), hopefully coming soon to [Can I Use](https://github.com/Fyrd/caniuse/issues/2918). Even better—looks like Chrome has moved forward with this!

<span class="livedemo" style="font-family: system-ui, fantasy;">Not aliased at all, just using <code>font-family: system-ui</code></span> <span class="caption"><strong>Supported</strong> in Chrome and <strong>Not Supported</strong> in Firefox (as of 54), Safari (as of 10.1)</span>

And Chrome’s implementation supports using it as an alias source too! Given that `BlinkMacSystemFont` did not work as an alias source, I was delighted to see that `system-ui` did.

``` css
@font-face {
	font-family: San Francisco System UI;
	src: local(system-ui);
}
```

<style>
@font-face {
	font-family: San Francisco System UI;
	src: local(system-ui);
}
</style>

<span class="livedemo" style="font-family: San Francisco System UI, fantasy;">San Francisco aliased from <code>local(system-ui)</code></span> <span class="caption"><strong>Supported</strong> in Chrome and <strong>Not Supported</strong> in Firefox (as of 54), Safari (as of 10.1)</span>

### Final, Reduced Code

Combining the above test cases results in a simplified version of the San Francisco alias that works in Chrome, Safari (Desktop and Mobile), and Firefox. Notably, this renders `BlinkMacSystemFont` unnecessary. It also doesn’t require any additional values in the `font-family` properties littered throughout your CSS. Clean and efficient!

``` css
@font-face {
	font-family: My San Francisco Alias;
	src: local(system-ui), local(-apple-system), local('.SFNSText-Regular');
}
p {
	font-family: My San Francisco Alias, fantasy;
}
```

<style>
@font-face {
	font-family: My San Francisco Alias;
	src: local(system-ui), local(-apple-system), local('.SFNSText-Regular');
}
</style>

<p class="livedemo" style="font-family: My San Francisco Alias, fantasy;">This should work everywhere San Francisco is available.<!-- <span style="font-weight: 700">Here is some bold.</span> <span style="font-style: italic;">Here is some italic.</span> <span style="font-weight: 700; font-style: italic;">Here is some italic bold.</span> --></p>

## Further Explorations

* You could expand the San Francisco alias to support all of the weights Facebook listed above (and maybe even italic styles too). Check out the [System Font CSS](#system-font-css) project in the sources below.
* When a locally aliased font doesn’t find an exact match for weight/style, [does it use font-synthesis to render faux bold or faux italic](https://github.com/filamentgroup/faux-pas/issues/1)?

## Sources

* <span id="system-font-css"></span>[System Font CSS](https://github.com/jonathantneal/system-font-css) by [Jonathan Neal](https://twitter.com/jon_neal), an awesome project to polyfill `system-ui`. Although I discovered this late, it likely predates Facebook’s code above and may even be the origin of this aliased approach for system fonts. It’s certainly the earliest use of it that I’ve seen (commits from 2015).
* [System Font Stack](https://css-tricks.com/snippets/css/system-font-stack/) by [Geoff Graham](https://twitter.com/geoffreygraham)
* [Using UI System Fonts In Web Design: A Quick Practical Guide](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/) by [Marcin Wichary](https://twitter.com/mwichary)
* [I Left My System Fonts in San Francisco](http://furbo.org/2015/07/09/i-left-my-system-fonts-in-san-francisco/) by [Craig Hockenberry](https://twitter.com/chockenberry)

