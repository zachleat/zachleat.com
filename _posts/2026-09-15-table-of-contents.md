---
title: "Table of Contents Web Component"
githubProjectName: zachleat/table-of-contents
tags:
  - project
  - web-components
seo:
  openGraphBackgroundImage: /og/sources/table-of-contents.jpg
  openGraphAlt: Ornate silver candelabras on a long dining table beneath a crystal chandelier
posterImage:
  showOnPage: true
  height: 24em
  offset: 45%
  name: Julien DI MAJO
  source: https://unsplash.com/photos/silver-candelabras-on-dining-table-aSxFEwUDJtI
---
> …and another one.

This little (zero CSS) web component has two modes: progressively enhance a hierarchy of server rendered `<ol>` or `<ul>` elements (or conveniently client render them for you if they don’t exist) to highlight which are currently visible in the viewport.

I pulled this code out of the [`table-of-contents.webc`](https://github.com/11ty/tugboat/blob/main/_components/table-of-contents.webc) component from the [WebC Tugboat starter project](https://tugboat.11ty.dev/) for standalone use.

- [**Demo**](https://zachleat.github.io/table-of-contents/demo.html) _(…and in the sidebar of this website)_
- [Source code](https://github.com/zachleat/table-of-contents)
- [`@zachleat/table-of-contents` on npm](https://www.npmjs.com/package/@zachleat/table-of-contents)

You can configure a `selector` attribute to control the scope of the headings search. My site uses `main :is(h2, h3)` but the default is `main :is(h2, h3, h4, h5, h6)`.

Again, all styles for this component are application styles. There is no component CSS on this one.

## Installation

```
npm install @zachleat/table-of-contents
```

## Some sample headings

<div class="card card--demo">

### Heading 3a
#### Heading 4 (via 3a)
### Heading 3b
#### Heading 4 (via 3b)
### Heading 3c

</div>