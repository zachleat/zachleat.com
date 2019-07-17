---
title: Bridgy for Webmentions with Brotli
tags: []
---
**Summary**: Just a fair warning if you use the amazing [Bridgy](https://brid.gy) service to gather webmentions from social networking sites. It won’t actually work with your site if you’re using Brotli compression. Use gzip for your HTML requests instead of Brotli and it will work fine.

---

On June 11, 2019 I tweeted:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Upgraded zachleat.com from Zopfli to Brotli compression this morning (only used if the browser supports it).<br><br>Saves a few more KB to spend frivolously on web fonts and facepiles 😇</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/1138427969326723073?ref_src=twsrc%5Etfw">June 11, 2019</a></blockquote>

Unfortunately, I would learn much later that this would cause my webmentions to stop working too!

I logged into [webmention.io](https://webmention.io/) and had zero new webmentions from Twitter coming in. My webmentions from Twitter come from [Bridgy](https://brid.gy). I logged into my [Bridgy admin panel](https://brid.gy/twitter/zachleat) and saw a bunch of errors:

> No webmention support: <span class="break">https://www.zachleat.com/web/css-tricks-web-fonts/</span>

Apparently this stopped working when I added Brotli compression to my web site. Bridgy doesn’t support Brotli compression so when it fetches my site it can’t decompress my HTML content for parsing. My site _does_ correctly fallback to uncompressed output when Brotli support is not advertised in the request’s `Accept-Encoding` header, but unfortunately Google App Engine assumes that all applications support Brotli compression and always includes this in request headers made on the service 😱. [Star this issue to ask Google App Engine developers to fix this!](https://issuetracker.google.com/issues/112277350)

Anyway, [I modified my site to compress gzip on HTML requests and use Brotli for everything else](https://github.com/zachleat/zachleat.com/commit/583b0a2d9d4113807524dedd766d3c468e75b6e3) (if supported). I’ll go back to [full Brotli after this issue is fixed 🏆](https://github.com/snarfed/bridgy/issues/878).

Hope this helps someone else!
