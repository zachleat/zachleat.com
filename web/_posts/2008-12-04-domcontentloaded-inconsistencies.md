---
title: DOMContentLoaded Inconsistencies (in Browsers and JavaScript Libraries)
author: Zach Leatherman
layout: post
permalink: /domcontentloaded-inconsistencies/
categories:
  - JavaScript
  - Web Browsers
tags:
  - highlight
  - research
  - smalltitle
  - popular-posts-total
postRankTotalViews: 12
daysPosted: 3316
yearsPosted: 9.1
---

**Quick Summary**

*   *Prototype and Dojo are the only major JavaScript frameworks that correctly time the DOMContentLoaded inside of an iframe in Internet Explorer. MooTools comes close and both YUI and jQuery both exhibit incorrect behavior.*
*   *Usually, browsers that have a native DOMContentLoaded event will fire it after both JavaScript and CSS (external script, link tags) have loaded. But Opera fires prior to CSS link tags loading.*

We all know the problem, but we may not all call it the same thing. Every popular JavaScript library has its own name for the DOMContentLoaded event.

<table>
<thead>
<tr>
<th>JavaScript Library</th>
<th>Event Name</th>
</tr>
</thead>
<tbody>
<tr>
<td>YUI</td>
<td><a href="http://developer.yahoo.com/yui/docs/YAHOO.util.Event.html#method_onDOMReady">DOMReady</a></td>
</tr>
<tr>
<td>jQuery</td>
<td><a href="http://docs.jquery.com/Events/ready">ready</a></td>
</tr>
<tr>
<td>MooTools</td>
<td><a href="http://mootools.net/docs/Utilities/DomReady">domready</a></td>
</tr>
<tr>
<td>Prototype</td>
<td><a href="http://www.prototypejs.org/api/document/observe">dom:loaded</a></td>
</tr>
<tr>
<td>Dojo</td>
<td><a href="http://api.dojotoolkit.org/jsdoc/dojo/1.2/dojo.addOnLoad">addOnLoad</a></td>
</tr>
</tbody>
</table>

But the naming scheme isn’t the only part about this event that’s inconsistent. There are a few hacks strewn around the net that have been bastardized (read: modified to the will of library authors) into each individual framework. These have been posted time and time again, but for post completeness are the following:

<table>
<thead>
<tr>
<th>IE DOMContentLoaded Hack</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code><a href="http://javascript.nwbox.com/IEContentLoaded/">doScroll</a></code> by Diego Perini</td>
<td>Uses a <code>doScroll</code> method call, which will throw an error if the <code>ondocumentready</code> event hasn’t fired on the <strong>primary document</strong> (take note of the usage of the word primary).  Once <code>doScroll</code> doesn’t throw an error, it is assumed the DOM has loaded.</td>
</tr>
<tr>
<td><code><a href="http://msdn.microsoft.com/en-us/library/ms536957(VS.85).aspx">onreadystatechange</a></code> and <code><a href="http://msdn.microsoft.com/en-us/library/ms534359.aspx">readyState</a></code></td>
<td><code>onreadystatechange</code> <em>“fires when the state of the object has changed,”</em> and changes the <code>readyState</code> property of the object through the following states (not all apply to every type of element): <code>uninitialized</code>, <code>loading</code>, <code>loaded</code>, <code>interactive</code>, and <code>complete</code>.  (source: MSDN) Usually set on the document object, or a script element (as used in the Script Defer method described next.</td>
</tr>
<tr>
<td><a href="http://dean.edwards.name/weblog/2005/09/busted/">Script Defer</a> by Dean Edwards</td>
<td>document.write’s a script tag with a <code>defer</code> attribute.  Defer will cause the browser to delay execution of the script until the DOM has successfully loaded (using onreadystatechange on the script tag until its readyState is “complete”).  Without defer, the browser would execute any script tag immediately.</td>
</tr>
<tr>
<td><a href="http://dean.edwards.name/weblog/2005/09/busted2/">HTC Behavior</a> by Dean Edwards</td>
<td>Much less popular approach using proprietary HTC Behavior files.  Generally avoided due to the addition of an extra HTTP request to the page in order to download the external .htc file.  As a side note, if using this approach, the <code><a href="http://msdn.microsoft.com/en-us/library/ms531021.aspx">"oncontentready"</a></code> event will work better than the <a href="http://msdn.microsoft.com/en-us/library/ms531024.aspx">“ondocumentready”</a> event used by Mr. Edwards.</td>
</tr>
<tr>
<td>Ghetto Method</td>
<td>Of course, the easiest way to do it is to put a script tag right above your ending <code>&lt;/body&gt;</code> tag that triggers the event manually.  This really only works if you have full control of the content, and isn’t really a library solution.  Worth noting though.</td>
</tr>
</tbody>
</table>

[![Benchmark for Library DOMContentLoaded Implementations][benchmarkimg]][benchmark]
  
[*Benchmark for Library DOMContentLoaded Implementations*][benchmark]

 [benchmark]: http://zachleat.com/Projects/domcontentloaded/
 [benchmarkimg]: /web/wp-content/uploads/2008/12/domcontentloaded.png

I created a benchmark trying to answer the simple question: when does the DOMContentLoaded event fire? Each implementation has different effects, especially in iframes and with stylesheets.

## What Works

The Internet Explorer hacks presented above are reliable when used on a standalone document (not inside of an iframe).

Mozilla Firefox, Safari, Chrome, and Opera all contain a native DOMContentLoaded event that each framework uses to consistently fire at the correct time. So, it isn’t even worth summarizing the results for tests in every browser with a native DOMContentLoaded event, except Opera. Opera took a different design approach with their DOMContentLoaded event (certainly not wrong, just different), which we’ll analyze below.

### Internet Explorer inside an Iframe

*All libraries below did no branching based on IE versions, all used the same method for IE6, IE7, or IE8. I performed no tests in IE8, however.*

<table>
<thead>
<tr>
<th rowspan="2">JavaScript Library</th>
<th rowspan="2">Method</th>
<th colspan="4">Waited for:</th>
</tr>
<tr>
<th>&lt;body&gt; &lt;script&gt;</th>
<th>&lt;head&gt; &lt;script&gt;</th>
<th>&lt;link&gt; CSS</th>
<th>&lt;img&gt;</th>
</tr>
</thead>
<tbody>
<tr>
<td>YUI 2.6.0</td>
<td>doScroll, setTimeout</td>
<td colspan="4">Incorrect: Fires almost immediately (~20ms)</td>
</tr>
<tr>
<td>jQuery 1.2.6</td>
<td>window onload</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td>X</td>
</tr>
<tr>
<td>Prototype 1.6.0.3</td>
<td>Script Defer</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td></td>
</tr>
<tr>
<td>MooTools 1.2.1</td>
<td>doScroll and set innerHTML, setTimeout</td>
<td>*</td>
<td>X</td>
<td>X</td>
<td></td>
</tr>
<tr>
<td>Dojo 1.2.0</td>
<td>Script Defer</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td></td>
</tr>
<tr>
<td><a href="http://javascript.nwbox.com/IEContentLoaded/">IEContentLoaded</a></td>
<td>doScroll, document.onreadystatechange</td>
<td colspan="4">Incorrect: JavaScript error.</td>
</tr>
<tr>
<td><a href="http://www.thefutureoftheweb.com/blog/adddomloadevent">addDOMLoadEvent</a></td>
<td>Script Defer</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td></td>
</tr>
</tbody>
</table>


* *For some reason, not only did the MooTools library not wait for the body script to trigger DOMContentLoaded, the body script never executed at all.*

 [10]: http://javascript.nwbox.com/IEContentLoaded/
 [11]: http://www.thefutureoftheweb.com/blog/adddomloadevent

The **most important takeaway** from this blog post are the successful methods of faking DOMContentLoaded in Internet Explorer. The obvious **library winners here are Prototype and Dojo**, with the addDOMLoadEvent script also exhibiting correct behavior. MooTools is a close runner up, and I would be interested to find out why it didn’t execute the body script (that’s left for another day, or perhaps a generous commenter).

### Opera 9.6

<table>
<thead>
<tr>
<th rowspan="2">JavaScript Library</th>
<th rowspan="2">Method</th>
<th colspan="4">Waited for:</th>
</tr>
<tr>
<th>&lt;body&gt; &lt;script&gt;</th>
<th>&lt;head&gt; &lt;script&gt;</th>
<th>&lt;link&gt; CSS</th>
<th>&lt;img&gt;</th>
</tr>
</thead>
<tbody>
<tr>
<td>YUI 2.6.0</td>
<td>Native DOMContentLoaded</td>
<td>X</td>
<td>X</td>
<td></td>
<td></td>
</tr>
<tr>
<td>jQuery 1.2.6</td>
<td>Native DOMContentLoaded + Code to wait for Stylesheets</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td></td>
</tr>
<tr>
<td>Prototype 1.6.0.3</td>
<td>Native DOMContentLoaded</td>
<td>X</td>
<td>X</td>
<td></td>
<td></td>
</tr>
<tr>
<td>MooTools 1.2.1</td>
<td>Native DOMContentLoaded</td>
<td>X</td>
<td>X</td>
<td></td>
<td></td>
</tr>
<tr>
<td>Dojo 1.2.0</td>
<td>Native DOMContentLoaded</td>
<td>X</td>
<td>X</td>
<td></td>
<td></td>
</tr>
<tr>
<td><a href="http://javascript.nwbox.com/IEContentLoaded/">IEContentLoaded</a></td>
<td>N/A to Opera</td>
<td>X</td>
<td>X</td>
<td>X</td>
<td></td>
</tr>
<tr>
<td><a href="http://www.thefutureoftheweb.com/blog/adddomloadevent">addDOMLoadEvent</a></td>
<td>Native DOMContentLoaded</td>
<td>X</td>
<td>X</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

As you can see above, **Opera typically will fire DOMContentLoaded prior to stylesheets loading** successfully (ignoring the jQuery specific code to provide consistency cross-browser)

*Thanks to [Adam Koch][12] for first pointing me in the direction of jQuery in an iframe ignoring DOMContentLoaded in IE.*

 [12]: http://www.adamkoch.com/

**Update:** There is an open ticket for [YUI on Sourceforge][13], and I’ve opened a ticket for [jQuery on their Trac site][14].

 [13]: http://sourceforge.net/tracker/index.php?func=detail&aid=2008289&group_id=165715&atid=836476
 [14]: http://dev.jquery.com/ticket/3693
