---
title: The State of Eleventy (2021) in Two Minutes
tags:
  - eleventy
  - video
  - speaking
metadata:
  youtubeId: kcRtANKWCLQ
medialength: 2 min
---
Maybe you watched [last year’s Jamsnack video for Jamstack Conf 2020](/web/jamsnack/). It’s that time again! I made a short two minute video for Jamstack Conf 2021.

{% youtubeEmbed metadata.youtubeid %}

## What’s New in 2021?

* Speed and Simplicity. Productive for beginners, trusted by experts.
* [Two Million Downloads!](https://www.11ty.dev/blog/2million/)
* [10,000 stars on GitHub](https://github.com/11ty/eleventy)
* Excellent community events from [Eleventy Meetup](https://11tymeetup.dev/) and the [11ties](https://www.meetup.com/JAMstack-Toronto/events/281278073/) (Jamstack Toronto)
* [Eleventy Leaderboards](http://www.11ty.dev/speedlify/)
* Choose your own Starter Project: we added a new visual view to our starter project list, complete with automatic updating lighthouse scores for each. [Filter the list by projects with four hundos.](https://www.11ty.dev/docs/starter/) With new direct links to deploy each of these on Netlify, Stackblitz, and Glitch (when available).
* [Best-in-class Image Plugin](https://www.11ty.dev/docs/plugins/image/) supports first-class SVG and AVIF, works with `<img>`, `<picture>`, or even in your `CSS` (e.g. `background-image`).
* [Serverless Plugin](https://www.11ty.dev/docs/plugins/serverless/):
  - Render dynamic pages with Progressive Enhancement
  - Use [Distributed Persistent Rendering](https://www.netlify.com/blog/2021/04/14/faster-builds-for-large-sites-on-netlify-with-on-demand-builders-now-in-early-access/) to render and cache the first request
  - Battle tested on the home page of [11ty.dev](http://11ty.dev) and our author pages
  - Check out this [Rainglow color demo](https://rainglow.zachleat.dev/)
  - Data can be fetched at run time (e.g. [for live CMS previews](https://twitter.com/zachleat/status/1405650895665254406)) or [build time (for maximum speed)](https://www.11ty.dev/docs/plugins/serverless/#re-use-build-time-cache-from-the-cache-assets-plugin)
* Open source API services
  - [Screenshots](https://www.zachleat.com/web/screenshots/)
  - [IndieWeb Avatars](https://www.zachleat.com/web/indieweb-avatar/)
  - [Sparklines](https://www.zachleat.com/web/sparklines/)
* Folks are building tools on top of Eleventy:
  - [SSR Web Components with LitHTML](https://twitter.com/eleven_ty/status/1384962580423323649)
  - [Rocket](https://rocket.modern-web.dev/)
  - [Slinkity](https://slinkity.dev/)
  - [Partial Hydration with Preact](https://markus.oberlehner.net/blog/building-partially-hydrated-progressively-enhanced-static-websites-with-isomorphic-preact-and-eleventy/)
  - and a bunch more I’ve missed I’m sure! Feel free to <a href="https://github.com/zachleat/zachleat.com/tree/master/{{ page.inputPath }}">add yours</a>.


### [We launched our first 1.0 Beta release!](https://www.11ty.dev/blog/eleventy-v1-beta/)

