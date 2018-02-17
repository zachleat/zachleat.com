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

{% highlight-plain %}
&lt;a href=&quot;test.html&quot;&gt;Test&lt;/a&gt;&lt;!-- match --&gt;
&lt;a href=&quot;test2.html&quot;&gt;Test&lt;/a&gt;&lt;!-- match --&gt;
&lt;a href=&quot;test2.html&quot;&gt;Duplicate Test&lt;/a&gt;&lt;!-- do not match --&gt;
&lt;a href=&quot;root.html&quot;&gt;URL to self&lt;/a&gt;&lt;!-- match --&gt;
&lt;a href=&quot;mailto:test@example.com&quot;&gt;Email link&lt;/a&gt;&lt;!-- do not match --&gt;
&lt;a href=&quot;http://www.google.com/&quot;&gt;External&lt;/a&gt;&lt;!-- do not match --&gt;
{% endhighlight %}

Can also act as a live-DOM CSS search across multiple files (find all the templates that are using the CSS selector I want to change). If I’m worried about changing code in a CSS selector, I’ll use this tool to search for instances of the selector across my project.

<img src="/web/img/posts/spider-pig/spider-pig.jpg" alt="spider-pig on the command line" class="primary">
