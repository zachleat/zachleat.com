---
title: Device Independence on the Open Web
author: Zach Leatherman
layout: post
permalink: /device-independence/
categories:
  - Application Design
tags:
  - highlight
---

Open Web advocacy can get pretty lonely working in Big Enterprise. Armed with slow moving standards bodies, and held back by antiquated browser support, architectural battles over tools and frameworks can get pretty hairy if you don’t approach them with the right frame of mind.

Big Enterprise is traditionally known for creating development environments that foster a “get it done” mentality, often rewarding results over correctness (mileage, of course, may vary).

> My company uses IE6, and the application works in IE6, so it’s done!

This little quagmire is amplified by the fact that when using Open Web technology, there are many ways to get things done, and most of them are incorrect. But those mistakes don’t manifest themselves until the project is in the hands of the end user, whom we often punish for our oversight.

But there is hope. Using the power of web standards and Open Web best practices, we can achieve something panoramically, not microscopically, beautiful.

The secret sauce of building for the Web isn’t its distribution model, in which updates are managed on the web server without the need to update software on the client (although the Anti-IE6 vigilantes would tell you differently). It most certainly isn’t development efficiency, as most people new to the game will so readily inform you of. Cross browser quirks due to non-standard browser implementations of CSS and JavaScript, or vague standards specifications have seen to that.

> When I was writing Visual Basic, I got my job done so much quicker and easier!

## The power of the Open Web is Device Independence.

Visitors to our sites **shouldn’t be met with warnings** about what device they’ve chosen to use.

> This site viewable only in IE7 , Firefox, Chrome, or Safari, and at minimum 1024×768 resolution.

> This site requires Flash or Silverlight

I realize that this is a controversial stance, especially given that most sites are dropping support for IE6, and more are relying on Flash and Silverlight plugins. **Architect applications to your client device usage statistics, and don’t let your tools shape the statistics for you.** Using techniques like progressive enhancement, we can ensure that our sites degrade gracefully to the capabilities of the client device. At it’s truest form, this is basic accessibility. But, Device Independence might be a more accurate term, since accessibility is unfortunately an overloaded term scoped solely with devices tied to disabilities (screen readers, for example). While screen readers are a very important piece, there is a bigger picture.

When the iPhone came out, there was an uproar because it didn’t support Flash, for battery life and other reasons. But the uproar was from developers who had designed applications specifically for Flash! Would you say that those Flash applications were designed with device independence in mind? YouTube got around this by encoding their videos in MP4 format, which arguably has a higher device independence rating than the Flash format.

Keep in mind that we’re **not attempting to handle every permutation of end user browser settings**, since most don’t change the defaults. Instead we are trying to scoop up the largest base of supported devices with the least amount of effort! Who cares if an end user disabled JavaScript in their preferences? I’m more worried about the mobile browser that doesn’t even support JavaScript at all. But when you use Open Web properly, you get support for both!

## Output Device Independence

*   Full Web Browsers: Does your site work in Opera? Don’t worry about pixel perfection, that’s something completely different — does it work?
*   Web Browsers on Mobiles
*   Search Engine Spiders and other Screen Scrapers
*   Screen Readers
*   Printers: Ever had to make an entirely separate page for print-friendly version of your application? Flash/Silverlight **do not** print well
*   Televisions: Xbox 360, Wii, and Other Media Center Devices
*   Projectors
*   *and more…*

Take a look at the [CSS specification for media types][1]. The standards are there! Support for CSS media types isn’t fool proof by any means, but the end goal is clearly visible.

 [1]: http://www.w3.org/TR/CSS21/media.html#media-types

## Input Device Independence

But I’m not just talking about output device independence either. User interfaces should be adaptable to different input devices as well.

*   Mouse
*   Keyboard (often overlooked in web applications)
*   Touch Screens (Single and [Multi-touch][2])
*   Voice, Motion Capture, and Facial Recognition (the standards and technology aren’t quite there yet, but [progress is being made][3])
*   *and more…*

 [2]: http://hacks.mozilla.org/2009/08/multi-touch-firefox/
 [3]: http://hacks.mozilla.org/2009/06/connecting-html5-video/

The world is developing the Open Web, and it isn’t limited by a single company’s goals and timelines. At times, Open Web may seem like it’s a very slow moving **glacier** headed our way, but what else can you do but laugh when companies try to **power their Titanic right through it**?

*Article originally inspired by [Yahoo’s Graded Browser Support][4].*

 [4]: http://developer.yahoo.com/yui/articles/gbs/#history
