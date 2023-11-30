---
title: W3C Banner Web Component
titleHtml: '&lt;w3c-banner&gt; Web Component'
tags:
  - project
  - web-components
---
In 2014 I made a [fake W3C Specification Status Banner component](/web/w3c-status-banners/). It’s now a web component instead. Web components are fun and I’m having fun.

 * [Demo](http://zachleat.github.io/w3c-banners/)
 * [Code on GitHub](https://github.com/zachleat/w3c-banners/)

The mildly interesting thing happening in this component is that folks can decide whether or not they want to have fallback content.

The following two samples render the same, but have different fallback experiences:

```html
<w3c-banner>W3C Candidate Recommendation</w3c-banner>
<w3c-banner text="W3C Candidate Recommendation"></w3c-banner>
```

This is accomplished via a `<slot>` with fallback content inside.

```js
this.shadowRoot.innerHTML = `<slot>${this.getAttribute("text")}</slot>`;
```

This also lets me dynamically update the demo (via those radios) using `innerHTML` (without having to mess with `observedAttributes` or [`attributeChangedCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks) or [`slotchange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event)):

```js
let el = document.querySelector("w3c-banner");
el?.innerHTML = "Unsanctioned Web Standards Fan Fiction";
```