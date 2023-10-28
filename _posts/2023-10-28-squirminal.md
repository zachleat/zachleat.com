---
title: The Squirminal Web Component
tags:
  - project
  - web-components
---
A lightweight structural-only zero-dependency web component to progressively animate to reveal HTML content. I believe the name came from an awkward portmanteau of squirmy and terminal.

This one is a few years old (but I am currently cataloguing my web components) and was developed to fake an antique terminal for the web-based CLI used in the [Your Year on Netlify](https://your-year-on.netlify.com/) project.

* [Demo](https://squirminal.zachleat.dev/)
* [Repository](https://github.com/zachleat/squirminal)

<script type="module" src="/static/browser-window.js"></script>
<div><browser-window flush shadow url="https://squirminal.zachleat.dev/"><a href="https://squirminal.zachleat.dev/">{% screenshotImageHtmlFullUrl "https://squirminal.zachleat.dev/" %}</a></browser-window></div>

## Better than Before

When I worked on the slide deck for my [Smashing Conference talk in 2021](/web/this-website-is-a-tech-talk/), I developed a similar mechanism to do this, but in a much less efficient way: each syntax highlighted character was wrapped in an additional wrapper element on the server!

I wrote about this in [Queue Code—“Live” Code without Errors](https://www.zachleat.com/web/queue-code/) and you can play around with it on the demo below:

<div><browser-window flush shadow url="https://queuecode.zachleat.dev/"><a href="https://queuecode.zachleat.dev/">{% screenshotImageHtmlFullUrl "https://queuecode.zachleat.dev/" %}</a></browser-window></div>

That approach leaned heavily into server rendering unnecessarily—the whole point of this effect _required_ client interaction and the fallback experience was the original content in its entirety.

## Lessons learned

Squirminal is a better approach that doesn’t require expensive DOM modification on the server and is much more powerful—it can work with any arbitrary HTML content (e.g. lists, images, tables, etc—it’s not limited to syntax highlighted text) and leaves the original content intact and unmodified before or without JavaScript.

There is an important lesson here—in this case the best progressive enhancement compromise involved less server rendering! Ultimately this use case and interaction _required_ clientside interactivity, so it was okay to lean into that a bit more—while still building on a good progressive enhancement baseline.

Remember, progressive enhancement is a continuum of possible solutions—and it’s important to adjust where your solution lives on that continuum as needed and for your individual requirements (and hopefully your tools don’t force you into a corner before you can make those decisions).