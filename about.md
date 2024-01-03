---
title: You’re Reading About Me
layout: layouts/pagealign.liquid
largeImageOptions:
  widths: [400, 800, "auto"]
bioImageAttrs:
  src: "./img/bio-2017.jpg"
  alt: Just a picture of my face.
avatarBioImageAttrs:
  src: "./img/avatar-2017-big.png"
  alt: "Photo of Zach Leatherman’s Bearded Face"
  class: "about-primary-avatar"
  loading: eager
  fetchpriority: high
avatarBioImageAttrsSecondary:
  src: "./img/avatar-2017-big.png"
  alt: "Photo of Zach Leatherman’s Bearded Face"
  class: "about-secondary-avatar"
deprecatedBioImageAttrs:
  src: "./img/avatar.png"
  alt: A very bearded picture of my face.
veryDeprecatedBioImageAttrs:
  src: "./img/avatar-old.png"
  alt: An avatar with zachleat vertical text aside.
web367ImageAttrs:
  src: "./web/img/web367.png"
  alt: "The very first logo for this blog: Web 3.0 6 Bladed Razors and 7 Minute Abs"
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

{% image avatarBioImageAttrs %}

This web blog is written by **Zach Leatherman**. View his <a href="/resume/"> full résumé</a>.

<ul class="list-inline fl fl-inline fl-nowrap">
	<li><a href="https://fediverse.zachleat.com/@zachleat">{% indieAvatar "https://fediverse.zachleat.com/@zachleat" %}<strong>Mastodon</strong></a></li>
	<li><a href="/web/feed/"><svg width="28" height="28" viewBox="0 0 32 32" preserveAspectRatio="xMinYMin" aria-hidden="true" focusable="false" class="z-avatar z-avatar-sq"><use xlink:href="#icon-feed"></use></svg><strong>Subscribe</strong></a></li>
	<li><a href="mailto:zach@zachleat.com" data-icon="✉️" data-icon-shadow><span>Email</span></a></a>
	<li><a href="https://github.com/zachleat/">{% indieAvatar "https://github.com/" %}GitHub</a></li>
	<li><a href="https://www.npmjs.com/~zachleat">{% indieAvatar "https://npmjs.com/" %}npm</a></li>
	<li><a href="https://bsky.app/profile/zachleat.com">{% indieAvatar "https://bsky.app/" %}Bluesky</a></li>
	<li><a href="https://www.linkedin.com/in/zachleat/">{% indieAvatar "https://www.linkedin.com/" %}LinkedIn</a></li>
	<li><a href="https://codepen.io/zachleat/">Codepen</a></li>
	<li><a href="https://opencollective.com/zachleat">{% indieAvatar "https://opencollective.com/" %}OpenCollective</a></li>
	<li><a href="https://letterboxd.com/zachleat/">{% indieAvatar "https://letterboxd.com/" %}Letterboxd</a></li>
	<li>{% indieAvatar "https://nintendo.com/" %}Nintendo</li>
	<li>{% indieAvatar "https://tidal.com/" %}Tidal</li>
	<li><a href="/twitter/"><svg width="28" height="28" viewBox="0 0 32 32" preserveAspectRatio="xMinYMin" aria-hidden="true" focusable="false" class="z-avatar"><use xlink:href="#icon-twitter"></use></svg>Twitter Archive</a></li>
	<li><a href="https://twitter.com/zachleat/">{% indieAvatar "https://x.com/" %}Twitter</a> <em>(dormant)</em></li>
	{% comment %}<li><a href="https://twitter.com/eleven_ty/">{% indieAvatar "https://x.com/" %}Twitter <code>@eleven_ty</code></a></li>{% endcomment %}
</ul>

## Bio

{% include "bio-text-medium.html" %}

### Alternate Formats

Here to fetch my bio? Let’s appeal to your base instinct to copy and paste:

#### Plaintext

``` text
Zach is a builder for the web at CloudCannon. He is the creator and maintainer of Eleventy (11ty), an award-winning open source site generator. At one point he became entirely too fixated on web fonts. He has given {{ collections.all | getSpeakingCount: "type" }} talks in {{ collections.all | getSpeakingUniqueCount: "country" | numberString }} different countries at events like Beyond Tellerrand, Smashing Conference, Jamstack Conf, CSSConf, and The White House. Formerly part of Netlify, Filament Group, NEJS CONF, and NebraskaJS.
```

#### HTML

``` html
Zach is a builder for the web at <a href="https://cloudcannon.com/">CloudCannon</a>. He is the creator and maintainer of <a href="https://www.11ty.dev">Eleventy (11ty)</a>, an award-winning open source site generator. At one point he became entirely <a href="https://www.zachleat.com/web/fonts/"><em>too fixated</em> on web fonts</a>. He has given <a href="https://www.zachleat.com/web/speaking/">{{ collections.all | getSpeakingCount: "type" }} talks in {{ collections.all | getSpeakingUniqueCount: "country" | numberString }} different countries</a> at events like Beyond Tellerrand, Smashing Conference, Jamstack Conf, CSSConf, and <a href="https://www.zachleat.com/web/whitehouse/">The White House</a>. Formerly part of Netlify, <a href="https://www.filamentgroup.com/">Filament Group</a>, <a href="http://nejsconf.com/">NEJS CONF</a>, and <a href="http://nebraskajs.com">NebraskaJS</a>.
```

#### Markdown

``` markdown
Zach is a builder for the web at [CloudCannon](https://cloudcannon.com/). He is the creator and maintainer of [Eleventy (11ty)](https://www.11ty.dev), an award-winning open source site generator. At one point he became entirely [_too fixated_ on web fonts](https://www.zachleat.com/web/fonts/). He has given [{{ collections.all | getSpeakingCount: "type" }} talks in {{ collections.all | getSpeakingUniqueCount: "country" | numberString }} different countries](https://www.zachleat.com/web/speaking/) at events like Beyond Tellerrand, Smashing Conference, Jamstack Conf, CSSConf, and [The White House](https://www.zachleat.com/web/whitehouse/). Formerly part of Netlify, [Filament Group](https://www.filamentgroup.com/), [NEJS CONF](http://nejsconf.com/), and [NebraskaJS](http://nebraskajs.com).
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

<figure>
	{% image bioImageAttrs, largeImageOptions %}
	<figcaption>Picture taken by <a href="https://www.facebook.com/andrey.davydchyk">Andrey Davydchyk</a> at <a href="https://www.facebook.com/cssminskjs/">CSS Minsk JS</a>. <a href="/img/bio-2017.jpg">Download JPEG version</a>.</figcaption>
</figure>

<figure>
	{% image avatarBioImageAttrsSecondary %}
	<figcaption>Modified from above for avatar use.</figcaption>
</figure>

### Deprecated but saved for Posterity

<figure>
	{% image deprecatedBioImageAttrs %}
	<figcaption>Picture taken by <a href="https://twitter.com/marcthiele">Marc Thiele</a> at <a href="/web/smashingconf/2014/">SmashingConf Whistler</a>. Download the <a href="/img/bio.jpg">original version</a>.</figcaption>
</figure>

<figure>
	{% image veryDeprecatedBioImageAttrs %}
	<figcaption>Deprecated.</figcaption>
</figure>

<figure>
	{% image web367ImageAttrs %}
	<figcaption>This web site was started in 2007 and was originally titled <strong>Web 3.0, 6 Bladed Razors, and 7 Minute Abs</strong>.</figcaption>
</figure>

<svg display="none" aria-hidden="true">
	<defs>
		<g id="icon-twitter"><path fill="#00c9ff" d="M 32,6.076c-1.177,0.522-2.443,0.875-3.771,1.034c 1.355-0.813, 2.396-2.099, 2.887-3.632 c-1.269,0.752-2.674,1.299-4.169,1.593c-1.198-1.276-2.904-2.073-4.792-2.073c-3.626,0-6.565,2.939-6.565,6.565 c0,0.515, 0.058,1.016, 0.17,1.496c-5.456-0.274-10.294-2.888-13.532-6.86c-0.565,0.97-0.889,2.097-0.889,3.301 c0,2.278, 1.159,4.287, 2.921,5.465c-1.076-0.034-2.088-0.329-2.974-0.821c-0.001,0.027-0.001,0.055-0.001,0.083 c0,3.181, 2.263,5.834, 5.266,6.438c-0.551,0.15-1.131,0.23-1.73,0.23c-0.423,0-0.834-0.041-1.235-0.118 c 0.836,2.608, 3.26,4.506, 6.133,4.559c-2.247,1.761-5.078,2.81-8.154,2.81c-0.53,0-1.052-0.031-1.566-0.092 c 2.905,1.863, 6.356,2.95, 10.064,2.95c 12.076,0, 18.679-10.004, 18.679-18.68c0-0.285-0.006-0.568-0.019-0.849 C 30.007,8.548, 31.12,7.392, 32,6.076z"></path></g>
	</defs>
</svg>
