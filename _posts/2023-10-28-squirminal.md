---
title: The Squirminal Web Component
tags:
  - project
  - web-components
---
A lightweight structural-only zero-dependency web component to progressively animate to reveal HTML content. I believe the name came from an awkward portmanteau of squirmy and terminal.

This one is a few years old (but I am currently cataloguing my web components) and was developed to fake an antique terminal for the web-based CLI used in the [Your Year on Netlify](#live-site-walkthrough) project.

* [Source Code](https://github.com/zachleat/squirminal)
* [Demo](https://squirminal.zachleat.dev/) _(more [demos below](#demos))_

{% originalPostEmbed "https://squirminal.zachleat.dev/", true %}

## Features

* Works with `prefers-reduced-motion`
* Works without JavaScript (fallback to full content)
* Add a blinking cursor via `<squirm-inal cursor>`
* Autoplay (only when visible) via `<squirm-inal autoplay>`
* Works with text nodes inside **any arbitrary HTML content**.

## Better than Before

When I worked on the slide deck for my [Smashing Conference talk in 2021](/web/this-website-is-a-tech-talk/), I developed a similar mechanism to do this, but in a much less efficient way: each syntax highlighted character was wrapped in an additional wrapper element on the server!

I wrote about this in [Queue Code—“Live” Code without Errors](https://www.zachleat.com/web/queue-code/) and you can play around with it on the demo below:

{% originalPostEmbed "https://queuecode.zachleat.dev/", true %}

That approach leaned heavily into server rendering unnecessarily—the whole point of this effect _required_ client interaction and the fallback experience was the original content in its entirety.

## Lessons learned

Squirminal is a better approach that doesn’t require expensive DOM modification on the server and is much more powerful—it can work with any arbitrary HTML content (e.g. lists, images, tables, etc—it’s not limited to syntax highlighted text) and leaves the original content intact and unmodified before or without JavaScript.

There is an important lesson here—in this case the best progressive enhancement compromise involved less server rendering! Ultimately this use case and interaction _required_ clientside interactivity, so it was okay to lean into that a bit more—while still building on a good progressive enhancement baseline.

This was an important reminder to me that progressive enhancement is a continuum of possible solutions—and it’s important to adjust where your solution lives on that continuum as needed and for your individual requirements (and hopefully your tools don’t force you into a corner before you can make those decisions).

## Demos

<script type="module" src="/static/squirminal.js"></script>
<style>pre { margin: 0; }</style>
<div><squirm-inal autoplay speed=".6" dimensions>
{%- highlight js %}
class MyComponent extends HTMLElement {
	connectedCallback() {
		// web component stuff
		// web component stuff
		// web component stuff
		// web component stuff
		// web component stuff
		// web component stuff
		// web component stuff
		// web component stuff
	}
}
if("customElements" in window) {
	customElements.define("my-component", MyComponent);
}
{%- endhighlight %}
</squirm-inal></div>

### In the wild

* [{% indieAvatar "https://echo.rknight.me/" %}Robb Knight’s Echo RSS Cross Poster](https://echo.rknight.me/)
* [{% indieAvatar "https://your-year-on.netlify.com" %}Your Year on Netlify](https://your-year-on.netlify.com)

### Live Site Walkthrough

Here’s a demo screencast I recorded of my personal Your Year on Netlify flow.

{%- renderTemplate "webc" %}
<div><youtube-lite-player @slug="3PK0Yq9n5SI" @label="Walkthrough of the Your Year On Netlify Microsite"></youtube-lite-player></div>
{%- endrenderTemplate %}
