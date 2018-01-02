---
title: JavaScript Frameworks and JSF
author: Zach Leatherman
layout: post
permalink: /javascript-frameworks-and-jsf/
Version Specific Article:
  - Specified Below
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
  - deprecated
  - feedtrim
  - popular-posts-total
postRankTotalViews: 19
daysPosted: 3829
yearsPosted: 10.5
---

You’re programming a new web application using JSF, maybe with Facelets, maybe without. Which client-side JavaScript framework is going to work with it’s unstandardized method of assigning ID attributes to it’s elements? Here is an example of a JSF file:  

    <%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
    <%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
    <html>
    <body>
    <f:view>
    <h:form id="myForm">
    <h:inputText id="myText"/>
    </h:form>
    </f:view>
    </body>
    </html>

or maybe the same thing using Facelets:  

    <html xmlns="http://www.w3.org/1999/xhtml"
    xmlns:h="http://java.sun.com/jsf/html"
    xmlns:f="http://java.sun.com/jsf/core">
    <body>
    <f:view>
    <form jsfc="h:form" id="myForm">
    <input type="text" jsfc="h:inputText" id="myText"/>
    </form>
    </f:view>
    </body>
    </html>

These will both output the following result:  

    <html xmlns="http://www.w3.org/1999/xhtml"
    xmlns:ui="http://java.sun.com/jsf/facelets">
    <body>
    <form id="myForm">
    <input type="text" id="myForm:myText"/>
    </form>
    </body>
    </html>

Notice how the resulting text field has an ID attribute with the parent id prepended on. Now the real question is, how do we select this result node using the various JavaScript frameworks that are available to us?

## Works, but we don’t care: Raw JavaScript or any GetById Function

Obviously using `document.getElementById( 'myForm:myText' );` will function correctly. As will any framework that has a similar “GetById” function (YAHOO.util.Dom.get, or $ in Prototype, etc) What is more interesting to us is the behavior using the various CSS selector packages included with each JavaScript library.

## Does not work: [DomQuery][1] in Ext 1.1 Beta 2

 [1]: http://extjs.com/deploy/ext/docs/output/Ext.DomQuery.html

    Ext.query( '#myForm:myText' );
    Ext.query( '#myForm\:myText' );

These two tests will throw the error `Ext.DomQuery.pseudos[name] is not a function`, which obviously means that myText is not a pseudo class like :first or :last.

    Ext.query( '#myForm\\:myText' );

Throws the error: `Error parsing selector, parsing failed at "\:myText"`

## Works: [jQuery][2] 1.1.3

 [2]: http://docs.jquery.com/DOM/Traversing/Selectors

    jQuery( '#myForm\\:myText' );

As of version 1.1.3 (the latest of this writing), they have added support for the colon in ID selection when escaped with a double backslash. Versions older than 1.1.3 will not function properly. This is not yet in the documentation but can be viewed in the [Escape selectors section of a blog post][3].

 [3]: http://jquery.com/blog/2007/07/01/jquery-113-800-faster-still-20kb/

## Does not Work: [Prototype][4] 1.5.1.1

 [4]: http://www.prototypejs.org/api/utility/dollar-dollar

    $$( '#myForm:myText' );
    $$( '#myForm\:myText' );

Returns the form instead of the input element and treats myText as a pseudo class.

    $$( '#myForm\\:myText' );

Interprets as XPATH selectors (`\\` means anywhere in the document), using myText as a pseudo selector now, so it returns ALL nodes in the document.

## Does not Work: [Dojo query][5] 0.9.0 Beta

 [5]: http://dojotoolkit.org/node/336

    dojo.query( '#myForm:myText' );
    dojo.query( '#myForm\:myText' );
    dojo.query( '#myForm\\:myText' );

It’s becoming mind numbingly obvious that if the framework doesn’t specifically say that you can escape selectors, it’s not going to let you do so. In the first two tests, Dojo performs the same as Prototype. In the double backslash test however, Dojo returns no result nodes.

## Does not Work: [Mootools][6] 1.11

 [6]: http://docs.mootools.net/Element/Element-Selectors.js

    $$( '#myForm:myText' );
    $$( '#myForm\:myText' );
    $$( '#myForm\\:myText' );

All throw the error `The expression is not a legal expression." code: "51`.

There you have it folks. jQuery is the JavaScript library of choice for the discerning JSF applications developer. Kudos to you if you’re already using it.
