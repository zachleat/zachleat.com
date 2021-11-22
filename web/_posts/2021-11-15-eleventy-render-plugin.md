---
title: Mix and Match Template Syntax in Eleventy using the Render Plugin
tags:
  - project
  - eleventy
external_url: 'https://www.11ty.dev/docs/plugins/render/'
ignoreExternalLinkInLayoutFile: true
---
This plugin adds new `renderTemplate` and `renderFile` shortcodes to Eleventy projects for mixing and matching rendering in a single parent template!

I’m super excited about what this can unlock:

* Did someone else write a Nunjucks plugin you want to use? But you only use Liquid templates? Yes.
* Do you have a Vue component for your navigation but use Nunjucks for everything else? Yes.
* Do you want to render some of your template as Markdown? Yes.

This was also one of [the most-upvoted/requested features on our enhancement backlog](https://github.com/11ty/eleventy/issues/148), opened June 2018 with ×54 👍’s.

## Read the Docs
{% originalPostEmbed external_url %}
