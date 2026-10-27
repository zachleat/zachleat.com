---
title: The Magical Eleventy v2.0 Beta Release
date: 2023-01-20
tags: eleventy
---
I am super delighted to announce the [very first beta release of Eleventy v2.0](https://www.11ty.dev/blog/eleventy-v2-beta/)! This is our first major release after [Netlify’s full time sponsorship of the project](/web/eleventy-oss/).

* 🪢 Dependencies decreased by 32.1%
* 🔬 `node_modules` size decreased by 77.8%
* 🚄 30.5% faster npm install
* 🏠 Incremental Builds
* 💻 New Dev Server with DOM-diffing live reload
* 🔌 Plugins for Edge rendering, i18n, Vite
* 🛠 Support for WebC

```sh
npm install @11ty/eleventy@beta
```

Read the [**full release notes on 11ty.dev**](https://www.11ty.dev/blog/eleventy-v2-beta/) or [on GitHub](https://github.com/11ty/eleventy/releases/tag/v2.0.0-beta.1).

If you want to **help spread the word**, I would love a [boost on this toot](https://fosstodon.org/@eleventy/109711447318774161)! Or, even a [star on GitHub would be lovely too](https://github.com/11ty/eleventy)!


## Release Video

{% renderTemplate "webc" %}<div><youtube-lite-player @slug="TcTR0TLqM3I" :@label="$data.title"></youtube-lite-player></div>{%- endrenderTemplate %}
