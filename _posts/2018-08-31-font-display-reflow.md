---
title: The Problem with font-display and Reflow
tags:
  - font-loading
---

<style>
.post-img {
  margin: 0 auto;
  display: block;
}
.highlight-fallback {
    background-color: #902f2f;
    color: #fff;
}
/*.highlight {
    background-color: #45844b;
    color: #fff;
}*/
</style>

_Prerequisite:_ Before we continue on, please take a second to make sure you’ve reviewed [The Web Font Loading Checklist](/web/font-checklist/), a short list of criteria I use to properly evaluate web font loading strategies. In the _Reduce Movement during Page Load_ section, our goal is to reduce the amount of movement the user sees while the page is being loaded.

I’m sure you’ve been browsing around the web, halfway through reading your favorite hot-take article about some React minutiae when a third party advertisement loads, changes the dimensions of its container, throws off your scroll position, and disrupts your reading experience! How frustrating. I am here to let you know, dear reader, that web font loads can have this same frustrating effect.

## font-display

I love `font-display`. It’s easy to use.

* It’s the go-to for [improving your web font loading quickly and easily](/web/23-minutes/).
* It hasn’t really been picked up by any third party font hosting services yet, but we can’t really blame `font-display` for that can we?
* `font-display` pairs great with preload (well, [mostly](/web/preload-font-display-optional/))
* It shines brightest if you’re only using one web font on your page.
* Some day I may write an article about how it was absolutely not designed for icon fonts (sorry—that day is not today).

If you’re using multiple web fonts for a single family—things may not operate as smoothly as we would like—especially if you’re trying to reduce movement during page load (see the last item on [the checklist](/web/font-checklist/)).

Consider this [`font-display: swap` demo from Web Font Loading Recipes](https://github.com/zachleat/web-font-loading-recipes#font-display-swap) ([Demo](https://www.zachleat.com/web-fonts/demos/font-display.html)):

<img src="/web/img/posts/font-display-reflow/waterfall.png" alt="font-display: swap Screenshot of Devtools Network Tab, 1 HTML request and 4 Web Font requests loading in parallel">

A pretty standard controlled waterfall experiment, network throttled to Fast 3G in Chrome Devtools. The browser finds four web fonts of almost identical size using `font-display: swap` and downloads them in parallel.

<img src="/web/img/posts/font-display-reflow/render-1.png" alt="A screenshot of First render at 846ms" class="post-img">

<div class="livedemo livedemo-mixed sizeme" data-demo-label="DEMO: 846ms Serif Fallback">
    <p class="font-fallback"><span class="highlight-fallback">This is a paragraph.</span> <strong class="highlight-fallback">This is heavier text.</strong> <em class="highlight-fallback">This is emphasized text.</em> <strong class="highlight-fallback"><em>This is heavier and emphasized text.</em></strong></p>
</div>

At 846ms into our page load the HTML has rendered and we have some real nice fallback FOUT rendering here. The text is readable, hooray! But if you look at the above waterfall carefully and analyze the related filmstrip, you may notice that each web font has downloaded and repainted independently (3 repaints for 4 font files).

<img src="/web/img/posts/font-display-reflow/render-2.png" alt="A screenshot of render at 1.90s" class="post-img">

<div class="livedemo livedemo-mixed sizeme" data-demo-label="DEMO: 1.9s Italic">
    <p class="font-fallback"><span class="highlight-fallback">This is a paragraph.</span> <strong class="highlight-fallback">This is heavier text.</strong> <em class="font-latoitalic highlight">This is emphasized text.</em> <strong class="highlight-fallback"><em>This is heavier and emphasized text.</em></strong></p>
</div>

At 1.90s the italic web font has loaded and repainted.

<img src="/web/img/posts/font-display-reflow/render-3.png" alt="A screenshot of render at 1.91s" class="post-img">

<div class="livedemo livedemo-mixed sizeme" data-demo-label="DEMO: 1.91s Bold Italic">
    <p class="font-fallback"><span class="highlight-fallback">This is a paragraph.</span> <strong class="highlight-fallback">This is heavier text.</strong> <em class="font-latoitalic">This is emphasized text.</em> <strong><em class="font-latobolditalic highlight">This is heavier and emphasized text.</em></strong></p>
</div>

At 1.91s the bold italic variant has loaded and repainted.

<img src="/web/img/posts/font-display-reflow/render-4.png" alt="A screenshot of render at 1.95s" class="post-img">

<div class="livedemo livedemo-mixed sizeme" data-demo-label="DEMO: 1.95s Roman & Bold">
    <p class="font-lato"><span class="highlight">This is a paragraph. </span><strong class="font-latobold highlight">This is heavier text.</strong> <em class="font-latoitalic">This is emphasized text.</em> <strong><em class="font-latobolditalic">This is heavier and emphasized text.</em></strong></p>
</div>

Finally, at 1.95s both the roman and bold variants have loaded and repainted to finish the remainder of the external resources.

What does this mean? Each web font has its own loading lifecycle and may have its own repaint (it the requests don’t finish close enough together for the browser to bundle them) and reflow. For each individual web font, you could have up to four independent moments (this demo had three repaints for four web fonts) in your page load where the text dimensions change to render using a web font. These repaints could occur at wildly different times if the font files are of differing size and/or if the load takes place outside of the controlled network throttled environment of Chrome Devtools.

## Make the reflows go away

1. The easiest way to fix this is to _use `font-display: optional`_. This will use the fallback font on first render and only grab web fonts stored in the cache. In theory this means that your web fonts will only be used if they are available in the first 100ms, greatly reducing the impact from reflow or eliminating it altogether. Unfortunately this means no web fonts on empty cache views.
1. Another way to fix this is to _use a Variable Font_! Variable fonts, while increasing in popularity, are still somewhat of a rarity. They are also bigger than their non-variable counterparts but due to their single-file nature your repaints will be grouped for free. Even better: use variable fonts with `font-display: swap` for FOUT _and_ a single grouped repaint. One more nuanced drawback to variable fonts is that the extra file size weight is loaded serially, and not in parallel as the waterfall screenshot of non-variable web fonts above depicted.
1. Another, more complex solution that will offer web fonts on an empty cache is to _use the CSS Font Loading API_. Use the [FOUT with a Class](/web/comprehensive-webfonts/#fout-class) approach to group web font renders for a single family into a single repaint. For extra points, go even further and use a font-synthesis FOFT approach to all-but-eliminate noticeable reflow from your page **(even on empty cache views)**. Try _[The Compromise](/web/the-compromise/)_!
1. One way to minimize the problem is to try to match the metrics (dimensions) of your fallback text as closely as possible to your web font. Check out the [Font Style Matcher, created by Monica Dinculescu](https://meowni.ca/font-style-matcher/), to help you with this. Note that this method requires JavaScript and wouldn’t work with just `font-display` alone.
1. In this same vein, there are [Metric compatible fonts](https://wiki.archlinux.org/index.php/Metric-compatible_fonts), designed to match another font’s dimensions perfectly. It’s unlikely that the web font you’ve chosen has a metric compatible system font available for use—they’re quite rare—but they do exist! Using a Metric compatible font would not require JavaScript and _would_ work with `font-display` alone.

Go forth and web font, y’all!

## Related

{% include "highlighted-fonts-articles.md" %}

<script>
if( "fonts" in document ) {
    function measureSizeMe() {
        document.querySelectorAll(".sizeme").forEach(el => {
            let p = el.firstElementChild;
            let original = el.getAttribute("data-original-demo-label");
            if( !original) {
                original = el.getAttribute("data-demo-label");
                el.setAttribute("data-original-demo-label", original);
            }
            el.setAttribute("data-demo-label", `${original}, Height ${p.offsetHeight}px`);
        });
    }
    document.fonts.ready.then(measureSizeMe);
    window.addEventListener("resize", measureSizeMe);
}
</script>
