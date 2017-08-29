---
title: '20000 Leagues Under the API: YouTube JavaScript'
author: Zach Leatherman
layout: post
permalink: /20000-leagues-under-the-api-youtube-javascript/
categories:
  - CSS
  - JavaScript
  - Reviews
tags:
  - Youtube
  - feedtrim
---

Today, children, we’ll be exploring the wonderful world of the official JavaScript API published by YouTube a few weeks ago. I read a [few][1] [interesting][2] [posts][3] on the subject when it first came out, and it’s been on my list of things to explore for the next (and hopefully last) version of [Alarmd][4]. This isn’t going to be a long post so much as a laundry list of points worth mentioning and limitations there-of regarding the API itself.

 [1]: http://apiblog.youtube.com/2008/03/something-to-write-home-about.html
 [2]: http://blogoscoped.com/archive/2008-03-14-n11.html
 [3]: http://www.wait-till-i.com/2008/03/12/video-captioning-made-easy-with-the-youtube-javascript-api/
 [4]: http://www.alarmd.com/

1.  If you want to change videos dynamically by loading a new video into an existing player, you must use the Chromeless player (which requires an API key). The loadVideoById() method is only available in the Chromeless player. Whatever you do, don’t try to dynamically destroy and create a new player, this will cause JavaScript errors in Internet Explorer (although not Firefox).
2.  CSS properties: When the player has the css `display: none` applied, it will not play. When the css `visibility: hidden` is applied, the video will still play, but will not be shown on the screen. If you wanted a headless player, like what the music search engine [Songza][5] does, you’d want to take this approach. Word of warning, there’s some tricky shit going on when you try to dynamically change these properties on a player and run commands on the player at the same time (or close to the same). For instance, I got into a sticky situation where I’d try to show the player and load a new video into the player in the same method. I had to separate these with a timeout to get both to run without error.
3.  To load, you must play. Unfortunately, I wanted to pre-load the video without actually playing the video. This is unsupported. To handle this, I had to play, then pause after a timeout (using window.setTimeout). Not the prettiest, but it seems to work. Obviously the API in this case has very low cohesion, as the loadVideoById method ALSO plays the video, not simply doing ONLY what the method name suggests.
4.  Forcing a global? When the player first loads after you’ve used the SWFObject embedSWF() command, it will call the function onYouTubePlayerReady(), which you can’t customize. It must be that function name, and it must be in the global namespace. Keep in mind that onYouTubePlayerReady() is called every time the player is shown (when it was otherwise hidden using the css `display: none`)

 [5]: http://humanized.com/weblog/2007/11/13/songza-launch/

Unfortunately, there is some voodoo going on here that I don’t fully understand. I’m not a flash guru, nor have I ever claimed to be. But there have been a few bugs in my experience with the API that have led me to believe that it’s not quite there yet. Maybe my use cases were a bit unique, but they weren’t that extreme. I should be able to hide and show the player without error. I should be able to destroy the player without error. I should be able to load a video without playing it.

But hey, it works.
