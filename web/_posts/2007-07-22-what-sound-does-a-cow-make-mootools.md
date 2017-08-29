---
title: What Sound Does a Cow Make?  MooTools.
author: Zach Leatherman
layout: post
permalink: /what-sound-does-a-cow-make-mootools/
categories:
  - JavaScript
  - Reviews
tags:
  - Mootools
  - feedtrim
---

Frameworks, Frameworks everywhere. There are the big six: Dojo, jQuery, prototype/scriptaculous, Ext, Mootools, and YUI. (Honorable meantion to Open Rico and Mochikit) I’ve had limited experience with all of these frameworks, but have actually worked on projects involving YUI and jQuery. So when I was shopping around for a framework that I didn’t have extensive experience with for my next project, I decided to with Mootools. They’ve been getting a lot of traffic lately for posting their [SlickSpeed Selectors Test][1], so I figured why not try their wares.

 [1]: http://mootools.net/slickspeed/

Originally coming from the YUI Library (a strictly namespaced, well organized package), and then learning jQuery (a language with object chaining, a more object oriented approach, and a much larger community), the Mootools package definitely caught me off guard.

My first surprise was that it put functions EVERYWHERE! The Core file puts approximately ten functions in the global namespace, with the only indicator that they belong to Mootools being that they had a dollar sign prefix (e.g. $extend). Couldn’t these go into one global Mootools object? $E, $ES? These are given shortcuts with the normal $ and $$ functions. It just seems all over the place.

That being said, there is a lot of good functionality in the base Mootools distribution. A built in class to do Json communication (something YUI is lacking, although I’m sure it wouldn’t be too hard to port it in from Captain Crockford’s Code on his website), a class to Scroll to elements with nice transitions. It seems like everytime I would hit a “functional” snag in my project, I could find the exact code I needed already included in the core file.

I love their download page! Autopackaged code using Dean Edwards’ Packer. One small complaint is that there is no option to disable automatic include of dependencies. They want you to package Mootools into one single file everytime (which is unwieldy, considering I have to maintain my own text file of which packages I put into the source code, if I don’t want everything), and don’t let you download just a certain package for separate inclusion. But when the whole thing weighs in at 40KB, why does it even matter? I would recommend just downloading all the Components together and just not worrying about it.

All in all, I’m quite happy with my Mootools experience. I’ve definitely found that their SmoothScroll class and easy Color fading techniques are used pretty heavily by developers using Mootools, which gives you a sixth sense that the page you’re viewing is using the Mootools library. Sometimes I can just tell without even looking at the source files, which in this case is a good thing, given that we’re talking about animation techniques and not raw widget style. But I plan on writing more about my pet peeves with framework widget styles later on.

If you’ve been using one framework for a really long time, I would recommend checking out Mootools. Or any other framework. The more frameworks that you’ve tried, the better your perspective is on JavaScript in general, and what your framework’s strengths and weaknesses are. Mix it up!
