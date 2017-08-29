---
title: Minor Annoyances with Firefox Development
author: Zach Leatherman
layout: post
permalink: /minor-annoyances-with-firefox-development/
categories:
  - Web Browsers
tags:
  - Caching
  - Firefox
  - feedtrim
---

When you’re developing web applications in Firefox, do you find yourself constantly clearing your cache? Cache is a useful facet of web browsing for everything but the continuous testing environment of web development. Here’s a nice alternative so that you don’t have to disable your cache entirely:

Use the Firefox Plug-In called (humorously enough) [**JohnnyCache**][1]. I added the pattern ‘http://localhost/’ to my preferences and now I don’t have to worry about cache on my local machine anymore. Simple, easy, effective.

 [1]: https://addons.mozilla.org/en-US/firefox/addon/3817

Now only if I knew how to disable the Firefox preference that autopopulates form fields with default values when F5 is hit to refresh the page. Try creating a page with a single text field, type a value into the form, and then hit F5 to refresh the page. Your value will be prefilled into the form.

I find myself always hitting “CTRL L” (goes to the Location Bar) and “Enter” to avoid that one. I looked through about:config, but only found: signon.prefillForms (related to usernames and passwords), and browser.formfill.enable (related to autocomplete dropdowns for forms, not default values).

Anyone know an easier method?
