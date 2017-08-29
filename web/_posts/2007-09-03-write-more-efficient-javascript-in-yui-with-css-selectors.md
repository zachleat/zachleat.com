---
title: Write More Efficient Javascript in YUI with CSS Selectors
author: Zach Leatherman
layout: post
permalink: /write-more-efficient-javascript-in-yui-with-css-selectors/
Version Specific Article:
  - YUI 2.3.0
categories:
  - JavaScript
tags:
  - deprecated
  - project
  - feedtrim
---

*This is an updated version of a previous article entitled [Using DOM Query Libraries in YUI][1] for the new version of YAHOO.util.Dom included with YUI 2.3.0 as well as including support for passing context nodes into Dom functions.*

 [1]: http://www.zachleat.com/web/2007/07/30/using-dom-query-libraries-in-yui/

Here we are again. I just love those CSS Selectors. If you haven’t read Part One of the series linked above, I would encourage it to get a little background on why we’re attempting this approach.

## Download the appropriate files:

Get the easy **ALL-IN-ONE file**: [Y2.js][2] (31 KB original source) OR [Y2-p.js][3] (11 KB minimized)

 [2]: /Lib/Y2/Y2.js
 [3]: /Lib/Y2/Y2-p.js

### Get the files separately (if you want to use a custom selector library, or have already included DomQuery or jQuery): [Y2-solo.js][4] (9 KB original source) OR [Y2-solo-p.js][5] (4 KB minimized)

 [4]: /Lib/Y2/Y2-solo.js
 [5]: /Lib/Y2/Y2-solo-p.js

Also, first you’ll need to get Jack’s nice DomQuery class.

Download: [Jack Slocum’s DomQuery Standalone File (24 KB)][6] 1.0 Alpha 3 – Rev 4  
Download: [Jack Slocum’s DomQuery Standalone File Packed (7 KB)][7] 1.0 Alpha 3 – Rev 4

 [6]: /Lib/Y2/DomQuery.js
 [7]: /Lib/Y2/DomQuery-packer.js

You can use the jDomQuery standalone, or any jQuery version, (instead of DomQuery) linked in the previous article, but there is an unresolved bug with the getRegion method since jQuery doesn’t return actual Array’s. But if you’re not using that method, have at it.

## What can I do with it?

I have not included ALL functions in this class, only the ones that take nodes in as arguments. If you use these functions, you are encouraged to use the unmodified versions contained in YAHOO.util.Dom. Functions not included here: getClientHeight, getClientWidth, getDocumentHeight, getDocumentScrollLeft, getDocumentScrollTop, getDocumentWidth, getViewportHeight, getViewportWidth.

Let’s see some documentation on this mother (if you’re wondering what the original functions do, see the [original documentation][8]).

 [8]: http://developer.yahoo.com/yui/docs/YAHOO.util.Dom.html

    // this is the test context node we're going to pass in
    var context = YAHOO.util.Dom.get('context');

### addClass

Adds a CSS class to first matching node.

    // returns void
    Y2.util.Dom.addClass( 'div div:last', 'myClass');
    Y2.util.Dom.addClass('div div:last', context, 'myClassContext');

### addClassAll

Adds a CSS class to all matching nodes.

    // returns void
    Y2.util.Dom.addClassAll( 'div div:last', 'myClass');
    Y2.util.Dom.addClassAll('div div:last', context, 'myClassContext');

### hasClass

Tests the first result node returned to see if it has a CSS class.

    // returns Booleans.
    Y2.util.Dom.hasClass('div div:last', 'myClass');
    Y2.util.Dom.hasClass('div div:last', context, 'myClassContext');

### hasClassAll

Tests all matching nodes to see if they have a CSS class.

    // returns Array of Booleans.
    Y2.util.Dom.hasClassAll('div div:last', 'myClass');
    Y2.util.Dom.hasClassAll('div div:last', context, 'myClassContext');

### removeClass

Removes a CSS class from first matched node.

    // returns Boolean (misdocumented on the YAHOO.util.Dom page)
    Y2.util.Dom.removeClass('div.third','third');
    Y2.util.Dom.removeClass('div.third', context,'third');

### removeClassAll

Removes a CSS class from all matched nodes.

    // returns Array of Booleans (misdocumented on the YAHOO.util.Dom page)
    Y2.util.Dom.removeClassAll('div.third','third');
    Y2.util.Dom.removeClassAll('div.third', context,'third');

### replaceClass

Replaces a CSS class on first matched node with a new CSS class, or adds it if the old CSS class doesn’t exist.

    // returns Boolean (misdocumented on the YAHOO.util.Dom page)
    Y2.util.Dom.replaceClass('div.fourth','fourth','third');
    Y2.util.Dom.replaceClass('div.fourth', context,'fourth','third');

### replaceClassAll

Replaces a CSS class on all matched nodes with a new CSS class, or adds it if the old CSS class doesn’t exist.

    // returns Array of Booleans (misdocumented on the YAHOO.util.Dom page)
    Y2.util.Dom.replaceClassAll('div.fourth','fourth','third');
    Y2.util.Dom.replaceClassAll('div.fourth', context,'fourth','third');

### get

Get first matched node.

    // returns HTMLElement
    Y2.util.Dom.get('div b');
    Y2.util.Dom.get('div b', context);

### getAll

Get all matched nodes.

    // returns Array of HTMLElement
    Y2.util.Dom.getAll('div b');
    Y2.util.Dom.getAll('div b', context);

### batch

Executes a function against first matched node.

    // returns single return value from the function
    Y2.util.Dom.batch('div.second b', function(el){return el;});
    Y2.util.Dom.batch('div b', context, function(el){return el;});

### batchAll

Executes a function against all matched nodes.

    // returns Array of return values from the function
    Y2.util.Dom.batchAll('div.second b', function(el){return el;});
    Y2.util.Dom.batchAll('div b', context, function(el){return el;});

### generateId

Generates and assigns a unique ID attribute if not present on first matched element.

    // returns String (new ID attribute)
    Y2.util.Dom.generateId('div.first');
    Y2.util.Dom.generateId('div.third', context);

### generateIdAll

Generates and assigns a unique ID attribute if not present on matched elements.

    // returns Array of String (new ID attributes)
    Y2.util.Dom.generateIdAll('div.first');
    Y2.util.Dom.generateIdAll('div.third', context);

### getChildren

Gets all HTMLElement children of the first matched node (does not include text nodes or whitespace)

    // returns Array of HTMLElement
    Y2.util.Dom.getChildren('div.second');
    Y2.util.Dom.getChildren('div.second', context);

### getChildrenBy

Returns all HTMLElement children of the first matched node that pass a Boolean function test. (does not include text nodes or whitespace)

    // returns Array of HTMLElement
    Y2.util.Dom.getChildrenBy('div.second', function(el){return el.getAttribute('id')=='theMiddleB';});
    Y2.util.Dom.getChildrenBy('div.second', context, function(el){return el.getAttribute('id')=='theMiddleB';});

### getAncestorBy

Returns the first HTMLElement ancestor of the first matched node that passes a Boolean function test. (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getAncestorBy('div.third', function(el){return el.getAttribute('id')=='context';});
    Y2.util.Dom.getAncestorBy('div.third', context, function(el){return el.getAttribute('id')=='context';});

### getAncestorByClassName

Returns the first HTMLElement ancestor of the first matched node that has a CSS Class. (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getAncestorByClassName('div.third', 'contextClass');
    Y2.util.Dom.getAncestorByClassName('div.third', context, 'contextClass');

### getAncestorByClassName

Returns the first HTMLElement ancestor of the first matched node that is a certain tag (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getAncestorByTagName('div.third', 'div');
    Y2.util.Dom.getAncestorByTagName('div.third', context, 'div');

### getFirstChild

Returns the first HTMLElement child of the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getFirstChild('div.second');
    Y2.util.Dom.getFirstChild('div.second', context);

### getFirstChildBy

Returns the first HTMLElement child that passes a boolean function test from the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getFirstChildBy('div.second', function(el){ return el.getAttribute('id')=='theMiddleB';});
    Y2.util.Dom.getFirstChildBy('div.second', context, function(el){ return el.getAttribute('id')=='theMiddleB';});

### getLastChild

Returns the last HTMLElement child of the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getLastChild('div.second');
    Y2.util.Dom.getLastChild('div.second', context);

### getLastChildBy

Returns the last HTMLElement child that passes a boolean function test from the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getLastChildBy('div.second', function(el){ return el.getAttribute('id')=='theMiddleB';});
    Y2.util.Dom.getLastChildBy('div.second', context, function(el){ return el.getAttribute('id')=='theMiddleB';});

### getNextSibling

Returns the next HTMLElement sibling of the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getNextSibling('div.second');
    Y2.util.Dom.getNextSibling('div.second', context);

### getNextSiblingBy

Returns the next HTMLElement sibling that passes a boolean function test from the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getNextSiblingBy('div.second',function(el){ return el.getAttribute('class')=='third';});
    Y2.util.Dom.getNextSiblingBy('div.second', context, function(el){ return YAHOO.util.Dom.hasClass(el,'third');});

### getPreviousSibling

Returns the previous HTMLElement sibling of the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getPreviousSibling('div.second');
    Y2.util.Dom.getPreviousSibling('div.second', context);

### getPreviousSiblingBy

Returns the previous HTMLElement sibling that passes a boolean function test from the first matched node (does not include text nodes or whitespace)

    // returns HTMLElement
    Y2.util.Dom.getPreviousSiblingBy('div.second',function(el){ return el.getAttribute('class')=='third';});
    Y2.util.Dom.getPreviousSiblingBy('div.second', context, function(el){ return YAHOO.util.Dom.hasClass(el,'third');});

### getRegion

Gets the [Region][9] containing the first matched element.

 [9]: http://developer.yahoo.com/yui/docs/YAHOO.util.Region.html

    // returns YAHOO.util.Region
    Y2.util.Dom.getRegion('div.second');
    Y2.util.Dom.getRegion('div.second', context);

### getRegionAll

Gets all [Regions][9] containing all matched elements.

    // returns Array of YAHOO.util.Region
    Y2.util.Dom.getRegionAll('div.myClass');
    Y2.util.Dom.getRegionAll('div.myClass', context);

### setStyle

Sets the style for the first matched node

    // returns void
    Y2.util.Dom.setStyle('div', 'border', '1px');
    Y2.util.Dom.setStyle('div', context, 'border', '10px');

### setStyleAll

Sets style for all matched nodes

    // returns void
    Y2.util.Dom.setStyleAll('div', 'border', '1px');
    Y2.util.Dom.setStyleAll('div', context, 'border', '10px');

### getStyle

Gets a specific style property from the first matched node

    // returns String of specific style property
    Y2.util.Dom.getStyle('div', 'border');
    Y2.util.Dom.getStyle('div', context, 'border');

### getStyleAll

Gets a specific style property from all matched nodes

    // returns Array of Strings of specific style property
    Y2.util.Dom.getStyleAll('div', 'border');
    Y2.util.Dom.getStyleAll('div', context, 'border');

### setX, setY, setXY

Sets the horizontal placement (X), vertical placement (Y), or both (XY) of the first matched element

    // returns void
    Y2.util.Dom.setX('div.second', 60);
    Y2.util.Dom.setX('div.second', context, 60);
    
    Y2.util.Dom.setY('div.second', 60);
    Y2.util.Dom.setY('div.second', context, 60);
    
    Y2.util.Dom.setXY('div.second', [120,120]);
    Y2.util.Dom.setXY('div.second', context, [120,120]);

### setXAll, setYAll, setXYAll

Sets the horizontal placement (X), vertical placement (Y), or both (XY) of all matched elements

    // returns void
    Y2.util.Dom.setXAll('div.second', 60);
    Y2.util.Dom.setXAll('div.second', context, 60);
    
    Y2.util.Dom.setYAll('div.second', 60);
    Y2.util.Dom.setYAll('div.second', context, 60);
    
    Y2.util.Dom.setXYAll('div.second', [120,120]);
    Y2.util.Dom.setXYAll('div.second', context, [120,120]);

### getX, getY, getXY

Gets the horizontal placement (X), vertical placement (Y), or both (XY) of the first matched element

    // returns Integer
    Y2.util.Dom.getX('div.second');
    Y2.util.Dom.getX('div.second', context);
    
    Y2.util.Dom.getY('div.second');
    Y2.util.Dom.getY('div.second', context);
    
    Y2.util.Dom.getXY('div.second');
    Y2.util.Dom.getXY('div.second', context);

### getXAll, getYAll, getXYAll

Gets the horizontal placement (X), vertical placement (Y), or both (XY) of all matched elements

    // returns Array of Integers
    Y2.util.Dom.getXAll('div.second');
    Y2.util.Dom.getXAll('div.second', context);
    
    Y2.util.Dom.getYAll('div.second');
    Y2.util.Dom.getYAll('div.second', context);
    
    Y2.util.Dom.getXYAll('div.second');
    Y2.util.Dom.getXYAll('div.second', context);

### inDocument

Find out whether the first matched element is in the current document

    // returns Boolean
    Y2.util.Dom.inDocument('div.second');
    Y2.util.Dom.inDocument('div.second', context);

### insertAfter

Take the first matched node of the first selector and insert after the first matched node of the second selector

    // Note that this function handles context nodes on the first or second selectors, both, or none.
    // returns the moved HTMLElement
    Y2.util.Dom.insertAfter('div.third','div.fourth');
    Y2.util.Dom.insertAfter('div.third', context,'div.fourth');
    Y2.util.Dom.insertAfter('div.third', 'div.fourth', context);
    Y2.util.Dom.insertAfter('div.third', context,'div.fourth', context);

### insertBefore

Take the first matched node of the first selector and insert before the first matched node of the second selector

    // Note that this function handles context nodes on the first or second selectors, both, or none.
    // returns the moved HTMLElement
    Y2.util.Dom.insertBefore('div.third','div.fourth');
    Y2.util.Dom.insertBefore('div.third', context,'div.fourth');
    Y2.util.Dom.insertBefore('div.third','div.fourth', context);
    Y2.util.Dom.insertBefore('div.third', context,'div.fourth', context);

### isAncestor

Find out whether the first matched node of the first selector is an ancestor of the first matched node of the second selector.

    // Note that this function handles context nodes on the first or second selectors, both, or none.
    // return Boolean
    Y2.util.Dom.isAncestor('div.second','b#theFirstB');
    Y2.util.Dom.isAncestor('div.second', context,'b#theFirstB');
    Y2.util.Dom.isAncestor('div.second','b#theFirstB', context);
    Y2.util.Dom.isAncestor('div.second', context,'b#theFirstB', context);

(Documentation is a bitch!)

## Additional Information

*   [Run the test document.][10] (Might convert this to YUI Test framework if there is enough interest in this extension)

 [10]: http://www.zachleat.com/Projects/Y2/test.html
