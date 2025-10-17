---
title: "Lessons learned moving Eleventy from CommonJS to ESM"
tags:
  - eleventy
  - speaking
  - video
metadata:
  speaking:
    type: conference
  youtubeId: LsN6TBx9Hxo
medialength: 45 min
slides:
  dir: "/presentations/eleventy-v3-esm/"
  alt:
    2: 11ty v3
    3: CommonJS
    4: Common, the actor and rapper is shown alongside the JS logo
    5: CommonJS is strikethrough, ESM is added
    6: Regina George from Mean Girls is shown riding in a lunar module and says Get in Loser—We’re using Modules now
    8: module.exports = function() {};
    9: export default function() {};
    11: const render = function() {}; module.exports = { render };
    12: const render = function() {}; export { render };
    13: A screenshot of the Eleventy core test suite passing on GitHub actions (1048 tests) on Mac/Linux/Windows
    15: Ryan Reynolds in medical scrubs asks Why?
    16: EMCAScript modules are the official standard format to package JavaScript code for reuse. (via TC39 and the node.js documentation)
    17: A screenshot of the web browser support for EMCAScript 2015 (all green)
    19: A table showing CommonJS support in Node but missing in Deno and the Browser but ESM supported in all.
    21: Bundlers! Rollup, esbuild, Carabiner, Parcel, Webpack, SWC
    22: Actually sorry Carabiner is just the Toblerone logo
    23: A repeat of the CommonJS/ESM support in Node, Deno, Browser
    25: Minimum viable tech stack means we stay as close to the Build/no-build line as possible, avoiding as many dependencies as we can to stick as close to HTML/CSS/JS as we can.
    26: A fake messages conversation about web sites being easier to maintain because they do less!
    27: Eleventy v1 was 72.7MB of node_modules, v2 was 35.2MB
    28: Eleventy v3 is currently 20.2MB of node_modules
    29: For comparison, rollup is 4.8MB, webpack is 25.9MB, parcel is 281.9MB, esbuild is 9.9MB and swc is 47MB.
    30: Gatsby is 523.8MB
    32: Eleventy v3 is dropping some node_modules weight through our community survey results. Handlebars, Pug, Mustache, EJS, and Haml are all unpopular template syntaxes and we’ll move these into plugin-land.
    33: Requirements
    34: Node.js 10 ESM was experimental but it’s stable in 12
    35: 11ty v1 required Node.js 12+, v2 required 14+, v3 requires 18+
    37: We could have done this in 2022, but we didn’t 😅
    38: Compatibility
    39: CommonJS Project compatibility, config files, data files, template files, third party plugins.
    40: The biggest limitation with a CommonJS project is that you can’t require an ESM dependency (which Eleventy is, now)
    42: Compatibility overview.
    43: CommonJS Upgrade Walkthrough in Two Steps
    44: Step one—npm install @11ty/eleventy@canary --save-exact
    46: You cannot require("@11ty/eleventy") now so using bundled Eleventy plugins need to change.
    47: Change your config callback to async and use await import("@11ty/eleventy") to include them instead.
    48: Done.
    50: Now let’s talk about Third-party plugins
    51: Existing third-party plugins are CommonJS—keep these as-is.
    52: eleventyConfig.addPlugin(async function() {}) now supported in Eleventy v3
    53: Any new ESM Eleventy Plugins are only compatible with Eleventy v3
    54: ESM Eleventy plugins require an `async` config callback or an ESM configuration file—both of which are only supported in Eleventy v3
    56: Our compatibility checklist for CommonJS projects is complete.
    58: Next, ESM application code.
    59: A similar checklist of config files, data files, templates, and plugins.
    60: ESM Upgrade Walkthrough in Three Steps
    61: "Step one npm install @11ty/eleventy@canary --save-exact, Step two add type: 'module' to your package.json. All .js files in your project are now assumed to be ESM."
    62: "Step three rename all .js app files to .cjs (and convert these over to ESM as-needed or not at all)"
    63: Done.
    64: Let’s convert our configuration code to ESM
    65: Use import {} from "@11ty/eleventy" as normal. Change module.exports = to export.default
    66: Change data files from module.exports = to export.default
    67: You can used named exports too. export { key }
    68: export default { data, render } in an index.11ty.js template.
    69: export { data, render } in an index.11ty.js template.
    70: __filename and __dirname aren’t available by default but you can use import.meta.url and fileURLToPath to recreate these.
    71: Eventually we’ll use import.meta.filename and import.meta.dirname (not yet stable as of Node 21)
    73: Let’s talk about Third-party plugins in an ESM project.
    74: Everything will work as-is, you can import any ESM or CJS plugin from an ESM config file. Access to all the things!
    76: The full checklist of compatibility is complete.
    77: Node Scripts, Eleventy’s Programmatic API
    78: Again, you can’t require("@11ty/eleventy");
    79: Dynamic await import("@11ty/eleventy") again.
    80: If your script is ESM, you can `import Eleventy from "@11ty/eleventy"` directly.
    81: Internals
    82: Upgrade frozen CommonJS dependencies (these went full ESM), @sindresorhus/slugify, multimatch, bcp-47-normalize
    83: Reimporting without require.cache to get new content
    84: Before we would delete from require.cache and re-require the file. Now we await import with a cache buster URL parameter.
    85: Parsing the dependency tree. Before this was available via require.cache. Now we parse the JS with acorn (but it only happens for --serve/--watch)
    86: Import attributes, before we could require a JSON file directly. You can’t await import a JSON file now.
    87: "You could import a JSON file: assert { type: 'json' } with a warning"
    88: "The syntax changed to: with { type: 'json' } also with a warning"
    89: We just use fs.readFile* to avoid warnings.
    90: Dynamic execution of JavaScript for `---node` front matter.
    91: Node’s vm module is only stable for CommonJS code. Fine until you try to `import` something.
    92: You can use node --experimental-vm-modules but we fake it by transforming `import` to dynamic `import()` until this is stable.
    93: Conclusions
    # 94:
    95: ESM ~~all~~ of the things
    96: ESM some of the things.
    97: It’s better to be an ESM dependent.
    98: It’s better to be a CommonJS dependency.
    99: ESM for me, CommonJS for thee (fancy Winnie the Pooh meme)
    100: Titus Wormer’s chart on the popularity of ESM/CJS across popular npm packages. November 2023 had 68.8% CJS, 12.9% Faux, 7.5% Dual, 10.8% ESM
    101: 11ty and Astro are ESM first—Svelte, Vite, Nuxt are dual—Remix and Gatsby are faux—Next.js is CJS.
    # 102:
    103: For me, I will not be dual publishing packages. I don’t want the overhead.
    104: Looking at package compatibility—if things are going to include you, it’s tempting to use CommonJS . If you’re going to use other things, it’s better to be ESM.
    # 105:
    # 106:
    107: But we have to think of the wider ecosystem outside of Node.js (other runtimes and the Browser).
    108: The Parasite movie poster.
    109: The Parasite movie poster overlaid with Parasites vs. Para-apps.
    110: Thanks! (the end)
---
This talk was given at [TheJam.dev 2024](/web/thejam/).

{% renderTemplate "webc" %}<div><youtube-lite-player :@slug="$data.metadata.youtubeId" :@label="$data.title"></youtube-lite-player></div>{%- endrenderTemplate %}

And the full slide deck is included below:

{% slides slides.dir, "1-110", slides.alt %}

_Correction: on Slide 40 the code reads `eleventyPlugin.addPlugin` when it should say `eleventyConfig.addPlugin`._