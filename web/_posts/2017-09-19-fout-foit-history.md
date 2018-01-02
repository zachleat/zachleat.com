---
title: A Historical Look at FOUT and FOIT
author: Zach Leatherman
layout: post
permalink: /fout-foit-history/
categories:
  - font-loading
tags:
  - font-loading
  - popular-posts
postRank: 10
daysPosted: 105
yearsPosted: 0.3
---

<em>Prerequisite: not sure what FOUT or FOIT are? Read the <a href="/web/webfont-glossary/#foit">definitions on the Web Font Loading Glossary</a>.</em>

For a recent talk at <a href="http://css-minsk-js.by/">CSS-Minsk-JS</a>, I did some research on the history of default font loading behaviors. I thought it was interesting, so I packaged it up below.

<video controls preload="metadata" src="/presentations/rocket-science/history1080p.mp4" poster="/presentations/rocket-science/history-poster.png" muted>
	Sorry, your browser doesn't support embedded videos. Try <a href="/presentations/rocket-science/history1080p.mp4">downloading it</a> instead.
	<img src="/presentations/rocket-science/history-poster.png" alt="Modern day support: IE/Edge FOUT, everyone else FOITs with a 3 second timeout">
</video>

<table>
	<thead>
		<tr>
			<th>Year</th>
			<th class="nowrap">Behavior</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>1997</td>
			<td></td>
			<td>CSS 2 <a href="https://www.w3.org/TR/WD-CSS2-971104/fonts.html#h-14.3.4">Fonts</a> W3C Working Draft</td>
		</tr>
		<tr>
			<td>1997</td>
			<td class="yes"><strong>FOUT</strong> <span style="font-size:90%">(1st)</span></td>
			<td>Internet Explorer (v4) added @font-face support, first introducing FOUT to the world.</td>
		</tr>
		<tr>
			<td>1998</td>
			<td></td>
			<td>CSS 2 <a href="https://www.w3.org/TR/REC-CSS2/fonts.html">Fonts</a> W3C Recommendation</td>
		</tr>
		<tr>
			<td class="nowrap">2008 <span class="hide-sm"><abbr title="November">Nov</abbr> 12</span></td>
			<td class="yes"><strong>FOIT</strong> <span style="font-size:90%">(1st)</span></td>
			<td>Safari (v3.2) added @font-face support, first introducing FOIT to the world.</td>
		</tr>
		<tr>
			<td class="nowrap">2008 <span class="hide-sm"><abbr title="December">Dec</abbr> 11</span></td>
			<td class="emulate"><strong>FOIT</strong> <span style="font-size:90%">(2nd)</span></td>
			<td>Chrome (v1.0) added @font-face support (was using WebKit 528)</td>
		</tr>
		<tr>
			<td class="nowrap">2009 <span class="hide-sm"><abbr title="June">Jun</abbr> 29</span></td>
			<td class="emulate"><strong>FOUT</strong> <span style="font-size:90%">(2nd)</span></td>
			<td>Firefox (v3.5) added @font-face support</td>
		</tr>
		<tr>
			<td class="nowrap">2009 <span class="hide-sm"><abbr title="August">Aug</abbr> 31</span></td>
			<td><strong>FOUT</strong></td>
			<td>Opera (v10.1) added support</td>
		</tr>
		<tr>
			<td class="nowrap">2010 <span class="hide-sm"><abbr title="April">Apr</abbr> 2</span></td>
			<td><strong>FOIT</strong></td>
			<td>Mobile Safari (v3.2) added @font-face support (SVG format only)</td>
		</tr>
		<tr>
			<td class="nowrap">2011 <span class="hide-sm"><abbr title="March">Mar</abbr> 8</span></td>
			<td><strong>FOIT</strong></td>
			<td>Mobile Safari (v4.3) added a few more popular @font-face formats</td>
		</tr>
		<tr>
			<td class="nowrap">2011 <span class="hide-sm"><abbr title="March">Mar</abbr> 22</span></td>
			<td class="yes"><strong>FOIT 3<abbr title="seconds">s</abbr></strong> <span style="font-size:90%">(1st)</span></td>
			<td>Firefox (v4.0) switched to add a FOIT timeout, <em>the first browser to FOIT with a timeout</em>.</td>
		</tr>
		<tr>
			<td class="nowrap">2012 <span class="hide-sm"><abbr title="November">Nov</abbr></span></td>
			<td class="emulate"><strong>FOIT 3<abbr title="seconds">s</abbr></strong> <span style="font-size:90%">(2nd)</span></td>
			<td>Opera (v12.1) switched to add a FOIT timeout</td>
		</tr>
		<tr>
			<td class="nowrap">2013 <span class="hide-sm"><abbr title="July">Jul</abbr></span></td>
			<td><strong>FOIT</strong></td>
			<td>Chrome (v28) switched to the Blink rendering engine, keeping the FOIT</td>
		</tr>
		<tr>
			<td class="nowrap">2013 <span class="hide-sm"><abbr title="July">Jul</abbr> 2</span></td>
			<td><strong>FOIT</strong></td>
			<td>Opera (v15) switched to the Blink rendering engine, switching from FOIT with a timeout to FOIT without a timeout.</td>
		</tr>
		<tr>
			<td class="nowrap">2014 <span class="hide-sm">May</span></td>
			<td><strong>FOIT 3<abbr title="seconds">s</abbr></strong></td>
			<td>Chrome (v35) switched to add a FOIT timeout</td>
		</tr>
		<tr>
			<td class="nowrap">2014 <span class="hide-sm"><abbr title="June">Jun</abbr></span></td>
			<td><strong>FOIT 3<abbr title="seconds">s</abbr></strong></td>
			<td>Opera (v22) followed Blink and added a FOIT timeout (again)</td>
		</tr>
		<tr>
			<td class="nowrap">2015 <span class="hide-sm"><abbr title="March">Mar</abbr></span></td>
			<td><strong>FOUT</strong></td>
			<td>Edge (v12) released, maintaining IE’s beautiful default FOUT behavior.</td>
		</tr>
		<tr>
			<td class="nowrap">2016 <span class="hide-sm"><abbr title="September">Sep</abbr> 20</span></td>
			<td><strong>FOIT 3<abbr title="seconds">s</abbr></strong></td>
			<td>Safari (v10) finally added a FOIT timeout, almost eight full years after introducing FOIT to the world.</td>
		</tr>
	</tbody>
</table>

Browsers implementing a FOUT/FOIT/FOIT-3s behavior first (trailblazers) are denoted as (1st) above. Browsers second to implement an existing behavior (two makes a crowd) are denoted as (2nd) above.

## Highlights

* Microsoft’s adherence to FOUT. It’s the most reliable way to render web fonts without the perceived performance penalties and race conditions that come with FOIT so honestly, I admire this. They were first and they’ve stuck to their guns.
* Opera has been the most volatile of the bunch, mostly because of the unfortunately timing of their rendering engine switch.
* I was disappointed at how much influence WebKit/Safari’s choices had on other browsers. I know how much of a pain point the default FOIT behavior is for developers and so it’s been a little disheartening to read those early bug tracker discussions. I’m glad they’ve added a FOIT timeout but we need a cross-browser way to easily control FOIT and FOUT—we need wider support for the `font-display` descriptor.
