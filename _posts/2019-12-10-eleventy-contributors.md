---
title: Building Exclusive Features For Open Collective Contributors on Netlify
tags:
  - eleventy
  - project
---
After the unbelievably gracious reception for [Eleventy](https://www.11ty.dev/) at the recent [JAMstack_conf](https://jamstackconf.com/) in San Francisco, I’ve been thinking about ways to invest more in the project’s longevity. It was surreal to see Eleventy get _as many_ if not more grassroots mentions in the talks and in the hallway than many of the companies with booths, employing full time staff to support and develop their projects.

Since then I have also been thinking a lot about what the next step for the Eleventy project might be, in terms of growth. We have a lot of lovely supporters on the [Eleventy Open Collective](https://opencollective.com/11ty) and it’s been growing slowly over time. But I would love to somehow grow the project’s financial base so that Eleventy is a project that can have dedicated development on time that _isn’t_ nights and weekends. To achieve this goal, the unfortunate truth is that we need more donors.

## Premium Features

One small step I’ve taken that I think will help incentivize donors to contribute is to start creating exclusive features on the documentation for open source patrons. The first of these such features is Eleventy documentation search.

<img src="/web/img/posts/pro-open-source/eleventy-search.jpg" alt="Eleventy Contributor Account search for Pagination">

Notably this enhances from a baseline DuckDuckGo search experience that is served to non-authenticated users. It even includes `site:www.11ty.dev` in the search field so that the search is properly scoped without JavaScript.

A few more roadmap-ish ideas for premium features:

* Search an old version of the docs. This would be an easy add-on to what I’ve already built.
* Hide advertisements (if your project documentation has advertisements, 11ty.dev does not)
* Offline documentation. A PWA would be a nice feature.
* Comic Sans Be Gone. I don’t remember where I saw this one originally but it was some old shareware project that used Comic Sans by default and then upgraded to a typeface that better matched the project. My typographic sensibilities prevent me from trying this.
* Right now I don’t think charging for documentation content (premium tutorials) or code (premium plugins/themes/starter projects) is on the table but this may be something I’ll consider further down the line.
* An Eleventy Visa credit card (just kidding 😈)

For now these premium features are nice-to-haves. One might even frame this as charging for Progressive Enhancements.

## Want this for your Open Source Project?

I am kinda proud of the implementation here—with Netlify’s help I was able to implement a fairly complex use case in a short amount of time. It isn’t fully automated but it’s close, again with the help of a few Netlify features. Here are the pieces with links to the code on the 11ty website GitHub:

* **Auth on the account page**: Adds the full [Netlify Identity widget](https://github.com/netlify/netlify-identity-widget) to **one** documentation page that acts as the home base for all account operations: the [Contributor Account page](https://github.com/11ty/11ty-website/blob/5c621a65acbee055791f311cf98e48e0fdaeb9f0/docs/account.md). If the user logs in, logs out, needs to change or recover their password, they would do all of those actions on this one page. This widget is a bit hefty because it includes all of the UI bits for authentication, so I’ve limited it to one page only.
    - Notably because the Netlify Identity widget is only on one page, the URLs sent out for all Netlify Identity emails must be customized to include this path. You can see those [email template customizations on the `netlify-email` folder](https://github.com/11ty/11ty-website/tree/5c621a65acbee055791f311cf98e48e0fdaeb9f0/netlify-email). Don’t forget to update your email templates on your Netlify Identity Settings page to point to `/netlify-email/invitation.html`, `/netlify-email/email-change.html`, and `/netlify-email/password-reset.html`.
* **Auth on every page**: Every other page uses the much smaller “closer to the metal” [GoTrue JS](https://github.com/netlify/gotrue-js) library. This lives on every page and makes sure the user is authenticated.
    - See [`eleventy-js.njk`](https://github.com/11ty/11ty-website/blob/5c621a65acbee055791f311cf98e48e0fdaeb9f0/js/eleventy-js.njk) (includes the `gotrue.js` library and `auth.js` for the app code) and [`base.njk`](https://github.com/11ty/11ty-website/blob/5c621a65acbee055791f311cf98e48e0fdaeb9f0/_includes/layouts/base.njk) for how that is referenced on the page (`type=module` browsers only! 😎).
    - The [`auth.js` file is custom code that I wrote to check users and update content](https://github.com/11ty/11ty-website/blob/5c621a65acbee055791f311cf98e48e0fdaeb9f0/_includes/components/auth/auth.js).
* **Invitation-only Identity**: Netlify Identity accounts are set to Invite-only on the Netlify Identity settings page under Registration. When a new person becomes an Open Collective contributor, I use the [Open Collective API to get that email](https://github.com/11ty/11ty-website/blob/5c621a65acbee055791f311cf98e48e0fdaeb9f0/node-supporters.js) (by running `node node-supporters.js`) and invite the user by their Open Collective email account. This avoids confusion around matching identities across multiple services. Otherwise I’d have to tell people to register their accounts using their Open Collective email and that seems like a hassle to manage.
* **Verifying Open Collective status**: When a user logs in on the account page, a request is made to a [Netlify Function (`user.js`)](https://github.com/11ty/11ty-website/blob/5c621a65acbee055791f311cf98e48e0fdaeb9f0/functions/user.js) that checks whether their the current account is a contributor on Eleventy’s Open Collective. Netlify Identity and Netlify Functions work together here to verify the email in the serverless function is the same as the one currently authenticated.

## Go forth

I hope this has given you some ideas that might help you invest in the longevity of your own open source projects. I’d love to hear if this was useful to you—let me know!

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">spent like a week building auth and search for the <a href="https://twitter.com/eleven_ty">@eleven_ty</a> web site but people like having their picture in the possum balloon the most 😭 <a href="https://t.co/cA2H6rk7h7">pic.twitter.com/cA2H6rk7h7</a></p>&mdash; Zach Leatherman (@zachleat) <a href="/twitter/1197601336294027265/">November 21, 2019</a></blockquote>
