---
title: Problems with YUI DataTable
author: Zach Leatherman
layout: post
permalink: /problems-with-yui-datatable/
Version Specific Article:
  - YUI 2.2.0
categories:
  - CSS
  - Interface Design
  - JavaScript
  - Reviews
tags:
  - deprecated
  - feedtrim
  - popular-posts-total
postRankTotalViews: 10
daysPosted: 3926
yearsPosted: 10.8
---

If you have read anything I’ve written before or know me at all, you know that my go-to JavaScript library is the one and only YUI. So obviously, when I was looking around for a Grid (or as YUI jargon goes, a DataTable), naturally I’m going to turn to YUI compatible components. First, I looked at Jack Slocum’s EXT, which has a nice looking Grid component that had a lot of features I wouldn’t need, but I didn’t really want to take a 0.5 MB hit for the limited feature set I was requiring. Adding the YUI DataTable would only tack on approximately 70-75 KB of additional download. So first, let me establish what I’m going for:

**Minimum Feature Set**:

*   Client-Side Sorting: I don’t want it to do an XMLHttpRequest to sort the data, I want it to be done all clientside.
*   Simple inline editing: Edit a field in the table right there on the table. I hadn’t established what types of data I would need to edit yet.
*   Data Sources: load from a native JavaScript array or a XMLHttpRequest returning XML or JSON.
*   Data Type Sort Algorithms: at the very minimum different sorting algorithms for numeric columns and string columns.
*   Hierarchical Columns: group column headers together under a parent header.
*   Easily customizable: must be able to customize the look and feel of the grid easily using CSS and not by editing Javascript.
*   Header Freeze: If I have overflow on my table vertically causing a scroll bar, I want the table headers to remain shown at the top of the table while I scroll from top to bottom.
*   Custom Cell Rendering: I have the data I’m loading, but I want to change how it looks when it is rendered to the table. Common for date formatting.

**Luxury Feature Set**:

*   Resizeable Columns: change the width of a column by dragging on the column header’s right border.
*   Movable Columns: dragging a column will cause it to be moved on the table (TIBCO General Interface supports this).
*   Custom Sort Algorithm: write my own algorithm to specify how data is sorted, or provide a way to do multi-column sorting (sort within one column, ties are sorted by another column, and so on).
*   Dynamic Paging (don’t make me click numbered links, load the data automatically when I scroll) both on the client (dynamically insert only what I’m looking at and remove what I’ve scrolled past) and using the server (load more data through an XMLHttpRequest)
*   Column Freeze: if the table is going to scroll horizontally, allow the developer to freeze a column or multiple columns so that they are shown when scrolling from left to right.

**Evaluation of Options**: How does the YUI DataTable stack up?

Basic Items: Client-Side Sorting, Simple inline editing, Data Sources, Data Type Sort Algorithms (*stock types not yet implemented out of the box*), Hierarchical Columns, Header Freeze (*buggy*), Custom Cell Rendering, and is easily customizable with CSS.

Luxury Items: Resizeable Columns, Movable Columns (*not supported*), Custom Sort Algorithms are supported (you can right your own Data Type Sort Algorithms with this feature), Dynamic Paging (manually, not dynamic), Column Freeze (*not supported*)

Problems:

*   Any sort of fixed width table is going to be problematic. Putting a fixed width on the table causes the table headers to be misaligned with the associated table data. It’s a mess. The only viable option here is to let the table do it’s own width calculations. You can’t even set the column widths manually using the {width} variable as suggested when using a fixed width table.
*   Data Type Sort Algorithms supposedly work from the column type, but this feature is documented in the code as being a TODO. All columns are sorted by a string datatype, meaning that if your column is numeric and you had the following rows: { 3, 7, 40 }, the sort result would be { 3, 40, 7 }.
*   Header Freeze was problematic. Implementing the {scrollable=true} feature as recommended by the documentation causes the table headers to be misaligned with the data in a fixed width table.
*   Paging uses the old school numbers method. This wasn’t a deal breaker, since I classified this feature as a luxury item.

Granted, the DataTable in it’s current form is a beta component, but that 0.5 MB ExtJS hit is looking pretty nice right now.

**Minor Update**: to do a fixed width table that will overflow horizontally, this is the method you can use:

    div#dataTableId { /* change this to whatever id you're using to hold the dataTable */
      width:520px; /* put in your own fixed width */
      overflow-x:auto;
      overflow-y:hidden;
    }
    .yui-dt-headtext, .yui-dt-headcontainer {
      position: static; /* without this declaration, the headers weren't horizontally scrolling with the data in IE6 */
    }
