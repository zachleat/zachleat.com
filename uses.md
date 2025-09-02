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

<dl class="flex">
	<div>
		<dt>{% icon "fa:skull-crossbones" %}</dt>
		<dd>Died</dd>
	</div>
	<div>
		<dt>{% icon "fa:circle-up" %}</dt>
		<dd>Upgraded (not from necessity)</dd>
	</div>
	<div class="hide-sm">
		<dt>{% icon "fa:briefcase" %}</dt>
		<dd>Employer-provided</dd>
	</div>
	<div class="hide-sm">
		<dt>{% icon "fa:money-bill-1" %}</dt>
		<dd>Paid subscription</dd>
	</div>
	<div>
		<dt>{% icon "fa:heart" %}</dt>
		<dd>Favorite</dd>
	</div>
</dl>

<filter-container oninit filter-mode="all">
<style>
td code {
	white-space: nowrap;
}
tr:has(del) {
	background-color: rgba(255, 228, 228, 1);
	opacity: .85;
}
tr:has(del) .z-icon {
	opacity: .6;
}
tr:has(del) .z-avatar {
	opacity: .85;
}
</style>
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
	&#160;
	<label>
		<span class="sr-only">Filter</span>
		<select data-filter-key="active">
			<option value="">Active and Inactive</option>
			<option value="yes">Active only</option>
			<option value="no">Inactive only</option>
		</select>
	</label>
</form>
<table>
	<thead>
		<tr>
			<th class="hide-sm">Category</th>
			<th>Subcategory</th>
			<th>Active</th>
			<th>Device Name</th>
			<th class="hide-sm">{% icon "fa:briefcase" %}</th>
			<th class="hide-sm">{% icon "fa:money-bill-1" %}</th>
			<td>{% icon "fa:heart" %}</td>
		</tr>
	</thead>
	<tbody>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:building" %} Desk</td>
			<td><code>2025–</code></td>
			<td>{% indieAvatar "https://www.flexispot.com/" %}Flexispot E7 Plus Adjustable Height Desk</td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:hand-holding-dollar" %} Donation</td>
			<td><code>2025–</code></td>
			<td><a href="https://www.wikimedia.org/">{% indieAvatar "https://www.wikimedia.org/" %}Wikimedia</a></td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:power-off" %} Power</td>
			<td><code>2025–</code></td>
			<td>{% indieAvatar "https://anker.com/" %}Anker Charging Station 140W (A9128){% comment %} 2×USB-C 2×USB-A 2×Power{% endcomment %}</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:gamepad" %} Gaming</td>
			<td><code>2025–</code></td>
			<td>{% indieAvatar "https://nintendo.com/" %}Nintendo Switch 2</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:battery-half" %} Battery</td>
			<td><code>2025–</code></td>
			<td>{% indieAvatar "https://anker.com/" %}Anker 20000mAh 87W (A1383){% comment %}1×USB-C 1×USB-A, built-in USB-C cable{% endcomment %}</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Notebook</td>
			<td><code>2025–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple MacBook Pro M3 (14″ 2023)</td>
			<td class="hide-sm">{% icon "fa:briefcase" %}</td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:signature" %} Domains</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://www.squarespace.com/" %}Squarespace Domains</td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:server" %} Web Sites</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://vercel.com/" %}Vercel</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>
				{% icon "fa:server" %} Web Sites<br>
				{% icon "fa:signature" %} Domains
			</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://www.cloudflare.com/" %}Cloudflare</td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td></td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:cube" %} 3D Printer</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://bambulab.com/" %}Bambu Lab A1 with AMS lite (4-color)</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:camera-retro" %} Camera</td>
			<td><code>2024–</code></td>
			<td>{% comment %}{% indieAvatar "https://www.sony.com/" %}{% endcomment %}Sony Alpha ZV-E10</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:keyboard" %} Keyboard</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple Magic Keyboard with Touch ID</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:music" %} Music</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://music.apple.com/" %}Apple Music</td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:note-sticky" %} Notes</td>
			<td><code>2024–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple Notes</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:microphone" %} Microphone</td>
			<td><code>2023–</code></td>
			<td>Shure MV7</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:people-arrows" %} Social Network</td>
			<td><code>2023–</code></td>
			<td>{% indieAvatar "https://bsky.app/" %}Bluesky <a href="https://bsky.app/profile/zachleat.com">@zachleat.com</a></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:display" %} Display</td>
			<td><code>2023–</code></td>
			<td>{% indieAvatar "https://www.dell.com/" %}Dell 27″ S2722QC (16:9, 3840×2160)</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="no">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:music" %} Music</td>
			<td><code>2022–2024</code></td>
			<td><del>{% indieAvatar "https://www.tidal.com/" %}Tidal</del> {% icon "fa:circle-up" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:computer-mouse" %} Mouse</td>
			<td><code>2022–</code></td>
			<td>{% indieAvatar "https://logitech.com/" %}Logitech MX Master 3S</td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:server" %} Web Sites</td>
			<td><code>2022–</code></td>
			<td><a href="https://masto.host/">{% indieAvatar "https://masto.host/" %}masto.host</a> Mastodon Hosting</td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Notebook</td>
			<td><code>2021–2025</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple MacBook Air M1 (13″ 2020) {% icon "fa:circle-up" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Notebook</td>
			<td><code>2020–2021</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple MacBook Pro (16″ Intel 2019) {% icon "fa:circle-up" %}</td>
			<td class="hide-sm">{% icon "fa:briefcase" %}</td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<!-- https://www.zachleat.com/twitter/1310951307063197700/ -->
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor</td>
			<td><code>2020–</code></td>
			<td><a href="https://code.visualstudio.com/">{% indieAvatar "https://www.microsoft.com/" %}Visual Studio Code</a></td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:clock" %} Watch</td>
			<td><code>2020–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple Watch Series 6 (2020)</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:phone" %} Mobile</td>
			<td><code>2020–</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}iPhone 11 Pro (2019)</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:camera" %} Webcam</td>
			<td><code>2020–</code></td>
			<td>{% indieAvatar "https://logitech.com/" %}Logitech C920</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:building" %} Desk</td>
			<td><code>2019–2025</code></td>
			<td>Tresanti adjustable standing desk (Costco) {% icon "fa:circle-up" %}</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:computer-mouse" %} Mouse</td>
			<td><code>2019–2022</code></td>
			<td><del>{% indieAvatar "https://logitech.com/" %}Logitech G903</del> {% icon "fa:skull-crossbones" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:computer-mouse" %} Presenter Remote</td>
			<td><code>2019–2020</code></td>
			<td><del>{% indieAvatar "https://logitech.com/" %}Logitech Spotlight Presentation Remote</del> {% icon "fa:skull-crossbones" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:envelope" %} Email</td>
			<td><code>2019–</code></td>
			<td><a href="https://www.fastmail.com/">{% indieAvatar "https://www.fastmail.com/" %}Fastmail</a></td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:inbox" %} Newsletter</td>
			<td><code>2019–</code></td>
			<td><a href="https://buttondown.com/">Buttondown</a></td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:keyboard" %} Keyboard</td>
			<td><code>2018–2024</code></td>
			<td>{% indieAvatar "https://www.apple.com/" %}Apple Magic Keyboard {% icon "fa:circle-up" %}</td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:hand-holding-dollar" %} Donation</td>
			<td><code>2018–</code></td>
			<td><a href="https://archive.org/">{% indieAvatar "https://archive.org/" %}Internet Archive</a></td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="software" data-filter-active="no">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:signature" %} Domains</td>
			<td><code>2018–2024</code></td>
			<td><del>{% indieAvatar "https://www.google.com/" %}Google Domains</del> {% icon "fa:skull-crossbones" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:note-sticky" %} Notes</td>
			<td><code>2018–</code></td>
			<td>{% indieAvatar "https://www.notion.com/" %}Notion</td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:server" %} Web Sites</td>
			<td><code>2018–</code></td>
			<td><a href="https://www.netlify.com/">{% indieAvatar "https://www.netlify.com/" %}Netlify</a></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:gamepad" %} Gaming</td>
			<td><code>2018–</code></td>
			<td>{% indieAvatar "https://nintendo.com/" %}Nintendo Switch</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:newspaper" %} RSS Reader</td>
			<td><code>2018–</code></td>
			<td><a href="https://www.feedbin.com/">{% indieAvatar "https://www.feedbin.com/" %}Feedbin</a></td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td></td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="no">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:phone" %} Mobile</td>
			<td><code>2017–2020</code></td>
			<td><del>{% indieAvatar "https://www.google.com/" %}Google Pixel 2 (2017)</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Notebook</td>
			<td><code>2017–2020</code></td>
			<td><del>{% indieAvatar "https://www.apple.com/" %}Apple MacBook Pro (13″ 2017 Touchbar)</del></td>
			<td class="hide-sm">{% icon "fa:briefcase" %}</td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:battery-half" %} Battery</td>
			<td><code>2017–</code></td>
			<td>{% indieAvatar "https://anker.com/" %}Anker 20100mAh (AK-A1371012){% comment %}1×USB-C 2×USB-A{% endcomment %}</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:print" %} Printer</td>
			<td><code>2017–</code></td>
			<td>{% indieAvatar "https://www.brother-usa.com/" %}Brother HL-L2340DW Laser Printer (monochrome)</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:floppy-disk" %} Backup</td>
			<td><code>2017–</code></td>
			<td><a href="https://www.arqbackup.com/">{% indieAvatar "https://www.arqbackup.com/" %}Arq Backup</a></td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:key" %} Passwords</td>
			<td><code>2017–</code></td>
			<td>{% indieAvatar "https://www.1password.com/" %}1Password</td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="no">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:clock" %} Watch</td>
			<td></td>
			<td><del>{% indieAvatar "https://www.google.com/" %}Fitbit Alta (2016)</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:people-arrows" %} Social Network</td>
			<td><code>2016–</code></td><!-- source: https://mastodon.social/@zachleat -->
			<td>{% indieAvatar "https://mastodon.social/" %}Mastodon <a href="https://fediverse.zachleat.com/@zachleat">@zachleat@zachleat.com</a></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:microphone" %} Microphone</td>
			<td><code>2015–2023</code></td>
			<td>Blue Yeti {% icon "fa:circle-up" %}</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:display" %} Display</td>
			<td><code>2015–2023</code></td>
			<td><del>{% indieAvatar "https://www.lg.com/" %}LG 34″ 34UM95-P (21:9 Ultrawide, 3440×1440)</del> {% icon "fa:skull-crossbones" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="no">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:music" %} Music</td>
			<td><code>2015–2022</code></td>
			<td><del>{% indieAvatar "https://www.spotify.com/" %}Spotify</del> {% icon "fa:circle-up" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:chair" %} Chair</td>
			<td><code>2015–</code></td>
			<td>{% indieAvatar "https://www.hermanmiller.com/" %}Herman Miller Aeron Chair</td>
			<td class="hide-sm">{% icon "fa:briefcase" %}</td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="no">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:signature" %} Domains</td>
			<td><code>2014–2025</code></td>
			<td><del>{% indieAvatar "https://iwantmyname.com/" %}iwantmyname</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="no">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:note-sticky" %} Notes</td>
			<td><code>2014–2024</code></td>
			<td><del>{% indieAvatar "https://www.simplenote.com/" %}Simplenote</del> {% icon "fa:circle-up" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="no">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:phone" %} Mobile</td>
			<td><code>2014–2017</code></td>
			<td><del>{% indieAvatar "https://www.apple.com/" %}Apple iPhone 6 (2014)</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="yes">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:computer-mouse" %} Presenter Remote</td>
			<td><code>2014–</code></td>
			<td>{% indieAvatar "https://logitech.com/" %}Logitech Wireless Presenter R400</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Notebook</td>
			<td><code>2012–2017</code></td>
			<td><del>{% indieAvatar "https://www.apple.com/" %}Apple MacBook Pro (13″ 2012)</del></td>
			<td class="hide-sm">{% icon "fa:briefcase" %}</td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="no">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:music" %} Music</td>
			<td><code>2012–2015</code></td>
			<td><del>Rdio</del> {% icon "fa:skull-crossbones" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="software"data-filter-active="no">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor</td>
			<td><code>2011–2020</code></td>
			<td><del>{% indieAvatar "https://www.sublimetext.com/" %}Sublime Text</del> {% icon "fa:circle-up" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="no">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:phone" %} Mobile</td>
			<td><code>2011–2014</code></td>
			<td><del>{% indieAvatar "https://www.apple.com/" %}Apple iPhone 4S (2011)</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="no">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:key" %} Passwords</td>
			<td><code>2010–2017</code></td>
			<td><del>{% indieAvatar "https://www.lastpass.com/" %}LastPass</del> {% icon "fa:circle-up" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td></td>
		</tr>
		<!-- <tr data-filter-category="software">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:globe" %} Web Browser</td>
			<td><code>2009–2017</code></td>
			<td><a href="https://www.google.com/chrome/">{% indieAvatar "https://www.google.com/chrome/" %}Google Chrome</a></td>
		</tr> -->
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Notebook</td>
			<td><code>2009–2012</code></td>
			<td><del>{% indieAvatar "https://www.apple.com/" %}Apple MacBook (<a href="https://en.wikipedia.org/wiki/MacBook_(2006%E2%80%932012)">2009 Polycarbonate</a>)</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="no">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:phone" %} Mobile</td>
			<td><code>2009–2011</code></td>
			<td><del>Palm Pre (2009) with webOS</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="no">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:signature" %} Domains</td>
			<td><code>2009–2013</code></td>
			<td><del>{% indieAvatar "https://www.yahoo.com/" %}Yahoo Domains</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>
				{% icon "fa:server" %} Web Sites<br>
				{% icon "fa:signature" %} Domains
			</td>
			<td><code>2009–</code></td>
			<td><a href="https://www.nearlyfreespeech.net/">{% indieAvatar "https://www.nearlyfreespeech.net/" %}nearlyfreespeech.net</a></td>
			<td class="hide-sm"></td>
			<td class="hide-sm">{% icon "fa:money-bill-1" %}</td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:gamepad" %} Gaming</td>
			<td><code>2009–</code></td>
			<td>{% indieAvatar "https://nintendo.com/" %}Nintendo Wii</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:people-arrows" %} Social Network</td>
			<td><code>2008–2016</code><br><code>2019–</code></td>
			<td>{% indieAvatar "https://www.linkedin.com/" %}LinkedIn <a href="https://www.linkedin.com/in/zachleat/">/in/zachleat</a></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:display" %} Display</td>
			<td><code>2007–2015</code></td>
			<td>{% indieAvatar "https://www.dell.com/" %}Dell 24″ 2407WFP (16:10, 1920×1200) {% icon "fa:circle-up" %}</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="no">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:people-arrows" %} Social Network</td>
			<td><code>2006–2022</code></td>
			<td><del>Twitter</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td>{% icon "fa:heart-crack" %}</td>
		</tr>
		<tr data-filter-category="software" data-filter-active="no">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:newspaper" %} RSS Reader</td>
			<td><code>2006–2013</code></td>
			<td><del>{% indieAvatar "https://www.google.com/" %}Google Reader</del> {% icon "fa:skull-crossbones" %}</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="no">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:people-arrows" %} Social Network</td>
			<td><code>2005–2016</code></td>
			<td><del>Facebook</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Notebook</td>
			<td><code>2005–2009</code></td>
			<td><del>{% indieAvatar "https://global.fujitsu/" %}Fujitsu P5010 Lifebook (1.1GHz Windows XP)</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="yes">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:envelope" %} Email</td>
			<td><code>2004–</code></td>
			<td>{% indieAvatar "https://www.google.com/" %}Gmail</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="software" data-filter-active="no">
			<td class="hide-sm"><strong>Software</strong></td>
			<td>{% icon "fa:globe" %} Web Browser</td>
			<td><code>2003–<!--2009</code><br><code>2017–--></code></td>
			<td><a href="https://www.firefox.com/">{% indieAvatar "https://www.firefox.com/" %}Firefox</a> née Firebird née Phoenix</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:display" %} Display</td>
			<td><code>2002–2007</code></td>
			<td><del>{% indieAvatar "https://www.viewsonic.com/" %}Viewsonic P95f+ 19″ CRT (4:3, 2048×1536)</del></td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td></td>
		</tr>
		<tr data-filter-category="consumer" data-filter-active="yes">
			<td class="hide-sm"><strong>Consumer</strong></td>
			<td>{% icon "fa:gamepad" %} Gaming</td>
			<td><code>1995–</code></td>
			<td>{% indieAvatar "https://nintendo.com/" %}Super Nintendo</td>
			<td class="hide-sm"></td>
			<td class="hide-sm"></td>
			<td>{% icon "fa:heart" %}</td>
		</tr>
	</tbody>
</table>
{% comment %}
TODO:
iPad, Kindle
Roku (2010–), Apple TV (2025)
laptop/backpack/camera/sling bags
donations Wikipedia, EFF
Backup storage (Google, Amazon Drive)
{% endcomment %}

Haven’t hunted down specific dates for these yet:

<table>
	<thead>
		<tr>
			<th>Category</th>
			<th>Subcategory</th>
			<th>~ Date</th>
			<th>Name</th>
		</tr>
	</thead>
	<tbody>
		<tr data-filter-active="no">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor</td>
			<td><code>~2009</code></td>
			<td><del>Eclipse IDE</del> {% icon "fa:circle-up" %}</td>
		</tr>
		<tr data-filter-active="no">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor</td>
			<td><code>~2009</code></td>
			<td><del>Aptana Studio</del> {% icon "fa:circle-up" %}</td>
		</tr>
		<tr data-filter-active="no">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor</td>
			<td><code>~2006</code></td>
			<td><del>Notepad++</del> {% icon "fa:circle-up" %}</td>
		</tr>
		<tr data-filter-active="no">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor</td>
			<td><code>~2000</code></td>
			<td><del>Allaire Homesite</del> {% icon "fa:circle-up" %}</td>
		</tr>
		<tr data-filter-active="no">
			<td><strong>Software</strong></td>
			<td>{% icon "fa:code" %} Code Editor</td>
			<td><code>~1997</code></td>
			<td><del>{% indieAvatar "https://www.microsoft.com/" %}Notepad.exe</del> {% icon "fa:circle-up" %}</td>
		</tr>
{% comment %}
		<tr data-filter-active="no">
			<td><strong>Software</strong></td>
			<td>{% icon "fab:js" %} JavaScript</td>
			<td><code>~2006</code></td>
			<td>{% indieAvatar "https://www.yahoo.com/" %}Yahoo User Interface (YUI)</td>
		</tr>
		<tr data-filter-active="no">
			<td><strong>Software</strong></td>
			<td>{% icon "fab:js" %} JavaScript</td>
			<td><code>~2008–2015</code></td>
			<td>{% indieAvatar "https://jquery.com/" %}jQuery</td>
		</tr>
{% endcomment %}
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:computer" %} Desktop</td>
			<td><code></code></td>
			<td><del>{% indieAvatar "https://www.amd.com/" %}Custom Build (AMD 2.083GHz Windows 2000)</del></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:computer-mouse" %} Mouse</td>
			<td><code></code></td>
			<td><del>{% indieAvatar "https://logitech.com/" %}Logitech Dual Optical Mouseman</del></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:computer" %} Desktop</td>
			<td><code></code></td>
			<td><del>{% indieAvatar "https://www.amd.com/" %}Custom Build (AMD 1.1GHz)</del></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Notebook</td>
			<td><code></code></td>
			<td><del>{% indieAvatar "https://www.gatewayusa.com/" %}Gateway Solo 2550 (550MHz Windows 2000)</del></td>
		</tr>
		<tr data-filter-category="hardware" data-filter-active="no">
			<td class="hide-sm"><strong>Hardware</strong></td>
			<td>{% icon "fa:laptop" %} Notebook</td>
			<td><code></code></td>
			<td><del>{% indieAvatar "https://www.ibm.com/" %}IBM Thinkpad 9547 (166MHz Windows 95)</del></td>
		</tr>
	</tbody>
</table>
</filter-container>

