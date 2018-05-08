---
title: 'FOIT Timeouts: A Compatibility Table'
author: Zach Leatherman
layout: post
permalink: /foit-timeouts/
tags:
 - browserlogos
---

## No FOIT, Text always Visible

<b class="browserlogo browserlogo-edge" title="Edge">Edge</b>
<b class="browserlogo browserlogo-internet-explorer" title="Internet Explorer">Internet Explorer</b>

## Maximum 3 Second FOIT

If not available after 3 seconds, render fallback font. When web font becomes available, re-render.

<b class="browserlogo browserlogo-chrome" title="Chrome">Chrome</b>
<b class="browserlogo browserlogo-firefox" title="Firefox">Firefox</b>
<b class="browserlogo browserlogo-opera" title="Opera">Opera</b>
<b class="browserlogo browserlogo-safari-ios" title="Mobile Safari 10">Mobile Safari <span class="browserlogo_version">10</span></b>
<b class="browserlogo browserlogo-safari" title="Safari 10">Safari<span class="browserlogo_version">10</span></b>

## Unlimited FOIT, Text Invisible 

Text always invisible until web font becomes available and re-renders.

<b class="browserlogo browserlogo-android" title="Android">Android</b>
<b class="browserlogo browserlogo-safari-ios" title="Mobile Safari 9 and below">Mobile Safari <span class="browserlogo_version">≤ 9</span></b>
<b class="browserlogo browserlogo-safari" title="Safari 9 and below">Safari<span class="browserlogo_version">≤ 9</span></b>