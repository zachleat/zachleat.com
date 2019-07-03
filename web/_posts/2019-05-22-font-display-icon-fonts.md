---
title: font-display is Incompatible with Icon Fonts
tags:
  - font-loading
  - popular-posts
postRank: 7
---

There are myriad problems with icon fonts. I won’t rehash those again here but I did a section on this specific topic in [The Scoville Scale of Web Font Loading Opinions](/web/scoville-scale/). A bunch of people have written about this before:

* [Delivering Octicons with SVG](https://github.blog/2016-02-22-delivering-octicons-with-svg/) on the GitHub Blog.
* [Seriously, Don’t Use Icon Fonts](https://cloudfour.com/thinks/seriously-dont-use-icon-fonts/) by Tyler Sticka for the Cloud Four blog.
* [Death to Icon Fonts](https://speakerdeck.com/ninjanails/death-to-icon-fonts), a talk by [Seren Davies](http://www.serendavies.me/)
* [Making the Switch Away from Icon Fonts to SVG: Converting Font Icons to SVG](https://www.sarasoueidan.com/blog/icon-fonts-to-svg/) by Sara Soueidan
* [Inline SVG vs. Icon Fonts](https://css-tricks.com/icon-fonts-vs-svg/) by Chris Coyier on CSS Tricks
* Have another? [Pass it along!](https://twitter.com/intent/tweet?screen_name=zachleat)

The main point that I think hasn’t really been communicated enough is that icon fonts exist in a place that would seem to be outside of the web standards mainstream. Specifically, the font loading poster child—the `font-display` descriptor—has no valid value that is compatible with icon fonts.

When you load an icon font, you often never want the fallback text to render. It isn’t a typical [Flash of Unstyled Text (FOUT)](/web/webfont-glossary/#fout) scenario. If the fallback text for an icon font renders, who knows what you might see.

If the icon font uses glyphs mapped to the Private Use Area, you [may see emoji characters](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html#responsible-fallbacks) (this is a common failure scenario).

<img src="/web/img/posts/font-display-icon-fonts/ios-pua.png" alt="Screenshot of the Private Use Area (with emoji) on iOS">

If the icon font uses ligatures, you could [see the ligature text](https://twitter.com/ckollars/status/1026824074696249346) (which is better, but often also not handled very well).

<a href="https://twitter.com/ckollars/status/1026824074696249346"><img src="/web/img/posts/font-display-icon-fonts/google-news.jpg" alt="Screenshot of the Ligature icon fallback of Google News (showing overlapping text with content)"></a>

Some browsers (Firefox) show a TOFU character as fallback.

<img src="/web/img/posts/font-display-icon-fonts/twitter.jpg" alt="Twitter Icon Font Fallback Screenshot">

An astute web font loading reader might reach for the easiest tool in the toolbox to solve font loading issues: the `font-display` descriptor. However there are no good values for `font-display` that will offer invisible text. In fact, a few of the values will be quite bad.

* Using `font-display: optional` on your icon font means that it will only render on repeat views and renders fallback text on empty cache views: Very Bad 🚫
* Using `font-display: swap` on your icon font means that it will render fallback text immediately while waiting for the web font to finish loading: Bad 🚫
* Using `font-display: fallback` will only render the icon font if it loads within a short (usually 3 second) time period: Not great 🚫
* Using `font-display: block` is the default behavior and will use invisible text for up to 3 seconds and show fallback text until the web font load completes: The best option but still not good 🚫

To workaround these issues, you _could_ use the CSS Font Loading API to force invisible text until the icon font has successfully loaded. Or, perhaps more in line with the web standards mainstream, you could make a better investment and convert your icons to use SVG instead.
