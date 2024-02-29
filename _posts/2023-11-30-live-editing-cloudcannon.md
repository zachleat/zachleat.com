---
title: "Live Editing an Eleventy Project in CloudCannon with Bookshop"
tags:
  - speaking
  - video
  - eleventy
metadata:
  youtubeId: AsWt6BTjzyk
medialength: 9 min
opengraphSkipFace: true
---
<script type="module" src="/static/js/offviewport.js"></script>
<div>
	<off-viewport>
		<youtube-lite-player @slug="{{ metadata.youtubeId }}" @label="{{ title }}" @jsapi @hide-link></youtube-lite-player>
	</off-viewport>
	<youtube-link @label="{{ title }}" href="https://youtube.com/watch?v={{ metadata.youtubeId }}"></youtube-link>
</div>

---

* [Microblog Source Code](https://github.com/zachleat-cc/demo-cloudcannon-microblog)
* [Microblog Demo](https://rare-pineapple.cloudvent.net/)

*Update December 7, 2023*: There is also a [blog post for this one](https://cloudcannon.com/blog/create-a-microblog-with-visual-editing/), if you prefer reading to watching:

{% originalPostEmbed "https://cloudcannon.com/blog/create-a-microblog-with-visual-editing/" %}

---

* Learn more about [Eleventy and CloudCannon CMS](https://cloudcannon.com/eleventy-cms/)
* [CloudCannon Documentation: Introduction to Bookshop with Eleventy](https://cloudcannon.com/documentation/guides/bookshop-eleventy-guide/)

## Searchable Transcript

<div><youtube-deep-link videoid="{{ metadata.youtubeId }}" :@captions="fetchYoutubeTranscript('{{ metadata.youtubeId }}')"></youtube-deep-link></div>