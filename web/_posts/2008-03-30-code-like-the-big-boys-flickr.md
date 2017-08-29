---
title: 'Code Like the Big Boys: Flickr'
author: Zach Leatherman
layout: post
permalink: /code-like-the-big-boys-flickr/
categories:
  - CSS
  - JavaScript
  - Reviews
tags:
  - Flickr
  - PNG
  - deprecated
  - feedtrim
---

*Code like the Big Boys is a series of posts about code solutions used by major websites. What can we learn from these professional websites to use in our own code?*

**JavaScript**

Looking at the source code of the Flickr home page is actually pretty strange. For one, there is only one JavaScript source code file (other than the advertising scripts), a solution for [PNG Alpha Transparency in Internet Explorer][1], included as an [HTML Component][2]. The source for the PNG Behavior script (credit to Erik Arvidsson) is unchanged, with the exception of the removal of some extraneous comments, but curiously enough no whitespace removed (a suggestion to save them a few bucks in bandwidth). Looking at their HTML source, they seem to emphasize whitespace and readability over bandwidth savings, which seems fine to me. At least their visitors (you and I) can more easily learn something from their code.

 [1]: http://webfx.eae.net/dhtml/pngbehavior/pngbehavior.html
 [2]: http://msdn2.microsoft.com/en-us/library/ms531018(VS.85).aspx

**CSS**  
They’ve taken the same route as one of the tips from [Jonathan Snook][3], and declared all styles for an element on a single line. They use your standard css to reset to a base starting point, much like YUI’s Reset CSS we’re all familiar with. One interesting declaration I noticed prominently inside of their CSS was the .Butt css class, declared on their primary Search form button. I’m curious to know the semantic meaning behind that one.

 [3]: http://snook.ca/archives/html_and_css/top_css_tips/

They use the [tan hack][4] as well to isolate a CSS declaration for IE browsers:

 [4]: http://www.info.com.ph/~etan/w3pantheon/style/starhtmlbug.html

    * html #featured-image cite {bottom: -1px;}

This is to workaround for an IE limitation to absolutely positioning content at the bottom of a relatively positioned div, in this case the black box containing the credits (or citation, hence the cite tag) inside of the feature image.

![Flickr Citation Tag][5]

 [5]: /web/wp-content/uploads/2008/03/flickr_cite.jpg "flickr_cite"

Another interesting CSS Hack they’ve employed involves the line-height for  tags containing Unicode characters to select different languages. It starts out like [Dustin Diaz’s min-height hack][6], but throws a loop.

 [6]: http://www.dustindiaz.com/min-height-fast-hack/

    height: 0px !important;
    height /**/:13px;

I’m not familiar with the `/**/` syntax, and would really appreciate any information someone has on what platform this is targeting. A comment would be nice!

*Editors Note (2013): The `/**/` syntax is to target [everything but IE6](http://browserhacks.com/).*

**HTML**

Standard here, and they have some nice meta tags for the I-phone:

    <meta name="viewport" content="width=950" />

All in all, it’s short and sweet code for a home page. It’s nice to see such clean code with an eye towards standards on a commercially successful site, many props to their programmers. I’m scared to do my next in the series, because I’m 100% sure it won’t be as nice of a read as Flickr was.
