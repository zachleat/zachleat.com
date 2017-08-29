---
title: 'Dear IE6: Please Cache my Images.'
author: Zach Leatherman
layout: post
permalink: /dear-ie6-please-cache-my-images/
categories:
  - Other
tags:
  - linkedin
  - research
---

A few months ago, I took on a new role at [Union Pacific Railroad](http://www.unionpacific.jobs/careers/explore/prof/index.shtml) as the lead architect for an internal project: a Union Pacific UI Library used in our IT department on all new web-based projects.  Based on [jQuery](http://jquery.com/), it is similar to a project like [jQuery UI](http://ui.jquery.com/), but it has a few more components and they’re branded to our color scheme and programmed to our usability requirements.

The project has allowed me to expand my knowledge of browser quirks, improving my frontend-fu with every closed support ticket.  What does that mean for you?  More blogs posts.  Learn from my mistakes (and from those I’ve inherited).

This week presented an interesting, albeit decreasingly relevant scenario, where a customer was seeing performance problems when loading a simple web page in Internet Explorer 6.  The only hint to the root cause was a claim that he witnessed “400 items remaining” in his status bar.  Naturally, this took awhile, but at least we had somewhere to start: Apache access logs.

Consider the following (jQuery) code to **add three new images** to the page using JavaScript:

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html>
        <head>
        <script type="text/javascript" src="jquery-1.2.6.min.js"></script>
        <style type="text/css">
        img.bacon { width: 100px; height: 67px; background-image: url(bacon.png); }
        </style>
       </head>
        <body>
            <script type="text/javascript">
            jQuery(function() {
              jQuery('body').append('<img src="spacer.png" class="bacon"/>');
              jQuery('body').append('<img src="spacer.png" class="bacon"/>');
              jQuery('body').append('<img src="spacer.png" class="bacon"/>');
            });
            </script>
        </body>
    </html>

Note how each image being added dynamically has a **background-image** as well.

In a **normal** web browser (read: Internet Explorer 7+, Firefox *), this would result in the following Apache `access.log` (with an empty browser cache) with only **4 HTTP requests** (ignoring favicon.ico, which is irrelevant to this study):

> 127.0.0.1 – - [18/Oct/2008:22:59:09 -0500] “GET /ie6cache/ HTTP/1.1″ 200 657
> 
> 127.0.0.1 – - [18/Oct/2008:22:59:09 -0500] “GET /ie6cache/jquery-1.2.6.min.js HTTP/1.1″ 200 55774
> 
> 127.0.0.1 – - [18/Oct/2008:22:59:09 -0500] “GET /ie6cache/spacer.png HTTP/1.1″ 200 207
> 
> 127.0.0.1 – - [18/Oct/2008:22:59:09 -0500] “GET /ie6cache/bacon.png HTTP/1.1″ 200 5416

In Internet Explorer 6, however, this is the resulting Apache `access.log` (empty browser cache) with **8 HTTP requests**:

> 127.0.0.1 – - [18/Oct/2008:22:57:48 -0500] “GET /ie6cache/ HTTP/1.1″ 200 657
> 
> 127.0.0.1 – - [18/Oct/2008:22:57:48 -0500] “GET /ie6cache/jquery-1.2.6.min.js HTTP/1.1″ 200 55774
> 
> 127.0.0.1 – - [18/Oct/2008:22:57:48 -0500] “GET /ie6cache/spacer.png HTTP/1.1″ 200 207
> 
> 127.0.0.1 – - [18/Oct/2008:22:57:48 -0500] “GET /ie6cache/spacer.png HTTP/1.1″ 200 207
> 
> 127.0.0.1 – - [18/Oct/2008:22:57:48 -0500] “GET /ie6cache/bacon.png HTTP/1.1″ 200 5416
> 
> 127.0.0.1 – - [18/Oct/2008:22:57:48 -0500] “GET /ie6cache/bacon.png HTTP/1.1″ 200 5416
> 
> 127.0.0.1 – - [18/Oct/2008:22:57:48 -0500] “GET /ie6cache/spacer.png HTTP/1.1″ 200 207
> 
> 127.0.0.1 – - [18/Oct/2008:22:57:48 -0500] “GET /ie6cache/bacon.png HTTP/1.1″ 200 5416

When a web browser parses your markup and sees three image tags with identical src attributes, it makes only one HTTP request to the server for that image, and the rest of the images are loaded from the local web browser cache (no more HTTP requests are made).  This is standard behavior for all modern web browsers.  But in IE6, as you can see from the above log, made 3 requests to the server for both `spacer.png` and `bacon.png`.  Why?

Turns out there are two independent issues at play here:

1.  The classic _[IE6 background-image flicker](http://www.mister-pixel.com/#Content__state=is_that_simple)_ problem.  This has been documented extensively, and the problem is that IE6 bypasses its local web browser cache for any image requests made for CSS background-images inserted on the page dynamically.  The good news for this one is that the fix is a simple one.

        if(jQuery.browser.msie && parseInt(jQuery.browser.version, 10) == 6) {
          try {
            document.execCommand("BackgroundImageCache", false, true);
          } catch(err) {}
        }

    Note the simple check for IE 6 execution only.  This is optional, but keep in mind that this problem is not present in IE7+.  During your testing, also keep in mind that Mister Pixel reports (and I can confirm) that once you run this command, this setting **will persist in your browser**, even if you empty your cache and remove the code from your scripts.  You’ll need to close your browser window to reset the setting to default.

    _See also [Dean Edwards’](http://dean.edwards.name/my/flicker.html) and [Hedger Wang’s](http://www.hedgerwow.com/360/bugs/dom-fix-ie6-background-image-flicker.html) studies on this issue for more information._  But this is really only half the problem.  This will fix the duplicate bacon.png HTTP requests, but we’ll still see 3 spacer.png HTTP requests in our logs.

2.  The other issue is a separate but equal problem with IE6 caching.  When inserting images with identical `src` attributes, IE6 will always go to the server (which means an extra HTTP request) for a new image.  This is a [documented _feature_ in IE6](http://support.microsoft.com/default.aspx?scid=kb;en-us;319546), and the fix they have listed on their page isn’t ideal.  The best solution here is to **eliminate the need for `spacer.png`** altogether.  I can put these bacon background’s on a div tag just as easily, emphasizing pragmatism over semantics in this case (it’s a small sacrifice, you’ll live).  If you have an `&lt;img&gt;` tag with a source you actually need, why not move it to the background image on a div tag?  Unfortunately here, the takeaway is that **your logic may need to be restructured** to workaround this issue.  
See also [Mihai Bazon’s study](http://www.bazon.net/mishoo/articles.epl?art_id=958) for more information, but do keep in mind that grouping this issue with the background flicker problem is an incorrect categorization.  They are two separate issues and the fixes represented on that page don’t really fix the issue at all.  Implementing server side caching as a “fix” is like using a bandaid for a tourniquet. You don’t want an HTTP request to go to the server **at all**, I don’t care if the response is a 200 OK or a 304 Not Modified.  No HTTP request is always going to be faster than a server side cached response.

These issues will present themselves more frequently if you have the “Every visit to the page” caching option enabled in your Internet Tools in Internet Explorer.  Good luck.
