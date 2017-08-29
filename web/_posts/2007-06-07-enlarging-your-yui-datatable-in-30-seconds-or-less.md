---
title: Enlarging your YUI DataTable in 30 Seconds or Less!
author: Zach Leatherman
layout: post
permalink: /enlarging-your-yui-datatable-in-30-seconds-or-less/
Version Specific Article:
  - YUI 2.2.2
categories:
  - CSS
  - Interface Design
  - JavaScript
tags:
  - deprecated
  - feedtrim
---

**Please note that this post has been updated to the new version of YUI, 2.3.0 in an article called [“Enlarging your YUI DataTable in 29 Seconds or Less!”][1]**

 [1]: /web/2007/08/28/enlarging-your-yui-datatable-in-29-seconds-or-less/

Do you want to fit more content onto your DataTable, but don’t know how? Do you wish that you had fewer columns, or more horizontal screen-estate? Well now you can enlarge your table easily with these simple functions! Instead of adding more information into additional columns, we have used our patented method of not actually patenting anything to bring you a secret formula that will allow you to dynamically insert rows into your table, designed for holding additional, non-constrained customizable content!

Do you mean to tell me that your formula will give that special lady in your life the DataTable that she has always wanted?

Of course! In fact, we guarantee this DataTable to satisfy all of the women you know and don’t know in the world or we’ll give you a full refund of the purchase price!

Wow! How does it work?

 
Click here for an example!

![Normal DataTable][3]

![Expanded DataTable][4]  


When you click on a row in the DataTable, it inserts a child row beneath the row with an HTML string passed in to populate the dynamic content. When you click on the parent row or the new row that was inserted, the content disappears! It’s that easy! You don’t have to apply any gross awful smelling creams, or take any large horse-sized pills for this to work! You literally only use the following code to do it:

Usage Code:

    var myDataTable = new YAHOO.widget.DataTable("myContainer",myColumnSet,myDataSource);  
    myDataTable.subscribe("cellClickEvent", myDataTable.onEventSelectRow); // make sure you're firing the row selection event
    myDataTable.subscribe("cellClickEvent", function( e ) {
       var myCustomHtml = 'Hello, this is my expanded content.<br />:-)<br />'; // generate the string, could use an ajax call if you wanted.
       YAHOO.ymod.datatable.clickAndExpand.call( this, e, myCustomHtml ); // if you do use an ajax call, this function returns a reference to the newly created div that you can put the ajax results into.
    } );

Library Code:

    YAHOO.namespace( 'YAHOO.ymod.datatable' );
    YAHOO.ymod.datatable.clickAndExpand = function( e, expandedHtml )
    {
        var selectedRows = this.getSelectedRows();
        if( selectedRows.length > 0 )
        {
            if( YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'ymod-expandedData' ) )
            {
                YAHOO.util.Dom.removeClass( selectedRows[ 0 ].previousSibling, 'expanded' );
                selectedRows[ 0 ].parentNode.removeChild( selectedRows[ 0 ] );
            } else if( !YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'ymod-expanded' ) ) {
                var newRow = document.createElement( 'tr' );
                var newCell = document.createElement( 'td' );
                var newDiv = document.createElement( 'div' );
                YAHOO.util.Dom.addClass( newDiv, 'ymod-expandedDataContent' );
                if( expandedHtml != null ) newDiv.innerHTML = expandedHtml;
                newCell.appendChild( newDiv );
                newCell.colSpan = selectedRows[ 0 ].childNodes.length;
                newRow.appendChild( newCell );      
                YAHOO.util.Dom.addClass( newRow, 'ymod-expandedData' );
                if( YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'yui-dt-odd' ) ) YAHOO.util.Dom.addClass( newRow, 'yui-dt-odd' );
                else if( YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'yui-dt-even' ) ) YAHOO.util.Dom.addClass( newRow, 'yui-dt-even' );
                YAHOO.util.Dom.addClass( selectedRows[ 0 ], 'ymod-expanded' );
                selectedRows[ 0 ].parentNode.insertBefore( newRow, selectedRows[ 0 ].nextSibling );
                YAHOO.util.Event.addListener( newRow, 'click', function( e )
                {
                    YAHOO.ymod.datatable.collapseRow( this );
                    YAHOO.util.Event.stopEvent( e );
                } );
                YAHOO.util.Dom.removeClass( selectedRows[ 0 ], 'yui-dt-selected' );
                YAHOO.util.Event.stopEvent( e );
                return newDiv;
            } else {
                selectedRows[ 0 ].parentNode.removeChild( selectedRows[ 0 ].nextSibling );
                YAHOO.util.Dom.removeClass( selectedRows[ 0 ], 'ymod-expanded' );
                YAHOO.util.Dom.removeClass( selectedRows[ 0 ], 'yui-dt-selected' );
                YAHOO.util.Event.stopEvent( e );
            }
        }
    };
     
    // pass in the expanded content, NOT the parent row.
    YAHOO.ymod.datatable.collapseRow = function( row )
    {
        YAHOO.util.Dom.removeClass( row.previousSibling, 'ymod-expanded' );
        YAHOO.util.Dom.removeClass( row.previousSibling, 'yui-dt-selected' );
        row.parentNode.removeChild( row );
    };

Customize the CSS, if desired.

    .yui-dt-table tr.ymod-expandedData { background-color: #bdcede; cursor: pointer; }
    .yui-dt-table tr.ymod-expandedData td { padding-right: 5px; padding-bottom: 5px; white-space: normal; overflow: visible; }
    .yui-dt-table tr.ymod-expanded { background-color: #bdcede; }
    .yui-dt-table tr.ymod-expanded td { border-bottom: 0; }
    .yui-dt-table div.ymod-expandedDataContent { background-color: #f4f4f4; border: 1px inset #aaa; padding: 2px 5px; white-space: normal; zoom: 1; overflow: hidden; }

You might even want to put a little + and – into the first column of each row to give a visual cue that there is more information for display available on click.

 []: http://www.zachleat.com/Projects/valdi/__test_yui_datatable_expandable.html
 [3]: /web/wp-content/uploads/2007/06/datatable.gif
 [4]: /web/wp-content/uploads/2007/06/datatableexpanded.gif
