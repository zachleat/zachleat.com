---
title: One YouTube Embed weighs almost 1.2 MB
date: 2023-12-11
tags: web-components
seo:
  openGraphBackgroundImage: /og/sources/youtube.jpg
  openGraphAlt: A grid of 6×5 YouTube logos, each with a slightly different rotation
posterImage:
  showOnPage: true
  height: 13em
  name: Javier Miranda
  source: https://unsplash.com/photos/a-red-background-with-a-bunch-of-white-arrows-xW7d0pvzdDk
---
The default YouTube embed is… well… atrocious (sorry). Consider an embed for this [sample video](https://www.youtube.com/watch?v=YYJpFdEaAuc):

* `1149 kB` total weight, including:
* `971 kB` JavaScript
* `61 kB` Poster Image (jpeg, 1280×720)
* `48 kB` CSS
* `41 kB` of iframed HTML
* `28 kB` for ×3 Roboto Web Fonts

_(compressed wire weights reported)_

This, uh, conspicuously—does not include any preloading of video content.

The weight also grows linearly with every embed—resources are _not_ shared: two embeds weigh 2.4 MB; three embeds weigh 3.6 MB (you get the idea).

## A better solution

Instead of the above, I typically use [Paul Irish’s `lite-youtube` web component](https://github.com/paulirish/lite-youtube-embed) for better YouTube embeds on my site. The results speak for themselves: the _entirety of this blog post_ weighs a grand total of 229 kB (and that includes the demo YouTube embed below)—just 17% of the original YouTube embed.

Even better, `<lite-youtube>` is a web component which means it can be managed with [`<is-land>`](/web/is-land/).

If you look at just the weight of `<lite-youtube>`:

* `31 kB` total weight, including:
* `6 kB` JavaScript
* `3 kB` CSS
* `22 kB` Poster Image

**This is a huge improvement: a reduction of 1149 kB to 31 kB.**

## Higher quality posters

`<lite-youtube>` does provide an _eagerly loaded_ JavaScript-only 480×360 poster `background-image` for you (usually ~20–30kB). This behavior is skipped if you’ve added your own `background-image` in a `style` attribute on the tag.

This works fine but I wanted my poster images to be a bit higher quality and I used the 11ty [OpenGraph API](https://www.11ty.dev/docs/services/opengraph/) to easily accomplish this. I pointed the `background-image` property to the API and required a JPEG format in the output, which seemed to average about 80–100kB each, instead (and didn’t require JavaScript).

```html
<lite-youtube
	videoid="YYJpFdEaAuc"
	style="
		background-image: url('https://v1.opengraph.11ty.dev/https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3DYYJpFdEaAuc/auto/jpeg/');
	">
	…
</lite-youtube>
```

### One Weird Trick to Lazy Load the Poster

These components were being managed by [`<is-land>` for lazy initialization](https://github.com/zachleat/zachleat.com/blob/80c605c0654ff509a996d5dbbef7c142fae01f7b/_components/youtube-lite-player.webc) and despite the components being lazily initialized the poster images were still being eagerly loaded (_before_ the is-lands were initialized).

Here’s how I fixed it:

```css
is-land[ready] lite-youtube {
	--yt-poster-img-url: var(--yt-poster-img-url-lazy);
}
```

We are using a double custom property method to work with the existing feature of `background-image` overrides in `lite-youtube`:

```html
<lite-youtube
	videoid="YYJpFdEaAuc"
	style="
		--yt-poster-img-url-lazy: url('https://v1.opengraph.11ty.dev/https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3DYYJpFdEaAuc/auto/jpeg/');
		background-image: var(--yt-poster-img-url);
	">
	…
</lite-youtube>
```

As this is using `<is-land>` this re-enables the JavaScript dependency for the poster images but I’m okay with that, as I also include a text link to YouTube for each video embed (as part of the [WebC component](https://github.com/zachleat/zachleat.com/blob/80c605c0654ff509a996d5dbbef7c142fae01f7b/_components/youtube-lite-player.webc)).

You can see all of this in action below:

{%- renderTemplate "webc" %}
<div><youtube-lite-player @slug="YYJpFdEaAuc" @start="188" @label="Partial Hydration and Islands Architecture—Eleventy 🎈 Weekly №12"></youtube-lite-player></div>
{%- endrenderTemplate %}