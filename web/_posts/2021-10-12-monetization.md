---
title: Who Pays for Web Frameworks?
seo:
  openGraphBackgroundImage: /og/sources/deposit-boxes.jpg
---
_Updated on January 28, 2022 with new information for Svelte and Astro._

Three years into working on Eleventy, I continue to be blown away by [the adoption and community support](https://www.11ty.dev/blog/jamstack-survey-2021/) of folks contributing to the underdog.

It has me thinking about sustainability models for this style of web framework—[what are other folks doing to fund development](https://twitter.com/zachleat/status/1447940347384971275)? Recent news would suggest that more and more folks are going the route of taking investment. It has me considering the hidden costs of such routes.

Nonetheless, I thought the best place to start would be to compile the data.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Investment</th>
      <th>Ownership</th>
      <th>💵</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Angular</td>
      <td></td>
      <td>Google</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Astro</td>
      <td><a href="https://astro.build/blog/the-astro-technology-company/">$7M</a><br><a href="#subnote-1" id="link-subnote-1">[Note 1]</a></td>
      <td></td>
      <td><a href="https://opencollective.com/astrodotbuild">Open Collective</a></td>
    </tr>
    <tr>
      <td>Eleventy</td>
      <td>-</td>
      <td>-</td>
      <td><a href="https://opencollective.com/11ty">Open Collective</a></td>
    </tr>
    <tr>
      <td>Gatsby</td>
      <td>$46.8M</td>
      <td>Gatsby (Inc.)</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Jekyll</td>
      <td></td>
      <td>originally GitHub</td>
      <td><a href="https://opencollective.com/jekyll">Open Collective</a></td>
    </tr>
    <tr>
      <td>Marko</td>
      <td></td>
      <td><a href="https://github.com/eBay">eBay</a></td>
      <td></td>
    </tr>
    <tr>
      <td>Meteor</td>
      <td><a href="https://en.wikipedia.org/wiki/Meteor_(web_framework)">$30.2M</a></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Next.js</td>
      <td>$163M</td>
      <td>Vercel</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Nuxt.js</td>
      <td>$2M (as NuxtLabs)</td>
      <td></td>
      <td><a href="https://opencollective.com/nuxtjs">Open Collective</a>, <a href="https://github.com/sponsors/nuxt">GitHub Sponsors</a></td>
    </tr>
    <tr>
      <td>Preact</td>
      <td></td>
      <td></td>
      <td><a href="https://opencollective.com/preact">Open Collective</a>, <a href="https://github.com/sponsors/preactjs">GitHub Sponsors</a></td>
    </tr>
    <tr>
      <td>React</td>
      <td></td>
      <td>Facebook</td>
      <td>-</td>
    </tr>
    <tr>
      <td>Remix Run</td>
      <td><a href="https://remix.run/blog/seed-funding-for-remix">$3M</a></td>
      <td></td>
      <td><del>Paid Subscriptions</del></td>
    </tr>
    <tr>
      <td>Svelte</td>
      <td><a href="#subnote-2" id="link-subnote-2">[Note 2]</a></td>
      <td></td>
      <td><a href="https://opencollective.com/svelte">Open Collective</a></td>
    </tr>
    <tr>
      <td>SolidJS</td>
      <td></td>
      <td></td>
      <td><a href="https://opencollective.com/solid">Open Collective</a></td>
    </tr>
    <tr>
      <td>Vue</td>
      <td></td>
      <td></td>
      <td><a href="https://www.patreon.com/evanyou">Patreon</a>, <a href="https://opencollective.com/vuejs">Open Collective</a>, <a href="https://vue.threadless.com/">Swag Store</a></td>
    </tr>
  </tbody>
</table>

<ol class="notes">
  <li class="notes_note"><a id="subnote-1" href="#link-subnote-1" class="notes_linkback">Jump to the reference.</a> Unknown amount previously raised as Skypack CDN.</li>
  <li class="notes_note"><a id="subnote-2" href="#link-subnote-2" class="notes_linkback">Jump to the reference.</a> <a href="https://vercel.com/blog/vercel-welcomes-rich-harris-creator-of-svelte">Rich Harris is full time sponsored by Vercel</a>.</li>
</ol>

_This list was loosely compliled from the [Jamstack Community Survey 2021](https://jamstack.org/survey/2021/#choices-frameworks)._

## Ownership

Ownership is such an interesting piece of the game here. Is it better to have a framework owned by a company? And better for whom? I’m sure they have increased velocity, delivering and <em>moving fast</em> with dedicated resources. But what happens when the corporate interests diverge from the community’s interests? One is reminded of [Basecamp’s implosion](https://www.theverge.com/2021/5/3/22418208/basecamp-all-hands-meeting-employee-resignations-buyouts-implosion) and [the downstream effects it had on their open source projects](https://twitter.com/sstephenson/status/1388146131377528832). Similarly—in a hypothetical world where folks on the React core team resigned from Facebook, it would have devastating effects on the React community and the future of React.

Alternatively, I decided early that I wanted Eleventy to be independent from commercial ownership and had very positive and supportive discussions about that when I joined Netlify. From the outside it would appear that both Svelte and Preact and has taken a similar route but I’d love to learn more about how those are set up.

It should be said that decoupled ownership is risky in a different way to folks deciding whether to trust a framework—will it have the resources to support regular maintenance? Will it have the legs to continue to be viable in 5 years?

My opinions here are probably obvious now: I think commercial ownership and tight coupling has more downsides than independence. It reminds me of employer-provided healthcare in the United States—having it tightly coupled is far less flexible and makes it harder to switch employers (to the benefit of the employer).

## Larger Trends

After compiling the data, there are a couple of clear trends at play here:

1. Ownership by a company (unrelated to the framework). e.g. Facebook, eBay, Google.
2. Raise investment, form a hosting company for the framework. Meteor was one of the first examples I found to take this approach. But both Gatsby and Next.js have popularized this. I don’t feel comfortable with this, either. The way to make money becomes hosting vendor lock-in at the framework level 😱
3. Take donations. I think Vue is doing the best job of this. The other thing Vue does well is:
4. Sell sponsorships. Though, a word of caution as some [less-than-reputable sponsors have figured out that sponsorship is a cheap way to buy backlinks](https://twitter.com/zachleat/status/1295370536600707078), which some very popular projects have decided is a necessary evil to monetization (I don’t agree). <!--Babel, Jest, Bower, and Socket.io -->
5. Sell subscriptions. Remix went this way originally. They had some success but low adoption and changed it up when they raised investment.

1 and 2 are almost exclusively distinct. 3 does not pair well with 1 or 2. 3 and 4 can pair nicely.

## Conclusion

I don’t have the answers. I definitely wouldn’t agree that Eleventy has figured out our sustainable monetization strategy but I do really admire the success that Vue has had solving this exact problem. I do know that I have no interest in Trend 2 but I’ll continue to keep a keen eye on what other indie-framework folks are doing.


_[Open Graph image from Jason Pofahl on Unsplash](https://unsplash.com/photos/6AQY7pO1lS0)_
