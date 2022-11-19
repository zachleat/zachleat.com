const sanitizeHTML = require("sanitize-html");
const randomCase = require('random-case');
const Natural = require('natural');

const webmentionBlockList = require("../_data/webmentionsBlockList.json");
const getBaseUrl = require("../_includes/getBaseUrl");

const analyze = new Natural.SentimentAnalyzer("English", Natural.PorterStemmer, "afinn");

module.exports = function(eleventyConfig) {

	const allowedHTML = {
		allowedTags: ['b', 'i', 'em', 'strong', 'a'],
		allowedAttributes: {
			a: ['href']
		}
	};

	eleventyConfig.addLiquidFilter('sanitizeHTML', content => {
		return content ? sanitizeHTML(content, allowedHTML) : "";
	});

	eleventyConfig.addFilter('webmentionIsType', (webmention, type) => {
		return type === webmention['wm-property'];
	});

	eleventyConfig.addFilter('webmentionsForUrl', (webmentions, url, allowedTypes) => {
		if( !allowedTypes ) {
			// all types
			allowedTypes = ['mention-of', 'in-reply-to', 'like-of', 'repost-of', 'bookmark-of'];
		} else {
			allowedTypes = allowedTypes.split(",");
		}

		if(!url || !webmentions.mentions || !webmentions.mentions[url]) {
			return [];
		}

		let knownUrls = {};
		return webmentions.mentions[url]
			.filter(entry => {
				if(!allowedTypes.includes(entry['wm-property'])) {
					return false;
				}

				if(webmentionBlockList.filter(blockedUrl => {
					return `${entry.url}`.startsWith(blockedUrl) || entry.url.indexOf(blockedUrl) > -1
				}).length > 0) {
					return false;
				}
				if(getBaseUrl(entry['wm-target']) !== url) {
					return false;
				}
				// no dupes
				if(entry.url) {
					if(knownUrls[entry.url]) {
						return false;
					}
					knownUrls[entry.url] = true;
				}
				return true;
			}).sort((a, b) => {
				// Show oldest entries first
				let adate = a.published || a['wm-received'];
				let bdate = b.published || a['wm-received'];
				if(bdate < adate) {
					return 1;
				} else if(bdate > adate) {
					return -1;
				}
				return 0;
			});
	});


	eleventyConfig.addLiquidFilter("randomCase", function(content, sentimentValue) {
		if(content && sentimentValue < -0.07 && content.length <= 5000) {
			return randomCase(content);
		}
		return content;
	});

	eleventyConfig.addLiquidFilter("getSentimentValue", function(content) {
		if( process.env.ELEVENTY_PRODUCTION && content ) {
			const tokenizer = new Natural.WordTokenizer();
			return analyze.getSentiment(tokenizer.tokenize(content));
		}

		return 0;
	});
};
