---
title: The Simplest Web Site That Could Possibly Work Well
permalink: /that-could-possibly-work/
tags:
  - nejsconf
  - eleventy
  - popular-posts
postRank: 15
---

This week we’ve launched the [new web site for NEJS CONF 2018](https://2018.nejsconf.com/) and I am so excited for our theme this year: ✨ outer space ✨.

<a href="https://2018.nejsconf.com/" class="no-underline"><img src="{{ "/img/posts/nejsconf/nejsconf-2018@620.png" | url }}" alt="2018.nejsconf.com" class="primary" srcset="{{ "/img/posts/nejsconf/nejsconf-2018@620.png" | url }} 620w, {{ "/img/posts/nejsconf/nejsconf-2018@1240.png" | url }} 1240w" sizes="(min-width: 1253px) 930px, (min-width: 960px) 70vw, 100vw"></a>

### NEJS CONF 2018

* **[Register for the Conference!](https://register.nejsconf.com/)**
* Go to [2018.nejsconf.com](https://2018.nejsconf.com/)
* [Style Guide](https://2018.nejsconf.com/styleguide/)
* [GitHub repository](https://github.com/NebraskaJS/2018.nejsconf.com)

## The Simplest Tooling That Can Possibly Work Well

I _try_ not to get carried away with tooling when working on these one-off side project sites. I want to implement best practices for front end web site performance but I also don’t want to spend a ton of bootstrap time getting the project infrastructure up before I can begin building.

I’d like something that scales to a little bit more complex of a project than this (but not much):

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">How to make a web page in 2017: <a href="https://t.co/80BpM1BM5x">pic.twitter.com/80BpM1BM5x</a></p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/866398752722092032?ref_src=twsrc%5Etfw">May 21, 2017</a></blockquote>

That’s one of my favorite things about [Eleventy](https://www.11ty.io/). It is flexible enough to work with any kind of project or directory structure, transforming data and templates into HTML content quickly and easily. It’s more of a tool than a framework.

{% include eleventy-links.html %}

## The Simplest Critical CSS That Can Possibly Work Well

Critical CSS can be one of the biggest wins a project can do to improve their time to first render. Critical CSS build tools ([Filament Group](https://github.com/filamentgroup/criticalCSS) has one, as well as [Addy Osmani](https://github.com/addyosmani/critical) and others) will find the CSS used in a stock _Above the Fold_ viewport size and inject that right into the markup for near-instant rendering. However, we don’t really need to do this analysis at all if our stylesheets are small enough! The wins from this approach improve with stylesheet size. With a tiny stylesheet, we can just inject the whole CSS stylesheet right into the page. Good enough. 😇

Here’s how that works in Eleventy using Nunjucks for a [layout template](https://github.com/NebraskaJS/2018.nejsconf.com/blob/master/_includes/empty.njk#L7):

``` html
{%- raw -%}
<!-- capture the CSS content as a Nunjucks variable -->
{% set css %}{% include "theme.css" %}{% endset %}
<!-- feed it through a cssmin filter to minify -->
<style>{{ css | cssmin | safe }}</style>
{%- endraw -%}
```

Here we are using a [`cssmin` filter in our eleventy Config](https://github.com/NebraskaJS/2018.nejsconf.com/blob/master/.eleventy.js#L7) to minify the CSS too:

``` js
const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
	eleventyConfig.addFilter("cssmin", function(code) {
		return new CleanCSS({}).minify(code).styles;
	});
};
```

_Don’t forget to `npm install clean-css`._

## The Simplest Style Guide That Can Possibly Work Well

I didn’t want to use a separate dedicated style guide tool for this small project, either. There are a bunch of good ones out there and they work great for longer, larger projects. But I wanted the simplest thing that could possibly work. So, I set up a single template to showcase all of the site’s components together. This is the same approach I took for [my personal site](/web/now-with-style-guide/). Much like Sunday morning, easy.

* [The Super Formal NEJS CONF 2018 Style Guide](https://2018.nejsconf.com/styleguide/)

## The Simplest Preview That Can Possibly Work Well

About a week before launch, I decided that it would be good to put up a preview of the site online for some of the other organizers and our designer to look at and review. If we were [using Netlify here](https://www.netlify.com/) this would have been trivial without code changes. And truth-be-told, setting up an additional subdomain on our existing host for testing wouldn’t have been that hard. But one of the coolest things Eleventy has to help with this is it’s [`pathPrefix` configuration option](https://github.com/11ty/eleventy#configuration-optional). The default is `/` but I was able to simply change this to `/preview/`, rebuild and upload the entire site to `2018.nejsconf.com/preview/` for a quick and easy public preview. No additional server configuration required.


## The Simplest Brand That Can Possibly Work Well

One of the intentional choices I made for NEJS CONF going into the second year was to maintain a consistent typeface throughout our different themes and redesigns. We’ve had three different designers working on the project in four years, but our typeface has remained constant. Using [Effra](https://typekit.com/fonts/effra) every year (loaded from TypeKit) keeps a thread of consistency across wildly varying themes and helps people recognize our community-run conference as we grow and build a larger audience. Somewhat relatedly, this is also why [I keep the green tint](/web/about/) when I change my avatar on social media. A bit of consistency in an inconsistent world.

### 2017

<a href="https://2017.nejsconf.com/" class="no-underline"><img src="{{ "/img/posts/nejsconf/nejsconf-2017@620.png" | url }}" alt="2017.nejsconf.com" class="primary" srcset="{{ "/img/posts/nejsconf/nejsconf-2017@620.png" | url }} 620w, {{ "/img/posts/nejsconf/nejsconf-2017@1240.png" | url }} 1240w" sizes="(min-width: 1253px) 930px, (min-width: 960px) 70vw, 100vw"></a>

### 2016

<a href="https://2016.nejsconf.com/" class="no-underline"><img src="{{ "/img/posts/nejsconf/nejsconf-2016@620.png" | url }}" alt="2016.nejsconf.com" class="primary" srcset="{{ "/img/posts/nejsconf/nejsconf-2016@620.png" | url }} 620w, {{ "/img/posts/nejsconf/nejsconf-2016@1240.png" | url }} 1240w" sizes="(min-width: 1253px) 930px, (min-width: 960px) 70vw, 100vw"></a>

_Excuse that dotted underline there, I swear the default browser styles for `abbr` changed after this launched 😇._

### 2015

<a href="https://2015.nejsconf.com/" class="no-underline"><img src="{{ "/img/posts/nejsconf/nejsconf-2015@620.png" | url }}" alt="2015.nejsconf.com" class="primary" srcset="{{ "/img/posts/nejsconf/nejsconf-2015@620.png" | url }} 620w, {{ "/img/posts/nejsconf/nejsconf-2015@1240.png" | url }} 1240w" sizes="(min-width: 1253px) 930px, (min-width: 960px) 70vw, 100vw"></a>

---

A special shout out to [Will Riley](https://twitter.com/splitinfinities) for his help with a [big pull request after the site’s launch](https://github.com/NebraskaJS/2018.nejsconf.com/pull/1). Thanks Will!
