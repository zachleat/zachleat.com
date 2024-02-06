---
title: carouscroll Web Component
titleHtml: '&lt;carou-scroll&gt; Web Component'
tags:
  - project
  - web-components
seo:
  openGraphBackgroundImage: /og/sources/carousel.jpeg
  openGraphAlt: People standing near lighted carousel during night time
posterImage:
  showOnPage: true
  height: 12em
  name: Sally K
  source: https://unsplash.com/photos/people-standing-near-lighted-carousel-during-night-time-Oc-gVHId6lo
---
`<carou-scroll>` is a zero-dependency web component to add next and previous buttons to a scrollable container. I use it to share exported Keynote slides (as images) on my blog posts.

Some inspiration from the [W3C WAI Carousel Tutorial](https://www.w3.org/WAI/tutorials/carousels/) (though this isn’t technically a carousel).

* [Source code on GitHub](https://github.com/zachleat/carouscroll)
* [Demo](https://zachleat.github.io/carouscroll/demo.html)

More real-world demos of Keynote slides:
* [The Good, The Bad, The Web Components](/web/good-bad-web-components/) _(and the [post source code](https://github.com/zachleat/zachleat.com/blob/main/_posts/2024-01-31-good-bad-web-components.md))_
* [The Eleventy V2.0 Release, A Talk at the Eleventy Meetup](/web/eleventy-meetup-eleventy-v2/) _(and the [post source code](https://github.com/zachleat/zachleat.com/blob/main/_posts/2023-03-16-eleventy-meetup-eleventy-v2.md))_
* [Eleventy: Build vs. Serverless vs. Edge](/web/eleventy-rendering-modes/) _(and the [post source code](https://github.com/zachleat/zachleat.com/blob/main/_posts/2022-04-21-eleventy-rendering-modes.md))_

## Features

* Interaction compatible with scroll or touch.
* No layout shift. Make sure you include the CSS snippet!
* (Optional) Smooth scrolling with `scroll-behavior: smooth`.
* (Optional) `loop` attribute to enable looping around from start/end.
* (Optional) Next/Previous buttons can be placed anywhere in the document.
* (Optional) `<output>` element can accessibly announce the current slide number (out of total number of slides).

## Usage

### Installation

You can install via `npm` or download the `carouscroll.js` JavaScript file manually.

```shell
npm install @zachleat/carouscroll --save
```

Add `carouscroll.js` to your site’s JavaScript assets.

### Markup

The CSS here is **crucial** to reduce Layout Shift (CLS), set the aspect ratio of the slides, and to avoid loading `loading="lazy"` images on off-screen slides.

```html
<style>
carou-scroll {
	display: flex;
	overflow-x: scroll;
	overflow-y: hidden;
}
carou-scroll > * {
	min-width: 100%;
	 /* Customize this as needed */
	aspect-ratio: 16/9;
}
</style>

<script type="module" src="carouscroll.js"></script>

<carou-scroll id="my-scroller">
	<img loading="lazy" src="…" alt="…">
	<img loading="lazy" src="…" alt="…">
	<!-- … -->
</carou-scroll>
```

### More examples

#### Add buttons (optional)

For maximum flexibility, these buttons can be placed anywhere in the document and are tied by an `id` back to the parent scroller.

Make sure you think about the before/after JavaScript experience here. This component will remove `disabled` for you but you can add additional styling via your own CSS: `carou-scroll:defined {}`.

```html
<button type="button" disabled data-carousel-previous="my-scroller">Previous</button>
<button type="button" disabled data-carousel-next="my-scroller">Next</button>
```

#### Add output (optional)

This will update (and accessibly announce) a current status element with e.g. `Slide 1 of 10` text.

For maximum flexibility, this element can be placed anywhere in the document and is tied by an `id` back to the parent scroller.

```html
<output data-carousel-output="my-scroller"></output>

<!-- Or customize with your own markup -->
<output data-carousel-output="my-scroller" lang="ko">슬라이드 <span data-carousel-output-current>1</span>/<span data-carousel-output-total>10</span></output>
```

#### Make it loop around (optional)

Add the `loop` attribute.

```html
<carou-scroll id="my-scroller" loop>
```

#### Smooth scrolling CSS (optional)

```css
carou-scroll {
	scroll-behavior: smooth;
}
```
