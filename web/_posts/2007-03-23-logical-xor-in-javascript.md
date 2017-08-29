---
title: Logical XOR in JavaScript
author: Zach Leatherman
layout: post
permalink: /logical-xor-in-javascript/
categories:
  - JavaScript
tags:
  - Math
  - project
  - feedtrim
---

Of course there wouldn’t be an XOR function in JavaScript when I needed one. So I googled around and found an implementation at [How To Create][1]. But it only took two arguments. So I rolled my own supporting a variable number of arguments. In my personal stuff, I’ve put it into a Math library under the YAHOO namespace, and you can decide if you want to do that on your own.

 [1]: http://www.howtocreate.co.uk/xor.html

    function xor()
    {
      var b = false;
      for( var j = 0; j < arguments.length; j++ )
      {
        if( arguments[ j ] && !b ) b = true;
        else if( arguments[ j ] && b ) return false;
      }
      return b;
    };

Usage:

    xor( false, true ); // true
    xor( true, true ); // false
    xor( false, false, true, true, true, false, true, false ); // false
    xor( false, false, false, true, false, false, false, false ); // true
