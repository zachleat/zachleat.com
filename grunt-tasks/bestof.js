module.exports = function(grunt) {
	const fs = require("fs");
	const cheerio = require("cheerio");
	const matter = require("gray-matter");
	const _uniq = require('lodash/uniq');
	const _remove = require('lodash/remove');
	const bestof = grunt.file.readJSON("_cache/zachleat-bestof.json").rows;
	const debug = require("debug")("bestof");

	"use strict";
	grunt.registerTask("bestof", function() {
		var pageviews = {};

		bestof.forEach(function(entry) {
			var path = entry[0];
			console.log( path );
			if (path.indexOf("?") > -1) {
				path = path.substr(0, entry[0].indexOf("?"));
			}
			var slug = path.match(/^\/web\/(?:\d{4}\/\d{2}\/\d{2}\/)?([A-Za-z0-9-\/]+)/);
			if (slug && slug.length > 1) {
				var newslug = slug[1] + (slug[1].substr(-1) !== "/" ? "/" : "");
				var filename = "_site/web/" + newslug + "index.html";

				if (fs.existsSync(filename)) {
					if (!pageviews[newslug]) {
						console.log("New analytics post entry found:", newslug, entry[1]);

						var postTemplate = cheerio.load(fs.readFileSync(filename, "utf8"));
						var postPath = postTemplate("meta[property='eleventy:path']").attr("content");
						console.log( "post path", postPath, filename );
						if( postPath.indexOf( "./" ) === 0 ) {
							postPath = postPath.substr(2);
						}

						pageviews[newslug] = {
							slug: newslug,
							path: postPath,
							views: 0,
							title: postTemplate("title").html().replace(/&#x2014;zachleat.com/, ""),
							postedDate: Date.parse(postTemplate(".sub .date").html())
						};
					} else {
						// console.log("Adding to already existing analytics post entry:", newslug, entry[1]);
					}

					pageviews[newslug].views += parseInt(entry[1], 10);

					if (pageviews[newslug].postedDate) {
						var numDays = ((Date.now() - pageviews[newslug].postedDate) / (1000 * 60 * 60 * 24));
						pageviews[newslug].postedYear =
							"(" + new Date(pageviews[newslug].postedDate).getFullYear() + ")";
						pageviews[newslug].averageViews = (pageviews[newslug].views / numDays).toFixed(1);
					} else {
						pageviews[newslug].postedYear = "";
						pageviews[newslug].averageViews = "";
					}
				} else {
					console.warn( ">>> WARNING POST NOT FOUND!", filename );
				}
			} else {
				// console.warn( ">>> WARNING bad match:", entry[ 0 ], " to ", path );
			}
		});

		var pageviewsArr = [];
		for (var j in pageviews) {
			pageviewsArr.push(pageviews[j]);
		}
		pageviewsArr = pageviewsArr.sort(function(a, b) {
			return b.averageViews - a.averageViews;
		});

		var totalviewsArr = [];
		for (var j in pageviews) {
			totalviewsArr.push(pageviews[j]);
		}
		totalviewsArr = totalviewsArr.sort(function(a, b) {
			return b.views - a.views;
		});

		console.log( "> Deleting previous post ranks, tags from front matters." );
		pageviewsArr.forEach(function(entry, j) {
			if (fs.existsSync(entry.path)) {
				let content = fs.readFileSync(entry.path, 'utf8');
				var frontmatter = matter( content );
				var data = frontmatter.data;
				delete data.postRank;
				delete data.daysPosted;
				delete data.yearsPosted;
				if( data.tags ) {
					_remove( data.tags, function( tag ) {
						return tag === "popular-posts";
					});
				}

				debug("Remove existing ranked posts by per-day views for %o", entry.path);
				debug("frontmatter.content: %O", frontmatter.content);
				debug("frontmatter data: %O", data);
				fs.writeFileSync( entry.path, matter.stringify(frontmatter.content, data, {lineWidth: 9999}));
				console.log( "Finished writing", entry.path );
			} else {
				console.log( ">>> WARNING output file found but input file not found", entry.path );
			}
		});

		totalviewsArr.forEach(function(entry, j) {
			var frontmatter = matter( fs.readFileSync(entry.path, 'utf8') );
			var data = frontmatter.data;
			delete data.postRankTotalViews;
			delete data.daysPosted;
			delete data.yearsPosted;
			if( data.tags ) {
				_remove( data.tags, function( tag ) {
					return tag === "popular-posts-total";
				});
			}
			debug("Remove existing ranked posts by total views for %o", entry.path);
			debug("frontmatter.content: %O", frontmatter.content);
			debug("frontmatter data: %O", data);
			fs.writeFileSync( entry.path, matter.stringify(frontmatter.content, data, {lineWidth: 9999}));
			console.log( "Finished writing", entry.path );
		});
		console.log( "> Deleting complete." );

		console.log( "> Editing post front matter with post ranks (avg per day)." );
		pageviewsArr.slice(0, 20).forEach(function(entry, j) {
			// TODO convert this to use jekyll datafiles instead? http://jekyllrb.com/docs/datafiles/
			var frontmatter = matter( fs.readFileSync(entry.path, 'utf8') );
			var data = frontmatter.data;
			data.postRank = ( j + 1 );
			if( !data.tags ) {
				data.tags = [];
			} else if( typeof data.tags === "string" ) {
				data.tags = [ data.tags ];
			}
			data.tags.push( 'popular-posts' );
			data.tags = _uniq( data.tags );

			console.log( "Writing", entry.path );
			debug("Add existing ranked posts by per-day views for %o", entry.path);
			debug("frontmatter.content: %O", frontmatter.content);
			debug("frontmatter data: %O", data);
			fs.writeFileSync( entry.path, matter.stringify(frontmatter.content, data, {lineWidth: 9999}));
			console.log( "Finished writing", entry.path );
		});

		console.log( "> Editing post front matter with post ranks (total)." );
		totalviewsArr.slice(0, 20).forEach(function(entry, j) {
			// TODO convert this to use jekyll datafiles instead? http://jekyllrb.com/docs/datafiles/
			var frontmatter = matter( fs.readFileSync(entry.path, 'utf8') );
			var data = frontmatter.data;
			data.postRankTotalViews = ( j + 1 );
			if( !data.tags ) {
				data.tags = [];
			}
			data.tags.push( 'popular-posts-total' );
			data.tags = _uniq( data.tags );
			console.log( "Writing", entry.path );
			fs.writeFileSync( entry.path, matter.stringify(frontmatter.content, data, {lineWidth: 9999}));
			console.log( "Finished writing", entry.path );
		});

		console.log( "> Writing best-of jekyll template file." );
		

		function updateUpdatedDate( bestOfTemplatePath, updatedDate ) {
			var bestofFrontMatter = matter( fs.readFileSync( bestOfTemplatePath, 'utf8') );
			var data = bestofFrontMatter.data;
			data.dataUpdatedDate = updatedDate;
			console.log( "Writing", bestOfTemplatePath );
			fs.writeFileSync( bestOfTemplatePath, matter.stringify(bestofFrontMatter.content, data, {lineWidth: 9999}));
		}

		/* Warning this date won’t match the analytics data fetch date. */
		/* TODO: use the file modified date on the _cache/zachleat-bestof.json include above. */
		var updatedDate = new Date().toLocaleString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
			timeZoneName: "short"
		});

		updateUpdatedDate( "web/best-of/index.html", updatedDate );
		updateUpdatedDate( "web/best-of/best-of-total-views.html", updatedDate );
	});
};
