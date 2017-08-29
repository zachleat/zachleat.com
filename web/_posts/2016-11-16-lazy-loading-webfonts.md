---
title: Lazy Loading Web Fonts Is Probably Not What You Want
author: Zach Leatherman
layout: post
permalink: /lazy-loading-webfonts/
categories:
  - font-loading
tags:
  - font-loading
  - highlight
---

One month ago [Monica Dinculescu wrote a blog post entitled *Web fonts, boy, I don’t know*](https://meowni.ca/posts/web-fonts/). In it, she writes:

> Now think about fonts: is the critical path showing text, or styling it? I’d argue that unless your app is in the 1% it’s-all-a-magical-visual-experience bucket (in which case this post is not for you), it’s probably trying to communicate some content, and ugly content (that you prettify after) is better than no content.

> (Real talk: if you don’t think rendering text is a critical path, you’re whack and we need to have a chat.)

**YES.** Love it. 👍👍👍

And on the Flash of Invisible Text (FOIT), which she refers to as FOIC (they are synonymous):

> I hate this with the fire of a thousand suns, because instead of looking at actual content, I’m looking at bullets and underlines and random text you forgot to style.

**Yes again**—kindred spirits here. We need to get web fonts off the critical rendering path.

I also love the nod to `font-display` (praise be to `font-display`) and Chrome for reducing their Flash of Unstyled Text (FOUT) timeout on 2G from 3 seconds to 0 seconds. In Monica’s post she refers to this as FOUC<a href="#note-1" class="notes_link" id="link-note-1">1</a> (again, synonymous).

Lots of great stuff in Monica’s post. However, in the introduction, she writes:

> Anyway, the thing about 2G is that I fully understand that it will take me 10 seconds to load a page. What sucks is the fresh rage of the following 4 seconds where instead of content I get phantom underlines, waiting for a slightly-different-sans-serif to download. Listen: it doesn’t have to be this way. You can lazy load your font.

Hmm, alarm bells are starting to go off. Before I continue on, I want to say that I have an incredible amount of respect for Monica’s work. She builds [really great things](https://twitter.com/notwaldorf/status/801138269719171073). I don’t want this post to feel like I’m singling her out—she does amazing work. The reason I’m writing this post: I’ve seen this exact mistake made by many before. 

One of the most confusing parts about web font loading is that the time in which the web font starts to download (and makes the text invisible using FOIT) requires more conditions to be satisfied than just a valid `@font-face` block. Whether or not a web font will download depends on a few things:

1. The obvious, a valid `@font-face` block (with a `src` format that the browser supports)
1. A node attached to the document that uses the same `font-family`.
1. In WebKit and Blink, that attached node must also have content (not be empty).
1. If the `@font-face` has a `unicode-range` descriptor (in [browsers that support it](http://caniuse.com/#feat=font-unicode-range)), the content must fall inside the declared Unicode range.

The `font-weight`, `font-style`, and `font-stretch` descriptors inside the `@font-face` block do *not* need to match. But do note that if they don’t match you may see faux-bolding or faux-italic under certain conditions. Faux-bolding or faux-italic can be controlled with [font-synthesis](https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis) which is only supported in Firefox. So actually, when I said that it can be controlled—I meant that it can’t be controlled.

Once all of these conditions are met, the browser will start downloading your font and render any matching content invisible per the browser’s default FOIT. **The only time you see invisible text on the screen is when the web fonts are downloading.** The stylesheet/`@font-face` block is only one piece of the puzzle—and it only happens before a FOIT would ever begin.

So lazy loading your stylesheet (even if you do so asynchronously) only delays the initial time before your FOIT will begin. It doesn’t shorten the FOIT. It doesn’t minimize the time spent looking at invisible fonts. Lazy loading is actually much worse for readers than doing nothing—a reader could be a few paragraphs deep into your content before the text becomes invisible!

If you’re looking for a better web font loading solution, I’ve written a [Comprehensive Guide to Font Loading Strategies](https://www.zachleat.com/web/comprehensive-webfonts/) which includes a bunch of different font loading approaches (that range from the simple to advanced). If you’re feeling overwhelmed, just go with the [FOUT with a Class](https://www.zachleat.com/web/comprehensive-webfonts/#fout-class) approach.

### Addendum

<ol class="notes">
  <li class="notes_note" id="note-1">FOUC also refers to the scenario when your page renders before your CSS has successfully applied so I think it’d be better to stick with FOUT to avoid confusion. <a href="#link-note-1">Jump to original reference</a>.</li>
</ol>

A big thank you for [Monica Dinculescu](https://twitter.com/notwaldorf/) for reviewing this post before publication and giving her blessing to post it!

<div class="retweettoshare">
	<h3 class="retweettoshare_title">Retweet to share this post</h3>

	<div class="retweettoshare_widget">
		<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">★ Lazy Loading Web Fonts Is Probably Not What You Want <a href="https://t.co/B6ffIrk8mG">https://t.co/B6ffIrk8mG</a></p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/804654337087700992">December 2, 2016</a></blockquote>
	</div>
</div>
