---
title: You’re Reading About Me
layout: layouts/pagealign.liquid
---
<style>
.about-primary-avatar {
	display: block;
	max-width: 260px;
	border-radius: 50%;
	margin: 2em auto;
}
.about-secondary-avatar {
	display: block;
	max-width: 260px;
	margin: 0;
}
</style>

<img src="/img/avatar-2025-green.png" alt="Photo of Zach Leatherman’s Bearded Face" class="about-primary-avatar" loading="eager" fetchpriority="high">

<ul class="list-inline fl fl-inline fl-nowrap">
	<li>This web site is maintained by <strong>Zach Leatherman</strong> <em>(he, him, they)</em>.</li>
	<li>View his <a href="/resume/"> full résumé</a>.</li>
</ul>

_For what it’s worth: if you’re trying to contact me I do prefer direct messages on Mastodon (or Bluesky) to email._

<ul class="list-inline fl fl-inline fl-nowrap">
	<li><a href="/web/feed/">{% icon "fas:square-rss" %}<strong>Subscribe</strong></a></li>
	<li><a href="https://fediverse.zachleat.com/@zachleat">{% icon "fab:mastodon" %}<strong>Mastodon</strong></a></li>
	<li><a href="https://bsky.app/profile/zachleat.com">{% icon "fab:bluesky" %}Bluesky</a></li>
	<li><a href="https://github.com/zachleat/">{% icon "fab:github" %}GitHub</a></li>
	<li><a href="mailto:zach@zachleat.com">{% icon "far:envelope" %}<span>Email</span></a></li>
	<li><a href="https://www.npmjs.com/~zachleat">{% icon "fab:npm" %}npm</a></li>
	<li><a href="https://www.linkedin.com/in/zachleat/">{% icon "fab:linkedin" %}LinkedIn</a></li>
	<li><a href="https://www.youtube.com/channel/UCMlSs0Ltg57qpYdFwUVLR2A">{% icon "fab:youtube" %}YouTube</a></li>
	<li><a href="https://codepen.io/zachleat/">{% icon "fab:codepen" %}Codepen</a></li>
	<li><a href="https://opencollective.com/zachleat">{% indieAvatar "https://opencollective.com/" %}OpenCollective</a></li>
	<li><a href="https://letterboxd.com/zachleat/">{% icon "fab:square-letterboxd" %}Letterboxd</a></li>
	<li>{% indieAvatar "https://nintendo.com/" %}Nintendo</li>
	<li>{% icon "fab:apple" %}Apple Music</li>
	<li><del>{% icon "fab:twitter" %}Twitter</del> (2006–2022)</li>
	<li><a href="/twitter/">{% icon "fab:twitter" %}Twitter Archive</a></li>
	<li><del>{% icon "fab:facebook" %}Facebook</del> (2005–2016)</li>
	{% comment %}<li><a href="https://twitter.com/eleven_ty/">{% indieAvatar "https://x.com/" %}Twitter <code>@eleven_ty</code></a></li>{% endcomment %}
</ul>

## Bio

{% include "bio-text-medium.html" %}

### Alternate Formats

Here to fetch my bio? Let’s appeal to your base instinct to copy and paste:

#### Plaintext

``` text
Zach is a builder for the web at Font Awesome and the creator/maintainer of Eleventy (11ty), an award-winning open source site generator. At one point he became entirely too fixated on web fonts. He has given {{ collections.all | getSpeakingCount: "type" }} talks in {{ collections.all | getSpeakingUniqueCount: "country" | numberString }} different countries at events like Beyond Tellerrand, Smashing Conference, Jamstack Conf, CSSConf, and The White House. Formerly part of CloudCannon, Netlify, Filament Group, NEJS CONF, and NebraskaJS.
```

#### HTML

``` html
Zach is a builder for the web at <a href="https://fontawesome.com/">Font Awesome</a> and the creator/maintainer of <a href="https://www.11ty.dev">Eleventy (11ty)</a>, an award-winning open source site generator. At one point he became entirely <a href="https://www.zachleat.com/web/fonts/"><em>too fixated</em> on web fonts</a>. He has given <a href="https://www.zachleat.com/web/speaking/">{{ collections.all | getSpeakingCount: "type" }} talks in {{ collections.all | getSpeakingUniqueCount: "country" | numberString }} different countries</a> at events like Beyond Tellerrand, Smashing Conference, Jamstack Conf, CSSConf, and <a href="https://www.zachleat.com/web/whitehouse/">The White House</a>. Formerly part of <a href="https://cloudcannon.com/">CloudCannon</a>, Netlify, <a href="https://www.filamentgroup.com/">Filament Group</a>, <a href="http://nejsconf.com/">NEJS CONF</a>, and <a href="http://nebraskajs.com">NebraskaJS</a>.
```

#### Markdown

``` markdown
Zach is a builder for the web at [Font Awesome](https://fontawesome.com/) and the creator/maintainer of [Eleventy (11ty)](https://www.11ty.dev), an award-winning open source site generator. At one point he became entirely [_too fixated_ on web fonts](https://www.zachleat.com/web/fonts/). He has given [{{ collections.all | getSpeakingCount: "type" }} talks in {{ collections.all | getSpeakingUniqueCount: "country" | numberString }} different countries](https://www.zachleat.com/web/speaking/) at events like Beyond Tellerrand, Smashing Conference, Jamstack Conf, CSSConf, and [The White House](https://www.zachleat.com/web/whitehouse/). Formerly part of Netlify, [Filament Group](https://www.filamentgroup.com/), [NEJS CONF](http://nejsconf.com/), and [NebraskaJS](http://nebraskajs.com).
```

## Site History

<table>
	<thead>
		<tr>
			<th>Year</th>
			<th>Type</th>
			<th>Using</th>
			<th>Learn more…</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>2007</code></td>
			<td>Software</td>
			<td>WordPress</td>
			<td></td>
		</tr>
		<tr>
			<td><code>2009</code></td>
			<td>Host</td>
			<td><a href="https://www.nearlyfreespeech.net/">nearlyfreespeech.net</a></td>
			<td></td>
		</tr>
		<tr>
			<td><code>2013</code></td>
			<td>Software</td>
			<td>Jekyll</td>
			<td><a href="/web/zachleat-is-dead/"><em>zachleat.com is Dead, Long Live zachleat.com</em></a></td>
		</tr>
		<tr>
			<td><code>2018</code></td>
			<td>Software</td>
			<td>Eleventy</td>
			<td><a href="https://github.com/zachleat/zachleat.com/commit/0e10b089f3d7b86b8c0c13ade03782e9908347c1"><em>GitHub commit</em></a> (too busy to blog this one, apparently!)</td>
		</tr>
		<tr>
			<td><code>2022</code></td>
			<td>Host</td>
			<td>Netlify</td>
			<td><a href="/web/zachleat-on-netlify/"><em>Migrating My 16+ Year Old Web Site to Netlify in a Few Short Days</em></a></td>
		</tr>
	</tbody>
</table>

## Photos

### Deprecated but saved for Posterity

<figure>
	<img src="/img/bio-2017.jpg" alt="Just a picture of my face." eleventy:widths="400,800,auto">
	<figcaption>Picture taken by <a href="https://www.facebook.com/andrey.davydchyk">Andrey Davydchyk</a> at <a href="https://www.facebook.com/cssminskjs/">CSS Minsk JS</a>. <a href="/img/bio-2017.jpg">Download JPEG version</a>.</figcaption>
</figure>

<figure>
	<img src="/img/avatar-2017-big.png" alt="Photo of Zach Leatherman’s Bearded Face" class="about-secondary-avatar">
	<figcaption>Modified from above for avatar use.</figcaption>
</figure>

<figure>
	<img src="/img/avatar.png" alt="A very bearded picture of my face.">
	<figcaption>Picture taken by <a href="https://twitter.com/marcthiele">Marc Thiele</a> at <a href="/web/smashingconf/2014/">SmashingConf Whistler</a>. Download the <a href="/img/bio.jpg">original version</a>.</figcaption>
</figure>

<figure>
	<img src="/img/avatar-old.png" alt="An avatar with zachleat vertical text aside.">
	<figcaption>Deprecated.</figcaption>
</figure>

<figure>
	<img src="./web/img/web367.png" alt="The very first logo for this blog: Web 3.0 6 Bladed Razors and 7 Minute Abs">
	<figcaption>This web site was started in 2007 and was originally titled <strong>Web 3.0, 6 Bladed Razors, and 7 Minute Abs</strong>.</figcaption>
</figure>
