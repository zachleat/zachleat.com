---
title: Web Fonts for President 2016
author: Zach Leatherman
layout: post
permalink: /president-web-font/
categories:
  - font-loading
tags:
  - font-loading
  - popular-posts
  - popular-posts-total
postRank: 5
daysPosted: 623
yearsPosted: 1.7
postRankTotalViews: 6
---

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">US presidential candidates ordered by best font loading strategy<br><br>yes I’m a single issue voter</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/722480571390107648">April 19, 2016</a></blockquote>

_Ha ha_. You thought I wouldn’t do it.

_Ha._

## Hillary Clinton

Before we begin, let’s just get it out of the way—yes, Hillary has her own CDN servers and self hosts her web fonts. I think we’re all sick and tired of hearing about Hillary’s damn web fonts. Well—before we move on from that, let’s also get it out of the way that [Hillary’s CDN domain name privacy provider](https://www.whoisxmlapi.com/#whoisserver/WhoisService?domainName=hrc.onl&target=raw&domainName=hrc.onl&outputFormat=xml) is based in Panama. That country sounds familiar for some vaguely topical reason. Anyway, font loading.

* **-5 points** for using stock browser behavior (not using any font loading strategy). This is very bad. On some web browsers this makes web font requests a single point of failure. Since WebKit does not have a FOIT timeout, hanging web font requests could abandon users with invisible text until they reload the entire page.
* **-1 point** for average web font weight &gt; 30KB. (95.8KB total for 2 web fonts) This is likely why her site used the full Chrome FOIT timeout of 3 seconds. My web font spidey sense says there is big savings to be had here, probably by subsetting the fonts.
* **+1 point** for using three or less web fonts (2 total).
* **+2 points** for [commissioning your own typeface variant](https://medium.com/@pinwale/more-on-hillary-clinton-s-custom-typeface-called-unity-7e601dc050f8).
* A small bug: the same font file is listed for both the WOFF2 and WOFF formats. See below:

{% highlight html %}
@font-face {
  font-family: 'SharpUnity';
  /* This should be SharpUnity-Book.woff2 */
  src: url("../fonts/SharpUnity-Book.woff") format("woff2"),
       url("../fonts/SharpUnity-Book.woff") format("woff");
}
{% endhighlight %}

#### Candidate Web Font Score: -3

## Bernie Sanders

* **+5 points** for going full FOUT. This is a better alternative to using stock browser behavior for font loading. This gives the user immediately readable text on first render and very minimal invisible text during the loading process. Bernie is using TypeKit here, which loads a [stylesheet full of Web Font Data URIs](https://www.filamentgroup.com/lab/font-loading.html).
* **+1 point** for average web font weight &lt; 30KB. (204KB total for 7 web fonts) 
* **-4 points** for using 7 web fonts total. _Insert (performance) budget joke here_. (-1 point for each web font over 3)
* **-1 point** for using a serif fallback for a sans-serif web font. Likely he’s trying to reach across the aisle and unite the two major font-family parties, but this makes for an awkward transition.

_Note the TypeKit load time here is approximate. Both WebPageTest and Chrome Canary’s Filmstrip modes failed to capture the full Bernie render filmstrip due to a premature onload event._

It should also be noted that because Bernie is using TypeKit, he gets a bunch of font loading benefits for free. And when I say free, I mean that he’s likely paying the experts at TypeKit a fee for which he receives their expertise in font loading and his site sees performance benefits from that.

#### Candidate Web Font Score: 1

## Donald Trump

* **+1 point** for attempting to use a font loading strategy by using `loadCSS` to load a stylesheet from Google Web Fonts, an approach I will now refer to as the **Donald Trump Hail Mary** strategy.
* **-5 points** for not using a real font loading strategy. Remember that loading the stylesheet asynchronously only prevents the initial CSS request from blocking. You’ll still incur default browser behavior when the fonts themselves begin loading. The mechanics of how he loads `loadCSS` using `<script async>` combined with an automatic performance optimizer called [Rocket Loader from Cloudflare](https://www.cloudflare.com/features-optimizer/) put the web font request almost at the end of his performance waterfall. This is very interesting, primarily for the fact that for most of the waterfall the fallback text is rendered. This is good (**+1 point**). However, the delayed load means that FOIT will occur long after the user has started interacting with the page. Note also that default browser behavior is still in play and web font requests will still be a single point of failure on some web browsers (WebKit, for example, with no FOIT timeout).
* **+1 point** for average web font weight &lt; 30KB. (62.3KB total for 5 web fonts)
* **-2 points** for using 5 web fonts total. (-1 point for each web font over 3)
* While he doesn’t use [blocking Data URIs](/web/web-font-data-uris/) for his web fonts, he does use them for a font icon for his video player. I won’t deduct points for this since it’s outside the scope of the study—but still a *yuge anti-pattern*.
* I will also note that Donald uses YouTube `<iframe>` embeds on his page, which also loads a Roboto web font. This would be a much better case for system fonts, but that’s a third-party/Google problem. Should a leader be responsible for his entire page, including third party content? Yes—however, it still feels harsh to deduct for this. But I will anyway (**-1 point**), since Donald is a racist, a misogynist, and a horrible human being.

#### Candidate Web Font Score: -5

## Ted Cruz

Ted Cruz’s web site is… well, it’s 17MB with 167 requests and took 36 seconds to load on throttled 3G.That says most of what needs saying.

* **-5 points** for using stock browser behavior (no font loading strategy)
* **-1 point** for average web font weight &gt; 30KB. (312.6KB total for 5 web fonts) This likely causes Chrome to hit its FOIT timeout of 3 seconds. The web fonts were larger than Hillary’s and more numerous. If you’re going to spend a lot on web fonts, at least have Bernie’s decency and give your users a web font safety net with a FOUT strategy. Even though his hero text hits the FOIT timeout and should be readable at that point, it in fact is not readable without the background image because it’s `color: #fff`.
* **-2 points** for using 5 web fonts total. (-1 point for each web font over 3) 5 different weights of Museo Sans, which according to the licensing means he [paid for his fonts](http://www.fontspring.com/fonts/exljbris/museo-sans).
* **-1 point** for using a serif fallback for sans-serif web fonts. Again, another awkward transition.

#### Candidate Web Font Score: -9

## Results

*(Times generated using Chrome Canary’s Developer Tools Network Throttling in Regular 3G mode)*

<table id="results">
	<thead>
		<tr>
			<th>Candidate</th>
			<th>Text Readable</th>
			<th>Web Font Render</th>
			<th>FOIT</th>
			<th>Web Font Weight</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Hillary Clinton</th>
			<td>7.42s</td>
			<td><div class="better">8.09s <span aria-hidden="true">★</span><span class="a11y-only">Best</span></div></td>
			<td><em>Max</em></td>
			<td><div>95.8KB</div> (~47.9KB each)</td>
		</tr>
		<tr>
			<th>Bernie Sanders</th>
			<td><div class="better">5.69s <span aria-hidden="true">★</span><span class="a11y-only">Best</span></div></td>
			<td>~10.95s</td>
			<td><div class="better">~0s <span aria-hidden="true">★</span><span class="a11y-only">Best</span></div></td>
			<td><div>204KB</div> (~29.1KB each)</td>
		</tr>
		<tr>
			<th>Donald Trump</th>
			<td>2.44s to 13.38s</td>
			<td>14.16s-14.32s</td>
			<td>0.8s</td>
			<td><div class="better">62.3KB <span aria-hidden="true">★</span><span class="a11y-only">Best</span></div>(~12.5KB each)</td>
		</tr>
		<tr>
			<th>Ted Cruz</th>
			<td>22.26s <div><em>(Wow.)</em></div></td>
			<td>27.78s-28.27s</td>
			<td><em>Max</em></td>
			<td><div>312.6KB</div>(~62.52KB each)</td>
		</tr>
	</tbody>
</table>

## Conclusion

Bernie Sanders was the one candidate that had a font loading strategy (using TypeKit). Donald Trump was the one candidate that tried to have a font loading strategy but it ended up being more bravado than actual results. The other two candidates had no font loading strategy.

Donald Trump was also the only candidate that did not pay money for his fonts in any form, using Google Web Fonts. He built a web site and Google is paying for it. At presidential website scale Bernie likely paid for TypeKit, Hillary paid for her own typeface (awesome), and Ted Cruz probably paid somewhere between $60 and $90 for variants of Museo Sans.

It’s interesting to note that the candidates that self hosted their fonts (Hillary and Cruz) had the highest individual web font file sizes. This isn’t too surprising, the tools to optimize local font files are fairly esoteric and complex. In this regard, using a font foundry may be better than self hosting despite the sacrifices in control over font loading.

What did we learn here? Web Font loading is far too complex to draw conclusions about the quality of a web site based on where you load your web fonts. Using a web font service doesn’t necessarily mean that your web site will use best practices. We must be knowledgeable about the internals of the tools we use in order to best utilize them to our advantage. At the end of the day if you don’t want to put any effort into it, it’s safer to use TypeKit.

<div class="retweettoshare">
	<h3 class="retweettoshare_title">Retweet to share this post</h3>
	<div class="retweettoshare_widget">
		<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">★Web Fonts for President 2016 <a href="https://t.co/wOLHuZH5CY">https://t.co/wOLHuZH5CY</a> A look at the font loading strategies of websites for US presidential candidates.</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/722860263750258688">April 20, 2016</a></blockquote>
	</div>
</div>
