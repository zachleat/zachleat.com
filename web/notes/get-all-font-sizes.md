---
title: Get all Font Sizes in use on a Web Page
note-tags:
  - JavaScript
  - Fonts
tweet: https://twitter.com/zachleat/status/1083063192182575105
---
While doing some testing on font hinting, I wanted an easy way to make a test page that had examples of every single `font-size` in use on a page. Pasting the following snippet into your DevTools console retrieves an `Array` of sorted `font-size` values in use on a page.

```js
(function() {
  let fontSizes = new Set();

  document.querySelectorAll("*").forEach(function( node ) {
    fontSizes.add( window.getComputedStyle( node ).getPropertyValue("font-size") );
  });

  return Array.from( fontSizes ).sort(function(a, b) {
    return parseFloat(a) - parseFloat(b);
  });
})();
```

For example, this page returned:

```js
["10.5px", "11px", "12px", "13px", "15px", "15.7368px", "16px", "16.9474px", "18.6875px", "19.2px", "21.7895px", "22.4px", "23px", "100.35px"]
```

_⚠️ Careful if you use `vw` units, these are computed values only._

I’ve also filed this as a [possible enhancement for GlyphHanger](https://github.com/filamentgroup/glyphhanger/issues/62).
