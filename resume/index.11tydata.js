const fetch = require("node-fetch");
const chalk = require("chalk");

module.exports = async function() {
	console.log( "Fetching new resume counts…" );

	if(!process.env.ELEVENTY_FEATURES || process.env.ELEVENTY_FEATURES.split(",").indexOf("counts") === -1) {
		console.log( chalk.yellow("WARNING: Using terrible data for resume counts because you need to implement Eleventy caching at the data layer.") );
		return {
			stargazers: {
				eleventy: 9999,
				tablesaw: 9999,
				glyphhanger: 9999,
				bigtext: 9999,
				webfontrecipes: 9999
			},
			meetup: {
				nebraskajs: 9999
			},
			twitter: {
				eleven_ty: 9999,
				zachleat: 9999,
				nebraskajs: 9999,
				nejsconf: 9999,
				fontspeed: 9999
			}
		};
	}

	// https://developer.github.com/v3/repos/#get
	try {
		let initialData = {
			now: new Date(),
			stargazers: {},
			twitter: {},
			meetup: {}
		};
		let data = Object.assign({}, initialData);
		let promises = [];

		promises.push(fetch("https://api.github.com/repos/11ty/eleventy")
			.then(res => res.json())
			.then(json => {
				if(json.message) {
					console.log( json.message );
				}
				console.log( `eleventy star count: ${json.stargazers_count}.` );
				data.stargazers.eleventy = json.stargazers_count;
			}));

		promises.push(fetch("https://api.github.com/repos/filamentgroup/tablesaw")
			.then(res => res.json())
			.then(json => {
				if(json.message) {
					console.log( json.message );
				}
				console.log( `tablesaw star count: ${json.stargazers_count}.` );
				data.stargazers.tablesaw = json.stargazers_count;
			}));

		promises.push(fetch("https://api.github.com/repos/filamentgroup/glyphhanger")
			.then(res => res.json())
			.then(json => {
				if(json.message) {
					console.log( json.message );
				}
				console.log( `glyphhanger star count: ${json.stargazers_count}.` );
				data.stargazers.glyphhanger = json.stargazers_count;
			}));

		promises.push(fetch("https://api.github.com/repos/zachleat/bigtext")
			.then(res => res.json())
			.then(json => {
				if(json.message) {
					console.log( json.message );
				}
				console.log( `bigtext star count: ${json.stargazers_count}.` );
				data.stargazers.bigtext = json.stargazers_count;
			}));

		promises.push(fetch("https://api.github.com/repos/zachleat/web-font-loading-recipes")
			.then(res => res.json())
			.then(json => {
				if(json.message) {
					console.log( json.message );
				}
				console.log( `web-font-loading-recipes star count: ${json.stargazers_count}.` );
				data.stargazers.webfontrecipes = json.stargazers_count;
			}));

		promises.push(fetch("https://api.meetup.com/nebraskajs?&sign=true&photo-host=public")
			.then(res => res.json())
			.then(json => {
				console.log( `NebraskaJS member count: ${json.members}.` );
				data.meetup.nebraskajs = json.members;
			}));

		promises.push(fetch("https://twitter.com/zachleat/")
			.then(res => res.text())
			.then(text => {
				let match = text.match(/followers_count\&quot\;\:(\d+)/i);
				data.twitter.zachleat = match && match.length > 1 ? parseInt(match[1], 10) : undefined;
				console.log( `zachleat follower count: ${data.twitter.zachleat}.` );
			}));

		promises.push(fetch("https://twitter.com/eleven_ty/")
			.then(res => res.text())
			.then(text => {
				let match = text.match(/followers_count\&quot\;\:(\d+)/i);
				data.twitter.eleven_ty = match && match.length > 1 ? parseInt(match[1], 10) : undefined;
				console.log( `eleven_ty follower count: ${data.twitter.eleven_ty}.` );
			}));

		promises.push(fetch("https://twitter.com/nebraskajs/")
			.then(res => res.text())
			.then(text => {
				let match = text.match(/followers_count\&quot\;\:(\d+)/i);
				data.twitter.nebraskajs = match && match.length > 1 ? parseInt(match[1], 10) : undefined;
				console.log( `nebraskajs follower count: ${data.twitter.nebraskajs}.` );
			}));

		promises.push(fetch("https://twitter.com/nejsconf/")
			.then(res => res.text())
			.then(text => {
				let match = text.match(/followers_count\&quot\;\:(\d+)/i);
				data.twitter.nejsconf = match && match.length > 1 ? parseInt(match[1], 10) : undefined;
				console.log( `nejsconf follower count: ${data.twitter.nejsconf}.` );
			}));

		promises.push(fetch("https://twitter.com/fontspeed/")
			.then(res => res.text())
			.then(text => {
				let match = text.match(/followers_count\&quot\;\:(\d+)/i);
				data.twitter.fontspeed = match && match.length > 1 ? parseInt(match[1], 10) : undefined;
				console.log( `fontspeed follower count: ${data.twitter.fontspeed}.` );
			}));

		await Promise.all(promises);

		return data;
	} catch(e) {
		throw new Error( "Failed fetching resume counts: " + e.message );
	}
};