---
title: "The Tension and Future of Jamstack"
---
At the [**Jamstack ZHUZH**](https://www.youtube.com/watch?v=xVmKdCi-Gpo) last month, we had a lovely panel discussion on the current and future status of the Jamstack ecosystem.

Some stakeholders and detractors have declared the Jamstack “dead,” in part evidenced by the recent [shuttering of the Jamstack Discord](https://dev.to/remotesynth/is-jamstack-officially-finished-50kb), the discontinuation of [Jamstack Conf](https://jamstack.org/conf/) (as Netlify pivots toward the marketing term Composable and a [new conference](https://www.netlify.com/conference/) under that name), and the end of the [Jamstack Community Survey](https://jamstack.org/survey/2022/).

The evidence does support the claim that _Netlify_ has moved on from shepherding the Jamstack (community/architecture)—which is fine! (and maybe preferable?)

A post-Netlify Jamstack opens up a few opportunities that were not possible before:

1. To refocus the definition and pull it back from post-pivot silver-bullet marketing, which was arguably an overstep attempt to pull dynamic/SSR/on-request frameworks like (non-static export) Next.js, Remix, Fresh (et al) under the umbrella.
2. To strengthen the community with a broader group of leaders and stakeholders with a vested interest in continuing the community-building aspect of the Jamstack. A multi-vendor gaggle would represent a maturation of the community, insulating it from the influencer rumor-mill.

## Refocus

On the first point, I believe that a refocus of the definition will allow us to better define and clearly communicate when to use (and not use) a Jamstack site:

* Improved _backend_ performance (prebuilt markup on a CDN)
* Improved scalability (no application servers, no on-request processing)
* Improved security (reduced attack surface, per above)
* Portablility (a folder-of-files can be moved to a new host easily)

Which will—in turn—allow the clarity to define the tradeoffs and downsides too:

* Leans on client-side JavaScript for runtime use cases like personalization and authentication.
* Takes no stance on front-end performance: single page applications (e.g. the notoriously slow `create-react-app`) are still under the Jamstack umbrella.

This intellectual honesty allows us to make better decisions when architecting projects: when it is and is _not_ appropriate to use Jamstack.

## Next Steps

If you want to be involved—get in touch! We already have a few folks gathered together that see the unique value in the Jamstack community and we’re very interested in keeping this momentum going.