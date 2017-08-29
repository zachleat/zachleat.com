---
title: 'maLArquee, Bringing Back the Marquee'
author: Zach Leatherman
layout: post
permalink: /malarquee-bringing-back-the-marquee/
project_name: maLArquee
description: A strange project creating a marquee.
headimage: /web/wp-content/uploads/2009/12/Screen-shot-2009-12-30-at-10.50.55-PM.png
categories:
  - project
tags:
  - Malarquee
  - Mootools
  - NTP
  - project
  - feedtrim
---

What did you spend your Saturday afternoon on? Did you kick up your feet in your hammock with a nice glass of lemonade in the shade of your favorite tree and read the HTML specification? Me too! Who knew that we’d have so much in common? Since you’re obviously like me, you’ve probably wondered to yourself: where did the marquee tag go? Why isn’t the internet graced with scrolling text gently flowing like a babbling brook across the pixels of your web browser? Well since you spent your Saturday reading the HTML specifications, you would know that the `` tag was only supported by Internet Explorer, and wasn’t even a part of the HTML spec. Unbelievable right? And to think the `` tag I came to know and love wasn’t part of the spec either! I’m just offended as you, let me reassure you. 

Well today, we’re going to solve all of that. Today, I’m going to show you a full screen web browser marquee that will both amaze and excite you. Here we go:

## [Malarquee](http://www.zachleat.com/Projects/Malarquee)


<div class="fluid-width-video-wrapper"><iframe class="youtube-player" type="text/html" width="640" height="385" src="https://www.youtube.com/embed/9OiF8Hd6Db0/" frameborder="0"></iframe></div>

## What is it for?

There are a few obvious uses, I suppose. You can send someone a nice greeting in an email link (it does a ROT13 encoding to mask the text inside the link). Try one of these:

For a spouse: [I want a divorce.][1]

 [1]: http://www.zachleat.com/Projects/Malarquee/index.html?text=V%20jnag%20n%20qvibepr.

For an employee: [You’re fired.][2]

 [2]: http://www.zachleat.com/Projects/Malarquee/index.html?text=Lbh'er%20sverq.

For a doctor: [I’m sorry but you have anal warts.][3]

 [3]: http://www.zachleat.com/Projects/Malarquee/index.html?text=V'z%20fbeel%7Cohg%20lbh%20unir%7Cnany%20jnegf.

For your son or daughter: [You were adopted.][4]

 [4]: http://www.zachleat.com/Projects/Malarquee/index.html?text=Lbh%20jrer%20nqbcgrq.

## So, what else does it do?

I knew you’d ask. If you click the Options link in the top right corner, you can scroll your text across **multiple web clients**! Input the number of clients you’d like to use and the number of your current client. Hit the update and save button to refresh your page. It will automatically parse your text accordingly (adding extra spaces at the end as blank slides if needed). You can test this using one computer by bringing up the following two links in separate windows side by side (you can use a different web browser for each link if you’d like):

[maLArquee Client #1][5]  
[maLArquee Client #2][6]

 [5]: /Projects/Malarquee/index.html?c=1&n=2
 [6]: /Projects/Malarquee/index.html?c=2&n=2

You could also go into a computer lab and scroll some text on a couple different computers.

## Why?

I think it’s fun to try new things on the web, experiment a bit. That’s also why I made [ALARMd, an Internet Alarm Clock][7]. For this project, I think it might be fun to try a new JavaScript library, just to get a little bit more experience with a range of different coding types. So I decided to use [MooTools][8], and wrote [a little review][9] on my experience, coming from a YUI and jQuery background.

 [7]: http://www.zachleat.com/web/2007/06/18/wake-up-to-youtube-on-my-internet-alarm-clock/
 [8]: http://www.mootools.net/
 [9]: http://www.zachleat.com/web/2007/07/22/what-sound-does-a-cow-make-mootools/

## How does it work?

Every 5 scrolls (I reserve the right to change this number at any time I so wish to conserve bandwidth), the page makes an XmlHttpRequest to the server, gets the server time, and adjusts the delay of the next scroll event to synchronize scrolling between multiple browsers. Ideally, if every computer were the same, we could just do a single XmlHttpRequest at page load and do a standard interval for scrolling. But we all know that every web browser is different, and just because you do a setInterval(yourFunction,1000) doesn’t mean it’s actually going to run yourFunction every second. It might run in 1010 ms or 990 ms. Thus, the XmlHttpRequest is needed to resynchronize all of the clients to a standard clock.

If there is any interest, I’ll post the code to the time.php script that returns the JSON containing the server time.

## What would you do different next time?

I told my gracious web host about this project after I was approximately 90% complete with it, and his response was: “Did you use NTP?”, with which I replied: “What is NTP?” Ugh. There is even a [JavaScript implementation][10].

 [10]: http://jehiah.cz/archive/ntp-for-javascript

In order to provide balance and order to the universe, please read [the following link][11].

 [11]: http://www.mcli.dist.maricopa.edu/tut/tut17.html
