---
title: 'Conservative Design Example: Multiple Option List'
author: Zach Leatherman
layout: post
permalink: /conservative-design-example-multiple-option-list/
categories:
  - Interface Design
  - JavaScript
tags:
  - Conservative Design
  - feedtrim
---

All of the posts in the Conservative Design series so far have been brainstorming of design patterns. But how about some real life examples, some actual code? Let’s dive in.

The first example I decided to tackle was the [Option List][1], specifically the variant that allows multiple options to be selected. Let me start out by saying that I didn’t abstract out the type of source element that you could put into this example, I only programmed the element for a  element. For the impatient, let’s just start with the result:

 [1]: http://www.zachleat.com/web/2007/02/26/conservative-design-option-list/

[![Multiple Option List Real Example][3]][3]  
Click the image to see the actual example.

 []: http://www.zachleat.com/Projects/valdi/multipleSelectList.html

This element was constructed using the YUI Library and Jack Slocum’s DomQuery selector class, as well as using the new form validation CSS and JavaScript code I’m currently developing entitled ‘**Valdi**‘.

It includes 3 of the 4 of the minimum features required as set in the original specification.

Features:

*   **Validation**: there is no submit button, but if there were, it would validate if the form has been entry has a value.
*   **Quick Links**: Select All, Select None, and Sort the Options
*   **Customizable Options**: Allow the user to add their own options for selection.
*   Does **not **abstract option types (checkbox, etc)
*   Keyboard Support: CTRL A inside of the select box selects all options, Delete or Backspace removes the selected options, Enter key inside Add input field automatically adds option to the select.
*   Can be *easily* transformed into a Single Option List by removing the multiple=”multiple” option in the html.
*   Sort will toggle between Ascending and Descending and maintain the selected options
*   When the number of options outweighs the select size, the number of options is displayed next to the Add button. Try adding 5 or more options to the select list.

Screenshots for the Lazy People:

Multiple Options are Added  
![Multiple Option List Real Example][3]

 [3]: /web/wp-content/uploads/2007/03/optionlist_multiple_real1.gif

Validation when an Option is not selected:  
![Multiple Option List Real Example][4]

 [4]: /web/wp-content/uploads/2007/03/optionlist_multiple_real21.gif

Success, they selected something and submitted:  
![Multiple Option List Real Example][5]

 [5]: /web/wp-content/uploads/2007/03/optionlist_multiple_real31.gif

Watch for another separate article about Valdi later on.
