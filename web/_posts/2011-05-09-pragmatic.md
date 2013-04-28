---
title: 'Pragmatic Progressive Enhancement'
author: Zach Leatherman
layout: post
permalink: /pragmatic/
categories:
  - Application Design
  - Opinion
---

![][1]

 [1]: http://www.zachleat.com/web/wp-content/uploads/2011/05/juniper.jpg "Juniper Plant"

A few weeks ago at the jQuery Conference (San Francisco 2011), Nicholas Zakas delivered a wildly entertaining presentation entitled **[“Progressive Enhancement 2.0″][2]** (slides 65-79 are especially great), updating the basic rules of PE for a modern age. While prior Progressive Enhancement techniques included layering content, presentation, and behavior (conveniently represented as HTML, CSS, and JavaScript). PE 2.0 (not to be confused with our other 2nd generation friend, the Web) involves **multiple layers of CSS** for differing device capabilities (rounded corners for example) and **multiple layers of JavaScript** (ECMAScript 5 capable browsers, for example). He made the argument that this also included **ignoring older browsers** (in some cases) and only moving forward with new functionality for newer, more capable devices.

 [2]: http://www.slideshare.net/nzakas/progressive-enhancement-20

Like any web developer that believes in getting actual work done, I agree with his argument but not without exemption.

## Pieces of Flair

The benefit of Progressive Enhancement pays off when your code encounters a device is **incapable of interpreting the CSS or JavaScript correctly** in a way the code was intended. This could be because of a bug in the rendering or JavaScript engine (or God-forbid an error in the code itself), or it could be because the feature being utilized is newer than the device itself and it could not have supported it without clairvoyance or a time machine.

The example Nicholas used to display this case was the Twitter home page, which uses CSS border-radius to display rounded corners. In user agents that don’t support border-radius, such as IE 