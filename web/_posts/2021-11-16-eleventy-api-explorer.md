---
title: The Eleventy API Explorer
tags:
  - project
  - eleventy
  - popular-posts
external_url: 'https://api-explorer.11ty.dev/'
urls:
  docs: 'https://www.11ty.dev/docs/api-services/'
ignoreExternalLinkInLayoutFile: true
postRank: 11
---
Right now the Eleventy API ecosystem has four services.

* [Screenshots](/web/screenshots/)
* [Sparklines](/web/sparklines/)
* [IndieWeb Avatars](/web/indieweb-avatar/)
* [Open Graph images](/web/api-opengraph-image/)

I wanted an easy way to test each of these services, so I built the [Eleventy API Explorer]({{ external_url }}). Check it out:

{% originalPostEmbed external_url %}

Test out the [API Explorer for my last blog post]({{ external_url }}?url={{ "https://www.zachleat.com/web/eleventy-render-plugin/" | url_encode }}).

---

And the suite of services have finally found a real home on the Eleventy documentation, too:

{% originalPostEmbed urls.docs %}

---

Marginally related, this is a great small example of a project that runs entirely through [Eleventy Serverless](https://www.11ty.dev/docs/plugins/serverless/).

Everything runs through the [main `index.njk` template](https://github.com/11ty/api-explorer/blob/497ec182fdab08f9450ce7c2bd324e2101c38b5b/index.njk). Check out the [full source code on GitHub](https://github.com/11ty/api-explorer).
