---
title: Unicode Range Interchange
tags:
  - project
  - font-loading
imageAttr:
  preview:
    src: ./web/img/posts/unicode-range-interchange/preview.png
    alt: 'A preview of the Unicode Range Interchange page, showing the instructions described in this post.'
---
Last week an [issue came in](https://github.com/11ty/11ty-website/issues/958) from [{% imgavatar "polarbirke" %}polarbirke on Twitter](https://twitter.com/polarbirke/status/1366016686579724289) that the web font we use for our titles was overly aggressively subset! Oh no!

I thought it might be instructive to go through how I would go about adding a character or set of characters to an existing subset web font. I’ll be using a new `unicode-range` calculator tool I shipped this week called [Unicode Range Interchange](https://www.zachleat.com/unicode-range-interchange/).

_Behind the scenes, Unicode Range Interchange uses an awesome library from [{% imgavatar "bram_stein" %}Bram Stein called `characterset`](https://www.npmjs.com/package/characterset). I’ve used it for many web font things over the years—super useful._

1. Find the existing `unicode-range` value in your CSS @font-face block. 11ty.dev uses BenchNine and is subset with `unicode-range: U+20-7E,U+2014,U+2019`.
1. Plug this into the first text input field on Unicode Range Interchange. It shows you the characters and the size of the set (in this case, 97 characters).
1. Leave the `Union` operator selected. We want to combine our `unicode-range` with the new characters we’re adding.
1. Type the characters you’d like to add into the next text field. You don’t need to use a `unicode-range` if you don’t want, although it is supported.
1. _Optionally_ you can use [`glyphhanger`](https://github.com/filamentgroup/glyphhanger) to parse a page to find the `unicode-range` of all the characters in use on that page. It can even search for nodes using a specific `font-family`! I used `glyphhanger http://localhost:8080/authors/ --family='BenchNine'` to find all the characters used by the BenchNine font-family on my locally running site. `glyphhanger` returned `U+20,U+21,U+23,U+26,U+2A,U+2C-2E,U+30-3B,U+41-57,U+59,U+5A,U+5F,U+61-7B,U+7D,U+E9,U+F4,U+F6,U+F8,U+15A,U+200B,U+2014,U+2026` (82 characters). I put this value into the second input field on Unicode Range Interchange.
1. The output will now show a new `unicode-range`, combining and simplifying the first two! My result was `U+20-7E,U+E9,U+F4,U+F6,U+F8,U+15A,U+200B,U+2014,U+2019,U+2026` (104 characters)

It looked like this:

<div class="livedemo livedemo-nolabel livedemo-auto" data-demo-label="">{% image imageAttr.preview %}</div>

<p class="primarylink">Try it out for yourself: <a href="https://www.zachleat.com/unicode-range-interchange/">Unicode Range Interchange</a></p>

Then you can use `glyphhanger` to modify your web font files with the new `unicode-range` value.

```
glyphhanger --whitelist=U+20-7E,U+E9,U+F4,U+F6,U+F8,U+15A,U+200B,U+2014,U+2019,U+2026 --formats=woff2 --subset=BenchNine-Bold.ttf
```

If you’d like you can also use `pyftsubset` (which `glyphhanger` uses behind the scenes):

```
pyftsubset "BenchNine-Bold.ttf" --output-file="BenchNine-Bold-subset.woff2" --flavor=woff2 --unicodes=U+20-7E,U+E9,U+F4,U+F6,U+F8,U+15A,U+200B,U+2014,U+2019,U+2026
```

Now you have a new WOFF2 web font file, with a few new characters added (and importantly, no characters removed).

And don’t be like me and forget to update your CSS with the new `unicode-range` value.
