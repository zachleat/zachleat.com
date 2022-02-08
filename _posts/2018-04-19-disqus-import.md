---
title: Import your Disqus Comments to Eleventy
tags:
  - eleventy
---

I’m slowly [migrating off of Disqus](https://twitter.com/zachleat/status/986619121403138051). I want to keep my existing comment content though.

Migration is an easy sell:

* A few KB of static HTML is faster than the Disqus JavaScript. I lazy-load Disqus but it’s 430KB ⚠️.
* No third party JavaScript—no prying eyes!
* Comments available without JavaScript.
* Full control over markup and style of comments (samples provided below). Finally, I can use my web fonts 😎.
* No annoying loading delay when someone direct-links to a comment on your page.

I wrote up the steps I took to import the Disqus export XML in my `eleventy` blog. This method:

* Properly maintains comment threading as shown in the Disqus interface.
* Uses gravatar for avatar images.
* Works with any existing links to Disqus comments in the wild (and no annoying delay waiting for Disqus to load and jump to the comment).

<p class="primarylink">Check out the full tutorial steps at <a href="https://github.com/11ty/eleventy-import-disqus"><code>eleventy-import-disqus</code> on GitHub</a></p>

As an intermediate step, I still allow users to load the Disqus interface to participate in the discussion but these comments will not be available statically until I do another export/import—this is super easy after you do it once.

My goal is to add [webmentions](https://nicolas-hoizey.com/2017/07/so-long-disqus-hello-webmentions.html) (thanks Nicolas for the tip!), but full credit to [Staticman](https://staticman.net/) and [utterances](https://utteranc.es/) which look great too.

---

{% include "eleventy-links.html" %}
