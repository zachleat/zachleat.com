---
title: Building a multi-language Taylor Swift fan site (10 Minute Version) (Zach's Version)
tags:
  - speaking
  - video
  - eleventy
metadata:
  youtubeId: hxHXXf7dTvk
medialength: 10 min
opengraphSkipFace: true
---
<script type="module" src="/static/js/onvisible.js"></script>
<div>
	<on-visible>
		<youtube-lite-player @slug="{{ metadata.youtubeId }}" @label="{{ title }}" @jsapi @hide-link></youtube-lite-player>
	</on-visible>
	<youtube-link @label="{{ title }}" href="https://youtube.com/watch?v={{ metadata.youtubeId }}"></youtube-link>
</div>

---

In the above video I walk through a [Taylor Swift lyrics fansite](https://fluent-reef.cloudvent.net/) I built to demonstrate a few internationalization features with Eleventy and CloudCannon.

* [Demo](https://fluent-reef.cloudvent.net/)
* [Source code](https://github.com/zachleat-cc/demo-cloudcannon-i18n)


## Features

* Supports English and Spanish (any number of languages can be added)
	* Using [Eleventy’s i18n plugin](https://www.11ty.dev/docs/plugins/i18n/)
	* Using [`rosetta` for string transformation](https://www.npmjs.com/package/rosetta)
* Custom redirects are not necessary! The HTML links _just work_.
* For-free inter-language page-aware language chooser _(e.g. “Also available in…”)_
* Translated header, footer, and banner (in a [different repo](https://github.com/CloudCannon/demo-marketing-components) via Site Mounting)
* For-free [locale aware search from Pagefind](https://pagefind.app/docs/multilingual/)
* Album art pulled from Spotify Open Graph images
* Deep links to various streaming services
* Built with Eleventy v3.0
	* Using `node` front matter in `songs.liquid` (to enable the `before` pagination callback in JavaScript)
	* Using custom [dual pagination](https://github.com/11ty/eleventy/issues/332) with `before` chunking data between languages and songs.
* Using the seasonally [appropriate `<snow-fall>` web component](/web/snow-fall/).

## Searchable Transcript

{% fetchTranscript metadata.youtubeId %}