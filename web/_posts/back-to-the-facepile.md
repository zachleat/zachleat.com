---
title: 'Back to the Facepile, Featherweight Edition'
tags:
  - popular-posts
postRank: 2
---
A short three years ago, I wrote about [The Crushing Weight of the Facepile](/web/facepile/): how the image weight of the webmention avatar images were proving to be prohibitvely large.

At that time, I decided the best solution was to lazy load all of the Webmention Avatars. I used `IntersectionObserver` to do this because `loading="lazy"` wasn’t supported anywhere. It still isn’t on Safari 😬. I went further and threw the Webmention Likes into a closed `<details>` element so they wouldn’t load until the collapsible was expanded.

Historically, I would have solved this problem by processing and optimizing these images at build-time. But at this scale of image count, the build-time costs seemed prohibitive! I don’t think this is a priority to be fixed upstream, either.

But I finally have a new method. A better method. And it doesn’t incur any more build-time penalties either. This is a small experiment with an On-demand request-time image processing service powered entirely by Eleventy Image, which may potentially result in a [new Eleventy API Service](https://www.11ty.dev/docs/api-services/).

### Before:

```html
<img src="/web/img/webmention-avatar-default.svg" data-src="https://webmention.io/avatar/pbs.twimg.com/cab6e1447b539bc1d7eaf6e260288f220792168c7be20e38ee6504517cde999d.jpg" alt="A Person’s Name" width="48" height="48">
```

_Not pictured: the IntersectionObserver JavaScript to swap `data-src` to `src`._

Some page-weight stats from [my last blog post](/web/trailing-slash/):

* Above the fold: ×7 images, `8.1 kB`
* Full page scroll: ×64 images, `370 kB`
* After showing **Likes**: ×286 images, `2.5 MB` 😬
  * Note: I used to hide the Likes in a details element by default.
  * _The ×286 image count likely includes some duplicates due to HTTP 301 redirects._

### After

```html
<img src="https://v1.image.11ty.dev/https%3A%2F%2Fwebmention.io%2Favatar%2Fpbs.twimg.com%2Fa4b4ceb1e1566f3e65d866ac64d8d7c1d615f927ebd0c31a7395b8fe5d2be852.jpg/jpeg/72/" alt="A Person’s Name" width="48" height="48" loading="lazy" decoding="async">
```

Some stats from my last blog post:

* Above the fold: ×7 images, `9.1 kB`
* Full page scroll (with **Likes** shown by default): ×145 images, `258 kB`

### Total Savings:

* Standard page scroll shows more images: from ×64 to now ×145.
* But Standard page scroll image weight was reduced from `370 kB` to `258 kB`: **30.3% decrease**
* Worst case image weight (with Likes shown) reduced from `2.5 MB` to `258 kB`: **89.6% decrease**

### Takeaway:

Build-time image processing is great for super-critical images that you want to package up with your build, but Request-time image optimizations are *amazing* for images loaded from third parties or via user generated content. We’ll see how this experiment continues but I think you’ll probably see it on the [official Eleventy API Services documentation](https://www.11ty.dev/docs/api-services/) soon.
