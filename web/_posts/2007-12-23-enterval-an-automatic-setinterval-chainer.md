---
title: 'enterval, an automatic <span class="widow">setInterval chainer.</span>'
author: Zach Leatherman
layout: post
permalink: /enterval-an-automatic-setinterval-chainer/
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299725869:0
categories:
  - JavaScript
tags:
  - Timers
---

Hello internet. Today we’ll be exploring the magical wonders of setInterval. Have you ever worked on a project that needed multiple timers going simultaneously? Have you ever wanted to bind all of those timer callbacks into just one timer without restructuring your code manually? Well, being the Curious George that I am, I wanted to know the performance benefits of the grouping callbacks and eliminating unnecessary timers. Here’s the code I used to do it:

Instead of:

    window.setInterval&#40;function&#40;&#41;&#123; /* Payload! */ &#125;, 100&#41;;
    window.setInterval&#40;function&#40;&#41;&#123; /* Payload! */ &#125;, 100&#41;;
    window.setInterval&#40;function&#40;&#41;&#123; /* Payload! */ &#125;, 100&#41;; 
    // results in three separate timers.

You can do:

    enterval.set&#40;function&#40;&#41;&#123; /*Payload */ &#125;, 100&#41;;
    enterval.set&#40;function&#40;&#41;&#123; /*Payload */ &#125;, 100&#41;; // combines with the first 100ms interval.
    enterval.set&#40;function&#40;&#41;&#123; /*Payload */ &#125;, 100&#41;; // combines with the first two 100ms intervals.
    // results in one timer, containing all three callbacks.

Here’s the code:

    var enterval = &#40;function&#40;&#41;
    &#123;
        var intervals   = &#123;&#125;;
    &nbsp;
        function add&#40;callback, interval&#41;
        &#123;
            var index = ;
            if&#40;intervals&#91;interval&#93;&#41; &#123;
                index = intervals&#91;interval&#93;.length;
                intervals&#91;interval&#93;.push&#40;callback&#41;;
            &#125; else &#123;
                intervals&#91;interval&#93; = &#91;callback&#93;;
                window.setTimeout&#40;call, interval, interval&#41;;
            &#125;
            return interval ':' index;
        &#125;
    &nbsp;
        function call&#40;interval&#41;
        &#123;
            var d = intervals&#91;interval&#93;;
            for&#40;var j=,k=d.length;j