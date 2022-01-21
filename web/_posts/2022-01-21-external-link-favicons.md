---
title: CSS-only External Link Favicons
tags:
  - project
---
Saw a [fascinating idea in a tweet from @simevidas to show favicons on external links](https://twitter.com/simevidas/status/1481753210578690064) on a site. Full credit for the original idea to [Kiko Beats](https://kikobeats.com/).

The implementation used an icon font to store the favicons. I think we can improve on this idea (do y’all want to maintain an icon font 😅) to save some future maintenance using [IndieWeb Avatar](/web/indieweb-avatar/). This will allow the images to auto-update when a site updates their favicon (per server caching rules).

Add this CSS to see it in action:

```css
a[href*="twitter.com"]:before {
  content: "";
  display: inline-block;
  vertical-align: text-bottom;
  width: 1em;
  height: 1em;
  margin: 0 .2em;
  background-size: contain;
  background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.twitter.com%2F/");
}
```

## Demo

<div class="demo">
  <ul>
    <li><a href="https://twitter.com/">twitter.com</a></li>
    <li><a href="https://www.wikipedia.org/">wikipedia.org</a></li>
    <li><a href="https://www.google.com/">google.com</a></li>
    <li><a href="https://www.zachleat.com/">zachleat.com</a></li>
    <li><a href="https://www.netlify.com/">netlify.com</a></li>
    <li><a href="https://www.11ty.dev/">11ty.dev</a></li>
  </ul>
</div>

<style>
a[href*="twitter.com"]:before,
.demo a[href*="wikipedia.org"]:before,
.demo a[href*="zachleat.com"]:before,
.demo a[href*="netlify.com"]:before,
.demo a[href*="11ty.dev"]:before,
.demo a[href*="google.com"]:before {
  content: "";
  display: inline-block;
  vertical-align: text-bottom;
  width: 1em;
  height: 1em;
  background-size: cover;
  margin: 0 .2em;
}
a[href*="twitter.com"]:before {
  background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.twitter.com%2F/");
}
.demo a[href*="wikipedia.org"]:before {
  background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.wikipedia.org%2F/");
}
.demo a[href*="google.com"]:before {
  background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.google.com%2F/");
}
.demo a[href*="zachleat.com"]:before {
  background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.zachleat.com%2F/");
}
.demo a[href*="netlify.com"]:before {
  background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.netlify.com%2F/");
}
.demo a[href*="11ty.dev"]:before {
  background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2F/");
}
</style>

## Bonus

Add `<link href="https://v1.indieweb-avatar.11ty.dev" rel="preconnect" crossorigin>` if these images are in your critical rendering path (tip: you should try to not do this).