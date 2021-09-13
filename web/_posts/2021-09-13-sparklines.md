---
title: "Every Fire Needs a Sparkline"
tags:
  - project
  - popular-posts
postRank: 5
---
The Eleventy API ecosystem is growing. It started with [a screenshot service](/web/screenshots/). Now, we have a very simple service to generate SVG images for sparklines. This is using the [`sparkline-svg` package](https://www.npmjs.com/package/sparkline-svg) from [{% imgavatar "CharlesStover" %}CharlesStover](https://twitter.com/CharlesStover).

<div class="primarylink"><a href="https://github.com/11ty/api-sparkline">https://github.com/11ty/api-sparkline</a></div>

My version is running on `https://v1.sparkline.11ty.dev/` using the same versioning via [Netlify Branch Subdomains](https://docs.netlify.com/domains-https/custom-domains/multiple-domains/#branch-subdomains) strategy as the screenshot service.

URLs support the following formats:

```
/[height]x[width]/[values]/
/[height]x[width]/[values]/[color]/
```

## Deploy your own

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/11ty/api-sparkline
"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## Demos

<img src="https://v1.sparkline.11ty.dev/120x30/41,25,9,12,10,6,12,14,19,17,23,30,36,21,25/%2394b388/" width="120" height="30" alt="Sparkline representing frequency of posts on zachleat.com written from 2007 to 2021" loading="lazy" decoding="async">

<img src="https://v1.sparkline.11ty.dev/120x30/41,25,9,12,10,6,12,14,19,17,23,30,36,21,25/%23ff0000/" width="120" height="30" alt="Sparkline representing frequency of posts on zachleat.com written from 2007 to 2021" loading="lazy" decoding="async">

<img src="https://v1.sparkline.11ty.dev/120x30/41,25,9,12,10,6,12,14,19,17,23,30,36,21,25/%2300ff00/" width="120" height="30" alt="Sparkline representing frequency of posts on zachleat.com written from 2007 to 2021" loading="lazy" decoding="async">

<img src="https://v1.sparkline.11ty.dev/120x30/41,25,9,12,10,6,12,14,19,17,23,30,36,21,25/%230000ff/" width="120" height="30" alt="Sparkline representing frequency of posts on zachleat.com written from 2007 to 2021" loading="lazy" decoding="async">

You can also view this on the sidebar of this very website (at larger viewport sizes).

## Generating the values from an Eleventy collection

```js
eleventyConfig.addLiquidFilter("getYearlyPostCountList", (posts, startYear = 2007) => {
  let years = [];
  for(let year = startYear; year <= (new Date).getFullYear(); year++) {
    let count = posts.filter(function(post) {
      return post.data.page.date.getFullYear() === parseInt(year, 10);
    }).length;

    years.push(count);
  }
  return years.join(",");
});
```

[via source code on zachleat.com](https://github.com/zachleat/zachleat.com/blob/2e57d996f77e8516cca9a9328b2cb8c881c1a0a5/.eleventy.js#L206)

### Usage:

{% raw %}
```html
<img src="https://v1.sparkline.11ty.dev/120x30/{{ collections.posts | getYearlyPostCountList }}/" width="120" height="30" alt="Frequency of posts written every year on zachleat.com">
```
{% endraw %}
