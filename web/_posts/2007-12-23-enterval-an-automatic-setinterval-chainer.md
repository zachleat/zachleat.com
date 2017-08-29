---
title: 'enterval, an automatic setInterval chainer.'
author: Zach Leatherman
layout: post
permalink: /enterval-an-automatic-setinterval-chainer/
categories:
  - JavaScript
tags:
  - Timers
  - project
  - feedtrim
---

Hello internet. Today we’ll be exploring the magical wonders of setInterval. Have you ever worked on a project that needed multiple timers going simultaneously? Have you ever wanted to bind all of those timer callbacks into just one timer without restructuring your code manually? Well, being the Curious George that I am, I wanted to know the performance benefits of the grouping callbacks and eliminating unnecessary timers. Here’s the code I used to do it:

Instead of:

    window.setInterval(function(){ /* Payload! */ }, 100);
    window.setInterval(function(){ /* Payload! */ }, 100);
    window.setInterval(function(){ /* Payload! */ }, 100); 
    // results in three separate timers.

You can do:

    enterval.set(function(){ /*Payload */ }, 100);
    enterval.set(function(){ /*Payload */ }, 100); // combines with the first 100ms interval.
    enterval.set(function(){ /*Payload */ }, 100); // combines with the first two 100ms intervals.
    // results in one timer, containing all three callbacks.

Here’s the code:

    var enterval = (function()
    {
        var intervals   = {};
     
        function add(callback, interval)
        {
            var index = 0;
            if(intervals[interval]) {
                index = intervals[interval].length;
                intervals[interval].push(callback);
            } else {
                intervals[interval] = [callback];
                window.setTimeout(call, interval, interval);
            }
            return interval+':'+index;
        }
     
        function call(interval)
        {
            var d = intervals[interval];
            for(var j=0,k=d.length;j<k ;j++) {
                if(typeof d[j] == 'function' && d[j]() === false) return;
            }
            window.setTimeout(call, interval, interval);
        }
     
        return {
            set: function(callback, interval, data)
            {
                return add(callback, interval, data);
            },
            clear: function(id)
            {
                var s = id.split(':');
                delete intervals[s[0]][s[1]];
            }
        };
    })();

Unfortunately, in the limited benchmarks that I performed, it didn’t seem to operate all that much differently from recursive setTimeout calls, even with (10ms, 100ms, or 1000ms) intervals and (50, 100, 1000) timers (with the payload doing nothing other than creating a date for benchmarking purposes. This code does get around the oddly performing [setInterval inside of a loop bug](http://www.zachleat.com/web/2007/12/23/problems-with-looping-through-windowsetinterval/). There may be some other benefit in ordering the interval callbacks after assignment, but I haven’t included that in the functionality above. Feel free if you wish.
