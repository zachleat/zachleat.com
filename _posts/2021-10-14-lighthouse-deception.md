---
title: 'The Art of Deception, Lighthouse Score Edition'
seo:
  openGraphBackgroundImage: /og/sources/lighthouse.jpg
  openGraphAlt: "A white lighthouse sits next to a darkened ocean. Dark clouds in the background. A few smaller waves crash."
  openGraphSkipPageBackground: true
posterImage:
  showOnPage: true
---
A few very interesting discussions on Twitter have led me to understand that some folks are talking about Lighthouse scores in a way that is—in my opinion—not as _forthright_ as it could be (intentionally or not). Let’s level set a bit and talk a bit about the different flavors of <em>wiggle room</em>:

## Super Fast Hardware

Here’s a screenshot of a Lighthouse result from this morning, October 14th, 2021, run on an old MacBook Air (2012) using Chrome 86.

<img src="/web/img/posts/lighthouse/nextjs-mobile-old-hardware.png" alt="nextjs.org Lighthouse Score for Mobile on Old Hardware: 64 on Performance, 97 on Accessibility, 100 on Best Practices, 100 on SEO" class="primary">

Here’s the same result on my MacBook Air (M1, 2020) using Chrome 94:

<img src="/web/img/posts/lighthouse/nextjs-mobile-new-hardware.png" alt="nextjs.org Lighthouse Score for Mobile: 94 on Performance, 89 on Accessibility, 93 on Best Practices, 100 on SEO" class="primary">

It’s incredible to me the variability effect that your hardware can have: from a 64 on Performance to a 94—that’s a thirty point swing!

<div class="livedemo livedemo-evil">
  <strong>Don’t Do This™ Evil Tip:</strong> When running Lighthouse, only use the best, beefiest, latest and greatest, most expensive hardware and network connections.
</div>


As additional context, [I built a project called Speedlify](https://www.zachleat.com/web/speedlify/), which is a self-hosted dashboard for performance monitoring and comparison. We use it on the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/).

Speedlify has two common modes of operation: on a hosted CI/CD server or in DIY mode on your local machine. These two methods often provide different Performance scores! Running on a hosted server is typically more resource constrained and is more challenging to score well in Lighthouse’s Performance category.

For disclosure purposes, the Eleventy Leaderboards run in DIY mode primarily because the scale of the number of sites tested goes well beyond the build-time limit of the build server—but that does also mean that the scores are likely higher than if we were to able to run the project in hosted mode.

## Normal Statistical Variability

Network conditions can vary. Maybe your computer was doing a resource intensive task while you were completing your test. Here are two additional runs of the same site on my MacBook Air (M1, 2020) using Chrome 94. It’s notable that these results offer a slightly higher performance score compared to the first run above.

<div class="flex flex-nowrap">
  <div><img src="/web/img/posts/lighthouse/nextjs-mobile-variability.png" alt="nextjs.org Lighthouse Score for Mobile: 99 on Performance, 89 on Accessibility, 93 on Best Practices, 100 on SEO"></div>
  <div><img src="/web/img/posts/lighthouse/nextjs-mobile-variability-2.png" alt="nextjs.org Lighthouse Score for Mobile: 100 on Performance, 89 on Accessibility, 93 on Best Practices, 100 on SEO"></div>
</div>

<div class="livedemo livedemo-evil">
  <strong>Don’t Do This™ Evil Tip:</strong> When running Lighthouse, run it a bunch of times and pick the highest score.
</div>

In Speedlify, we attempt to smooth out this issue by running each test multiple times (by default 3) and selecting the median run [using an algorithm from Lighthouse](https://github.com/zachleat/performance-leaderboard/blob/21aaeab55cc8e861a0d73ef12bf43df4ada8230c/lib/lh-median-run.js#L34) based on First Contentful Paint, Time to Interactive, and Largest Contentful Paint.

_[Speedlify improvements sparked by a discussion on Twitter with Patrick Hulce](https://twitter.com/zachleat/status/1280348896166895617), who works on Lighthouse._

## Mobile versus Desktop

Mobile scores are more difficult to score a perfect 100, particularly in the performance category. As [Andy Davies states](https://twitter.com/AndyDavies/status/1286355283749539840), this is “by design as mobile uses a simulated slower network, and CPU.” Importantly, and as previously discussed, the performance conditions are relative to the hardware/software of the current machine.

When a user shares a screenshot of a perfect Four Hundo score, Lighthouse (as it stands) makes it impossible to visually distinguish whether or not that score was taken under the Mobile or Desktop mode.

For example, here’s two Lighthouse scores of the same site taken back-to-back on the same hardware. One is a mobile result and one is desktop (you can click through to see a broader view). Note that structurally the screenshots are the same.

<div class="flex flex-nowrap">
  <div>
    <a href="/web/img/posts/lighthouse/gatsbyjs-mobile.png"><img src="/web/img/posts/lighthouse/gatsbyjs-mobile-zoomed.png" alt="gatsbyjs.org Lighthouse Score for Mobile, Performance score of 90"></a>
  </div>
  <div>
    <a href="/web/img/posts/lighthouse/gatsbyjs-desktop.png"><img src="/web/img/posts/lighthouse/gatsbyjs-desktop-zoomed.png" alt="gatsbyjs.org Lighthouse Score for Desktop, Performance score of 100"></a>
  </div>
</div>

_MacBook Air (M1, 2020) using Chrome 94._

<div class="livedemo livedemo-evil">
  <strong>Don’t Do This™ Evil Tip:</strong> Always share your Desktop Score. Never reveal that it is a Desktop score—keep any discussion of the testing mode ambiguous.
</div>

There has been [some discussion](https://github.com/GoogleChrome/lighthouse/issues/9379) about [adding a visual indicator](https://github.com/GoogleChrome/lighthouse/issues/8178) to make the mode more obvious, which would help greatly!

_Some more [related  Patrick Hulce discussion on Twitter](https://twitter.com/zachleat/status/1286345175149826052)._

I feel as though I should also mention—in a perfect world—if a web benchmark were to start from scratch with a new Lighthouse, the slow hardware simulation, network throttling, viewport size testing should be built into a single mode. I’d love it if the next version of Lighthouse ran Mobile mode, then Desktop mode, and displayed both scores together or combined them somehow. Get rid of the separation and it would clear up a bunch of the confusion in a very clean way.

## Lab Data versus Field Data

This is perhaps the most nefarious distinction, because it is the most complex and as such offers the most effective kind of wiggle room: confusion.

Lab data is taken in a controlled environment. Field data is gathered from the recorded measurements of the performance of real visitors. Related: [Why lab and field data can be different (and what to do about it)](https://web.dev/lab-and-field-data-differences/).

Most of the methods we’ve talked about so far are only reporting lab data. But having field data is great, too! The caution I’d offer here is when someone focuses too closely on Field Data and never mentions Lab Data. But why? Isn’t it better to measure the real world? Why does it matter what happens in the lab?

Let us consult this [classic blog post from Chris Zacharias: Page Weight Matters](https://blog.chriszacharias.com/page-weight-matters), in which Chris discusses a case study on the YouTube web site in which they decreased the page weight and the measured field data results got worse!

> I had decreased the total page weight and number of requests to a tenth of what they were previously and somehow the numbers were showing that it was taking LONGER

> Correspondingly, entire populations of people simply could not use YouTube because it took too long to see anything.

> Large numbers of people who were previously unable to use YouTube before were suddenly able to.

If you have great field data: you _may_ exist in the same realm as pre-optimized YouTube! The point being is that takes a holistic view of both field data and lab data to make good performance decisions!

<div class="livedemo livedemo-evil">
  <strong>Don’t Do This™ Evil Tip:</strong> If you have a wealthy, first-world, limited San Francisco-heavy audience with good hardware, make sure you shout about your field data! Field data is the most important thing! Pay no attention to the mobile/throttled/average hardware Lab data hiding behind the curtain.
</div>

Another way to say it:

* If your field data is good and your lab data is bad, you may have built yourself a site for [the wealthy western web](https://www.smashingmagazine.com/2017/03/world-wide-web-not-wealthy-western-web-part-1/).
* If your field data is bad and your lab data is good (and assuming you aren’t doing any of the things we discussed to fudge your lab data scores), don’t fret! Your world wide web site may be reaching a global audience!
* If you have both good field data and good lab data then you are a unicorn—I applaud you and celebrate your success. I love that for you. Please share how you successfully banished your third-party JavaScript to the shadow realm.

## Conclusion

You might walk away from this article thinking: wow, Lighthouse scoring could be improved! I agree, but I also think that it’s been a net-win for performance discussions with other stakeholders in a professional setting. I genuinely hope they solve the Performance variability problem and add visual indicators to show you the mode in which a test ran (Desktop or Mobile).

But mostly, this is a plea to y’all: please don’t game your Lighthouse score. I hope an increased awareness of these tricks will decrease the frequency at which we see them appear in the wild. Stay safe out there, y’all.
