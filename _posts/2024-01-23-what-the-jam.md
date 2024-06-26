---
title: "Exploring the Bounds of Jamstack on What the Jam"
tags:
  - speaking
  - video
  - eleventy
  - jamstack
metadata:
  speaking:
    type: interview
  youtubeId: BPKIU9Ow_ZU
medialength: 29 min
opengraphSkipFace: true
---
> Welcome to a new episode of "What the Jam," the show that dives deep into the fascinating realm of Jamstack, bringing you face-to-face with its most influential figures. In this episode, we're excited to feature Zach Leatherman, the creative mind behind Eleventy and a key figure in the Jamstack community. Zach takes us through his journey with Eleventy, discussing the inspirations and challenges behind creating one of the most popular static site generators. He shares his insights on the evolution of Jamstack, its role in reshaping the landscape of web development, and a path forward. Have your say at https://thefutureofjamstack.org

<script type="module" src="/static/js/offviewport.js"></script>
<div>
{%- renderTemplate "webc" %}
	<off-viewport>
		<youtube-lite-player :@slug="$data.metadata.youtubeId" :@label="$data.title" @jsapi @hide-link></youtube-lite-player>
	</off-viewport>
	<youtube-link :@label="$data.title" :href="`https://youtube.com/watch?v=${$data.metadata.youtubeId}`"></youtube-link>
{%- endrenderTemplate %}
</div>

## Searchable Transcript

{% renderTemplate "webc" -%}
<div><youtube-deep-link :videoid="$data.metadata.youtubeId" :@captions="fetchYoutubeTranscript($data.metadata.youtubeId)"></youtube-deep-link></div>
{%- endrenderTemplate %}