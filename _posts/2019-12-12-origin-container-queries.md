---
title: The Origin Story of Container Queries
tags:
  - research
---
**_Update November 2022_** Container Queries are now available in stable browser versions! 🎉🎉🎉🎉

<dl>
	<dt>✅ 2022 October 2</dt>
	<dd>
		Edge 106 ships with Container Query support.
	</dd>
	<dt>✅ 2022 September 22</dt>
	<dd>
		Chrome 106 ships with Container Query support.
	</dd>
	<dt>✅ 2022 September 11</dt>
	<dd>
		Safari 16 ships with Container Query support.
	</dd>
</dl>

<hr>

Container Queries are an often requested feature of the web platform. It has become almost cliché to mention it when talking about problems we’d like the web platform to solve. Container Queries would go a long way toward helping web developers do their jobs better and its omission is a huge limitation when developing component-based code for the web.

Everyone wants it, but it sure seems like no one is actively working on it. But I’m not here to soapbox about that. Here I only mean to discover the earliest mention of Container Queries (or Element Queries or any implementations of this similar idea) to learn _how long_ this feature has been requested by web developers. I’m curious: is this length of time customary for a new feature of the web platform? Or is something else going on?

Here are the earliest mentions of Container Queries that the community was able to dig up (in reverse chronological order):

<dl>
	<dt>2021 March 26</dt>
	<dd>
		Chrome Canary adds an experimental flag for a container queries implementation!
		<ul class="via">
			<li><em>via <a href="https://twitter.com/Una/status/1375419967718449155">{% twitterImageAvatar "una" %}Una Kravets</a></em></li>
		</ul>
	</dd>
	<dt>2014 December 8</dt>
	<dd>
		<a href="https://github.com/eqcss/eqcss">{% twitterImageAvatar "innovati" %}Tommy Hodgins’ <code>eqcss</code></a>
		<ul class="via">
			<li><em>via <a href="https://twitter.com/equinusocio/status/1230774576453341187">{% twitterImageAvatar "equinusocio" %}Mattia Astorino</a></em></li>
		</ul>
	</dd>
	<dt>2013 April 1</dt>
	<dd>
		<a href="https://ianstormtaylor.com/media-queries-are-a-hack/">{% twitterImageAvatar "ianstormtaylor" %}Ian Storm Taylor’s <em>Media Queries are a Hack</em> blog post</a>
		<ul class="via">
			<li><em>via <a href="https://twitter.com/patrickfulton/status/1204490285536952321">Patrick Fulton</a></em></li>
		</ul>
	</dd>
	<dt>2013 March 17</dt>
	<dd>
		<a href="https://github.com/joecritch/container-queries">{% twitterImageAvatar "joecritch" %}Joe Critch’s <code>container-queries</code></a>
		<ul class="via">
			<li><em>via <a href="https://twitter.com/innovati/status/1204484977938726912">{% twitterImageAvatar "innovati" %}Tommy Hodgins</a></em></li>
		</ul>
	</dd>
	<dt>2013 March 8</dt>
	<dd>
		<a href="https://github.com/mlrawlings/containerqueries">{% twitterImageAvatar "mlrawlings" %}Michael Rawlings’ <code>containerqueries</code></a>
	</dd>
	<dt>2013 February 7</dt>
	<dd>
		<a href="http://web.archive.org/web/20130212075053/http://www.jonathantneal.com/blog/thoughts-on-media-queries-for-elements/">{% twitterImageAvatar "jon_neal" %}Jon Neal’s (now ⛔️ deleted) <em>Thoughts on Media Queries for Elements</em></a>
		<ul class="via">
			<li><em>via <a href="https://twitter.com/jay_hoffmann/status/1204508530025349121">{% twitterImageAvatar "jay_hoffman" %}Jay Hoffman</a></em></li>
		</ul>
	</dd>
	<dt>2013 February 7</dt>
	<dd>
		<a href="http://web.archive.org/web/20140415001721/https://twitter.com/necolas/status/299573744307941376">{% twitterImageAvatar "necolas" %}Nicolas Gallagher’s (now ⛔️ deleted) tweet</a>
		<ul class="via">
			<li><em>via <a href="https://twitter.com/etportis/status/1204492164836675584">{% twitterImageAvatar "etportis" %}Eric Portis</a> and <a href="https://twitter.com/jay_hoffmann/status/1204508530025349121">{% twitterImageAvatar "jayhoffman" %}Jay Hoffman</a></em></li>
		</ul>
	</dd>
	<dt>2012 April 21</dt>
	<dd>
		<a href="https://github.com/jonathantneal/MediaClass">{% twitterImageAvatar "jon_neal" %}Jon Neal’s <code>MediaClass</code></a>
	</dd>
	<dt>2012 January 23</dt>
	<dd>
		<a href="https://twitter.com/paul_irish/status/161664213054533633">{% twitterImageAvatar "paul_irish" %}Paul Irish’s tweet reply to a (now ⛔️ deleted) {% twitterImageAvatar "ianstormtaylor" %}Ian Storm Taylor tweet (date unknown)</a>
	</dd>
	<dt>2011 September 1</dt>
	<dd>
		<a href="https://stackoverflow.com/questions/7271818/media-query-like-behaviour-on-width-of-a-specific-div">A question posted by user <code>Damon</code> on Stack Overflow</a>
		<ul class="via">
			<li><em>via <a href="https://twitter.com/jay_hoffmann/status/1204508888730603526">{% twitterImageAvatar "jayhoffman" %}Jay Hoffman</a></em></li>
		</ul>
	</dd>
	<dt>2011 July 15</dt>
	<dd>
		<a href="http://web.archive.org/web/20160325052109/http://blog.andyhume.net/responsive-containers/">{% twitterImageAvatar "andyhume" %}Andy Hume’s (now ⛔️ deleted) <em>Responsive Containers</em> blog post</a>
		<ul class="via">
			<li><em>via <a href="https://vimeo.com/223432117">{% twitterImageAvatar "etportis" %}Eric Portis’ Contain Your Excitement talk</a></em></li>
		</ul>
	</dd>
	<dt>2011 July 14</dt>
	<dd>
		<a href="https://github.com/ahume/selector-queries">{% twitterImageAvatar "andyhume" %}Andy Hume’s <code>selector-queries</code></a>
	</dd>
</dl>

Andy Hume’s work, thus far, seems to be the original! If you have others that pre-date 2014 (even if they aren’t before Andy’s), please [reply to this tweet](https://twitter.com/zachleat/status/1204488622386417665).

<p class="livedemo livedemo-sm top" data-demo-label="Get out your wallet">Look at all this link rot! We’re so lucky that many of these entries were preserved by The Wayback Machine. You too can <a href="https://archive.org/donate/">donate to the Internet Archive</a> to support their obviously valuable mission.</p>

<h1><span class="text-highlight" style="background-color: #333; color: #fff">The Container Queries idea was planted {{ "14 Jul 2011 11:40:00 CDT" | timePosted }} ago</span></h1>

For comparison, Ethan Marcotte’s original A List Apart article on Responsive Web Design was published {{ "25 May 2010 00:00:00 GMT" | timePosted }} ago on May 25, 2010.

The first large-scale [Responsive Web Design project at the Boston Globe](https://www.filamentgroup.com/lab/introducing-the-new-responsive-designed-bostonglobecom.html) was launched _after container queries were planted_ {{ "9 Sep 2011 00:00:00 GMT" | timePosted }} ago on September 9, 2011. The Boston Globe launch further planted the seeds for [responsive image approaches](https://alistapart.com/article/responsive-images/) that would result in web browser implementations of both `<img srcset>` and `<picture>` just three years later in 2014.

In conclusion, 🤷‍♂️.
