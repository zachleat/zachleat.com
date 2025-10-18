---
title: line-numbers Web Component
titleHtml: '&lt;line-numbers&gt; Web Component'
tags:
  - project
  - web-components
seo:
  openGraphBackgroundImage: /og/sources/tape-measure.jpg
  openGraphAlt: Selective focus photography of a tape measure typically used for clothing
posterImage:
  showOnPage: true
  height: 22em
  name: Siora Photography
  source: https://unsplash.com/photos/selective-focus-photography-of-tape-measure-cixohzDpNIo
# Analytics are incomplete for this post (goatcounter wasn’t enabled for a few months)
---
`<line-numbers>` is a web component to add line numbers alongside `<pre>` or `<textarea>` elements.

- [**Demo**](https://zachleat.github.io/line-numbers/demo.html)
- [npm package](https://www.npmjs.com/package/@zachleat/line-numbers)
- [GitHub repository](https://github.com/zachleat/line-numbers)

Install:

```sh
npm install @zachleat/line-numbers
```

## Features

- `<pre>` supported
- `<textarea>` supported (even when adding or removing lines)
- CSS `overflow` supported (with obtrusive/visible or nonobtrusive scrollbars)
- Numbers are excluded from content flow (not selectable, important for copy paste components!)
- Use _any_ [CSS counter style](https://developer.mozilla.org/en-US/docs/Web/CSS/counter#counter-style) via custom property `--uln-number-type`
- Change the starting index for counter via (`<line-numbers start="999">`)
- Numbers are unobtrusive by default to reduce layout shift (opt-in to obtrusive behavior via `<line-numbers obtrusive>`)

### Limitations

Trying to keep this one as simple as possible, so please note the following:

- Line wrapping is **not** supported (`white-space: pre` or `white-space: nowrap` only, and this is enforced by the component)
- Elements using `contenteditable` are **not** supported
