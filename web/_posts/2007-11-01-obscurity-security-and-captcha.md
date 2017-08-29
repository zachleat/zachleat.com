---
title: 'Obscurity, Security, and Captcha'
author: Zach Leatherman
layout: post
permalink: /obscurity-security-and-captcha/
categories:
  - Reviews
tags:
  - Captcha
  - Security
  - feedtrim
---

On Ajaxian recently, there have been a few posts touting new and inventive replacements for the more traditional distorted and discolored “What does this image say?” Captcha gatekeeper for your web form. Of course these are all intended to provide a mechanism to tell the difference between an automated web bot that is spamming your web form and a human being.

Obviously there are some accessibility issues with Captcha images, in that they are useless to those that are vision impaired. Some sites provide an alternate link to an audio file that speaks a random word that you must then enter into the form.

One of the easiest ways to implement a Captcha on your site is to use the [reCAPTCHA plugin][1]. But that’s not what I’m going to talk about here. What I want to talk about is these new methods being introduced.

 [1]: http://recaptcha.net/

The first that was recently linked was [a method that involved drag and drop][2] to authenticate the user. Obviously this method is flawed, especially if the automated robot has access to fire JavaScript events. It does nothing but introduce a different door that the spammer may not have seen before. When this method gains any sort of popularity, or if a spammer decides to attack the site implementing this method specifically, it would not be difficult to bypass the Captcha. This is referred to in the computer world as “[Security through Obscurity][3]“. This is not good practice.

 [2]: http://ajaxian.com/archives/preventing-spam-with-drag-and-drop
 [3]: http://en.wikipedia.org/wiki/Security_through_obscurity

The next post I read was [regarding an implementation that presented the user with 8 boxes][4], with one of those boxes colored differently with an invitation to find and click on the differently colored box. The was implemented by [Passpack][5] (a password hosting service — should be focused on security, right?). Correctly me if I’m wrong, but how is this difficult for the Spammer at all? The whole point of a Captcha is to distort the text inside the image so much that the image can’t be read by an [Optical Character Recognition (OCR)][6] program. Basically, they’ve simplified it down to a one pixel image, which is an infinitely easier optical recognition problem. You don’t even have to recognize characters, you can just see if the pixel is a 1 or a 0. Forgive me for asking, but is that problem NP complete?

 [4]: http://almaer.com/blog/are-you-human
 [5]: http://www.passpack.com/info/home/
 [6]: http://en.wikipedia.org/wiki/Optical_character_recognition

I am all for having more friendly humane methods of Spam Bot detection. Just be wary of the methods you’re using. Are they actually secure, or are they just obscure?
