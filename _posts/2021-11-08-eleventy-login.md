---
title: How to add Authentication to your Eleventy Site
tags:
  - project
  - eleventy
  - speaking
  - video
metadata:
  youtubeId: At19o2Ox57Y
medialength: 7 min
urls:
  demo: 'https://demo-eleventy-serverless-oauth.netlify.app/'
  source: 'https://github.com/11ty/demo-eleventy-serverless-oauth'
---
A demo project and walkthrough showing how to secure some of your Eleventy Serverless pages behind OAuth authentication providers.

* Login with GitHub, Netlify, or GitLab (and easily extensible to add more!)
* This demo uses zero clientside JavaScript.
* Serverless templates can be secured with a simple addition to the template front matter.

## Walk-through

{% renderTemplate "webc" %}<div><youtube-lite-player :@slug="$data.metadata.youtubeId" :@label="$data.title"></youtube-lite-player></div>{%- endrenderTemplate %}

## Demo
{% originalPostEmbed urls.demo %}

## Source Code
{% originalPostEmbed urls.source %}
