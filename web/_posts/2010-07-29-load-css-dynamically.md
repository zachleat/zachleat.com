---
title: Faking Onload for Link Elements
author: Zach Leatherman
layout: post
permalink: /load-css-dynamically/
categories:
  - CSS
  - JavaScript
tags:
  - YUI
  - highlight
  - research
---

**Updated 2011/09/27: Rejoice! This issue has now [been fixed in Firefox][1].**

 [1]: https://bugzilla.mozilla.org/show_bug.cgi?id=185236

* * *

Or, **I Am Dynamically Loaded CSS (and So Can You!)**

Dynamic resource loading is one of the keys to have a performance happy web application. There are generally three different criteria we must address when making a request: cross domain security policies, asynchronous/synchronous (will it block the host page while loading), and whether or not events are triggered when the request completes.

If the resource and host page are on the same domain, obviously `XMLHttpRequest` works the best. We can control whether or not the resource is loaded asynchronously or synchronously, and we know exactly when it gets done.

If the resource and host page are on different domains (increasingly more common with CDN’s), our options narrow. Loading the JavaScript is a solved problem, just use the `onload` event on the `` tag and you’re good to go (`onreadystatechange` for IE). But CSS is more complicated.

<table>
<thead>
<tr>
<th>Resource</th>
<th>Method</th>
<th>Option for (a)synchronous</th>
<th>Event</th>
</tr>
</thead>
<tbody>
<tr>
<td>JavaScript/CSS Same Domain</td>
<td><code>XMLHttpRequest</code></td>
<td>Both</td>
<td><code>onreadystatechange</code></td>
</tr>
<tr>
<td>JavaScript Different Domain</td>
<td><code>&lt;script&gt;</code></td>
<td>Synchronous (Asynchronous where <a href="https://developer.mozilla.org/en/html/element/script">async property</a> is supported)</td>
<td><code>onload</code><br />
<code>onreadystatechange</code> for IE</td>
</tr>
<tr>
<td>CSS  Different Domain</td>
<td><code>&lt;link&gt;</code></td>
<td>Asynchronous</td>
<td><em>What this blog post is about.</em></td>
</tr>
</tbody>
</table>

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
    if (ua.webkit) {
        // resolve relative URLs (or polling won't work)
        p.urls[i] = node.href;
        poll();
    } else {
        setTimeout(_finish, 50 * len);
    }

Better, closer, warmer. This includes a nice method for working with webkit browsers. The poll method compares `document.styleSheets`, since Webkit has the nice option of only appending to the styleSheets object when the styleSheet has successfully loaded.

So we have working solutions for IE and Safari/Chrome. The only unsolved piece of the puzzle here is Firefox.

[This post][5] from the same author as LazyLoad also describes another solution which involves modifying the source CSS and polling against it. But that’s not really ideal. Can we do better?

 [5]: http://wonko.com/post/how-to-prevent-yui-get-race-conditions

## Solution

Here’s what I came up with (using jQuery for brevity, note that this solution **only fixes Firefox**, and does not incorporate the above already solved solutions):

    var url = 'css.php',
        id = 'dynamicCss' + (new Date).getTime();
    
    $('<style/>').attr({
        id: id,
        type: 'text/css'
    }).html('@import url(' + url + ')').appendTo(document.getElementsByTagName('head')[0]);
    
    function poll() {
        try {
            var sheets = document.styleSheets;
            for(var j=, k=sheets.length; j<k; j++) {
                if(sheets[j].ownerNode.id == id) {
                    sheets[j].cssRules;
                }
            }
            // If you made it here, success!
            alert('success!');
        } catch(e) {
            window.setTimeout(poll, 50);
        }
    }

    window.setTimeout(poll, 50);

### [See this Demo in Action][demo] (Firefox Only)

 [demo]: /javascript/loadcss/load.html

*Update: After much joy and celebration, I have discovered that an approach similar to the above was written by Oleg Slobodskoi in his [xLazyLoader][xlazy] plugin for jQuery. It shouldn’t be surprising that two independent developers might reach the same solution, and is just more proof that software patents are stupid. :)*

 [xlazy]: http://plugins.jquery.com/files/jquery.xLazyLoader.js.txt

*Update #2 Added note about HTML5 async property on script tags.*
