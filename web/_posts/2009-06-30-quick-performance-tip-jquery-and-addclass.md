---
title: 'Quick Performance Tip: jQuery and addClass'
author: Zach Leatherman
layout: post
permalink: /quick-performance-tip-jquery-and-addclass/
Version Specific Article:
  - jQuery 1.3.2
categories:
  - JavaScript
tags: null
---

Abstractions are helpful and dangerous. But the more we know about a library’s internals, the less danger we’ll be in later. Here’s an issue I ran into where I had assumed that jQuery would be optimized for this case, but it wasn’t. I’ll go over my bad assumption and how to workaround it.

As of jQuery 1.3.2, adding multiple HTML classes to an element using jQuery’s addClass method will add them one at a time, modifying the className property of an element for each class.

    $('#myElement').addClass('myFirstClass mySecondClass');

Here’s the original code inside of jQuery 1.3.2. Note how the classNames string is split, and elem.className is changed for each split entry.

    add: function( elem, classNames ) {
    jQuery.each((classNames || "").split(/\s+/), function(i, className){
        if ( elem.nodeType == 1 && !jQuery.className.has( elem.className, className ) )
            elem.className += (elem.className ? " " : "") + className;
        });
    },
    // ...

This may cause longer than needed delays, as reflow may occur after every class is added individually. If absolutely necessary, you can always fall back to modifying the className yourself, like so:

    $('#myElement').each(function() {
       this.className += ' myFirstClass mySecondClass';
    });

Most likely, this isn’t a tip that will be needed, but it is useful to be aware of.
