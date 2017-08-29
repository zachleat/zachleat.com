---
title: Namespacing outside of the YAHOO Namespace
author: Zach Leatherman
layout: post
permalink: /namespacing-outside-of-the-yahoo-namespace/
categories:
  - JavaScript
tags:
  - jQuery
  - Namespacing
  - YUI
  - feedtrim
---

YAHOO.namespace(). A lovely little utility function subject that [I’ve written about before][1]. If you’ve never heard of YAHOO.namespace or aren’t even familiar with namespacing, I’d read that article first.

 [1]: http://www.zachleat.com/web/2007/08/09/yui-code-review-yahoonamespace/

I’ll be honest, using the YAHOO namespace to store my own code makes my bunghole tighten just a little bit. What if I had written code stored under YAHOO.tool, which was unused prior to YUI 2.3.0? What would I do now? I’d have to rewrite my code, or never include any of the wonderful `YAHOO.tool.TestCase`, put together by [Nicholas Zakas][2]. As is traditional with most of my weblog posts, I try not to just complain about a problem without giving you a solution (but let’s be honest, only if it doesn’t take too much work).

 [2]: http://www.nczonline.net/

Let’s rewrite the YAHOO.namespace function to work outside of the YAHOO Namespace, so we can do things like this:

    namespace( 'zachsWorld.partyTime' );
    zachsWorld.partyTime = function() {
      alert( 'Excellent.' );
    }
    zachsWorld.partyTime(); // obviously would alert: Excellent.

Here’s some code:

    function namespace() {
        var a=arguments, o=null, i, j, d;
        for (i=0; i<a.length; i=i+1) {
            d=a[i].split(".");
            o=window;
            for (j=0; j<d.length; j=j+1) {
                o[d[j]]=o[d[j]] || {};
                o=o[d[j]];
            }
        }
        return o;
    };

Obviously this is just a modification of the YAHOO.namespace function. I’d recommend putting this under your own namespace (I’m trying to put most of the code I write on this website under the Y2 namespace, but everyone should have their own parent namespace), like so (any namespaces you create using this function won’t use the parent namespace assigned here by default):

    if (typeof Y2 == "undefined") {
        var Y2 = {};
    }
    Y2.namespace = function() { /* copy function contents from above. */ };

But you can do whatever you want. This is one of the functions that I think separates YUI from the other frameworks out there, giving an easy utility to organize your code. This is something I think jQuery seriously lacks, noting from the code inside the many jQuery plugins contributed by end users. Many jQuery contributors do not organize their code, putting multiple unnecessary top level functions into jQuery.fn as methods, or into the jQuery object itself as functions. People whine about polluting the global namespace… I suppose it might be considered nitpickey to whine about the jQuery namespace. Okay you whiney bastard, let’s help out and put this into jQuery!

    // include jQuery first.
    jQuery.namespace = function() {
        var a=arguments, o=null, i, j, d;
        for (i=0; i<a.length; i=i+1) {
            d=a[i].split(".");
            o=window;
            for (j=0; j<d.length; j=j+1) {
                o[d[j]]=o[d[j]] || {};
                o=o[d[j]];
            }
        }
        return o;
    };

Please note, this method does NOT work using jQuery methods with an element context, such as jQuery(‘div’).myNamespace.myMethod(). Your element context won’t be carried through to myMethod().

However, you can use it for jQuery functions, such as this:

    // definition
    jQuery.namespace( 'jQuery.debug' );
    jQuery.debug.test1 = function()
    {
        alert( 'test1 function' );
    };
    jQuery.debug.test2 = function()
    {
        alert( 'test2 function' );
    };
    // usage
    jQuery.debug.test1();
    jQuery.debug.test2();

For more information, you can read [Global Domination](http://yuiblog.com/blog/2006/06/01/global-domination/), an article written by Douglas Crockford, or [Best Practices for Writing jQuery plugins](http://docs.jquery.com/Plugins/Authoring).

**Updated**: fixed some weird source parsing errors introduced by the code formatting plugin.
