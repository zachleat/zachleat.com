---
title: "Eleventy and CloudCannon: New Best Friends"
tags: eleventy
metadata:
  youtubeId: nypsmn70ipI
external_url: https://www.11ty.dev/blog/cloudcannon/
external_url_location: end
---
<script type="module" src="/static/js/offviewport.js"></script>
<div>
	<off-viewport>
		<youtube-lite-player @slug="{{ metadata.youtubeId }}" @label="{{ title }}" @jsapi @hide-link></youtube-lite-player>
	</off-viewport>
	<youtube-link @label="{{ title }}" href="https://youtube.com/watch?v={{ metadata.youtubeId }}"></youtube-link>
</div>

* Read more on the CloudCannon Blog: [_CloudCannon, the Official CMS Partner of Eleventy_](https://cloudcannon.com/blog/cloudcannon-the-official-cms-partner-of-eleventy/)
* See the [post on Mastodon](https://fosstodon.org/@eleventy/110775434718494755)
* Follow along on Mastodon: [`@eleventy@fosstodon.org`](https://fosstodon.org/@eleventy) and/or [`@cloudcannon@techhub.social`](https://techhub.social/@cloudcannon).


## Searchable Transcript

<div><youtube-deep-link videoid="{{ metadata.youtubeId }}" :@captions="fetchYoutubeTranscript('{{ metadata.youtubeId }}')"></youtube-deep-link></div>