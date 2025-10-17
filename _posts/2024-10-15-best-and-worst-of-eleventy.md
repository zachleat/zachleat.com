---
title: "The Best And Worst Parts Of Eleventy (Now In v3)—Web Unleashed 2024"
tags:
  - conference
  - speaking
  - eleventy
slides:
  dir: "/presentations/best-worst-eleventy/web-unleashed-"
  alt:
    2: An angel and demon sit beside the 11ty logo
    3: The Best and Worst of 11ty
    4: The XKCD meme with a jenga tower, the caption reads A Project Some Random Person in Nebraska has been Maintaining since 2017 (11ty logo sits overhead)
    5: But why does 11ty exist?
    6: A Delorean car sits with its doors open
    7: The Back to the Future time machine date reads Nov 26, 2017 11:27 PM
    8: Screenshots of Netlify Blog (Top Ten Static Site Generators of 2017) and StaticGen
    9: A logo cloud of site generators from 2008 to 2017
    10: 11ty wanted to be Jekyll but with JavaScript
    11: 11ty also wanted to be the Anti-Gatsby
    12: A logo cloud of site generators from 2008 to 2017
    13: A much larger cloud of more site generators, the ones that are not maintained any more are crossed out
    14: A graph of npm downloads for 11ty, showing when other site generators were introduced
    15: A large photo of an elephant stands behind the word Maintenance
    16: Eric says “One thing to point out while The Discourse favors it is that @thea11yproject launched with version 1.0.0 of @eleventy (and developed using a pre-major release version). Eleventy is now at version 2.0.0
    17: A photo of a YouTube Video reads How Stable is Eleventy?
    18: A screenshot of a GitHub diff for an 11ty Upgrade to v3.0.0
    19: +6 additions, -4 subtractions (GitHub diff)
    20: Upgrade Helper, Eleventy has a major version upgrade helper plugin
    21: Point 1. Stability
    22: Killed by Google graveyard screenshot
    23: Vue Plugin crossed out, screenshot of vuejs/rollup-plugin-vue
    24: Serverless Plugins, crossed out
    25: Browsersync, crossed out
    26: Eleventy Dev Server, fewer dependencies, reduces node_modules, faster npm install, a goose egg on npm audits
    27: A screenshot of a toot “Updating my Node dependencies after 2 months. Ah, let’s see what fresh horrors await”
    28: Deps, v1 315, v2 213, v3 189
    29: Weight, v1 72.7 MB, v2 35.2 MB, v3 28.1 MB
    30: Graph of other generator weights, from smallest to largest—Eleventy, SvelteKit, Astro, Remix, Nuxt, Next.js, Gatsby
    31: A large photo of an elephant stands behind the word Maintenance
    32: Maintenance encompasses Scope, Motivation, and Funding
    # 33:
    34: Point 2, Static HTML
    35: Graph of Site generators showing Dynamic Server/Static on x-axis and MPA/SPA on y-axis
    36: 11ty is trying to be the best at MPA and Static.
    37: Static & Audits, found 23 vulnerabilities (8 low, 10 moderate, 5 high) in 120 scanned packages
    38: Comparison is the thief of joy
    39: “I like Next”
    40: Next.js uses Static export, Vercel preferred hosting, and Big JavaScript bundles. 11ty is static-first, hosted anywhere, and has zero client JS by default
    # 41:
    42: Point 3, Images
    43: Screenshot of configuration file to add Eleventy Image plugin
    44: Never manually add a width or height attribute again, not even for remote images
    45: Code samples showing output from <img> tag to <picture> during serve or build modes
    46: Specify more widths using `eleventy:widths` attribute
    47: <img> versus <picture>? Don’t worry about it
    48: Specify formats using `eleventy:formats` attribute
    49: Reduce build cost for local dev
    50: Graph of build versus serve performance for Eleventy Image
    51: svgShortCircuit feature
    52: Demo of the Mexico flag SVG showing one raster output image is discarded (larger than SVG)
    53: Demo of SVG Tiger shows that only the SVG is used, it’s smaller than all raster images.
    # 54:
    55: Point 4, JavaScript
    56: 11ty v3 uses ESM
    57: require("node:") and module.exports
    58: import "node:" and export default
    59: Screenshot of Titus Wormer’s graph showing how many package son npm are using esm (12.1%) versus CommonJS (65%). CommonJS usage is trending down slowly.
    60: "ESM: 11ty, Astro; Dual: Svelte, Vite, Nuxt; Faux: Remix, Gatsby; CommonJS: Next.js"
    61: ESM support was stable in Node 12+ and 11ty added it for Node 18+ so we’re a *little* late here.
    62: 11ty is written in ESM, adds support for ESM in your projects, but ESM remains optional.
    63: Configuration files can use ESM
    64: JavaScript Data Files can use ESM
    65: and JavaScript Templates can use ESM
    66: 'You can set .js to use ESM by default in your project with `"type": "module"` in your package.json.'
    67: Your configuration file might look like module.exports = function(eleventyConfig) {}
    68: If you use a plugin bundled with Eleventy, you can’t require("@11ty/eleventy") now that it’s written in ESM
    69: So pull that require into an async configuration callback and use `await import("@11ty/eleventy")` instead.
    70: Though if you’re using Node 22+ and `--experimental-require-module` you can still require("@11ty/eleventy");
    71: But it’s easier just to use ESM and import "@11ty/eleventy" directly in your configuration file.
    72: And you can use JSDoc to get autocomplete in your IDE too
    73: ESM/CommonJS Node.js Quick Reference. You can import "ESM". You can import "CommonJS". You can’t require("ESM") unless Node 22+ and --experimental-require-module. You can require("CommonJS"). Eleventy plugins written in ESM will be Eleventy v3+ only.
    74: Comparison is the thief of Joy. “I like Hugo”
    75: Hugo uses Go and Go templates, it’s *so* fast, has a zero client JS baseline. 11ty uses JavaScript and any JS-based templates. It’s also fast (but not as fast as Hugo) and offers first-class access to npm.
    76: 11ty wants to be Hugo but with JavaScript
    77: Screenshot of npm
    78: npm has 3.3M packages
    79: Graph showing Ruby Gems, crates.io (Rust), Packagist (PHP), PYPI (Python) and gopm (Go) all offer about 1M packages added up.
    80: JavaScript is the top language on GitHub
    81: Comparison is the thief of Joy. “I like Astro”
    82: 11ty and Astro are pretty similar. Astro uses Vite and 11ty is Bundler de-coupled. Astro has serverless support and 11ty does not. Astro has support for only a handleful of template types and 11ty is fully custom.
    83: The real difference between 11ty and Astro is performance, a graph shows 11ty builds 4000 markdown files a little slower than Hugo. Astro performance is on par with Gatsby and Next is about 4× slower than Gatsby.
    # 84:
    85: Point 5, CSS
    86: Showing how to use the bundle plugin in Eleventy
    87: Showing how to output bundle contents in templates
    # 88:
    89: Point 6, Feeds
    90: Screenshot showing how to add an Atom feed to your project config
    # 91:
    92: Point 7, Formats & Runtimes
    93: Building eleventy-base-blog in Deno
    94: Adding support for TypeScript and JSX to 11ty
    95: Using arbitrary JavaScript in front matter
    96: .astro files when?
    # 97:
    98: Point 8, Community
    99: 40350 friends on social media
    100: So many contributors (a giant screenshot of them)
    101: 76397 repositories on GitHub use Eleventy
    102: 'A logo cloud of the companies using Eleventy: NASA, Cern, TC39, W3C, Google, Mozilla, etc'
    103: A facepile of our Open Collective supporters
    104: Our Discord moderators and helpers
    105: 11tyMeetup.dev organizers, 11tyBundle.dev, and the GitHub Issue Tracker
    106: Our best thing is our Community
    # 107:
    # 108:
    109: Thank you!
seo:
  openGraphBackgroundImage: /web/img/posts/best-worst-eleventy/laptop.jpg
  openGraphAlt: A laptop sits in focus on a podium. A blurred Zach stands in the background holding a microphone.
posterImage:
  showOnPage: true
  height: 24em
  name: Brian de Rivera Simon
  source: https://www.flickr.com/photos/fitc/54064427719/in/album-72177720321189329
external_icon_url: https://fitc.ca/
---
Here are the slides from my talk at Web Unleashed:

{% slides slides.dir, "2-109", slides.alt %}

Unfortunately the talk was not recorded (by the event or me) so you’ll have to [ask questions about the slides](https://fediverse.zachleat.com/@zachleat) if you want more context!

<a href="https://www.flickr.com/photos/fitc/54064357173/in/album-72177720321189329/"><img src="/web/img/posts/best-worst-eleventy/talk.jpg" alt="A photo from Brian de Rivera Simon during my talk"></a>

## Panel Discussion

I was also honored to participate in a panel alongside Chris Coyier, Rachel Andrew, and Bekah Hawrot-Weigel:

* [Websites, are they still a good idea?](https://fitc.ca/presentation/websites-are-they-still-a-good-idea/)

<a href="https://www.flickr.com/photos/fitc/54064564630/in/album-72177720321189329"><img src="/web/img/posts/best-worst-eleventy/panel2.jpg" alt="A photo from Brian de Rivera Simon of the panel"></a>

## Related

* [My event page](/web/web-unleashed/)
* [Event page on fitc.ca](https://fitc.ca/presentation/the-best-and-worst-parts-of-eleventy-now-in-v3/)
* [Full event photo album on Flickr](https://www.flickr.com/photos/fitc/albums/72177720321189329/)