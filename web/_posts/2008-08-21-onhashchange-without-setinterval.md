---
title: Emulating onhashchange without setInterval
author: Zach Leatherman
layout: post
permalink: /onhashchange-without-setinterval/
categories:
  - JavaScript
tags:
  - highlight
  - research
  - feedtrim
---

There is one limitation that all of the major JavaScript browser history management plugins have to hack around:  How to tell when there is a change to the `location.hash`?  Sure, you can tell when you’re modifying the hash yourself, but what if the user hits the back/forward button?

[YUI’s History component](http://developer.yahoo.com/yui/history/) and Really Simple History both use setInterval with an internal variable to compare and find changes.  But this isn’t really an optimal solution.  As proper front end engineers, we should avoid timeouts as much as possible.  Internet Explorer 8 will have an [onhashchange event][event] that clients will be able to subscribe to.  That will be nice.  But surely, a cross browser solution without the use of setInterval exists.

[event]: http://msdn.microsoft.com/en-us/library/cc288209(VS.85).aspx

**Look, a cross browser solution without the use of setInterval:**

1.  On initialization, we load an iframe onto the page that is positioned absolutely at -500px,-500px so the user can’t see it. It is a skeleton page that only needs cross browser code to add an “`onscroll`” event, and to be able to calculate the scrolled position of the iframe itself.  For my example, I use jQuery and the dimensions plugin to accomplish this, but it could easily be trimmed down to only the bare essentials (or ported to a different library).
2.  To add an AJAX history entry into the browser’s history under an assigned hash string, we first add a `<a name="hashString">hashString</a>` to the `<body>` tag of the iframe.  Using css to increase the size of the a tag proportional to the iframe’s height, we can guarantee scrolling will happen.
3.  Then, we change the `location.hash` of the iframe to point to that `<a>` tag.  This will scroll the iframe to the content, and create a new entry in the browser’s `history` object.
4.  Inside the iframe, we have our `onscroll` event that fires when the scrolling in the previous step took place.  (Minor IE-related workaround: The browser’s `history` object is changed, but the hash property doesn’t when attempting to read it later.  Instead, we find the `<a>` that matches up with the scrollY/pageOffsetY property inside of the iframe, and retrieve the matching hash from the `<a>` tag.)

The nice thing about this approach is that you don’t even need a history manager anymore.  This little iframe will do all of your dirty work for you.  And it will even maintain your history alongside any other iframe browsing on the page.

**Advantages:**

*   Can serve as back button support and full AJAX history manager.
*   Page Weight: the test page and iframe HTML files together weigh in at 2.76 KB.  That includes the non-jQuery JavaScript needed to do everything.
*   Cross browser: Tested in FF3, IE7, IE6, Opera 9.5, (not Safari — see below)

**Limitations:**

*   No bookmarking support.  We aren’t changing the top hash, we’re changing the iframe hash, so these aren’t bookmarkable.

**Sample Example:**

*   [My Test Page](http://www.zachleat.com/Projects/history/)
*   [Download the test page (2 HTML files, and jQuery 1.2.6 and dimensions)](http://www.zachleat.com/Projects/history/history.zip)

**Update**: Given time for more rigorous testing, it doesn’t look like Safari supports this approach.  So, until WebKit fixes [#9166](https://bugs.webkit.org/show_bug.cgi?id=9166), we’ll have to stick to timers in Safari.  A more pragmatic programmer than I might hack around this approach by exploiting [#19202](https://bugs.webkit.org/show_bug.cgi?id=19202), but that certainly wouldn’t be a long term solution.  I’ve also updated the test page above, at [Dean Edwards](http://dean.edwards.name/) humble request, to support dynamic client size text size changes.
