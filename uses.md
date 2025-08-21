---
title: Here are a Few of my Tools
layout: layouts/pagealign.liquid
---
## Site Colophon

- This site is built with [{% indieAvatar "https://www.11ty.dev/" %}Eleventy v{{ eleventy.version }}](https://www.11ty.dev/) using:
	- [{% indieAvatar "https://sass-lang.com/" %}Sass](https://sass-lang.com/)
	- [{% indieAvatar "https://liquidjs.com/" %}Liquid](https://liquidjs.com/)
	- [WebC](https://www.11ty.dev/docs/languages/webc/)
- Icons from [{% icon "fab:font-awesome" %}Font Awesome](https://fontawesome.com/)
- Analytics from [GoatCounter](https://www.goatcounter.com/) (for [popular posts](/web/best-of/))
- Search from [Pagefind](https://pagefind.app/) from [Liam Bigelow](https://github.com/bglw)
- [`lite-youtube-embed`](https://github.com/paulirish/lite-youtube-embed) from [Paul Irish](https://www.paulirish.com/)
- [<img src="/img/built-with-eleventy.gif" alt="Built with Eleventy, Red balloon floats away" loading="lazy" width="88" height="31" eleventy:ignore class="footer-badge mi-2">Animated 88×31 Badge](https://chrisburnell.com/note/eleventy-animated-88x31/) from Chris Burnell

### Site History

<table>
	<thead>
		<tr>
			<th>Year</th>
			<th>Type</th>
			<th>Using</th>
			<th>Learn more…</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>2022</code></td>
			<td>Host</td>
			<td>Netlify</td>
			<td><a href="/web/zachleat-on-netlify/"><em>Migrating My 16+ Year Old Web Site to Netlify in a Few Short Days</em></a></td>
		</tr>
		<tr>
			<td><code>2018</code></td>
			<td>Software</td>
			<td>Eleventy</td>
			<td><a href="https://github.com/zachleat/zachleat.com/commit/0e10b089f3d7b86b8c0c13ade03782e9908347c1"><em>GitHub commit</em></a> (too busy to blog this one, apparently!)</td>
		</tr>
		<tr>
			<td><code>2013</code></td>
			<td>Software</td>
			<td>Jekyll</td>
			<td><a href="/web/zachleat-is-dead/"><em>zachleat.com is Dead, Long Live zachleat.com</em></a></td>
		</tr>
		<tr>
			<td><code>2009</code></td>
			<td>Host</td>
			<td><a href="https://www.nearlyfreespeech.net/">nearlyfreespeech.net</a></td>
			<td></td>
		</tr>
		<tr>
			<td><code>2007</code></td>
			<td>Software</td>
			<td>WordPress</td>
			<td></td>
		</tr>
	</tbody>
</table>

## Uses Timeline

<filter-container oninit filter-mode="all">
<form class="filter-posts-form">
	<label>
		<span class="sr-only">Filter</span>
		<select data-filter-key="category">
			<option value="">All categories</option>
			<option value="hardware">Hardware only</option>
			<option value="software">Software only</option>
			<option value="consumer">Consumer only</option>
		</select>
	</label>
	&#160;
	(<span data-filter-results="entry/entries" aria-live="polite"></span>)
</form>
<table>
	<thead>
		<tr>
			<th>Category</th>
			<th>Subcategory</th>
			<th>In Use</th>
			<th>Device Name</th>
			<th>{% icon "fa:money-bill-1" %}</th>
		</tr>
	</thead>
	<tbody>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:gamepad" %} Gaming</td>
			<td><code>2025–</code></td>
			<td>{% indieAvatar "https://nintendo.com/" %}Nintendo Switch 2</td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Computer</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple MacBook Pro M3 (2023) {% icon "fa:briefcase" %}</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:cube" %} 3D Printer</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://bambulab.com/" %}Bambu Lab A1 with AMS lite (4-color)</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:camera-retro" %} Camera</td>
			<td><code>2024–</code></td>
			<td>{% comment %}{% indieAvatar "https://www.sony.com/" %}{% endcomment %}Sony Alpha ZV-E10</td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:keyboard" %} Keyboard</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple Magic Keyboard with Touch ID</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:music" %} Music</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://music.apple.com/" %}Apple Music</td>
			<td>{% icon "fa:money-bill-1" %}</td>
		</tr>
		<tr data-filter-category="software">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:note-sticky" %} Note Taking</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple Notes</td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:microphone" %} Microphone</td>
			<td><code>2023–</code></td>
			<td>Shure MV7</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:people-arrows" %} Social Network</td>
			<td><code>2023–</code></td>
			<td>{% indieAvatar "https://bsky.app/" %}Bluesky <a href="https://bsky.app/profile/zachleat.com">@zachleat.com</a></td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:desktop" %} External Monitor</td>
			<td><code>2023–</code></td>
			<td>{% indieAvatar "https://www.dell.com/" %}Dell 27″ S2722QC (16:9, 3840×2160)</td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:computer-mouse" %} Mouse</td>
			<td><code>2022–</code></td>
			<td>{% indieAvatar "https://logitech.com/" %}Logitech MX Master 3S</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:music" %} Music {% icon "fa:circle-up" %}</td>
			<td><code>2022–2024</code></td>
			<td><del>{% indieAvatar "https://www.tidal.com/" %}Tidal</del></td>
			<td><del>{% icon "fa:money-bill-1" %}</del></td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Computer {% icon "fa:circle-up" %}</td>
			<td><code>2021–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple MacBook Air M1 (13″ 2020)</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:clock" %} Watch</td>
			<td><code>2020–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple Watch Series 6 (2020)</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:phone" %} Mobile</td>
			<td><code>2020–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}iPhone 11 Pro (2019)</td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:camera" %} Webcam</td>
			<td><code>2020–</code></td>
			<td>{% indieAvatar "https://logitech.com/" %}Logitech C920</td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Computer {% icon "fa:circle-up" %}</td>
			<td><code>2020–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple MacBook Pro (16″ Intel 2019) {% icon "fa:briefcase" %}</td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td><del>{% icon "fa:computer-mouse" %}</del> <del>Mouse</del> {% icon "fa:skull-crossbones" %}</td>
			<td><code>2019–2022</code></td>
			<td><del>{% indieAvatar "https://logitech.com/" %}Logitech G903</del></td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td><del>{% icon "fa:computer-mouse" %}</del> <del>Presenter Remote</del> {% icon "fa:skull-crossbones" %}</td>
			<td><code>2019–2020</code></td>
			<td><del>{% indieAvatar "https://logitech.com/" %}Logitech Spotlight Presentation Remote</del></td>
		</tr>
		<tr data-filter-category="software">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:envelope" %} Email</td>
			<td><code>2019–</code></td>
			<td><a href="https://www.fastmail.com/">{% indieAvatar "https://www.fastmail.com/" %}Fastmail</a></td>
			<td>{% icon "fa:money-bill-1" %}</td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:keyboard" %} Keyboard {% icon "fa:circle-up" %}</td>
			<td><code>2018–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple Magic Keyboard</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:gamepad" %} Gaming</td>
			<td><code>2018–</code></td>
			<td>{% indieAvatar "https://nintendo.com/" %}Nintendo Switch</td>
		</tr>
		<tr data-filter-category="software">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:newspaper" %} RSS Reader</td>
			<td><code>2018–</code></td>
			<td><a href="https://www.feedbin.com/">{% indieAvatar "https://www.feedbin.com/" %}Feedbin</a></td>
			<td>{% icon "fa:money-bill-1" %}</td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:print" %} Printer</td>
			<td><code>2017–</code></td>
			<td>{% indieAvatar "https://www.brother-usa.com/" %}Brother HL-L2340DW Laser Printer (monochrome)</td>
		</tr>
		<tr data-filter-category="software">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:floppy-disk" %} Backup</td>
			<td><code>2017–</code></td>
			<td><a href="https://www.arqbackup.com/">{% indieAvatar "https://www.arqbackup.com/" %}Arq Backup</a></td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:phone" %} Mobile</td>
			<td><code>2017–2020</code></td>
			<td><del>{% indieAvatar "https://www.google.com/" %}Google Pixel 2 (2017)</del></td>
		</tr>
		<tr data-filter-category="software">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:key" %} Passwords</td>
			<td><code>2017–</code></td>
			<td>{% indieAvatar "https://www.1password.com/" %}1Password</td>
			<td>{% icon "fa:money-bill-1" %}</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:clock" %} Watch</td>
			<td></td>
			<td><del>Fitbit Alta (2016)</del></td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:building" %} Desk</td>
			<td></td>
			<td>Tresanti adjustable standing desk (Costco)</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:people-arrows" %} Social Network</td>
			<td><code>2016–</code></td><!-- source: https://mastodon.social/@zachleat -->
			<td>{% indieAvatar "https://mastodon.social/" %}Mastodon <a href="https://fediverse.zachleat.com/@zachleat">@zachleat@zachleat.com</a></td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td><del>{% icon "fa:desktop" %}</del> <del>External Monitor</del> {% icon "fa:skull-crossbones" %}</td>
			<td><code>2015–2023</code></td>
			<td><del>{% indieAvatar "https://www.lg.com/" %}LG 34″ 34UM95-P (21:9 Ultrawide, 3440×1440)</del></td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:music" %} Music {% icon "fa:circle-up" %}</td>
			<td><code>2015–2022</code></td>
			<td><del>{% indieAvatar "https://www.spotify.com/" %}Spotify</del></td>
			<td><del>{% icon "fa:money-bill-1" %}</del></td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:chair" %} Chair</td>
			<td><code>2015–</code></td>
			<td>{% indieAvatar "https://www.hermanmiller.com/" %}Herman Miller Aeron Chair {% icon "fa:briefcase" %}</td>
		</tr>
		<tr data-filter-category="software">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:note-sticky" %} Note Taking {% icon "fa:circle-up" %}</td>
			<td><code>2014–2024</code></td>
			<td><del>{% indieAvatar "https://www.simplenote.com/" %}Simplenote</del></td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:phone" %} Mobile</td>
			<td><code>2014–2017</code></td>
			<td><del>{% indieAvatar "https://www.apple.com/" %}Apple iPhone 6 (2014)</del></td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:computer-mouse" %} Presenter Remote</td>
			<td><code>2014–</code></td>
			<td>{% indieAvatar "https://logitech.com/" %}Logitech Wireless Presenter R400</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:clock" %} Watch {% icon "fa:circle-up" %}</td>
			<td><code>2013–</code></td>
			<td>Timex Weekender</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td><del>{% icon "fa:music" %}</del> <del>Music</del> {% icon "fa:skull-crossbones" %}</td>
			<td><code>2012–2015</code></td>
			<td><del>Rdio</del></td>
			<td><del>{% icon "fa:money-bill-1" %}</del></td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:phone" %} Mobile</td>
			<td><code>2011–2014</code></td>
			<td><del>{% indieAvatar "https://www.apple.com/" %}Apple iPhone 4S (2011)</del></td>
		</tr>
		<!-- <tr data-filter-category="software">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:globe" %} Web Browser</td>
			<td><code>2009–2017</code></td>
			<td><a href="https://www.google.com/chrome/">{% indieAvatar "https://www.google.com/chrome/" %}Google Chrome</a></td>
		</tr> -->
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:phone" %} Mobile</td>
			<td><code>2009–2011</code></td>
			<td><del>Palm Pre (2009) with webOS</del></td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:gamepad" %} Gaming</td>
			<td><code>2009–</code></td>
			<td>{% indieAvatar "https://nintendo.com/" %}Nintendo Wii</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:people-arrows" %} Social Network</td>
			<td><code>2008–2016</code><br><code>2019–</code></td>
			<td>{% indieAvatar "https://www.linkedin.com/" %}LinkedIn <a href="https://www.linkedin.com/in/zachleat/">/in/zachleat</a></td>
		</tr>
		<tr data-filter-category="hardware">
			<td><strong>Hardware</strong></td>
			<td>{% icon "fa:desktop" %} External Monitor {% icon "fa:circle-up" %}</td>
			<td><code>2007–</code></td>
			<td>{% indieAvatar "https://www.dell.com/" %}Dell 24″ 2407WFP (16:10, 1920×1200)</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:people-arrows" %} Social Network</td>
			<td><code>2006–2022</code></td>
			<td><del>Twitter</del></td>
		</tr>
		<tr data-filter-category="software">
			<td><strong>Software</strong></td>
			<td><del>{% icon "fa:newspaper" %}</del> <del>RSS Reader</del> {% icon "fa:skull-crossbones" %}</td>
			<td><code>2006–2013</code></td>
			<td><del>{% indieAvatar "https://www.google.com/" %}Google Reader</del></td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:people-arrows" %} Social Network</td>
			<td><code>2005–2016</code></td>
			<td><del>Facebook</del></td>
		</tr>
		<tr data-filter-category="software">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:globe" %} Web Browser</td>
			<td><code>2003–<!--2009</code><br><code>2017–--></code></td>
			<td><a href="https://www.firefox.com/">{% indieAvatar "https://www.firefox.com/" %}Firefox</a> née Firebird née Phoenix</td>
		</tr>
		<tr data-filter-category="consumer">
			<td><strong>Consumer</strong></td>
			<td>{% icon "fa:gamepad" %} Gaming</td>
			<td><code>1995–</code></td>
			<td>{% indieAvatar "https://nintendo.com/" %}Super Nintendo</td>
		</tr>
	</tbody>
</table>
</filter-container>

_{% icon "fa:skull-crossbones" %} Died_
_{% icon "fa:circle-up" %} Upgraded (not from necessity)_
_{% icon "fa:briefcase" %} Employer-provided_
_{% icon "fa:money-bill-1" %} Paid subscription_

{% comment %}
TODO: iPad ×2, Kindle, Roku (2010–), Apple TV (2025)
{% endcomment %}

Haven’t hunted down dates for these yet:

<table>
	<thead>
		<tr>
			<th>Category</th>
			<th>In Use</th>
			<th>Name</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor</td>
			<td><a href="https://code.visualstudio.com/">{% indieAvatar "https://www.microsoft.com/" %}Visual Studio Code</a></td>
		</tr>
		<tr>
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor {% icon "fa:circle-up" %}</td>
			<td><del>Sublime Text</del></td>
		</tr>
		<tr>
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor {% icon "fa:circle-up" %}</td>
			<td><del>Eclipse IDE</del></td>
		</tr>
		<tr>
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor {% icon "fa:circle-up" %}</td>
			<td><del>Aptana Studio</del></td>
		</tr>
		<tr>
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor {% icon "fa:circle-up" %}</td>
			<td><del>Notepad++</del></td>
		</tr>
		<tr>
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor {% icon "fa:circle-up" %}</td>
			<td><del>Allaire Homesite</del></td>
		</tr>
		<tr>
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor {% icon "fa:circle-up" %}</td>
			<td><del>{% indieAvatar "https://www.microsoft.com/" %}Notepad.exe</del></td>
		</tr>
{% comment %}
		<tr>
			<td><strong>Software</strong></td>
			<td>{% icon "fab:js" %} JavaScript</td>
			<td></td>
			<td>{% indieAvatar "https://www.yahoo.com/" %}Yahoo User Interface (YUI)</td>
		</tr>
		<tr>
			<td><strong>Software</strong></td>
			<td>{% icon "fab:js" %} JavaScript</td>
			<td></td>
			<td>{% indieAvatar "https://jquery.com/" %}jQuery</td>
		</tr>
{% endcomment %}
	</tbody>
</table>

_{% icon "fa:circle-up" %} Upgraded_
