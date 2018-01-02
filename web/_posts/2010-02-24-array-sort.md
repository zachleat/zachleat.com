---
title: Internet Explorer Array.sort Unreliable
author: Zach Leatherman
layout: post
permalink: /array-sort/
categories:
  - JavaScript
tags:
  - highlight
  - research
---

What would you expect to be the result of executing the following code?

    // Create a medium size array, at least 100 items
    var obj = [];
    for(var j=0, k=150; j<k; j++) {
        // the value here doesn't matter.
        obj.push('ABCD'+j);
    }
     
    // Sort the array alphabetically.
    obj.sort(function(m,p){
        m=(''+m).toLowerCase();
        p=(''+p).toLowerCase();
     
        if(m > p) return 1;
        if(m < p) return -1;
        return 0;
    });

The `obj` Array should now be sorted, in alphabetical order based on value.  **BUT, in our best friend Internet Explorer, a `Number Expected` error may be the result.**  Don&#8217;t be fooled if your test array behaves correctly, it only happens intermittently for arrays of varying size!

So, I [whipped up a quick test to check the damage](http://www.zachleat.com/test/numberexpected/).  Iterating over array sizes from 1 to 150, running the Array sort algorithm.  The following failures resulted:

<table>
<thead>
<tr>
<th>Browser</th>
<th>Failures *</th>
</tr>
</thead>
<tbody>
<tr>
<td>Internet Explorer 6</td>
<td>4 sizes out of 150</td>
</tr>
<tr>
<td>Internet Explorer 7</td>
<td>18 sizes out of 150</td>
</tr>
<tr>
<td>Internet Explorer 8 (and Compatibility Mode)</td>
<td>2 sizes out of 150</td>
</tr>
<tr>
<td>Internet Explorer 9 (and Compatibility Mode)</td>
<td>0 sizes out of 150 (Fixed!)</td>
</tr>
</tbody>
</table>

\* Failures may vary to the specifications of the test machine.

Of course, the `Number Expected` error is going to result whenever your code doesn&#8217;t return a number inside of the function callback.  But the problem here is something deeper than simple application code failure.  The problem is in JScript itself.  Any modification to the sort arguments may result in the `Number Expected` error.

    // modifies the argument m and is unreliable.
    m=(''+m).toLowerCase();

This problem will manifest itself more frequently if you use the Google Closure Compiler, which restructures JavaScript to reuse argument variables if possible, probably to save the 4 character penalty of a &#8220;var &#8221; declaration.

Normally, reusing argument variables is a safe practice for primitives, since they are passed by value and not by reference, as is the case in this Array sort example <sup>[1](#by-ref)</sup>.  So, what exactly is going on here?  One commenter at the [Google Closure Compiler bug](http://code.google.com/p/closure-compiler/issues/detail?id=58) seems to think that the actual array values are being passed by reference instead of by value.  I&#8217;m not completely convinced that&#8217;s the case.

## The Fix

**Don&#8217;t reuse the argument variables inside of an Array sort function.**

    // Changing the above example
    obj.sort(function(m1,p1){
        var m=(''+m1).toLowerCase(),
            p=(''+p1).toLowerCase();
     
        if(m > p) return 1;
        if(m < p) return -1;
        return 0;
    });

_Check the [source code of the demo file](http://www.zachleat.com/test/numberexpected/) to see the different methods of modifying the arguments that I attempted._

1.  If you want to learn more about passing by value or reference, [Jonathan Snook has a nice explanation](http://snook.ca/archives/javascript/javascript_pass).

_Internet Explorer can&#8217;t make you do anything, it can only make you wish you hadn&#8217;t._

**Updated: Added note about Internet Explorer 9 and its Compatibility View. Looks like it&#8217;s fixed!**
