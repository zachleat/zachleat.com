---
title: 3 Methods for Scoped Styles in Web Components That Work Everywhere
---
<style>
div.livedemo {
	font-family: fantasy;
}
</style>
Web components are great. They’re versatile. They can be rendered on the server or (very much less preferably) on the client. They may or may not need interactivity or client-side JavaScript. And unlike heftier legacy frameworks like React, when you need to add interactivity they can still be extremely lightweight by leveraging (dare I say it…) The Platform™ _\*audible gasp\*_.

But let’s not get distracted from the task at hand: we want to evaluate a few different options on the table to apply styles (CSS) to our web components.

Here are the things we want to think about:

1. **Encapsulation**. We don’t want styles from distinct components to interfere with each other (that’s what this blog post is here for, after all).
1. **Performance**. Predictably, a method popularized for CSS encapsulation (CSS-in-JS) was less than ideal because it was slow-by-default. Let’s keep performance at the forefront of our minds.
1. **Browser compatibility**. Let’s not go so far out on the cutting edge that we leave some of our visitors behind.
1. **Code re-use without duplication**, during both authoring and the output. We want to streamline our output to avoid sending any more code down the wire than we need to.
1. **Client-side framework independent**. The methods described in this post do not use any client-side libraries or frameworks.

Methods for encapsulated styles:

1. [Declarative Shadow DOM](#1.-declarative-shadow-dom)
1. [Shadow DOM](#2.-shadow-dom)
1. [WebC](#3.-webc)
1. Future bonus method: [CSS `@scope`](#4.-css-@scope)

## 1. Declarative Shadow DOM

This is the newest kid on the block. And with [Safari recently shipping support (in 16.4)](https://caniuse.com/declarative-shadow-dom), only Firefox is now conspicuously missing from the evergreens.

<div><syntax-highlight @language="html">
<sample-component>
	Fallback content.
	<template shadowrootmode="open">
		Server rendered Declarative Shadow DOM.
		<style>
		:host {
			text-decoration: underline;
			text-decoration-color: red;
		}
		</style>
	</template>
</sample-component>
</syntax-highlight></div>

<div>
	<p>Declarative Shadow DOM is <strong>⚠️ not supported</strong> in your browser and will require the polyfill.</p>
	<template shadowrootmode="open">
		<p>Declarative Shadow DOM <strong>✅ is supported</strong> in your browser.</p>
	</template>
</div>

<div class="livedemo">
Before.
<sample-component>
	Fallback content.
	<template shadowrootmode="open">
		Server rendered Declarative Shadow DOM.
		<style>
		:host {
			text-decoration: underline;
			text-decoration-color: red;
		}
		</style>
	</template>
</sample-component>
After.
</div>

Note that the underline is restricted to the component and the component only as Declarative Shadow DOM styles are encapsulated for free by the platform! Awesome!

It’s also worth noting that Shadow DOM is not completely isolated from its host page—some styles are inherited! Chris Haynes elaborates in this 2019 post: [{% indieAvatar "https://lamplightdev.com/" %}Why is my Web Component inheriting styles?](https://lamplightdev.com/blog/2019/03/26/why-is-my-web-component-inheriting-styles/)

<details class="livedemo">
<summary>Expand to learn about <code>shadowroot</code> versus <code>shadowrootmode</code></summary>

Astute observers may note that the Can I Use support table is for the `shadowroot` attribute, the non-streaming version of Declarative Shadow DOM:

* `shadowrootmode` Streaming-friendly
* `shadowroot` Not streaming friendly (deprecated)

You can use them both together I suppose but rolling with `shadowrootmode` only is probably your best bet moving forward.

You can view the [browser support for `shadowrootmode` specifically](https://caniuse.com/mdn-html_elements_template_shadowrootmode) but it is currently _inaccurate_. I [filed a PR to fix it](https://github.com/mdn/browser-compat-data/pull/19334)!

</details>

The big drawback of Declarative Shadow DOM comes when you have multiple instances of the same component on the page: you need to duplicate the styles and template content in each instance (not ideal).

<details>
<summary>Expand to see an example.</summary>
<syntax-highlight @language="html">
<sample-component>
	<!-- duplicated -->
	Fallback content.
	<template shadowrootmode="open">
		Server rendered Declarative Shadow DOM.
		<style>
		:host {
			text-decoration: underline;
		}
		</style>
	</template>
</sample-component>

<sample-component>
	<!-- duplicated -->
	Fallback content.
	<template shadowrootmode="open">
		Server rendered Declarative Shadow DOM.
		<style>
		:host {
			text-decoration: underline;
		}
		</style>
	</template>
</sample-component>
</syntax-highlight>
</details>

It’s worth noting that [WebC can assist you](#3.-webc) when you’re authoring components with Declarative Shadow DOM so that you don’t have to duplicate this template content yourself!

### Polyfill and Client-side JavaScript

If you want to add additional clientside interactivity to the component, use the [Custom Elements API](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) to do so. This is recommended and required for Declarative Shadow DOM components in Firefox, currently lacking support and requiring a polyfill.

This is less than ideal, as it places a JavaScript dependency on CSS (in Firefox only).

<div class="scrollable-code"><syntax-highlight @language="html">
<script>
if("customElements" in window) {
	customElements.define("sample-component", class extends HTMLElement {
		connectedCallback() {
			// polyfill (only applies if needed)
			polyfillDeclarativeShadowDom(this);
		}
	});
}
</script>
</syntax-highlight></div>

<details class="scrollable-code livedemo">
<summary>Expand to see the Declarative Shadow DOM polyfill code.</summary>
<script webc:is="syntax-highlight" @language="js">
// Declarative Shadow DOM polyfill
// Supports both streaming (shadowrootmode) and non-streaming (shadowroot)
function polyfillDeclarativeShadowDom(node) {
	let shadowroot = node.shadowRoot;
	if(!shadowroot) {
		let tmpl = node.querySelector(":scope > template:is([shadowrootmode], [shadowroot])");
		if(tmpl) {
			// default mode is "closed"
			let mode = tmpl.getAttribute("shadowrootmode") || tmpl.getAttribute("shadowroot") || "closed";
			shadowroot = node.attachShadow({ mode });
			shadowroot.appendChild(tmpl.content.cloneNode(true));
		}
	}
}
</script>
</details>

### Summary

* **Performance** <span aria-label="3/4 stars">★★★☆</span>
	* ✅ Server rendered content.
	* ✅ No JavaScript requirement to apply encapsulated styles (except Firefox, keep reading).
* **Compatibility** <span aria-label="2/4 stars">★★☆☆</span>
	* This is a very new feature that _just_ shipped in Safari.
	* ❌ _(Temporary)_ Firefox requires a JavaScript polyfill, which means that Firefox _does_ have a JS dependency on CSS.
* **Duplication** <span aria-label="1/4 stars">★☆☆☆</span>
	* ❌ Declarative Shadow DOM template markup is duplicated throughout _every_ component instance. Whew! This is less than ideal but it’s important to remember that it’s still _much faster_ than alternative CSS-in-JS methods.

## 2. Shadow DOM

This method uses JavaScript to client-render markup into Shadow DOM. Here’s a code sample of how two instances of `<sample-component>` might look in your editor:

<div class="scrollable-code"><syntax-highlight @language="html">
<sample-component>Fallback content.</sample-component>
<sample-component>Fallback content.</sample-component>

<template id="shadow-dom-template">
	Client-rendered Shadow DOM
	<style>
	:host {
		text-decoration: underline;
		text-decoration-color: green;
	}
	</style>
</template>
<script>
if("customElements" in window) {
	customElements.define("sample-component", class extends HTMLElement {
		connectedCallback() {
			let template = document.getElementById("shadow-dom-template");
			let shadowroot = this.attachShadow({ mode: "open" });
			shadowroot.appendChild(template.content.cloneNode(true));
		}
	});
}
</script>
</syntax-highlight></div>

<div class="livedemo">
Before
<sample-component-sd>Fallback content.</sample-component-sd>
Inbetween
<sample-component-sd>Fallback content.</sample-component-sd>
After
<template id="shadow-dom-template">
	Client-rendered Shadow DOM
	<style>
	:host {
		text-decoration: underline;
		text-decoration-color: green;
	}
	</style>
</template>
<script>
if("customElements" in window) {
	customElements.define("sample-component-sd", class extends HTMLElement {
		connectedCallback() {
			let template = document.getElementById("shadow-dom-template");
			let shadowroot = this.attachShadow({ mode: "open" });
			shadowroot.appendChild(template.content.cloneNode(true));
		}
	});
}
</script>
</div>

Again the benefit here is that the styles applied do not leak out—they’re encapsulated by Shadow DOM—but we did need to use JavaScript to attach the styles.

### Summary

Client-rendering is limiting here. While I wouldn’t be so prescriptive to say that it _isn’t_ useful (some features are secondary/optional after all, depending on your use case and requirements)—but it does heavily limit where the approach can be applied.

* **Performance** <span aria-label="1/4 stars">★☆☆☆</span>
	* ❌ Client rendered content.
	* ❌ JavaScript requirement to apply encapsulated styles.
* **Compatibility** <span aria-label="3/4 stars">★★★☆</span>
	* ✅❌ **Very** broad [browser support](https://caniuse.com/shadowdomv1) but I gotta dock one star for JavaScript-generated content, which (even independent of performance) can have further implications for SEO et al.
* **Duplication** <span aria-label="4/4 stars">★★★★</span>
	* ✅ Only one instance of the template code is required on a page and can be re-used by every component instance.

## 3. WebC

_Haven’t heard of WebC? Learn more on the [WebC documentation.](https://www.11ty.dev/docs/languages/webc/)_

Consider a **WebC component file** `sample-component.webc` with the following content:

<div><syntax-highlight @language="html">
Server rendered HTML.
<style webc:scoped>
:host {
	text-decoration: underline;
	text-decoration-color: blue;
}
</style>
</syntax-highlight></div>

And on our page we’ll use it twice to show how it scales:

<div><syntax-highlight @language="html">
<sample-component>Fallback content.</sample-component>
<sample-component>Fallback content.</sample-component>
</syntax-highlight></div>

This is how the above template renders:

<div class="scrollable-code"><syntax-highlight @language="html">
<style>.ws0ljrjcl{text-decoration:underline;text-decoration-color:blue}</style>
<sample-component class="ws0ljrjcl">Server rendered HTML.</sample-component>
<sample-component class="ws0ljrjcl">Server rendered HTML.</sample-component>
</syntax-highlight></div>

<div class="livedemo">
<style>.ws0ljrjcl{text-decoration:underline;text-decoration-color:blue}</style>
Before
<sample-component-html class="ws0ljrjcl">Server rendered HTML.</sample-component-html>
Inbetween
<sample-component-html class="ws0ljrjcl">Server rendered HTML.</sample-component-html>
After
</div>

As you can see from the rendered code, the `webc:scoped` feature generates a component specific class name and adds that to the component for encapsulated styles. The class is shared across instances and the component CSS is only added once per page.

This allows you to author your component CSS without additional ceremony and WebC will compile it to CSS that has an extremely wide browser compatibility profile (working in Firefox without JS and even in [legacy versions of the evergreens](https://css-tricks.com/evergreen-does-not-mean-immediately-available/).

### Client JavaScript

WebC de-duplicates JS in the same way as CSS too. This means we can add `<script>` in the component file for our Custom Element client JavaScript and this code will only appear on the page once, no matter how many instances of the component exist on the page.

<details class="scrollable-code">
<summary>Expand to see <code>sample-component.webc</code> using the Custom Elements API</summary>
<syntax-highlight @language="html">
Server rendered HTML

<style webc:scoped>
:host {
	text-decoration: underline;
	text-decoration-color: blue;
}
</style>

<script>
if("customElements" in window) {
	window.customElements.define("sample-component", class extends HTMLElement {
		connectedCallback() {
			// Do more things
		}
	});
}
</script>
</syntax-highlight>
</details>

### Summary

I won’t give star ratings to something I built 😅 but I do think WebC allows folks to broaden access to things built with web components without the drawbacks of other methods!

* **Performance**
	* ✅ Server rendered content.
	* ✅ No JavaScript requirement to apply encapsulated styles.
* **Compatibility**
	* ✅ The broadest browser support.
* **Duplication**
	* ✅ The component code lives in the component file, editable in one place. The CSS only appears once on a page, independent of how many times you use the component.

It’s also worth noting here that Declarative Shadow DOM and Shadow DOM methods can be used with WebC too! Have a look at sample WebC components for each of the methods documented here on [`@11ty/demo-webc-shadow-dom`](https://github.com/11ty/demo-webc-shadow-dom/tree/01a5d8c7db6df2874e28f4e050294c8607e139ba/_components).

## 4. CSS `@scope`

While not currently available, platform-support for scoping _without_ Shadow DOM may be coming and [{% indieAvatar "https://www.oddbird.net/" %}Miriam Suzanne](https://www.oddbird.net/authors/miriam/) is leading the charge!

Learn more:

* https://css.oddbird.net/scope/explainer/
* https://github.com/w3c/csswg-drafts/issues/5809
* https://drafts.csswg.org/css-cascade-6/#scoped-styles

Stay tuned, it’s exciting!