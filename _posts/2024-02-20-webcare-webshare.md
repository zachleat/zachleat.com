---
title: webcare-webshare Web Component
titleHtml: '&lt;webcare-webshare&gt; Web Component'
tags:
  - project
  - web-components
seo:
  openGraphBackgroundImage: /og/sources/sharing.jpeg
  openGraphAlt: Two small hands play with colorful wooden blocks
posterImage:
  showOnPage: true
  height: 12em
  offset: 0%
  name: Michał Bożek
  source: https://unsplash.com/photos/assorted-color-shape-toy-lot-Cl2DhalcsO0
---
`<webcare-webshare>` is a web component that uses the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) to share a web site, falling back (on desktop usually) to a copy to clipboard workflow.

* [Demo](https://zachleat.github.io/webcare-webshare/demo.html)
* [Source code on GitHub](https://github.com/zachleat/webcare-webshare)

Used on the registration flow for [`conf.11ty.dev`](https://conf.11ty.dev/).

## Features

* Defaults to copy URL when Web Share API is not available.
* Optionally override with your own copy-able content.
* Custom button text when Web Share API is not available.

## Installation

You can install via `npm` ([`@zachleat/webcare-webshare`](https://www.npmjs.com/package/@zachleat/webcare-webshare)) or download the `webcare-webshare.js` JavaScript file manually.

```shell
npm install @zachleat/webcare-webshare --save
```

Add `webcare-webshare.js` to your site’s JavaScript assets.

## Usage

Use `share-text` and `share-url` per the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API). The button is un-disabled when initialized.

```html
<webcare-webshare share-text="I am going to the 11ty Conference! #11ty #11tyConf" share-url="https://conf.11ty.dev/">
	<button disabled>Share your ticket!</button>
</webcare-webshare>
```

### Custom button text

_Copy to clipboard_ workflow only. Use the `label-copy` (Before) and `label-after-copy` (After) attributes.

```html
<webcare-webshare share-text="I am going to the 11ty Conference! #11ty #11tyConf" share-url="https://conf.11ty.dev/" label-copy="📋 Copy your ticket URL" label-after-copy="✅ Copied to Clipboard">
	<button disabled>Share your ticket!</button>
</webcare-webshare>
```

### Set custom share content

_Copy to clipboard_ workflow only. Use `copy-text` to override `share-url` as the default content that is copied when using Copy to Clipboard.

```html
<webcare-webshare share-text="I am going to the 11ty Conference! #11ty #11tyConf" share-url="https://conf.11ty.dev/" copy-text="Go to https://conf.11ty.dev/">
	<button disabled>Share your ticket!</button>
</webcare-webshare>
```

