---
title: 'Enlarging your YUI DataTable in 30 Seconds <span class="widow">or Less!</span>'
author: Zach Leatherman
layout: post
permalink: /enlarging-your-yui-datatable-in-30-seconds-or-less/
Version Specific Article:
  - YUI 2.2.2
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299718927:0
categories:
  - CSS
  - Interface Design
  - JavaScript
tags:
  - Expandable
  - Grid
  - YUI
---
# 

**Please note that this post has been updated to the new version of YUI, 2.3.0 in an article called [“Enlarging your YUI DataTable in 29 Seconds or Less!”][1]**

 [1]: http://www.zachleat.com/web/2007/08/28/enlarging-your-yui-datatable-in-29-seconds-or-less/

Do you want to fit more content onto your DataTable, but don’t know how? Do you wish that you had fewer columns, or more horizontal screen-estate? Well now you can enlarge your table easily with these simple functions! Instead of adding more information into additional columns, we have used our patented method of not actually patenting anything to bring you a secret formula that will allow you to dynamically insert rows into your table, designed for holding additional, non-constrained customizable content!

Do you mean to tell me that your formula will give that special lady in your life the DataTable that she has always wanted?

Of course! In fact, we guarantee this DataTable to satisfy all of the women you know and don’t know in the world or we’ll give you a full refund of the purchase price!

Wow! How does it work?

 
Click here for an example!

![Normal DataTable][3]

![Expanded DataTable][4]  


When you click on a row in the DataTable, it inserts a child row beneath the row with an HTML string passed in to populate the dynamic content. When you click on the parent row or the new row that was inserted, the content disappears! It’s that easy! You don’t have to apply any gross awful smelling creams, or take any large horse-sized pills for this to work! You literally only use the following code to do it:

Usage Code:

    var myDataTable = new YAHOO.widget.DataTable&#40;"myContainer",myColumnSet,myDataSource&#41;;  
    myDataTable.subscribe&#40;"cellClickEvent", myDataTable.onEventSelectRow&#41;; // make sure you're firing the row selection event
    myDataTable.subscribe&#40;"cellClickEvent", function&#40; e &#41; &#123;
       var myCustomHtml = 'Hello, this is my expanded content.:-)'; // generate the string, could use an ajax call if you wanted.
       YAHOO.ymod.datatable.clickAndExpand.call&#40; this, e, myCustomHtml &#41;; // if you do use an ajax call, this function returns a reference to the newly created div that you can put the ajax results into.
    &#125; &#41;;

Library Code:

    YAHOO.namespace&#40; 'YAHOO.ymod.datatable' &#41;;
    YAHOO.ymod.datatable.clickAndExpand = function&#40; e, expandedHtml &#41;
    &#123;
    	var selectedRows = this.getSelectedRows&#40;&#41;;
    	if&#40; selectedRows.length >  &#41;
    	&#123;
    		if&#40; YAHOO.util.Dom.hasClass&#40; selectedRows&#91;  &#93;, 'ymod-expandedData' &#41; &#41;
    		&#123;
    			YAHOO.util.Dom.removeClass&#40; selectedRows&#91;  &#93;.previousSibling, 'expanded' &#41;;
    			selectedRows&#91;  &#93;.parentNode.removeChild&#40; selectedRows&#91;  &#93; &#41;;
    		&#125; else if&#40; !YAHOO.util.Dom.hasClass&#40; selectedRows&#91;  &#93;, 'ymod-expanded' &#41; &#41; &#123;
    			var newRow = document.createElement&#40; 'tr' &#41;;
    			var newCell = document.createElement&#40; 'td' &#41;;
    			var newDiv = document.createElement&#40; 'div' &#41;;
    			YAHOO.util.Dom.addClass&#40; newDiv, 'ymod-expandedDataContent' &#41;;
    			if&#40; expandedHtml != null &#41; newDiv.innerHTML = expandedHtml;
    			newCell.appendChild&#40; newDiv &#41;;
    			newCell.colSpan = selectedRows&#91;  &#93;.childNodes.length;
    			newRow.appendChild&#40; newCell &#41;;		
    			YAHOO.util.Dom.addClass&#40; newRow, 'ymod-expandedData' &#41;;
    			if&#40; YAHOO.util.Dom.hasClass&#40; selectedRows&#91;  &#93;, 'yui-dt-odd' &#41; &#41; YAHOO.util.Dom.addClass&#40; newRow, 'yui-dt-odd' &#41;;
    			else if&#40; YAHOO.util.Dom.hasClass&#40; selectedRows&#91;  &#93;, 'yui-dt-even' &#41; &#41; YAHOO.util.Dom.addClass&#40; newRow, 'yui-dt-even' &#41;;
    			YAHOO.util.Dom.addClass&#40; selectedRows&#91;  &#93;, 'ymod-expanded' &#41;;
    			selectedRows&#91;  &#93;.parentNode.insertBefore&#40; newRow, selectedRows&#91;  &#93;.nextSibling &#41;;
    			YAHOO.util.Event.addListener&#40; newRow, 'click', function&#40; e &#41;
    			&#123;
    				YAHOO.ymod.datatable.collapseRow&#40; this &#41;;
    				YAHOO.util.Event.stopEvent&#40; e &#41;;
    			&#125; &#41;;
    			YAHOO.util.Dom.removeClass&#40; selectedRows&#91;  &#93;, 'yui-dt-selected' &#41;;
    			YAHOO.util.Event.stopEvent&#40; e &#41;;
    			return newDiv;
    		&#125; else &#123;
    			selectedRows&#91;  &#93;.parentNode.removeChild&#40; selectedRows&#91;  &#93;.nextSibling &#41;;
    			YAHOO.util.Dom.removeClass&#40; selectedRows&#91;  &#93;, 'ymod-expanded' &#41;;
    			YAHOO.util.Dom.removeClass&#40; selectedRows&#91;  &#93;, 'yui-dt-selected' &#41;;
    			YAHOO.util.Event.stopEvent&#40; e &#41;;
    		&#125;
    	&#125;
    &#125;;
    &nbsp;
    // pass in the expanded content, NOT the parent row.
    YAHOO.ymod.datatable.collapseRow = function&#40; row &#41;
    &#123;
    	YAHOO.util.Dom.removeClass&#40; row.previousSibling, 'ymod-expanded' &#41;;
    	YAHOO.util.Dom.removeClass&#40; row.previousSibling, 'yui-dt-selected' &#41;;
    	row.parentNode.removeChild&#40; row &#41;;
    &#125;;

Customize the CSS, if desired.

    .yui-dt-table tr.ymod-expandedData &#123; background-color: #bdcede; cursor: pointer; &#125;
    .yui-dt-table tr.ymod-expandedData td &#123; padding-right: 5px; padding-bottom: 5px; white-space: normal; overflow: visible; &#125;
    .yui-dt-table tr.ymod-expanded &#123; background-color: #bdcede; &#125;
    .yui-dt-table tr.ymod-expanded td &#123; border-bottom: ; &#125;
    .yui-dt-table div.ymod-expandedDataContent &#123; background-color: #f4f4f4; border: 1px inset #aaa; padding: 2px 5px; white-space: normal; zoom: 1; overflow: hidden; &#125;

You might even want to put a little and – into the first column of each row to give a visual cue that there is more information for display available on click.

 []: http://www.zachleat.com/Projects/valdi/__test_yui_datatable_expandable.html
 [3]: http://www.zachleat.com/web/wp-content/uploads/2007/06/datatable.gif
 [4]: http://www.zachleat.com/web/wp-content/uploads/2007/06/datatableexpanded.gif