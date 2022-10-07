---
title: Adding Components to Eleventy with WebC
tags:
  - speaking
  - eleventy
metadata:
  speaking:
    type: meetup
external_url: https://11tymeetup.dev/events/ep-11-webc-with-zach/
---
Components have been an often requested feature in Eleventy. While I do consider it an unanswered question whether or not components are the best starting point for _new_ developers, it’s hard to argue with the efficiency and delivery gains to be had for folks with a bit more experience.

Now, we _could_ wait around for the heavier bundler-based frameworks to circle back and pretend like React server components are a revolutionary new pattern for HTML _without JavaScript_ (can you imagine). But if I might be allowed to offer a well-argued and intellectually-bulletproof counterpoint: naw.

## A History of Component-like Things

Historically, Eleventy has offered a few component-like features. Before we move on, I think it’s worthwhile to go through the prior art here (for Eleventy specifically).

{% raw %}
1. [Liquid Render](https://liquidjs.com/tags/render.html) `{% render %}` tag, the successor to the deprecated [Liquid Include](https://liquidjs.com/tags/include.html) `{% include %}` tag.
2. [Nunjucks Include](https://mozilla.github.io/nunjucks/templating.html#include) `{% include %}` tag
3. [Nunjucks Macro](https://mozilla.github.io/nunjucks/templating.html#macro) (and Import)
4. [Eleventy Shortcodes](https://www.11ty.dev/docs/shortcodes/) (both single and paired)
5. [Eleventy Render Plugin](https://www.11ty.dev/docs/plugins/render/)
{% endraw %}

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">should we rebrand eleventy shortcodes to be eleventy server components or no</p>&mdash; Eleventy 🎈 (@eleven_ty) <a href="https://twitter.com/eleven_ty/status/1341773360162856961?ref_src=twsrc%5Etfw">December 23, 2020</a></blockquote>

Shortcodes (and the Render plugin) were close to the developer experience folks expect from a component system, but they have their own drawbacks.

* Some template languages were good at handling asynchronous behavior by default (Liquid) and others required awkward delineation between asynchronous and synchronous behavior (Nunjucks).
* You can’t invoke other shortcodes from inside of a shortcode definition (the JS function in your Eleventy configuration file). You _can_ nest shortcodes in paired shortcode content but that isn’t always enough.

Shortcodes are okay. We can do better.

## The Age of Vue + Eleventy

Shipped in 2020 to [support a netlify.com tech stack move](https://www.netlify.com/blog/2020/09/18/eleventy-and-vue-a-match-made-to-power-netlify.com/) to Eleventy, the [Eleventy Vue SFC plugin](https://github.com/11ty/eleventy-plugin-vue) was the first big foray into full first-party components for Eleventy. This used Vue single file components and rendered them to plain-’ol HTML (without shipping any client JavaScript).

Vue components are great! Here are a few things I loved:

* Single file component authoring nicely co-locates HTML, CSS, and (for this plugin at least) server-only JavaScript.
* Vue components felt more like authoring HTML (not JavaScript for everything).
* Vue [merges `class` and `style` attributes](https://vuejs.org/guide/components/attrs.html#class-and-style-merging) smartly between host components and component definitions. I know it’s a little thing but this felt like a huge authoring win when your component is HTML-aware (which shortcodes are not).
* Using the `is` attribute to redefine components inline
* Using [attribute bindings](https://vuejs.org/guide/essentials/template-syntax.html#attribute-bindings) for scripting attribute values.
* Vue SFCs also offer [CSS scoping](https://vuejs.org/api/sfc-css-features.html) built-in, although in practice I didn’t use it much! I liked to have more descriptive classes for components I build.
* The Eleventy Vue plugin also generated [per page CSS bundles](https://github.com/11ty/eleventy-plugin-vue#advanced-use-with-eleventy-assets) and brought first-class incremental builds to Eleventy Vue projects (not all template languages in Eleventy support incremental builds).

### Maintenance Woes

The biggest drawback of this approach was that the Eleventy Vue plugin uses [`rollup-plugin-vue`](https://github.com/vuejs/rollup-plugin-vue) which—perhaps obviously—is tightly coupled to the Rollup bundler! I’ve talked a bit about the long term risk of coupling to an official bundler in Eleventy, and those certainly played out with some prescient accuracy here.

Vue 3 was released (beta in April 2020, stable in September 2020) after the Eleventy Vue plugin and an official Vue 3 [`rollup-plugin-vue@6.0.0`](https://www.npmjs.com/package/rollup-plugin-vue) was released in November 2020. Notably, this was happening at the same time as a rapid rise in popularity for Vite. Accordingly, the `rollup-plugin-vue` repo is now _archived and not maintained_ and folks are recommended to use Vite instead of the rollup plugin for Vue compilation.

Unfortunately, due to Vue’s upstream moves here, we’ll likely end up archiving `eleventy-plugin-vue` too.

## Web Components

Building [netlify.com](https://www.netlify.com/) with server-rendered zero-bundle Vue components was a great experience but interestingly we didn’t ship any client-side Vue components on the site (during my tenure). For interactivity we were leaning on Web Components (mostly Custom Elements), which offered a very similar zero-overhead mentality in the client-side world.

When you talk about web components publicly, it’s almost certain that you’ll get a helpful link to a 2019 blog post from Rich Harris (the creator of Svelte) titled [_Why I don’t use web components_](https://dev.to/richharris/why-i-don-t-use-web-components-2cia). The post has has some valid criticism (though it leans kinda hard into complaints about Shadow DOM, that I quickly realized was an optional feature and conveniently ignored it 😅 for technical reasons that are outside the scope of this talk).

But Rich’s top issue in the post is Progressive Enhancement. _Yes, lots to agree on there._ Rich starts his argument with the point that he can write a Svelte component that spits out server-rendered HTML like this:

```html
<a target="_blank" noreferrer href="…" class="svelte-1jnfxx">
  Tweet this
</a>
```

…and in this Rich compares Svelte’s server-rendered HTML to a client-rendered Web Component:

```html
<twitter-share text="…" url="…" via="…"/>
```

Apples to oranges aside, this is a good distillation of the expectations mismatch for a lot of folks. If you’re coming over from a framework component background, you likely expect first-class server rendering for Web Components to be solved by the platform.

To put it succinctly, developers want to write `<twitter-share text="…" url="…" via="…">` and have browsers serve `<a target="_blank" noreferrer href="…">Tweet this</a>` _without a build or compile step_.

**Well, you can’t.** But JavaScript component frameworks can’t do this either.

Going back to Rich’s example, I would say that the ideal client-rendered web component markup would look something like this:

```html
<twitter-share>
  <a href="…">Tweet this</a>
</twitter-share>
```

…and the component might transform the markup to add the component attributes as needed, maybe to render something like this:

```html
<twitter-share>
  <a href="…" target="_blank" noreferrer>Tweet this</a>
</twitter-share>
```

Notably, any time you modify the DOM with JavaScript it creates a tension point for progressive enhancement. Is it okay that before-JS or broken-JS users won’t have those attributes added to the link? Maybe for this use case. But for more complex components, these tradeoff decisions cannot be made universally. They must be made by the web authors with the full context of the use case for the project they are working on.

_(Side note that this is why component-based design systems have a hard time—components don’t have the individual use-case specific context necessary to make judgement calls and can only advise on how they might be used in more broader, generic use cases)_

It _isn’t_ a level playing field to compare server-rendered framework components to client-rendered web components but it does highlight the need for additional Web Component tooling to deliver the maximum amount of code re-use with the minimum amount of tradeoff. Let’s add a build/compile/server render step for Web Components—my biased suggestion is to use WebC!

## The Age of WebC + Eleventy

[WebC](https://github.com/11ty/webc) is a framework-independent standalone HTML compiler for generating markup for web components.

When creating WebC, I wanted to bring all of the good things from Vue’s single file components to Web Components: HTML-first single file component authoring, `class` and `style` attribute merging, `webc:is` (instead of `is` to avoid attribute collisions), dynamic attributes using the `:` prefix, scoped CSS, per-page CSS and JS bundles, and fully incremental builds.

On top of those, WebC offers full access to the Data Cascade inside of your components, is 100% async friendly, designed as a server-first tool (rather than a client-first retrofit), offers zero-overhead client interactivity (requires no library code), is streaming friendly, is _not_ coupled to a bundler and includes some bundler functionality built-in, and is extensible with other template language syntax (Markdown, Nunjucks, Liquid, Sass, etc).

Here are a few links to get started with WebC:

* [Eleventy’s WebC documentation](https://www.11ty.dev/docs/languages/webc/) (this is the best place to start for folks using Eleventy)
* [Crash Course in Eleventy’s new WebC Plugin](https://www.youtube.com/watch?v=X-Bpjrkz-V8) (5m14s video)
* [Interactive Progressively-enhanced Web Components with WebC](https://www.youtube.com/watch?v=p0wDUK0Z5Nw) (9m23s video)
* As this blog post was originally a [talk given at the Eleventy Meetup](https://11tymeetup.dev/events/ep-11-webc-with-zach/), when the video is published I will include a deep link to the demo portion of WebC here which built on the above _Interactive Progressively-enhanced…_ video and featured some larger points around tradeoffs between server-side rendering and progressive enhancement (mostly surrounding content layout shift). I imagine that we’ll likely continue to have those discussions moving forward!

## What’s Next for WebC?

1. More integrations! I loved to see an [Express plugin for WebC from Nick Colley](https://github.com/NickColley/express-webc) and a [Vite plugin for WebC from @mayank99](https://github.com/mayank99/vite-plugin-webc)
2. [HTML bucketing!](https://github.com/11ty/webc/issues/36) We already have CSS/JS asset aggregation. I’d like to see this with arbitrary HTML too. Think of a single WebC component file for a web font that includes both the `@font-face` CSS _and_ the preload HTML together! Or a WebC icon that only includes a single `<g>` that aggregates up to a reusable de-duplicated SVG icon set.
3. [Writing asset bundles to files](https://github.com/11ty/eleventy-plugin-webc/issues/4) (now we’re really getting into bundler-functionality)
4. Aliases for `node_modules` so you can import easily from npm! Folks can publish a webc file for re-use in any other project (that also includes the HTML, JS, and CSS) to use directly.
5. [More sugar for loops/conditional rendering](https://github.com/11ty/webc/issues/28). Those this is possible using template syntax or JavaScript render functions now, it could be less verbose!
6. Tighter integration with [`<is-land>`](https://www.11ty.dev/docs/plugins/partial-hydration/): I’d like to see us get to the point where WebC components will be able to declare assets to load conditionally based on `<is-land>` loading conditions. Super granular control and power!

The best way to keep up to date here is to subscribe to our [YouTube channel](https://www.11ty.dev/youtube) or [follow us on Twitter](https://www.11ty.dev/twitter)!

Thanks, y’all!