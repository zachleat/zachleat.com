---
title: The Good, The Bad, The Web Components
tags:
  - web-components
---
The humble component. The building block of modern web development.

```jsx
// MyButton.jsx
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

// Usage
<MyButton/>
```

You may recognize the above example taken from the documentation of one of the most popular component libraries in use today: {% indieAvatar "https://vercel.com/" %}Vercel.js.

But there are plenty of others:

<script type="module" src="/static/table-saw.js"></script>
<div><table-saw>
<table>
  <thead>
    <tr>
      <th>Library</th>
      <th>Uses Native<br>Web Components</th>
      <th>Custom Elements<br>as Compile Target</th>
      <th>Compatibility<br>Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{% indieAvatar "https://alpinejs.dev/" %}Alpine</td>
      <td class="no">No</td>
      <td class="no">No</td>
      <td><em>Unknown</em></td>
    </tr>
    <tr>
      <td>{% indieAvatar "https://angularjs.org/" %}Angular</td>
      <td class="no">No</td>
      <td class="yes">Yes</td>
      <td class="yes">100%</td>
    </tr>
    <tr>
      <td>{% indieAvatar "https://emberjs.com/" %}Ember</td>
      <td class="no">No</td>
      <td class="no">No</td>
			<td><em>Unknown</em></td>
    </tr>
    <tr>
      <td>{% indieAvatar "https://htmx.org/" %}htmx</td>
      <td></td>
      <td></td>
			<td><em>Unknown</em></td>
    </tr>
    <tr>
      <td>{% indieAvatar "https://lit.dev/" %}Lit</td>
      <td class="yes">Yes</td>
      <td class="yes">Yes</td>
      <td class="yes">100%</td>
    </tr>
    <tr>
      <td>{% indieAvatar "https://preactjs.com/" %}Preact</td>
      <td class="no">No</td>
      <td class="yes">Yes</td>
      <td class="yes">100%</td>
    </tr>
    <tr>
      <td>{% indieAvatar "https://qwik.builder.io/" %}Qwik</td>
      <td class="no">No</td>
      <td class="no">No</td>
      <td><em>Unknown</em></td>
    </tr>
    <tr>
      <td>{% indieAvatar "https://react.dev/" %}React</td>
      <td class="no">No</td>
      <td class="no">No</td>
      <td class="no">67%</td>
    </tr>
    <tr>
      <td>{% indieAvatar "https://www.solidjs.com" %}Solid</td>
      <td class="no">No</td>
      <td class="yes">Yes</td>
      <td class="maybe">94%</td>
    </tr>
    <tr>
      <td>{% indieAvatar "https://stenciljs.com/" %}Stencil</td>
      <td class="yes">Yes</td>
      <td class="yes">Yes</td>
      <td class="yes">100%</td>
    </tr>
    <tr>
      <td>{% indieAvatar "https://svelte.dev/" %}Svelte</td>
      <td class="no">No</td>
      <td class="yes">Yes</td>
			<td class="maybe">94%</td>
    </tr>
    <tr>
      <td>{% indieAvatar "https://vuejs.org/" %}Vue</td>
      <td class="no">No</td>
      <td class="yes">Yes</td>
      <td class="yes">100%</td>
    </tr>
  </tbody>
</table>
</table-saw></div>

The compatibility score above is reporting data from [Custom Elements Everywhere](https://custom-elements-everywhere.com/), a test suite for web component compatibility.

---
If you’re interested in watching me talk about this instead, you can watch my talks on this topic:

* [Smashing Conference Freiburg](/web/smashingconf/2023/)
* [Stanford Web Camp](/web/stanford-webcamp/)
* [JS Heroes](/web/jsheroes/)
* [JS Nation](/web/jsnation/)