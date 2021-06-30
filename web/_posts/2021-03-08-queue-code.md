---
title: Queue Code—“Live” Code without Errors
tags:
  - project
  - eleventy
---
I’ll be frank. (Hi Frank.) I don’t enjoy live coding. It doesn’t matter if it’s in front of two people or two hundred people. It fills me with unbridled anxiety.

I say this as someone who has spent over ten years doing technical public speaking. When I started doing talks, I had a lot of the same emotions about public speaking. Without doubt, live coding is something that I could invest time into and practice and improve—but right now I’m in the “I’m Terrible—Don’t Watch Me” stage of personal growth.

So like any naïve programmer faced with a problem, I decided the best way to fix it was to automate it. In [This Web Site is a Tech Talk](/web/this-website-is-a-tech-talk/) I built an entire [slide deck project](https://github.com/zachleat/this-website-is-a-tech-talk) to create the _illusion_ of live coding without having to write any code live.

My daughter used this to [great effect in a tweet](https://twitter.com/zachleat/status/1365786974813093896).

## Now You Try

I decided to package some of this code up and put it on the web to make it easier to use. I’m calling it Queue Code (part Cue Cards, part queued pre-typed Source code 😅).

<p class="primarylink"><a href="https://queuecode.zachleat.dev/">Queue Code</a></p>

## Architecture

The [source code for Queue Code is available on GitHub](https://github.com/zachleat/queue-code).

This is hosted on Netlify but arguably not very Jamstack-ish? It’s a gray area. The entire site runs through a Netlify Function.

When you visit the site, it makes a runtime request to the target `url`, either determined by a query parameter or pointing to the [default GitHub gist I defined](https://gist.github.com/zachleat/542f1d15c2061fc3cf4c0bc30c3b9bac/).

It then uses the [Eleventy Syntax Highlighter](https://www.11ty.dev/docs/plugins/syntaxhighlight/) to syntax highlight the code. It uses a yet-to-be-documented [Character Wrap feature](https://github.com/zachleat/queue-code/blob/52fbc3418e29547866dbdf48f6c63a324e823f86/netlify/functions/highlight.js#L81) of the Eleventy Syntax Highlighter that will wrap every individual character of syntax highlighted code in an element that I can progressively show and hide based on arbitrary keyboard input.

The Character Wrap feature used JSDOM to achieve the wrapping behavior but [I recently switched it to use linkedom](https://twitter.com/zachleat/status/1368246686578077705) for a much needed speed boost! Honestly I don’t think Queue Code would have made it to the finish line without this change. I did place an upper limit on the size of the documents it can handle. There are time limits (~10s) on how long requests in a serverless function can run. If the document is too large, it just returns the syntax highlighted version instead (without character wrapping).

You can use this for presentations (like me). You could use this for screencasts or recording video training materials. Hell, you could even use it for job interviews (probably don’t do this). But it wouldn’t hurt to have a `fizzbuzz` gist in your back pocket just in case 😅

## More Features

You can read about the different query parameter controlled features on [the default gist](https://queuecode.zachleat.dev/). But this is just a small subset of the features that I developed for [This Web Site is a Tech Talk](/web/this-website-is-a-tech-talk/). I may add more if y’all really like this. You can browse through my slides to see what kind of stuff is already ready to port over, for example: additions inside of boilerplate code, “fake” deletes, multiple cursors, live browser preview, fake terminal output.

Enjoy it y’all—and cc me with any “live” coding videos you put up!
