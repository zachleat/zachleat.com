---
title: Forward Compatibility and JavaScript
author: Zach Leatherman
layout: post
permalink: /forward-compatibility-and-javascript/
categories:
  - JavaScript
  - Web Browsers
tags:
  - Internet Explorer
  - Rendering Modes
  - feedtrim
---

Many developers (myself included) complain endlessly about the problematic ECMAScript implementation that Internet Explorer uses called JScript. And after reading [one such very detailed complaint][1] in the comments on Dave Massy’s website at MSDN, and reading [Chris Wilson’s post about ECMAScript 3][2], it has become increasingly obvious of Microsoft’s opinion on the subject of Forward Compatibility with JavaScript. It’s something they keep pounding their fists on the ground about, how they are adamant that new versions of their browser not “Break the Web.”

 [1]: http://blogs.msdn.com/dmassy/archive/2006/11/30/vpc-to-run-ie6-and-ie7-on-the-same-machine.aspx
 [2]: http://blogs.msdn.com/ie/archive/2007/10/30/ecmascript-3-and-beyond.aspx

Of course, “Breaking the Web” refers to the amount of code on the internet today that is an equal and opposite reaction to the broken bug-ridden JavaScript implementation of their browser. It describes the unimaginable future in which Internet Explorer fixed the many well documented *intricacies* of JScript and thereby ruins the code that was originally written to support the problem. What a conundrum.

But haven’t we already been through this problem? Isn’t this the same exact thing we saw in the early days of CSS? And how did the major browser players react? By implementing both a [Quirks and Standards mode for CSS through DocType switching][3]. Now my question is:

 [3]: http://www.quirksmode.org/css/quirksmode.html

**Why haven’t we seen a Quirks and Standards Compatibility Mode for JavaScript?**

I’m not necessarily encouraging the Quirks and Standards modes to be toggled with the DocType (as with CSS), but why not have these two modes? To enable your site to use the Standards mode of JavaScript, the browser might require a certain DocType to be declared, or it might require a different script type in the browser:

    <script type="text/javascript" mode="standards">

Either that, or [I could just use Base2][4].

 [4]: http://dean.edwards.name/weblog/2007/03/yet-another/
