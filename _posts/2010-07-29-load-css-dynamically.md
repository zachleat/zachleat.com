---
title: 'Faking Onload for <span class="widow">Link Elements</span>'
author: Zach Leatherman
layout: post
permalink: /load-css-dynamically/
bttc_cache:
  - 1299387932:9
categories:
  - CSS
  - JavaScript
tags:
  - YUI
---
# 

**Updated 2011/09/27: Rejoice! This issue has now [been fixed in Firefox][1].**

 [1]: https://bugzilla.mozilla.org/show_bug.cgi?id=185236

* * *

Or, **I Am Dynamically Loaded CSS (and So Can You!)**

Dynamic resource loading is one of the keys to have a performance happy web application. There are generally three different criteria we must address when making a request: cross domain security policies, asynchronous/synchronous (will it block the host page while loading), and whether or not events are triggered when the request completes.

If the resource and host page are on the same domain, obviously `XMLHttpRequest` works the best. We can control whether or not the resource is loaded asynchronously or synchronously, and we know exactly when it gets done.

If the resource and host page are on different domains (increasingly more common with CDN’s), our options narrow. Loading the JavaScript is a solved problem, just use the `onload` event on the `` tag and you’re good to go (`onreadystatechange` for IE). But CSS is more complicated.

Resource

Method

Option for (a)synchronous

Event

JavaScript/CSS Same Domain

`XMLHttpRequest`

Both

`onreadystatechange`

JavaScript Different Domain

``

Synchronous (Asynchronous where [async property][2] is supported)

`onload`  
`onreadystatechange` for IE

CSS Different Domain

``

Asynchronous

*What this blog post is about.*

## Existing Solutions

 [2]: https://developer.mozilla.org/en/html/element/script

In all of the library source code I evaluated, Internet Explorer didn’t cause any issues. It fires both the `onload` and `onreadystatechange` events for `` nodes. Obviously this is ideal behavior, and IE got it right. But what about Firefox and Safari/Chrome?

### YUI 2.8.1 and 3.1.1

[Original Source][3]

 [3]: http://github.com/yui/yui3/blob/master/build/yui/get.js#L311

    // FireFox does not support the onload event for link nodes, so there is
    // no way to make the css requests synchronous. This means that the css 
    // rules in multiple files could be applied out of order in this browser
    // if a later request returns before an earlier one.  Safari too.
    if ((ua.webkit || ua.gecko) && q.type === "css") {
        _next(id, url);
    }

I wouldn’t be surprised if the commit log there was from Bon Jovi; that code is living on a prayer.

### LazyLoad

[Original Source][4]

 [4]: http://github.com/rgrove/lazyload/blob/master/lazyload.js#L283

    // Gecko and WebKit don't support the onload event on link nodes. In
    // WebKit, we can poll for changes to document.styleSheets to figure out
    // when stylesheets have loaded, but in Gecko we just have to finish
    // after a brief delay and hope for the best.
    if &#40;ua.webkit&#41; &#123;
        p.urls&#91;i&#93; = node.href; // resolve relative URLs (or polling won't work)
        poll&#40;&#41;;
    &#125; else &#123;
        setTimeout&#40;_finish, 50 * len&#41;;
    &#125;

Better, closer, warmer. This includes a nice method for working with webkit browsers. The poll method compares `document.styleSheets`, since Webkit has the nice option of only appending to the styleSheets object when the styleSheet has successfully loaded.

So we have working solutions for IE and Safari/Chrome. The only unsolved piece of the puzzle here is Firefox.

[This post][5] from the same author as LazyLoad also describes another solution which involves modifying the source CSS and polling against it. But that’s not really ideal. Can we do better?

 [5]: http://wonko.com/post/how-to-prevent-yui-get-race-conditions

## Solution

Here’s what I came up with (using jQuery for brevity, note that this solution **only fixes Firefox**, and does not incorporate the above already solved solutions):

    var url = 'css.php',
        id = 'dynamicCss'   &#40;new Date&#41;.getTime&#40;&#41;;
    &nbsp;
    $&#40;''&#41;.attr&#40;&#123;
        id: id,
        type: 'text/css'
    &#125;&#41;.html&#40;'@import url('   url   ')'&#41;.appendTo&#40;document.getElementsByTagName&#40;'head'&#41;&#91;&#93;&#41;;
    &nbsp;
    function poll&#40;&#41;
    &#123;
        try &#123;
            var sheets = document.styleSheets;
            for&#40;var j=, k=sheets.length; j