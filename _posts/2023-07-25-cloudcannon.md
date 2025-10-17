---
title: "Eleventy and CloudCannon: New Best Friends"
tags:
  - eleventy
  - video
metadata:
  youtubeId: nypsmn70ipI
external_url: https://www.11ty.dev/blog/cloudcannon/
external_url_location: end
medialength: 2 min
external_icon_url: "https://cloudcannon.com/"
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

* Read more on the CloudCannon Blog: [_CloudCannon, the Official CMS Partner of Eleventy_](https://cloudcannon.com/blog/cloudcannon-the-official-cms-partner-of-eleventy/)
* See the [post on Mastodon](https://fosstodon.org/@eleventy/110775434718494755)
* Follow along on Mastodon: [`@eleventy@fosstodon.org`](https://fosstodon.org/@eleventy) and/or [`@cloudcannon@techhub.social`](https://techhub.social/@cloudcannon).


## Searchable Transcript

{% renderTemplate "webc" -%}
<div><youtube-deep-link :videoid="$data.metadata.youtubeId" :@captions="fetchYoutubeTranscript($data.metadata.youtubeId)"></youtube-deep-link></div>
{%- endrenderTemplate %}