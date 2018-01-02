---
title: Yet Another Pretty Date JavaScript
author: Zach Leatherman
layout: post
permalink: /yet-another-pretty-date-javascript/
description: JavaScript to show the relative difference between a time and now.
categories:
  - project
tags:
  - highlight
  - project
  - feedtrim
  - popular-posts-total
postRankTotalViews: 15
daysPosted: 3572
yearsPosted: 9.8
---

I can’t let this Pretty Date thing go. I decided to use a modification of [John Resig’s Pretty Date JavaScript implementation][1] written by Dean Landolt and shared in the comments on John’s page. The script was an obvious choice for the next iteration of [Alarmd][2], which is nearing completion as I type.

 [1]: http://ejohn.org/blog/javascript-pretty-date/
 [2]: http://www.zachleat.com/web/2007/06/18/wake-up-to-youtube-on-my-internet-alarm-clock/

The more I used [Dean Landolt’s script][3], the more problems I began to see with his implementation. It was a good start, but definitely had bugs. His assumptions translating from integer second differences to human readable labels stretched too far at times (there is an error in logic to say anything between 24 hours and 48 hours from now can be labeled “Tomorrow”), and he was a bit loose with his difference categories (assumed average month length was 28 days, and always used Math.floor instead of rounding — 47 hours from now would be labeled “1 Day”). It was great code otherwise, and I definitely liked the way he used the while loop to run through the comparisons.

 [3]: http://deanlandolt.com/archives/163

So, I’ve cleaned up his great start, and am releasing it to the world in the spirit of cooperation and open sauce. You just read that typo out loud didn’t you?

**Download**: [Yet Another Pretty Date Implementation][4] (2 KB)

 [4]: http://www.zachleat.com/Lib/jquery/humane.js

**Update**: Dates for this script must have a specific [ISO8601 format][5]: *YYYY-MM-DDTHH:MM:SSZ* (in UTC) where T and Z are literals.

 [5]: http://en.wikipedia.org/wiki/ISO_8601

**Update**: This script has been moved to [Github][6].

 [6]: http://github.com/zachleat/Humane-Dates
