---
title: Speedy Screenshots, or How I Improved the Robustness of the Screenshot Service
---
_This is a reply to my own blog post: [Building an Automated Screenshot Service on Netlify in ~140 Lines of Code](/web/screenshots/)._

There is a limitation with the [Screenshot Service](https://www.11ty.dev/docs/services/screenshots/): when the page you’re taking a screenshot of is slow and/or very large, the request times out. [Quoth myself](/web/screenshots/#what-happens-if-a-site-is-super-slow-or-is-currently-down), from ~7 months ago:

> What happens if a site is super slow or is currently down?
>
> Netlify Functions have a 10 second execution limit. If the site doesn’t render in 10 seconds, we show a fallback image by default. Currently this is a low-contrast 11ty logo using the same image size as the requested screenshot (via SVG width and height attributes).

While this fallback behavior is _okay_ I was starting to see it more often than I’d like. Why, you might ask? Why would it take more than 10 seconds to fetch a screenshot?

Here’s a sample OpenGraph image declaration from the `<head>` of one of my blog posts ([the `<detail-utils>` one](/web/details-utils/)):

```html
<meta name="og:image" content="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.zachleat.com%2Fopengraph%2Fweb%2Fdetails-utils%2F/opengraph/">
```

When requesting this image, the `api-screenshot` service loads and renders https://www.zachleat.com/opengraph/web/details-utils/ using Puppeteer to return a `1200×630` screenshot `jpeg` image.

However, on that dedicated `/opengraph/web/details-utils/` page waits a big ’ol chunk of kryptonite. Specifically, this page makes _another screenshot service request_ 😅 to use **the referenced blog post** as a background image (in this case `/web/details-utils/`).

To be fair, it’s not the best architectural choice to chain two separate screenshot calls together—but you know what—whatever. I think it looks cool 😇

```css
background-image: url('https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.zachleat.com%2Fweb%2Fdetails-utils%2F/opengraph/');
```

Okay, fine. Let’s admit what happened here. I flew too close to the sun. I chained too many screenshots together. This was causing timeouts for larger/weightier blog posts and pages (showing the low-contrast SVG of the default 11ty logo).

Have I overengineered it? Yes. But if we engineer it more—it will modulo back around to normal levels of engineering. Maybe even underengineering. Right? That’s how this works? I’m not willing to admit the answer to this quite yet.

But I do know that we can fix it. And we can fix it without removing any of the links in the chain of prized and celebrated screenshots.

## Adding a new timeout

I started by adding a new timeout to the screenshot service:

1. _New:_ At 7 seconds (by default, 1.5 seconds before the `timeout` option), we attempt to [inject a clientside JavaScript `window.stop()`](https://github.com/puppeteer/puppeteer/issues/3238) on the page to cancel page load. The logic here is that a partially rendered page is better than the fallback 11ty logo.
1. At 8.5 seconds (by default), we use Puppeteer’s `timeout` property on the `goto` method to stop early. You can now customize this in the [Screenshot API url](https://www.11ty.dev/docs/services/screenshots/#custom-timeout). When this is hit, the fallback 11ty logo is shown.
1. At 10 seconds, the serverless function times out and shows a gnarly HTTP 502 with a text/plain error message. You _shouldn’t_ see this.
    * e.g. `{"errorMessage":"2022-02-20T02:00:14.320Z […truncated] Task timed out after 10.00 seconds"}`

For the second rendered screenshot in my Open Graph image chain, I’ve manually lowered the `timeout` option so that we can hit the clientside timeout on the second screenshot before the first screenshot hits the timeout too.

You can see it in action on this [12 second blocking external CSS file demo](https://www.zachleat.com/test/async-css-loading/default-12.html). Note that when the page loads successfully (after 12 seconds), it has a green background.

Now check out this screenshot of the 12 second demo with a 4 second screenshot timeout:

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.zachleat.com%2Ftest%2Fasync-css-loading%2Fdefault-12.html/small/_timeout:4/" alt="Screenshot showing a white background, the CSS file was not loaded" width="375" height="375" loading="lazy" decoding="async">

Previously, running the screenshot service against this page would have shown the fallback 11ty logo.

## Use `ttl` for fallback images

When an image times out and the 11ty logo fallback image is shown, we were forced to use a HTTP 200 status code for that condition or some browsers wouldn’t show the fallback image at all (Firefox). This was a bit of a problem because it meant that screenshots that timed out wouldn’t retry again until a new build was triggered (which could be a long time for a dedicated screenshots service).

Luckily Netlify added a [_Time to live_ `ttl`](https://docs.netlify.com/configure-builds/on-demand-builders/#time-to-live-ttl) option to On-demand builders that allows you to specify a fixed amount of time (minimum 60 seconds) before a request is invalidated and a new request is generated. Excitingly, we can now add the `ttl` specifically for requests that hit this timeout (and leave all of the successfully generated ones as-is)!

## Other Puppeteer improvements

The third thing I did was to add a grab bag of small performance tweaks to Puppeteer:

* `goto->waitUntil`: [Added `wait` option](https://www.11ty.dev/docs/services/screenshots/#custom-wait-conditions) to control when a specific screenshot considers the page to be “finished.”
* `screenshot->captureBeyondViewport`: Use `captureBeyondViewport: false` (default was `true`), this cuts the screenshot to the viewport size. I’m not sure how this is different but there is also a [`screenshot->clip` option in Puppeteer](https://github.com/11ty/api-screenshot/blob/ea2396fc287f362f466f8a61a328ab57a88a0b17/functions/screenshot.js#L59-L63).
* I also attempted the [GitHub approach to speed up Puppeteer](https://github.blog/2021-06-22-framework-building-open-graph-images/) (in the _Some Performance Gotchas_ section) but the approach only worked with foreground images.

## Things I didn’t do but should (?)

I could have removed the `api-opengraph` references from my site altogether. It’s my site. I have full knowledge of where the OpenGraph images are. I don’t need an external service to tell me that.

I could make requests directly to the screenshots API. However, `api-screenshot` doesn’t currently support image resizing with the `opengraph` viewport size—but `api-opengraph` **does** resize/optimize images.

I kept `api-opengraph` to get image optimization for free to avoid those weighty default `1200×630` images clogging up my page. I will likely improve the screenshot service to support at least one smaller OpenGraph image size (probably `600×315`) and additional image formats (`png` and `webp`) at some point. Feels like `v2.screenshot.11ty.dev` may be in our future.

## Good enough for now

With these changes in place, I haven’t seen any fallback 11ty logo screenshots on my site in quite some time!