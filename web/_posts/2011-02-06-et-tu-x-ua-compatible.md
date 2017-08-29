---
title: 'Et tu, X-UA-Compatible?'
author: Zach Leatherman
layout: post
permalink: /et-tu-x-ua-compatible/
categories:
  - JavaScript
  - Web Browsers
tags:
  - highlight
  - research
---

[![][brutus]][brutussrc]

Or, the story of how I learned that **the X-UA-Compatible header/meta tag is NOT the same as the Internet Explorer 8 Compatibility View button**.

 [brutus]: /web/wp-content/uploads/2011/02/juliusceasar.jpg
 [brutussrc]: http://www.flickr.com/photos/jedibfa/5067647765/

*Please note that the following information may be common knowledge, as this behavior is as described in the pre-requisite [Microsoft documentation][2] on the subject. However, I feel this behavior to be unintuitive and requiring more explicit communication.*

 [2]: http://blogs.msdn.com/b/ie/archive/2010/10/19/testing-sites-with-browser-mode-vs-doc-mode.aspx



Library developers live in a much different world from full stack developers. If you’re supplying code that will be used by others, you’re faced with a different set of priorities. As such, the library I manage provides certain user agent sniffing conveniences, namely classes to replace CSS Hacks (similar to the approach used in HTML Boilerplate to provide ie6 through ie9 classes on the `<html>` tag) and JavaScript booleans (similar to [`jQuery.browser`][3]). Much like jQuery, [these conveniences remain][4] for backwards compatibility.

 [3]: http://api.jquery.com/jQuery.browser
 [4]: http://docs.jquery.com/Release:jQuery_1.3#No_More_Browser_Sniffing

The purpose of this post is in fact not to convince you whether or not User Agent Sniffing is a [good tradeoff for performance][5] (even though, in some cases I believe it is), but instead to provide further evidence that using the User Agent alone is an unreliable method to determine the rendering engine of the web browser, and must be complemented with other approaches. **If you’re going to sniff, you have to sniff harder.**

 [5]: http://infrequently.org/2011/01/cutting-the-interrogation-short/

## X-UA-Compatible Breaks navigator.userAgent

Microsoft defines two terms to help communicate how new versions of Internet Explorer render a page: Browser Mode and Document Mode. Browser Modes are determined prior to any request made to the server (and cannot be changed by web developers). If the user triggers an IE7 Browser Mode using the Compatibility View Button, a new request is made to the server. Document Modes are determined in the page response.

### Compatibility View Button Flow

1.  User presses the Compatibility View button. This changes the Browser Mode.
2.  Request sent (since the Browser Mode has changed, **the User-Agent is also changed** to MSIE 7.0)
3.  Response from Server
4.  Document Mode determined

### X-UA-Compatible Flow

1.  Internet Explorer uses the default Browser Mode (newest available in the browser)
2.  Request sent (Browser Mode determines User-Agent to send, probably MSIE 8.0 or MSIE 9.0)
3.  Response from Server. Content may include X-UA-Compatible `<meta>` tag and/or Response HTTP headers such as X-UA-Compatible).
4.  Document Mode determined, using X-UA-Compatible and the DocType

If a X-UA-Compatible header is sent back in the Compatibility View flow, it will take precedence but obviously will not change the request User-Agent HTTP header.

It’s important to note that since the request has already gone before the Document Mode is determined, the Document Mode has no bearing on the request User-Agent HTTP header. While Microsoft probably could have changed `navigator.userAgent` to be different than the request User-Agent HTTP header, I feel they made the correct decision is keeping the same value. `navigator.userAgent` remains the same value as the request User-Agent HTTP header in IE8, but Microsoft changed this behavior in IE9. In IE9, `navigator.userAgent` represents the document mode, not the request User-Agent header.

![][6]

The User Agent isn’t the only thing being determined. The prerequisite Microsoft documentation states that the Browser Mode determines the User Agent, Default Document Mode, and Conditional Comments. This is not accurate. **The Document Mode determines which Conditional Comments execute, not the Browser Mode.**

 [6]: /web/wp-content/uploads/2011/02/Screen-shot-2011-02-06-at-1.27.14-PM.png "Screenshot of Microsoft Documentation"

Also note that using IE’s **Conditional Compilation** feature to return the version of JScript will be the same, independent of Document Mode.

    var ie = /*@cc_on @_jscript_version @*/0;
    // Always returns 5.8 in IE8, independent of Document Mode.

*Example Code from [Scott Jehl’s respond.js][7]*

 [7]: https://github.com/scottjehl/Respond/blob/aedc482328a4cbd9d74c5de178eb2cb974b67af5/respond.src.js#L171

### Test Pages

Try the following tests in Internet Explorer 8 to test for yourself.

*   [Stock Page][8]
*   [Setting X-UA-Compatible IE=7 using a Meta Tag][9] (or [IE=EmulateIE7][10])
*   [Setting X-UA-Compatible IE=7 using an HTTP Header][11] (or [IE=EmulateIE7][12])

 [8]: /test/x-ua-compatible/index.html
 [9]: /test/x-ua-compatible/ie7.html
 [10]: /test/x-ua-compatible/emulateie7.html
 [11]: /test/x-ua-compatible/header-ie7/ie7.html
 [12]: /test/x-ua-compatible/header-emulateie7/emulateie7.html

## What Does This Mean?

If you use X-UA-Compatible to change the Document Mode/IE Trident rendering engine, any client side code relying on `navigator.userAgent` (such as jQuery.browser) or server side code relying on the User-Agent HTTP Header will be incorrect. Since we can’t rely on the User Agent, what can we use? Microsoft does provide a `document.documentMode` integer we could use, pretty easily. But, I think there is a better approach.

Consider [a great piece of JavaScript written by James Padosley][13] to find Internet Explorer version numbers using Conditional Comments. His code seemed to meld perfectly with the above realization that the Document Mode determines Conditional Comment execution. We can use this to fix `jQuery.browser`.

 [13]: https://gist.github.com/527683

    // Place this script after jQuery, but before any code that uses jQuery.browser
    // Modified to only test for IE 6 , since jQuery only supports 6 
    (function($)
    {
        if(!$.browser.msie) {
            return;
        }
    
        var v = 5,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
    
        while (
            div.innerHTML = '',
            all[0]
        );
    
        $.browser.version = v;
    })(jQuery);

Now, of course, since we’re creating nodes there is a small performance penalty in using the above script over Regular Expressions and document.documentMode. I feel this to be worthwhile, given that I’ve been [burned by Internet Explorer’s version number before][14]. But next time, I reserve the right to choose performance over simplicity.

 [14]: /web/2008/10/19/jquery-bug-ie-reports-incorrect-browserversion/
