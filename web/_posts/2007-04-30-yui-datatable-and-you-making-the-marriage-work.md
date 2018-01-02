---
title: 'YUI DataTable and You: Making the Marriage Work'
author: Zach Leatherman
layout: post
permalink: /yui-datatable-and-you-making-the-marriage-work/
Version Specific Article:
  - YUI 2.2.2
categories:
  - CSS
  - JavaScript
tags:
  - deprecated
  - feedtrim
  - popular-posts-total
postRankTotalViews: 13
daysPosted: 3900
yearsPosted: 10.7
---

The DataTable/Grid Component, the ball and chain of GUI components. It doesn’t let you go out and instantiate beers to create a inebriated subclass of yourself with your friends on Friday night. It makes you do household garbage collection during the last minute of your favorite sporting event. And you’d think it would die before it would ever encapsulate your private class member. Just to warn you, the previous sentence was not safe for work.

Earlier I published an article entitled [Problems with the YUI DataTable][1]. Now we’re going to work out those problems together, through better communication and more effective problem solving techniques. We’re going to save your marriage.

 [1]: /web/2007/04/04/problems-with-yui-datatable/

Earlier I had stated that there were a few problems with the DataTable, in its current form. Let’s review (but not play the blame game).

*   Bug #1: Table headers weren’t lining up correctly in Firefox (personal ignorance on Box Models)
*   Bug #2: Single Select bug where multiple rows were being selected when column was sorted (All browsers, Sortable and SingleSelect Tables)
*   Bug #3: Header displayed out of document flow when the window was resized (IE6, Scrollable Tables)
*   Bug #4: Content was being displayed approximately 60-70 pixels inside the bottom table boundary. (Firefox, Scrollable Tables) Note the position of the ‘Top’ links in the test document below.
*   Bug #5: More of a limitation than a bug, the DataTable does not allow a fixed width table with horizontal overflow. Say you have a table that you have fixed column widths for, but if the width of the real estate available for the table is less than this minimum, the table should overflow with a scroll bar, but at the same time showing the column headers if you scroll vertically. A picture is better:  
    ![Scrollable][2]

 [2]: /web/wp-content/uploads/2007/04/yui-datatable1.gif

See the following [test document][3] for relevant table tests. (Note that for the purposes of testing, I’ve decided to test all combinations of the Top 3 DataTable features: scrolling, nested table headers, and sorting)

 [3]: http://www.zachleat.com/Projects/valdi/__test_yui_datatable_original.html

Just like your favorite professor, now I’m going to post the **Solutions**:

Bug #1: What is your Box Model?

Use the following JavaScript code to tell if you’re in Standards Mode or Quirks Mode:

    alert( document.compatMode=='CSS1Compat' ? 'Standards Mode' : 'Quirks Mode' );

Standards mode forces your document into using the W3C Box Model, which is currently the standard. The W3C Box Model means any width declarations you make in your CSS code will not include padding, border, or margins. So if you put padding on your table cells and headers, it will need *to be added on separately to the total width of your table*.

Bug #2: Someone has posted the solution on the [Sourceforge Bug Tracker here][4]. (This is included in the DataTable javascript file below)

 [4]: http://sourceforge.net/tracker/index.php?func=detail&aid=1701632&group_id=165715&atid=836476

Bug #3, #4, and #5: I have produced an alternate DataTable file that fixes these bugs using JavaScript code. All lines that were added or changed are commented with //ADDED or //CHANGED

Developed in and last tested with YUI version 2.2.2.

Download it here:  
Full (169 KB): [ymod-datatable-beta.js][5]  
Minimized using [JSMIN][6] (67 KB): [ymod-datatable-beta-min.js][7]

 [5]: /web/wp-content/uploads/2007/04/ymod-datatable-beta.js "ymod-datatable-beta.js"
 [6]: http://www.crockford.com/javascript/jsmin.html
 [7]: /web/wp-content/uploads/2007/04/ymod-datatable-beta-min.js "ymod-datatable-beta-min.js"

The original and minimized YUI DataTable files are 166 KB and 66 KB respectively.

See the [fluid width DataTables in action here][8].

 [8]: /Projects/valdi/__test_yui_datatable_fluid.html

A few notes on doing a fixed width DataTable using the code provided above. The total width of the table body must be 16px less than the width of the header, if you have vertical scrolling (to account for the scrollbar). So, if the total width of your header is 800px, the total width of your body must be 784px (put the last table cell as 16px smaller).

Here’s the CSS to go along with a horizontal scrolling DataTable:

    .yui-dt-table th, .yui-dt-table td { padding: 2px 0 2px 5px; vertical-align: top; }
    .yui-dt-table th, .yui-dt-table tr.yui-dt-first td { width: 100px; } /* table header and only the first row (for drag and drop) */
    .ymod-scrollingBody .yui-dt-table tr.yui-dt-first td.yui-dt-last { width: 84px; } /* last table cell (for crappy scrollbar problem) */
    .yui-dt-table .yui-dt-even {background-color:#fff;}
    .yui-dt-table .yui-dt-odd {background-color:#e0dfe0;}
    .yui-dt-table .yui-dt-selected {background-color:#bdcede;}
    .yui-dt-table thead {background-color:#933;color:#fff;}
    .yui-dt-table th a {color:#fff ! important;}
    .ymod-scrollingHeader {
      width: 100%;
      height: 20px;
      overflow: hidden;
      position: relative;
    }
    .ymod-nestedHeaders {
      height: 40px; /* gotta set this manually, unfortunately */
    }
    .ymod-scrollingHeader table {
      position: absolute;
      top: 0;
      left: 0;
    }
    .ymod-scrollingBody {
      width: 100%;
      overflow: auto;
      height: 160px;
    }
    .ymod-scrollingHeader table { width: 800px; } /* Set your widths! */
    .ymod-scrollingBody table { width: 784px; }
