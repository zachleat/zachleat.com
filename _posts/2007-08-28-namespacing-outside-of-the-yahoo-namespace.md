---
title: 'Namespacing outside of the <span class="widow">YAHOO Namespace</span>'
author: Zach Leatherman
layout: post
permalink: /namespacing-outside-of-the-yahoo-namespace/
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299084705:1
categories:
  - JavaScript
tags:
  - jQuery
  - Namespacing
  - YUI
---
# 

YAHOO.namespace(). A lovely little utility function subject that [I’ve written about before][1]. If you’ve never heard of YAHOO.namespace or aren’t even familiar with namespacing, I’d read that article first.

 [1]: http://www.zachleat.com/web/2007/08/09/yui-code-review-yahoonamespace/

I’ll be honest, using the YAHOO namespace to store my own code makes my bunghole tighten just a little bit. What if I had written code stored under YAHOO.tool, which was unused prior to YUI 2.3.0? What would I do now? I’d have to rewrite my code, or never include any of the wonderful `YAHOO.tool.TestCase`, put together by [Nicholas Zakas][2]. As is traditional with most of my weblog posts, I try not to just complain about a problem without giving you a solution (but let’s be honest, only if it doesn’t take too much work).

 [2]: http://www.nczonline.net/

Let’s rewrite the YAHOO.namespace function to work outside of the YAHOO Namespace, so we can do things like this:

    namespace&#40; 'zachsWorld.partyTime' &#41;;
    zachsWorld.partyTime = function&#40;&#41; &#123;
    	alert&#40; 'Excellent.' &#41;;
    &#125;
    zachsWorld.partyTime&#40;&#41;; // obviously would alert: Excellent.

Here’s some code:

    function namespace&#40;&#41; &#123;
        var a=arguments, o=null, i, j, d;
        for &#40;i=; i