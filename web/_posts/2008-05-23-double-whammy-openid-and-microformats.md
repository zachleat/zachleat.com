---
title: 'Double Whammy: OpenID and Microformats'
author: Zach Leatherman
excerpt: >
  <a
  href="http://www.ownyouridentity.com/2008/04/30/get-satisfactions-nice-import-profile-feature/">Own
  your Identity had a great post today</a> detailing a great feature on the
  signup form of the <a href="http://getsatisfaction.com/people/new">Get
  Satisfaction</a> site.


  They rely on the fact that sites like Twitter and Flickr publish an <a
  href="http://microformats.org/wiki/hcard">hCard microformat</a> for all of
  their users publicly on their website.
layout: post
permalink: /double-whammy-openid-and-microformats/
categories:
  - Application Design
  - Interface Design
tags:
  - Flickr
  - hCard
  - microformat
  - OpenID
  - Technorati
  - Twitter
  - feedtrim
---

## Microformategery

[Own your Identity had a great post today](http://www.ownyouridentity.com/2008/04/30/get-satisfactions-nice-import-profile-feature/) detailing a great feature on the signup form of the [Get Satisfaction](http://getsatisfaction.com/people/new) site.

They rely on the fact that sites like Twitter and Flickr publish an [hCard microformat](http://microformats.org/wiki/hcard) for all of their users publicly on their website.  If you go to [my twitter page](http://twitter.com/zachleat/) and view the source, you’ll find the following code available to anyone (without authentication):

    <address>
       <ul class="about vcard entry-author">
          <li><span class="label">Name</span> <span class="fn">Zach Leatherman</span></li>
          <li><span class="label">Location</span> <span class="adr">Omaha, NE USA</span></li>
          <li><span class="label">Web</span> <a href="http://www.zachleat.com/" class="url" rel="me">http://www.zachle...</a></li>
          <li id="bio"><span class="label">Bio</span> <span class="bio">UI Programmer, JavaScript Enthusiast, Soccer Hooligan</span></li>
       </ul>
    </address>

The premise here is that hCard tells you how to parse this markup to get usable information.  The `adr` CSS class tells you what my address is.  The `fn` CSS class tells you what my name is, and so on.  So, Get Satisfaction goes and spiders this page behind the scenes and autopopulates your profile with what it can find.  Pretty sweet.

Now, they don’t limit you to the services they provide, which are: Flickr, Technorati, Twitter, Upcoming, and last.fm.  They provide an Other category for any hCard enabled URL (your personal homepage or perhaps an [hResume](http://microformats.org/wiki/hresume) you have posted on the web).

## Integrate with OpenID

However, why not take it to the next level?  Why not integrate this microformat functionality WITH an openid login system?  You’d be able to kill two birds (not a twitter joke) with one stone in some cases, since both Twitter and Technorati are also OpenID producers (re-echo: We need more consumers).

So, not only do you get the benefits of having OpenID authentication on your website, but you’d be able to prepopulate a certain amount of profile data with an hCard parser.  And the best part is, if you already have a [nice clean user interface](http://remysharp.com/2008/04/24/stop-using-openid-why-how/) set up to handle different OpenID producers, there wouldn’t be any additional clutter on the interface to get this benefit.  It’d be transparent to the user when it works, and fall back to a normal empty profile form when it doesn’t.

What I’d like to see, is more sites that are OpenID producers, also serve hCard microformats as well.  If we can get all the major producers on board, we’d have a nice tidy little system going.
