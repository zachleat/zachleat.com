const EleventyFetch = require("@11ty/eleventy-fetch");

function fetch(url) {
	return EleventyFetch(url, {
		duration: "1d",
		type: "json",
	})
}

module.exports = async function({eleventy}) {
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
			.then(json => {
				if(json.message) {
					console.log( json.message );
				}
				if(eleventy.env.runMode !== "serve") {
					console.log( `[zachleat.com] eleventy star count: ${json.stargazers_count}.` );
				}
				data.stargazers.eleventy = json.stargazers_count;
			}));

		promises.push(fetch("https://api.meetup.com/nebraskajs?&sign=true&photo-host=public")
			.then(json => {
				if(eleventy.env.runMode !== "serve") {
					console.log( `[zachleat.com] NebraskaJS member count: ${json.members}.` );
				}
				data.meetup.nebraskajs = json.members;
			}));

		await Promise.all(promises);

		return data;
	} catch(e) {
		throw new Error( "Failed fetching resume counts: " + e.message );
	}
};
