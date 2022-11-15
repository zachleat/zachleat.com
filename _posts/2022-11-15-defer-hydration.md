---
title: "Use defer-hydration in your Web Components for… well, deferred hydration."
eleventyComputed:
  titleHtml: 'Use <code>defer-hydration</code> in your Web Components for… well, deferred hydration.'
tags:
  - web-components
---
By now you may be familiar with [`<is-land>`, the Eleventy utility for islands and partial hydration](https://www.11ty.dev/docs/plugins/partial-hydration/).

One of the tricks `<is-land>` uses to delay initialization of Web Components’ custom elements nested as child content is that it iterates over any `:not(:defined)` nodes and renames the elements to a non-upgradable tag name (`<my-component>` becomes `<is-land--my-component>` before `<my-component>` is defined in the custom element registry via `customElements.define`).

This works pretty well: it doesn’t require knowledge of which web components exist or may exist at some point in the future and leaves other HTML as is. Though I will admit it is a tad bit unexpected to folks that have tied their pre-hydrated CSS to the original tag name (I’d suggest using a `class` instead!).

However, some component frameworks have started [adopting a community-agreed-upon draft standard](https://github.com/webcomponents-cg/community-protocols/pull/15): using a `defer-hydration` attribute on a component to denote that the component code will instead handle lazy initialization (when the attribute is removed).

Personally, I’d love to see this as part of a web standard first-party supported in browsers without requiring _any_ userland component code changes. The first step to make this a viable formal standard in the future is to encourage folks to adopt the community protocol in their component code today!

In fact, [`<is-land>` v3.0.0 now supports `defer-hydration`](https://github.com/11ty/is-land/issues/14) to skip the custom element tag rename and let the component code handle deferred hydration itself. Here’s how it might work:

```html
<is-land on:visible>
	<my-component defer-hydration>
</is-land>
```

And then your component JavaScript:

```js
class MyComponent extends HTMLElement {
	connectedCallback() {
		this.hydrate();
	}

	static get observedAttributes() {
		return ["defer-hydration"];
	}

	attributeChangedCallback(name, old, value) {
	  // when defined it triggers an attribute change from `null` to `""`
		if(name ==="defer-hydration" && value === null) {
			this.hydrate();
		}
	}

	hydrate() {
		if(this.hasAttribute("defer-hydration")) {
			return;
		}

		// Run the initialization code.
	}
}

if("customElements" in window) {
	customElements.define("my-component", MyComponent);
}
```

When the `<is-land>` loading conditions are met and the island hydrates, it removes all `defer-hydration` attributes from nested child elements. This is provided for-free by the `<is-land>` utility.

The `defer-hydration` attribute removal then triggers the `attributeChangedCallback` which runs the `hydrate()` method.

_Special thanks to [Doug Parker (of the Angular team) for suggesting this for `<is-land>` on Mastodon!](https://techhub.social/@develwithoutacause/109332565955255126)_