---
title: 'Logical XOR <span class="widow">in JavaScript</span>'
author: Zach Leatherman
layout: post
permalink: /logical-xor-in-javascript/
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299723725:0
categories:
  - JavaScript
tags:
  - Math
---
# 

Of course there wouldn’t be an XOR function in JavaScript when I needed one. So I googled around and found an implementation at [How To Create][1]. But it only took two arguments. So I rolled my own supporting a variable number of arguments. In my personal stuff, I’ve put it into a Math library under the YAHOO namespace, and you can decide if you want to do that on your own.

 [1]: http://www.howtocreate.co.uk/xor.html

    function xor&#40;&#41;
    &#123;
    	var b = false;
    	for&#40; var j = ; j < arguments.length; j   &#41;
    	&#123;
    		if&#40; arguments&#91; j &#93; && !b &#41; b = true;
    		else if&#40; arguments&#91; j &#93; && b &#41; return false;
    	&#125;
    	return b;
    &#125;;

Usage:

    xor&#40; false, true &#41;; // true
    xor&#40; true, true &#41;; // false
    xor&#40; false, false, true, true, true, false, true, false &#41;; // false
    xor&#40; false, false, false, true, false, false, false, false &#41;; // true