---
title: 'IndieWeb Avatar, yet another Eleventy Image Service API'
tags:
  - project
  - eleventy
  - popular-posts
postRank: 5
---
The Eleventy API ecosystem is growing (again).

* [Screenshots](/web/screenshots/)
* [Sparklines](/web/sparklines/)
* And now, avatars.

I use Twitter avatars everywhere. They require an Twitter Developer account and an API key to implement. They require the talent being pictured to have a Twitter account (not everyone does). I wanted a more open alternative. I decided to build a little image service that would fetch the icon from any web site, optimize it using [Eleventy Image](https://www.11ty.dev/docs/plugins/image/), and return that instead.

## Demo

<style>
img[src^="https://v1.indieweb-avatar.11ty.dev"] {
  border-radius: 6px;
}
</style>
<img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2F/" width="50" height="50" alt="IndieWeb Avatar for 11ty.dev/" loading="lazy" decoding="async"> <img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.a11yproject.com%2F/" width="50" height="50" alt="IndieWeb Avatar for a11yproject.com/" loading="lazy" decoding="async"> <img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.netlify.com%2F/" width="50" height="50" alt="IndieWeb Avatar for netlify.com/" loading="lazy" decoding="async"> <img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fviljamis.com%2F/" width="50" height="50" alt="IndieWeb Avatar for viljamis.com/" loading="lazy" decoding="async"> <img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fashur.cab%2Frera%2F/" width="50" height="50" alt="IndieWeb Avatar for ashur.cab/rera/" loading="lazy" decoding="async"> <img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fnicolas-hoizey.com%2F/" width="50" height="50" alt="IndieWeb Avatar for nicolas-hoizey.com/" loading="lazy" decoding="async">

If you want a live demo in the wild, check out the [Eleventy Leaderboards (via Speedlify)](https://www.11ty.dev/speedlify/).

## Source Code

<div class="primarylink"><a href="https://github.com/11ty/api-indieweb-avatar">https://github.com/11ty/api-indieweb-avatar</a></div>

Only one path parameter is supported right now: `/[url]/` (must be encoded via e.g. `encodeURIComponent`)

My version is running on `https://v1.indieweb-avatar.11ty.dev/` using the same versioning via [Netlify Branch Subdomains](https://docs.netlify.com/domains-https/custom-domains/multiple-domains/#branch-subdomains) strategy as the screenshot and sparkline services.

It makes use of Netlify’s On-Demand Builders to reduce the number of external HTTP requests to generate the images.

## Deploy your own

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/11ty/api-indieweb-avatar"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>
