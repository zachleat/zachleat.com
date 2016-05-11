---
title: 'Advanced Font Loading with Typekit'
author: Zach Leatherman
layout: post
permalink: /advanced-font-loading-with-typekit/
categories:
tags:
---

You may be familiar with [loading your TypeKit web fonts asynchronously](http://blog.typekit.com/2015/08/04/new-embed-code-for-asynchronous-font-loading/), eliminating FOIT altogether and instead using a FOUT approach to maximize site robustness and ensure that the content is readable at all times during page load. Side note: *make sure that you use the advanced embed code so that your TypeKit kit loads asynchronously as well.*

However, once you get rid of FOIT, you may also want to take a hand at minimizing FOUT as well. I’ll show you how to make your TypeKit FOUT altogether negligible in this post.