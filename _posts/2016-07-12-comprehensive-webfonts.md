---
title: A Comprehensive Guide to Font Loading Strategies
categories:
  - font-loading
tags:
  - highlight
  - font-loading
---

_This guide is not intended for use with font icons, which have different loading priorities and use cases. Also, SVG is probably a better long term choice._

**Updated July 27, 2017** with new information on `font-display`.
**Updated August 14, 2017** with a link to a [glossary page](/web/webfont-glossary/).

## Jump to:

* [Unceremonious @font-face](#font-face)
* [`font-display`](#font-display)
* [`preload`](#preload)
* [Don’t use web fonts](#abstain)
* [Inline Data URI](#inline-data-uri)
* [Asynchronous Data URI](#async-data-uri)
* [FOUT with a Class](#fout-class)
* [FOFT, or FOUT with Two Stage Render](#foft)
* [Critical FOFT](#critical-foft)
* [Critical FOFT with Data URI](#critical-foft-data-uri)
* [Critical FOFT with `preload`](#critical-foft-preload)

<style>
#webfont-strategies-chart {
	padding: 1em;
}
@media ( min-width: 43.75em ) {
	#webfont-strategies-chart {
		padding-left: 2em;
		padding-right: 2em;
	}
}
</style>
<img src="/web/img/posts/comprehensive-webfonts/strategies.svg" alt="A diagram describing the relationship between the font loading strategies" id="webfont-strategies-chart">

## Glossary

If you run into a term that you don’t know, please consult the [glossary of web font loading terms](/web/webfont-glossary/) I’ve prepared. If a term is missing in the glossary, please [let me know on Twitter @zachleat](https://twitter.com/zachleat) or in the comments.

## Quick Guide

If you’re looking for a specific approach, I’ve prepared some handy links that will take you to the section you need. Let’s say you want an approach that:

* **is the most well rounded approach that will be *good enough* for most use cases**: [FOUT with a Class](#fout-class).

* **is the easiest possible thing to implement**: I’ve learned a lot about web fonts and at time of writing this article the current browser support is lacking for the easiest methods for effective/robust web font implementation. It is with that in mind that I will admit—if you’re looking for the easy way out already, you should consider [not using web fonts](#abstain). If you don’t know what web fonts are doing to improve your design, they may not be right for you. Don’t get me wrong, web fonts are **great**. But educate yourself on the benefit first. ([In Defense of Web Fonts, _The Value of a Web Font_ by Robin Rendle](https://robinrendle.com/notes/in-defense-of-webfonts/#the-value-of-a-webfont) is a good start. If you have others, please leave a comment below!)

* **is the best performance-oriented approach**: Use one of the Critical FOFT approaches. Personally, at time of writing my preference is [Critical FOFT with Data URI](#critical-foft-data-uri) but will shift toward [Critical FOFT with `preload`](#critical-foft-preload) as browser support for `preload` increases.

* **will work well with a large number of web fonts**: If you’re web font obsessed (anything more than 4 or 5 web fonts or a total file size of more than 100KB) this one is kind of tricky. I’d first recommend trying to pare your web font usage down, but if that isn’t possible stick with a standard [FOFT, or FOUT with Two Stage Render](#foft) approach. Use separate FOFT approaches for each typeface (grouping of roman, bold, italic, et cetera).

* **will work with my existing cloud/web font hosting solution**: FOFT approaches generally require self hosting, so stick with the tried and true [FOUT with a Class](#fout-class) approach.


## Criteria

1. **Ease of Implementation**: sometimes, simple is what makes the deadline.
1. **Rendering Performance**: FOUT is a feature that will allow you to render fallback fonts immediately and render the web font when it loads. We can take additional steps to reduce amount of time a fallback font is shown and reduce the impact of FOUT or even eliminate it altogether.
1. **Scalability**: some font loading approaches encourage serial loading of web fonts. We want the requests to happen in parallel. We’ll evaluate how well each approach works with a growing web font budget.
1. **Future Friendly**: will it require additional research and maintenance if a new font format comes out or will it be easily adaptable?
1. **Browser Support**: is it sufficient to work with a wide enough base to meet most projects’ browser support requirements?
1. **Flexibility**: does the approach easily facilitate grouping web font requests and their repaints and reflows? We want control over which fonts load and when.
1. **Robustness**: What happens if a web font request hangs? Will the text be readable or will the web font be a single point of failure (SPOF)?
1. **Hosting**: does the approach require self hosting or is it adaptable to work with various web font loaders provided by cloud providers/font foundries?
1. **Subsetting**: some font licenses don’t allow subsetting. Some approaches below require subsetting for optimal performance.

## <span id="font-face">Unceremonious @font-face</span>

Throw a naked @font-face block on your page and hope for the best. This is the default approach recommended by [Google Fonts](https://fonts.google.com/).

* **[Demo: Unceremonious `@font-face`](/web-fonts/demos/unceremonious-font-face.html)**

#### Pros

* Very simple: add a CSS `@font-face` block with WOFF and WOFF2 formats (maybe even an OpenType format too, if you want better Android &lt; 4.4 support—Compare [WOFF](http://caniuse.com/#feat=woff) with [TTF/OTF](http://caniuse.com/#feat=ttf) on Can I Use).
* Very future friendly: this is the default web font behavior. You’re in the web font mainstream here. Adding additional font formats is as simple as including another URL in your `@font-face` comma separated `src` attribute.
* Good rendering performance in Internet Explorer and Edge: no FOIT, no hidden or invisible text. I fully support this by-design decision made my Microsoft.
* Does not require modification of the fonts (through subsetting or otherwise). Very license friendly.

#### Cons

* Bad rendering performance everywhere else: Maximum three second FOIT in most modern browsers, switches to FOUT if load takes longer. While requests may finish earlier, we know how unreliable the network can be—three seconds is a long time for invisible unreadable content.
* Not very robust, yet: Some WebKits have no maximum FOIT timeout (although WebKit has very recently fixed this and I believe it will be included with Safari version 10), which means web font requests may be a single point of failure for your content (if the request hangs, content will never display).
* No easy way to group requests or repaints together. Each web font will incur a separate repaint/reflow step and its own FOIT/FOUT timeouts. This can create undesirable situations like the [Mitt Romney Web Font Problem](/web/mitt-romney-webfont-problem/).

#### Verdict: Do not use.

## <span id="font-display">font-display</span>

Add a new `font-display: swap` descriptor to your `@font-face` block to opt-in to FOUT on browsers that support it. Optionally, `font-display: fallback` or `font-display: optional` can be used if you consider web fonts to be unnecessary to the design. ~~At time of writing, this feature is not available in any stable web browsers.~~ *Update: on July 25, 2017 Chrome 60 was released on the Chrome stable release channel which includes support for `font-display`.*

* **[Demo: `font-display`](/web-fonts/demos/font-display.html)**: note browser support for this is very limited.
* Read more: [`font-display` Specification](https://tabatkins.github.io/specs/css-font-display/)

#### Pros

* Very Simple: Only a single CSS descriptor added to your `@font-face` block.
* Good rendering performance: if this approach had ubiquitous browser support, this would give us FOUT without any JavaScript. A CSS-only approach would be ideal.
* Super future friendly: is orthogonal to web font formats. No other changes are required if you add new formats to your stack.
* Very robust: a FOUT approach will show your fallback text in supported browsers even if the web font request hangs. Even better—your web fonts are not dependent on a JavaScript polyfill—which means if the JavaScript fails, users are still eligible for the web fonts.
* Does not require modification of the fonts (through subsetting or otherwise). Very license friendly.

#### Cons

* Only available on Chrome (version 60+ on Desktop and Android, see [Chrome Platform Status](https://www.chromestatus.com/feature/4799947908055040)). In progress and behind a flag on [Firefox Platform Status](https://platform-status.mozilla.org/#css-font-display) but not yet documented at all on [Edge Platform Status](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/). Until support is ubiquitous across A-grade browsers, developers will need to pair this with a JavaScript approach.
* In fact, pairing this with a JavaScript approach doesn’t really buy you all that much on an empty-cache load, given that the JavaScript FOUT approaches documented on this page usually require modification of your CSS to avoid using any web fonts prior to font loading classes added by JavaScript. When the two approaches are paired together and the JavaScript fails you won’t get web fonts even though `font-display` is a CSS-only approach. It’ll help for repeat view optimizations though.
* Limited flexibility: No way to group requests or repaints. This isn’t as bad as it sounds—if you FOUT everything you’ll avoid the Mitt Romney Web Font problem but grouping can be useful for other reasons—we’ll go into that later.
* ~Hosting: No control of this property on any known web font host. It’s not included in the Google Fonts CSS, for example. This will probably change when browser support improves.~ *Update: in May 2019 Google Fonts added the ability to set a `font-display` property, related blog post [can be read here](/web/google-fonts-display/).*

#### Verdict: Definitely add it to your `@font-face` blocks, but by itself it’s not sufficient.

## <span id="preload">Preload</span>

Add `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>` to fetch your font sooner. Pairs nicely with an unceremonious `@font-face` block and feel free to also throw in the `font-display` descriptor as well for bonus points.

* **[Demo: `preload`](/web-fonts/demos/preload.html)**
* Read more: [Preload: What is it Good For?](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/)
* Read more: [The Web Fonts: Preloaded](/web/preload/) _(the first half)_

Keep in mind: The pros and cons for this approach are heavily dependent on the font loading strategy you pair it with, whether it be [Unceremonious `@font-face`](#font-face) or [`font-display`](#font-display).

### Pros

* Super easy to implement, one `<link>` and you’re off.
* Better rendering performance than a `@font-face` block. Web fonts are requested higher up in the waterfall.
* Future friendly if you use the `type` attribute to specify the font format. At this point it’s still possible (although it looks unlikely) that a web browser will implement [preload](http://caniuse.com/#feat=link-rel-preload) before [WOFF2](http://caniuse.com/#feat=woff2) for example, and without this attribute you could be looking at a wasted request. So, make sure you include `type`.
* Does not require modification of the fonts (through subsetting or otherwise). Very license friendly.

### Cons

* Scalability: The more you preload, the more you can block initial render (note data for this comparison was gathered on a site that was using Critical CSS). Try to limit usage to the most important one or two web fonts.
* Limited browser support—only Blink support right now, but more coming soon.
* Flexibility: no way to group repaints/reflows.
* You probably wouldn’t be able to use this with a third party host. You’d need to know at markup render the URL of the web font you’re requesting. Google Fonts, for example, generates these in the CSS request you make to their CDN.

#### Verdict: Not sufficient by itself.

## <span id="abstain">Don’t use Web Fonts</span>

I won’t go into this approach too much because, well, it isn’t technically a font loading strategy. _But I will say that it’s better than using web fonts incorrectly._ You are missing out on many new typographic features and improvements in readability that a web font can give you, but it is your option to opt-out.

* **[Demo: Don’t use Web Fonts](/web-fonts/demos/dont.html)**: yeah, I included this. The title says comprehensive, remember?

#### Pros

* Not sure it could be simpler: just use `font-family` without `@font-face`.
* Near instant rendering performance: No worries about FOUT or FOIT.

#### Cons

* Limited availability. Very few system fonts are available cross platform. Check [Font Familiy Reunion](https://fontfamily.zachleat.dev) to see if a system font has acceptable browser support for your needs.

#### Verdict: Sure, I guess, but I wouldn’t be excited about it.

## <span id="inline-data-uri">Inline Data URI</span>

There are typically two kinds of inlining covered by this method: in a blocking `<link rel="stylesheet">` request or in a `<style>` element in the server rendered markup. Both [alibaba.com](http://www.alibaba.com/) (two web fonts embedded in a blocking CSS request) and [medium.com](https://medium.com/) (seven web fonts) use this approach.

* **[Demo: Inline Data URI](/web-fonts/demos/inline-data-uri.html)**
* Read more: [Web Font Anti-Pattern: Data URIs](/web/web-font-data-uris/) _(the first half)_


#### Pros

* Seemingly great rendering performance: this approach has _no FOUT or FOIT_. This is a big deal.
* Flexibility: Don’t need to worry about grouping repaints/reflows—this approach has no FOUT or FOIT.
* Robustness: inlining puts all your eggs into your initial server request basket.

#### Cons

* A catch with rendering performance: while this approach doesn’t FOUT, it can significantly delay initial render time. On the other hand it will render “finished.” But keep in mind that even a single WOFF2 web font is probably going to be around 10KB—15KB and inlining just one as a Data URI will likely take you over the HTTP/1 recommendation of only having 14KB or less in the critical rendering path.
* Browser support: Doesn’t take advantage of the comma separated format list in `@font-face` blocks: this approach only embeds one format type. Usually in the wild this has meant WOFF, so using this method forces you to choose between ubiquity (WOFF) and much narrower user agent support but smaller file sizes (WOFF2).
* Bad scalability: Requests don’t happen in parallel. They load serially.
* Self hosting: Required, of course.

#### Verdict: Only use this method if you really despise FOUT—I wouldn’t recommend it.

## <span id="async-data-uri">Asynchronous Data URI Stylesheet</span>

Use a tool like [`loadCSS`](https://github.com/filamentgroup/loadCSS/) to fetch a stylesheet with all of the fonts embedded as Data URIs. Often you’ll see this coupled with a localStorage method of storing the stylesheet on the user agent for repeat views.

* **[Demo: Asynchronous Data URI Stylesheet](/web-fonts/demos/async-data-uri.html)**
* Read more: [How we use web fonts responsibly, or, avoiding a @font-face-palm on the Filament Group Lab](https://www.filamentgroup.com/lab/font-loading.html)

#### Pros

* Rendering performance: _Mostly eliminates FOIT_ (see note in the Cons)
* Flexibility: Easy to group requests into a single repaint (put multiple Data URIs in one stylesheet).
* Ease: Does not require any additional CSS changes to use. This is a big benefit. However, implementation isn’t all candy and roses.
* Robust: If the asynchronous request fails, fallback text continues to be shown.

#### Cons

* Rendering performance: Has a very noticeable, but short FOIT while the stylesheet and Data URIs are being parsed. It’s quite distracting. I see this method often enough that I can recognize the approach without looking into the source code.
* Flexibility and Scalability: Grouped requests and repaints are coupled together. If you group multiple Data URIs together (which will cause loading to occur in serial and not in parallel), they will repaint together. With this method, you can’t load in parallel and group your repaints.
* Not maintenance friendly. Requires you to have your own method to determine font format support. Your JavaScript loader will need to determine which font format is supported (WOFF2 or WOFF) before fetching the Data URI stylesheet. This means if a new font format comes out, you’ll need to develop a feature test for it.
* Browser support: You can bypass the maintenance of the loader step and hard-code to WOFF2 or WOFF but this will either incur larger than necessary or potentially throwaway requests (the same drawback we talked about for Inline Data URIs).
* Self Hosting: Required.

#### Verdict: It’s OK but we can do better.

## <span id="fout-class">FOUT with a Class</span>

Use the CSS Font Loading API with a polyfill to detect when a specific font has loaded and only apply that web font in your CSS after it has loaded successfully. Usually this means toggling a class on your `<html>` element. Use with SASS or LESS mixins for easier maintenance.

* **[Demo: FOUT with a Class](/web-fonts/demos/fout-with-class-polyfill.html)** (includes sessionStorage trick for repeat view optimization)
* Read more: [Better @font-face with Font Load Events on Dev.Opera](https://dev.opera.com/articles/better-font-face/) and [Font Loading Revisited with Font Events on the Filament Group Lab](https://www.filamentgroup.com/lab/font-events.html)

### Pros

* Rendering performance: Eliminates FOIT. This method is tried and tested. It’s [one of the approaches recommended by TypeKit](https://helpx.adobe.com/fonts/user-guide.html/fonts/using/embed-codes.ug.html#JavaScriptembedcode).
* Flexibility: Easy to group requests into a single repaint (use one class for multiple web font loads)
* Scalability: Requests happen in parallel
* Robust: if the request fails, fallback text is still shown.
* Hosting: Works independent of font loader (easy to implement with third party hosts or with existing `@font-face` blocks)
* Great browser support, polyfills typically work everywhere that web fonts are supported.
* Future friendly: polyfills aren’t coupled to font formats and should work with existing `@font-face` blocks. That means when a new format comes out, you can just change your `@font-face` as normal.
* Does not require modification of the fonts (through subsetting or otherwise). Very license friendly.

### Cons

* Requires strict maintenance/control of your CSS. A single use of a web font font-family in your CSS without the guarding `loaded` class will likely trigger a FOIT.
* Typically requires you to hard code which web fonts you want to load on the page. This can mean that you end up loading more web font content than a page needs. Remember that with unceremonious `@font-face` usage, newer browsers only download web fonts that are actually used on your page. This is given to you for free. This is why the [New York Times can get away with 100 different `@font-face` blocks on their home page](https://twitter.com/zachleat/status/746732627319623689)—the browser only downloads a fraction of those. With this approach, you must tell the browser which fonts to download independent of usage.

### Verdict: This is the baseline standard. This will work for most use cases.

## <span id="foft">FOFT, or FOUT with Two Stage Render</span>

This approach builds on the [FOUT with a Class](#fout-class) method and is useful when you’re loading multiple weights or styles of the same typeface, _e.g._ roman, bold, italic, bold italic, book, heavy, and others. We split those web fonts into two stages: the roman first, which will then also immediately render faux-bold and faux-italic content (using [font synthesis](https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/)) while the real web fonts for heavier weights and alternative styles are loading.

* **[Demo: FOFT, or FOUT with Two Stage Render](/web-fonts/demos/foft.html)** (includes sessionStorage trick for repeat view optimization)
* [Compare source code for FOFT against FOUT with a Class](https://gist.github.com/zachleat/3b9414a4be8565999a5d483039cf82d1/revisions?diff=split#diff-0)
* Read more: [Flash of Faux Text—Still More on Font Loading](/web/foft/)

### Pros

* _All the existing Pros of the [FOUT with a Class](#fout-class) approach._
* Rendering performance: Greatly reduces the amount of content jumping that occurs when the web font has loaded. Given that we divide our web font loads into two stages, this allows the first stage (the roman font—the one that will incur the most reflow) much quicker than if we had grouped all our fonts together into a single repaint.

### Cons

* _All the existing Cons of the [FOUT with a Class](#fout-class) approach._
* Some designers are highly allergic to font synthesis. Objectively, synthesized variations are less useful than their real counterparts but that isn’t a fair comparison. Keeping in mind that the synthesized versions are only a temporary placeholder, the question we need to ask is: are they more or less useful than the fallback font? More. The answer is more.

### Verdict: Great for those interested in extra performance but can’t subset with Critical FOFT.

## <span id="critical-foft">Critical FOFT</span>

The only difference between this method and standard FOFT approach is that instead of the full roman web font in the first stage, we use a subset roman web font (usually only containing A-Z and optionally 0-9 and/or punctuation). The full roman web font is instead loaded in the second stage with the other weights and styles.

* **[Demo: Critical FOFT](/web-fonts/demos/critical-foft-polyfill.html)** (includes sessionStorage trick for repeat view optimization)
* [Compare source code for Critical FOFT against FOFT](https://gist.github.com/zachleat/1c2ee3c30ded23922cf4a9720283edfe/revisions?diff=split#diff-0)
* Read more: [Critical Web Fonts](/web/critical-webfonts/)

### Pros

* _All the existing Pros of the [FOFT](#foft) approach_
* Rendering performance: The first stage loads even faster (more noticeable on slower connections) further minimizing the time to first stage web font repaint, making your most used web font reflow occur sooner rather than later.

### Cons

* _All the existing Cons of the [FOFT](#foft) approach._
* Introduces a small amount overhead in that the subset roman font loaded in the first stage is duplicated by the full roman web font loaded in the second stage. This is the price we’re paying to minimize reflow.
* License restriction: Requires subsetting.

### Verdict: Use one of the improved Critical FOFT variations below.

## <span id="critical-foft-data-uri">Critical FOFT with Data URI</span>

This variation of the Critical FOFT approach simply changes the mechanism through which we load the first stage.  Instead of using our normal font loading JavaScript API to initiate a download, we simply embed the web font as a inline Data URI directly in the markup. As previously discussed, this will block initial render but since we’re only embedding a very small subset roman web font this is a small price to pay to mostly eliminate FOUT.

* **[Demo: Critical FOFT with Data URI](/web-fonts/demos/critical-foft-data-uri-polyfill.html)** (includes sessionStorage trick for repeat view optimization)
* [Compare source code for Critical FOFT with Data URI against Critical FOFT](https://gist.github.com/zachleat/b57b7fce3e1eb6d8c301221607d53c34/revisions?diff=split#diff-0)
* Read more: [Web Font Anti-Pattern: Data URIs—_But Wait_](/web/web-font-data-uris/#but-wait)

### Pros

* _All the existing Pros of the [Critical FOFT](#critical-foft) approach._
* Eliminates FOIT and greatly reduces FOUT for the roman font. A small reflow will occur for additional characters loaded in the second stage and when the other weights and styles are loaded, but it will have a much smaller impact.

### Cons

* _All the existing Cons of the [Critical FOFT](#critical-foft) approach._
* The small inlined Data URI will marginally block initial render. We’re trading this for highly reduced FOUT.
* Self hosting: Required.

### Verdict: This is the current gold standard, in my opinion.

## <span id="critical-foft-preload">Critical FOFT with `preload`</span>

This variation of the Critical FOFT approach simply changes the mechanism through which we load the first stage. Instead of using our normal font loading JavaScript API to initiate a download, we use the new `preload` web standard as described above in the [`preload` method](#preload). This should trigger the download sooner than previously possible.

* **[Demo: Critical FOFT with `preload`](/web-fonts/demos/critical-foft-preload-polyfill.html)** (includes sessionStorage trick for repeat view optimization)
* [Compare source code for Critical FOFT with preload against Critical FOFT](https://gist.github.com/zachleat/b651f6bdbc47c563affbfbed16d2d922/revisions?diff=split#diff-0)
* Read more: [The Web Fonts: Preloaded, Use With a Font Loading Strategy section](/web/preload/#use-with-a-font-loading-strategy)

### Pros

* _All the existing Pros of the [Critical FOFT](#critical-foft) approach._
* Rendering performance: Downloads should trigger higher up in the waterfall than with previous methods. I’d guess this is even more dramatic with HTTP headers but haven’t yet confirmed this hunch. This method is better than [Critical FOFT with Data URI](#critical-foft-data-uri) in that it can use the browser cache for repeat requests, rather than re-requesting the same web font data with every server markup request.

### Cons

* _All the existing Cons of the [Critical FOFT](#critical-foft) approach._
* Use only with a single web font format.
* As stated above, [browser support is limited](http://caniuse.com/#feat=link-rel-preload)—only Blink at time of writing.
* `preload` can marginally delay initial render (note data for this comparison was gathered on a site that was using Critical CSS)
* Self hosting: Probably required.

### Verdict: This will be the new gold standard when browser support improves.

