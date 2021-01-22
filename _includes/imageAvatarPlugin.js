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
		console.log( `Generating ${arr.length} Twitter avatars.` );
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
		if(url.indexOf("filamentgroup.com") > -1) {
			username = "filamentgroup";
		} else if(url.indexOf("netlify.com") > -1) {
			username = "netlify";
		} else if(url.indexOf("nebraskajs.com") > -1) {
			username = "nebraskajs";
		} else if(url.indexOf("11ty.dev") > -1 || url.indexOf("11ty.io") > -1) {
			username = "eleven_ty";
		} else if(url.indexOf("nejsconf.com") > -1) {
			username = "nejsconf";
		} else if(url.indexOf("shoptalkshow.com") > -1) {
			username = "shoptalkshow";
		} else if(url.indexOf("httparchive.org") > -1) {
			username = "httparchive";
		} else if(url.indexOf("changelog.com") > -1) {
			username = "changelog";
		} else if(url.indexOf("meetup.com") > -1) {
			username = "meetup";
		} else if(url.indexOf("jamstackconf.com") > -1) {
			username = "jamstackconf";
		} else if(url.indexOf("smashingconf.com") > -1) {
			username = "smashingconf";
		} else if(url.indexOf("beyondtellerrand.com") > -1) {
			username = "btconf";
		} else if(url.indexOf("perfnow.nl") > -1) {
			username = "perfnowconf";
		} else if(url.indexOf("concatenate.dev") > -1) {
			username = "ConcatenateConf";
		} else if(url.indexOf("css-minsk-js.by") > -1) {
			username = "CSS_Minsk_JS";
		} else if(url.indexOf("css-tricks.com") > -1) {
			username = "css";
		}
		

		if(username) {
			usernames.add(username.toLowerCase());
			return imgAvatar(username, classes);
		}
		return "";
	});
};