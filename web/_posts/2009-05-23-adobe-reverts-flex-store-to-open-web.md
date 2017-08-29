---
title: Adobe Reverts Flex Store to Open Web
author: Zach Leatherman
layout: post
permalink: /adobe-reverts-flex-store-to-open-web/
categories:
  - Reviews
tags:
  - Adobe
  - Flash
  - Flex
  - deprecated
---

A few weeks ago in the process of doing some research about the Adobe Flex platform, I came across their online store, a dogfooded full page application using Flex.

This morning I went back to the [same URL][1] to find a site that was no longer using the full page Flex application I had been expecting. Instead it was now using native Open Web technology.

 [1]: https://store1.adobe.com/cfusion/store/html/index.cfm?store=OLS-US&#

Naturally, my first assumption was that I had hallucinated the original research. But as it turns out, I wasn’t the only one that noticed the Flex application. This blogger [complained about the accessibility][2] of a full page Flash/Flex store. Another blogger had a [similar complaint][3].

 [2]: http://www.cfinternals.org/blog/2007/06/adobes_flashfle.html
 [3]: http://www.abdulqabiz.com/blog/archives/adobe/adobe_store_is_still.php

I have no idea how long the Flash/Flex Adobe store experiment went on before they changed it back. I’m just glad I’m not crazy.

**Update**: Turns out they are using a whitelist/blacklist of user agents to decide whether or not to show the Flex store. The [original entry point][4] above is incorrect, and shouldn’t have the html subdirectory. If you go to the site in Chrome, it will redirect you to the HTML version. My apologies, Adobe, although I do think the HTML version is much more accessible.

 [4]: https://store1.adobe.com/cfusion/store/index.cfm
