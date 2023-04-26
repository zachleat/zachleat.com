---
title: "Add Responsive-Friendly Enhancements to `details` with `details-utils`"
titleHtml: "Add Responsive-Friendly Enhancements to &lt;details&gt; with &lt;details-utils&gt;"
tags:
 - project
 - web-components
---
I use `<details>`. I use `<details>` a lot. It is one of my favorite HTML elements.

Over time I’ve collected a bunch of add-on utilities to enhance `<details>` with new features and functionality. They’ve been super useful in _a bunch_ of long-standing production implementations at Netlify:

* [_11ty.dev_ Eleventy Docs sidebar menu](https://www.11ty.dev/docs/)
* [_netlify.com_ masthead navigation](https://www.netlify.com/)
* The [shared masthead navigation](https://twitter.com/zachleat/status/1392974759600787460) (across various tech-stacks) on [Netlify Community](https://www.netlify.com/community/) (Vue/Eleventy), [Remotely Interesting Podcast](https://remotelyinteresting.netlify.com/) (Eleventy), [Netlify Explorers](https://explorers.netlify.com/) (Next.js), [Netlify Swag](https://swag.netlify.com/) (Gatsby.js), and [Netlify Answers](https://answers.netlify.com/) (Discourse).
* [_jamstack.org_ masthead navigation](https://jamstack.org/)
* [Your Year on Netlify wizard steps](https://twitter.com/zachleat/status/1468291345630568457)
* (and probably more?)

I’ve decided to finally package those `<details>` helpers up and formally release them as a web component!

## `<details-utils>`

```html
<details-utils>
	<details>…</details>
	<!-- you can have one or more <details> elements in here -->
</details-utils>
```

* [Demo](https://zachleat.github.io/details-utils/demo.html)
* [Repository](https://github.com/zachleat/details-utils)

At time of writing, this web component adds five new responsive-friendly enhancements to one or more `<details>` elements nestled inside:

* Force open/closed
* Click outside to close
* Close on `esc`
* Animate open/closed
* Toggle root element `class`

### Force open/closed

* [Demo](https://zachleat.github.io/details-utils/demo.html#force)

In this example, the `<details>` is forced open when viewport is wider than `48em`.

```html
<details-utils force-open="(min-width: 48em)" force-restore>
	<details open>…</details>
</details-utils>
```

I’ve gotten _a lot_ of mileage out of the above example, specifically to drive navigation that is always visible at a certain breakpoint (think a collapsible menu at small viewport versus sidebar, e.g. [`11ty.dev/docs/`](https://www.11ty.dev/docs/)).

Alternatively, `force-close` is also available. The optional `force-restore` attribute will restore previous state when the `force-open` or `force-close` media queries do not match.

The media query is optional, and using it as a bare attribute allows control of the state pre and post JavaScript.

```html
<!-- closed without JS, open with JS -->
<details-utils force-open>
	<details>…</details>
</details-utils>

<!-- open without JS, closed with JS -->
<details-utils force-close>
	<details open>…</details>
</details-utils>
```

### Click outside to close

* [Demo](https://zachleat.github.io/details-utils/demo.html#click-out)

If you click anywhere on the document (outside of the `<details>` content), the `<details>` will be closed. This is useful when you want to absolutely position the `<details>` content (maybe to make a little custom dropdown 😱)

```html
<details-utils close-click-outside>
	<details>…</details>
</details-utils>
```

You can scope this with a media query as well:

```html
<details-utils close-click-outside="(min-width: 48em)">
	<details>…</details>
</details-utils>
```

Add your own bonus close button inside of the content (to complement `<summary>`):

```css
/* Hide button without JS */
details-utils:not(:defined) [data-du-close-click] {
	display: none;
}
```

```html
<details-utils close-click-outside>
	<details id="my-details">
		<summary>…</summary>
		<button type="button" aria-controls="my-details" data-du-close-click>Close</button>
	</details>
</details-utils>
```

### Close on `esc`

* [Demo](https://zachleat.github.io/details-utils/demo.html#esc)

Closes the `<details>` when the `esc` key is hit on the keyboard. Media query is optional.

```html
<details-utils close-esc="(max-width: 767px)">
	<details>…</details>
</details-utils>
```

### Animate open/close

* [Demo](https://zachleat.github.io/details-utils/demo.html#animate)

```html
<details-utils animate>
	<details>…</details>
</details-utils>
```

Animates the height of the content when opening and closing the `<details>`. Ignored automatically if `(prefers-reduced-motion)` is detected.

Just a full disclosure, the configuration around this one is pretty limited (re: easing and timing). Also this doesn’t support media query scoping yet (not for any technical reason, just haven’t run into this use case yet). Open to contributions here!

### Toggle `class` on root element

* [Demo](https://zachleat.github.io/details-utils/demo.html#toggle-document-class)

```html
<details-utils toggle-document-class="my-class-name">
	<details>…</details>
</details-utils>
```

Adds a `class` to your `<html>` element when the `<details>` is open and removes it when the `<details>` is closed.

## Enjoy!

Wiring up and combining each of these enhancements to `<details>` really can go a long way in building a lot of complex user interface elements in a pretty straightforward way. In my humble opinion, the super long list of things I’ve built using this is proof of that. I hope you can get some useful mileage out of them too!