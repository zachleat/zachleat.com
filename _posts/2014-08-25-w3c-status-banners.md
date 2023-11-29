---
title: W3C Status Banners
tags:
  - project
---
<p class="sub"><em>November 29, 2023: this was updated <a href="/web/w3c-banner-web-component/">as a web component</a>.</em></p>

Browsing the World Wide Web this weekend on a fancy HDPi screen, I noticed the iconic W3C Status Banners on the [W3C specification documents were blurry images](http://www.w3.org/TR/CSS2/). In true first world problem fashion, I decided to improve them and recreate the banners using CSS.

 * [Demo](http://zachleat.github.io/w3c-banners/)
 * [Code on GitHub](https://github.com/zachleat/w3c-banners/)

<img src="/web/img/posts/w3c-banners/comparison.png" alt="A comparison of the current and newly recreated banner" style="max-height: 397px; float: left;">

For really no reason whatsoever, I’ve generated a random status banner on each visit to one of my blog posts that can be seen in the top left corner of the viewport (above a 42em width).

I’d be chuffed if the W3C actually used this code. I created a [repo for it on GitHub](https://github.com/zachleat/w3c-banners). Usage instructions and browser compatibility are included there.

## Performance

While it should be noted that switching from image content to CSS means that you’re shifting from non-blocking to blocking content, care can be taken to load the CSS in [an asynchronous fashion](https://github.com/filamentgroup/loadCSS/) to minimize the impact on initial page render.

It should be noted that after I wrote this, I discovered that all of the images were in fact also available in [SVG format](http://www.w3.org/StyleSheets/TR/).

### File Sizes

I’ve included the smallest and the largest SVG image file sizes below.

<table>
	<thead>
		<tr>
			<th>Status</th>
			<th>PNG</th>
			<th>SVG</th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<td><em>Mean (of 13 images)</em></td>
			<td><em>1.4 KB</em></td>
			<td><em>7.5 KB</em></td>
		</tr>
	</tfoot>
	<tbody>
		<tr>
			<td>W3C Note</td>
			<td>0.7 KB</td>
			<td>2.8 KB</td>
		</tr>
		<tr>
			<td colspan="3"><em>…</em></td>
		</tr>
		<tr>
			<td>W3C Proposed Edited Recommendation</td>
			<td>1.5 KB</td>
			<td>11 KB</td>
		</tr>
	</tbody>
</table>

Take note that the <strong>single CSS file size for all of the banners, currently 1.5 KB</strong> (or 506 B after minimization and gzip), <strong>is almost half the size of the smallest SVG banner image.</strong> And the CSS has better browser support than raw SVG too, including Android 2.x (which does not support SVG).

So, yeah, take that SVG. You ain’t the best at everything.

**Update**: Take note that the original idea behind this was probably born from the [iliveinomaha banner rewrite](https://github.com/zachleat/iliveinomaha-banner) first introduced by [Matt Steele in his blog post A Fresh Coat of Paint](http://www.matthew-steele.com/a-fresh-coat-of-paint/).
