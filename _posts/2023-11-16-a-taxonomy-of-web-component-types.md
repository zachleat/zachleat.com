---
title: An Attempted Taxonomy of Web Components
tags:
  - web-components
  - draft
eleventyExcludeFromCollections: true
---
As my experience with web components grows, my personal view of how to build a web component is also evolving. In some cases I’ve gone back and refactored older components with the new knowledge and experience I’ve gained. In other cases, these older components sit as evidence of the learning path I traveled.

_For the record, I mean zero-dependency web components that do not use an upstream library—they inherit directly from `HTMLElement` or similar platform classes._

I thought it might be useful to catalog my journey of these open source web components as a way to provide a map for others.

## HTML Web Components

These components layer on interactivity and add behaviors in true progressive enhancement fashion. These are the bread and butter of web components. They are unlikely to be improved with additional leverage of server-side rendering—all of the client-side DOM modifications are in service of a particular client-side behavior.

<style>
.web-components-table a[href],
.web-components-table code {
	white-space: nowrap;
}
</style>
<script type="module" src="/static/table-saw.js"></script>
<div><table-saw type="container" breakpoint="(max-width: 30em)">
<table class="web-components-table">
	<thead>
		<tr>
			<th>Tag</th>
			<th>Size</th>
			<th>CSS</th>
			<th>JavaScript</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="https://github.com/zachleat/details-utils"><code>details-utils</code></a></td>
			<td><code>3.6 kB</code></td>
			<td><em>None</em></td>
			<td>Event Listeners only.</td>
		</tr>
		<tr>
			<td><a href="https://github.com/zachleat/video-radio-star"><code>video-radio-star</code></a></td>
			<td><code>2.4 kB</code></td>
			<td><em>None</em></td>
			<td>Event Listeners only.</td>
		</tr>
		<tr>
			<td><a href="https://github.com/zachleat/announcement-banner"><code>announcement-banner</code></a></td>
			<td><code>1.1 kB</code></td>
			<td><em>Manual.</em> Separate CSS styles are required to prevent layout shift.</td>
			<td>Event Listeners only.</td>
		</tr>
		<tr>
			<td><a href="https://github.com/11ty/is-land"><code>is-land</code></a></td>
			<td><code>3.1 kB</code></td>
			<td><em>None.</em></td>
			<td>Unknown custom elements are renamed for lazy initialization.</td>
		</tr>
		<tr>
			<td><a href="https://github.com/zachleat/squirminal"><code>squirm-inal</code></a></td>
			<td><code>3.0 kB</code></td>
			<td><em>JS injected.</em> CSS is global and only injected once. The CSS is only necessary for the JS enhanced experience.</td>
			<td>Child content is removed and re-added incrementally.</td>
		</tr>
		<tr>
			<td><a href="https://github.com/zachleat/resizeasaurus"><code>resize-asaurus</code></a></td>
			<td><code>1.4 kB</code></td>
			<td><em>JS injected, scoped to <strong>Shadow DOM</strong>.</em> CSS is only necessary for JS enhanced experience.</td>
			<td>Size element added as overlay, no layout shift.</td>
		</tr>
	</tbody>
</table>
</table-saw></div>

<p data-demo-label="Related" class="livedemo">Obligatory nod to <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:defined"><code>:defined</code></a>—incredibly useful for styling HTML Web Components.</p>

The following components augment nested HTML. These components could be improved with a tighter coupling to server rendering (e.g. a [WebC](https://www.11ty.dev/docs/languages/webc/) implementation) but work great as-is in low-JavaScript environments.

<div><table-saw type="container" breakpoint="(max-width: 30em)">
<table class="web-components-table">
	<thead>
		<tr>
			<th>Tag</th>
			<th>Size</th>
			<th>CSS</th>
			<th>JavaScript</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="https://github.com/zachleat/parity-purchasing-power-price"><code>ppp-price</code></a></td>
			<td><code>2.9 kB</code></td>
			<td><em>None.</em></td>
			<td>Updates text with adjusted price.</td>
		</tr>
		<tr>
			<td><a href="https://github.com/zachleat/seven-minute-tabs"><code>seven-minute-tabs</code></a></td>
			<td><code>3.0 kB</code></td>
			<td><em>None.</em></td>
			<td>Updates elements with accessibility mapping, hides non-active tabs.</td>
		</tr>
		<tr>
			<td><a href="https://github.com/zachleat/filter-container"><code>filter-container</code></a></td>
			<td><code>3.4 kB</code></td>
			<td><em>Optionally JS injected.</em> CSS content is specific to each instance of the component.<br>Can be added manually (if server rendering).</td>
			<td>Updates hidden, filtered elements (pairs nicely with server-rendering).</td>
		</tr>
		<tr>
			<td><a href="https://github.com/zachleat/table-saw"><code>table-saw</code></a></td>
			<td><code>2.2 kB</code></td>
			<td><em>JS injected.</em> CSS content is specific to media/container query breakpoint config.</td>
			<td>Updates table cells to add header text.</em></td>
		</tr>
		<tr>
			<td><a href="https://github.com/zachleat/browser-window"><code>browser-window</code></a></td>
			<td><code>2.9 kB</code></td>
			<td><em>JS injected, scoped to <strong>Shadow DOM</strong>.</em></td>
			<td>Adds browser chrome.</td>
		</tr>
	</tbody>
</table>
</table-saw></div>

There is also a third category of HTML web component that augments the HTML in a way that is dynamic and specific to an individual user agent in a way that is unlikely to make sense on the server (or is not achievable due to hosting limitations)—but I haven’t open sourced one of these yet.

My first thought was to the [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) wrapper web component to localize datetimes that’s floating around in one of my projects somewhere. I also acknowledge that it _could_ be server rendered in an edge function but with a tradeoff limiting its hosting portability.

<strong>All of the components above use progressive enhancement</strong> and fallback to the nested HTML content before/without JavaScript—the crux of the humble HTML Web Component.

## JavaScript Web Components

For the sake of completeness, I will sheepishly admit that I have created non-HTML Web Components too (and gotten value out of those). These are lower-priority optional use cases that pair with existing content and though it’s not ideal—for this specific use case I’ve made the trade off.

<div><table-saw type="container" breakpoint="(max-width: 30em)">
<table class="web-components-table">
	<thead>
		<tr>
			<th>Tag</th>
			<th>Size</th>
			<th>CSS</th>
			<th>JavaScript Content</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="https://github.com/zachleat/speedlify-score"><code>speedlify-score</code></a></td>
			<td><code>2.9 kB</code></td>
			<td><em>JS injected, scoped to <strong>Shadow DOM</strong>.</em></td>
			<td>Entirely JS generated content (no fallback)—<em>this is not an HTML Web Component</em>.</td>
		</tr>
	</tbody>
</table>
</table-saw></div>

For example, `<speedlify-score>` (used extensively on the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/)) is entirely JS-generated and has an empty fallback experience.

## Lessons Learned

I usually gauge the quality of a web component based on the amount of JavaScript DOM modifications that occur in that component. It’s no surprise to learn that I prefer HTML Web Components and typically try to avoid using and authoring JavaScript Web Components.

### Injecting CSS with Javascript

I was and am wary of this generally but there is additional nuance to keep in mind when comparing this to the much-maligned CSS-in-JS approach. The JavaScript injected CSS happening here is at the stylesheet level using the CSSStyleSheet API.

That is, one stylesheet is injected globally for all instances of the custom element (unless otherwise specified). `<table-saw>` is one exception to that, but the stylesheet is de-duplicated if more than one instance uses the same breakpoint and media/container query type.

The jury is still out on how expensive Shadow DOM constructable stylesheets are. The [Eleventy Leaderboards](https://www.11ty.dev/speedlify/) are a pretty good stress test of that currently: `<speedlify-score>` uses Shadow DOM with a constructable stylesheet and currently has 918 component instances on the page (though lazy initialized via `<is-land>`).

The part I like about injecting CSS with JavaScript is that I don’t need to worry about distributing my CSS separate from JavaScript—it feels like a _web-platform single file component_.

This is a fine tradeoff to make when the component’s CSS is tightly coupled and in service to the JavaScript. **Injecting CSS with JS will not get you anywhere if you need to style the before/without JavaScript (fallback) experience**, so buyer beware!

### Nuances of Shadow DOM

If you generate content and markup with JavaScript—it may be okay to put it in Shadow DOM and get the benefits of scoped styles and devtools hidden markup. Make sure you’re aware of the limitations of Shadow DOM (forms, deep hash links, accessibility mapping). Others have written extensively about this:

* [{% indieAvatar "https://www.matuzo.at/blog/2023/web-components-accessibility-faq/" %}Web Components Accessibility FAQ](https://www.matuzo.at/blog/2023/web-components-accessibility-faq/)—Manuel Matuzović (September 2023)
* [{% indieAvatar "https://www.matuzo.at/blog/2023/pros-and-cons-of-shadow-dom/" %}Pros and cons of using Shadow DOM and style encapsulation](https://www.matuzo.at/blog/2023/pros-and-cons-of-shadow-dom/)—Manuel Matuzović (August 2023)
* [{% indieAvatar "https://alice.pages.igalia.com/blog/how-shadow-dom-and-accessibility-are-in-conflict/" %}How Shadow DOM and accessibility are in conflict](https://alice.pages.igalia.com/blog/how-shadow-dom-and-accessibility-are-in-conflict/)—Alice Boxhall (February 2023)
* [{% indieAvatar "https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/" %}Shadow DOM and accessibility: the trouble with ARIA](https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/)—Nolan Lawson (November 2022)
* [{% indieAvatar "https://nolanlawson.com/2022/06/14/dialogs-and-shadow-dom-can-we-make-it-accessible/" %}Dialogs and shadow DOM: can we make it accessible?](https://nolanlawson.com/2022/06/14/dialogs-and-shadow-dom-can-we-make-it-accessible/)—Nolan Lawson (June 2022)
* [{% indieAvatar "https://marcysutton.com/accessibility-and-the-shadow-dom" %}Accessibility and the Shadow DOM](https://marcysutton.com/accessibility-and-the-shadow-dom)—Marcy Sutton (February 2014)

### Some components can’t be web components (for now?)

Some components _require_ server rendering. You couldn’t do a _good enough_ `<img>` or `<picture>` wrapper component (e.g. [Eleventy Image](https://www.11ty.dev/docs/plugins/image/) or Next.js’ `<Image>`) using custom elements. I suppose you might be able to [attempt such a thing](https://is-land.11ty.dev/demo-image-loading) and limit it exclusively to `loading="lazy"` images, but that seems a bit risky and fraught with peril. A custom element can’t beat the [preload scanner](https://web.dev/articles/preload-scanner) and that markup is best served server-rendered.

## Conclusions

There is a lot of complexity in this space right now. But there is hope as the community refocuses on an approach with a good pit of success: the humble HTML Web Component. A very important takeaway here is that creating an HTML Web Component doesn’t require a hard stance of Light or Shadow DOM in your implementation (though Shadow DOM still has dragons). It is only concerned with the before/after JavaScript, with web performance and durability considerations in mind.

It will require discipline to avoid overindexing on JavaScript-injected CSS. I think `<browser-window>` may have jumped over the line here and I’m still a little uneasy about the tradeoffs I made there but the portability benefits are quite tempting!