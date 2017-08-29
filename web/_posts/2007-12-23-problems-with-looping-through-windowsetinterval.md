---
title: Problems with Looping through window.setInterval
author: Zach Leatherman
layout: post
permalink: /problems-with-looping-through-windowsetinterval/
Version Specific Article:
  - Firefox 2
categories:
  - JavaScript
  - Web Browsers
tags:
  - deprecated
  - feedtrim
---

Look at this code. What do you expect to be the outcome?

    var d = new Date();
    var r = [];
    for(var j=0,k=2;j<k ;j++) {
        window.setInterval(function()
        {
            var next = new Date();
            r.push(next.getTime() - d.getTime());
        },1000);
    }

Every 1000 milliseconds (1 second), the `r` array should have three delta timestamps added into it (one for each interval set in the for loop). In FireFox, however, there are exactly nine delta timestamps added per second. If you set `k=10`, the result is one hundred delta timestamps per second. If anyone has the answer, I am curious, even if the result is that I'm an idiot. It seems to work correctly in Internet Explorer 7. Thanks for your help, internet.
