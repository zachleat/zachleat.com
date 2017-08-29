---
title: Using DOM Query Libraries in YUI
author: Zach Leatherman
layout: post
permalink: /using-dom-query-libraries-in-yui/
Version Specific Article:
  - YUI 2.3.0
categories:
  - JavaScript
tags:
  - deprecated
  - feedtrim
---

Recently, I posted the top 8 things I thought the YUI Library needed to be a top tier JavaScript library again. One of those things included a CSS Selector DOM Querying class. Use one of these babies for awhile, and you’ll never be able to code without it again. They’re amazingly useful and will shorten your code quite beautifully.

So, let’s plug one of them into YUI! Let’s get some of that power under the hood. And let’s make it work identically to how we write our code for YUI currently, instead of changing the coding style (a la Dustin Diaz’s great extension to YUI called [DED|Chain][1]).

 [1]: http://dedchain.dustindiaz.com/

How are we going to do this? Let’s dive into the shallow end of the pool.

The include order of our javascript files is going to be important. So, first we’ll do the YUI library core file (either yahoo-dom-event.js or utilities.js depending on your need for animation). Next, we need to include a CSS Selector DOM Querying class. For this proof of concept, I’ve provided examples for my two favorites, the jQuery engine and Jack Slocum’s DomQuery. These files are released under the MIT license, so make sure that complies with your project. It’s pretty liberal, so you shouldn’t have any problems. If you find these querying libraries useful, please donate to these projects!

For code simplicity, I’ve added a one liner to Jack’s DomQuery to make it work as a standalone file.

    if( typeof Ext == 'undefined' ) var Ext = function(){};

If you want to read more about DomQuery, you can go to [Jack’s site all about syntax and benchmarks][2].

 [2]: http://www.jackslocum.com/blog/2007/01/11/domquery-css-selector-basic-xpath-implementation-with-benchmarks/

Download: [Jack Slocum’s DomQuery Standalone File (24 KB)][3] 1.0 Alpha 3 – Rev 4  
Download: [Jack Slocum’s DomQuery Standalone File Packed (7 KB)][4] 1.0 Alpha 3 – Rev 4

 [3]: /Projects/Y2/DomQuery.js
 [4]: /Projects/Y2/DomQuery-packer.js

If you want to use jQuery’s selector engine, I’ve stripped out the functions unnecessary to the selector engine in the 1.1.3.1 release and packaged it up as jDomQuery. There are differences between these two package’s syntax, so make sure you keep that in mind, especially when looking at the pseudos, like :gt() and :lt() for example.

Download: [jDomQuery Standalone File (23 KB)][5] 1.1.3.1  
Download: [jDomQuery Standalone File Packed (10 KB)][6] 1.1.3.1

 [5]: /Projects/Y2/jdomquery-1.1.3.1.js
 [6]: /Projects/Y2/jdomquery-1.1.3.1-packer.js

If you want to read about jQuery syntax, [go over to their documentation][7]. My current preference is the jQuery syntax, given that it [works with poorly implemented JSF ID attributes][8]. But that’s a different argument.

 [7]: http://docs.jquery.com/Selectors
 [8]: /web/2007/07/10/javascript-frameworks-and-jsf/

If you want to use the full jQuery library, that should work too, but if you want to do that, you might just want to switch to using jQuery at that point (dare I say it).

Next, we’ll extend the YAHOO.util.Dom class into a new Y2 namespace. This will map all of the functions from YAHOO.util.Dom into a new CSS Selector extension.

## Download: [Y2.util.Dom (2 KB)][9]

 [9]: /Projects/Y2/Dom.js

(pack at your own leisure, you can do it online at [Dean Edward’s Packer][10])

 [10]: http://dean.edwards.name/packer/

# Putting It All Together

    <html>
      <body>
        <div>
          <div class="first">
            <span></span>
          </div>
          <div class="second">
            <b></b>
          </div>
        </div>
        <script type="text/javascript" src="/Lib/yui/build/yahoo-dom-event/yahoo-dom-event.js"></script>
        <script type="text/javascript" src="jdomquery-1.1.3.1-packer.js"></script>
        <!-- <script type="text/javascript" src="DomQuery-packer.js"> -->
        <script type="text/javascript" src="Dom.js"></script>
        <script type="text/javascript">
        Y2.util.Dom.addClass( 'div div:last', 'myClass' )
        Y2.util.Dom.hasClass( 'div div:last', 'myClass' ); // returns true
        var b = Y2.util.Dom.get( 'div div:last b' );
        Y2.util.Dom.addClass( b, 'myOtherClass' );
        </script>
      </body>
    </html>

One important thing to note is that when using the CSS Selector syntax, when only one node is selected, functions will return a scalar instead of an array. So if you’re expecting to select multiple nodes in your selector query and only one node results, make sure your code handling the result is prepared for such an instance.

Have fun!
