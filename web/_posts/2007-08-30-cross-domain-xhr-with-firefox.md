---
title: Cross Domain XHR with Firefox 2
author: Zach Leatherman
layout: post
permalink: /cross-domain-xhr-with-firefox/
Version Specific Article:
  - Firefox 2
categories:
  - JavaScript
  - Web Browsers
tags:
  - deprecated
  - feedtrim
  - popular-posts-total
postRankTotalViews: 7
daysPosted: 3778
yearsPosted: 10.4
---

By now know you know that trying to do an XMLHttpRequest (XHR or AJAX) call to a domain that is different from the domain of the hosted JavaScript in Firefox will throw an exception.

`Error: uncaught exception: Permission denied to call method XMLHttpRequest.open`

If you don’t want a history of the past solutions, page down to see the final solution.

The web has solutions to this problem, but most of them involve changing your JavaScript code, which I thought to be less than ideal. A common solution involves setting the UniversalBrowserRead security property in your JavaScript code [[Dion Almaer][1], of Ajaxian fame]:

 [1]: http://almaer.com/blog/archives/000794.html

    netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');

The problem with that solution (obviously) lies in single browser proprietary JavaScript polluting your code. And you have to set this property inside the scope of any usage (ie: inside your library file that does your AJAX calls and inside your callbacks, etc).

Why can’t it just be as easy as Internet Explorer? They just pop-up a little security dialog asking you if you want to allow this access (which is also what the `enablePrivilege` function does as well).

Another solution involves setting the `capability.policy.default.XMLHttpRequest.open` preference inside your prefs.js Firefox preference file [[Mike Dirolf][2]]. This worked as desired and allowed the AJAX call, but anytime you attempt to access the resulting XML you received a nice exception as well. It turns out this is the solution we wanted, it’s just incomplete.

 [2]: http://blog.dirolf.com/2007/06/enabling-cross-domain-ajax-in-firefox.html

## The Final Solution

1.  Close Firefox. It will overwrite your changes to the prefs.js file if you have it open.
2.  *Optional step*: This approach will open up your Firefox security quite a bit, so I’d recommend setting up a separate profile in Firefox to use when testing. It will **not **pop up a security dialog when a cross-domain AJAX call is made.
3.  Find your prefs.js file. In Windows, it is typically located in the `C:Documents and Settings{YOUR_USERNAME}ApplicationDataMozillaFirefoxProfiles{YOUR_TEST_USER_PROFILE_ID}prefs.js`
4.  Open it up and add the following lines:

        user_pref("capability.policy.default.XMLHttpRequest.open", "allAccess");
        user_pref("capability.policy.default.CDATASection.nodeValue", "allAccess");
        user_pref("capability.policy.default.Element.attributes", "allAccess");
        user_pref("capability.policy.default.Element.childNodes", "allAccess");
        user_pref("capability.policy.default.Element.firstChild", "allAccess");
        user_pref("capability.policy.default.Element.getElementsByTagName", "allAccess");
        user_pref("capability.policy.default.Element.tagName", "allAccess");
        user_pref("capability.policy.default.HTMLCollection.length", "allAccess");
        user_pref("capability.policy.default.HTMLCollection.item", "allAccess");
        user_pref("capability.policy.default.Text.nodeValue", "allAccess");
        user_pref("capability.policy.default.XMLDocument.documentElement", "allAccess");
        user_pref("capability.policy.default.XMLDocument.getElementsByTagName", "allAccess");
        user_pref("capability.policy.default.XMLHttpRequest.channel", "allAccess");
        user_pref("capability.policy.default.XMLHttpRequest.open", "allAccess");
        user_pref("capability.policy.default.XMLHttpRequest.responseText", "allAccess");
        user_pref("capability.policy.default.XMLHttpRequest.responseXML", "allAccess");
        user_pref("capability.policy.default.XMLHttpRequest.send", "allAccess");
        user_pref("capability.policy.default.XMLHttpRequest.setRequestHeader", "allAccess");

This code was copied (with the exception of 1 line) from a source repository at [[kryogenix.org][3]]  
used in jackfield. It wasn’t intended to be used for this purpose, but it works.

 [3]: http://svn.kryogenix.org/filedetails.php?repname=kryogenix.org&path=/jackfield/trunk/htmlui/prefs.js&rev=0&sc=0

If you still get `Error: uncaught exception: Permission denied to call method _________` errors, you can add the method to your prefs.js. I would appreciate a comment with any commonly used methods not included above. Thanks.

**Update:** Because this article is deprecated (applies to an older version of Firefox), I’m updating the blog title in the interest of minimizing the number of disappointed users. Some might think this is a stupid thing to do, since it’s the most popular page on my blog, but I’m more interested in helping people than getting traffic.
