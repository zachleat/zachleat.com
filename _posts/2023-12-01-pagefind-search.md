---
title: pagefind-search Web Component
titleHtml: '&lt;pagefind-search&gt; Web Component'
tags:
  - project
  - web-components
---
I’m a huge fan of [Pagefind, the fully static search engine](https://pagefind.app/).

The super cool thing about Pagefind is that it does not require an application server—you can host it on GitHub pages (which I’ve done in the demo below)! I currently use Pagefind on [this very web site](https://www.zachleat.com/search/) and on [11ty.dev](https://www.11ty.dev/docs/search/).

I wanted a way to control the asset loading of the component using [`<is-land>`](https://www.11ty.dev/docs/plugins/partial-hydration/) so I built a small web component wrapper called `<pagefind-search>`. Read more about `<is-land>` usage below.

 * [Demo](http://zachleat.github.io/pagefind-search/)
 * [Code on GitHub](https://github.com/zachleat/pagefind-search/)

## Usage

```html
<script type="module" src="pagefind-search.js"></script>

<pagefind-search>
	<!-- Fallback to DuckDuckGo search -->
	<form action="https://duckduckgo.com/" method="get" style="min-height: 3.2em;"><!-- min-height to reduce CLS -->
		<label>
			Search for:
			<input type="search" name="q" autocomplete="off" autofocus>
		</label>
		<!-- Put your searchable domain here -->
		<input type="hidden" name="sites" value="www.zachleat.com">
		<button type="submit">Search</button>
	</form>
</pagefind-search>
```

## `<is-land>` Use Cases

I don’t think it makes sense to _always_ wrap this one in [`<is-land>`](https://www.11ty.dev/docs/plugins/partial-hydration/) (I don’t on my [dedicated search page](/search/)) but I do think that it unlocks a wider variety of user-preference user controlled lazily loaded use cases.

For example, putting the component in a dialog would lazily load the 20 kB (compressed) JavaScript bundle only when the search dialog is opened by the user.

```html
<dialog>
	<is-land on:visible>
		<pagefind-search></pagefind-search>
	</is-land>
</dialog>
```

You could do the same with `<details>` too.

You could put the `<pagefind-search>` instance at the bottom of your page and only load it when the user scrolls down.

Lots of possibilities here!

## Dev Notes

This one has some interesting declarative/programmatic boundaries that needed to be managed.

I wanted to make it easy to alias Pagefind options as HTML attributes, so I went with the convention that any attribute that started with an `_` would be passed to the Pagefind constructor:

```html
<pagefind-search _show_images="false"></pagefind-search>
```

The above calls `new PagefindUI({ showImages: false })`. If more options are added to Pagefind later, they’ll work with this approach without me having to make future changes.

And then for more advanced usage, there is a full escape hatch to JS with `manual` initialization:

```html
<pagefind-search manual id="my-search"></pagefind-search>

<!-- type="module" is important here -->
<script type="module">
let el = document.querySelector("#my-search");
await el.pagefind({ showImages: false });
// `el.pagefindUI` to access the PagefindUI instance.
</script>
```

I also added a little `pagefind-autofocus` attribute to autofocus to the form element after it has initialized. As the native `autofocus` _can_ be applied to any HTML element (think `contenteditable`), I went with the safer `pagefind-` prefixed attribute name.

```html
<pagefind-search pagefind-autofocus></pagefind-search>
```
