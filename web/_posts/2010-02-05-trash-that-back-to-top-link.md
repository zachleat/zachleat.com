---
title: 'Trash that &#8220;Back to Top&#8221; Link'
author: Zach Leatherman
layout: post
permalink: /trash-that-back-to-top-link/
categories:
  - Interface Design
  - JavaScript
tags:
  - Page Fold
  - Scrolling
---

> It would seem that perfection is attained not when no more can be added, but when no more can be removed.
> 
> —Antoine de Saint Exupéry

  
  
While most would argue that the principles espoused in the above quote might also be applied to the quote itself, it would serve us better to consider how we can **attempt perfection in our User Interface designs** instead.

The most complete litany of reasons why you should spend your page weight on more useful bytes has been [compiled by Jukka Korpela][1], although he seems to both confirm that they are harmful and still use them on his site.

 [1]: http://www.cs.tut.fi/~jkorpela/www/totop.html

The rules of engagement I find useful when dealing with the ill-fated “Back to Top” or its ugly stepsister “Top of Page” link are as follows:

1.  **Delete the link.**

Really, you don’t need the link. It’s a **sacred cow remnant** of a time when people believed that all content needed to be positioned [above the page fold][2].

 [2]: http://iampaddy.com/lifebelow600/

Guess what? **People know how to scroll!** They know how to scroll down, they know how to scroll up. Considering this prerequisite has been met, it becomes very apparent that the “Back to Top” link shares an **unnecessary overlap in functionality with the scrollbar** and is thus, unnecessary itself.

If you have an incredibly long page with a full set of “Table of Contents” links, it would be better to position your [table of contents fixed to the viewport][3], so as to make it always available to the user. If the Table of Contents is always available, the user will never have to click a link as a shortcut to find it.

 [3]: http://jqueryfordesigners.com/fixed-floating-elements/

While not a usability epidemic, the “Back to Top” link is still widely used. [Instant Shift][4] and [Smashing Magazine][5] both have articles with hundreds of examples of sites with these links.

 [4]: http://www.instantshift.com/2009/07/14/90-creative-back-to-top-links-and-best-practices/
 [5]: http://www.smashingmagazine.com/2008/11/27/short-story-about-top-links/

Don’t agree? If you’re stubborn as hell and hate simplicity, you’re going to keep the link on your page no matter what reasons are presented. In that case, at the very least follow these two guidelines:

1.  Use **progressive enhancement**:

        <a href="#" id="back-to-top">Back to Top</a>

        // Requires jQuery
        $('#back-to-top').click(function() {
            window.scrollTo(0,0);
         
            // don't change the hash if not needed
            return false;
        });

2.  **Hide the link** if the page doesn’t have a scrollbar. If no scrollbar exists, the user will **always be “at the top.”**     // Continuing with Previous Example

        // Continuing with Previous Example
        $(function() {
            $('#back-to-top').hide();
        });
         
        // If the page scrolls, we know there is a scrollbar.
        $(window).scroll(function() {
            $('#back-to-top').show();
        });
         
        // For completeness, you may also want to
        //   add logic to the "resize" event.

Really though, **just delete the link.**
