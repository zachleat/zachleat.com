---
title: "Anti-pattern: preload with font-display: optional"
permalink: /preload-font-display-optional/
tags:
  - font-loading
---

Most of the _quick win_ font loading advice I’m seeing right now (and some [that I give out](/web/23-minutes/)) involves combining `preload` and the `font-display` CSS descriptor.

Just to level-set, `preload` is a way to trigger your web font requests sooner, putting them higher in the network request waterfall. `font-display` is a way to declaratively control your font loading behavior by adding a descriptor to your `@font-face` block.

_Read more at [The Comprehensive Guide to Font Loading Strategies](http://zachleat.localhost/web/comprehensive-webfonts/)_

Lately, I’ve seen a few high profile developers recommend using `font-display: optional`. `font-display: optional` puts your web fonts on the back burner and only renders them on repeat primed-cache visits. It’s a perfectly acceptable method if web fonts are lower on the priority list for your use case’s requirements. For the record though, I’m not a huge fan of because I like to at least attempt to render web fonts on an empty-cache visit. _Caveat: in “The Compromise,” `font-display: optional` is emulated for browsers that do not support the CSS Font Loading API, a method to start moving away from using font loading polyfills for modern browsers._

However, after seeing some confusion on Twitter, I think it’s probably worth noting that if you decide to use `font-display: optional`, it would be a waste of your page’s resources to pair this with `preload`. It won’t break anything, it’ll just trigger that web font request early (causing network congestion if you have other critical path resources that need to be fetched). An early request won’t buy you much if the web fonts aren’t going to render when they finish.

Hope that clears up some of the confusion!