---
title: 'Quick Performance Tip: jQuery and addClass'
author: Zach Leatherman
layout: post
permalink: /quick-performance-tip-jquery-and-addclass/
Version Specific Article:
  - jQuery 1.3.2
bttc_cache:
  - 1299719272:0
categories:
  - JavaScript
tags:
  - jQuery
  - Performance
---
# 

Abstractions are helpful and dangerous. But the more we know about a library’s internals, the less danger we’ll be in later. Here’s an issue I ran into where I had assumed that jQuery would be optimized for this case, but it wasn’t. I’ll go over my bad assumption and how to workaround it.

As of jQuery 1.3.2, adding multiple HTML classes to an element using jQuery’s addClass method will add them one at a time, modifying the className property of an element for each class.

    $&#40;'#myElement'&#41;.addClass&#40;'myFirstClass mySecondClass'&#41;;

Here’s the original code inside of jQuery 1.3.2. Note how the classNames string is split, and elem.className is changed for each split entry.

    add: function&#40; elem, classNames &#41; &#123;
        jQuery.each&#40;&#40;classNames || ""&#41;.split&#40;/s /&#41;, function&#40;i, className&#41;&#123;
            if &#40; elem.nodeType == 1 && !jQuery.className.has&#40; elem.className, className &#41; &#41;
                elem.className  = &#40;elem.className ? " " : ""&#41;   className;
            &#125;&#41;;
        &#125;,
    // ...

This may cause longer than needed delays, as reflow may occur after every class is added individually. If absolutely necessary, you can always fall back to modifying the className yourself, like so:

    $&#40;'#myElement'&#41;.each&#40;function&#40;&#41;
    &#123;
       this.className  = ' myFirstClass mySecondClass';
    &#125;&#41;;

Most likely, this isn’t a tip that will be needed, but it is useful to be aware of.