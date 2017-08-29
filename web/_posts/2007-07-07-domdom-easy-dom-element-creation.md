---
title: 'DOMDom, easy DOM Element Creation'
author: Zach Leatherman
layout: post
permalink: /domdom-easy-dom-element-creation/
categories:
  - JavaScript
  - Projects
tags:
  - CSS Selectors
  - DOM
  - ExtJS
  - YUI
  - project
  - feedtrim
---

Generally when approaching a complex problem involving web programming in JavaScript, the first question I ask myself is ‘What would Jesus do?’ As much as I am entertained by a mental picture of Mr. Jesus himself sitting on his [Jesux Distro][1] appending children (and parents) into his DOM, I am instead distracted by an intense “passionate” hatred for Mel Gibson swelling in my chest. It’s actually quite distracting to the problem I am having, but I calm myself by punching my 4 foot tall inflatable Mad Max and wonder how much time I waste doing this. I figure it happens about twice an hour. (Digression)

 [1]: http://www.geocities.com/ResearchTriangle/Node/4081/

The DOM. Arch-nemesis of web developers attempting to support the ultimately tiny (I think it’s down to about 5 or 8% now?) sliver of browser market share that Internet Explorer currently entails. Let’s make it easier on ourselves and make a little package to do it for us. Run a function, pass in an argument with a description of the DOM node(s) we wish to create, and have the package auto-correct any bugs we would have encountered during manual creation, and maybe even have it inserted or appended for us.

But wait, why are we doing this when there are literally 80 billion other DOM element creation classes already out there? It’s all about syntax. The existing packages are incredibly verbose, focusing too much on a complex object structure to describe the nodes, in some cases even having separate objects for attributes inside a single node. Why not use the syntax we’ve already come to love in the various DOM query libraries that are available? Why not use DOMDom? Let’s see a few examples:

Single Node String

    'div'

    <div></div>

Single Node String with ID and Classes

    'div#id1.class1.class2'

    <div id="id1" class="class1 class2"></div>

Single Node String for a Form Element

    'input[name="myTextBox",type="text",maxlength="5"]'

    <input name="myTextBox" maxlength="5" type="text"/>

Single Node String with Style Syntax

    'div{height=80px,color=#f90,border=1px solid #000}'

    <div style="border: 1px solid #000; height: 80px; color: #f90"></div>
    

Complex Single Node String with ID, multiple classes, Style, and Namespaced Attribute)

    'div#id1.class1.class2[style="width:60px;color:#f90",@class="class4",@att="true",@namespace:att="false"]'

    <div id="id1" att="true" namespace:att="false" class="class1 class2 class4" style="width: 60px; color: #f90;"></div>


Multiple Node String: Linear (Parents with one Child)

    'div span div'

    <div>
         <span>
              <div></div>
         </span>
    </div>

Multiple Node String: Non-Linear (Parent with more than one Child)

    { 'div': [ 'span', 'span' ] }

    <div>
         <span></span>
         <span></span>
    </div>

## How Does It Work?

By default, it’s set up to do HTML Fragments (innerHTML) because they are much speedier than the manual DOM element creation (createElement). But if you desire, you can toggle a boolean in the code and it will switch back to DOM element creation. When in DOM element creation mode, it will account for the following browser bugs:

*   (IE6) Standardized for attribute representation (pointer to htmlFor)
*   (IE6) Standardized case for accesskey, usemap, maxlength, and frameborder attributes.
*   (IE6) Standardized checked attribute for radio and checkboxes.
*   (IE6) Special consideration for dynamic handling of name and type attributes (on form elements).
*   (Firefox) [Works with whitespace that is treated as a node.][2]

 [2]: http://developer.mozilla.org/en/docs/Whitespace_in_the_DOM

## Syntax

You should already be able to tell how to create a node from the examples above. Here are some more things you might not have guessed:

Creating a node with an id

    'div#myId'

Creating a node with CSS classes

    'div.class1.class2'

Creating two nodes at the same level

    [ 'div', 'div' ]

Creating a node with two children

    { 'div': [ 'div', 'div' ] }

You can mix the {} and [] syntax wherever you like, but if you want a node to have non-linear children, you have to use the {} object notation.

Creating a text node (start the node declaration with a #, you can change this to another non-conflicting character in the code if you like)

    '#Any Text Here'

Creating a node with attributes (the @ is optional)

    'div[class="class3",style="width:60px;color:#f90",@att="true",@namespace:att="false"]'

Creating a node with a Style Shortcut (mixing with a style attribute is handled properly)

    'div{color=#f90,border=1px solid #000}[style="height:80px;background:#fff"]'

A few notes on attributes. Quotes are required on attributes (single or double but be consistent), but are not required in the style shortcut declaration. Quotes are not allowed to be nested inside of attributes (a single quote cannot be inside of a double quote and vice versa).

And of course, all of the above can be mixed together

    'div#myId.class1.class2{color=#f90}[customAttr="true",@customAttr2="false"] div#child1 div#child2'

## Usage

**Appending** at the end of a parent’s children:

    DOMDom.append( 'div', yourParentNode );

**Replacing** the children of a parent:

    DOMDom.replace( 'div', yourParentNode );

**Unshifting **(inserting at the beginning of a parent’s children):

    DOMDom.unshift( 'div', yourParentNode );

**Inserting** before a certain integer index of a parent’s children:

    // must have at least 3 children, the index is 0 based, if index is null with unshift by default
    DOMDom.insert( 'div', yourParentNode, 2 );

## Templates

Use `<$var> ` to indicate a variable, in this example `<$test>`

    // "Compile" the template
    var str = DOMDom.compile( { 'div.test span': '#Test <$test>' } );

    // Use your template in some context, notice the test variable being set.
    for( var j = 0; j < 1000; j++ )
    {
        // knows we're using a compiled template since we're passing in variables as a third argument.
        DOMDom.append( str, d, { test: j } );
    }

## Benchmarks 

**(If you have Firebug open, make sure it's not on the HTML tab, this will slow down the benchmark significantly)**

Most of my work here has been inspired by the DomQuery and DomHelper classes written by JavaScript rock star Jack Slocum (the guy's initials are J.S. for God's sake), so I modeled my benchmark after [his benchmark hosted on his website to test the DomHelper class][3]. I'm running the same nodes he's testing on his website, so the results should be comparable. You can [test my benchmark for DOMDom here][4]. Here are some results, reporting the average of 3 results with the format of an uncompiled element first and the compiled template in square brackets.  
 
### DOMDom Results

Internet Explorer 6: 666 ms [328 ms]  
Firefox 2.0.0.4: 1880 ms [666 ms]  
Safari 3.0.2 [Windows]: 546 ms [151 ms]  
Opera 9.21: 343 ms [140 ms]

### Comparative numbers from Jack Slocum's DomHelper

Internet Explorer 6: 2458 ms [677 ms]  
Firefox 2.0.0.4: 672 ms [458 ms]  
Safari 3.0.2 [Windows]: 291 ms [119 ms]  
Opera 9.21: 370 ms [166 ms]

The thing to take away from this is the question of why Satan is haunting my benchmarks? Two 666 averages? Anyway, DOMDom is quite a bit faster in the most popular browser, Internet Explorer, although I haven't tested it on IE7 yet. In Firefox, the opposite is true, with DomHelper taking the lead. Opera is comparable and Safari is faster in DomHelper as well. You can run your own tests using the links above.

## Dependencies

This library was built to work with Yahoo User Interface (YUI), but could be trivially ported to another library by changing the function dependencies listed in the ADAPTER variable in the code.

    var ADAPTER = {
      setStyle: YAHOO.util.Dom.setStyle,
      addClass: YAHOO.util.Dom.addClass,
      isString: YAHOO.lang.isString,
      isArray: YAHOO.lang.isArray,
      isNumber: YAHOO.lang.isNumber,
      isObject: YAHOO.lang.isObject,
      get: YAHOO.util.Dom.get
    }; // to port, change these references

If you're still reading this encyclopedia, here are some links:

*   [DOWNLOAD DOMDom][5]
*   [DOWNLOAD DOMDom Minimized with JSMIN (10KB)][6]
*   [DOWNLOAD DOMDom Minimized with Packer (6KB)][7]
*   [See the benchmark][4]
*   [See the test file with a bunch of examples of syntax][8]

[*-dom suffix denoting condition or state, as in freedom, wisdom, or DOMDom*][9]

**Update**: changed the variable syntax to allow variables inside of nodes (not just text). 


 [3]: http://www.jackslocum.com/blog/examples/domhelper.php
 [4]: http://www.zachleat.com/Projects/DOMDom/benchmark.html
 [5]: http://www.zachleat.com/Projects/DOMDom/DOMDom.js
 [6]: http://www.zachleat.com/Projects/DOMDom/DOMDom-min-jsmin.js
 [7]: http://www.zachleat.com/Projects/DOMDom/DOMDom-min-packer.js
 [8]: http://www.zachleat.com/Projects/DOMDom/tests.html
 [9]: http://www.encyclopedia.com/doc/1O27-dom1.html
