---
title: Don’t Shut Down Your Business! Instead Use Eleventy Image
tags:
  - project
  - eleventy
  - popular-posts
postRank: 2
---
_This talk was first delivered for Jamstack Toronto._

Hello, Zach Leatherman here, [Local SSG Owner and 👍🏻 Image 👍🏻 Enthusiast 👍🏻](https://www.youtube.com/watch?v=22O6Nmjt-mw). Are your JavaScripts making too much noise all the time?

Well image optimization can’t solve that problem but I am here to tell you about [Eleventy 🖼 Image](https://www.11ty.dev/docs/plugins/image/)—an exciting new utility to perform build-time image transformations for both vector and raster images. It’s easy to use and it *does not require Eleventy*. You can use it in any Node.js script.


## Contents

* [The Hello World](#the-hello-world)
* [Remote Control](#remote-control)
* [Travel Size](#travel-size)
* [Please Don’t Make Me Write HTML](#please-dont-make-me-write-html)
* [SVG Flies First Class](#svg-flies-first-class)
* [CSS Background Check](#css-background-check)

## The Hello World

First, `npm install @11ty/eleventy-img` into your project.

<div class="livedemo top" data-demo-label="Notes for Beginners">{% markdown %}
* If you don’t have `npm`, [download and install Node.js](https://nodejs.org/en/).
* If you don’t have a project, run `npm init -y` in a new, empty directory.
{% endmarkdown %}</div>

Then head over to Unsplash and find yourself a nice image. I like to look for a nice picture of a Nebula. [Here’s a good Nebula](https://unsplash.com/photos/rTZW4f02zY8). Download a copy of this image locally to our project directory and name it `nebula.jpg`.

Make another file in our project directory called `demo.js` and use the following contents:

```js
const Image = require("@11ty/eleventy-img");

(async () => {
  let stats = await Image("nebula.jpg");

  console.log( stats );
})();
```

Run this script using `node demo.js` and you’ll see something like this:

```bash
~/Code/jamstack-toronto ᐅ node demo.js
{
  webp: [
    {
      format: 'webp',
      width: 7857,
      height: 7462,
      filename: '7fc15c7-7857.webp',
      outputPath: 'img/7fc15c7-7857.webp',
      url: '/img/7fc15c7-7857.webp',
      sourceType: 'image/webp',
      srcset: '/img/7fc15c7-7857.webp 7857w',
      size: 3439498
    }
  ],
  jpeg: [
    {
      format: 'jpeg',
      width: 7857,
      height: 7462,
      filename: '7fc15c7-7857.jpeg',
      outputPath: 'img/7fc15c7-7857.jpeg',
      url: '/img/7fc15c7-7857.jpeg',
      sourceType: 'image/jpeg',
      srcset: '/img/7fc15c7-7857.jpeg 7857w',
      size: 6245602
    }
  ]
}
```

By default, Eleventy Image creates a `webp` and `jpeg` version of the image you feed it, with the same dimensions. It looks like we fed it a very large image, `7857×7462` and a ~3MB `webp` plus a ~6MB `jpeg`.

If you want to create different formats, you can change this behavior using the `formats` option. It looks like this:

```js/5
const Image = require("@11ty/eleventy-img");

(async () => {
  let stats = await Image("nebula.jpg", {
    // ["webp", "jpeg"] is the default
    formats: ["jpeg"],
  });
})();
```

You can use `jpeg`, `png`, `webp`, `avif` (new!), and `svg` (although SVG requires an SVG input file).

## Remote Control

If you return to our lovely [Nebula image on Unsplash](https://unsplash.com/photos/rTZW4f02zY8), we can modify our script to download this remote image for us.

This is especially useful when your content is being driven from a CMS or other external data source. We want to optimize those images too.

Right click on our Nebula and retrieve [the big raw image URL](https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1127&q=80). You may want to remove the `w=` and `q=` parameter to get as close to the raw original as possible.

Instead of `nebula.jpg`, let’s use this URL.

```js
const Image = require("@11ty/eleventy-img");

(async () => {
  let stats = await Image("https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop", {
    formats: ["jpeg"]
  });

  console.log( stats );
})();
```

which outputs:

```bash
~/Code/jamstack-toronto ᐅ node demo.js
{
  jpeg: [
    {
      format: 'jpeg',
      width: 7857,
      height: 7462,
      filename: '2056cbb-7857.jpeg',
      outputPath: 'img/2056cbb-7857.jpeg',
      url: '/img/2056cbb-7857.jpeg',
      sourceType: 'image/jpeg',
      srcset: '/img/2056cbb-7857.jpeg 7857w',
      size: 6245511
    }
  ]
}
```

This is awesome because the request to the remote URL is cached (by default) for one day. No additional network requests are made. No source images are needed to be stored in your repo. You can work offline (even after the full day has passed) and it will use this cached copy. (Check out the [additional Caching options](https://www.11ty.dev/docs/plugins/image/#caching-remote-images-locally-new-in-image-0.3.0))

I use this for all of the avatars on [the 11ty.dev](https://www.11ty.dev/). The home page alone includes 522 separate images and still weighs only 852 KB.

Going back to our nebula image—at over 6MB—it’s obviously way too big.

## Travel Size

Let’s resize our Nebula to `1400px`.

```js/5
const Image = require("@11ty/eleventy-img");

(async () => {
  let stats = await Image("https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop", {
    formats: ["jpeg"],
    widths: [1400], // by default this uses the original size
  });

  console.log( stats );
})();
```

which outputs:

```bash/5,12
~/Code/jamstack-toronto ᐅ node demo.js
{
  jpeg: [
    {
      format: 'jpeg',
      width: 1400,
      height: 1329,
      filename: '2056cbb-1400.jpeg',
      outputPath: 'img/2056cbb-1400.jpeg',
      url: '/img/2056cbb-1400.jpeg',
      sourceType: 'image/jpeg',
      srcset: '/img/2056cbb-1400.jpeg 1400w',
      size: 170827
    }
  ]
}
```

A much more reasonable 170KB.

## Please don’t make me write HTML

If you don’t want to write the HTML, Eleventy Image can do that for you too.

```js/8-10
const Image = require("@11ty/eleventy-img");

(async () => {
  let stats = await Image("https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop", {
    formats: ["jpeg"],
    widths: [1400], // by default this uses the original size
  });

  console.log( Image.generateHTML(stats, {
    alt: "A bomb ass nebula",
  }) );
})();
```

Outputs:

```html
~/Code/jamstack-toronto ᐅ node demo.js
<img src="/img/2056cbb-1400.jpeg" width="1400" height="1329" alt="A bomb ass nebula">
```

What’s awesome here is that we get the `width` and `height` attributes of our output image added for free. This allows the browser to set the aspect ratio of the image while it’s loading to avoid Content Layout Shifts.

The second argument to `generateHTML` is any HTML attributes you’d like to include on the `<img>`. Make sure you include `alt` or we’ll throw an error! `alt=""` works fine.

It gets better. Let’s feed it a more complicated `stats` object, with more formats and more widths:

```js/4,5,10,11
const Image = require("@11ty/eleventy-img");

(async () => {
  let stats = await Image("https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop", {
    formats: ["avif", "webp", "jpeg"],
    widths: [600, 1200, 1800],
  });

  console.log( Image.generateHTML(stats, {
    alt: "A bomb ass nebula",
    loading: "lazy",
    decoding: "async",
  }) );
})();
```

Outputs:

```html
~/Code/jamstack-toronto ᐅ node demo.js
<picture>
  <source type="image/avif" srcset="/img/2056cbb-600.avif 600w, /img/2056cbb-1200.avif 1200w, /img/2056cbb-1800.avif 1800w">
  <source type="image/webp" srcset="/img/2056cbb-600.webp 600w, /img/2056cbb-1200.webp 1200w, /img/2056cbb-1800.webp 1800w">
  <source type="image/jpeg" srcset="/img/2056cbb-600.jpeg 600w, /img/2056cbb-1200.jpeg 1200w, /img/2056cbb-1800.jpeg 1800w">
  <img src="/img/2056cbb-600.jpeg" width="600" height="569" alt="A bomb ass nebula" loading="lazy" decoding="async">
</picture>
```

We just generated 9 different images (3 formats, 3 widths) and the `generateHTML` was smart and used `<picture>` instead of `<img>`. Hooray!

Next try passing a `sizes` attribute to your generateHTML call.

## SVG Flies First Class

It’s easy to do vector to raster conversion, too. This would likely work great for programmatically generating OpenGraph images, for example.

```js/3
const Image = require("@11ty/eleventy-img");

(async () => {
  let stats = await Image("https://upload.wikimedia.org/wikipedia/commons/f/fd/Ghostscript_Tiger.svg", {
    formats: ["avif"],
    widths: [1200],
  });

  console.log( stats );
})();
```

Outputs:

```bash
~/Code/jamstack-toronto ᐅ node demo-svg.js
{
  avif: [
    {
      format: 'avif',
      width: 1200,
      height: 1200,
      filename: '11efb293-1200.avif',
      outputPath: 'img/11efb293-1200.avif',
      url: '/img/11efb293-1200.avif',
      sourceType: 'image/avif',
      srcset: '/img/11efb293-1200.avif 1200w',
      size: 53041
    }
  ]
}
```

You can passthrough `svg` input to `svg` output too, which may seem strange. But when you’re using remote images, perhaps from a CMS, and you don’t know what image format the end user might be uploading, it’s useful to preserve the vector format if one is available! See also the [`svgShortCircuit` option](https://www.11ty.dev/docs/plugins/image/#skip-raster-formats-for-svg-new-in-image-0.4.0).

## CSS Background Check

_Note that this is the first example so far that uses Eleventy to function._

Using Eleventy Image with a CSS background image is only slightly more tricky. Consider the following Eleventy template (perhaps named `demo.11ty.js`) that outputs a CSS file:

```js
const Image = require("@11ty/eleventy-img");

module.exports.data = async function() {
  return {
    permalink: "/style.css"
  };
};

module.exports.render = async function () {
  let stats = await Image("nebula.jpg", {
    formats: ["jpeg"],
    widths: [600],
  });

  return `#hero-div {
    background-image: url(${stats.jpeg[0].url});
  }`;
};
```

You might image any number of things that Eleventy Image could be used for: Favicons, Open Graph images, raster images embedded inside of SVG using `<image/>`.

In addition to local file names and remote URL strings, the first argument to `Image()` could be a Buffer too—maybe even from [Puppeteer’s `page.screenshot()`](https://pptr.dev/#?product=Puppeteer&version=v5.5.0&show=api-pagescreenshotoptions).

## Go forth

Image optimization won’t mitigate your JavaScript performance costs, but it can make your page load faster and lighter! Eleventy Image can help.
