---
title: 'Namespaces in Ext DomQuery'
author: Zach Leatherman
layout: post
permalink: /namespaces-in-ext-domquery/
Version Specific Article:
  - ExtJS 0.33
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299719531:0
categories:
  - JavaScript
tags:
  - ExtJS
  - XHTML
  - XML Namespaces
---

Do you want to use [custom attributes][1] in your XHTML? Do you use the YUI Library and Jack Slocum’s wonderful [DomQuery selector engine][2]?

 [1]: http://unspace.ca/discover/attributes/
 [2]: http://www.jackslocum.com/blog/2007/01/11/domquery-css-selector-basic-xpath-implementation-with-benchmarks/

If you want to select attribute nodes with a namespace in your XHTML, DomQuery does not support namespaces as an option to do so. But by adding a small snippet of code to DomQuery, we can make it do so.

As a standalone snippet executed after DomQuery is loaded.

    Ext.DomQuery.matchers.push&#40; &#123;
    	re: /^(?:([[{])(?:@)?([w-] (?::[w-] ))s?(?:(=|.=)s?['"]?(.*?)["']?)?[]}])/,
    	select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
    &#125; &#41;;

**OR** by adding an array entry into the DomQuery code matchers array (paste *after* line 479 of the [17 January 2007 2:26:32 PM version][3])

 [3]: http://www.yui-ext.com/deploy/yui-ext.0.40-alpha/source/DomQuery.js

    ,&#123;
    	re: /^(?:([[{])(?:@)?([w-] (?::[w-] ))s?(?:(=|.=)s?['"]?(.*?)["']?)?[]}])/,
    	select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
    &#125;

I did not modify the existing matcher for attribute selection because I didn’t want to modify the speed of the existing code for non-namespaced attributes. So by appending another entry to the end of the array, it’ll be used as a last resort if the other entries aren’t matched.

This approach relies on the assumption that when selecting an attribute with getAttribute, the browser interprets any namespace automatically: getAttribute(‘myNamespace:myAttributeName’), as documented by the [peterned weblog][4]. This was tested in Firefox 2 and IE 6.

 [4]: http://blogger.xs4all.nl/peterned/archive/2005/12/11/70033.aspx

**Usage:**

    Ext.query&#40; '#test-data span[myNameSpace:myAttribute=myValue]' &#41;;

on the following DOM

    
    
    

Other notes regarding DomQuery:

To select a node with a non-empty attribute value:

    Ext.query&#40; '#test-data span[myNameSpace:myAttribute]' &#41;;