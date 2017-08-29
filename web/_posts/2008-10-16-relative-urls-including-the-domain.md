---
title: Relative URLs including the Domain
author: Zach Leatherman
excerpt: >-
  Just a neat little trick I saw while browsing the source code of Google
  Calendar.  In some of their CSS files, they link to background-images using
  URLs that include everything but the protocol, which is something I hadn't
  seen before.
layout: post
permalink: /relative-urls-including-the-domain/
categories:
  - Web Browsers
tags:
  - linkedin
---

Just a neat little trick I saw while browsing the source code of Google Calendar. In some of their CSS files, they link to background-images using URLs that include everything but the protocol, which is something I hadn’t seen before.

The most common usage of a relative URL is linked from the root (note the slash at the beginning), like so:

![][1]  


 [1]: /web/wp-content/themes/hemingway/images/title.png

You can also use `../` to navigate up a directory in your path, but that’s boring. The interesting question is: what if I wanted to load content from a separate domain, while at the same time transparently using the protocol used on my page?

Do what Google Calendar does and use the following style:  
![][2]  


 [2]: //calendar.google.com/googlecalendar/images/calendar_sm2_en.gif

Note the lack of `http:` or `https:` from the URL. If this page [were hosted on https][3] (we don’t pay for certificates around here, so you’ll have to put up with the security warning), the last image source will load from https as well at no additional development cost.

 [3]: https://www.zachleat.com/web/2008/10/16/relative-urls-including-the-domain/

This seems like it would be especially useful if you were using the YDN Performance tip to [Split Components Across Domains][4]. Remember, we’re not just talking images. This involves how the browser resolves URLs, so could be used inside href tags, css urls (as Google Calendar did), etc.

 [4]: http://developer.yahoo.com/performance/rules.html#split
