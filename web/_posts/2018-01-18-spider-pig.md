---
title: spider-pig Searches for Nodes that match a CSS Selector
permalink: /spider-pig/
tags:
  - project
---

<p class="primarylink"><a href="https://github.com/zachleat/spider-pig">spider-pig on GitHub</a></p>
<p class="primarylink"><a href="https://www.npmjs.com/package/@zachleat/spider-pig">spider-pig on npm</a></p>

`spider-pig` is a command line utility that takes a URL and retrieves all the local URL links on the page. It can also search for a CSS selector on each local URL to measure the impact of a CSS change.

<img src="/web/img/posts/spider-pig/spider-pig-simpsons.jpg" alt="Homer Simpson holding up a pig upside-down pretending that it’s walking on the ceiling">

Get a list of local URL links from a root URL. Works with JavaScript generated content.

``` html
<a href="test.html">Test</a><!-- match -->
<a href="test2.html">Test</a><!-- match -->
<a href="test2.html">Duplicate Test</a><!-- do not match -->
<a href="root.html">URL to self</a><!-- match -->
<a href="mailto:test@example.com">Email link</a><!-- do not match -->
<a href="http://www.google.com/">External</a><!-- do not match -->
```

Can also act as a live-DOM CSS search across multiple files (find all the templates that are using the CSS selector I want to change). If I’m worried about changing code in a CSS selector, I’ll use this tool to search for instances of the selector across my project.

<img src="/web/img/posts/spider-pig/spider-pig.jpg" alt="spider-pig on the command line" class="primary">
