---
title: 'Quick Demo: Animating on an Oval Path'
tweet: https://twitter.com/zachleat/status/865212928571707392
tag_icon: "fab:css"
---

I was experimenting with animating a planet for the [new NEJSCONF web site](https://2017.nejsconf.com/) *(early bird tickets now available)* and stumbled upon this amazingly detailed [Codepen of our Solar System](https://codepen.io/juliangarnier/pen/idhuG). Fortunately, it did exactly what I wanted—so I set out to parse the CSS secrets (nay, Tricks) within. While the code didn’t make it in to the final site, I thought I’d publish a pared down version of the demo in case someone else might find the simplified CSS useful.

### [Demo](/demos/animate-oval-path/animate-oval-path.html)

### [Download as .zip](/demos/animate-oval-path.zip)

This is the general idea, without any extra demo style junk:

<video controls autoplay loop src="/demos/animate-oval-path-videos/loop-nodemostyles.mp4">
  Sorry, your browser doesn't support embedded videos. Try <a href="/demos/animate-oval-path-videos/loop-nodemostyles.mp4">downloading it</a> instead.
</video>

And this video is a really good, simple explanation of *how* it works. Look at that plane rotate.

<video controls preload="metadata" loop src="/demos/animate-oval-path-videos/animation.mp4">
  Sorry, your browser doesn't support embedded videos. Try <a href="/demos/animate-oval-path-videos/animation.mp4">downloading it</a> instead.
</video>

Here’s a more polished view, with demo styles and images. These extra styles are separated out on the demo page, to make it easier to understand what’s going on.

<video controls preload="metadata" loop src="/demos/animate-oval-path-videos/loop.mp4">
  Sorry, your browser doesn't support embedded videos. Try <a href="/demos/animate-oval-path-videos/loop.mp4">downloading it</a> instead.
</video>

### Requirements

This demo uses [CSS variables](http://caniuse.com/#feat=css-variables) because it makes it easier to read the code and see which pieces are related. I’d recommend removing those if you’re gonna put this into production.

*Update: sorry for the framerate of those videos. I’m using [Kap](https://getkap.co/) and I’ve bumped up the default FPS for next time.*


