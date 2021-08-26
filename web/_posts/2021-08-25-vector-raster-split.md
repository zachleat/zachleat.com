---
title: Vector? Raster? Why Not Both!
seo:
  openGraphBackgroundImage: /web/img/posts/vector-raster-split/preview.jpg
tags:
  - popular-posts
postRank: 1
---
This week I ran into an interesting class of problem that—in hindsight—could use a much better workflow. Does it exist?

<picture>
  <source type="image/webp" srcset="/web/img/posts/vector-raster-split/preview.webp 1159w">
  <source type="image/png" srcset="/web/img/posts/vector-raster-split/preview.png 1159w">
  <img src="/web/img/posts/vector-raster-split/preview.png" alt="Screenshot of jamstackconf.com" loading="lazy" decoding="async" width="1159" height="849">
</picture>

It has to do with the hero image on the right side of the home page on jamstackconf.com. We work using Figma on the marketing team at Netlify and my first attempt at exporting this image was fraught with peril.

## Attempt 1: SVG

* `10.1 MB` Original Export from Figma as SVG {% comment %}/web/img/posts/vector-raster-split/full.svg{% endcomment %}
* `9.9 MB` SVG optimized with [SVGOMG](https://jakearchibald.github.io/svgomg/) {% comment %}/web/img/posts/vector-raster-split/full-svgomg.svg{% endcomment %}

Now I know that these sizes are the uncompressed file sizes (before GZIP/Brotli) but I think we can both agree that even an optimized 9.9 MB is a bridge too far for even the starchiest of compression algorithms _(Update: 9.9 MB gzipped to 7.36 MB)_. There are just too many embedded raster images inside of this SVG to yield good results from SVGOMG alone. Let’s swap to raster and see how far we can go.

## Attempt 2: PNG

<details class="livedemo livedemo-dark livedemo-flush">
  <summary><code>1.2 MB</code> Original Export from Figma as PNG</summary>
  <img src="/web/img/posts/vector-raster-split/full.png" alt="Full PNG version" loading="lazy" decoding="async" width="1786" height="1786">
</details>

So y’all know me well enough that I won’t be putting a 1.2 MB hero image in that prime area of viewport real estate. Let’s try some basic optimizations. The important thing to note here is that we need to preserve the image’s transparency. If the background color changes, I don’t want to have to reoptimize this image. That rules out a conversion to JPEG.

### ImageOptim

<details class="livedemo livedemo-dark livedemo-flush">
  <summary><code>831 KB</code> PNG optimized with ImageOptim</summary>
  <img src="/web/img/posts/vector-raster-split/full-imageoptim.png" alt="ImageOptim PNG version" loading="lazy" decoding="async" width="1786" height="1786">
</details>

I was impressed with the ~400 KB savings here from a single drag-and-drop onto ImageOptim but 831 is still too high.


### [Squoosh](https://squoosh.app/)

<details class="livedemo livedemo-dark livedemo-flush">
  <summary><code>376 KB</code> PNG optimized with Squoosh (Reduced Palette to 256 colors)</summary>
  <img src="/web/img/posts/vector-raster-split/full-squoosh.png" alt="Squoosh PNG version" loading="lazy" decoding="async" width="1786" height="1786">
</details>

Now we’re cooking with gas. That Reduced Palette option offered a huge savings! I did play around with the AVIF format settings on Squoosh a bit but wasn’t able to beat the PNG file size.

## Attempt 3: WebP

<details class="livedemo livedemo-dark livedemo-flush" open>
  <summary><code>152 KB</code> WebP optimized with Squoosh (Lossless, Reduced Palette to 256 colors)</summary>
  <picture>
    <source type="image/webp" srcset="/web/img/posts/vector-raster-split/full-squoosh.webp 1786w">
    <source type="image/png" srcset="/web/img/posts/vector-raster-split/full-squoosh.png 1786w">
    <img src="/web/img/posts/vector-raster-split/full-squoosh.png" alt="Squoosh WebP version" loading="lazy" decoding="async" width="1786" height="1786">
  </picture>
</details>

Wow, this is a really nice file size savings! And we’ll use `<picture>` here to progressively enhance our PNG to WebP. Many might consider this to be “good enough” but the entire point of this blog post is my next trick _(\*waves jazz hands\*)_.


## The Winner: Two Separate Layers: SVG + WebP

If we separate the stuff that vectors are good at (gradients, lines, etc.) and put that into an SVG and put the rest into the raster format, we can achieve even more savings! Now I did take a bit of the easy way out here—I didn’t put as much into the vector layer as I could have. And you may want to preserve more of the image in the foreground for things like “printing” (as if anyone still did that).

<div style="display: flex; gap: 5vw">
  <div class="livedemo livedemo-dark livedemo-flush" data-demo-label="">
    <img src="/web/img/posts/vector-raster-split/subset-svgomg.svg" alt="2 Layers, SVG version optimized with SVGOMG" loading="lazy" decoding="async" width="1786" height="1786">
  </div>
  <div class="livedemo livedemo-dark livedemo-flush" data-demo-label="">
    <picture>
      <source type="image/webp" srcset="/web/img/posts/vector-raster-split/subset-squoosh.webp 1786w">
      <source type="image/png" srcset="/web/img/posts/vector-raster-split/subset-squoosh.png 1786w">
      <img src="/web/img/posts/vector-raster-split/subset-squoosh.png" alt="Squoosh WebP version" loading="lazy" decoding="async" width="1786" height="1786">
    </picture>
  </div>
</div>

Using the raster layer as the foreground image and the supplementary vector image as a CSS `background-image`, we can combine the two! You may even be able to dump the optimized raster back into the SVG as a Data URI embedded in an `<image>` if you want to get real fancy—I didn’t go down that road.

<details class="livedemo livedemo-dark livedemo-flush" open>
  <summary><code>74 KB</code> + <code>4.2 KB</code> Optimized SVG plus WebP (with a PNG fallback)</summary>
  <style>
    .demo-img-layering {
      background-size: cover;
    }
  </style>
  <picture>
    <source type="image/webp" srcset="/web/img/posts/vector-raster-split/subset-squoosh.webp 1786w">
    <source type="image/png" srcset="/web/img/posts/vector-raster-split/subset-squoosh.png 1786w">
    <img src="/web/img/posts/vector-raster-split/subset-squoosh.png" alt="Two layers" loading="lazy" decoding="async" width="1786" height="1786" style="background-image: url(/web/img/posts/vector-raster-split/subset-svgomg.svg)" class="demo-img-layering">
  </picture>
</details>

## Final Results

From 10.06 MB to 78 KB—a savings of 9.9 MB.  Not too bad.

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Size</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Original SVG</td>
      <td>10.06 MB</td>
      <td></td>
    </tr>
    <tr>
      <td>SVG optimized with SVGOMG</td>
      <td>9.92 MB</td>
      <td><em class="better">-0.14 MB</em></td>
    </tr>
    <tr>
      <td>PNG</td>
      <td>1.16 MB</td>
      <td><em class="better">-8.76 MB</em></td>
    </tr>
    <tr>
      <td>PNG optimized with ImageOptim</td>
      <td>831 KB</td>
      <td><em class="better">-329 KB</em></td>
    </tr>
    <tr>
      <td>PNG optimized with Squoosh</td>
      <td>376 KB</td>
      <td><em class="better">-455 KB</em></td>
    </tr>
    <tr>
      <td>WebP optimized with Squoosh</td>
      <td>152 KB</td>
      <td><em class="better">-224 KB</em></td>
    </tr>
    <tr>
      <td>Two Layers: SVG (SVGOMG), WebP (Squoosh)</td>
      <td>78 KB</td>
      <td><em class="better">-74KB</em></td>
    </tr>
  </tbody>
</table>

Savings are in comparison to the previous attempt.

_Disclaimer: ~~If you check the above sizes to the currently implemented version on jamstackconf.com the raster image layer may be larger than expected! I still need to merge a PR to ship some final optimizations!~~ The PR has shipped!_
