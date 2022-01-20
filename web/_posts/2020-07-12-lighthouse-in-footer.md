---
title: I added Lighthouse Scores to my Site’s Footer and You Can Too
tags:
  - project
  - popular-posts
postRank: 15
---
[Speedlify](/web/speedlify/) started with a very simple goal: make it easy to continuously check a site’s performance. As my friend [Scott Jehl](https://scottjehl.com/) has said, “it can be easier to make a site fast than to keep it that way.” And as a performance advocate, I feel that it’s important to keep myself honest and to have some transparency behind the sites I build.

<div class="primarylink"><a href="https://www.speedlify.dev/zachleat.com/">Speedlify for zachleat.com</a></div>

In that vein, I decided to experiment with publishing Lighthouse scores of some of the pages on my personal web site onto the actual pages themselves. This does have a small performance cost associated with it, but eventually I hope to optimize it away when my personal site has a bit better Jamstack architecture behind it.

## Fetching the Lighthouse Score

If you don’t care _how_ this works and just want to set it up—skip to the next section!

Obviously the costliest and most resource intensive piece of adding this feature to my site would be running the Lighthouse tests. I certainly wouldn’t want to run these on every page visit. Luckily Speedlify handles this for me—it’s already testing a bunch of pages on my site and it’s set up to only run once a day. All I needed to do was to add a static API, which is just a fancy way of saying that I used Eleventy to generate a bunch of static `JSON` files in an `/api/` directory.

There are two API pieces here:

* [`https://www.speedlify.dev/api/urls.json`](https://www.speedlify.dev/api/urls.json) is the full list of all URLs tested by speedlify and their shorthash codes.
* A result file for each URL, e.g. [`https://www.speedlify.dev/api/bbfa43c1.json`](https://www.speedlify.dev/api/bbfa43c1.json) `bbfa43c1` is the hash code supplied by `urls.json` and `bbfa43c1.json` contains the most recent run’s results.

Speedlify tests once a day. I do not deploy my personal site every day (don’t tell my employer but my personal site is not yet on Netlify 😭—I wish it were but haven’t migrated it yet). This is a problem (for multiple reasons), right? If I consume the API data when I deploy my personal web site the results would be stale when Speedlify runs the next day! To workaround this temporary limitation I decided to use the Fetch API to grab the data client-side using JavaScript.

This is marginally _okay_ as the widget is hidden at the very bottom of the page in the footer. But _when_ I migrate my personal site to Netlify, this won’t be necessary. Ideally I would add a webhook in Speedlify to re-build my personal site every time the results change and delete that client-side JavaScript altogether. _Yet another shining example of how a Jamstack architecture can improve front-end performance by making a chunk of clientside JavaScript no longer necessary._

## Adding this to your Eleventy site!

I’ve hopefully streamlined the setup here enough that you can use this up for your own site too (if you’re already using Eleventy). Three steps here:

1. Run your own Speedlify instance. You can learn more at [the GitHub repository](https://github.com/zachleat/speedlify/) or just click this button <a href="https://app.netlify.com/start/deploy?repository=https://github.com/zachleat/speedlify"><img src="/img/deploy-to-netlify.svg" width="146" height="32"></a>
	* Modify the files in Speedlify’s `_data/sites/*.js` folder with your own URLs!
2. Consume the Speedlify API data files—they are generated automatically with your Speedlify instance.
	* Use [Eleventy’s Cache Assets plugin](https://github.com/11ty/eleventy-cache-assets) {% highlight bash %}npm install @11ty/eleventy-cache-assets --save-dev{% endhighlight %}
	* Copy and paste the small [`speedlify.js` Eleventy global data file](https://github.com/zachleat/zachleat.com/blob/e6c9cc7eb3e05ba06d34c909bbf36eb9dea84273/_data/speedlify.js) to your global data directory. This tells us which URLs are speed tested in Speedlify. Change the URL in `speedlify.js` to point to your `/api/urls.json` file. Mine is `https://www.speedlify.dev/api/urls.json`.
3. Use the [`<speedlify-score>` Web Component](https://github.com/zachleat/speedlify-score/). (_These instructions were updated July 17, 2020_)
	* `npm install speedlify-score`
	* Add the `speedlify-score.js` JavaScript and the `speedlify-score.css` CSS to your page.
	* Add the `<speedlify-score>` markup to your page where you want the score to show up. I’d recommend putting it in the footer of your page.
	* Use the `speedlify.js` Eleventy global data file we added earlier to set the `hash` attribute. Have a look at [my `footer.html` to see how I did it using Liquid templates](https://github.com/zachleat/zachleat.com/blob/cb3ea00450be79d2b9233bac9fcbcf945ea72397/_includes/footer.html#L16-L21) (only lines 16 through 19).
	* Also set the `speedlify-url` attribute to point to your Speedlify instance. Mine is {% highlight html %}speedlify-url="https://www.speedlify.dev"{% endhighlight %}

## Go forth and speed test!

Hope you were able to stumble through those instructions okay—I would love to see examples of this in the wild if you do get it working. Please send them my way!
