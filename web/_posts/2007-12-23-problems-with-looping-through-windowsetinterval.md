---
title: 'Problems with Looping <span class="widow">through window.setInterval</span>'
author: Zach Leatherman
layout: post
permalink: /problems-with-looping-through-windowsetinterval/
Version Specific Article:
  - Firefox 2
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299719394:0
categories:
  - JavaScript
  - Web Browsers
tags:
  - Firefox
  - Timers
---
# 

Look at this code. What do you expect to be the outcome?



    var d = new Date&#40;&#41;;
    var r = &#91;&#93;;
    for&#40;var j=,k=2;j