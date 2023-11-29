---
title: "Eleventy: Build vs. Serverless vs. Edge"
tags:
  - eleventy
  - speaking
  - video
external_url: https://11tymeetup.dev/events/ep-8-state-of-the-possumverse-and-panel-on-transitioning-to-11ty/
external_icon_url: false
metadata:
  speaking:
    type: meetup
  youtubeId: 40yPK3EKE60
medialength: 21 min
slides:
  imageHost: https://www.zachleat.com/presentations/rendering-modes/
  count: 39
  originalImageDimensions: [1920, 1080]
  outputImageWidths: [800, 1200]
  links:
    13: https://demo-eleventy-serverless.netlify.app/
    14: https://objectfit-focalpoint.netlify.app/
    15: https://uniclode.zachleat.dev/
    16: https://contrast-11ties.netlify.app/
    21: https://demo-eleventy-edge.netlify.app/
    22: https://demo-eleventy-edge.netlify.app/appearance/
    27: https://www.11ty.dev/
    28: https://v0-12-1.11ty.dev/
    30: https://v0-12-1.11ty.dev/authors/
    31: https://www.youtube.com/watch?v=bENDCw9aLV0
    32: https://www.11ty.dev/authors/
    34: https://www.11ty.dev/docs/account/
  alt:
    1: The State of 11ty, 2022 Edition (with the latest possum balloon mascot floating)
    2: Terrible cursed images of Zach wearing a patagonia vest, and Zach’s head on the classic Stonks image with an arrow going up and to the right
    3: "2017 Build, 2021 Serverless, 2022 Edge"
    4: A large “Build” text on a background of a large tree with roots
    5: "Static files: Fastest to load, most portable, simplest to host $$$"
    6: Data (a cloud of a bunch of Headless CMS provider logos)
    7: Data to HTML
    8: "Matthew Phillips tweets “I think what’s great about Eleventy is how it was able to simplify SSGs to just 2 concepts: data sources and templates”"
    9: A screenshot of the 11ty.dev Netlify Deploys screen, with text saying “oopsie daisy, hot swap the site”
    10: A large “Serverless” text on a background image of a larger server rack
    11: The text “Serverless first” is crossed out, instead Static first
    12: Netlify Functions (run on every request) On-demand Builders (run on first request, cache for subsequent)
    17: A large “Edge” text on a background of a diving board over a lake
    18: The text “Edge first” is crossed out, instead Static first
    19: "Edge: Fast! Personalized. *Not* cached"
    20: Installation instructions for Eleventy Edge, add to .eleventy.js, netlify.toml, and a content file at index.liquid
    23: "Comparing Performance: Build is the best, Serverless is the worst, On-demand Builders are great when cached, and Edge is pretty fast with a 50ms max"
    24: "Comparing Cost: build templates pay up front with build minutes, Serverless and Edge are charged per request, On-demand builders only charge for first request. Netlify’s free tier offers 300 build minutes per month, Serverless (including On-demand builders) 125k requests/site/month, Edge 3M /month"
    25: "Comparing Request-level Features: Build has none, Serverless and Edge have access to Headers Cookies, Forms, URLSearchParams, On-demand builders have none"
    26: Case Study
    29: "Screenshot of a Netlify Deploy log for the old 0.12.x Eleventy docs: 495 files in 53.65 seconds"
    31: "Screenshot of a Netlify Deploy log for the new 1.x Eleventy docs: 145 files in 29.73 seconds"
    33: "/* Build, /authors/* Serverless"
    35: Zoomed in screenshot of the Eleventy Possum Logo on 11ty.dev with zachleat’s avatar in the middle of the ballon—an arrow is pointing to it from the JS logo
    36: "/* Build, /authors/* Serverless, /* Edge"
    37: A table summarizing the previous slides comparing Build Serverless On-demand Builders, and Edge across Performance, Netlify Free Tier, Cost, and Request-level features
    38: For any project mix and match Build, Serverless, and Edge
    39: "For any route/page: mix and match Build, Serverless, Edge, Build + Edge, Serverless + Edge"
---
_This was a talk given at the [Eleventy Meetup (11tymeetup.dev)](https://11tymeetup.dev/events/ep-8-state-of-the-possumverse-and-panel-on-transitioning-to-11ty/). While it was originally titled a “State of 11ty” talk, it somehow got laser-focused on differentiating between the Eleventy rendering modes: Build, [Serverless](https://www.11ty.dev/docs/plugins/serverless/), and [Edge](https://www.11ty.dev/docs/plugins/edge/)._

<div><youtube-lite-player @slug="40yPK3EKE60" @label="{{ title }}"></youtube-lite-player></div>

[Watch on YouTube](https://www.youtube.com/watch?v=40yPK3EKE60). Video courtesy of the [Eleventy Meetup YouTube channel](https://www.youtube.com/c/theeleventymeetup).


## Slides

<div class="carousel carousel-16-9">
{%- assign slideCount = slides.count %}
{%- assign slideImageWidth = slides.originalImageDimensions[0] %}
{%- assign slideImageHeight = slides.originalImageDimensions[1] %}
{%- for i in (1..slideCount) %}
  {%- capture productionUrl %}{{ slides.imageHost }}rendering-modes.{{ i | leftpad: 3 }}.jpeg{% endcapture %}
  {%- capture alt %}{% if slides.alt[i] %}{{ slides.alt[i] }}{% else %}Slide {{ i }}{% endif %}{% endcapture %}
  {%- if slides.links[i] %}<a href="{{ slides.links[i] }}">{% endif %}
  {%- eleventyImageServiceHtml productionUrl, slideImageWidth, slideImageHeight, slides.outputImageWidths, alt %}
  {%- if slides.links[i] %}</a>{% endif %}
{%- endfor %}
</div>

Scroll for slide content →

