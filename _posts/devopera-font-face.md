---
title: Better @font-face with Font Load Events
categories:
  - font-loading
tags:
  - highlight
  - research
  - font-loading
date: 2014-09-26T12:00:00.000Z
---

Related: **[*Better @font-face with Font Load Events* was originally posted on Dev.Opera](https://web.archive.org/web/20240303153613/https://dev.opera.com/articles/better-font-face/).**

`@font-face` is an established staple in the diet of almost half of the web. According to the HTTP Archive, 47% of web sites make a request for at least one custom web font. What does this mean for a casual browser of the web? In this article, I make the argument that current implementations of `@font-face` are actually harmful to the performance and usability of the web. These problems are exacerbated by the fact that developers have started using `@font-face` for two completely different use cases: *content fonts* and *icon fonts*, which should be handled differently. But there is hope. We can make small changes to how these fonts load to mitigate those drawbacks and make the web work better for everyone.

First—let’s discuss what `@font-face` gets right.

## Initiating a Font Download

What happens when you slap a fancy new `@font-face` custom web font into your CSS? As it turns out—not much. Just including a `@font-face` block doesn’t actually initiate a download of the remote font file from the server in almost all browsers (except IE8).

``` css
/* Does not download */
@font-face {
	font-family: 'open_sansregular';
	src: /* This article does not cover @font-face syntax */;
}
```

So, how does one go about initiating a font download? Peep your eyes on this source:

``` html
<!-- Initiates download in Firefox, IE 9+ -->
<div style="font-family: open_sansregular"></div>

<!-- Initiates download in Chrome, Safari (WebKit/Blink et al) -->
<div style="font-family: open_sansregular">Content.</div>
```

This means that WebKit and Blink are smart enough to know that even if a node exists in the document that uses our new `font-family` but the node is empty—the font does not download. This is great!

What if we create the nodes dynamically in JavaScript?

``` js
/* Does not download */
var el = document.createElement('div');
el.style.fontFamily = 'open_sansregular';

/* Initiates download in Firefox, IE 9+ */
document.body.appendChild(el);

/* Initiates download in WebKit/Blink */
el.innerHTML = 'Content.';
```

All but IE8 wait until the new node has been appended into the document (is not detached) and as previously mentioned, WebKit/Blink browsers even wait until the node has text content.

Now we know what `@font-face` got right. Now let’s get our hands dirty.

## Request in Flight

What happens to our content while our little `@font-face` request is in flight? To the elements affected by the new `font-family`, most browsers actually hide their fallback text. When the request completes, the text is shown with the new `font-family`. This is sometimes referred to as the Flash of Invisible Text, or FOIT.

Since `@font-face` is largely used for content fonts the FOIT seems counterintuitive, given that the alternative has better perceived performance and the web has historically favored progressive rendering. However, this behavior’s use with icon fonts is useful, given that some code points in icon fonts are [mapped to existing Unicode glyphs or using the free-for-all Private Use Area](http://filamentgroup.com/lab/bulletproof_icon_fonts.html). For example, [U+F802](http://codepoints.net/U+F802) is a pencil icon in OS X Safari and Opera, but a generic default Unicode square in Firefox and iOS Safari. Worse, the Private Use Area is chock-full of multicolor emoji on iOS Safari. You don’t want an unpredictable fallback to show while the icon is loading.

<figure>
	<img src="/web/img/posts/devopera-font-face/ios-pua.png" alt="Multicolor Emoji Characters in the Private Use Area on iOS Safari" width="640" height="960">
	<figcaption>Multicolor Emoji Characters in the Private Use Area on iOS Safari</figcaption>
</figure>

Conversely, Internet Explorer (including Windows Phone 8) just lays all its cards on the table and always shows the fallback font. In my opinion, this is the correct default behavior for content fonts, but is (again) undesirable for icon fonts.

> Remember when the text used to load before the images did?
>
> — @aanand [May 10, 2014](https://twitter.com/aanand/statuses/465182499577286656)

## Timeouts

In order to walk the perceived performance vs. usability tightrope, some browsers decided to introduce a timeout to `@font-face` requests. This can often result in elements flashing fallback font families after a certain time period. This is commonly referred to as a Flash of Unstyled Text, or FOUT, but might be more accurately referred to as the Flash of Fallback Text.

In Chrome (36+), Opera (23+), and Firefox there is a three second timeout, after which the fallback font is shown. The timeout is a great benefit for use with content fonts, but for icon fonts this can have an undesirable effect.

If the `@font-face` request doesn’t complete in a browser that doesn’t have a timeout (Mobile Safari, Safari, Android, Blackberry), the content never shows. Never. Worse, in Safari, if the font loads after 60 seconds, the response content is thrown away. Nothing is shown. It’s important to recognize that **font requests should not be a single point of failure for your content**.

## The Stop Button

Ok, so the `@font-face` request hangs. Can’t the user just press the stop button? Actually, no. In all browsers, hitting the stop button had no positive effect on `@font-face` requests.

Some browsers (Safari 7, Mobile Safari 7, Firefox) pretend as if the stop button had never been triggered, with the exception of Chrome. If you hit the stop button after the three-second timeout in Chrome, it re-hides the fallback text and waits an additional three seconds.

Worse, other browsers (Mobile Safari 6.1, Blackberry 7, Android 2.3, 4.2) accept the Stop button but don’t show any fallback content, ever. Your only recourse in this situation is to reload the entire page.

Ideally, the fallback font should be immediately shown if the stop button is pressed. Disregarding Internet Explorer which always shows a fallback font, none of the tested web browsers got this right.

## Font Loading Events

We need more control over our `@font-face` requests. The two main use cases: prevailing content fonts and not-to-be-forgotten icon fonts require much different loading behavior even in the face of increasingly divergent default browser behavior.

One way we can regain control over the loading behavior is to use font load events. The most promising font loading event solution is a native one: the [CSS Font Loading Module](http://dev.w3.org/csswg/css-font-loading/); which is already implemented and available in Chrome and Opera.

``` js
document.fonts.load('1em open_sansregular')
	.then(function() {
		var docEl = document.documentElement;
		docEl.className += ' open-sans-loaded';
	});
```

By placing a JS-assigned class around any use of our custom `@font-face`, we regain control over the fallback experience.

``` css
.open-sans-loaded h1 {
	font-family: open_sansregular;
}
```

Using the above CSS and JS for content fonts, we can show the fallback text while the font request is in flight. If you want to use it for icon fonts, you can easily modify the approach to hide the fallback text avoiding the timeout FOUT as well.

If a user hits the stop button while the text is loading, it may not stop the `@font-face` from loading and triggering the font event, but at least a fallback font is always shown in all supported browsers.

## A Cross-Browser Solution

The above solution works great for Chrome and Opera that support the native API, but what about other browsers? Of course, if you’re already using [TypeKit’s webfontloader](https://github.com/typekit/webfontloader) on your page, you could reuse that—but as of the time this article was written it does not reuse the native API where supported (and is somewhat large to use solely for this purpose—currently 7.1 KB after minification and gzip).

Alternatively, you can use the [FontFaceOnload](https://github.com/zachleat/fontfaceonload) utility, which reuses the native API where supported. It is **not** a one-to-one polyfill for the CSS Font Loading API and as such the syntax is different:

``` js
FontFaceOnload('open_sansregular', {
	success: function() {
		var docEl = document.documentElement;
		docEl.className += ' open-sans-loaded';
	}
});
```

If you’d like a full one-to-one polyfill of the CSS Font Loading API, you can follow along with [Bram Stein’s in-progress `FontLoader` polyfill](https://github.com/bramstein/fontloader).

## Conclusion

Content fonts and icon fonts must be treated differently in order to effectively use them in our pages. In order to make our content usable as soon as possible to our visitors, we must embrace fallback fonts. In order to remove the confusion from sometimes unpredictable icon fonts, we must hide fallback fonts. I hope you’ll consider these inconsistencies and attempt to solve them in your web pages—your users will be happier for it.

## Addendum: Browser Support

When the article mentions “all browsers” above, it includes this list:

* Firefox 28
* Internet Explorer 8, 9, 10, 11
* Windows Phone 8

*and WebKit/Blink:*

* Google Chrome 37
* Opera 23
* Mobile Safari 6.1, 7
* Safari 7
* Android 2.3, 4.2, 4.4
* Blackberry 7

Web Browsers purposefully excluded: no `@font-face` support:

* Blackberry 5
* Blackberry 6 (only supports SVG `@font-face` and [very poorly—do not use](https://github.com/scottjehl/Device-Bugs/issues/43))
* Windows Phone 7, 7.5
