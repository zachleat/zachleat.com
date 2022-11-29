---
title: "Archive your Tweets with Tweetback"
---
_Twitter, it’s not me—it’s you._

In October of 2019, I gave a talk at Jamstack Conf San Francisco titled [Owning your Content on Social Media](https://www.zachleat.com/web/own-your-content/).

> For this talk I built a social media platform: MySpaceBook.​info, the only social media site exclusively for astronauts. Unfortunately midway through the presentation an investor called me up to make an offer on the site and I was left with no choice but to sell it, taking all of the user data down with it.

Apropros of nothing and in no way related to the scenario foretold in prophecy, [I’m no longer hanging around on Twitter](/web/vote-with-your-tweet/).

In the Jamstack Conf talk, I went through how one might build a local archive of your Twitter content, [as I had done and documented separately](https://www.zachleat.com/web/own-my-tweets/) a month or two prior. This archive now lives at [`zachleat.com/twitter/`](https://www.zachleat.com/twitter/).

_Cue crickets._

As Eleventy started to take off, I suddenly had very limited time to dedicate to cleaning up this archive for others to use. A lot of folks asked me about it and whether I was going to open source it. I always punted—it felt like an open source burden that I just didn’t have the bandwidth to take on. This continued for, well… years! Until a few weeks ago when long-time Eleventy community member [{% indieAvatar "https://nicolas-hoizey.com" %}Nicolas Hoizey](https://nicolas-hoizey.com) volunteered to help maintain the thing!

## Tweetback

And thus, [**Tweetback** was shipped](https://github.com/tweetback/tweetback/).

### Build Performance at Scale

Tweetback is built with [Eleventy](https://www.11ty.dev/) and I do think Eleventy plays a special role here. Eleventy is a production ready, stable site generator that now has very concrete public proof of [~50,000](https://www.zachleat.com/twitter/) and [&gt; 100,000](https://twitter.nicolas-hoizey.com/) page builds.

Given tests previously conducted across a variety of site generators in the JavaScript ecosystem, this reveals the unique space that Eleventy lives in (and a competitive advantage). With all due respect to the unique capabilities of other tools, I do not think [Next.js or Gatsby or Astro would be able to handle a similar scale of project](/web/build-benchmark/). I do welcome evidence to the contrary!

### Tweetback Features

* Each tweet has its own independent URL (with backwards/forwards threading!)
* _(This is my favorite)_ Tweetback globally replaces canonical twitter URLs to point to other known archives:
	* Archives known to [`@tweetback/canonical`](https://github.com/tweetback/tweetback-canonical) will change twitter.com URLs to use decentralized archive production URLs instead.
* `t.co` links are transformed to the original hyperlink URL.
* Locally cache the high quality versions of images.
* Links to users, tweets, non-truncated URLs.
* Nicer link formatting for links-to-tweets: `@username/:id`.
* Translates \`backtick\` markdown notation to `<code>` properly.
* Analytics:
	* See your most popular tweets
	* Who you retweet the most
	* Who you reply to the most
	* Frequently used swear words
	* Top emoji
	* Top hashtags

### Demos (at time of writing)

* `@zachleat`: https://www.zachleat.com/twitter/
* `@eleven_ty`: https://twitter.11ty.dev/
* `@nhoizey`: https://twitter.nicolas-hoizey.com
* `@matthewcp`: https://matthewphillips.info/tweets/
* `@rknightuk`: https://hellsite.rknight.me
* `@steren`: https://twitter.steren.fr
* `@saneef`: https://tweets.saneef.com/
* `@accudio`: https://twitter.alistairshepherd.uk
* `@cutewitchphoebe`: https://twitter.catgirlin.space
* `@type__error`: https://twitter.localghost.dev
* `@Chr1sHayes`: https://tweetback.hayes.software
* `@terribleMia`: https://tweets.miriamsuzanne.com
* `@iamchrisburnell`: https://twitter.chrisburnell.com
* `@overflowhidden`: https://tweets.kimjohannesen.dk

## Now you!

If you’ve been discouraged by Twitter’s direction, a great start to moving away from Twitter is to get your data off of the service. [Tweetback can help you do that](https://github.com/tweetback/tweetback/).

If you ship a Tweetback site, I’d love to [hear about it on Mastodon](https://zachleat.com/@zachleat) 😇.