---
title: The Problem with font-display and Reflow
permalink: /font-display-reflow/
tags:
  - font-loading
---

<style>
.post-checklist {
  transform: scale(2.5) translate(2px, -1.5px);
  margin-right: 1.5em;
}
</style>

When I look back at the last four years that I’ve spent learning everything I could about web fonts and how web fonts load, I can distill it all down to a small checklist of ideals that I continue to chase. Our goal as web developers is to maximize the experience and raise user expectations to the level of what the web is capable of delivering, but also to manage our performance budgets to ensure that we are fulfilling the promise of the web—it’s ubiquity.

## Font Loading Checklist

### <label><input type="checkbox" class="post-checklist" checked> 🚦 Start Important Font Downloads Earlier</label>

_Start a Web Font load._

Web fonts don’t start downloading until they’re found to be used in content, so it’s often late in the page load. We need to tell the browser to start downloading our high priority web fonts sooner.

* _Strategy:_ Use [`preload`](/web/comprehensive-webfonts/#preload)

### <label><input type="checkbox" class="post-checklist" checked> 🏎 Prioritize Readable Text</label>

_Behavior while a Web Font is loading._

This means absolutely **no invisible text**. This is known as the [flash of invisible text, or FOIT](/web/webfont-glossary/#foit). We can use [flash of unstyled text (FOUT)](/web/webfont-glossary/#fout) strategies to prioritize system fonts during web font load.

* _Strategy:_ Use [`font-display`](/web/comprehensive-webfonts/#font-display)
* _Strategy:_ Use the [CSS Font Loading API](/web/comprehensive-webfonts/#fout-class)

### <label><input type="checkbox" class="post-checklist" checked> 🐢🐇 Make Fonts Smaller</label>

_Reduce Web Font load time._

Guess what: Smaller file downloads finish sooner.

* _Strategy:_ Use `WOFF2` formats (compression built in)
* _Strategy:_ Subset your fonts, if language and licensing requirements allow.

Check out [Glyphhanger](/web/glyphhanger/) to help with both of these strategies.

### <label><input type="checkbox" class="post-checklist" checked> 🏁 Reduce Movement during Page Load</label>

_Behavior after a Web Font has loaded._

## Interplay

Some of these checklist items play against each other! I’ve seen render filmstrips where the font was small enough (#3) and download started early enough (#1) that the web font finished loading before first render! So invisible text (#2) and page movement (#4) are obviously less of a problem. This isn’t usually the case, however. Especially if you’re using more than one web font or perhaps have multi-language content requirements.

That’s the second dimension of font loading advice—strategies and approaches change based on your web font profile: the number of web fonts you’re using and how the families group together. If I use a single web font, the strategy will be much different than if I used four web fonts in a single family or 12 web fonts spread across 3 families 😱.