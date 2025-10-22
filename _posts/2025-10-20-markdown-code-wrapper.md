---
title: Wrapper Elements around Code Blocks in Markdown
tags: eleventy
---
I encountered a surprising (to me) edge-case bug with Markdown code blocks in the `markdown-it` plugin today that I thought was worth sharing!

Consider this sample `index.md` template with a code block with an empty line (typical use in a markdown file):

````markdown
```js
// Line 1

// Line 3
```
````

This renders as (which is fine, good, expected ✅):

```html
<pre><code>// line 1

// line 3
</code></pre>
```

Now consider this Markdown code (HTML in a `.md` file). This resembles code that _any_ generic syntax highlighting plugin (say, even [the Eleventy one](https://www.11ty.dev/docs/plugins/syntaxhighlight/)) would return (especially when preprocessing Markdown as Liquid first, as Eleventy projects do by default):

```markdown
<pre><code>
// line 1

// line 3
</code></pre>
```

This above renders as-is (passthrough) without alteration (which is also fine, good, expected ✅).

Now consider this third case, in which your `<pre>` is wrapped in another HTML element (a `<div>` here for simplicity):

```markdown
<div><pre><code>
// line 1

// line 3
</code></pre></div>
```

This renders as (broken, wrong, not expected ⛔️):

```html
<div><pre><code>
// line 1
<p>// line 3
</code></pre></div></p>
```

_(The same behavior happens with or without the `<code>` element)_

The takeaway here is that if you’re using a wrapper element around your `<pre>` to nest some more sophisticated elements (for example, a Copy to Clipboard button for your code block), you need to make sure to return the triple backtick syntax instead of `<pre>` so that the Markdown parser won’t introduce unwanted paragraph elements.

## Workarounds

It’s unlikely that most folks will run into this bug, but if you do decide you want a wrapper element around your code blocks there are a few options in the [Eleventy Syntax Highlighting plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/#installation).

You _could_ use `lineSeparator: "<br>"` option instead of the default `"\n"` (though this is not recommended). This has the hefty caveat that it pollutes the `textContent` value of the node with extra line breaks (which would show in the output of, say, a Copy to Clipboard button).

Alternatively, you could wire up your own paired shortcode (or filter too, but that’s an exercise left to the reader) that works around the issue by deferring to the Markdown syntax highlighter:

```js
import { pairedShortcode } from "@11ty/eleventy-plugin-syntaxhighlight";

const TRIPLE_TICK = "```";
const HIGHLIGHT_OPTIONS = {
	lineSeparator: "\n",
};

export default function(eleventyConfig) {
	// Our highlight shortcode
	eleventyConfig.addPairedShortcode("highlight", function(code, language) {
		if(this.page.inputPath.endsWith(".md")) {
			return `<div>\n\n${TRIPLE_TICK}${language || ""}
${code}
${TRIPLE_TICK}\n\n</div>`;
		}

		return `<div>${pairedShortcode(code, language, "", HIGHLIGHT_OPTIONS)}</div>`;
	});

	// This wires up Markdown’s triple-tick syntax
	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdLib.set({
			highlight: function(code, language) {
				return pairedShortcode(code, language, "", HIGHLIGHT_OPTIONS);
			}
		})
	});
};
```

And here’s how you could use it in Nunjucks, Liquid, or Markdown (preprocessed by Nunjucks/Liquid):

{% raw %}
```jinja2
{% highlight "js" %}
// line 1

// line 3
{% endhighlight %}
```
{% endraw %}

We’ll likely include this fix with the default `highlight` paired shortcode in a future version of the Eleventy Syntax Highlighting plugin. Follow along on [GitHub Issue #77](https://github.com/11ty/eleventy-plugin-syntaxhighlight/issues/77).
