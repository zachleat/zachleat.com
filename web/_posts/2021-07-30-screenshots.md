---
title: 'Building an Automated Screenshot Service on Netlify in about 100 Lines of Code'
tags:
  - eleventy
  - project
---
<style>
.screenshot {
  border: 2px solid #ddd;
  border-radius: .3em;
}
</style>

> This post is a continuation of the ideas first presented in [How and Why I Removed 3000 Images from the Eleventy Docs Build](/web/ondemand-builders/).

The idea is pretty simple: a service that will accept a URL as input and return a static screenshot image of that URL to embed and use on other web sites. The [code is pretty simple too, about 140 lines](https://github.com/11ty/api-screenshot/blob/d7fd9c74389e14601a3a3a3a45805a1e59d9de51/functions/screenshot.js).

Having a service for these images is important as the Eleventy docs use a lot of visuals from Built With Eleventy sites around the web—it wouldn’t be feasible to generate these manually.

The end result looks something like this ([`11ty.dev/docs`](https://www.11ty.dev/docs/) is shown):

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/small/9:16/" class="screenshot screenshot-first-example" width="375" height="667" loading="lazy" decoding="async" alt="Screenshot of 11ty.dev">

And the URL for the above image is `https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/small/9:16/`.

You can see this [live](https://www.11ty.dev/#built-with-eleventy) in [production](https://www.11ty.dev/docs/starter/) now in a [few](https://www.11ty.dev/docs/tutorials/) different [places](https://www.11ty.dev/authors/smthdotuk/) on the Eleventy docs.

## Decisions, decisions

I think there were a few architecture decisions that went into this service that are worth documenting, so here goes:

1. This is now a separate repo and project from the main 11ty.dev site. This is important as it decouples our On-demand Builder cache for this service away from the main web site, which deploys with a much higher frequency.
1. This is best used with lower priority images, things that live further down the page (dare I say, below the imaginary fold). Words great with `<img loading="lazy">`. ⚠️ ABSOLUTELY not for use with HERO IMAGES or on something that might be eligible for your LCP!!! _(I warned you with three exclamation marks.)_
    * Best paired with preconnect: `<link href="https://v1.screenshot.11ty.dev" rel="preconnect" crossorigin>`.
1. Sizing options are limited to improve cache hits. Currently we only offer 11 different image combinations for each URL. This will likely increase over time as we add additional options, like sizes or aspect ratios or maybe even a no-JavaScript mode. We want cache hits to make these things fast and reduce the request count to external web sites.
    * I added an Open Graph size (you know, for those cards that show up on social media posts). I’m currently playing around with this as a way to do super-lazy custom Open Graph images for every page. Each page can have an Open Graph image that’s a screenshot of itself!
1. One negative of generating these in a serverless function is that image formats are a bit harder to manage. This means that only JPEG is supported for now. Especially with the [version of Puppeteer that barely fits in a serverless bundle](https://www.npmjs.com/package/chrome-aws-lambda), I’m still trying to figure out how to bundle it with `sharp` and `eleventy-img` too.
1. The entire thing is versioned using [Netlify Branch subdomains](https://docs.netlify.com/domains-https/custom-domains/multiple-domains/#branch-subdomains): e.g. `https://v1.screenshot.11ty.dev`. If I want to change the API later I’ll bump it to `v2` and just leave the old branch as-is. Of particular note is that https://screenshot.11ty.dev (without the version) redirects via an HTTP 301 to `v1` and will do so permanently. Don’t rely on this redirect (for performance reasons).

## What happens if a site is super slow or is currently down?

Netlify Functions have a 10 second execution limit. If the site doesn’t render in 10 seconds, we show a fallback image by default. Currently this is a low-contrast 11ty logo using the same image size as the requested screenshot (via SVG `width` and `height` attributes).

We don’t use a HTTP 500 status code on errors. In Firefox, the fallback image didn’t render when an error code was used. Because we aren’t using a HTTP 500 status code, the On-demand Builder _will_ cache the fallback image for this request. This is good to prevent a bunch of re-requests to slow sites that don’t make the cutoff (or have a different error) but also means if a request had an outlier response time then the fallback image will continue to be used until the On-demand Builder cache is invalidated with a new build.

We include the real error message in a custom `x-error-message` HTTP Header, if you want more insight into why a screenshot failed.

## Can I Use Your Instance For My Site?

Um… I’m not sure yet. For now I’d recommend just self hosting it. You can click this button to do it:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/11ty/api-screenshot
"><img src="https://www.netlify.com/img/deploy/button.svg" border="0" alt="Deploy to Netlify"></a>

The full [source code is available on GitHub](https://github.com/11ty/api-screenshot/).

## Demos

### Small (375px viewport width)

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/small/9:16/larger/" class="screenshot" width="375" height="667" loading="lazy" decoding="async" alt="Screenshot of 11ty.dev">

`https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/small/9:16/larger/`

### Medium (650px viewport width)

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/medium/9:16/larger/" class="screenshot" width="650" height="1156" loading="lazy" decoding="async" alt="Screenshot of 11ty.dev">

`https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/medium/9:16/larger/`

### Large (1024px viewport width)

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/large/1:1/larger/" class="screenshot" width="1024" height="1024" loading="lazy" decoding="async" alt="Screenshot of 11ty.dev">

`https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/large/1:1/larger/`

### Open Graph (1200×630)

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/opengraph/" class="screenshot" width="1200" height="630">

`https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/opengraph/`
