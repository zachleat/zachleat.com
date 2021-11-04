---
title: Recycling Open Graph Images for display on my Web Site
tags:
  - project
  - eleventy
  - popular-posts
seo:
  openGraphBackgroundImage: /og/sources/canrainbow.jpg
postRank: 8
---
<div class="primarylink"><a href="https://github.com/11ty/api-opengraph-image"><code>11ty/api-opengraph-image</code> on GitHub</a></div>

The Eleventy API ecosystem is growing for a fourth time.

* [Screenshots](/web/screenshots/)
* [Sparklines](/web/sparklines/)
* [IndieWeb Avatars](/web/indieweb-avatar/)
* And now [Open Graph](https://ogp.me/) images.

_[Get a sneak peek at an early version of the Eleventy API Explorer.](https://api-explorer.11ty.dev/)_

Open Graph images are those little pictures that show up when your site is shared on social media. I made the [ones on my site better](/web/automatic-opengraph/) recently.

And while it was nice to have some prettier things displaying on social media—I wanted to reuse the visuals on my own web site too. So, I built an image service that would find the Open Graph images for a web page.

I’m now using it on [my home page](/):

<div class="livedemo">
  <img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.zachleat.com%2F/large/"
    alt="Screenshot of https://www.zachleat.com/"
    width="1024"
    height="1024"
    decoding="async"
    loading="lazy">
</div>

The image service:

1. Takes a URL
1. Looks at the markup for that URL and finds the Open Graph image in use
1. Resizes and optimizes the image
1. Returns the result

Now I’d just like to pause for a second and appreciate the authoring workflow when I create a new blog post: I create a new markdown file. I pick a background image to use (usually from [Unsplash](https://unsplash.com/)) and point to that image path in the front matter of my markdown file.

The Open Graph image is created automatically and resized/optimized. The preview thumbnail on my home page now reuses that same Open Graph image for nice visuals on my own site. It’s even nicer if I add a YouTube video to the front matter for the post—the cover image is downloaded from the video and used automatically.

When I want to make changes, I do so in one place and it cascades to all of these different spots automatically.

## Attribution

For me, this all ties back to good visual attribution. Of course, this example is very self serving—but it works with any external site too!

When I want to link to a person: I’ll use their [IndieWeb Avatar](/web/indieweb-avatar/) next to their name.

When I want to link to a specific web page, I now have two options:

* Use the optimized Open Graph image for that page.
* Use an Open Graph sized [screenshot](/web/screenshots/) for that page. 

[Nicolas Hoizey has already suggested](https://github.com/11ty/api-opengraph-image/issues/1) that this service fall back to the screenshot if the Open Graph image is not found—great idea!

## A love letter to On-demand Builders

This Eleventy API service renaissance is owed largely to [Netlify’s On-demand Builders](https://docs.netlify.com/configure-builds/on-demand-builders/) feature. Running a JavaScript file in the cloud and caching the output on the Edge CDN for all repeat requests (with no extra cost in Functions quotas) is incredibly powerful. It’s awesome. I love it. (Please do remember that I am employed by Netlify).

I’ve already built four hosted services and made sure that the [Eleventy Serverless plugin](https://www.11ty.dev/docs/plugins/serverless/) was compatible with the feature. I can absolutely say that none of those things would exist without On-demand Builders. I already have more ideas for more stuff—this is an awesome time to be a builder, y’all!

## Demos

Here are a few examples, fetching Open Graph images from a bunch of sites around the web:

<style>
@supports (object-fit: cover) {
  .demo-ogimage {
    max-height: 12.3125rem; /* 197px /16 */
    object-fit: cover;
  }
}
</style>

<div class="livedemo">
  <a href="https://www.zachleat.com/web/state-of-eleventy/">
    <picture>
      <source type="image/webp" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.zachleat.com%2Fweb%2Fstate-of-eleventy%2F/small/webp/ 375w" sizes="100vw">
      <source type="image/jpeg" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.zachleat.com%2Fweb%2Fstate-of-eleventy%2F/small/jpeg/ 375w" sizes="100vw">
      <img alt="OpenGraph image for https://www.zachleat.com/web/state-of-eleventy/" loading="lazy" decoding="async" src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.zachleat.com%2Fweb%2Fstate-of-eleventy%2F/small/jpeg/" width="375" height="197" class="demo-ogimage">
    </picture>
  </a>
</div>

The above Open Graph image is using a YouTube video cover image in the background.

<div class="livedemo">
  <a href="https://www.netlify.com/blog/2021/10/25/faster-more-reliable-page-loads-with-update-to-on-demand-builders/">
    <picture>
      <source type="image/webp" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.netlify.com%2Fblog%2F2021%2F10%2F25%2Ffaster-more-reliable-page-loads-with-update-to-on-demand-builders%2F/small/webp/ 375w" sizes="100vw">
      <source type="image/jpeg" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.netlify.com%2Fblog%2F2021%2F10%2F25%2Ffaster-more-reliable-page-loads-with-update-to-on-demand-builders%2F/small/jpeg/ 375w" sizes="100vw">
      <img alt="OpenGraph image for https://www.netlify.com/blog/2021/10/25/faster-more-reliable-page-loads-with-update-to-on-demand-builders/" loading="lazy" decoding="async" src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.netlify.com%2Fblog%2F2021%2F10%2F25%2Ffaster-more-reliable-page-loads-with-update-to-on-demand-builders%2F/small/jpeg/" width="375" height="197" class="demo-ogimage">
    </picture>
  </a>
</div>

<div class="livedemo">
  <a href="https://css-tricks.com/">
    <picture>
      <source type="image/webp" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fcss-tricks.com%2F/small/webp/ 375w" sizes="100vw">
      <source type="image/jpeg" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fcss-tricks.com%2F/small/jpeg/ 375w" sizes="100vw">
      <img alt="OpenGraph image for https://css-tricks.com/" loading="lazy" decoding="async" src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fcss-tricks.com%2F/small/jpeg/" width="375" height="197" class="demo-ogimage">
    </picture>
  </a>
</div>

<div class="livedemo">
  <a href="https://responsiblejs.dev/">
    <picture>
      <source type="image/webp" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fresponsiblejs.dev%2F/small/webp/ 375w" sizes="100vw">
      <source type="image/jpeg" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fresponsiblejs.dev%2F/small/jpeg/ 375w" sizes="100vw">
      <img alt="OpenGraph image for https://responsiblejs.dev/" loading="lazy" decoding="async" src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fresponsiblejs.dev%2F/small/jpeg/" width="375" height="375" class="demo-ogimage">
    </picture>
  </a>
</div>

<div class="livedemo">
  <a href="https://million-devs.netlify.com/">
    <picture>
      <source type="image/webp" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fmillion-devs.netlify.com%2F/small/webp/ 375w" sizes="100vw">
      <source type="image/jpeg" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fmillion-devs.netlify.com%2F/small/jpeg/ 375w" sizes="100vw">
      <img alt="OpenGraph image for https://million-devs.netlify.com/" loading="lazy" decoding="async" src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fmillion-devs.netlify.com%2F/small/jpeg/" width="375" height="197" class="demo-ogimage">
    </picture>
  </a>
</div>

<div class="livedemo">
  <a href="https://jamstackconf.com/">
    <picture>
      <source type="image/webp" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fjamstackconf.com%2F/small/webp/ 375w" sizes="100vw">
      <source type="image/jpeg" srcset="https://v1.opengraph.11ty.dev/https%3A%2F%2Fjamstackconf.com%2F/small/jpeg/ 375w" sizes="100vw">
      <img alt="OpenGraph image for https://jamstackconf.com/" loading="lazy" decoding="async" src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fjamstackconf.com%2F/small/jpeg/" width="375" height="197">
    </picture>
  </a>
</div>

_I have now realized that I am slowly creating all of the building blocks necessary to create a social network. Please send help._


---
_Open Graph post background image by <a href="https://unsplash.com/@jannerboy62?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nick Fewings</a> on <a href="https://unsplash.com/s/photos/recycle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>._
