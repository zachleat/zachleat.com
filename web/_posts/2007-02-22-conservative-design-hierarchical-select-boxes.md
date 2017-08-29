---
title: 'Conservative Design: Hierarchical Select'
author: Zach Leatherman
layout: post
permalink: /conservative-design-hierarchical-select-boxes/
categories:
  - Interface Design
tags:
  - Conservative Design
  - Design Patterns
  - Hierarchical Select
  - feedtrim
---

This is a post in a series entitled [Conservative Design Patterns for Form Elements][1].

 [1]: http://www.zachleat.com/web/2007/02/22/conservative-design-patterns-for-form-elements/

For now, I’ll start off with an easy web component that a lot of you have probably already had some experience with. But, strangely enough, it is not included in any of the JavaScript libraries that are out there, that I’ve seen. If you know of one, go ahead and post it in the comments.

**Hierarchical Select Boxes** (sometimes called Dynamic Select Boxes if you’re doing a web search)

Behavior: 2 or more select boxes working in parallel, where selection of an option in a parent dynamically adjusts the options of the child.

Screenshot (Prior to any selection):  
![Prior to any selection][2]

 [2]: /web/wp-content/uploads/2007/02/hierselects1.jpg

Screenshot (After an option is chosen in the first select box):  
![After a selection is made][3]

 [3]: /web/wp-content/uploads/2007/02/hierselects2.jpg

Minimum Requirements for Acceptable Feature Set:

*   Must be able to handle any (reasonable) number of select boxes in a linear structure: parent elements only have one child.
*   Child select elements can be optional depending on parent selection. Maybe a continent doesn’t have any countries, so don’t display a child select element. It would be nice to have a visual indicator showing whether or not a parent option had children (triangle, folder(?), arrow or other customizable icon).
*   Must have functionality that allows it to be reset with the form reset button, as [Matt Kruse has done (Example 3)][4].
*   Load options in child select’s dynamically from multiple data sources (describe in [raw HTML code][5], local JS file, remote JSON object or XML file using an XMLHTTPRequest)

 [4]: http://www.mattkruse.com/javascript/dynamicoptionlist/
 [5]: http://www.bobbyvandersluis.com/articles/unobtrusivedynamicselect.php

Luxury Feature Set:

*   Must be able to nest select elements in a tree structure: selecting an option in a parent element could modify 2 child select elements.
*   Could be able to modify the options for any element that displays options (Select1 or Select as described in the [Conservative Design Post][6]: Checkbox Group, Radio Group, Select Single or Multiple)

 [6]: /web/2007/02/22/conservative-design-patterns-for-form-elements/
