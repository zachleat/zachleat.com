---
title: A tiny bit-o-CSS for Stable Scrollbar Gutters
toot: https://fediverse.zachleat.com/@zachleat/112615302809374708
---
I have my operating system configured to use visible scrollbars, a feature prominently elevated in macOS’ System Settings high enough that it would seem to imply some level of common usage (even though it’s not a default).

I don’t necessarily _prefer_ the behavior this feature enables but I use it as an implied measure of quality when browsing the web {% icon "fa:gavel" %}.

I typically see the following problems:

1. Pages that have horizontal overflow (and a scrollbar to match) are more obvious.
1. Pages may move ~20px horizontally when sites toggle document-level `overflow: hidden` when toggling modals/dialogs.
1. On particulary slow pages you may even see pages shift when progressively rendering content slower than it can fill one “page fold.”

The easiest thing folks can do to workaround this issue is add `html { overflow-y: scroll; }` to your CSS resets, which can be a great way to very easily reduce those content layout shift issues! But this little snippet adds a scrollbar to _every_ page.

To show scrollbars _only_ when they’re needed (while keeping space for the scrollbar if it’s added later) use the [`scrollbar-gutter` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter). `scrollbar-gutter` is [Baseline 2024 Newly Available](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility), so make sure you enhance it with a `@supports` guard.

```css
html {
	overflow-y: scroll;
}
@supports (scrollbar-gutter: stable) {
	html {
		overflow-y: auto;
		scrollbar-gutter: stable;
	}
}
```

This would look great in your reset stylesheet.

Related: [_Two Browsers Walked Into a Scrollbar (2019)_](https://www.filamentgroup.com/lab/scrollbars/)