---
title: 'JavaScript Frameworks and JSF'
author: Zach Leatherman
layout: post
permalink: /javascript-frameworks-and-jsf/
Version Specific Article:
  - Specified Below
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299719135:0
categories:
  - Java
  - JavaScript
tags:
  - Dojo
  - ExtJS
  - Facelets
  - jQuery
  - JSF
  - Mootools
  - Prototype
---
# 

You’re programming a new web application using JSF, maybe with Facelets, maybe without. Which client-side JavaScript framework is going to work with it’s unstandardized method of assigning ID attributes to it’s elements? Here is an example of a JSF file:  
`



 
   
     
      
     
   
 

`

or maybe the same thing using Facelets:  
`

 
   
     
      
     
   
 

`

These will both output the following result:  
`

 
     
      
     
 

`

Notice how the resulting text field has an ID attribute with the parent id prepended on. Now the real question is, how do we select this result node using the various JavaScript frameworks that are available to us?

# Works, but we don’t care: Raw JavaScript or any GetById Function

Obviously using `document.getElementById( 'myForm:myText' );` will function correctly. As will any framework that has a similar “GetById” function (YAHOO.util.Dom.get, or $ in Prototype, etc) What is more interesting to us is the behavior using the various CSS selector packages included with each JavaScript library.

# Does not work: [DomQuery][1] in Ext 1.1 Beta 2

 [1]: http://extjs.com/deploy/ext/docs/output/Ext.DomQuery.html

    Ext.query&#40; '#myForm:myText' &#41;;
    Ext.query&#40; '#myForm:myText' &#41;;

These two tests will throw the error `Ext.DomQuery.pseudos[name] is not a function`, which obviously means that myText is not a pseudo class like :first or :last.

    Ext.query&#40; '#myForm\:myText' &#41;;

Throws the error: `Error parsing selector, parsing failed at ":myText"`

# Works: [jQuery][2] 1.1.3

 [2]: http://docs.jquery.com/DOM/Traversing/Selectors

    jQuery&#40; '#myForm\:myText' &#41;;

As of version 1.1.3 (the latest of this writing), they have added support for the colon in ID selection when escaped with a double backslash. Versions older than 1.1.3 will not function properly. This is not yet in the documentation but can be viewed in the [Escape selectors section of a blog post][3].

 [3]: http://jquery.com/blog/2007/07/01/jquery-113-800-faster-still-20kb/

# Does not Work: [Prototype][4] 1.5.1.1

 [4]: http://www.prototypejs.org/api/utility/dollar-dollar

    $$&#40; '#myForm:myText' &#41;;
    $$&#40; '#myForm:myText' &#41;;

Returns the form instead of the input element and treats myText as a pseudo class.

    $$&#40; '#myForm\:myText' &#41;;

Interprets as XPATH selectors (\ means anywhere in the document), using myText as a pseudo selector now, so it returns ALL nodes in the document.

# Does not Work: [Dojo query][5] 0.9.0 Beta

 [5]: http://dojotoolkit.org/node/336

    dojo.query&#40; '#myForm:myText' &#41;;
    dojo.query&#40; '#myForm:myText' &#41;;
    dojo.query&#40; '#myForm\:myText' &#41;;

It’s becoming mind numbingly obvious that if the framework doesn’t specifically say that you can escape selectors, it’s not going to let you do so. In the first two tests, Dojo performs the same as Prototype. In the double backslash test however, Dojo returns no result nodes.

# Does not Work: [Mootools][6] 1.11

 [6]: http://docs.mootools.net/Element/Element-Selectors.js

    $$&#40; '#myForm:myText' &#41;;
    $$&#40; '#myForm:myText' &#41;;
    $$&#40; '#myForm\:myText' &#41;;

All throw the error `The expression is not a legal expression." code: "51`.

There you have it folks. jQuery is the JavaScript library of choice for the discerning JSF applications developer. Kudos to you if you’re already using it.