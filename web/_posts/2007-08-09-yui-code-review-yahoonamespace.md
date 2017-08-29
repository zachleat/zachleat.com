---
title: 'YUI Code Review: YAHOO.namespace'
author: Zach Leatherman
layout: post
permalink: /yui-code-review-yahoonamespace/
categories:
  - JavaScript
tags:
  - Namespacing
  - YUI
  - feedtrim
---

*This is the first in a one part series of posts (the is optional) reviewing the actual code contained in the YUI library. This series is not intended for advanced JavaScripters, so if you’re insulted by reading things you already know, you probably aren’t a very good student.*

YAHOO.namespace. This is a great little utility function that gives you an easy way to encourage low coupling throughout your JavaScript code. Divide your functions into functional units! If you already know how to use this function, you can skip to the bottom to learn a few JavaScript tricks Yahoo has put in. If not, keep reading! Are you making a new package you want to put under the YAHOO namespace? Just declare it in a string argument passed into the YAHOO.namespace function:

    YAHOO.namespace( 'myNamespace' );

This will create a YAHOO.myNamespace object that can be used many different ways. You can assign a single function to it:

    YAHOO.myNamespace = function() {};
     
    YAHOO.myNamespace();

Or you can assign multiple functions to it (with private variables included) using the [amazing Module Pattern][1]:

 [1]: http://yuiblog.com/blog/2007/06/12/module-pattern/

    YAHOO.myNamespace = function() {
      var myPrivateVariable;
     
      return {
        myFirstFunction: function() { return myPrivateVariable; },
        mySecondFunction: function() {}
      }
    }();
     
    var hisOrHerPrivateVariable = YAHOO.myNamespace.myFirstFunction();
    YAHOO.myNamespace.mySecondFunction();

Did you know that you can pass multiple arguments into YAHOO.namespace? I’ve been using YUI all this time and didn’t know about this feature. But the more I think about it, the more I doubt it’s usefulness. When are you going to declare two unrelated namespaces adjacently in code? For example, doing this is redundant in YUI:

    YAHOO.namespace( 'myNamespace' );
    YAHOO.namespace( 'myNamespace.myNestedNamespace' );

The second call to YAHOO.namespace will reuse ‘myNamespace’ if it exists, and create it if it doesn’t. But the point here is that you can do something like the following:

    YAHOO.namespace( 'myNamespace', 'myOtherNamespace' );

which will create YAHOO.myNamespace and YAHOO.myOtherNamespace, and return a reference to the last one created, in this case YAHOO.myOtherNamespace.

Here’s the code from this nice little function:

    YAHOO.namespace = function() {
        var a=arguments, o=null, i, j, d;
        for (i=0; i<a .length; i=i+1) {
            d=a[i].split(".");
            o=YAHOO;
     
            // YAHOO is implied, so it is ignored if it is included
            for (j=(d[0] == "YAHOO") ? 1 : 0; j<d.length; j=j+1) {
                o[d[j]]=o[d[j]] || {};
                o=o[d[j]];
            }
        }
     
        return o;
    };

1. `var a=arguments`: They’re iterating over the arguments passed into the function to declare multiple simultaneously. Arguments is the variable passed into every function that you can use if you want to handle a variable number of arguments. You can also declare a few arguments in the function( myArg ) and use the arguments variable if you want.
1. `j=(d[0] == "YAHOO") ? 1 : 0` They reuse the YAHOO top level object if not explicitly included into the declaration. Start the index at 1 if YAHOO was declared to skip defining it twice.
1. `o[d[j]]=o[d[j]] || {};` They reuse existing namespaces if they have already been created. The OR || declaration means that Javascript will use {} (an empty object) if `o[d[j]]` is undefined.
