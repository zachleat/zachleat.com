---
title: "The Eleventy v2.0 Release, a talk at the Eleventy Meetup"
tags:
  - eleventy
  - speaking
external_url: https://11tymeetup.dev/events/ep-12-configs-and-v2/
external_icon_url: false
metadata:
  speaking:
    type: meetup
#  youtubeId: 40yPK3EKE60
#medialength: 21 min
slides:
  imageHost: https://www.zachleat.com/presentations/eleventy-v2/
  count: 39
  originalImageDimensions: [1920, 1080]
  outputImageWidths: [800, 1200]
  alt:
    1: Eleventy v2
    2: "Dependencies: v1.0.2 ×311, v2.0.0 ×211"
    3: "More secure: reduce future npm audit vulnerabilities"
    4: "Smaller: v1.0.2 155 MB, v2.0.0 34.3 MB"
    5: "Smaller: comparison to Next.js 158 MB, Astro 169 MB, Gatsby 583 MB, Remix 497 MB"
    6: "Faster install: v1.0.2 7.406 seconds, v2.0.0 5.149 seconds"
    7: "Faster install: comparison to Next.js 3.72 seconds, Astro 12.52 seconds, Gatsby 43.36 seconds, Remix 40.14 seconds"
    8: "As always, no telemetry"
    9: "--incremental (finally)"
    10: "Terminal showing an incremental build, file changed: src/index.webc, Wrote 1 file (skipped 167) in 0.79 seconds"
    11: "Terminal showing an incremental build, layout file changed: src/_includes/layouts/docs.njk, Wrote 156 files (skipped 10) in 1.51 seconds"
    12: "Terminal showing an incremental build, component file changed: src/_includes/components/callout.webc, Wrote 1 file (skipped 167) in 0.71 seconds"
    13: "Terminal showing an incremental build, editing a page in a collection: src/blog/2023-02-08-eleventy-v2.md, Wrote 2 files (skipped 166) in 0.68 seconds"
    14: "Showing how to declare collection dependencies in front matter, JavaScript front matter: let eleventyImport = { collections: ['blog'] };"
    15: "--ignore-initial"
    16: "--incremental: Wrote 165 files in 1.92 seconds or with --ignore-initial: Wrote 0 files in 0.76 seconds"
    17: "Emulated passthrough Copy: Copied 6898 files or skips all copy"
    18: "Dev server: minimal footprint 1.4 MB node_modules, Bundler decoupled, fast 2ms startup times, WebSockets-based Live reload, DOM-diffing HTML updates"
    19: "NO MORE indented markdown blocks"
    20: "Added default config file names eleventy.config.js and eleventy.config.cjs"
    21: "addShortcode(async () => {});"
    22: "addFilter(async () => {});"
    23: "this.page and this.eleventy on Shortcodes, Filters, Linters, Transforms"
    24: "Custom Data Formats add your own data file extension to Eleventy, addDataExtension('toml')"
    25: "Images as Data: addDataExtension('png,jpeg')"
    26: "Plugins: Edge, i18n, Base, and Vite"
    27: "WebC!"
    28: "HTML-first components"
    29: "Client-JavaScript 100% optional"
    30: "Single file components"
    31: "CSS/JS management included"
    32: "Islands Architecture with is-land"
    33: "Fully async-friendly"
    34: "Full incremental support"
    35: "Shadow DOM, Declarative Shadow DOM, No Shadow DOM"
    36: "What’s next for Eleventy?"
    37: "Better docs!"
    38: "Eleventy v3 🐥 (canary)"
    39: Thank you!
---
<div class="fullwidth"><youtube-lite-player @slug="aM24L2g0peA" @label="{{ title }}"></youtube-lite-player></div>

[Watch on YouTube](https://www.youtube.com/watch?v=aM24L2g0peA) or check out the full [Eleventy Meetup YouTube channel](https://www.youtube.com/c/theeleventymeetup)!

## Slides

<div class="fullwidth">
  <div class="carousel carousel-16-9">
  {%- assign slideCount = slides.count %}
  {%- assign slideImageWidth = slides.originalImageDimensions[0] %}
  {%- assign slideImageHeight = slides.originalImageDimensions[1] %}
  {%- for i in (1..slideCount) %}
    {%- capture productionUrl %}{{ slides.imageHost }}image-export-low.{{ i | leftpad: 3 }}.jpeg{% endcapture %}
    {%- capture alt %}{% if slides.alt[i] %}{{ slides.alt[i] }}{% else %}Slide {{ i }}{% endif %}{% endcapture %}
    {%- if slides.links[i] %}<a href="{{ slides.links[i] }}">{% endif %}
    <img src="/presentations/eleventy-v2/image-export-low.{{ i | leftpad: 3 }}.jpeg" alt="{{ alt }}" width="{{ slideImageWidth }}" height="{{ slideImageHeight }}" loading="lazy" decoding="async">
    {%- if slides.links[i] %}</a>{% endif %}
  {%- endfor %}
  </div>
</div>

Scroll for slide content →

