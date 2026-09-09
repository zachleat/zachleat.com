---
title: "I was tired of building 474 separate pages for Open Graph Images"
---
_Prior blog post (if you want the full context): [If I work really hard on my Open Graph Images, People will share my Blog Posts](/web/automatic-opengraph/) (2021 Aug)_

Here’s the gist:

> Open Graph images are those little pictures that show up when your site is shared on social media. […] Each individual blog post (on my website) has a dedicated Open Graph image page.

These Open Graph pages had the URL shape `/web/:title/opengraph/`.

This was great from a purist’s perspective (in that the Open Graph pages were built similarly to how I build other websites) but my perspective has changed a bit. I don’t think that server rendering a static page for each of the 474 blog posts is necessary! 🫣

Now I use [**one `/opengraph/` page**](/opengraph/) that **client renders** _(the horror!)_ the appropriate metadata for the Open Graph image. Client rendering here is an appropriate tradeoff for build time because this page is still going through a Chromium-based screenshot service and the ultimate deliverable is a static image. This page isn’t intended to be consumed by human beings (unless they _really_ want to, I dunno, I’m not your dad).

I now use this approach on a few places and it’s made implementing Open Graph support on websites much easier to build and manage:

- [zachleat.com](/opengraph/) (this is the web site you’re on now)
- [build.awesome.me](https://build.awesome.me/opengraph/)
- [speedlify.dev](https://speedlify.dev/opengraph/)

Importantly, there is no freeform mechanism on these pages to modify the content of the images via URL parameter. There is no `?text=…` to control the title text, it’s keyed off of the local page URL and that alone. I don’t want y’all to put whatever text you want next to my picture on my website (you have to do that on _your_ website 😘).