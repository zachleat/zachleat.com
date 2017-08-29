---
title: Google Using YUI Grids CSS
author: Zach Leatherman
layout: post
permalink: /google-using-yui-grids-css/
categories:
  - CSS
  - JavaScript
  - Reviews
tags:
  - highlight
  - feedtrim
---

Head over to the [Google Homepage][1]. Log In using your Google Account. Make sure you’re at your [Personalized Homepage][1]. Take a look at the source CSS file [ig.css][2] included on the page. There are a few peculiar lines of code that I recognized from another source, the Yahoo User Interface Grids CSS file. Yahoo has provided a set of standard CSS definitions under the BSD license that allow a developer to easily make fluid or fixed width column layouts. And on the Google Personalized Homepage, there are the following class definitions:

 [1]: http://www.google.com/ig?hl=en
 [2]: http://www.google.com/ig/f/tB22vfBbv0g/ig.css

    #modules .yui-b{position:static;display:block;margin:0 0 1em 0;float:none;width:auto;overflow:hidden;}
    .yui-gb .yui-u{float:left;margin-left:2%;*margin-left:1.895%;width:32%;}
    .yui-gb div.first{margin-left:0;}
    #modules,.yui-gb{zoom:1;}

This code includes identical Class names taken from the [Yahoo User Interface library Grids CSS][3] component. Here is the source in the [grids.css][4] file from Yahoo (truncated for simplicity).

 [3]: http://developer.yahoo.com/yui/grids/
 [4]: http://yui.yahooapis.com/2.2.0/build/grids/grids-min.css

    #yui-main .yui-b{position:static;}
    .yui-t7 #yui-main .yui-b {
      display:block;margin:0 0 1em 0;
    }
    #yui-main .yui-b {float:none;width:auto;}
    .yui-gb .yui-u{float:left;margin-left:2%;*margin-left:1.895%;width:32%;}
    .yui-gb div.first{margin-left:0;}
    #bd,.yui-gb{zoom:1;}

Obviously, it’s the same code, with a few minor differences.

![Screenshot proof][5]

 [5]: /web/wp-content/uploads/2007/04/yuigrids-google1.jpg

The interesting thing to note is that the YUI Grids CSS source code is licensed under a [BSD license][6], which includes the following provisions:

 [6]: http://developer.yahoo.com/yui/license.html

> Redistributions of source code must retain the above copyright notice, this list of conditions and the  
> following disclaimer.

The copyright notice they’re referring to is not included anywhere on the Google Personalized Homepage (and would seem to be a violation of the license). Now this may seem like a small infraction when we’re just talking about 4 lines of CSS code. But really, if they think the code is good enough that they will use it in such a prominent way and not write it from scratch using their own means, they should follow the licensing agreements stipulated.

**Update**  
Google has added the BSD license statement and attribution to Yahoo in their CSS file ([ig.css][2]):

    /* ===============BEGIN BSD LICENSED PORTION============= */
    /*
    Copyright (c) 2007, Yahoo! Inc. All rights reserved.
    Code licensed under the BSD License:
    http://developer.yahoo.net/yui/license.txt
    version: 2.2.0
    */
     
    #modules .yui-b {
      position:static;
      display:block;
      margin:0 0 1em 0;
      float:none;
      width:auto;
      overflow:hidden;
    }
    .yui-gb .yui-u {
      float:left;
      margin-left:2%;
      *margin-left:1.895%;
      width:32%;
    }
    .yui-gb div.first {
      margin-left:0;
    }
    #modules,.yui-gb {
      zoom:1;
    }
    /* ===============END BSD LICENSED PORTION============= */

Sorry to everyone visiting the page for the extra millisecond or two it will take to load these comments.
