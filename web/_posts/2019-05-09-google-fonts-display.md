---
title: "Google Fonts is Adding font-display \U0001F389"
tags:
  - font-loading
  - popular-posts
  - popular-posts-total
postRank: 2
postRankTotalViews: 5
---
<p class="sub"><em>May 15, 2019 renamed URL parameter to <code>display</code>. Thank you <a href="https://mathiasbynens.be/">Mathias</a>!</em></p>
<p class="sub"><em>May 22, 2019 added note about <code>display=swap</code> in the default code embed.</em></p>

At Google I/O this week, [Anna Migas](https://twitter.com/szynszyliszys) shared a photo of an [Addy Osmani](https://addyosmani.com/) and [Katie Hempenius](https://katiehempenius.com/) session that dropped a font loading bombshell on the world.

<blockquote><p lang="en" dir="ltr">You will not have to self-host Google Fonts any more to get font-display: swap; 🙌 <a href="https://twitter.com/hashtag/io19?src=hash&amp;ref_src=twsrc%5Etfw">#io19</a> <a href="https://t.co/SldOuoNInF">pic.twitter.com/SldOuoNInF</a></p>&mdash; Anna Migas @ Google I/O (@szynszyliszys) <a href="?ref_src=twsrc%5Etfw">May 8, 2019</a></blockquote>

Google Fonts <del>is adding</del> added support for `font-display`! 🎉🎉🎉🎉

_**Update My 15, 2019:** although the I/O preview used the `font-display` URL parameter, [the final implementation uses `display` instead](https://twitter.com/addyosmani/status/1128548064287952896)_

```html
<link href="https://fonts.googleapis.com/css?family=Lobster&display=swap" rel="stylesheet">
```

_**Update May 22, 2019**: [Houssein Djirdeh](https://twitter.com/hdjirdeh/status/1130895027712995329) also noticed that `display=swap` is now used by default when you copy and paste code from the Google Fonts site. This is a really big deal for visible text. Full credit to the Google Fonts team for this._

<p class="livedemo top" data-demo-label="Learn more">Want to learn more about <code>font-display</code>? Check out this <a href="https://font-display.glitch.me/"><code>font-display</code> Playground demo on Glitch</a> from Monica Dinculescu.</p>

This is big news—it means developers now have more control over Google Fonts web font loading behavior. We can enforce instant rendering of fallback text (when using `font-display: swap`) rather than relying on the browser default behavior of invisible text for up to 3 seconds while the web font request is in-flight.

It’s also a bit of trailblazing, too. To my knowledge, this is the first web font host that’s shipping support for this very important `font-display` feature. Yeah, the [GitHub issue asking for this](https://github.com/google/fonts/issues/358) was filed in August of 2016 (just short of three years ago), but Google Fonts is still ahead of the competition here.

## Timeline

<table>
    <thead>
        <tr>
            <th>Date</th>
            <th class="nowrap">Behavior</th>
            <th>Vendor</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="nowrap">2017 <span class="hide-sm"><abbr title="July">Jul</abbr> 24</span></td>
            <td class="yes"><strong>font-display</strong> Supported</td>
            <td>Chrome (v60) was first to implement.</td>
        </tr>
        <tr>
            <td class="nowrap">2017 <span class="hide-sm"><abbr title="August">Aug</abbr> 8</span></td>
            <td class="yes"><strong>font-display</strong> Supported</td>
            <td>Opera (v47) was second to add support.</td>
        </tr>
        <tr>
            <td class="nowrap">2018 <span class="hide-sm"><abbr title="January">Jan</abbr> 22</span></td>
            <td class="yes"><strong>font-display</strong> Supported</td>
            <td>Firefox (v58)</td>
        </tr>
        <tr>
            <td class="nowrap">2018 <span class="hide-sm"><abbr title="March">Mar</abbr> 28</span></td>
            <td class="yes"><strong>font-display</strong> Supported</td>
            <td>Safari (v11.1)</td>
        </tr>
        <tr>
            <td class="nowrap">2018 <span class="hide-sm"><abbr title="December">Dec</abbr> 29</span></td>
            <td class="yes"><strong>font-display</strong> Supported</td>
            <td>Samsung Internet (v8.2)</td>
        </tr>
        <tr>
            <td class="nowrap"><br>2019 <span class="hide-sm"><abbr title="May">May</abbr> 15</span></td>
            <td class="yes"><strong>font-display</strong> Supported</td>
            <td>Google Fonts</td>
        </tr>
        <tr>
            <td class="nowrap"><em>Not yet</em></td>
            <td class="no"><strong>font-display</strong> Not supported</td>
            <td>Adobe Fonts</td>
        </tr>
        <tr>
            <td class="nowrap"><em>Not yet</em></td>
            <td class="no"><strong>font-display</strong> Not supported</td>
            <td>Typography.com (by Hoefler&Co)</td>
        </tr>
        <tr>
            <td class="nowrap"><em>Not yet</em></td>
            <td class="no"><strong>font-display</strong> Not supported</td>
            <td>fonts.com (by Monotype)</td>
        </tr>
    </tbody>
</table>

<sub>(Monotype tip via <a href="https://twitter.com/thomasdeinhamer/status/1127213122517962753">@thomasdeinhamer</a>)</sub>

Want a [full history of FOIT and FOUT](/web/fout-foit-history/)?

## Related

* [Video of the announcement at Google I/O](https://www.youtube.com/watch?v=YJGCZCaIZkQ&t=31m20s)

## Future wishlist

[Stable font file URL in Google Fonts](https://github.com/google/fonts/issues/1067) so that we can embed the CSS in our sites directly. This would alleviate the two-hop penalty you’re paying to use these fonts (one render-blocking hop for the CSS and another to fetch the font files). Not only would this be fewer hops, but then you could use it with `preload` too, which would be incredible. 

> Font URLs are cached for a year and CSS URLs are cached for only a day—[@googlefonts](https://twitter.com/googlefonts/status/862870935975714816)

This `font-display` change is great and means that things are improving! But self hosting will continue to be my preferred method for these typefaces until this issue is resolved.
