---
title: "Elevating Video Transcripts as Searchable Content"
tags:
  - web-components
seo:
  openGraphBackgroundImage: /og/sources/caption.jpg
  openGraphAlt: The word CAPTION spelled out in Scrabble tiles
posterImage:
  showOnPage: true
  height: 12em
  name: Monica Flores
  source: https://unsplash.com/photos/a-close-up-of-a-scrabble-tile-wall-with-words-written-on-it-p4mFOzM-asQ
---
I helped work on the [Jamstack TV project](https://jamstack.org/tv/) _(now dormant with the rest of the jamstack.org site, though the feature is still up)_, which used a lovely Algolia integration to allow deep searching of video transcripts. It was a really cool feature.

In [The Static Chronicles Twitch stream](https://www.twitch.tv/cloudcannoncms/schedule) ([episode 1](https://www.youtube.com/watch?v=KOyNEEmrvko) and [episode 2](https://www.youtube.com/watch?v=MrVMewBq0jE)), Mike and I explored an 11ty plugin to output the transcript of a YouTube video to allow video transcripts to be embedded into video posts, thus extending some of this feature to work with [Pagefind](https://pagefind.app/) (the static search engine).

I’ve wired this up on a few video posts on my site (that I know have higher quality transcripts/captions):

* [Live Editing an Eleventy Project in CloudCannon with Bookshop](/web/live-editing-cloudcannon/#searchable-transcript)
* [Building a multi-language Taylor Swift fan site (10 Minute Version) (Zach's Version)](/web/taylor-swift-fansite/#searchable-transcript)
* [Eleventy and CloudCannon: New Best Friends](/web/cloudcannon/#searchable-transcript)
* [The Eleventy v2.0 Release, a talk at the Eleventy Meetup](/web/eleventy-meetup-eleventy-v2/#searchable-transcript)
* [Exploring the Bounds of Jamstack on What the Jam](/web/what-the-jam#searchable-transcript)

The really cool part of these demos is that the actively playing video highlights the currently active portion of the transcript—and you can click any portion of the transcript to skip around on the video!

## The Pieces

There are a few web components at play here, but I don’t currently have the energy to formally publish them, so I’ll just link them up here:

1. A WebC component ([`youtube-deep-link.webc`](https://github.com/zachleat/zachleat.com/blob/b496bd2b0e6bba000fecdf36a82e91f97359b39d/_components/youtube-deep-link.webc)) server-fetches the transcript markup (caching it locally for 7 days) and enhances it with a `<youtube-deep-link>` custom element for timestamped buttons pointing to a `lite-youtube` element.
	* Notably, [this required upstream changes to `paulirish/lite-youtube-embed`](https://github.com/paulirish/lite-youtube-embed/pull/164) to access the YouTube Iframe JavaScript API. Until those are merged, you can use this drop-in fork on npm [`@zachleat/lite-youtube-embed`](https://www.npmjs.com/package/@zachleat/lite-youtube-embed).
1. A tiny [`<off-viewport>` web component](https://github.com/zachleat/zachleat.com/blob/b496bd2b0e6bba000fecdf36a82e91f97359b39d/static/js/offviewport.js) to toggle a class when an element is visible in the viewport. I use this to [put the video in the lower corner of the viewport](https://github.com/zachleat/zachleat.com/blob/24a8e346bac9df7bddaab35db303e111073b8fb2/static/defer.scss#L42-L53) as you scroll through the transcript. This one is a little tricky to use because it can take you into a rendering loop if you absolute/fixed/sticky the position of the `off-viewport` host element directly (so, uh—don’t do that).

## Conclusion

I’ve been making more and more videos and I _really_ like escalating that content as first-party text on my static site too. Investing in high quality closed captions (as a way to make the videos more accessible) elevates the content and aligns it more closely with my existing stack of tools.
