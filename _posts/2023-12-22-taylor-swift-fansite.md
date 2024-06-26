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
<script type="module" src="/static/js/offviewport.js"></script>
<div>
{%- renderTemplate "webc" %}
	<off-viewport>
		<youtube-lite-player :@slug="$data.metadata.youtubeId" :@label="$data.title" @jsapi @hide-link></youtube-lite-player>
	</off-viewport>
	<youtube-link :@label="$data.title" :href="`https://youtube.com/watch?v=${$data.metadata.youtubeId}`"></youtube-link>
{%- endrenderTemplate %}
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

{% renderTemplate "webc" -%}
<div><youtube-deep-link :videoid="$data.metadata.youtubeId" :@captions="fetchYoutubeTranscript($data.metadata.youtubeId)"></youtube-deep-link></div>
{%- endrenderTemplate %}