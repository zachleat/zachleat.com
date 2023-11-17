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

This web blog is written by **Zach Leatherman**. [Send him an email](mailto:zach@zachleat.com). Peruse his [full résumé](/resume/).

{% include "social.html" %}

<style>
.about-primary-avatar {
	display: block;
	max-width: 260px;
	border-radius: 50%;
	margin: 2em auto 0;
}
.about-secondary-avatar {
	display: block;
	max-width: 260px;
	margin: 0;
}
</style>

{% image avatarBioImageAttrs %}

## Bio

{% comment %}
> On the web there’s often more than one way solve a problem. It isn't sufficient to simply find a solution, you must discover the solution that balances the goals of accessibility, device independence, performance, usability, aesthetics, and future compatibility.

winners of the <a href="https://www.filamentgroup.com/lab/agency-of-year.html">Net Awards Agency of the Year</a> a Google open source award
{% endcomment %}

{% include "bio-text-medium.html" %}

### Alternate Formats

Here to fetch my bio? Let’s appeal to your base instinct to copy and paste:

<div class="fullwidth livedemo top left square-bottom" data-demo-label="Plaintext">

``` text
Zach is a builder for the web at CloudCannon. He created Eleventy (11ty), an award-winning open source site generator. At one point he became entirely too fixated on web fonts. He has given {{ collections.all | getSpeakingCount: "type" }} talks in {{ collections.all | getSpeakingUniqueCount: "country" | numberString }} different countries at events like Jamstack Conf, Beyond Tellerrand, Smashing Conference, CSSConf, and The White House. Formerly part of Netlify, Filament Group, NEJS CONF, and NebraskaJS.
```

</div>

<div class="fullwidth livedemo top left square-bottom" data-demo-label="HTML">

``` html
Zach is a builder for the web at <a href="https://cloudcannon.com/">CloudCannon</a>. He created <a href="https://www.11ty.dev">Eleventy (11ty)</a>, an award-winning open source site generator. At one point he became entirely <a href="https://www.zachleat.com/web/fonts/"><em>too fixated</em> on web fonts</a>. He has given <a href="https://www.zachleat.com/web/speaking/">{{ collections.all | getSpeakingCount: "type" }} talks in {{ collections.all | getSpeakingUniqueCount: "country" | numberString }} different countries</a> at events like Jamstack Conf, Beyond Tellerrand, Smashing Conference, CSSConf, and <a href="https://www.zachleat.com/web/whitehouse/">The White House</a>. Formerly part of Netlify, <a href="https://www.filamentgroup.com/">Filament Group</a>, <a href="http://nejsconf.com/">NEJS CONF</a>, and <a href="http://nebraskajs.com">NebraskaJS</a>.
```

</div>

<div class="fullwidth livedemo top left square-bottom" data-demo-label="Markdown">

``` markdown
Zach is a builder for the web at [CloudCannon](https://cloudcannon.com/). He created [Eleventy (11ty)](https://www.11ty.dev), an award-winning open source site generator. At one point he became entirely [_too fixated_ on web fonts](https://www.zachleat.com/web/fonts/). He has given [{{ collections.all | getSpeakingCount: "type" }} talks in {{ collections.all | getSpeakingUniqueCount: "country" | numberString }} different countries](https://www.zachleat.com/web/speaking/) at events like Jamstack Conf, Beyond Tellerrand, Smashing Conference, CSSConf, and [The White House](https://www.zachleat.com/web/whitehouse/). Formerly part of Netlify, [Filament Group](https://www.filamentgroup.com/), [NEJS CONF](http://nejsconf.com/), and [NebraskaJS](http://nebraskajs.com).
```

</div>

## Pictures

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
