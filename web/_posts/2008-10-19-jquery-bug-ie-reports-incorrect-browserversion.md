---
title: 'jQuery Bug: IE reports incorrect $.browser.version'
author: Zach Leatherman
layout: post
permalink: /jquery-bug-ie-reports-incorrect-browserversion/
categories:
  - Other
tags:
  - deprecated
---

**Update: This is now fixed in jQuery.**

I’ve witnessed installations of IE where the navigator.userAgent reported both MSIE 6.0 and MSIE 7.0 in the same string, when Internet Explorer 7 is the one that’s really installed. Turns out, this is problematic for jQuery version 1.2.6, as it parses the double version userAgent as Internet Explorer 6, which may cause problems with your code if you’re using $.browser.version.

You can monitor the [jQuery bug][1] in the bug tracker, or see the original research performed by [Jamie Thompson][2]. Here’s a better workaround that merges two different approaches used on Jamie’s page, which fixes $.browser.version instead of using $.browser.msie6. This is to be considered temporary until the next (fixed) version of jQuery comes out.

 [1]: http://dev.jquery.com/ticket/3169
 [2]: http://jamazon.co.uk/web/2008/03/14/jquerybrowserversion-doesnt-recognise-ie7/

    jQuery.browser.version = jQuery.browser.msie && /msie 7\.0/i.test(navigator.userAgent) ?
      "7.0" :
      jQuery.browser.version;
