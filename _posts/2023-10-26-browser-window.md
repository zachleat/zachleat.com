---
title: browser-window Web Component
titleHtml: '&lt;browser-window&gt; Web Component'
tags:
  - project
  - web-components
---
A lightweight themed zero-dependency web component wrapper to emulate a Safari-esque browser window for demos and presentations.

* [Demo](https://zachleat.github.io/browser-window/demo.html)
* [Repository](https://github.com/zachleat/browser-window)

Originally used in the slide deck for [This Web Site is a Tech Talk](/web/this-website-is-a-tech-talk/).

Notably (as this component is best for demos) it does use client rendering via Shadow DOM to add the markup for browser chrome around the content. Before JavaScript or without JavaScript, the fallback content is rendered as expected.

## Demos

<script type="module" src="/static/browser-window.js"></script>
<style>browser-window { display: block; margin: 0 0 1em; }</style>
<div>
	<browser-window>
		<p>Here’s a <em>live demo</em> of it in action.</p>
	</browser-window>
	<browser-window shadow>
		<p>This one has a shadow.</p>
	</browser-window>
	<p>This one has a URL bar (with favicon) and an iframe:</p>
	<browser-window shadow flush url="https://www.11ty.dev/" icon>
		<iframe sandbox src="https://www.11ty.dev/" scrolling="no" style="pointer-events: none; width: 100%; height: 250px; border: 0; overflow: hidden"></iframe>
	</browser-window>
	<p>Or maybe another demo of a screenshot of the <a href="https://zachleat.github.io/browser-window/demo.html">demo page</a>:</p>
	<browser-window flush shadow url="https://zachleat.github.io/browser-window/demo.html">
	{% screenshotImageHtmlFullUrl "https://zachleat.github.io/browser-window/demo.html" %}
</browser-window>
</div>