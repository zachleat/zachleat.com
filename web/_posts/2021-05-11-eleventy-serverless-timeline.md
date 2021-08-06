---
title: Eleventy Serverless (formerly Eleventy Cloud) Thus Far
titleHtml: Eleventy Serverless (<del>Eleventy Cloud</del>) Thus Far
tags:
  - eleventy
---
_Updated on June 30, 2021: A first draft of the [Eleventy Serverless documentation](https://www.11ty.dev/docs/plugins/serverless/) is now available._

Many of y’all following me on Twitter have probably noticed that I’ve been talking a lot about Eleventy Serverless (formerly called Eleventy Cloud). Eleventy Serverless will allow Eleventy projects to:

* Lazily render individual templates outside of your primary build using [Distributed Persistent Rendering](https://www.netlify.com/blog/2021/04/14/distributed-persistent-rendering-a-new-jamstack-approach-for-faster-builds/). This is super useful for large projects with a _lot_ of templates. For example, [my Twitter archive](/twitter/) (~32K templates) could greatly benefit from this.
* Serve personalized per-user content via server-side rendering.

We’ll enable these things while maintaining Eleventy’s core ethos of zero-client-JavaScript by default.

This blog post is an attempt to organize all of the different places I’ve talked about this feature in preparation for its debut.

## Origin Story

_December 20, 2017_. From the beginning of Eleventy’s existence, we exposed a Programmatic API but it was undocumented. The command line was the only recommended and supported usage. But times, they are, a-changing.

## CMS Previews, build Eleventy on request

_February 25, 2021_, [via Tweet](https://twitter.com/zachleat/status/1365091172138569730). While working on netlify.com, we received a request for faster Browser Previews of CMS content in Sanity. _“We want to see how it renders without running a full build”_ So I set to work. It turned out to be much harder than I expected and required a bunch of internal changes to how Eleventy configuration files were managed. But it was successful! This was the first example of using the Eleventy Programmatic API to run Eleventy in an AWS Lambda.

The reason this was exciting was that it allowed Eleventy to run on-request and render a full HTML page without needing or using _any_ clientside JavaScript. Edit the content in the CMS and run Eleventy in an iframe to show the rendered HTML.

Coincidentally, this was about the same time I was having a very similar discussion about running Eleventy in a serverless function with [Jason Lengstorf](https://twitter.com/zachleat/status/1359963610689208320), who was gearing up for Netlify’s upcoming On-demand Builders feature. It was this discussion that sparked the idea to deliver something more first-class in Eleventy to support both use cases: dynamic server-rendered on-every-request pages and static, lazy-rendered pages.

_Related blog post: [Powering Netlify’s Community Events with Structured Content (and a Preview of Eleventy Cloud)](/web/netlify-powers-events/)_

## Sanity.io Open House

_March 25, 2021_, [via Tweet](https://twitter.com/sanity_io/status/1372985675713236997). Showing off the Eleventy Sanity Previews, this was also the first debut of the [Eleventy Cloud Demo](https://github.com/11ty/demo-eleventy-cloud), an minimum-viable template repo for running Eleventy in a serverless function. This repo was a great starter for those that wanted to try it out, but ultimately (in my opinion) still required too much manual intervention.

_Related blog post: [Powering Netlify’s Community Events with Structured Content (and a Preview of Eleventy Cloud)](/web/netlify-powers-events/)_

## Eleventy RFC on GitHub

_April 3, 2021_. This is probably the [canonical home base for this feature](https://github.com/11ty/eleventy/issues/1727), including screenshots showing the capabilities of dynamic versus static rendering modes.

## Eleventy Docs Demo of On-demand Builders

_April 27, 2021_, [via Tweet](https://twitter.com/zachleat/status/1387101402279907334). In this video I [removed 400+ pages from the Eleventy web site build and moved them to use On-demand Builders](/web/eleventy-cloud-authors-pages/). This sped up the main build and generated these pages on-first-request only. Subsequent requests to On-demand Builders are served a persisted version of that first request’s content.

{% youtubeEmbed "bENDCw9aLV0" %}

## Rename from Eleventy Cloud to Eleventy Serverless

_April 28, 2021_, [via Tweet](https://twitter.com/eleven_ty/status/1389400698295570432) After [numerous](https://twitter.com/swyx/status/1387515780787412992) [pieces](https://twitter.com/CoreyDMcCarty/status/1375104884702318595) of feedback from folks, it became obvious that the Eleventy Cloud name was causing confusion in comparison to other framework Cloud offerings.


## Big Problems Solved

If you’re interested about the Eleventy internals changes that we had to make to facilitate this feature, you can read about the steps here:

* [Add `--to=json` and `--to=ndjson` to CLI](https://github.com/11ty/eleventy/pull/1629) and expose methods in the new Programmatic API too. We use these in the Serverless environment to get access to the rendered output without writing any files.
* Easy way to swap between a Build-time template and Serverless template: [one change to `permalink` controls this](https://twitter.com/zachleat/status/1387151633184874500).
  * Work with pagination to render only a subset of the data set for one specific page.
* Expose `/:path/` and `?querystring` parameters as global data to templates.
* Allowed build-time generated Eleventy collections to be shared in serverless render (configurable per-app)
* Automatic generation of project Serverless Function bundles (config, includes, layouts, data files, templates)
  * We generate the redirects necessary for serverless URLs.
  * We generate the dependencies your project uses in configuration and data files (otherwise these files would be hidden from the serverless bundler)
  * Huge [improvements to the default bundle size](https://twitter.com/zachleat/status/1395506310658015239), using `esbuild` dropped the size from `16.5MB` to `625KB`.
* Work with local development using BrowserSync instead of using another dependency or requiring an emulated AWS Lambda environment. We already use BrowserSync for live reload but now it works with Eleventy Serverless locally too.
  * That said, you _can_ use `netlify dev` if you’d like to test Netlify Functions locally.
* Keep the plugin as provider-independent as possible, though the first iteration will use Netlify.

## Next Steps

The BrowserSync work and `esbuild` stuff needs to be pulled into this plugin and polished and then it’ll be ready for a few eager folks to try out! The finish line is in sight—stay tuned!
