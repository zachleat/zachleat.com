---
title: I’m Taking Ownership of My Tweets
date: 2019-09-16
tags:
  - project
---
**_Update November 28, 2022:_ This project [has now been open sourced as Tweetback](/web/tweetback/).**

I’ve invested a lot into Twitter and I’ve received a lot of value from Twitter. I’ve made a lot of friends and professional connections on the site. I’ll be sad when Twitter goes away. Without a doubt, it will go away. It’s only a question of when.

I fully expect my personal website to outlive Twitter and as such have decided to take full ownership of the content I’ve posted there. In true [IndieWeb](https://indieweb.org/) fashion, I’m taking ownership of my data.

<p class="primarylink">Check out an early release of <a href="/twitter/">@zachleat’s Twitter Archive</a></p>

## Features

* Each tweet has its own independent page: `zachleat.com/twitter/:id`.
    - If you have an existing URL to one of my tweets, you can easily translate it to my self hosted version. `twitter.com/zachleat/status/905054076408393729` becomes `zachleat.com/twitter/905054076408393729`
    - This was also a very interesting stress test for [Eleventy](https://www.11ty.dev/), as it generates 27K pages with every run of the build 😲
    - Each tweet page has some nice pagination links at the top to navigate between tweets (historically).
* Super [fast HTML first rendering](/twitter/1169998370041208832/) (that tweet is 2.0 KB for the entire page)
* Focus on the text first and less on the media. Links to external media are included ([sample](/twitter/1171621079745540096/)) and Videos, images, and animated GIFs are supported. Media are not self hosted (yet) and uses a `max-height` of `10em`. All media are scrunched into a single row. Media is _not_ upscaled like Twitter likes to do on their web site 😱
* Links:
    * t.co links are bypassed and original hyperlinks URLs are displayed and used.
    * Things are linkified the same as on Twitter: users, tweets being replied to, nicer non-truncated URLs
    * Nicer link formatting for links-to-tweets: `@username/:id`.
    * Internal links to my own tweets stay within the archive and don’t link out to Twitter.
* My tweets are threaded (both forwards and backwards) ([sample](/twitter/1171427770850672640/))
* While I could display favorite and retweet counts, I don’t on individual tweet pages. I only display those on the [popular tweet page](/twitter/popular/).
* Positive and negative sentiment analysis for each tweet (e.g. `Mood +8`). See the [most positive and most negative tweets](/twitter/sentiment/).
* Support some markdown: I sometimes use `` `backtick` `` markdown notation for code in my tweet text. This translates to `<code>` properly.
* Works initially from the [Download your Twitter data](https://twitter.com/settings/your_twitter_data) feature, but also supplements with the Twitter API to update as new tweets are published (that way I don’t have to keep re-exporting every time).

## Analytics

All of these are linked up on the [Twitter Archive home page](/twitter/). The only thing that surprised me here was that 60% of my tweets are replies—wow!

* [Popular tweets](/twitter/popular/)
* Most retweeted and replied to
* If any [filthy AMP URLs](/twitter/amp/) have leaked into my tweets (I actively try to avoid these, but one snuck in there)
* [Most Positive and Negative Tweets](/twitter/sentiment/)
* Top swear words
* Top emoji
* Top hashtags

## The Backlog 😅

* `alt` on media. It was suspiciously [missing from the data export](/twitter/1171427770850672640/). 😱
* Clean up the code a little bit for publishing so others can use it (this includes some outstanding color contrast issues 😱)
* Use a better typeface 😎
* Some kinda widget for embedding archive tweets in other pages.
* Make a tool (maybe a bookmarklet) to automatically translate URLs from twitter to my archive.
* Search
* I purposefully do not include others tweets (unless I’ve retweeted them). I need to add a mechanism to remove retweets if they have been deleted upstream.
* Retweet and favorite counts, while minimized, are not yet updated—they are fixed to when the tweet was inserted into the database.
* Hashtags are not yet linked in tweet text 🤷‍♂️
* Some nicer data visualizations and graphs

