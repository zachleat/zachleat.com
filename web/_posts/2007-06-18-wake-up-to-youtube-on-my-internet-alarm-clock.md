---
title: Wake up to YouTube on my Internet Alarm Clock
author: Zach Leatherman
layout: post
permalink: /wake-up-to-youtube-on-my-internet-alarm-clock/
project_name: ALARMd
description: >-
  First iteration of the alarm clock that plays YouTube videos or other
  multimedia sources. Updated to ALARMd 2.
categories:
  - project
tags:
  - highlight
  - project
  - feedtrim
  - popular-posts-total
postRankTotalViews: 8
daysPosted: 3851
yearsPosted: 10.6
---

**Update**: Try the new [ALARMd 2 Beta][1], with Google Calendar integration and offline Youtube caching.

 [1]: http://www.zachleat.com/web/2008/04/06/alarmd-2-beta-with-google-calendar-integration/

Did you take your contacts out last night and you can’t see the time on your alarm clock from all the way across the room? 

I’m here to calm your fears. Enter [ALARMD, the Internet Alarm Clock][2]. Wake up to any Youtube video (that allows embedding), a last.fm user stream or tag, or any mp3 hosted online. There are a few defaults in there, but you can add and modify your own.

 [2]: http://www.zachleat.com/Projects/alarmd/

![Now that's an alarm clock](/web/img/posts/alarmd.jpg)

Features:

*   Supports multiple alarms (ALT R to add an alarm or use the Add Alarm button).
*   Options for 24 Hour (Military) time and Seconds display
*   Supports MP3 (hosted online), YouTube videos (that allow embedding), and last.fm user or tag streams.
*   Key Mash Mode to kill the alarm (hit five random keys in one second)
*   Time Font Size customization (automatically size to the width of the window using the Max option)
*   Typical alarm clock colors: Red, Green, or Blue
*   Alarm Toggle based on the Day of the Week
*   Test button to make sure your speaker volume is set correctly.
*   Sleep Mode button to get rid of the extra GUI while you don’t need it.
*   Save all of your settings, URL’s, and alarms locally in a cookie (you **don’t** need yet another account to use this)

Things to think about:

*   Power Settings – disable your screen saver, or any sort of automatic suspend or sleep setting. In my testing, having your monitor go into power save mode is acceptable, and the alarms will still sound (but you might want to test this yourself and leave a comment with your result).
*   You might not want to use with a CRT, for fear of burn in.
*   Personally, I like to use this in Opera, just because their default full screen mode (F11) doesn’t have toolbars or a status bar. But you can use the [Fuller Screen Firefox plug-in][4] to soup up your Firefox for similar functionality.
*   Word of warning, the window **must** have focus to autoplay YouTube videos.
*   Make sure your local time on your computer is correct, especially if you are traveling between time zones. It doesn’t do any server side validation on the time (yet?).

 [4]: https://addons.mozilla.org/en-US/firefox/addon/4650

Possible Future Improvements:

*   Countdown mode, displays amount of time until next alarm in place of the clock (good for timed presentations, where you want to see how much time is left before you have to quit).
*   Google Gears integration for offline mode (if your internet goes out during the night)
*   Support customizing source URL’s on a per alarm basis.
*   Support days of the week toggle on a per alarm basis.
*   Support user specified color customization.
*   A crescendo alarm MP3 that increases in volume for a more peaceful wake up experience.
*   An alarm MP3 with especially violent noises for heavy sleepers.
*   An alarm MP3 of my mom’s voice to get that nice feeling of childhood back.

This internet application was built using the Yahoo UI Libraries (YUI) and Jack Slocum’s Ext DomQuery class. It is written entirely without using any server side programming languages, and therefore can be saved to your local machine. Not that anyone might want to use the Internet Alarm Clock, but if you do, I declare it officially released under the BSD license. Just don’t forget to cite the source when you redistribute.

**Update**: added a couple more things to think about.
