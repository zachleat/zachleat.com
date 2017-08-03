module.exports = function( grunt ) {
	"use strict";

	grunt.registerTask('bestof', function() {

		var fs = require("fs");
		var cheerio = require("cheerio");
		var bestof = grunt.file.readJSON("zachleat-bestof.json").rows;
		var pageviews = {};

		bestof.forEach(function(entry) {
			var path = entry[0];
			if (path.indexOf("?") > -1) {
				path = path.substr(0, entry[0].indexOf("?"));
			}
			var slug = path.match(/^\/web\/(?:\d{4}\/\d{2}\/\d{2}\/)?([A-Za-z0-9-\/]+)/);
			if (slug && slug.length > 1) {
				var newslug = slug[1] + (slug[1].substr(-1) !== "/" ? "/" : "");
				var filename = "web/_site/" + newslug + "index.html";
				if (fs.existsSync(filename)) {
					console.log("Analytics post entry found:", newslug, entry[1]);
					if (!pageviews[newslug]) {
						var postTemplate = cheerio.load(fs.readFileSync(filename, "utf8"));
						pageviews[newslug] = {
							slug: newslug,
							views: 0,
							title: postTemplate("title").html().replace(/&#x2014;zachleat.com/, ""),
							postedDate: Date.parse(postTemplate(".sub .date").html())
						};
					}
					pageviews[newslug].views += parseInt(entry[1], 10);

					if (pageviews[newslug].postedDate) {
						pageviews[newslug].postedYear =
							"(" + new Date(pageviews[newslug].postedDate).getFullYear() + ")";
						pageviews[newslug].averageViews = (pageviews[newslug].views /
							((Date.now() - pageviews[newslug].postedDate) / (1000 * 60 * 60 * 24))).toFixed(1);
					} else {
						pageviews[newslug].postedYear = "";
						pageviews[newslug].averageViews = "";
					}
				} /* else {
						console.log( "POST NOT FOUND!", slug[1] );
					}*/
			} else {
				// console.log( "bad match:", entry[ 0 ], " to ", path );
			}
		});

		var pageviewsArr = [];
		for (var j in pageviews) {
			pageviewsArr.push(pageviews[j]);
		}
		pageviewsArr = pageviewsArr.sort(function(a, b) {
			return b.averageViews - a.averageViews;
		});

		var updatedDate = new Date().toLocaleString("en-US", {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			timeZoneName: 'short'
		});

		var html = `---
title: Most Popular
layout: page
permalink: best-of/
---

<p><em>Last updated ${updatedDate}</em></p>

<table>
	<thead>
		<tr>
			<th>#</th>
			<th>Title</th>
			<th class="numeric nowrap">Units Per Day</th>
		</tr>
	</thead>
	<tbody>
`;

		var unitNormalizer = pageviewsArr[0].averageViews;
		pageviewsArr.slice(0, 20).forEach(function(entry, j) {
			html += `
		<tr>
			<td>${j + 1}</td>
			<td><a href="/web/${entry.slug}">${entry.title}</a> ${entry.postedYear}</td>
			<td class="numeric">${(entry.averageViews * 100 / unitNormalizer).toFixed(1)}</td>
		</tr>`;
		});

		html += `
	</tbody>
</table>

<h2>How does it work?</h2>
<p>Top twenty blog posts on <code>/web/</code> ordered by Average Generic Units Per Day, a metric that normalizes pageviews on a 0–100 scale. Units per day are calculated from the day the post was published. I used generic units instead of raw Pageviews to avoid feeling like I was either bragging about or disappointed in any of my posts. Data <a href="http://2ality.com/2015/10/google-analytics-api.html">generated automatically from the Google Analytics API</a>.</p>

<h2>Tweets</h2>
<p>I also keep a <a href="https://twitter.com/i/moments/816767407326949377">highlight reel of my best tweets</a> too.</p>
`;

		fs.writeFileSync("web/best-of/index.html", html);
	});
};