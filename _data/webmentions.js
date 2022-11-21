const fs = require('fs-extra');
const fetch = require('node-fetch');
const { DateTime } = require("luxon");
const uniqBy = require('lodash/uniqBy');
const domain = require("./site.json").domain;
const getBaseUrl = require("../_includes/getBaseUrl")
// Load .env variables with dotenv
require('dotenv').config();

// Configuration Parameters
const CACHE_DIR = '.cache';
const API_ORIGIN = 'https://webmention.io/api/mentions.jf2';
const TOKEN = process.env.WEBMENTION_IO_TOKEN;

async function fetchWebmentions(since) {
  if (!domain || domain === 'myurl.com') {
    // If we dont have a domain name, abort
    console.warn(
      'unable to fetch webmentions: no domain specified in metadata.'
    );
    return false;
  }
  if (!TOKEN) {
    // If we dont have a domain access token, abort
    console.warn(
      'unable to fetch webmentions: no access token specified in environment.'
    );
    return false;
  }

  // TODO move to use since_id instead of since date
  let url = `${API_ORIGIN}?domain=${domain}&token=${TOKEN}`;
  if (since) {
    url += `&per-page=9999&&since=${since}`;
  } else {
    url += `&per-page=9999`;
  }
  console.log( `Fetching webmentions from: ${url}` );

  const response = await fetch(url);
  if (response.ok) {
    const feed = await response.json();
    console.log(
      `${feed.children.length} webmentions fetched from ${API_ORIGIN}`
    );
    return feed;
  }

  return null;
}

// save combined webmentions in cache file
function writeToCache(data) {
  const filePath = `${CACHE_DIR}/webmentions.json`;
  const fileContent = JSON.stringify(data, null, 2);

  // create cache folder if it doesnt exist already
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
  }
  // write data to cache json file
  fs.writeFile(filePath, fileContent, err => {
    if (err) throw err;
    console.log(`webmentions cached to ${filePath}`);
  });
}

function webmentionsEnabled() {
  return process.env.ELEVENTY_FEATURES && process.env.ELEVENTY_FEATURES.split(",").indexOf("webmentions") > -1;
}

// get cache contents from json file
async function readFromCache() {
  const filePath = `${CACHE_DIR}/webmentions.json`;
  let cacheExists = await fs.exists(filePath);

  if (cacheExists) {
    const cacheFile = await fs.readFile(filePath);
    return JSON.parse(cacheFile);
  }

  return {
    lastFetched: null,
    mentions: {}
  };
}

module.exports = async function() {
  const cache = await readFromCache();
  const { lastFetched, mentions } = cache;

  if (webmentionsEnabled() || !lastFetched) {
    const feed = await fetchWebmentions(lastFetched);

    if (feed) {
      for(let webmention of feed.children) {
        let url = getBaseUrl(webmention["wm-target"]);
        if(!mentions[url]) {
          mentions[url] = [];
        }

        mentions[url].push(webmention);
      }

      let totalCount = 0;
      for(let url in mentions) {
        mentions[url] = uniqBy(mentions[url], function(entry) {
          return entry["wm-id"];
        });

        totalCount += mentions[url].length;
        mentions[url].sort((a, b) => {
          return DateTime.fromISO(b.published || b["wm-received"], { zone: "utc" }).toJSDate().getTime() - DateTime.fromISO(a.published || a["wm-received"], { zone: "utc" }).toJSDate().getTime();
        });
      }

      const webmentions = {
        lastFetched: new Date().toISOString(),
        count: totalCount,
        mentions: mentions
      };

      writeToCache(webmentions);
      console.log( `Wrote ${webmentions.count} webmentions to cache.` );
      return webmentions;
    }
  }

  // IF YOU’RE WANTING TO FILTER A HOST OUT OF BEING LISTED IN WEBMENTIONS
  // DO THIS IN .eleventy.js -> webmentionsForUrl filter

  console.log(`[zachleat.com] Loaded ${cache.count} webmentions from cache.`);
  return cache;
}
