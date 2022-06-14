---
title: "The many definitions of Server-Side Rendering"
tweet: https://twitter.com/zachleat/status/1535261208198135812
---
Frameworks.

What is a framework, even?

> “Solid start to this blog post, Zach—you’re doing great.”

What is a JavaScript Framework, even?

> “Confuse them, then rescue them. This is how thought leadership works.”

You’ve almost certainly heard of JavaScript _Component_ Frameworks (Libraries 🌶) like [Vue.js](https://vuejs.org/), [Preact](https://preactjs.com/), [Svelte](https://svelte.dev/), [Lit](https://lit.dev/), [SolidJS](https://www.solidjs.com/), and others.

This is not to be confused with JavaScript _Application_ Frameworks like [NuxtJS](https://nuxtjs.org/), [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.com/), [Remix](https://remix.run/), [Astro](https://astro.build/), [SvelteKit](https://kit.svelte.dev/) and others.

> Well, huh—where does [Vite](https://vitejs.dev/) live?

Application frameworks typically make use of one (or more! hi Astro) component frameworks.

Now folks that spend their time in the wonderful world of frameworks have likely encountered the term “Server-Side Rendering” (often abbreviated as SSR). What they might not be familiar with is that _SSR_ is defined differently in Component and Application framework contexts.

## Component Framework SSR

> A package for server-side rendering Lit templates and components.
> —[@lit-labs/ssr](https://github.com/lit/lit/tree/main/packages/labs/ssr#lit-labsssr)

> When generating SSR code, this adds markers to `<head>` elements so that hydration knows which to replace.
> …
> If "ssr", Svelte emits an object with a render method suitable for server-side rendering.
> —[Svelte docs](https://svelte.dev/docs)

> However, it is also possible to render the same components into HTML strings on the server, send them directly to the browser, and finally "hydrate" the static markup into a fully interactive app on the client.
> —[Vue Server-Side Rendering (SSR) Guide](https://vuejs.org/guide/scaling-up/ssr.html#server-side-rendering-ssr)

> Server-Side Rendering (often abbreviated as "SSR") allows you to render your application to an HTML string that can be sent to the client to improve load time. 
> —[Preact Server-Side Rendering docs](https://preactjs.com/guide/v10/server-side-rendering/#app)

Component frameworks define SSR as the static rendering of a component. Give it a component, get the rendered HTML back.

## Application Framework SSR

> Server-side rendering (SSR), is the ability of an application to contribute by displaying the web-page on the server instead of rendering it in the browser. Server-side sends a fully rendered page to the client; the client's JavaScript bundle takes over which then allows the Vue.js app to hydrate.—[NuxtJS Server side rendering](https://nuxtjs.org/docs/concepts/server-side-rendering#server-side-rendering)

Okay, fine—good so far. Seems in line with the component framework definition.

> Node.js server required
> A JavaScript environment is required to render your web page.
> A Node.js server needs to be configured to execute your Vue.js application
> —[NuxtJS Server side rendering](https://nuxtjs.org/docs/concepts/server-side-rendering#server-side-rendering)

Now wait just one second. Why can’t I use a build server to server-side render the markup? The component framework definition made no mention of a Node.js (per-request) server! (Not to mention that servers often cost more than static builds.)

> Also referred to as "SSR" or "Dynamic Rendering".
> If a page uses Server-side Rendering, the page HTML is generated on each request.
> —[Next.js Server-side Rendering docs](https://nextjs.org/docs/basic-features/pages#server-side-rendering)

Another definition that requires a runtime server to generate HTML (on each request!).

> Server-side Rendering (SSR) is one of Gatsby’s rendering options and allows you to pre-render a page with data that is fetched when a user visits the page. While it is recommended to use Static Site Generation (SSG) or Deferred Static Generation (DSG) over SSR you might have use cases that require it…
> —[Gatsby’s Using Server-side Rendering (SSR) docs](https://www.gatsbyjs.com/docs/how-to/rendering-options/using-server-side-rendering/)

Another server-based definition from Gatsby.

> When you enable SSR you can: Implement sessions for login state in your app. Render data from an API called dynamically with fetch. Deploy your site to a host using an adapter.
> [Astro’s Server-side Rendering docs](https://docs.astro.build/en/guides/server-side-rendering/)

Not explicitly stated in the Astro docs, but these are definitely runtime server features.

## The gist

Application frameworks most often define SSR as the alternative to SSG (static site generation). A runtime server is used to render the components on request.

Component frameworks define SSR as generating static HTML from a component definition. They offer no preference as to whether this should or can happen at build time or at request-time.

One term, two contexts, two definitions! I do think it’s important that folks understand the distinction here—and to keep it in mind when you navigate these different contexts. My hunch is that the application framework definition will likely win out. I’ve already started referring to the component framework definition as _Component SSR_ 😅.

> SSR isn’t “free”. These SSR frameworks exist because they make a profit for their creators.
> —[Cory House](https://twitter.com/housecor/status/1534527068888776705)

The worst outcome from this overloaded definition (in my mind) would be that folks mistakenly assume that component framework SSR requires a Node.js server! It _does not_. I’d hate to see ambiguity in a technical term leveraged for profit. Just know that you _can_ use a static build to implement component SSR (maybe also known as prerendered markup) without a Node.js server, a serverless function adapter, or any of those unnecessary (and more costly) alternatives.

---

This post inspired by tweets from:

* [Cory House](https://twitter.com/housecor/status/1534527066120638465) (_though I am curious: Why is the dichotomy limited to SSR and CSR? Where is SSG?_)
* and [Florens Verschelde](https://twitter.com/fvsch/status/1535269030851911681)

<style>
a[href^="https://preactjs.com"]:before,
a[href^="https://vuejs.org"]:before,
a[href^="https://lit.dev/"]:before,
a[href^="https://www.solidjs.com/"]:before,
a[href^="https://svelte.dev"]:before {
	content: "";
	display: inline-block;
	vertical-align: text-bottom;
	width: 1em;
	height: 1em;
	margin: 0 .2em;
	background-size: contain;
}
a[href^="https://vuejs.org"]:before {
	background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fvuejs.org%2F/");
}
a[href^="https://svelte.dev"]:before {
	background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fsvelte.dev%2F/");
}
a[href^="https://preactjs.com"]:before {
	background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fpreactjs.com%2F/");
}
a[href^="https://lit.dev"]:before {
	background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Flit.dev%2F/");
}
a[href^="https://www.solidjs.com"]:before {
	background-image: url("https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.solidjs.com%2F/");
}
</style>