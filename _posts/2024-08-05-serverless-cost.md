---
title: "The Sneaky Costs of Scaling Serverless"
tags: eleventy
---
_Up front disclosures: I am a former Netlify employee (it’s been over a year ago) and currently receive sponsored hosting services from both Vercel and Netlify._

If I’m completely frank, the [11ty Screenshots API](https://www.11ty.dev/docs/services/screenshots/) has been a bit of a maintenance annoyance over the years: it’s a beefy bundle and a bit of a resource hog. Historically Netlify has graciously provided hosting, but I’ve been getting increasingly uneasy about having all of my eggs in one hosting basket.

So I decided to take the plunge and migrate it elsewhere, mostly to see what it would really cost. I learned a few things along the way (and made a few mistakes)—hopefully writing them up can help you save some money on your hosting bill, too.

## First stop, Vercel

The 11ty Screenshots API uses headless Chromium and Puppeteer, provided via [a community fork of Chromium](https://github.com/Sparticuz/chromium) to fit inside the various bundle file size limits of hosting providers (Netlify is 50 MB compressed, Vercel is 250 MB uncompressed).

The deployment to Vercel was quick and easy: without hiccups. The live-updating Domains panel in the Project Settings of the Vercel app is _very_ impressive. It tells you exactly what records to add to your DNS provider and recognized immediately when I configured things correctly. This was especially appreciated as I tend to _sweat_ when making DNS changes.

After letting it run exclusively on Vercel I started to get an idea for the production usage cost on Vercel. The Pro Tier ($20/month) provides 1000 GB-hours of included serverless function usage and in 12 days this service had already eaten 494.2 GB-hours of it! Given a 31 day billing cycle, this service alone was projected to use ~1276 GB-Hrs per month. Given my other serverless function usage this would have resulted in about $160 per month extra on the Vercel bill (charged at $.18/GB-Hr).

Sorry folks, I can’t afford to pay $2000 a year to run this!

## Next stop, AWS Lambda

Next, I bravely stepped into the vast barren desert of Amazon Web Services. This is a desolate place where developer experience goes to die. Instead of the lovely automated processes of Netlify or Vercel where a single project was bundled and deployed directly for me triggered by a GitHub commit—I had to do everything manually. There were so many steps. There were completely arbitrary hurdles placed in my way. But I did it. And I didn’t even stay at a Holiday Inn Express the night before.

Here’s a short summary of the steps:

1. Create an AWS Lambda Function.
1. Create a [Layer](https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html) for the larger Chromium dependency (for greater efficiency).
	* To create a Layer, you need to upload it via S3 because the Layer is larger than 10MB.
	* But also make sure your S3 bucket is in the same region as your Lambda because of *“reasons”*.
1. Create a JavaScript serverless bundle.
	* I used [esbuild](https://esbuild.github.io/) to create the single bundled JavaScript file.
	* The actual bundle deployment artifact was a zip file (~2MB) with a single JavaScript file in it.
	* Upload and deploy the serverless bundle.
1. Add API Gateway so that HTTP requests can reach the Lambda function.
	* Set up API Gateway so that the correct URL paths are configured and mapped to your Lambda function.
1. Added a caching layer via CloudFront so that repeat requests to the screenshots service (in the same region) would be cached.
	* This is where you set up how unique you want your cache to be. I went as aggressive as possible here. I configured the cache to be unique to the URL path, discarding uniqueness of headers, query strings, and cookies. I set a default TTL of one month and a maximum TTL of one year.
1. I then used [a Vercel Rewrite](https://vercel.com/docs/edge-network/rewrites) to point to the CloudFront instance.

After watching this in production for 4 short days, I think AWS is likely its new permanent home. Even though Lambda *only* gives you 111.11 GB-Hrs of usage on the free tier my current projected usage is only 90% of that! Mind-boggling that the same service would use ~1276 GB-Hrs per month on Vercel and ~101 GB-Hrs on AWS.

## Lessons Learned

### AWS is great for this style of service

This service will have very few updates, will be heavily cached, and the content is not personalized. If this was something I had to update regularly, I would need to automate some of the things I did on AWS (or just pay the convenience tax on another host). Luckily, I barely ever deploy this thing and this tradeoff feels like a good one.

Even though the deployment process was downright painful—it’s nice to have a better understanding of how to further configure different caching approaches (based on request params, cookies, headers, etc) for the future.

### Vercel Memory Defaults

Vercel’s Pro Tier defaults to higher memory usage and higher cost (1 vCPU). This might makes sense if you’re using it for very request-unique personalized content and don’t want to lean into server-side caching. Since I’m porting a heavily-cached public service, it makes sense to scale back the vCPU defaults to 0.6 (1024 MB memory) and save some money by leveraging the cache (make sure you run a deploy for this change to take effect).

Vercel claims that higher vCPU can translate to cost savings via reduced execution time, but that very broad claim seems like a stretch that I would need more data to buy into.

* Vercel: 1024 MB (default for Hobby tier), 1769 MB (default for Pro tier), or 3009 MB memory
* Netlify: 1024 MB (default)
* AWS Lambda: anywhere from 128 MB (default) up to 10 GB

### Why was Vercel’s Usage so inflated?

<table>
  <thead>
    <tr>
      <th>Host</th>
      <th>Invocations (~per day)</th>
      <th class="numeric">Usage Duration (~per day)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Netlify (14 days)</td>
      <td>6611.9 invocations</td><!-- 92567 -->
      <td class="numeric">3.659 GB-Hrs</td><!-- 51.23 -->
    </tr>
    <tr>
      <td>Vercel (12 days)</td>
      <td>40462.0 invocations</td><!-- 485545 -->
      <td class="numeric">41.183 GB-Hrs</td><!-- 494.2 -->
    </tr>
    <tr>
      <td>AWS (4 days so far)</td>
      <td>25383.75 requests<br>5960.7 invocations</td><!-- 23843 API gateway, 101535 Cloudfront -->
      <td class="numeric">4.436 GB-Hrs</td><!-- 63884 seconds, 17.74555556h -->
    </tr>
  </tbody>
</table>

Invocation counts on Vercel were about 6× larger than both other providers. Confusingly, Vercel’s invocation count (only uncached requests) was 1.6× the AWS _request_ count (cache + uncached). Huh?

The source code for the [Vercel variant of this project](https://github.com/11ty/api-screenshot/tree/v1-vercel) is on a `v1-vercel` branch on GitHub (if anyone wants to take a look—maybe I misconfigured something).

I kept expecting the Vercel server cache to kick in and reduce the invocation count (and execution duration) over time but it never did. I set all of my cache timeouts to the maximum (1 year) and invocation counts in usage statistics state that they do not include cache hits _([related discussion on Mastodon](https://fediverse.zachleat.com/@zachleat/112899549153465977))_.

<img src="/web/img/posts/serverless-cost/vercel-invocations-2.png" alt="Bar graph of serverless invocations on Vercel, showing invocation counts did not decrease over time">

Also note: the only usage stats I could still get out of Netlify (30 days retention) were at the tail end of using it, so the server cache was about _as warm_ as it could possibly be since the service was running there without a deploy for over a year. Confusingly, the AWS CloudFront cache was ice cold and still had much lower usage than Vercel.

* Vercel’s Edge Network cache is segmented in 18 regions and the [docs state that cache eviction is “best effort”](https://vercel.com/docs/edge-network/caching#limits).
* AWS CloudFront has [13 Regional Edge Caches](https://aws.amazon.com/cloudfront/features/). CloudFront also provides an [Origin Shield product to improve the number of cache hits](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-hit-ratio.html#cache-hit-ratio-use-origin-shield): I have not made use of this, yet.
* Netlify’s On-demand Builders provide [global persistence across all edge nodes](https://www.netlify.com/blog/2021/10/25/faster-more-reliable-page-loads-with-update-to-on-demand-builders/) (this is awesome)

### Usage-based Pricing is Sneaky

* Vercel’s vCPU is an unnecessary abstraction that further complicates pricing. Further, because usage is priced via GB-Hrs, **1 vCPU should use 1 GB of memory**. Instead, 1 vCPU is 1.7 GB of memory and 1000 GB-Hrs is actually 588 Hours of usage.
* Vercel [rounds execution time up to the nearest 50ms](https://vercel.com/docs/functions/usage-and-pricing). AWS charges you by the millisecond. (I’m not sure what Netlify does here)

I put together [a little spreadsheet that shows how different serverless providers grow based on _hours of usage_](https://docs.google.com/spreadsheets/d/1gsTXuAcZdjuvp0rt0HtL1w7WiyAljjRaDiojbWT_Sx8/edit?usp=sharing) at various memory configurations.

<a href="https://docs.google.com/spreadsheets/d/1gsTXuAcZdjuvp0rt0HtL1w7WiyAljjRaDiojbWT_Sx8/edit?usp=sharing"><img src="/web/img/posts/serverless-cost/graph.png" alt="Serverless Costs (shared) Google Sheet"></a>

It’s worth noting that Netlify’s prices charge $25 _per site_ over the 100 GB-Hrs usage mark (so don’t assume that you can add up the usage for a bunch of projects and use this same graph).

## TL;DR

* I’d recommend switching to use 0.6 vCPU (1024 MB memory) on Vercel Functions if you’re on the Pro tier (unless you know that your project will benefit directly from more memory). Otherwise, Vercel’s pricing quickly goes to the moon after ~500 hours of usage so make sure you watch it closely.
* Is anyone else seeing inflated invocation count metrics on Vercel?
* AWS is a huge pain to setup but it’s nice to have a fallback plan that isn’t going to cost an arm and a leg.
* Netlify’s pricing (and overage pricing) are very good!