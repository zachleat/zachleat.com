const getTwitterAvatarUrl = require("twitter-avatar-url");
const eleventyImage = require("@11ty/eleventy-img");

function getImageOptions(username) {
	return {
		widths: [72],
		urlPath: "/img/avatars/",
		outputDir: "./_site/img/avatars/",
		formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", "jpeg"] : ["webp", "jpeg"],
		cacheDuration: "4w",
		filenameFormat: function(id, src, width, format) {
			return `${username.toLowerCase()}.${format}`;
		}
	};
}

function fetchImageData(username, url) {
	if(!url) {
		throw new Error("src property required in `img` shortcode.");
	}
	
	// return nothing, even though this returns a promise
	eleventyImage(url, getImageOptions(username)).then(function() {
		
	});
}

async function imgAvatar(username, classes = "") {
	// We know where the images will be
	let fakeUrl = `https://twitter.com/${username}.jpg`;
	let imgData = eleventyImage.statsByDimensionsSync(fakeUrl, 400, 400, getImageOptions(username));
	let markup = eleventyImage.generateHTML(imgData, {
		alt: `${username}’s Avatar`,
		class: "z-avatar" + (classes ? ` ${classes}` : ""),
		loading: "lazy",
		decoding: "async",
	}, {
		whitespaceMode: "inline"
	});
	
	return markup;
}

module.exports = function(eleventyConfig) {
	let usernames;

	eleventyConfig.on("beforeBuild", () => {
		usernames = new Set();
	});
	eleventyConfig.on("afterBuild", () => {
		let arr = Array.from(usernames);
		console.log( `[zachleat.com] Generating ${arr.length} Twitter avatars.` );
		getTwitterAvatarUrl(arr).then(results => {
			for(let result of results) {
				fetchImageData(result.username, result.url.large);
			}
		});
	});


	eleventyConfig.addLiquidShortcode("imgavatar", async function(username, classes = "") {
		usernames.add(username.toLowerCase());
		return imgAvatar(username, classes);
	});

	eleventyConfig.addLiquidShortcode("imgavatarForExternalUrl", async function(url = "", classes = "") {
		let username;
		let domainToTwitterUsernameMap = {
			"filamentgroup.com": "filamentgroup",
			"netlify.com": "netlify",
			"nebraskajs.com": "nebraskajs",
			"11ty.dev": "eleven_ty",
			"11ty.io": "eleven_ty",
			"nejsconf.com": "nejsconf",
			"shoptalkshow.com": "shoptalkshow",
			"httparchive.org": "httparchive",
			"changelog.com": "changelog",
			"meetup.com": "meetup",
			"jamstackconf.com": "jamstackconf",
			"smashingconf.com": "smashingconf",
			"beyondtellerrand.com": "btconf",
			"perfnow.nl": "perfnowconf",
			"concatenate.dev": "ConcatenateConf",
			"css-minsk-js.by": "CSS_Minsk_JS",
			"css-tricks.com": "css",
		};
		for(let domain in domainToTwitterUsernameMap) {
			if(url.indexOf(domain) > -1) {
				username = domainToTwitterUsernameMap[domain];
				break;
			}
		}

		if(username) {
			usernames.add(username.toLowerCase());
			return imgAvatar(username, classes);
		}
		return "";
	});
};