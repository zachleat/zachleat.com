---
title: 'Eleventy and Vue, a match made to power Netlify.com'
tags:
  - external
external_url: https://www.netlify.com/blog/2020/09/18/eleventy-and-vue-a-match-made-to-power-netlify.com/
---
Earlier in the calendar year at Netlify we undertook an ambitious project to take our web site to the next level: to simultaneously iterate on the design and improve our tech stack. You may have noticed this [launch in May](https://twitter.com/zachleat/status/1265387661742743560) of this year, approximately 734 months ago.

We had a few goals in mind:

1. Streamline our development process to improve our delivery velocity.
2. Maintain a lightweight and accessible output, avoiding hefty JavaScript cruft on the client.
3. Use components in development for easier code re-use (see point 1)

We tried a variety of component-based frameworks and build tools but unfortunately each of them required delivery of some kind of JavaScript runtime—a caveat that we were hoping to avoid.

Of the two developers on our super lean Netlify Marketing development team, we had exactly two super-fans of the Eleventy static site generator and more than zero Eleventy core team members. Eleventy’s focus on lightweight output made it an obvious choice, as it closely aligned with our goal of lightweight output. However, we both acknowledged that Eleventy was not quite as friendly as we wanted in the component-based development space.

We really loved the developer experience of the Vue frameworks we evaluated and wondered: could we somehow combine those with the lightweight zero-client-JavaScript approach of Eleventy?

And dear reader—as it turns out—you absolutely can.

## Eleventy and Vue: an ambitious crossover

Let’s dive right in and make a web site using the same combination of Eleventy and Vue. Haven’t used Eleventy or Vue before? That’s okay! You can check out these Quick start guides:

* [Getting Started with Eleventy](https://www.11ty.dev/docs/getting-started/)
* [Introduction to Vue.js](https://vuejs.org/v2/guide/)

Even if you don’t click through and read those, we’ll start from the beginning and create a new project from scratch. We’ll be using the [`@11ty/eleventy-plugin-vue` plugin](https://github.com/11ty/eleventy-plugin-vue/).

1. Create your project directory and install two packages:

    ```bash
    mkdir eleventy-vue-demo
    cd eleventy-vue-demo

    npm init -y
    npm install @11ty/eleventy @11ty/eleventy-plugin-vue --save
    ```

2. Create your Eleventy configuration file (the default is `.eleventy.js`) and add your plugin.

    ```js
    const eleventyVue = require("@11ty/eleventy-plugin-vue");

    module.exports = function(eleventyConfig) {
      eleventyConfig.addPlugin(eleventyVue);
    };
    ```

    There is additional configuration available in the `eleventy-plugin-vue` documentation, including an example to add [Autoprefixer and PostCSS to the Vue component CSS](https://github.com/11ty/eleventy-plugin-vue#customize-with-options).

3. Create a Vue single file component! We’ll name ours `index.vue`. This will ensure our output writes to `/index.html`.

    ```markup
    <template>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Demo: Vue and Eleventy</title>
        </head>
        <body>
          <p>Hello from Vue.</p>
          <p>Hello from Eleventy.</p>
        </body>
      </html>
    </template>
    <script>
    export default {
      components: {}
    }
    </script>
    ```

4. Run Eleventy!

    ```bash
    ELEVENTY_EXPERIMENTAL=true npx @11ty/eleventy --serve
    ```

    _The ability to add Vue and in fact *any* templating language to Eleventy is currently available as an experimental feature in `v0.11.0` and APIs specific to that feature may be subject to change. To run Eleventy with experimental features, we’re using the `ELEVENTY_EXPERIMENTAL=true` environment variable. Look for more of these plugins to come from the lovely Eleventy community! I’ve seen some early drafts of plugins of Eleventy with Svelte and Eleventy with React that look very promising._

5. View your page in a browser, navigate to `http://localhost:8080/` (which is the same as `http://localhost:8080/index.html`—`index.html` written from our `index.vue` file above is implied). Double check your console output to make sure `8080` is the right port—it will increment to `8081` or higher when `8080` is already in use by something else.

### Side Quest: Adding a Doctype

A consistent problem with full stack Vue: how to add a Doctype? We love Vue because it’s markup driven but Doctypes are a special case necessary for proper document rendering. Nuxt solves this problem with their special [App Template View](https://nuxtjs.org/guide/views/#app-template).

#### Option 1: Using a Layout Template

You can also do this same thing with a [Layout template](https://www.11ty.dev/docs/layouts/) in Eleventy. Create a `_includes/layout.html` file with the following content:

```markup
<!doctype html>
{{ content }}
```

And then add the layout reference to our `index.vue` template file:

```markup
<template><!-- omitted for clarity --></template>
<style>/* omitted for clarity */</style>
<script>
export default {
  // Add this
  data: {
    layout: "layout.html"
  },
  components: {}
}
</script>
```

*Side Side Quest:* You could also declare a global layout for all templates by creating a global data file  `_data/layout.js` with the content `module.exports = "layout.html"`. Read more about [Eleventy’s Data Cascade](https://www.11ty.dev/docs/data-cascade/) to learn about how that works.

*Important note:* While front matter is not supported in Vue component files, the [`data` provided from Vue template files](https://vuejs.org/v2/guide/components.html#Base-Example) feeds into the [Eleventy Data Cascade](https://www.11ty.dev/docs/data-cascade/) at the same level as front matter.

#### Option 2: Using a Transform

Arguably, it may be simpler to add the Doctype via an [Eleventy Transform](https://www.11ty.dev/docs/config/#transforms). Transforms allow you to post-process the output of an Eleventy template before it writes to the file system. The following code would add a Doctype if one didn’t already exist (add it to your `.eleventy.js` configuration file):

```jsx
eleventyConfig.addTransform("add-html-doctype", (content, outputPath) => {
  let doctype = "<!doctype html>";
  // If we’re writing to an HTML file and a Doctype does not already exist
  if(outputPath.endsWith(".html") && !content.trim().toLowerCase().startsWith(doctype)) {
    return `${doctype}${content}`;
  }
  return content;
});
```

### Add Components!

Now we’re ready to add some more Vue Single File Components to our stack—let’s do it!

If we want a `.vue` source file to output a full HTML file in the Eleventy output folder (`_site` by default), then we can create any old `.vue` file in our root folder (we called it `eleventy-vue-demo` above).

If we only want to consume these components in other higher level templates, the most straightforward way to do this is to put your components into the `_includes/` folder. Files in `_includes` are already exempted from writing to output directory. Let’s create `_includes/room-with-a.vue`:

```markup
<template>
  <main>
    <p>Hello from a Vue component.</p>
  </main>
</template>
<style>
main {
  font-family: sans-serif;
}
</style>
```

Now we can modify our `index.vue` page component to consume it:

```markup
<template>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Demo: Vue and Eleventy</title>
    </head>
    <body>
      <room-with-a/>
    </body>
  </html>
</template>
<script>
import roomWithA from "./_includes/room-with-a.vue";

export default {
  components: {
    roomWithA
  }
}
</script>
```

If you navigate back to `http://localhost:8080/` in your browser, you should see `Hello from a Vue component`.

It should be noted that there are some [Vue specific limitations with server side rendering and Component Lifecycle Hooks, as noted in the Vue documentation](https://ssr.vuejs.org/guide/universal.html#component-lifecycle-hooks).

### CSS Management

Some of our single file components use CSS—how can I use that on my page? The Eleventy Vue plugin creates a dependency graph of each of the components in use on a page to create a customized build comprised of only the CSS necessary to render the components used on that page.

The ordering of the CSS depends on the order determined by the dependency graph. So if `a.vue` and `b.vue` both import `c.vue`, the CSS will be ordered: `c.vue` then `a.vue` and then `b.vue`.

This is an improvement over approaches like Critical CSS that scan the CSS to find what’s relevant for above-the-fold and more robust than using something that attempts to remove [unused CSS](https://css-tricks.com/how-do-you-remove-unused-css-from-a-site/) later, which both fall prey to being unaware of component state.

Let’s include our optimized CSS on our `index.vue` page:

```markup
<template>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Demo: Vue and Eleventy</title>
      <!-- Add this: -->
      <style v-html="css"/>
    </head>
    <body>
      <room-with-a/>
    </body>
  </html>
</template>
<script>
import roomWithA from "./_includes/room-with-a.vue";

export default {
  components: {
    roomWithA
  },
  // Add this:
  computed: {
    css: function() {
      return this.getVueComponentCssForPage(this.page.url);
    }
  }
}
</script>
```

`getVueComponentCssForPage` is an [Eleventy Global Filter](https://www.11ty.dev/docs/filters/) (specifically, a JavaScript template function) provided by the Eleventy Vue Plugin. Any [JavaScript Template Functions](https://www.11ty.dev/docs/languages/javascript/#javascript-template-functions) you’ve created in Eleventy (or [provided via Eleventy](https://www.11ty.dev/docs/filters/#eleventy-provided-universal-filters) like `url` or `log` or `slug`) will be available in your Eleventy Vue template files (e.g. like our `index.vue`) as a [Vue method](https://vuejs.org/v2/api/#methods).

Furthermore, [JavaScript Template Functions have full access to Eleventy `page` data values](https://www.11ty.dev/docs/languages/javascript/#access-to-page-data-values), as you can see above via `this.page.url`.

#### Move this into a layout

For future implementations, it’d be good practice to move the boilerplate HTML (`html`, `head` including the per-page generated CSS, `body`) into an [Eleventy Layout](https://www.11ty.dev/docs/layouts/) so you don’t have to repeat yourself on every page. For brevity a layout example was not included in this demo.

#### Scoped CSS

It’s also worth noting that you can [use the `scoped` attribute on your `<style>` block](https://vue-loader.vuejs.org/guide/scoped-css.html) in your single file component to automatically add extra `[data-]` attributes to your component HTML and CSS to help prevent collisions—I personally don’t like the additions to specificity but some people like it!

### Future plans: JavaScript, but not like that

We do have a JavaScript bundler in place on [netlify.com](http://netlify.com) but I do consider that to be outside the scope of this particular demonstration. Importantly, we are not yet loading or running Vue on the client for our site. Vue acts as a build-only optimization to generate our pages from components.

A lot of the cutting edge discussion in the framework world lately has been about partial hydration—having full framework potential running exclusively on smaller portions of the page. While this feature is not yet shipping with the Eleventy Vue plugin, the HTML first progressive enhancement based approach we’ve taken here is a great stepping stone in that direction.

So—like the Hubble telescope—watch this space.