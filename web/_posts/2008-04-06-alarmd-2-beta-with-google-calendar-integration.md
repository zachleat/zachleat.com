---
title: 'ALARMd 2 Beta, with Google Calendar Integration'
author: Zach Leatherman
layout: post
permalink: /alarmd-2-beta-with-google-calendar-integration/
project_name: ALARMd 2
description: >-
  An online alarm clock that wakes you up to YouTube, Pandora, MP3 or other
  multimedia source. Featuring integration with Google Calendar.
headimage: /web/wp-content/uploads/2009/12/Screen-shot-2009-12-30-at-10.50.03-PM.png
categories:
  - project
tags:
  - highlight
  - project
---

[Take a look: ALARMd 2 Beta][1]

 [1]: http://www.zachleat.com/Projects/alarmd-beta/

***Update**: added Metric and Unit Circle time formats.*

I know, some of you are reading this and thinking to yourself — genital herpes is more appealing than yet another online alarm clock. But to that I say, congratulations, that’s one of the new features in ALARMd 2!

Why did I make another online alarm clock? Mostly due to missing features and limitations in the old version, but also because it’s a good exercise in JavaScript programming and User Interface design. Everyone likes to hone their skills, and this is my publicly viewable work desk. But the real reason I went back to rewrite the old version is that I’m hooked on [jQuery][2]. I can’t get enough of that sweet, sweet, source code, and couldn’t stand to see my old, crusty, handwritten DOM manipulations polluting web browsers across the world. Users of the Yahoo User Interface Library (what I used for the original version of ALARMd) would do well to consider jQuery a nice plugin to be used alongside YUI. It will clean up your code MAX_INT-fold.

 [2]: http://jquery.com

Here are a few new features and addressed limitations in ALARMd 2.

*   Easy Alarm Mode: No more fumbling around when you just want one simple easy-to-add alarm.
*   Google Calendar Alarm Mode: Customize your alarm schedule to your heart’s content, it will load your alarms straight from a publicly available Google Calendar. There are some great features with this: 
    *   Load only the first calendar event of every day
    *   Day Limiter (Example: Only load calendar events within the next 3 days)
    *   Minute Adjuster (Example: Alarm me 90 minutes before work without adding a separate event)
    *   Google does a nice job of normalizing dates as well, so you don’t have to worry about calendar time syncing. If it says 8AM on your calendar, it’s going to alarm you at 8AM on your computer’s local time.
*   New Clock Formats: 
    *   Human Readable Clock Format: Think “Half Past Two”, or “Quarter Til Twelve”. This idea is from [Laurence Willmott’s Project “It’s about Time”][3]. I took some liberties with his labeling scheme, I hope he doesn’t mind too much.
    *   [Metric Time Format][4]: Shows the measurement Centi-days in Local Metric Time. Basically, it’s a percentage of much of the day has passed. If it’s 80.000, 80 percent of the day has passed, which coincides with 7:12 PM.
    *   Unit Circle Time Format: Displays the time in radians that would be shown if a clock were [pasted on top of a unit circle][5]. If it’s 12 o’clock, it will read π/2. After programming this one, it’s starting to seem normal in my brain. Oh, it’s 3π/2? Time to eat dinner. How the hell did it get 2π/3??
*   [Human Readable Alarm Dates][6]: Think “29 Minutes”, “1 Hour”, “2 Days Ago”.
*   Much cleaner interface, using a jQuery accordion to display the options.
*   The old ALARMd required an internet connection for all sources, and provided no safeguard if your internet went down whilst you were sleeping. ALARMd 2 preloads all Youtube videos in the background when the page loads using the new [Youtube JavaScript API][7]. A nice benefit of this is that the browser window no longer requires focus to play the YouTube video.
*   Less clunky interface for adding new alarm sources.
*   Repeat option for YouTube videos and MP3′s. Turn infinite loop on or off. Careful with this one. Don’t leave ALARMd going if you’re not going to be home when it goes off.
*   CSS Skins, Use the really simple ones I’ve included for Red, Green, or Blue, or include your own URL to your own hosted CSS file. Have a good skin? I’ll include it in the select list and give you some props here, just link to it in the comments below. Use some CSS class hooks to spice up your skins (they are mutually exclusive). These are CSS classes that are added to the body tag to allow you to style the alarm differently depending on the alarm clock’s current state. *Future enhancements* might include more than just alarm-based hooks: Year, day of the year, and hour of the day might be useful, that way you could style the clock to show a lighter background during the day and a darker background at night. 
    *   .alarmWithin30Minutes
    *   .alarmWithin15Minutes
    *   .alarmWithin5Minutes
    *   .alarmWithin1Minute
    *   .alarmActive (Alarm is being played)
*   Still has all the old favorites: 
    *   Test Button to make sure the video or source is working and to check your volume.
    *   Count Down mode to show the time between now and the first alarm.
    *   Store your own list of alarm sources, using YouTube, MP3, Last.FM, or any URL (Pandora is included).
    *   Military time (24 hour clock) and seconds toggle.
    *   Naked mode (get rid of the extras)

 [3]: http://www.insightoutsight.co.uk/viewproject.php?cid=2&pid=3&iid=2
 [4]: http://zapatopi.net/metrictime/
 [5]: http://www.cafepress.com/poofietomato.49111330
 [6]: http://www.zachleat.com/web/2008/03/23/yet-another-pretty-date-javascript/
 [7]: http://apiblog.youtube.com/2008/03/something-to-write-home-about.html

Finished reading? I’m surprised you didn’t click the link at the top: [ALARMd 2 Beta][1]

Remember, this is BETA. That means it’s new. I’ve done my best to test and code out all the kinks, but there may be a few that slipped through. Try it out and please report any bugs. And once again, this code is released under the BSD license.

I’ll probably move this to the main ALARMd.com domain shortly.

Alarmd has been personally tested with Firefox 2, Firefox 3, Internet Explorer 7, Safari 3.1, and Opera 9.27, all on Windows. Google GDATA reports an unsupported browser error on Safari and Opera, which you can hide using custom CSS.
