---
title: Web Fonts are ▢▢▢ Rocket Science
tags:
  - external
  - speaking
  - conference
  - video
  - font-loading
external_url: 'https://www.filamentgroup.com/lab/rocket-science.html'
external_url_location: end
medialength: 47 min
---
Web fonts can be tricky—but are they rocket science? Web browsers have decided to make them invisible while they’re loading to avoid rendering system fonts to users. In order to properly manage the performance of our web fonts, we respectfully disagree with that decision. Roll up the sleeves on your lab coat, y’all.

In this talk, we discuss practical ways to stabilize the four main pillars of proper font loading:

1. Avoiding invisible text.
1. Triggering downloads sooner.
1. Grouping repaints to reduce reflow.
1. If you make font files smaller, they load faster.


<figure>
	<div class="fluid-width-video-wrapper"><iframe src="https://player.vimeo.com/video/254727749" title="SmashingConf on Vimeo" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>
	<figcaption>
		<a href="https://vimeo.com/254727749">SmashingConf London &mdash; Zach Leatherman on &lsquo;Web Fonts are ▢▢▢ Rocket Science&rsquo;</a> from <a href="https://vimeo.com/smashingmagazine">Smashing Magazine</a> on <a href="https://vimeo.com">Vimeo</a>.
	</figcaption>
</figure>

## Timestamps for Content

* `01:25` [The Mitt Romney Web Font Loading Problem](/web/mitt-romney-webfont-problem/)
* `03:08` The Flash of Invisible Text (FOIT) and Flash of Unstyled Text (FOUT)
* `07:15` The History of @font-face Loading Behavior
* `13:10` @font-face Syntax
* `15:18` `font-display` for FOUT
* `18:08` `font-synthesis` as a tool for better FOUT
* `21:11` Using Faux Pas to detect `font-synthesis`: [faux-pas](https://github.com/filamentgroup/faux-pas) and [node-faux-pas](https://github.com/filamentgroup/node-faux-pas)
* `24:25` `preload`
* `25:30` The FOUT with a Class font loading strategy (for broadly supported, robust font loading)
* `30:43` Critical FOFT with a Data URI
* `32:39` Subsetting web fonts, [Glyphhanger](https://github.com/zachleat/glyphhanger)
* `35:12` Variable Fonts
