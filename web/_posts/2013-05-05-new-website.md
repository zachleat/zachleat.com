---
title: 'zachleat.com is Dead, Long Live zachleat.com'
author: Zach Leatherman
layout: post
permalink: /zachleat-is-dead/
---

*If you’re reading this in the RSS Feed, please accept my humble apologies for not transparently converting my feed. This is one of the perils of switching from WordPress to Jekyll. The URL for the feed has **not** changed, but you’ll probably see a lot of unread items appearing here, so feel free to “mark all as read.”*

Welcome to the redesign of zachleat.com! Notably, the title of the blog is now my name, instead of `Web 3.0, 6 Bladed Razors, 7 Minute Abs`. I’ve decided that using my name for the blog title is more in line with the principles I set forth in [A Web Developer Fumbling with Social Media](/web/fumbling-with-social-media/).

## Tools

The entire site’s source code is [available on GitHub](https://github.com/zachleat/zachleat.com). If you see any issues with the site, please [file them on GitHub](https://github.com/zachleat/zachleat.com/issues). I probably could be convinced to rip out the proprietary pieces and release it as a blog boilerplate project—let me know if this is something you’d be interested in using.

* [Jekyll](https://github.com/mojombo/jekyll)
* [Grunt](http://gruntjs.com/)
* [Zurb Foundation Social Icons](http://zurb.com/playground/foundation-icons)
* [Pygments Syntax Highlighter](http://pygments.org/)
* [FitVids (CSS only)](http://fitvidsjs.com/)
* [Bitter @font-face](http://www.google.com/fonts/specimen/Bitter)

Grunt and Jekyll work beautifully together, even though they’re written in two different languages. It’s especially convenient that `grunt watch` is configured to run the appropriate jekyll commands to generate the site automatically.

That being said, if anyone knows of a really good Node.js site generator, please let me know. I’ve tried a bunch of them and haven’t yet found anything as good as Jekyll.

## Theme

It’s a simple minimalistic mobile-first responsive web design (that’s a mouthful, eh?) theme that I’ve built from scratch. I’m calling it **Butt Sweater**, for obvious reasons. Okay, not really. Well actually I mean to say, the reasons are not obvious—it’s really called [Butt Sweater](https://github.com/zachleat/zachleat.com/blob/093aaa88642a5ba7b4d410828d1f53a3a047f8bd/web/css/_buttsweater.scss).

## Removals

* Wordpress: It was good to me for many years, but I am not sad to see Wordpress go and will look forward to blogging using Markdown in my normal code editor.
* jQuery: I love it, but do not make use of enough JavaScript on the site to warrant it—yet.

## Future Plans

* Add [SocialCount](/web/socialcount/), which will mean either re-adding jQuery or removing the jQuery dependency from SocialCount.
* I want to use the Google Analytics data to generate a visualization for the site that will communicate post popularity. I want it to be easy for visitors to find my most popular posts on the big list of posts on the home page.
* ~~Import the old Comments. This is still in the works.  Whether or not I re-add the ability to let users post new comments directly on the site is still a matter for debate.~~

For now, [let me know what you think on twitter](https://twitter.com/zachleat/).
