---
title: The Infinity Hamburger Menu, now in Web Component Form
tags:
  - project
  - web-components
---

A whimsical hamburger menu* that goes on forever.

*_Not actually a functioning menu._

First inspired by [24ways.org](https://www.zachleat.com/twitter/673503114096345089/). I’ve been absolutely delighted when folks have sent me various messages over the years saying that they loved the menu. Add some whimsy to your personal site, it’s fun!

First open sourced in 2015 as a [vanilla not-web-component](/web/infinity-burger/). Notably, the [commit updating the code from a CSS/JavaScript component to a Shadow DOM encapsulated standalone JavaScript component](https://github.com/zachleat/infinity-burger/commit/defc3d6de4e24153c9f6bdc8f390e36f12fc3e3e) might be educational, if you’re interested in that!

Interestingly, this simplifed the markup required to use this to a single empty custom element (this is a JavaScript Web Component) and simplified the assets necessary to use it too (a single JavaScript file instead of CSS and JavaScript files).

This also allowed me to make use of [`<is-land>`](https://www.11ty.dev/docs/plugins/partial-hydration/), which meant that I got a bunch of features for-free:

1. Only runs the JS when the page is idle (`requestIdleCallback`).
1. Only runs the JS when the component is visible (if you’re scrolled down, the component JavaScript doesn’t load!).
1. Only runs the JS when the user does not have a reduced motion preference set.
1. Only runs the JS at desktop viewport sizes.

All of the above must be true before the script is loaded. Here’s the markup:

```html
<is-land on:idle on:visible on:media="(prefers-reduced-motion: no-preference) and (min-width: 61.1875em)">
	<infinity-burger></infinity-burger>
	<template>
		<script type="module" src="/static/infinity-burger.js"></script>
	</template>
</is-land>
```

## Demo

Click or tap the hamburger menu icon on the top of this page (at desktop viewport sizes). [Standalone demo also on GitHub pages](https://zachleat.github.io/infinity-burger/demo.html).

## Get it

* Source code on [GitHub](https://github.com/zachleat/infinity-burger)
* Install it on your own web site via `npm` with `npm install infinity-burger` or by downloading [`infinity-burger.js` manually](https://github.com/zachleat/infinity-burger/blob/main/infinity-burger.js).

### Related reading:

 * [_Who Designed the Hamburger Icon?_](http://gizmodo.com/who-designed-the-iconic-hamburger-icon-1555438787) —Gizmodo
 * [_The Hamburger Menu-Icon Debate_](http://www.theatlantic.com/product/archive/2014/08/the-hamburger-menu-debate/379145/) —The Atlantic
