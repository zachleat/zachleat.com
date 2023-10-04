---
title: "Semverflation: a new software metric proposal"
---
Look, y’all—it is well known that I will not shy from posting a ridiculous tweet. And just as a broken clock is right twice a day, sometimes I post a tweet that arguably deserves escalation from the ephermality of the twitterverse to the slightly more hardened blogoverse… blogverse… okay neither of those terms are good—I digress.

Chrome is [now at version 100](https://developer.chrome.com/blog/new-in-chrome-100/). React just [released version 18](https://twitter.com/zachleat/status/1508912444374228993). It has me thinking that it might be useful to have a standard metric for software that communicates how fast major versions are released.

Introducing: **Semverflation**.

How do you calculate a software package’s semverflation?

<div style="font: 1.0625em Georgia; font-style: italic; margin: 1em 0; text-align: center; display: flex; gap: 1em; align-items: center; justify-content: center;">
  <div style="display: flex; gap: .25em; flex-direction: column; justify-content: center;">
    <div style="border-bottom: 1px solid; padding-bottom: .25em;">VersionNumber(newest release)</div>
    <div>YearsBetween(newest release, first release)</div>
  </div>
  <div>× 10</div>
</div>

For simplicity, the wild west of pre-1.0 releases are counted when calculating the date of the first release.

Here’s a smattering of semverflation calculations:

<script type="module" src="/static/table-saw.js"></script>
<div><table-saw text-align>
<table>
  <thead>
    <tr>
      <th>Package</th>
      <th class="numeric" style="background-color: #f4f4f4">First – Newest Release</th>
      <th class="numeric" style="background-color: #f4f4f4">Years</th>
      <th class="numeric">Version Number</th>
      <th class="numeric">Semverflation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td class="numeric">2008/09/02 – 2022/03/29</td>
      <td class="numeric">13.57</td>
      <td class="numeric">100</td>
      <td class="numeric">73.6</td>
    </tr>
     <tr>
      <td>Safari</td>
      <td class="numeric">2003/01/07 – 2022/03/13</td>
      <td class="numeric">19.19</td>
      <td class="numeric">15.4</td>
      <td class="numeric">8.0</td>
    </tr>
     <tr>
      <td>Firefox</td>
      <td class="numeric">2002/09/23 – 2022/03/23</td>
      <td class="numeric">19.50</td>
      <td class="numeric">98</td>
      <td class="numeric">50.2</td>
    </tr>
    <tr>
      <td>React</td>
      <td class="numeric">2013/05/29 – 2022/03/29</td>
      <td class="numeric">8.83</td>
      <td class="numeric">18</td>
      <td class="numeric">20.4</td>
    </tr>
    <tr>
      <td>Eleventy</td>
      <td class="numeric">2018/01/09 – 2022/01/08</td>
      <td class="numeric">4.00</td>
      <td class="numeric">1</td>
      <td class="numeric">2.5</td>
    </tr>
  </tbody>
</table>
</table-saw></div>

## What does it mean?

Semverflation takes no position on how well maintained a software package is. A very well maintained package might deliver 100 minor versions and no new major versions (very low semverflation).

A high number is only a measure of the frequency of breaking changes (_if_ the software package adhers to semver). It does not (and can not) measure the volume of breaking changes of a specific major version release.

A low number indicates a measure of _stability_ for the package.

The other thing I like about this metric is that it doesn’t matter how much time has passed between now and the latest release. The semverflation for a retired package will not change over time, if no new releases are being delivered. The semverflation only changes when a new major version is released.

Of course, it’s a little bit wrong to use this metric on web browser releases, who rarely _break the web_ by issuing breaking changes to the platform. But useful for other software packages!