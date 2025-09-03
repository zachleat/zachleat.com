---
title: Compatibility Tables Compendium
tweet: https://twitter.com/zachleat/status/578647641279610880
---

When it comes to web development, nothing beats a good compatibility table (especially not a listicle about compatibility tables). They help you make important decisions about new web feature production readiness, inform our best practices, and help us troubleshoot peculiar issues in fringe browsers. To that end, I’ve collected a list of useful compatibility tables that I thought were worth sharing.

## [Can I use](http://caniuse.com/)
<span class="tag">JavaScript</span> <span class="tag">CSS</span> <span class="tag">HTML</span> <span class="tag">SVG</span> *—[Alexis Deveria](http://a.deveria.com/)*

These are the best. Everyone knows about these for a reason. They’re the most useful, most updated, most comprehensive compatibility tables. They have made development decisions easier and I can easily declare them one of the best resources on the web.

## [Mozilla Developer Network](https://developer.mozilla.org/)

If you’re looking for a specific web feature, a JavaScript API, or even a CSS property, chances are that the MDN documentation has a support table at the bottom. Just include MDN in your search engine query to easily find the community sourced documentation.

## [Browserscope](http://www.browserscope.org)
<span class="tag">Networking</span> <span class="tag">Performance</span> *—[Steve Souders](http://stevesouders.com/) and [Lindsey Simon](https://twitter.com/elsigh)*

A huge number of tests, most notably the [Network](http://www.browserscope.org/?category=network&v=1) tab. You can learn a lot just by reading the tooltips on the table headers there.

The JSKB tab includes compatibility tables for addEventListener (DOM2 Events), getComputedStyle (basically, not on IE &lt;=8).

## [ECMAScript Compatibility](http://kangax.github.io/compat-table/)

<span class="tag">JavaScript</span> *—[Kangax](http://perfectionkills.com/)*

**The** resource for ES5, ES6, and ES7 compatibility with exhaustive browser support, even including support tables for PhantomJS and Rhino. A really beautiful, encyclopedic, unbeatable reference.

## [CSS3 Please](http://css3please.com/)

<span class="tag">CSS</span> *—[Paul Irish](http://paulirish.com), [Jonathan Neal](http://twitter.com/jon_neal)*

The inline comments on each property are a great compatibility table for CSS vendor prefixes.

* See Also: [Should I Prefix?](http://shouldiprefix.com/) *—[David Hund](http://valuedstandards.com/)*
* See Also: [Autoprefixer](https://github.com/postcss/autoprefixer) *—[Andrey Sitnik](http://sitnik.ru/en)*

## [The State of Web Type](http://stateofwebtype.com/)

<span class="tag">Typography</span> *—[Bram Stein](http://www.bramstein.com/)*

Has some overlap with *Can I Use* on font formats and CSS properties, The State of Web Type really shines for its tables on OpenType Features, specifically the many different options available to `font-feature-settings`.

## [Font Family Reunion](https://fontfamily.zachleat.dev)

<span class="tag">CSS</span> *—[Zach Leatherman](http://zachleat.com/)*

You might recognize this one (I feel a little bit of shame for including it but only enough not to call it a shameless plug). It shows the default fonts available for use in CSS `font-family` across browsers and operating systems.

## [Unify](http://unicode.johnholtripley.co.uk/) for Unicode Characters

<span class="tag">Unicode</span> <span class="tag">Accessibility</span> *—[John Holt Ripley](http://cv.johnholtripley.co.uk/)*

Shows which Unicode characters are safe to use across an amazing number of mobile devices. Also a great compatibility table of how screen readers will read each character.

## [Mobile HTML5](http://mobilehtml5.org/)

<span class="tag">JavaScript</span> <span class="tag">CSS</span> <span class="tag">HTML</span> <span class="tag">SVG</span> *—[Maximiliano Firtman](http://firt.mobi/)*

Some overlap with Can I Use here but importantly does include some fringe mobile browsers like Amazon Silk, BlackBerry 5 and 6 (as well as separate entries for tablets), and the Nokia Browser.

## [Web Browser Compatibility](http://webbrowsercompatibility.com/)
<span class="tag">JavaScript</span> <span class="tag">CSS</span> *—[Cody Lindley](http://codylindley.com/)*

Very specific reports on JavaScript APIs, down to individual method support. Also includes [CSS properties](http://webbrowsercompatibility.com/css-properties/desktop/). A great, comprehensive resource.

## [Screen reader support for hidden content](http://www.html5accessibility.com/tests/hidden2013.html)

<span class="tag">Accessibility</span> *—[Steven Faulkner and the Paciello Group](http://www.paciellogroup.com/)*

A really great look into the different methods for hiding content from screen readers, with tests to show screen reader support for each. Think HTML5 `hidden`, `aria-hidden`, CSS `display: none`, and other hiding techniques.

* *Related: [A11Y Project: How to Hide Content](http://a11yproject.com/posts/how-to-hide-content/)*

## [`<input type="file">` on Mobile](http://viljamis.com/blog/2012/file-upload-support-on-mobile/)

<span class="tag">HTML</span> *—[Viljami Salminen](http://viljamis.com/)*

(Originally from 2012 but it looks like it’s still being updated)

## [Image Download with Media Queries](http://timkadlec.com/2012/04/media-query-asset-downloading-results/)

<span class="tag">CSS</span> <span class="tag">Networking</span> <span class="tag">Performance</span> *—[Tim Kadlec](http://timkadlec.com)*

Shows CSS `background-image` code using different media query configurations and which browsers will download non-applicable images.

## [`<link rel="stylesheet" media>` CSS Download](https://scottjehl.github.io/CSS-Download-Tests/)

<span class="tag">CSS</span> <span class="tag">Networking</span> <span class="tag">Performance</span> *—[Scott Jehl](http://scottjehl.com/)*

Most browsers download all stylesheets immediately, even if their media attribute does not currently apply (think `print` or `nonsense`).

## [Browser Hacks](http://browserhacks.com/)

<span class="tag">CSS</span> <span class="tag">JavaScript</span> *—[Hugo Giraudel](http://hugogiraudel.com/), [Tim Pietrusky](http://timpietrusky.com/), [Fabrice Weinberg](https://twitter.com/fweinb)*

A lot of things can be feature tested. Some things can’t. Before you reach for the User Agent string, why not try a weak inference instead?

## [QuirksMode](http://www.quirksmode.org/compatibility.html)
<span class="tag">JavaScript</span> <span class="tag">CSS</span> *—[Peter-Paul Koch](http://www.quirksmode.org/about/)*

QuirksMode will always have a special place on this list because PPK popularized the browser compatibility table. His investment into the tables on his site have helped countless people over the years and will likely continue to do so.

## [CSS Values](http://cssvalues.com/)
<span class="tag">CSS</span> *—[Louis Lazaris](http://www.impressivewebs.com/)*

A great search interface for quick reference to CSS properties and browser support.

## [JavaScript Compatibility Checker](http://jscc.info/)
<span class="tag">JavaScript</span> *—[Thijs Busser](http://tbusser.net/)*

A really impressive tool that will check JavaScript code for API use and show you your browser support matrix for that code!

## [CSS in Email Clients](https://www.campaignmonitor.com/css/)
<span class="tag">CSS</span> *—[Campaign Monitor](https://www.campaignmonitor.com/)*

[Chris Coyier was nice enough to share this one](https://twitter.com/Real_CSS_Tricks/status/579390963904204800). Campaign Monitor helps you write email using the CSS features that are available on different email clients.

## Features Coming Soon

New features currently being discussed or developed. Great to see what’s coming down the pipe.

* [Google Chrome Status](https://www.chromestatus.com/features)
* [Firefox Platform Status](https://platform-status.mozilla.org/)
* ~~[Modern.IE Internet Explorer Status](https://status.modern.ie/)~~ [Microsoft Edge Platform Status](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/)

## Honorable Mentions

These are not exactly compatiblilty tables (but I would consider them to be similar and very useful resources):

* [HTML5 Please](http://html5please.com/) *by [Multiple authors](https://github.com/h5bp/html5please/graphs/contributors)*
* [Game Console Browsers](http://console.maban.co.uk/) *by [Anna Debenham](http://maban.co.uk/)*
* [CSS Triggers](http://csstriggers.com/) *by [Paul Lewis](http://aerotwist.com/)*
* [The Web Platform Specification List](https://platform.html5.org/)
* [HTTP Archive Interesting Stats](http://httparchive.org/interesting.php)

## Additions

I’m sure I’ve missed some—if you have another please send me a tweet or leave me a comment!
