---
title: The Origin Story of Container Queries
tags:
  - research
  - popular-posts
imgOptions:
  duration: 30d
postRank: 2
---
Container Queries are an often requested feature of the web platform. It has become almost cliché to mention it when talking about problems we’d like the web platform to solve. Container Queries would go a long way toward helping web developers do their jobs better and its omission is a huge limitation when developing component-based code for the web.

Everyone wants it, but it sure seems like no one is actively working on it. But I’m not here to soapbox about that. Here I only mean to discover the earliest mention of Container Queries (or Element Queries or any implementations of this similar idea) to learn _how long_ this feature has been requested by web developers. I’m curious: is this length of time customary for a new feature of the web platform? Or is something else going on?

Here are the earliest mentions of Container Queries that the community was able to dig up (in reverse chronological order):

<dl class="dl-inline">
    <dt>2013 April 1</dt>
    <dd>
        <a href="https://ianstormtaylor.com/media-queries-are-a-hack/">{% assign imgObj = "ianstormtaylor" | avatarObject %}{% img imgObj, imgOptions %}Ian Storm Taylor’s _Media Queries are a Hack_ blog post</a>
        <ul class="via">
            <li><em>via <a href="https://twitter.com/patrickfulton/status/1204490285536952321">{% assign imgObj = "patrickfulton" | avatarObject %}{% img imgObj, imgOptions %}Patrick Fulton</a></em></li>
        </ul>
    </dd>
    <dt>2013 March 17</dt>
    <dd>
        <a href="https://github.com/joecritch/container-queries">{% assign imgObj = "joecritch" | avatarObject %}{% img imgObj, imgOptions %}Joe Critch’s <code>container-queries</code></a>
        <ul class="via">
            <li><em>via <a href="https://twitter.com/innovati/status/1204484977938726912">{% assign imgObj = "innovati" | avatarObject %}{% img imgObj, imgOptions %}Tommy Hodgins</a></em></li>
        </ul>
    </dd>
    <dt>2013 March 8</dt>
    <dd>
        <a href="https://github.com/mlrawlings/containerqueries">{% assign imgObj = "mlrawlings" | avatarObject %}{% img imgObj, imgOptions %}Michael Rawlings’ <code>containerqueries</code></a>
    </dd>
    <dt>2013 February 7</dt>
    <dd>
        <a href="http://web.archive.org/web/20130212075053/http://www.jonathantneal.com/blog/thoughts-on-media-queries-for-elements/">{% assign imgObj = "jon_neal" | avatarObject %}{% img imgObj, imgOptions %}Jon Neal’s (now ⛔️ deleted) <em>Thoughts on Media Queries for Elements</em></a>
        <ul class="via">
            <li><em>via <a href="https://twitter.com/jay_hoffmann/status/1204508530025349121">{% assign imgObj = "jay_hoffman" | avatarObject %}{% img imgObj, imgOptions %}Jay Hoffman</a></em></li>
        </ul>
    </dd>
    <dt>2013 February 7</dt>
    <dd>
        <a href="http://web.archive.org/web/20140415001721/https://twitter.com/necolas/status/299573744307941376">{% assign imgObj = "necolas" | avatarObject %}{% img imgObj, imgOptions %}Nicolas Gallagher’s (now ⛔️ deleted) tweet</a>
        <ul class="via">
            <li><em>via <a href="https://twitter.com/etportis/status/1204492164836675584">{% assign imgObj = "etportis" | avatarObject %}{% img imgObj, imgOptions %}Eric Portis</a> and <a href="https://twitter.com/jay_hoffmann/status/1204508530025349121">{% assign imgObj = "jayhoffman" | avatarObject %}{% img imgObj, imgOptions %}Jay Hoffman</a></em></li>
        </ul>
    </dd>
    <dt>2012 April 21</dt>
    <dd>
        <a href="https://github.com/jonathantneal/MediaClass">{% assign imgObj = "jon_neal" | avatarObject %}{% img imgObj, imgOptions %}Jon Neal’s <code>MediaClass</code></a>
    </dd>
    <dt>2012 January 23</dt>
    <dd>
        <a href="https://twitter.com/paul_irish/status/161664213054533633">{% assign imgObj = "paul_irish" | avatarObject %}{% img imgObj, imgOptions %}Paul Irish’s tweet reply to a (now ⛔️ deleted) {% assign imgObj = "ianstormtaylor" | avatarObject %}{% img imgObj, imgOptions %}Ian Storm Taylor tweet (date unknown)</a>
    </dd>
    <dt>2011 September 1</dt>
    <dd>
        <a href="https://stackoverflow.com/questions/7271818/media-query-like-behaviour-on-width-of-a-specific-div">A question posted by user `Damon` on Stack Overflow</a>
        <ul class="via">
            <li><em>via <a href="https://twitter.com/jay_hoffmann/status/1204508888730603526">{% assign imgObj = "jayhoffman" | avatarObject %}{% img imgObj, imgOptions %}Jay Hoffman</a></em></li>
        </ul>
    </dd>
    <dt>2011 July 15</dt>
    <dd>
        <a href="http://web.archive.org/web/20160325052109/http://blog.andyhume.net/responsive-containers/">{% assign imgObj = "andyhume" | avatarObject %}{% img imgObj, imgOptions %}Andy Hume’s (now ⛔️ deleted) <em>Responsive Containers</em> blog post</a>
        <ul class="via">
            <li><em>via <a href="https://vimeo.com/223432117">{% assign imgObj = "etportis" | avatarObject %}{% img imgObj, imgOptions %}Eric Portis’ Contain Your Excitement talk</a></em></li>
        </ul>
    </dd>
    <dt>2011 July 14</dt>
    <dd>
        <a href="https://github.com/ahume/selector-queries">{% assign imgObj = "andyhume" | avatarObject %}{% img imgObj, imgOptions %}Andy Hume’s <code>selector-queries</code></a>
    </dd>
</dl>

Andy Hume’s work, thus far, seems to be the original! If you have others that pre-date 2014 (even if they aren’t before Andy’s), please [reply to this tweet](https://twitter.com/zachleat/status/1204488622386417665).

<p class="livedemo livedemo-sm top" data-demo-label="Get out your wallet">Look at all this link rot! We’re so lucky that many of these entries were preserved by The Wayback Machine. You too can <a href="https://archive.org/donate/">donate to the Internet Archive</a> to support their obviously valuable mission.</p>

<h1><span class="text-highlight" style="background-color: #333; color: #fff">The Container Queries idea was planted <span class="timeago" data-date="14 Jul 2011 11:40:00 CDT">{{ "14 Jul 2011 11:40:00 CDT" | timePosted }}</span> ago</span></h1>

For comparison, Ethan Marcotte’s original A List Apart article on Responsive Web Design was published <span class="timeago" data-date="25 May 2010 00:00:00 GMT">{{ "25 May 2010 00:00:00 GMT" | timePosted }}</span> ago on May 25, 2010.

The first large-scale [Responsive Web Design project at the Boston Globe](https://www.filamentgroup.com/lab/introducing-the-new-responsive-designed-bostonglobecom.html) was launched _after container queries were planted_ <span class="timeago" data-date="9 Sep 2011 00:00:00 GMT">{{ "9 Sep 2011 00:00:00 GMT" | timePosted }}</span> ago on September 9, 2011. The Boston Globe launch further planted the seeds for [responsive image approaches](https://alistapart.com/article/responsive-images/) that would result in web browser implementations of both `<img srcset>` and `<picture>` just three years later in 2014.

In conclusion, 🤷‍♂️.
