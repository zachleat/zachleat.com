---
title: Rethinking JavaScript Grids and DataTables
author: Zach Leatherman
layout: post
permalink: /rethinking-javascript-grids-and-datatables/
categories:
  - Interface Design
  - JavaScript
tags:
  - Conservative Design
  - Dojo
  - ExtJS
  - jQuery
  - linkedin
  - YUI
  - feedtrim
  - popular-posts-total
postRankTotalViews: 20
daysPosted: 3551
yearsPosted: 9.7
---

In the world of front end engineering, one must consider the end-user of the interface first, and above all other things. The priorities should not start with development ease, nor external library preference. The priorities should start with the needs of the consumer of your end product.

Evolution of your engineering skill is also a vital trait in this world, which means that as a developer increases his knowledge of good practices and proper methods, sometimes he must shirk his previous assertions about the world as he previously knew it. And today I’m shirking a staple of the front end as all web users know it: The Grid (DataTable) Component.

Of course, I’ve written a few articles in the past about the [YUI DataTable][1], during my long love affair with Yahoo’s User Interface library. Another popular one is jQuery’s [TableSorter][2]. Then there’s the [Dojo Grid][3], a component [inherited from TurboAjax][4]. ExtJS has a variety of nice examples as well for their [Ext 2.0 Grid][5].

 [1]: http://developer.yahoo.com/yui/datatable/
 [2]: http://tablesorter.com/docs/
 [3]: http://dojotoolkit.org/book/dojo-book-0-9/docx-documentation-under-development/grid
 [4]: http://www.sitepen.com/blog/2007/09/16/the-dojo-grid/
 [5]: http://extjs.com/deploy/dev/examples/#sample-1

And after using these Grids and DataTables, I certainly respect the programming that went into developing these components. But let’s take a step back for a second. Why do the users need the bells and whistles in these components? Are they worth the extra load time and complexity they add to the interface?

All we’re doing here is putting a nice coat of paint on a  tag. Sure, it might have some nice ancillary features like Ajax Data Loading, but those don’t really matter – they are things that can be easily performed with some good Ajax and DOM insert utility functions. In fact, most of the core features included in these components could be described as feature creep, and not beneficial to the end user at all. Feature creep contributes to code bloat, which means the user is downloading bytes to their web browser that they don’t need, which can hamper performance. Libraries usually have online examples of their components, and the include sizes are seen below. (Gzip compression not considered)

<table>
<thead>
<tr>
<th>Name</th>
<th>JavaScript Size</th>
<th>Minimized</th>
<th>Link</th>
</tr>
</thead>
<tbody>
<tr>
<td>YUI DataTable</td>
<td>216.6 KB</td>
<td>Minimized</td>
<td><a href="http://developer.yahoo.com/yui/examples/datatable/dt_basic_clean.html">Example</a></td>
</tr>
<tr>
<td>Dojo Grid</td>
<td>338.4 KB</td>
<td>Unminimized</td>
<td><a href="http://dojotoolkit.org/book/dojo-book-0-9/docx-documentation-under-development/grid/simple-grid">Example</a></td>
</tr>
<tr>
<td>Ext Grid</td>
<td>545.5 KB</td>
<td>Minimized</td>
<td><a href="http://extjs.com/deploy/dev/examples/grid/array-grid.html">Example</a></td>
</tr>
<tr>
<td>jQuery TableSorter</td>
<td>66 KB</td>
<td>Minimized</td>
<td><a href="http://www.tablesorter.com/">Example</a></td>
</tr>
</tbody>
</table>

The JavaScript include sizes listed above are directly proportional to the feature set that the components provide, and should give you an idea of the overhead involved with using them. Do we need 545.5 KB of features coming down the pipe to give our users an extra bell, or an extra whistle? Let’s analyze the features to rationalize their usage, and remove items from the feature set.

 [6]: http://developer.yahoo.com/yui/examples/datatable/dt_basic_clean.html
 [7]: http://dojotoolkit.org/book/dojo-book-0-9/docx-documentation-under-development/grid/simple-grid
 [8]: http://extjs.com/deploy/dev/examples/grid/array-grid.html
 [9]: http://www.tablesorter.com/

*   Sorting
*   Modifying column order and display
*   Resizing columns
*   Editing of row data directly on the grid itself
*   Scrolling
*   Pagination

### Sorting

Data should be used in the context of its usefulness. You have a list of messages in your e-mail inbox. What’s the most useful context for this list? In order of date received. The default sort order provided by the application, to facilitate proper use of the application. Is comparing the rows in the grid by any other method as useful? Does the user need to see the list of messages ordered alphabetically by subject? In these cases where the user is in need of a specific message, *searching and filtering* is more useful than sorting. The default sort is useful, but allowing the user to resort on the client, in most cases, is not as useful as other methods of finding a row.

### Modifying column order and display

The same argument can be made for any of the other methods of customization provided to the end user. Does the user need to reorder or hide columns? The context provided by the application should be sufficient to use the applications data in the way it was intended. Don’t overcomplicate your user interface with needless features or a deluge of useless data. Provide succinct, appropriate data, and the user needn’t reorder or change the interface.

### Resizing columns

The default HTML  tag expands to fit the data inside of its cells. Even when you set the width of the table explicitly, the cells adjust themselves accordingly to fit the data. This should be the behavior of your table. You needn’t monkey around with widths, the browser is smart enough to do it for you. You can even customize a cell to wrap its text to multiple lines with CSS, if need be.

### Editing of row data directly on the grid itself

If you’re providing an Excel spreadsheet interface for the end user to customize your data, you haven’t designed your interface correctly. Rethink how the user needs to interact with the data you’ve provided, and give them a better, simpler way to edit the data.

### Scrolling

Everyone knows that internal scrollbars on a page are evil. I don’t even like scrollbars on textareas, to be honest. Previously, I had worked and reworked the YUI DataTable to handle horizontal scrolling. Looking back on this, it was a mistake. There are better ways to handle lots of data in a table, without the heavy mouse interaction and scanning that scrolling require. Which brings me to my next point.

### Pagination

This is the one exception to the feature set cutting board. This is the one feature that’s is a requirement, when the data set has too many records to fit on a single page.

Keep these in mind, and look at the feature set provided by a few sites using tabular data centric interfaces that know a thing or two about interface design:

## Examples

### Google Mail

![Google Mail][11img]

### WordPress Admin

![Wordpress 2.5 Admin Interface][12img]

### Google Reader

![Google Reader List View][13img]

[11img]: /web/wp-content/uploads/2008/04/gmail.png
[12img]: /web/wp-content/uploads/2008/04/wordpress-admin.png
[13img]: /web/wp-content/uploads/2008/04/google-reader.png


## So, what should we include?

A simple CSS class to style your table is sufficient, with links to paginate the table (properly) and/or a hover for row selection if needed. You’re looking at 10-20 lines of jQuery code, maximum, and a few CSS declarations. In lieu of sorting, of course, you’ll need to program in a mechanism for searching and filtering as well. But really, the difficulty with programming this component is knowing what to leave out.
