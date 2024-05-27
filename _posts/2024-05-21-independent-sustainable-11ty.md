---
title: 'I Need Your Help to Make 11ty Fully Independent and Sustainable in 2024'
tags: eleventy
pinned: true
---
The 11ty International Symposium on Making Web Sites Real Good [wrapped up two short weeks ago](/web/11ty-conf-retro/) and it was _(to say the least)_ incredible. The speakers, the talks, and most importantly — the community.

Piggybacking from this amazing momentum, 11ty is making some bigger moves: we’re going all-in to create a fully independent and sustainable, grass-roots funded open source project in 2024.

Practically speaking this means that for the very first time in 11ty’s history, **I will be working _independently_ on 11ty full time**. This means increased iteration speed, more responsive official support, more features and bug fixes, and faster releases.

The ethos of 11ty has always been to do more, with less. You see fingerprints from this idea throughout the project: in our build performance, in our HTML-first tooling philosophy, in our ecosystem of small unix-philosophy style composable utilities that work independent of Eleventy (like [Image](https://www.11ty.dev/docs/plugins/image/), [Fetch](https://www.11ty.dev/docs/plugins/fetch/), [WebC](https://www.11ty.dev/docs/languages/webc/), and [`is-land`](https://www.11ty.dev/docs/plugins/is-land/)).

As a project we’ve seen folks happily migrate to Eleventy — away from tools with much larger [budgets and investment](/web/monetization/) — with rave reviews on how little app-team maintenance was required long-term. It has many folks asking the question: what is the [total cost of ownership _(buzzword alert)_ of your current tech stack](https://www.youtube.com/watch?v=bPtQmsjXMuo)?

## Asking for Help

This change also means that **[11ty needs your help, financially](https://opencollective.com/11ty)**. This blog post is the first time we’ve ever done a fundraising push for 11ty in the seven years we’ve helped folks build fast and stable web sites on the Jamstack and I wouldn’t be asking if it weren’t absolutely necessary.

If you are already a supporter on our Open Collective — thank you. You have made this move possible. With the money we’ve saved through our Open Collective, we’ve unlocked a runway for this sustainability push, but we need more businesses and companies to be involved to survive long-term.

If you use 11ty at work, now is the time to get your company involved. To reinforce the stability of 11ty moving forward, _we need more recurring (monthly/yearly) contributions._ Individual sponsorships are also welcome — every bit helps.

* Our preferred fundraising platform is Open Collective: [`opencollective.com/11ty`](https://opencollective.com/11ty)
* We are also on GitHub Sponsors, which may already be a vendor approved by your company: [`github.com/sponsors/11ty`](https://github.com/sponsors/11ty) ([Learn more about sponsoring via GitHub sponsors](https://docs.github.com/en/sponsors/sponsoring-open-source-contributors/sponsoring-an-open-source-contributor-through-github))

At time of writing, we had approximately `$2200` in monthly recurring contributions. Our fundraising goal is `$6000` (monthly).

<a href="https://opencollective.com/11ty">
	<fundraising-status min="0" max="6000" value="{{ eleventyFundraising.monthly.value }}" style="--fs-color: #e23c2f;">
		<img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2F/" width="30" height="30" alt="11ty Logo" loading="lazy" decoding="async">
	</fundraising-status>
</a>

_The above chart updates daily with live data and we are currently {{ eleventyFundraising.monthly.value | times: 100 | divided_by: 6000 | round: 1 }}% to the goal: ${{ eleventyFundraising.monthly.value }} of $6000 USD._

If you have questions or want to have a discussion about this (very big) news, [please email me directly](mailto:zach@11ty.dev). Let’s work together!

## Partnerships

We’re also looking for corporate partners in the following spaces for more creative partnerships moving forward:

* Developer Tools
* Web Hosting (Jamstack, Static Sites, et al)
* Image Optimization (we’re about to ship a best-in-class Image Optimization plugin that would pair quite nicely with a hosted service)
* Content Management Systems
* Web Performance and Monitoring

Is this you? [Contact me directly](mailto:zach@11ty.dev).

<style>
.avatar-indieweb {
	width: 1em;
	height: 1em;
	margin-right: .25em;
}
</style>

Here are a few examples of some lovely organizations using 11ty:

<ul class="list-inline fl fl-inline fl-nowrap">
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.nasa.gov%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.nasa.gov/" loading="lazy" decoding="async" class="avatar avatar-indieweb"><abbr title="National Aeronautics and Space Administration">NASA</abbr></li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fhome.web.cern.ch%2F/" width="150" height="150" alt="IndieWeb Avatar for https://home.web.cern.ch/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Cern</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Ftc39.es%2F/" width="150" height="150" alt="IndieWeb Avatar for https://tc39.es/" loading="lazy" decoding="async" class="avatar avatar-indieweb">TC39</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.w3.org%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.w3.org/" loading="lazy" decoding="async" class="avatar avatar-indieweb">W3C</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fabout.google%2F/" width="150" height="150" alt="IndieWeb Avatar for https://about.google/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Google</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.mozilla.org%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.mozilla.org/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Mozilla</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.jetbrains.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.jetbrains.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">JetBrains</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fweb.dev%2F/" width="150" height="150" alt="IndieWeb Avatar for https://web.dev/" loading="lazy" decoding="async" class="avatar avatar-indieweb">web.dev</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fweb.mit.edu%2F/" width="150" height="150" alt="IndieWeb Avatar for https://web.mit.edu/" loading="lazy" decoding="async" class="avatar avatar-indieweb"><abbr title="Massachusetts Institute of Technology">MIT</abbr></li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.stanford.edu%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.stanford.edu/" loading="lazy" decoding="async" class="avatar avatar-indieweb"><abbr title="Stanford">Stanford</abbr></li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fv8.dev%2F/" width="150" height="150" alt="IndieWeb Avatar for https://v8.dev/" loading="lazy" decoding="async" class="avatar avatar-indieweb">V8</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fgsap.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://gsap.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">GSAP</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fdeveloper.chrome.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://developer.chrome.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Chrome Developers</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Ffoursquare.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://foursquare.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Foursquare</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.webpagetest.org%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.webpagetest.org/" loading="lazy" decoding="async" class="avatar avatar-indieweb">WebPageTest</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.a11yproject.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.a11yproject.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">A11Y Project</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.gov.uk%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.gov.uk/" loading="lazy" decoding="async" class="avatar avatar-indieweb">United Kingdom (gov)</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.numerique.gouv.fr%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.numerique.gouv.fr/" loading="lazy" decoding="async" class="avatar avatar-indieweb">France (gov)</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fstackoverflow.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://stackoverflow.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Stack Overflow</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Flit.dev%2F/" width="120" height="150" alt="IndieWeb Avatar for https://lit.dev/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Lit</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fglitch.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://glitch.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Glitch</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fstackblitz.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://stackblitz.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Stackblitz</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fopenwebdocs.org%2F/" width="150" height="150" alt="IndieWeb Avatar for https://openwebdocs.org/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Open Web Docs</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.greenpeace.org%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.greenpeace.org/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Greenpeace</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.csis.org%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.csis.org/" loading="lazy" decoding="async" class="avatar avatar-indieweb"><abbr title="Center for Strategic &amp; International Studies">CSIS</abbr></li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Feslint.org%2F/" width="150" height="150" alt="IndieWeb Avatar for https://eslint.org/" loading="lazy" decoding="async" class="avatar avatar-indieweb">ESLint</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fmochajs.org%2F/" width="150" height="150" alt="IndieWeb Avatar for https://mochajs.org/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Mocha</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Frevealjs.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://revealjs.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">reveal.js</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fpanic.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://panic.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Panic</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fset.studio%2F/" width="150" height="150" alt="IndieWeb Avatar for https://set.studio/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Set Studio</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.ookla.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.ookla.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Ookla</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.kandji.io%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.kandji.io/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Kandji</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.khanacademy.org%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.khanacademy.org/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Khan Academy</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fbasecamp.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://basecamp.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Basecamp</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.snowpack.dev%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.snowpack.dev/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Snowpack</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fffconf.org%2F/" width="150" height="150" alt="IndieWeb Avatar for https://ffconf.org/" loading="lazy" decoding="async" class="avatar avatar-indieweb">ffconf</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2F2022.uxlondon.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://2022.uxlondon.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">UX London</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fnordhealth.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://nordhealth.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Nordhealth</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.orange.com%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.orange.com/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Orange</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.wisc.edu%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.wisc.edu/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Univ. of Wisconsin-Madison</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.ca.gov%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.ca.gov/" loading="lazy" decoding="async" class="avatar avatar-indieweb">California (gov)</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fux.redhat.com/" width="150" height="150" alt="IndieWeb Avatar for https://ux.redhat.com" loading="lazy" decoding="async" class="avatar avatar-indieweb">Red Hat</li>
<li><img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.pie.design%2F/" width="150" height="150" alt="IndieWeb Avatar for https://www.pie.design/" loading="lazy" decoding="async" class="avatar avatar-indieweb">Just Eat Takeaway</li>
</ul>

[Please get in touch!](https://opencollective.com/11ty)