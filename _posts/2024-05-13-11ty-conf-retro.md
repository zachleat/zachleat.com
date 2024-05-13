---
title: An Organizer’s Retrospective on the 11ty Conference
metadata:
  speaking:
    type: livestream
  youtubeId: iLxJ6PtuF9M
---
This conference was an incredible privilege to help organize and selfishly I will say that one of my favorite parts was getting a big say in the talk selection.

They were all so good: [Sia on Web Performance](https://conf.11ty.dev/2024/you-re-probably-doing-web-performance-wrong/), [Henry on the IndieWeb](https://conf.11ty.dev/2024/digital-frontiers-indieweb-cowboys-and-a-place-online-to-call-your-own/) (I even saw [Tantek](https://tantek.com/) and [Aaron Parecki](https://aaronparecki.com/) in the chat!), both [Miriam Suzanne](https://conf.11ty.dev/2024/hints-and-suggestions-first-do-no-harm/) _and_ [Mayank](https://conf.11ty.dev/2024/dont-fear-the-cascade/) on CSS, [Chris Ferdinandi on Web Components](https://conf.11ty.dev/2024/come-to-the-light-side-html-web-components/), [Dan Sinker with a very unique talk on storytelling using 11ty](https://conf.11ty.dev/2024/building-a-town-that-doesnt-exist/), [Sara Joy on the accessibility of light and dark mode](https://conf.11ty.dev/2024/light-mode-versus-dark-mode/), [Adrianna Tan on more welcoming tools](https://conf.11ty.dev/2024/11ty-sites-for-people-who-dont-think-they-are-web-developers/), and [ivan zhao on Chinese Type](https://conf.11ty.dev/2024/chinese-type-systems/) (of course we had to sneak a web fonts talk in there).

Each one of these talks brought something unique to the line-up.

We saw a project launch ([`flatlake.app`](https://flatlake.app/), a static API generator) and the speakers showed their domain registrar receipts with a few new vanity domains: [`realbig.company`](https://realbig.company/) and [`showbiz.baby`](https://showbiz.baby/).

A **huge thank you to our sponsors**:

- [CloudCannon CMS](https://cloudcannon.com/eleventy-cms/?utm_campaign=11tyConf&utm_source=11tyconf)
- [Artist Activist](https://artact.io/)

## Community Links

- [_The New Stack:_ Static Sites Do Scale: Eleventy vs. Next.js at 11ty Event](https://thenewstack.io/static-sites-do-scale-eleventy-vs-next-js-at-11ty-event/)
- [_Ryan Trimble:_ Weekly Roundup #3 — Possum Edition](https://ryantrimble.com/blog/weekly-roundup-3/)
- [_Francis Rubio:_ Testing… testing…](https://francisrub.io/notes/testing-testing/)
- [_Chris Ferdinandi:_ Learn how to make web sites real good](https://gomakethings.com/learn-how-to-make-websites-real-good/)
- [_Alex Ward:_ 11ty Conference Thoughts](https://alextheward.com/posts/11ty-conference-thoughts/)
- [_Brian Baldock:_ Opposum Symposium](https://www.brianbaldock.com/blog/opossum-symposium/)

## Stream

{% renderTemplate "webc" %}<div><youtube-lite-player :@slug="$data.metadata.youtubeId" :@label="$data.title"></youtube-lite-player></div>{%- endrenderTemplate %}

## Analytics and Stats

At time of writing (approximately 4 days after the conference), the stats are as follows:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th class="numeric">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Conference Registrations</td>
      <td class="numeric">2005</td>
    </tr>
    <tr>
      <td>YouTube Views</td>
      <td class="numeric">3401</td>
    </tr>
    <tr>
      <td>YouTube Impressions</td>
      <td class="numeric">14301</td>
    </tr>
    <tr>
    <tr>
      <td>YouTube Concurrent *</td>
      <td class="numeric">264–400 peak<br>188–290 average</td>
    </tr>
    <tr>
      <td>YouTube Chat Messages</td>
      <td class="numeric">3273</td>
    </tr>
  </tbody>
</table>

\* YouTube reported different numbers at different times so I just included both above.

## Budget

Prices in <abbr title="United States Dollar">USD</abbr>.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th class="numeric">Expense</th>
      <th class="numeric">Revenue</th>
      <th class="numeric">Total</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <th>Totals:</th>
      <th class="numeric">-$7574.20</th>
      <th class="numeric">$4653.79</th>
      <th class="numeric">-$2920.41</th>
    </tr>
  </tfoot>
  <tbody>
    <tr>
      <td>Merch Bundles: Shopify (×91 purchased, ×20 giveaway)</td>
      <td class="numeric">-$2851.67</td>
      <td class="numeric">$3553.79</td>
      <td class="numeric">$702.12</td>
    </tr>
    <tr>
      <td>Hosting: Cloudflare Workers (3mo)</td>
      <td class="numeric">-$15.00</td>
      <td class="numeric"></td>
      <td class="numeric">-$15.00</td>
    </tr>
    <tr>
      <td>Speaker Honorariums</td>
      <td class="numeric">-$1760.00</td>
      <td class="numeric"></td>
      <td class="numeric">-$1760.00</td>
    </tr>
    <tr>
      <td>Miscellaneous Speaker Expenses</td>
      <td class="numeric">-$44.07</td>
      <td class="numeric"></td>
      <td class="numeric">-$44.07</td>
    </tr>
    <tr>
      <td>Live Captioning: <a href="https://whitecoatcaptioning.com/">Whitecoat</a></td>
      <td class="numeric">-$1870.00</td>
      <td class="numeric"></td>
      <td class="numeric">-$1870.00</td>
    </tr>
    <tr>
      <td>Event platform: <a href="https://streamyard.com/">Streamyard</a></td>
      <td class="numeric">-$339.48</td>
      <td class="numeric"></td>
      <td class="numeric">-$339.48</td>
    </tr>
    <tr>
      <td>Email Newsletter: <a href="https://buttondown.email/">Buttondown</a></td>
      <td class="numeric">-$90.00</td>
      <td class="numeric"></td>
      <td class="numeric">-$90.00</td>
    </tr>
    <tr>
      <td>Sponsorship Packages</td>
      <td class="numeric"></td>
      <td class="numeric">$1100.00</td>
      <td class="numeric">$1100.00</td>
    </tr>
    <tr>
      <td><em>11ty, LLC: <a href="https://stripe.com/atlas">Stripe Atlas</a></em></td>
      <td class="numeric">-$500.00</td>
      <td class="numeric"></td>
      <td class="numeric">-$500.00</td>
    </tr>
    <tr>
      <td><em>11ty, LLC: <a href="https://quickbooks.intuit.com/">Quickbooks</a></em></td>
      <td class="numeric">-$30.00</td>
      <td class="numeric"></td>
      <td class="numeric">-$30.00</td>
    </tr>
    <tr>
      <td><em>11ty, LLC: <a href="https://www.usps.com/">PO Box</a></em></td>
      <td class="numeric">-$46.00</td>
      <td class="numeric"></td>
      <td class="numeric">-$46.00</td>
    </tr>
    <tr>
      <td><em>11ty, LLC: <a href="https://physicaladdress.com/">Business Address</a></em></td>
      <td class="numeric">-$27.98</td>
      <td class="numeric"></td>
      <td class="numeric">-$27.98</td>
    </tr>
  </tbody>
</table>

The above was not paid out of my pocket. We used the 11ty Open Collective funds to pay for the remainder.

The above _does not_ include all of the paid time spent organizing the conference, graciously donated by [CloudCannon](https://cloudcannon.com/eleventy-cms/?utm_campaign=11tyConf&utm_source=11tyconf). This includes developing the web site, ticketing, tech checks, meetings, tests (etc etc etc). I didn’t keep a running log of how much time was spent but it was _a lot_.

## Next Time

### Things I’d Change

Going into this experience, there were a _lot_ of unknowns. Next time it will be nice to have some of those questions answered going in, lowering the stress level.

1. I’d definitely like to hire someone to design the t-shirt! (I designed it this year)
1. We could try to make the Merch bundles a little cheaper, as we came out about $700 ahead from 91 sales (which could have supported about $7 cheaper).
1. Push harder on Sponsorship packages. I did very little outreach here. It would have been nice to break even (or even use this as a fundraising opportunity for the open source project).
1. More interactivity/feedback for the speakers: I maintain that talking to a silent room is the worst part of virtual event speaking and I’d love to figure out some sort of mechanism to give speakers a little more live support from the audience during talks.
1. I worked real hard with a goal of releasing Eleventy `v3.0.0-beta.1` at the conference but we didn’t quite make it. Organizing, creating a new Merch store, forming an LLC, creating a new web site for the conference, wrangling speakers, all alongside Eleventy development proved a little bit too much to fit in — coming soon!

### Things I’d Keep

* [Buttondown](https://buttondown.email/): I ended up using an email newsletter service for user registrations on the site. This choice saved me a lot of development and made things a lot easier. It included email verification and gave me a mechanism to keep in touch with attendees easily. We ended up sending about 5 or 6 emails total for the event, which I think was pretty low volume. I did hear a small amount of negative feedback from this choice as some folks thought it should have been clearer that registering for the conference meant you were being subscribed to a mailing list. We can make that more obvious next time.
* Social ticketing. I went over the technical architecture of the [social ticketing piece on the CloudCannon stream](https://www.youtube.com/watch?v=QPOkigRYYkI). You can check out my [11ty Conference Ticket](https://conf.11ty.dev/tickets/876cecc5531648eab7137c5f853c7539). This ended up [trending on Mastodon](https://mastodon.bot/@trending/111943026303611007).
* [Streamyard](https://streamyard.com/). We used the most expensive tier of Streamyard to get access to a [Green Room](https://support.streamyard.com/hc/en-us/articles/6342816437268-Using-the-Greenroom) feature to keep everyone organized off-stream. Worked great. Though we didn’t technically need the green room on the day of the event, I’ll still probably opt for that next time just in case.
* White Coat Captioning. Diane was amazing. Captions live streamed [right into YouTube](https://support.google.com/youtube/answer/6373554?hl=en&visit_id=638512266870742836-3069583701&rd=1#zippy=%2Cautomatic-captions-on-live-stream-videos) without any mess right from the tool they used ([StreamText](https://support.streamtext.net/hc/en-us/articles/360045245951-Real-Time-Caption-Ingestion-API-for-posting-captions-to-a-URL)) via the POST to URL option in YouTube studio.
* Our [organizer team: Mike, David, and Liv](https://conf.11ty.dev/#team). It went smooth because we put hours and hours into planning!

## Thank you!

Thanks to everyone that attended and kept the chat lively! Appreciate you all and keep building for the web!! 🙌🏻

---

Posts on the 11ty Blog:
* _[11ty Conference is this week!](https://www.11ty.dev/blog/11ty-conf-final-week/) (2024 May 7)_
* _[Get your 11ty Conference 2024 Merch Bundle (Limited Edition)](https://www.11ty.dev/blog/merch/) (2024 March 21)_
* _[We want you to speak at the 11ty Conference!](https://www.11ty.dev/blog/conference-cfp/) (2024 February 23)_
* _[Register now for the 11ty Conference!](https://www.11ty.dev/blog/register-for-11ty-conf/) (2024 February 16)_
* _[We’re running an 11ty Conference!](https://www.11ty.dev/blog/conference/) (2024 January 30)_