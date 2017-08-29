---
title: 8 Things the YUI Library Needs to Win Me Back
author: Zach Leatherman
layout: post
permalink: /8-things-the-yui-library-needs-to-win-me-back/
Version Specific Article:
  - YUI 2.2.2
categories:
  - JavaScript
tags:
  - deprecated
  - feedtrim
---

I’ve been cheating on my first love.  When I first started seriously JavaScripting and not CopyPasteScripting, my first framework was the Yahoo User Interface Library.  I was just beginning to realize the power of a JavaScript framework, but at the time I also thought that the Dom was an actor in Hollywood’s [The Cannonball Run](http://www.domdeluise.com).  Hey, everyone’s gotta get their start somewhere.

![Dom](/web/wp-content/uploads/2007/07/dom.jpg)

But now I’ve been learning advanced JavaScripting techniques.  I’m not a bad person… but I’ve been experimenting with new frameworks while YUI was out of town on business.  And ever since I’ve been going behind YUI’s back, I’ve been feeling guilty because it feels so good to cheat.  I am experiencing all these new JavaScript programming ideas that I’ve never felt before.  But at the same time, I feel regret.  We are still friends and I still hang out with YUI often, but I know she wants me back full time.  I am open to that possibility, but first I want her to change a few things.

1.  CSS Selector Engine:  All the major frameworks are doing it.  cssQuery started it (I think?).  jQuery was built on it.  Ext revolutionized it.  Even Mootools, Prototype, and Dojo have their own implementations.  Where is my baby?
2.  An **official** community driven plug-in system: No, I’m not talking about [yazaar.org](http://yazaar.org/), although it is a good idea.  I want something official, to give credibility to plug-in contributors.  You can still have control of your main components, but why not open it up?
3.  An iterator?  I’m of course talking about the each() function in jQuery, which operates on both Array’s and Object’s without discretion.
4.  Easier Databinding.  Why do I have to program my own logic to iterate through the XML returned in my Ajax call?  At least something that allows me to query an XML document easier (see CSS Selector Engine)
5.  I know I probably shouldn’t be talking about the component controls, since those are really ancillary to the framework, but a DataTable that supports both horizontal and vertical scrolling while always showing the headers!
6.  Form Validation Utility, or at least a few convenience functions to deal with forms, especially radios and checkboxes.
7.  Of course, I would have said easier operations on HTMLElement’s, but the new YUI Element (Beta) Utility is doing wonders there.  But how about some sort of DOM Creation class?  Of course, I couldn’t mention this without plugging the DOM Creation class I built for YUI called [DOMDom](/web/2007/07/07/domdom-easy-dom-element-creation/).
8.  Client Browser Detection.  While I would never encourage sniffing glue, sometimes sniffing the browser is unavoidable.  This would be a nice convenience when porting plug-in code from other libraries as well.

Some might say Chaining, one of jQuery’s biggest features or a la Dustin Diaz’s extension to YUI called DED|Chain.  But to be quite honest, that doesn’t bother me too much.  Chaining might increase convenience a little bit, but perhaps at the sacrifice of a small amount of code readability.  Either way, it isn’t necessary to me.

So, there you have it.  YUI, you will always have a piece of my heart.  But for now, you only have a piece.  Do you want me back or not?

I’ll go over what I’m looking for in the new library I’ve been eyeing in a future article I’m tentatively calling “X Things jQuery Needs to Win Me Over.”  Stay tuned.
