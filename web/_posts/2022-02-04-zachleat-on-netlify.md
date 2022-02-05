---
title: Migrating my 16+ year old web site to Netlify in a few short days
---
Yes, I work at Netlify.

Yes, I hit my two year anniversary of working at Netlify a week ago.

And no, my site—prior to this week—was not hosted on Netlify.

Why? Pure, unadulterated procrastination. I should have moved it over sooner. I’m very glad to have made the move. Let’s do a quick summary of the process and the pitfalls I ran into—as well as the benefits I’m seeing after the migration.

## `git` Submodules

I have a bunch of microsites that live on my primary domain. I had experimented with `git` submodules for these, but these were a bit painful to manage. I switched these over to use [`degit`](https://github.com/Rich-Harris/degit) instead.

For example my [Unicode Range Interchange project](/web/unicode-range-interchange/) lives at `/unicode-range-interchange/` but the source code for it [lives in a different repo entirely](https://github.com/zachleat/unicode-range-interchange). I could have hosted this on a separate app on Netlify and solved this using a [proxy redirect](https://docs.netlify.com/routing/redirects/rewrites-proxies/), but for simplicity I decided to keep it local and in the same build. _(It’s worth noting that using this approach means updates to `unicode-range-interchange` require a `zachleat.com` build to see them in production, which has its own benefits and drawbacks—specifically thinking about rollbacks here)_

I added this to my build script to check out the project at build time and place the contents directly into my output directory (`_site/unicode-range-interchange`):

```
npx degit zachleat/unicode-range-interchange _site/unicode-range-interchange
```

## Atomic Builds

### Bad Analytics Code

The method I was using to inject analytics-driven popularity data on my site (see [Popular Posts](/web/best-of/)) relied (embarrassingly enough) on non-atomic builds. It used things in my `_site` directory and was pretty brittle. Because the `_site` directory doesn’t exist at the beginning of the build on Netlify, I had to rework this code (it was a good idea anyway, the code was bad).

* [`fetch-analytics-data.js`](https://github.com/zachleat/zachleat.com/blob/31f8cfa30d136aaa29b51d80e622f7834be8693e/fetch-analytics-data.js)

The pretty big limitation preventing a wider application of this code (why I haven’t made it a plugin yet) is that it relies a bit too heavily on my file name convention for blog posts (`YYYY-MM-DD-slug.md`) to calculate the PageViews per Day metric used on my site. Once I figure out a better way to generalize the solution there, I can publish this for re-use by others.

### Deleting Hand-rolled Code

My previous deployment method was using `rsync`. I got rid of all the code from my repo. I deleted six npm scripts that supported my old deployment process, whew. I was also able to get rid of a bunch of [custom code to add Brotli compression to my site](https://github.com/zachleat/zachleat.com/commit/2b0c00bf8ee7c5cb59e8bb0ae0702623e3edf9e5#diff-8e7e5f941c67b0cf481a9d650295119d4922b96117e7adc069ba30a81a78c65f) (now that’s [done for me automatically on Netlify](https://www.netlify.com/blog/2020/05/20/gain-instant-performance-boosts-as-brotli-comes-to-netlify-edge/)).

### Deployment Race Conditions

Before Netlify—without atomic builds and deploys—I was seeing production issues with some of my [automated OpenGraph image generation code](/web/automatic-opengraph/). Specifically, race conditions in my deployment script where the OpenGraph images would be requested _before_ the pages were uploaded causing HTTP 404 error pages to show up in the screenshots. 😱 Netlify solves this by flipping the switch from the old version to the new without cross-deploy contamination.

## Redirects

### Proxy Redirects Good

Frustratingly, some of the pages on my site used PHP. Most of the instances were small things, like using `sleep()` on a page to simulate poor network conditions, like these [Asynchronous CSS Loading tests](/test/async-css-loading/) (and on [GitHub](https://github.com/zachleat/async-css-loading)).

I left these in place and used Proxy redirects to shadow them from my old web host.

```
/test/async-css-loading/* https://zachleat.nfshost.com/async-css-loading/:splat 200!
```

I ended up using this same approach for my [Twitter Archive](/twitter/) too, which doesn’t actually use any PHP but I just simply couldn’t be bothered with migrating it yet 😅.

### Redirect Fidelity

Had a couple of `mod_rewrite` redirects leftover from my WordPress days when I used to use the full date in the path, kind of like `/YYYY/MM/DD/slug/`. Looked like this in my `.htaccess` file:

```
RedirectMatch 301 /web/\d{4}/\d{2}/\d{2}/(.*)$ /web/$1
```

It’s easy enough to move these into my Netlify `_redirects` file—however I lost some detail in the conversion. Now, it looks like this:

```
/web/:year/:month/:day/* /web/:splat 301!
```

Specifically, there is no way to ensure that `:year`, `:month`, and `:day` were only **numeric** (matching `/web/a/b/c/` when it would not have before). I need to be a bit extra careful with deeper paths on my site to ensure I don’t get unintentional redirecting. But in all fairness, I should probably retire these redirects—it’s been about 10 years since my site was on WordPress 😅.

## DNS go BRRRRRRRRR

I [tried to get too fancy with my DNS](https://twitter.com/zachleat/status/1488731993336647680). Here’s what I wish I had done (we don’t need to belabor what I did—late at night—which was bad 😅 and caused an outage on my site).

I wish I had gone all in on Netlify DNS from the beginning. Specifically, following these steps:

1. Configure Netlify DNS and copy the same DNS records from your old provider to your new provider (I had some extra ones for email).
1. Go to the Domain Management portion of your site’s Netlify settings and add the Domain Alias. Netlify will do the rest for you.
1. Change your Authoritative Name Servers on your old provider to point to Netlify’s servers. Don’t remove any DNS configuration or change any _other_ DNS settings on your old host. Leave everything else as-is. **Only update your Authoritative Name Servers to point to Netlify.** These changes may take a few days to propagate globally so you want to make sure the old and new way both work, simultaneously.

## Conclusion

The best Netlify features that I’m glad to have access to now:

* Super easy branch deploys for testing things out.
* Much easier `_redirects` syntax (and proxy redirects too!)
* Atomic deploys. A reliable rollback mechanism means that I can be much less stressed about deploys.
* And a brand new feature: [Scheduled builds!!](https://www.netlify.com/blog/quirrel-joins-netlify-and-scheduled-functions-launches-in-beta) Because all of my building happened on my development machine, there was no way for me to trigger a deploy from the cloud. Now I can update my popular posts every day, automatically.
* And having the site on a global CDN ain’t bad either.

I’m sure a bunch more great features will shake out in the future, but these are the biggest ones in my mind right now!