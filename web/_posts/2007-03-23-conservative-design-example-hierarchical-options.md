---
title: 'Conservative Design Example: Hierarchical Options'
author: Zach Leatherman
layout: post
permalink: /conservative-design-example-hierarchical-options/
categories:
  - Interface Design
  - JavaScript
tags:
  - Conservative Design
  - Hierarchical Select
  - feedtrim
---

Welcome, one and all, to the second installment of actual code examples for the Conservative Design series. The decision was made (by me) to rename the component in question from the original Hierarchical Select to Hierarchical Options, due to the fact that the hierarchy can consist of any multiple option component, and is not limited to just a select. And to this face, this particular component was documented in the original post entitled [Conservative Design: Hierarchical Select Boxes][1].

 [1]: /web/2007/02/22/conservative-design-hierarchical-select-boxes/

[![Hierarchical Options](/web/wp-content/uploads/2007/03/hierarchical.gif)][3]  
Click the image above to go to the example.

 [3]: http://www.zachleat.com/Projects/valdi/hierarchicalOptions.html "Hierarchical Options"

Notes on the example: The Tree structure is as follows:

*   Primary 
    *   Secondary 
        *   Tertiary 
            *   Quaternary 
                *   Quinary
        *   2nd Tertiary (is a static element that doesn’t hide)

So without further adieu or out of place french, what do we have? 3 out of 4 requirements and 1 of 2 luxury items.

*   Handles any number of select elements in a linear or tree (luxury item) like structure.
*   Child select elements are optional based on parent selection. Can hide entire div element or display a message stating no options are available.
*   Compliant with the Reset button.
*   Right now only loads from standard HTML markup (not yet from JavaScript or JSON or an XMLHTTPRequest)
*   Only supports Select elements for now, in the future should be abstracted to support Checkbox Lists or any multiple option component.

**Outstanding Bugs**:

*   Opera button doesn’t reset properly with Reset Button
*   Clicking off of the default and then back onto the default has the original selections downstream (but doesn’t propagate more than one level)
