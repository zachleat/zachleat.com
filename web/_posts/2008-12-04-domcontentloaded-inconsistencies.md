---
title: 'DOMContentLoaded Inconsistencies (in Browsers and <span class="widow">JavaScript Libraries)</span>'
author: Zach Leatherman
excerpt: "We all know the problem, but we may not all call it the same thing: DOMContentLoaded.  Every popular JavaScript library has its own name for the DOMContentLoaded event, and they're all implemented differently.  This, of course, partly due to the fact that web browsers are also inconsistent in their implementations.  Here's a run-down of those inconsistencies."
layout: post
permalink: /domcontentloaded-inconsistencies/
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299709222:1
categories:
  - JavaScript
  - Web Browsers
tags:
  - linkedin
---
# 

**Quick Summary**

*   *Prototype and Dojo are the only major JavaScript frameworks that correctly time the DOMContentLoaded inside of an iframe in Internet Explorer. MooTools comes close and both YUI and jQuery both exhibit incorrect behavior.*
*   *Usually, browsers that have a native DOMContentLoaded event will fire it after both JavaScript and CSS (external script, link tags) have loaded. But Opera fires prior to CSS link tags loading.*

We all know the problem, but we may not all call it the same thing. Every popular JavaScript library has its own name for the DOMContentLoaded event.

JavaScript Library

Event Name

YUI

[DOMReady][1]

jQuery

[ready][2]

MooTools

[domready][3]

Prototype

[dom:loaded][4]

Dojo

[addOnLoad][5]

But the naming scheme isn’t the only part about this event that’s inconsistent. There are a few hacks strewn around the net that have been bastardized (read: modified to the will of library authors) into each individual framework. These have been posted time and time again, but for post completeness are the following:

 [1]: http://developer.yahoo.com/yui/docs/YAHOO.util.Event.html#method_onDOMReady
 [2]: http://docs.jquery.com/Events/ready
 [3]: http://mootools.net/docs/Utilities/DomReady
 [4]: http://www.prototypejs.org/api/document/observe
 [5]: http://api.dojotoolkit.org/jsdoc/dojo/1.2/dojo.addOnLoad

IE DOMContentLoaded Hack

Description

`doScroll` by Diego Perini

Uses a `doScroll` method call, which will throw an error if the `ondocumentready` event hasn’t fired on the **primary document** (take note of the usage of the word primary). Once `doScroll` doesn’t throw an error, it is assumed the DOM has loaded.

`onreadystatechange` and `readyState`

`onreadystatechange` *“fires when the state of the object has changed,”* and changes the `readyState` property of the object through the following states (not all apply to every type of element): `uninitialized`, `loading`, `loaded`, `interactive`, and `complete`. (source: MSDN) Usually set on the document object, or a script element (as used in the Script Defer method described next.

[Script Defer][6] by Dean Edwards

document.write’s a script tag with a `defer` attribute. Defer will cause the browser to delay execution of the script until the DOM has successfully loaded (using onreadystatechange on the script tag until its readyState is “complete”). Without defer, the browser would execute any script tag immediately.

[HTC Behavior][7] by Dean Edwards

Much less popular approach using proprietary HTC Behavior files. Generally avoided due to the addition of an extra HTTP request to the page in order to download the external .htc file. As a side note, if using this approach, the `"oncontentready"` event will work better than the [“ondocumentready”][8] event used by Mr. Edwards.

Ghetto Method

Of course, the easiest way to do it is to put a script tag right above your ending `` tag that triggers the event manually. This really only works if you have full control of the content, and isn’t really a library solution. Worth noting though.

[![Benchmark for Library DOMContentLoaded Implementations][10]  
  
*Benchmark for Library DOMContentLoaded Implementations*][10]

 [6]: http://dean.edwards.name/weblog/2005/09/busted/
 [7]: http://dean.edwards.name/weblog/2005/09/busted2/
 [8]: http://msdn.microsoft.com/en-us/library/ms531024.aspx
 []: http://zachleat.com/Projects/domcontentloaded/

I created a benchmark trying to answer the simple question: when does the DOMContentLoaded event fire? Each implementation has different effects, especially in iframes and with stylesheets.

# What Works

The Internet Explorer hacks presented above are reliable when used on a standalone document (not inside of an iframe).

Mozilla Firefox, Safari, Chrome, and Opera all contain a native DOMContentLoaded event that each framework uses to consistently fire at the correct time. So, it isn’t even worth summarizing the results for tests in every browser with a native DOMContentLoaded event, except Opera. Opera took a different design approach with their DOMContentLoaded event (certainly not wrong, just different), which we’ll analyze below.

# Internet Explorer inside an Iframe

*All libraries below did no branching based on IE versions, all used the same method for IE6, IE7, or IE8. I performed no tests in IE8, however.*

JavaScript Library

Method

Waited for:

 

 

 CSS



YUI 2.6.0

doScroll, setTimeout

Incorrect: Fires almost immediately (~20ms)

jQuery 1.2.6

window onload

X

X

X

X

Prototype 1.6.0.3

Script Defer

X

X

X



MooTools 1.2.1

doScroll and set innerHTML, setTimeout

*

X

X



Dojo 1.2.0

Script Defer

X

X

X



[IEContentLoaded][10]

doScroll, document.onreadystatechange

Incorrect: JavaScript error.

[addDOMLoadEvent][11]

Script Defer

X

X

X



* *For some reason, not only did the MooTools library not wait for the body script to trigger DOMContentLoaded, the body script never executed at all.*

 [10]: http://javascript.nwbox.com/IEContentLoaded/
 [11]: http://www.thefutureoftheweb.com/blog/adddomloadevent

The **most important takeaway** from this blog post are the successful methods of faking DOMContentLoaded in Internet Explorer. The obvious **library winners here are Prototype and Dojo**, with the addDOMLoadEvent script also exhibiting correct behavior. MooTools is a close runner up, and I would be interested to find out why it didn’t execute the body script (that’s left for another day, or perhaps a generous commenter).

# Opera 9.6

JavaScript Library

Method

Waited for:

 

 

 CSS



YUI 2.6.0

Native DOMContentLoaded

X

X





jQuery 1.2.6

Native DOMContentLoaded Code to wait for Stylesheets

X

X

X



Prototype 1.6.0.3

Native DOMContentLoaded

X

X





MooTools 1.2.1

Native DOMContentLoaded

X

X





Dojo 1.2.0

Native DOMContentLoaded

X

X





[IEContentLoaded][10]

N/A to Opera

X

X

X



[addDOMLoadEvent][11]

Native DOMContentLoaded

X

X





As you can see above, **Opera typically will fire DOMContentLoaded prior to stylesheets loading** successfully (ignoring the jQuery specific code to provide consistency cross-browser)

*Thanks to [Adam Koch][12] for first pointing me in the direction of jQuery in an iframe ignoring DOMContentLoaded in IE.*

 [12]: http://www.adamkoch.com/

**Update:** There is an open ticket for [YUI on Sourceforge][13], and I’ve opened a ticket for [jQuery on their Trac site][14].

 [13]: http://sourceforge.net/tracker/index.php?func=detail&aid=2008289&group_id=165715&atid=836476
 [14]: http://dev.jquery.com/ticket/3693