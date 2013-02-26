---
title: 'Enlarging your YUI DataTable in 29 Seconds <span class="widow">or Less!</span>'
author: Zach Leatherman
layout: post
permalink: /enlarging-your-yui-datatable-in-29-seconds-or-less/
Version Specific Article:
  - YUI 2.3.0
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299718855:0
categories:
  - JavaScript
tags:
  - DataTable
  - Expandable
  - Grid
  - YUI
---
# 

*This is an updated version of the [Enlarging your YUI DataTable in 30 Seconds or Less!][1] modified for the newly released YUI 2.3.0.*

 [1]: http://www.zachleat.com/web/2007/06/07/enlarging-your-yui-datatable-in-30-seconds-or-less/

This method adds an extra row to the YUI DataTable when a row is selected, below the selected row. This allows the developer to add additional content that might not be applicable to the column constraints of a typical datatable or grid and allow that content be displayed more fluidly inside a single row spanning all of the viewable columns.

I know you’re anxious for an example, so let’s see some screenshots of a simple YUI DataTable:

[![Default DataTable][3]][3]

 []: http://www.zachleat.com/Lib/ymod/ymod-tableExtension-2.3.0.html

Turns into this when a row is selected:

[![Row selected][4]][4]

 []: http://www.zachleat.com/Lib/ymod/ymod-tableExtension-2.3.0.html

Click any of the above images for a live example.

Any HTML can be added. You can make an AJAX call and put the result into the newly inserted row (that will be left as an exercise for the reader [you]).

I know you’re asking yourself, how the hell do I add this to my YUI DataTable? WHERE IS THE DAMN SOURCE CODE? Calm down, you know I’m getting to it.

### How To

1. Include the [ymod-tableExtension-2.3.0.js][4] file.  
2. Create your DataTable. If you don’t know how to do this, go to the [official documentation for help and examples][5].  
3. Make sure your DataTable has the selectionMode parameter set to ‘single’. This can be achieved by passing in `{ selectionMode: 'single' }` in as the 4th argument to the DataTable constructor.  
4. Use the following code to setup your table extension:

 [4]: http://www.zachleat.com/Lib/ymod/ymod-tableExtension-2.3.0.js
 [5]: http://developer.yahoo.com/yui/datatable/

    // myDataTable is your DataTable object
    YAHOO.ymod.tableExtension.setup&#40; myDataTable, function&#40; contentDiv &#41;
    &#123;
        var myContent = '';
        var selectedRows = this.getSelectedRows&#40;&#41;;
        if&#40; selectedRows.length >  &#41;
        &#123;
            myContent  = 'Do something based onthe row that is selected!';
        &#125;
        contentDiv.innerHTML = myContent;
    &#125; &#41;;

The setup function is basically a convenience method to add the event listeners. You can just as easily do this yourself manually:

    // myDataTable is your DataTable object.
    myDataTable.subscribe&#40; 'headerRowMousedownEvent', YAHOO.ymod.tableExtension.cleanUp &#41;;
    myDataTable.subscribe&#40; 'rowClickEvent', YAHOO.ymod.tableExtension.selectRow, function&#40; contentDiv &#41; &#123; /* same as function appears above */ &#125; &#41;;

### CSS

Here’s some CSS hooks to do some styling. The expanded row will include the yui-dt-selected class by default.

    /* The original table row clicked on */
    tr.ymod-expanded &#123;&#125;
    /* Row containing the expanded content */
    tr.ymod-expandedData &#123;&#125;
    /* Div containing the expanded content inside the row */
    tr.ymod-expandedData div.ymod-expandedDataContent &#123; background-color: navy; padding: 2px 6px; &#125;

### Limitations

– Resorting removes the expanded content. Otherwise it was messing with the sort.  
– It only works with single row selection mode, which allows only one row to be selected at a time. This is not the default (standard), which allows multiple rows to be selected with SHIFT or CTRL. Feel free to modify this to work with other modes!

# [Download ymod-tableExtension-2.3.0.js][4]