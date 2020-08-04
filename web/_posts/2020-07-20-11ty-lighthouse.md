---
title: The Lighthouse Scores Will Continue Until Morale Improves
tags:
  - project
  - popular-posts
postRank: 13
---
Continuing in the great web performance tradition of running Lighthouse on so many things that Lighthouse—in shared traits with quarantined pandemic life—begins to have no meaning and rampant nihilism washes over the developer ecosystem, I have added Lighthouse scores to the [Starter Projects list on the Eleventy documentation](https://www.11ty.dev/docs/starter/).

As the Eleventy ecosystem has grown, the list of starter projects available has grown as well. This should help aid new developers if they want to use a Starter Project, as well as highlight developers that have put the extra effort into their project’s performance and accessibility.

## Adding Scores to Eleventy Docs

Just looking back at the last four months, this certainly feels like the accumulation of a bunch of different side projects coming together. Here are the different projects at work:

* [`performance-leaderboard`](https://github.com/zachleat/performance-leaderboard/)
* [Eleventy Leaderboards](https://www.11ty.dev/leaderboard/)
* [Speedlify](https://www.speedlify.dev/) with the [API](https://www.speedlify.dev/api/urls.json)
* [`<speedlify-score>`](https://github.com/zachleat/speedlify-score/)
* [Eleventy Cache Assets](https://github.com/11ty/eleventy-cache-assets)

### Step 1: Add the URLs

First I manually compiled a list of starter project demo URLs to [Speedlify, a site I built for automated Lighthouse testing and reporting](/web/speedlify/). This was very straightforward based on the work I’ve already completed. You can see the daily updated results of that here:

<div class="primarylink"><a href="https://www.speedlify.dev/eleventy-starters/">Speedlify for Eleventy Starter Projects</a></div>

### Step 2: Fetch the Data

For my personal website, [I added Lighthouse scores to the footer](/web/lighthouse-in-footer/) using a client-side request to the Speedlify API. That wouldn’t work here—at time of writing there are 18 starter projects. I wouldn’t want 18 requests to the Speedlify API on every page load! So I modified my [Eleventy data request to fetch and cache the API data at build time](https://github.com/11ty/11ty-website/blob/master/_data/speedlify.js).

<div class="primarylink"><a href="https://www.11ty.dev/docs/starter/">Eleventy Starter Projects with Lighthouse Scores</a></div>

The Eleventy documentation already runs every day. Coupled with Speedlify’s daily updates, this means that the scores on the Eleventy documentation will automatically update with new Lighthouse score results every day too. So if a Starter Project author wants to update their project to improve their scores, it requires no manual intervention from me for the scores to update! Jamstack is pretty cool y’all.

### Step 3: Render the Data

Next, I modified the [`<speedlify-score>` web component](https://github.com/zachleat/speedlify-score/) to render build-time-fetched API data. In markup it looks like this:

```html
<speedlify-score raw-data='{"url":"https://eleventy-base-blog.netlify.app/","timestamp":1595170952102,"ranks":{"hundos":7,"performance":5,"accessibility":6},"lighthouse":{"version":"6.1.1","performance":1,"accessibility":1,"bestPractices":1,"seo":0.97,"total":397},"firstContentfulPaint":815.225,"speedIndex":815.225,"largestContentfulPaint":815.225,"totalBlockingTime":0,"cumulativeLayoutShift":0,"timeToInteractive":815.225,"maxPotentialFirstInputDelay":16,"timeToFirstByte":29.860000000000014,"weight":{"summary":"3 requests • 3 KiB","total":3258,"image":0,"imageCount":0,"script":0,"scriptCount":0,"document":1059,"font":0,"fontCount":0,"stylesheet":2199,"stylesheetCount":2,"thirdParty":0,"thirdPartyCount":0},"axe":{"passes":130,"violations":0}}'></speedlify-score>
```

It doesn’t seem great to render JSON in a data attribute like that but that’s how it works for now 🙃.

So we’ve eliminated the runtime requests to the Speedlify API—great!

The next logical step is to build-time render the component so that there isn’t any client-side JavaScript used at all 😅. I think that exploration has the potential to yield some very interesting Eleventy/Web Component crossover findings. My initial thought is to use a JavaScript class that you can consume in Node via `require` or `import`, in the browser via `import` or via a web component interface.

## The Final Boss

The final boss-level stage here is to get all of the Built With Eleventy sites onto Speedlify so that anyone can consume the Speedlify API results and put a Lighthouse score widget on their web site. That work is already underway. The logistics of running ~350 sites in Speedlify adds another level of complexity here but it should be achievable. Stay tuned.
