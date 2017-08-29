---
title: 'Specific Inheritance with TIBCO&#8217;s General Interface'
author: Zach Leatherman
layout: post
permalink: /specific-inheritance-with-tibcos-general-interface/
categories:
  - JavaScript
tags:
  - TIBCO General Interface
  - XSLT
  - feedtrim
---

*Sorry about the title, I couldn’t resist.*

TIBCO created the General Interface (GI) toolkit for one-page in-browser applications back before I was in my JavaScript diapers. I hadn’t even graduated from high school yet when they were building Rich Internet Applications using some of the most feature crippled browsers in Internet history, back when cross browser meant Internet Explorer and Netscape Navigator, not the Firefox/WebKit/Opera’s of today. But when I did finally start to get my feet wet in the world of JavaScript, this is the tool I started on. I learned what a DOM was, earned my stripes in XSL, and discovered the power of the browser.

But just like any programmer nearing the end of their relationship with a tool, I must take a few moments to evaluate my experiences with it, not only for my benefit, but so that you, the reader, might also gain a golden nugget of wisdom from the treasure troves of its sparkling source code.

When I first started using General Interface almost two years ago (~June 2006) on version 3.1, it wasn’t a cross browser tool. It had support for Internet Explorer 6, and that was it. Truthfully, it was an executive decision to use the tool, and we were using it for an intranet application. Looking back on that decision raises a huge red flag now — internally supported web browsers are subject to change, and so are audiences — applications may turn out to be more external that previously suggested. And while Firefox support was included with version 3.2, to this day I hear complaints that the application doesn’t work on the Safari browser (or, in turn, the iPhone).

General Interface relies heavily on a JavaScript XSLT interface (this is why they won’t ever have support for Safari 2, or the iPhone, neither of which support a JavaScript XSLT interface), leveraging XSLT stylesheets to generate markup for the page, which turns out to be quite the speed demon when generating large amounts of markup from XML documents (or GUI components serialized into XML documents). However, a large chunk of that speediness is lost due to a heavy reliance on inline CSS. A majority of the style associated with components is generated on the fly and inserted inline using the browser native style attribute. This can cause a lot of problems when attempting to do a simple restyling of a GUI component using CSS. For example, in a DataTable/Grid component, there is no option to style the background-color of a selected row. The only option for the style of a selected row is a background-image, which I believe resulted from the inline style limitation and the background color already being specified for zebra-stripe row coloring. If you specified the background-color for the selected row, it wouldn’t know which background-color to go back to when the row was unselected, due to an unfortunate avoidance of the CSS class construct.

Another drawback to General Interface is development of the GUI. I won’t get into it too much, but will just meantion that to create interfaces in GI, you must create your GUI components and layouts using the an in-browser IDE developed using the power of dog food. That’s right, it’s written in GI itself.

However, General Interface has got it right in some cases. They were (I believe) the first JavaScript library/toolkit to include a mechanism for large result set DataTables/Grids. In fact, their Matrix component (the equivalent of a YUI DataTable, or a Dojo Grid) supports more features that most libraries have even begun to plan for: complete inline editing with great keyboard navigation support, clientside sorting, column reordering, dynamic column hiding and adding, hierarchical tree grids, easy options for pagination caching, as well as 4 different rendering modes (the latest YUI DataTable 2.5.0 just added their first rendering mode, what GI calls “Chunked” rendering). They were the first toolkit to include a very sophisticated client side charting package, with support for more charting types than you’d even want to put into a single demo. They’ve been developing the package with a clearly object oriented methodology in mind, and that can be easily seen in their source code. They have taken the package open source and released it with a BSD license (which is a delight of course, muddling through that obfuscated source the first year was a pain).

If nothing else, TIBCO is a company with some great ideas, and you can see those ideas represented in General Interface. This tool has shaped a lot of my views on clientside development, and I’ve learned a lot from its developers. For instance, I feel like XSLT is one of the most underrated tools for speed improvements in clientside DOM manipulation (using innerHTML to insert the result of an XSL transform), especially with Safari 3 including a JavaScript XSLT interface. If you’re developing an application that deals a lot with XML web services (SOA) and you want to create a single-page in-browser application (RIA), why not give it a look? Just keep those caveats I’ve meantioned in mind and you’ll be fine. Trying something new can change your perspective, and if you keep an open mind, you might learn something.
