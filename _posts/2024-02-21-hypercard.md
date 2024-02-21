---
title: hypercard Web Component
titleHtml: '&lt;hyper-card&gt; Web Component'
tags:
  - project
  - web-components
seo:
  openGraphBackgroundImage: /og/sources/cards.jpg
  openGraphAlt: A large assortment of UNO cards spread on a flat surface. A wild card sits in the middle
posterImage:
  showOnPage: true
  height: 12em
  name: Karla Hernández
  source: https://unsplash.com/photos/green-blue-and-red-abstract-painting-n9P3wE-jwSk
---
`<hyper-card>` is a web component that adds a three-dimensional hover effect to any arbitrary content. **Full credit to this [3D card hover effect CodePen](https://codepen.io/markmiro/pen/wbqMPa) from [Mark Mironyuk](https://www.markmiro.com/).** Used on the registration flow for [`conf.11ty.dev`](https://conf.11ty.dev/).

* [Demo](https://zachleat.github.io/hypercard/demo.html)
* [Demo on my ticket to the 11ty Conference](https://conf.11ty.dev/tickets/876cecc5531648eab7137c5f853c7539)
* [Source code on GitHub](https://github.com/zachleat/hypercard)

## Features

* Respects `prefers-reduced-motion`.
* Customize scale with `--hypercard-scale` CSS custom property.

## Installation

You can install via `npm` ([`@zachleat/hypercard`](https://www.npmjs.com/package/@zachleat/hypercard)) or download the `hypercard.js` JavaScript file manually.

```shell
npm install @zachleat/hypercard --save
```

Add `hypercard.js` to your site’s JavaScript assets.

## Usage

```html
<hyper-card>Hello.</hyper-card>
```

### Not quite as big on hover

The default value is `1.07`.

```html
<hyper-card style="--hypercard-scale: 1.03">Hello.</hyper-card>
```