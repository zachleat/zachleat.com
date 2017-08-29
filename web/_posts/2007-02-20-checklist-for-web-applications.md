---
title: Checklist for Web Applications
author: Zach Leatherman
layout: post
permalink: /checklist-for-web-applications/
tags:
  - feedtrim
categories:
  - Application Design
---

As the first post in this new category of web development, I’ve decided to keep it simple and post the different components and architecture considerations a developer must consider when making a new application, especially in today’s world of in-page dynamic interaction and the complications that has put on the problems that were considered solved in yesterday’s page level world. Mostly this is a place to collect my thoughts on this subject.

*   **Automatic Print Styling**: Is the page going to be able to be printed properly without a “Printer friendly” link? CSS style sheets can be used to modify the output of the page using the @media print declaration. Are the widget components you’re using in your JavaScript library able to support easy printing?
*   **Browser History Management**: Will your application support the back button, especially with the increased usage of AJAX interactions on a full page application. Don’t use XMLHTTPRequest’s to fetch the entire content of a page. Just redirect them to a new page when you are only saving the header and the footer.
*   **Graded Browser Support**: support of the web browsers with a large percentage of market share using the ideas put forth by Nate Koechley in his Graded Browser Support descriptions.
*   **Bookmark and Permanent Linking**: is the behavior of your JavaScript application changing how data is being displayed? You’d better modify the URL to allow the user to bookmark link straight to the same view.
*   **File Compression**: Minimize your CSS and JavaScript for delivery. GZip your CSS and JavaScript for browsers that support it (most all modern browsers do).
*   **Efficient Caching Mechanisms**: server side caching of data is necessary for high volume traffic.
*   **Internationalization** (i18n): will your application be viewed in other countries by non-English speakers? Are your dates in an international format? How about 24 hour time formats? Time zones? Do they observe Daylight Saving Time?
*   **Error Logging**: Both server side and client side (using AJAX to log JavaScript errors can be very helpful)

**Recommended Luxury Items**

*   **Support mobile devices**: How will your application look on a Blackberry? How does it render in Opera Mini?
*   **Offline Mode**: Add and modify data offline, with the ability to automatically synchronize changes when an internet connection becomes available.
*   **Exportable data**: PDF, Excel, RSS, even offline static HTML. JavaScript can sometimes give unknown results when using the browser to save the page locally. Make sure this is supported. Don’t force your users to save screenshots.

**Enterprise Client Side Widgets**

*   **Data Grid**: businesses just love data grids. Nothing like a nice standard set of cookie cutter constraints to force upon your data.
*   **Charts and Graphs**: metrics are important. Existing client side JavaScript charting packages can be limited when it comes to printing, or even saving the chart as an image file. These are important.

There are many facets that a developer must consider when designing a new application. I hope this list will at least make you think about some things that you may not have considered before. Thanks for reading.
