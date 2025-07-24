---
title: Never write your own Date Parsing Library
tags:
  - eleventy
  - project
seo:
  openGraphBackgroundImage: /og/sources/calendar.jpg
  openGraphAlt: Dresser top with mini calendar of September and potted plant
posterImage:
  showOnPage: true
  height: 22em
  name: Blessing Ri
  source: https://unsplash.com/photos/white-braille-paper-on-brown-wooden-table-mBRtqyC_Iq0
---
_**Never** write your own date parsing library._

_**Never**._ No exceptions.

~~Never have I ever…~~

So… I’ve written my own date parsing library.

_Why?_ Our story begins seven years ago in the year 2018. I made the very sensible choice to adopt `luxon` as the Date Parsing library for Eleventy. This parsing behavior is used when Eleventy finds a String for the [`date` value in the Data Cascade](https://www.11ty.dev/docs/dates/) (though YAML front matter will bypass this behavior when encountering a YAML-compatible date).

This choice was good for Eleventy’s Node.js-only requirements at the time: accurate and not _too_ big (relatively speaking). Eleventy has [used `luxon` since `@0.2.12`](https://github.com/11ty/eleventy/commit/4272311dab203d2b217ebd4f6b597eb0e816006b) and has grown with the dependency all the way through `@3.7.1`. Now that’s what I call a high quality dependency!

As we move Eleventy to run in more JavaScript environments and runtimes (including on the client) we’ve had to take a hard look at our use of Luxon, currently [our _largest_ dependency](https://github.com/11ty/eleventy/issues/3587):

- 4.7 MB of 21.3 MB (22%) of `@11ty/eleventy` node_modules
- 229 kB of 806 kB (28%) of `@11ty/client` (*not yet released!*) bundle size (unminified)

Given that our use of Luxon is strictly limited to date parsing (not formatting or display), it would have been nice to enable tree-shaking on the Luxon library to reduce its size in the bundle (though that wouldn’t have helped the `node_modules` size, I might have settled for that trade-off). Unfortunately, [Luxon does not yet support tree-shaking](https://github.com/moment/luxon/issues/854) so it’s an all or nothing for the bundle.

## The Search Begins

I did the next sensible thing and looked at a few alternatives:

<table>
	<thead>
		<tr>
			<th>Package</th>
			<th>Type</th>
			<th>Disk Size</th>
			<th><a href="https://bundlephobia.com/">Bundle Size</a></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code><a href="https://www.npmjs.com/package/luxon">luxon</a>@3.7.1</code></td>
			<td>Dual</td>
			<td><code>4.59 MB</code> {% icon "fas:triangle-exclamation" %}</td>
			<td><code>81.6 kB</code> (min)</td>
		</tr>
		<tr>
			<td><code><a href="https://www.npmjs.com/package/moment">moment</a>@2.30.1</code></td>
			<td>CJS</td>
			<td><code>4.35 MB</code> {% icon "fas:triangle-exclamation" %}</td>
			<td><code>294.9 kB</code> (min)</td>
		</tr>
		<tr>
			<td><code><a href="https://www.npmjs.com/package/dayjs">dayjs</a>@1.11.13</code></td>
			<td>CJS</td>
			<td><code>670 kB</code></td>
			<td><code>6.9 kB</code> (min)</td>
		</tr>
		<tr>
			<td><code><a href="https://www.npmjs.com/package/date-fns">date-fns</a>@4.1.0</code></td>
			<td>Dual</td>
			<td><code>22.6 MB</code> {% icon "fas:triangle-exclamation" %}</td>
			<td><code>77.2 kB</code> (min)</td>
		</tr>
	</tbody>
</table>

The next in line to the throne was clearly `dayjs`, which is small on disk and in bundle size. Unfortunately I found it to be inaccurate: `dayjs` fails about 80 of the 228 tests in the test suite I’m using moving forward.

<div class="callout"><p>As an aside, this search has made me tempted to ask: do we need to keep Dual publishing packages? I prefer ESM over CJS but maybe just pick one?</p></div>

## Breaking Changes

Most date parsing woes (in my opinion) come from ambiguity: from supporting _too many_ formats or attempting maximum flexibility in parsing. And guess what: ISO 8601 is a big ’ol standard with a lot of subformats. There is a maintenance freedom and simplicity in strict parsing requirements (don’t let XHTML hear me say that).

Consider `"200"`. Is this the year 200? Is this the 200th day of the current year? Surprise, in ISO 8601 it’s neither — it’s [a decade, spanning from the year 2000 to the year 2010](https://iso8601aas.ijmacd.com/?input=200). And [`"20"`](https://iso8601aas.ijmacd.com/?input=20) is the century from the year 2000 to the year 2100.

Moving forward, we’re tightening up the default date parsing in Eleventy (this is [configurable](https://www.11ty.dev/docs/dates/#custom-date-parsing-example) — keep using Luxon if you want!).

Luckily we have a north star date format: [RFC 9557](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant#rfc_9557_format), billed as _“an extension to the ISO 8601 / RFC 3339”_ formats and already in use by the upcoming Temporal web standard APIs for date and time parsing coming to a JavaScript runtime near you.

There are a few notable differences:

<table>
	<thead>
		<tr class="nowrap">
			<th>Format</th>
			<th>ISO 8601</th>
			<th><code>Date.parse</code>*</th>
			<th><code>luxon</code></th>
			<th>RFC 9557</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="no"><code class="nowrap">YYYY</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
		</tr>
		<tr>
			<td class="no"><code class="nowrap">YYYY-MM</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DD</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td class="yes"><code class="nowrap">±YYYYYY-MM-DD</code></td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td>Optional <code>-</code> delimiters in dates</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:square-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DDTHH</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td class="yes"><code class="nowrap">YYYY-MM-DD HH</code> (space delimiter)</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %} <em>(huh)</em></td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td class="yes"><code class="nowrap">YYYY-MM-DDtHH</code> (lowercase delimiter)</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DDTHH:II</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DDTHH:II:SS</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td>Optional <code>:</code> delimiters in time</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DDTHH:II:SS.SSS</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DDTHH:II:SS,SSS</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td>Microseconds (6 digit precision)</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td>Nanoseconds (9 digit precision)</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DDTHH.H</code> Fractional hours</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DDTHH:II.I</code> Fractional minutes</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
		</tr>
		<tr>
			<td class="no"><code class="nowrap">YYYY-W01</code> ISO Week Date</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
		</tr>
		<tr>
			<td class="no"><code class="nowrap">YYYY-DDD</code> Year Day</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
		</tr>
		<tr>
			<td class="no"><code class="nowrap">HH:II</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DDTHH:II:SSZ</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DDTHH:II:SS±00</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DDTHH:II:SS±00:00</code></td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
		<tr>
			<td><code class="nowrap">YYYY-MM-DDTHH:II:SS±0000</code></td>
			<td>{% icon "fas:circle-xmark" %} <em>(huh)</em></td>
			<td>{% icon "fas:circle-xmark" %}</td>
			<td>{% icon "fas:check" %}</td>
			<td>{% icon "fas:check" %}</td>
		</tr>
	</tbody>
</table>

<dl class="flex">
	<dt>{% icon "fas:circle-xmark" %}</dt>
	<dd>Unsupported</dd>
	<dt>{% icon "fas:square-xmark" %}</dt>
	<dd>Inaccurate parsing</dd>
</dl>

<em>* Note that <code>Date.parse</code> results may be browser/runtime dependent. The results above were generated from Node.js.</em>

## A new challenger appears

It is with a little trepidation that I have shipped `@11ty/parse-date-strings`, a new RFC 9557 compatible date parsing library that Eleventy will use moving forward.

The support table of this library matches the RFC 9557 column documented above. It’s focused on _parsing only_ and our full test suite compares outputs with both the upcoming Temporal API and existing Luxon output.

While there are a few breaking changes when compared with Luxon output (noted above), this swap will ultimately prepare us for native Temporal support _without breaking changes later_!

<table>
	<thead>
		<tr>
			<th>Package</th>
			<th>Type</th>
			<th>Disk Size</th>
			<th><a href="https://bundlephobia.com/">Bundle Size</a></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code><a href="https://www.npmjs.com/package/@11ty/parse-date-strings">@11ty/parse-date-strings</a>@2.0.3</code></td>
			<td>ESM</td>
			<td><code>6.69 kB</code></td>
			<td><code>2.3 kB</code> (min)</td>
		</tr>
	</tbody>
</table>

This library saves ~230 kB in the upcoming `@11ty/client` bundle. It should also allow `@11ty/eleventy` `node_modules` install weight to drop from 21.3 MB to 16.6 MB. _(Some folks might remember when [`@11ty/eleventy@1` weighed in at 155 MB](https://github.com/11ty/eleventy/releases/tag/v2.0.0)!)_

## Late Additions

For posterity, here are a few other alternative date libraries / Temporal polyfills that I think are worth mentioning (and might help you in different ways on your own date parsing journey):

<table>
	<thead>
		<tr>
			<th>Package</th>
			<th>Type</th>
			<th>Disk Size</th>
			<th><a href="https://bundlephobia.com/">Bundle Size</a></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code><a href="https://www.npmjs.com/package/@js-temporal/polyfill">@js-temporal/polyfill</a>@0.3.0</code></td>
			<td>Dual</td>
			<td><code>2.98 MB</code></td>
			<td><code>186.5 kB</code> (min)</td>
		</tr>
		<tr>
			<td><code><a href="https://www.npmjs.com/package/temporal-polyfill">temporal-polyfill</a>@0.3.0</code></td>
			<td>Dual</td>
			<td><code>551 kB</code></td>
			<td><code>56.3 kB</code> (min)</td>
		</tr>
		<tr>
			<td><code><a href="https://www.npmjs.com/package/@formkit/tempo">@formkit/tempo</a>@0.1.2</code></td>
			<td>Dual</td>
			<td><code>501 kB</code></td>
			<td><code>17.3 kB</code> (min)</td>
		</tr>
	</tbody>
</table>
