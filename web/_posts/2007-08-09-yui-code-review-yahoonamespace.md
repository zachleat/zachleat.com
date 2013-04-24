---
title: 'YUI Code <span class="widow">Review: YAHOO.namespace</span>'
author: Zach Leatherman
layout: post
permalink: /yui-code-review-yahoonamespace/
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299718871:0
categories:
  - JavaScript
tags:
  - Namespacing
  - YUI
---
# 

*This is the first in a one part series of posts (the is optional) reviewing the actual code contained in the YUI library. This series is not intended for advanced JavaScripters, so if you’re insulted by reading things you already know, you probably aren’t a very good student.*

YAHOO.namespace. This is a great little utility function that gives you an easy way to encourage low coupling throughout your JavaScript code. Divide your functions into functional units! If you already know how to use this function, you can skip to the bottom to learn a few JavaScript tricks Yahoo has put in. If not, keep reading! Are you making a new package you want to put under the YAHOO namespace? Just declare it in a string argument passed into the YAHOO.namespace function:

    YAHOO.namespace&#40; 'myNamespace' &#41;;

This will create a YAHOO.myNamespace object that can be used many different ways. You can assign a single function to it:

    YAHOO.myNamespace = function&#40;&#41; &#123;&#125;;
    &nbsp;
    YAHOO.myNamespace&#40;&#41;;

Or you can assign multiple functions to it (with private variables included) using the [amazing Module Pattern][1]:

 [1]: http://yuiblog.com/blog/2007/06/12/module-pattern/

    YAHOO.myNamespace = function&#40;&#41; &#123;
    	var myPrivateVariable;
    &nbsp;
    	return &#123;
    		myFirstFunction: function&#40;&#41; &#123; return myPrivateVariable; &#125;,
    		mySecondFunction: function&#40;&#41; &#123;&#125;
    	&#125;
    &#125;&#40;&#41;;
    &nbsp;
    var hisOrHerPrivateVariable = YAHOO.myNamespace.myFirstFunction&#40;&#41;;
    YAHOO.myNamespace.mySecondFunction&#40;&#41;;

Did you know that you can pass multiple arguments into YAHOO.namespace? I’ve been using YUI all this time and didn’t know about this feature. But the more I think about it, the more I doubt it’s usefulness. When are you going to declare two unrelated namespaces adjacently in code? For example, doing this is redundant in YUI:

    YAHOO.namespace&#40; 'myNamespace' &#41;;
    YAHOO.namespace&#40; 'myNamespace.myNestedNamespace' &#41;;

The second call to YAHOO.namespace will reuse ‘myNamespace’ if it exists, and create it if it doesn’t. But the point here is that you can do something like the following:

    YAHOO.namespace&#40; 'myNamespace', 'myOtherNamespace' &#41;;

which will create YAHOO.myNamespace and YAHOO.myOtherNamespace, and return a reference to the last one created, in this case YAHOO.myOtherNamespace.

Here’s the code from this nice little function:

    YAHOO.namespace = function&#40;&#41; &#123;
        var a=arguments, o=null, i, j, d;
        for &#40;i=; i