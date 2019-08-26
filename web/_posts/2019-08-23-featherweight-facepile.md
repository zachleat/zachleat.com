---
title: A Featherweight Facepile
tags:
  - eleventy
  - project
---

Ever since Eleventy started an Open Collective to take financial backing (by request, mind you), I’ve had it on my to-do list to add an Eleventy Supporters page to [11ty.io](https://www.11ty.io/).

Fortunately, this is super straightforward using Open Collective’s lovely JSON API (no authentication or tokens required: 😱 but mostly 🎉). Have a look at the [members JSON for the 11ty organization](https://opencollective.com/11ty/members/all.json).

As I created the [Supporters page](https://www.11ty.io/docs/supporters/) from this data I noticed the same recurring problem that had plagued me before when using third party social avatars on my web site: the image dimensions and file sizes varied by _a lot_.

I wrote _ [The Crushing Weight of the Facepile](/web/facepile/)_ about this exact issue.

As an example, one individual image was over 500KB. This ballooned the supporters page up to 1.9MB of images—not good.

For the webmention avatars on my own site, I had already implemented a [JavaScript solution using IntersectionObserver](/web/facepile/). Specifically, the images would only be loaded when they were visible in the viewport. This was a nice solution for webmentions because they were supplementary to the main content of the page (the blog post). Using JavaScript seemed like a nice mitigation step. But it didn’t really _solve_ the root issue: the images were _too damn big_.

For the Eleventy Supporters page, the avatars *are* the primary content. I didn’t want to use JavaScript as a dependency to load these. I needed to solve the root issue: I needed smaller images.

## Enter Avatar Local Cache

I created a plugin called `avatar-local-cache` to help solve this problem.

<div class="primarylink"><a href="https://github.com/zachleat/avatar-local-cache"><code>avatar-local-cache</code> on GitHub</a> and on <a href="https://www.npmjs.com/package/avatar-local-cache">npm</a></div>

Here’s the things that Avatar Local Cache does:

1. Saves a remote image URL to the local file system (we no longer need to worry about broken images from a remote service).
1. Resize it to a maximum width that you specify. It will not upscale smaller images.
1. Automatically detect the format of the image and create `jpeg`, `png`, and `webp` versions of the image.
1. Run jpegtran on `jpeg` files and pngquant on `png` files to optimize them.
1. It then sorts these based on file size from smallest to largest.
    * If the `webp` format is *not* the smallest, it deletes the `webp` file from the file system.
    * Then it deletes the larger of the `png` versus the `jpeg`.

The return object from the plugin is an array of the smallest possible files you can use to create an HTML `<img>` or `<picture>` tag from. It contains one of `webp, jpeg` or `webp, png` or `jpeg` or `png`.

It might look something like (note that `webp` is first in the array):

```js
[
    {
        "name": "splitinfinities",
        "path": "img/avatar-local-cache/opencollective/william-riley.webp",
        "size": 1028
    },
    {
        "name": "splitinfinities",
        "path": "img/avatar-local-cache/opencollective/william-riley.jpg",
        "size": 1594
    }
]
```

For 11ty.io, I then iterate over this data to create a `<picture>` file if the array has two entries (the first is guaranteed to be a `webp`). It ends up looking like:

```html
<picture>
    <source srcset="/img/avatar-local-cache/opencollective/william-riley.webp" type="image/webp">
    <img src="/img/avatar-local-cache/opencollective/william-riley.jpg" alt="William Riley" loading="lazy">
</picture>
```

If the array had only one item it would be guaranteed to be `png` or `jpeg` and I could create an `<img>` tag instead of using `<picture>`.

## Results

For this particular avatar on the Supporters page, the [original URL from the opencollective API JSON](https://opencollective-production.s3.us-west-1.amazonaws.com/3e53bc60-bd71-11e9-977d-87c4e0ce5473.jpeg) was a 1240×1240 `jpeg` that weighed in at a whopping **121KB**.

The maximum width I used for the `avatar-local-cache` images was 73px. Of course this smaller image would be a smaller file size (and it was): the `webp` format was only **1028 bytes** and the fallback `jpg` format was 1594 bytes.

_For a single image, dropping from 121KB to 1KB is some real nice savings._

### Aggregate Savings

Before implementing `avatar-local-cache`, the Supporters page images weighed in at a total of **1.9MB**.

* Using `png` files only, the total weight dropped to 206KB.
* Using `jpg` files only, the total weight dropped to 122KB.
* Using `avatar-local-cache`’s smart image format selection (`webp,{jpg,png}` or `{jpg,png}`), the total weight dropped to **107KB**.

_For all of these images, dropping from 1.9MB to 107KB is pretty great!_

### Rollout

We use social avatars all over the place on 11ty.io. I ended up rolling out this solution to the entire site and it dropped the home page’s [image weight from **411KB to 102KB**](https://twitter.com/zachleat/status/1164905436950253569). There are _a lot_ of avatars on the home page (111 😎 at time of writing).

## Try it out!

Try this out (or at least some of the ideas presented here!) and I hope that it helps you create smaller sites. Third party images are tricky to manage, especially if the image providers have different priorities than you do. Take back control of those images and cache them locally (self-hosting is a running theme with me).

You don’t necessarily need to use this for social avatars either. It could work with any image, really. I might extend this to be a more generic thing later.

Let me know if this helps you out!