---
title: 'Write More Efficient Javascript in YUI with CSS Selectors'
author: Zach Leatherman
layout: post
permalink: /write-more-efficient-javascript-in-yui-with-css-selectors/
Version Specific Article:
  - YUI 2.3.0
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299718842:0
categories:
  - JavaScript
tags:
  - CSS Selectors
  - DOM
  - ExtJS
  - YUI
---
# 

*This is an updated version of a previous article entitled [Using DOM Query Libraries in YUI][1] for the new version of YAHOO.util.Dom included with YUI 2.3.0 as well as including support for passing context nodes into Dom functions.*

 [1]: http://www.zachleat.com/web/2007/07/30/using-dom-query-libraries-in-yui/

Here we are again. I just love those CSS Selectors. If you haven’t read Part One of the series linked above, I would encourage it to get a little background on why we’re attempting this approach.

# Download the appropriate files:

# Get the easy **ALL-IN-ONE file**: [Y2.js][2] (31 KB original source) OR [Y2-p.js][3] (11 KB minimized)

 [2]: /Lib/Y2/Y2.js
 [3]: /Lib/Y2/Y2-p.js

## Get the files separately (if you want to use a custom selector library, or have already included DomQuery or jQuery): [Y2-solo.js][4] (9 KB original source) OR [Y2-solo-p.js][5] (4 KB minimized)

 [4]: /Lib/Y2/Y2-solo.js
 [5]: /Lib/Y2/Y2-solo-p.js

Also, first you’ll need to get Jack’s nice DomQuery class.

Download: [Jack Slocum’s DomQuery Standalone File (24 KB)][6] 1.0 Alpha 3 – Rev 4  
Download: [Jack Slocum’s DomQuery Standalone File Packed (7 KB)][7] 1.0 Alpha 3 – Rev 4

 [6]: /Lib/Y2/DomQuery.js
 [7]: /Lib/Y2/DomQuery-packer.js

You can use the jDomQuery standalone, or any jQuery version, (instead of DomQuery) linked in the previous article, but there is an unresolved bug with the getRegion method since jQuery doesn’t return actual Array’s. But if you’re not using that method, have at it.

# What can I do with it?

I have not included ALL functions in this class, only the ones that take nodes in as arguments. If you use these functions, you are encouraged to use the unmodified versions contained in YAHOO.util.Dom. Functions not included here: getClientHeight, getClientWidth, getDocumentHeight, getDocumentScrollLeft, getDocumentScrollTop, getDocumentWidth, getViewportHeight, getViewportWidth.

Let’s see some documentation on this mother (if you’re wondering what the original functions do, see the [original documentation][8]).

 [8]: http://developer.yahoo.com/yui/docs/YAHOO.util.Dom.html

    // this is the test context node we're going to pass in
    var context = YAHOO.util.Dom.get&#40;'context'&#41;;

# addClass

Adds a CSS class to first matching node.

    // returns void
    Y2.util.Dom.addClass&#40; 'div div:last', 'myClass'&#41;;
    Y2.util.Dom.addClass&#40;'div div:last', context, 'myClassContext'&#41;;

# addClassAll

Adds a CSS class to all matching nodes.

    // returns void
    Y2.util.Dom.addClassAll&#40; 'div div:last', 'myClass'&#41;;
    Y2.util.Dom.addClassAll&#40;'div div:last', context, 'myClassContext'&#41;;

# hasClass

Tests the first result node returned to see if it has a CSS class.

    // returns Booleans.
    Y2.util.Dom.hasClass&#40;'div div:last', 'myClass'&#41;;
    Y2.util.Dom.hasClass&#40;'div div:last', context, 'myClassContext'&#41;;

# hasClassAll

Tests all matching nodes to see if they have a CSS class.

    // returns Array of Booleans.
    Y2.util.Dom.hasClassAll&#40;'div div:last', 'myClass'&#41;;
    Y2.util.Dom.hasClassAll&#40;'div div:last', context, 'myClassContext'&#41;;

# removeClass

Removes a CSS class from first matched node.

    // returns Boolean (misdocumented on the YAHOO.util.Dom page)
    Y2.util.Dom.removeClass&#40;'div.third','third'&#41;;
    Y2.util.Dom.removeClass&#40;'div.third', context,'third'&#41;;

# removeClassAll

Removes a CSS class from all matched nodes.

    // returns Array of Booleans (misdocumented on the YAHOO.util.Dom page)
    Y2.util.Dom.removeClassAll&#40;'div.third','third'&#41;;
    Y2.util.Dom.removeClassAll&#40;'div.third', context,'third'&#41;;

# replaceClass

Replaces a CSS class on first matched node with a new CSS class, or adds it if the old CSS class doesn’t exist.

    // returns Boolean (misdocumented on the YAHOO.util.Dom page)
    Y2.util.Dom.replaceClass&#40;'div.fourth','fourth','third'&#41;;
    Y2.util.Dom.replaceClass&#40;'div.fourth', context,'fourth','third'&#41;;

# replaceClassAll

Replaces a CSS class on all matched nodes with a new CSS class, or adds it if the old CSS class doesn’t exist.

    // returns Array of Booleans (misdocumented on the YAHOO.util.Dom page)
    Y2.util.Dom.replaceClassAll&#40;'div.fourth','fourth','third'&#41;;
    Y2.util.Dom.replaceClassAll&#40;'div.fourth', context,'fourth','third'&#41;;

# get

Get first matched node.

    // returns HTMLElement
    Y2.util.Dom.get&#40;'div b'&#41;;
    Y2.util.Dom.get&#40;'div b', context&#41;;

# getAll

Get all matched nodes.

    // returns Array of HTMLElement
    Y2.util.Dom.getAll&#40;'div b'&#41;;
    Y2.util.Dom.getAll&#40;'div b', context&#41;;

# batch

Executes a function against first matched node.

    // returns single return value from the function
    Y2.util.Dom.batch&#40;'div.second b', function&#40;el&#41;&#123;return el;&#125;&#41;;
    Y2.util.Dom.batch&#40;'div b', context, function&#40;el&#41;&#123;return el;&#125;&#41;;

# batchAll

Executes a function against all matched nodes.

    // returns Array of return values from the function
    Y2.util.Dom.batchAll&#40;'div.second b', function&#40;el&#41;&#123;return el;&#125;&#41;;
    Y2.util.Dom.batchAll&#40;'div b', context, function&#40;el&#41;&#123;return el;&#125;&#41;;

# generateId

Generates and assigns a unique ID attribute if not present on first matched element.

    // returns String (new ID attribute)
    Y2.util.Dom.generateId&#40;'div.first'&#41;;
    Y2.util.Dom.generateId&#40;'div.third', context&#41;;

# generateIdAll

Generates and assigns a unique ID attribute if not present on matched elements.

    // returns Array of String (new ID attributes)
    Y2.util.Dom.generateIdAll&#40;'div.first'&#41;;
    Y2.util.Dom.generateIdAll&#40;'div.third', context&#41;;

# getChildren

Gets all HTMLElement children of the first matched node (does not include text nodes or whitespace)

    // returns Array of HTMLElement
    Y2.util.Dom.getChildren&#40;'div.second'&#41;;
    Y2.util.Dom.getChildren&#40;'div.second', context&#41;;

# getChildrenBy

Returns all HTMLElement children of the first matched node that pass a Boolean function test. (does not include text nodes or whitespace)

    // returns Array of HTMLElement
    Y2.util.Dom.getChildrenBy&#40;'div.second', function&#40;el&#41;&#123;return el.getAttribute&#40;'id'&#41;=='theMiddleB';&#125;&#41;;
    Y2.util.Dom.getChildrenBy&#40;'div.second', context, function&#40;el&#41;&#123;return el.getAttribute&#40;'id'&#41;=='theMiddleB';&#125;&#41;;

# getAncestorBy

Returns the first HTMLElement ancestor of the first matched node that passes a Boolean function test. (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getAncestorBy&#40;'div.third', function&#40;el&#41;&#123;return el.getAttribute&#40;'id'&#41;=='context';&#125;&#41;;
    Y2.util.Dom.getAncestorBy&#40;'div.third', context, function&#40;el&#41;&#123;return el.getAttribute&#40;'id'&#41;=='context';&#125;&#41;;

# getAncestorByClassName

Returns the first HTMLElement ancestor of the first matched node that has a CSS Class. (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getAncestorByClassName&#40;'div.third', 'contextClass'&#41;;
    Y2.util.Dom.getAncestorByClassName&#40;'div.third', context, 'contextClass'&#41;;

# getAncestorByClassName

Returns the first HTMLElement ancestor of the first matched node that is a certain tag (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getAncestorByTagName&#40;'div.third', 'div'&#41;;
    Y2.util.Dom.getAncestorByTagName&#40;'div.third', context, 'div'&#41;;

# getFirstChild

Returns the first HTMLElement child of the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getFirstChild&#40;'div.second'&#41;;
    Y2.util.Dom.getFirstChild&#40;'div.second', context&#41;;

# getFirstChildBy

Returns the first HTMLElement child that passes a boolean function test from the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getFirstChildBy&#40;'div.second', function&#40;el&#41;&#123; return el.getAttribute&#40;'id'&#41;=='theMiddleB';&#125;&#41;;
    Y2.util.Dom.getFirstChildBy&#40;'div.second', context, function&#40;el&#41;&#123; return el.getAttribute&#40;'id'&#41;=='theMiddleB';&#125;&#41;;

# getLastChild

Returns the last HTMLElement child of the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getLastChild&#40;'div.second'&#41;;
    Y2.util.Dom.getLastChild&#40;'div.second', context&#41;;

# getLastChildBy

Returns the last HTMLElement child that passes a boolean function test from the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getLastChildBy&#40;'div.second', function&#40;el&#41;&#123; return el.getAttribute&#40;'id'&#41;=='theMiddleB';&#125;&#41;;
    Y2.util.Dom.getLastChildBy&#40;'div.second', context, function&#40;el&#41;&#123; return el.getAttribute&#40;'id'&#41;=='theMiddleB';&#125;&#41;;

# getNextSibling

Returns the next HTMLElement sibling of the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getNextSibling&#40;'div.second'&#41;;
    Y2.util.Dom.getNextSibling&#40;'div.second', context&#41;;

# getNextSiblingBy

Returns the next HTMLElement sibling that passes a boolean function test from the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getNextSiblingBy&#40;'div.second',function&#40;el&#41;&#123; return el.getAttribute&#40;'class'&#41;=='third';&#125;&#41;;
    Y2.util.Dom.getNextSiblingBy&#40;'div.second', context, function&#40;el&#41;&#123; return YAHOO.util.Dom.hasClass&#40;el,'third'&#41;;&#125;&#41;;

# getPreviousSibling

Returns the previous HTMLElement sibling of the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getPreviousSibling&#40;'div.second'&#41;;
    Y2.util.Dom.getPreviousSibling&#40;'div.second', context&#41;;

# getPreviousSiblingBy

Returns the previous HTMLElement sibling that passes a boolean function test from the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getPreviousSiblingBy&#40;'div.second',function&#40;el&#41;&#123; return el.getAttribute&#40;'class'&#41;=='third';&#125;&#41;;
    Y2.util.Dom.getPreviousSiblingBy&#40;'div.second', context, function&#40;el&#41;&#123; return YAHOO.util.Dom.hasClass&#40;el,'third'&#41;;&#125;&#41;;

# getRegion

Gets the [Region][9] containing the first matched element.

 [9]: http://developer.yahoo.com/yui/docs/YAHOO.util.Region.html

    // returns YAHOO.util.Region
    Y2.util.Dom.getRegion&#40;'div.second'&#41;;
    Y2.util.Dom.getRegion&#40;'div.second', context&#41;;

# getRegionAll

Gets all [Regions][9] containing all matched elements.

    // returns Array of YAHOO.util.Region
    Y2.util.Dom.getRegionAll&#40;'div.myClass'&#41;;
    Y2.util.Dom.getRegionAll&#40;'div.myClass', context&#41;;

# setStyle

Sets the style for the first matched node

    // returns void
    Y2.util.Dom.setStyle&#40;'div', 'border', '1px'&#41;;
    Y2.util.Dom.setStyle&#40;'div', context, 'border', '10px'&#41;;

# setStyleAll

Sets style for all matched nodes

    // returns void
    Y2.util.Dom.setStyleAll&#40;'div', 'border', '1px'&#41;;
    Y2.util.Dom.setStyleAll&#40;'div', context, 'border', '10px'&#41;;

# getStyle

Gets a specific style property from the first matched node

    // returns String of specific style property
    Y2.util.Dom.getStyle&#40;'div', 'border'&#41;;
    Y2.util.Dom.getStyle&#40;'div', context, 'border'&#41;;

# getStyleAll

Gets a specific style property from all matched nodes

    // returns Array of Strings of specific style property
    Y2.util.Dom.getStyleAll&#40;'div', 'border'&#41;;
    Y2.util.Dom.getStyleAll&#40;'div', context, 'border'&#41;;

# setX, setY, setXY

Sets the horizontal placement (X), vertical placement (Y), or both (XY) of the first matched element

    // returns void
    Y2.util.Dom.setX&#40;'div.second', 60&#41;;
    Y2.util.Dom.setX&#40;'div.second', context, 60&#41;;
    &nbsp;
    Y2.util.Dom.setY&#40;'div.second', 60&#41;;
    Y2.util.Dom.setY&#40;'div.second', context, 60&#41;;
    &nbsp;
    Y2.util.Dom.setXY&#40;'div.second', &#91;120,120&#93;&#41;;
    Y2.util.Dom.setXY&#40;'div.second', context, &#91;120,120&#93;&#41;;

# setXAll, setYAll, setXYAll

Sets the horizontal placement (X), vertical placement (Y), or both (XY) of all matched elements

    // returns void
    Y2.util.Dom.setXAll&#40;'div.second', 60&#41;;
    Y2.util.Dom.setXAll&#40;'div.second', context, 60&#41;;
    &nbsp;
    Y2.util.Dom.setYAll&#40;'div.second', 60&#41;;
    Y2.util.Dom.setYAll&#40;'div.second', context, 60&#41;;
    &nbsp;
    Y2.util.Dom.setXYAll&#40;'div.second', &#91;120,120&#93;&#41;;
    Y2.util.Dom.setXYAll&#40;'div.second', context, &#91;120,120&#93;&#41;;

# getX, getY, getXY

Gets the horizontal placement (X), vertical placement (Y), or both (XY) of the first matched element

    // returns Integer
    Y2.util.Dom.getX&#40;'div.second'&#41;;
    Y2.util.Dom.getX&#40;'div.second', context&#41;;
    &nbsp;
    Y2.util.Dom.getY&#40;'div.second'&#41;;
    Y2.util.Dom.getY&#40;'div.second', context&#41;;
    &nbsp;
    Y2.util.Dom.getXY&#40;'div.second'&#41;;
    Y2.util.Dom.getXY&#40;'div.second', context&#41;;

# getXAll, getYAll, getXYAll

Gets the horizontal placement (X), vertical placement (Y), or both (XY) of all matched elements

    // returns Array of Integers
    Y2.util.Dom.getXAll&#40;'div.second'&#41;;
    Y2.util.Dom.getXAll&#40;'div.second', context&#41;;
    &nbsp;
    Y2.util.Dom.getYAll&#40;'div.second'&#41;;
    Y2.util.Dom.getYAll&#40;'div.second', context&#41;;
    &nbsp;
    Y2.util.Dom.getXYAll&#40;'div.second'&#41;;
    Y2.util.Dom.getXYAll&#40;'div.second', context&#41;;

# inDocument

Find out whether the first matched element is in the current document

    // returns Boolean
    Y2.util.Dom.inDocument&#40;'div.second'&#41;;
    Y2.util.Dom.inDocument&#40;'div.second', context&#41;;

# insertAfter

Take the first matched node of the first selector and insert after the first matched node of the second selector

    // Note that this function handles context nodes on the first or second selectors, both, or none.
    // returns the moved HTMLElement
    Y2.util.Dom.insertAfter&#40;'div.third','div.fourth'&#41;;
    Y2.util.Dom.insertAfter&#40;'div.third', context,'div.fourth'&#41;;
    Y2.util.Dom.insertAfter&#40;'div.third', 'div.fourth', context&#41;;
    Y2.util.Dom.insertAfter&#40;'div.third', context,'div.fourth', context&#41;;

# insertBefore

Take the first matched node of the first selector and insert before the first matched node of the second selector

    // Note that this function handles context nodes on the first or second selectors, both, or none.
    // returns the moved HTMLElement
    Y2.util.Dom.insertBefore&#40;'div.third','div.fourth'&#41;;
    Y2.util.Dom.insertBefore&#40;'div.third', context,'div.fourth'&#41;;
    Y2.util.Dom.insertBefore&#40;'div.third','div.fourth', context&#41;;
    Y2.util.Dom.insertBefore&#40;'div.third', context,'div.fourth', context&#41;;

# isAncestor

Find out whether the first matched node of the first selector is an ancestor of the first matched node of the second selector.

    // Note that this function handles context nodes on the first or second selectors, both, or none.
    // return Boolean
    Y2.util.Dom.isAncestor&#40;'div.second','b#theFirstB'&#41;;
    Y2.util.Dom.isAncestor&#40;'div.second', context,'b#theFirstB'&#41;;
    Y2.util.Dom.isAncestor&#40;'div.second','b#theFirstB', context&#41;;
    Y2.util.Dom.isAncestor&#40;'div.second', context,'b#theFirstB', context&#41;;

(Documentation is a bitch!)

# Additional Information

*   [Run the test document.][10] (Might convert this to YUI Test framework if there is enough interest in this extension)

 [10]: http://www.zachleat.com/Projects/Y2/test.html