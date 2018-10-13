---
title: The Font Loading Checklist
permalink: /font-checklist/
tags:
  - font-loading
  - popular-posts
  - popular-posts-total
postRank: 1
postRankTotalViews: 13
---

<style>
.post-checklist {
  transform: scale(2.5) translate(2px, -1.5px);
  margin-right: 1.5em;
}
</style>

When I look back at the last four years that I’ve spent learning everything I could about web fonts and how web fonts load, I can distill it all down to a small checklist of ideals that I continue to chase. Our goal as web developers is to maximize the experience and raise user expectations to the level of what the web is capable of delivering, but also to manage our performance budgets to ensure that we are fulfilling the promise of the web—it’s ubiquity. This checklist should help you deliver on those two often competing ideals.

## The Font Loading Checklist

### <label><input type="checkbox" class="post-checklist" checked> 🚦 Start Important Font Downloads Earlier</label>

_(Start a Web Font load)_

Web fonts don’t start downloading until they’re found to be used in content, so it’s often late in the page load. We need to tell the browser to start downloading our high priority web fonts sooner.

* _Strategy:_ Use [`preload`](/web/comprehensive-webfonts/#preload)

### <label><input type="checkbox" class="post-checklist" checked> 🏎 Prioritize Readable Text</label>

_(Behavior while a Web Font is loading)_

This means absolutely **no invisible text**. This is known as the [flash of invisible text, or FOIT](/web/webfont-glossary/#foit). We can use [flash of unstyled text (FOUT)](/web/webfont-glossary/#fout) strategies to prioritize system fonts during web font load.

* _Strategy:_ Use [`font-display`](/web/comprehensive-webfonts/#font-display)
* _Strategy:_ Use the [CSS Font Loading API](/web/comprehensive-webfonts/#fout-class)

### <label><input type="checkbox" class="post-checklist" checked> 🐢🐇 Make Font Files Smaller</label>

_(Reduce Web Font load time)_

Guess what: Smaller file downloads finish sooner.

* _Strategy:_ Use `WOFF2` formats (compression built in)
* _Strategy:_ Subset your fonts, if language and licensing requirements allow.

Check out [Glyphhanger](/web/glyphhanger/) to help with both of these strategies.

### <label><input type="checkbox" class="post-checklist" checked> 🏁 Reduce Movement during Page Load</label>

_(Behavior after a Web Font has loaded)_

Each independent `@font-face` block has its own loading life-cycle. Its own FOIT, its own FOUT, its own repaint and reflow. When using two or more web fonts for a single family, its important to group the repaints together to reduce reflow of text on your page.

* _Strategy:_ Use the [CSS Font Loading API](/web/comprehensive-webfonts/#fout-class) to group your repaints.
* _Strategy:_ Use [Variable fonts](https://medium.com/variable-fonts/https-medium-com-tiro-introducing-opentype-variable-fonts-12ba6cd2369) (Browser support at [Can I Use: Variable Fonts](https://caniuse.com/#feat=variable-fonts))
