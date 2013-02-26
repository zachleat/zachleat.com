---
title: 'Speed up Including <span class="widow">Google Analytics</span>'
author: Zach Leatherman
layout: post
permalink: /speed-up-google-analytics-with-dynamic-includes/
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299719402:1
categories:
  - JavaScript
tags:
  - Google Analytics
  - Timers
---
# 

Have you ever noticed that your homepage hangs when including the Google Analytics JavaScript file? I think [a few][1] [people][2] have noticed a delay. Well, let’s try something different. Let’s create the script node dynamically using DOM methods and put a timeout on this creation so that it inserts just enough delay so that your page won’t hang (we’ll move out of the current execution path with the timeout, thus allowing your page to finish loading). The obvious benefit here is that even when the Google servers lag a little bit serving you the JavaScript file, your page will appear as if it has already finished loading. Given optimally performing Google Servers, this method will perform slower most of the time, but it shines in those rare instances where there is a bit of a delay. Give it a try, and let me know if it works any better.

 [1]: http://nutrun.com/weblog/does-google-analytics-make-your-pages-slow/
 [2]: http://resistmedia.net/blog/2007/10/02/get-rid-of-google-analytics/

Of course, remember to put near the end of your ``, and not directly in your ``.

    
    &#40;function&#40;&#41;
    &#123;
        setTimeout&#40;function&#40;&#41;
        &#123;
            var node = document.createElement&#40;"script"&#41;;
            node.src = 'http://www.google-analytics.com/urchin.js';
            //for SSL
            //node.src = 'https://ssl.google-analytics.com/urchin.js';
            node.type = 'text/javascript';
            document.getElementsByTagName&#40;"head"&#41;&#91;&#93;.appendChild&#40;node&#41;;
            var init = setInterval&#40;function&#40;&#41;
            &#123;
                _uacct = 'UA-XXXXXX-X'; // INSERT YOUR CODE HERE
                if&#40;typeof urchinTracker != 'undefined'&#41; &#123;
                    urchinTracker&#40;&#41;;
                    clearInterval&#40;init&#41;;
                &#125;
            &#125;, 100&#41;;
        &#125;, &#41;;
    &#125;&#41;&#40;&#41;;
    

[Try it on my benchmark page.][3]

 [3]: http://www.zachleat.com/Projects/googleAnalytics/