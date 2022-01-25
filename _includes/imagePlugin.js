const Image = require("@11ty/eleventy-img");
const { createHash } = require("crypto");

function getCryptoHash(src) {
    let hash = createHash("sha1");
    hash.update(src);
    return hash.digest('hex').substring(0, 8);
}

async function imageShortcode(attrs = {}, options = {}) {
  options = Object.assign({},{
    widths: [null],
    formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", "jpeg"] : ["webp", "jpeg"],
    urlPath: "/img/built/",
    outputDir: "./_site/img/built/",
    sharpAvifOptions: {},
  }, options);

  let metadata = await Image(attrs.src || attrs.path, options);

  let imageAttributes = Object.assign({
    loading: "lazy",
    decoding: "async",
  }, attrs);

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
}

function backgroundImageFilter(src, width, options = {}) {
  let filename = `${getCryptoHash(src)}.jpeg`;

  options = Object.assign({},{
    widths: [width || "auto"],
    formats: ["jpeg"],
    urlPath: "/img/built/",
    outputDir: "./_site/img/built/",
    filenameFormat: function (id, src, width, format, options) {
      return filename;
    },
    sharpAvifOptions: {
      lossless: true,
    },
  }, options);

  if(!src.startsWith("http://") && !src.startsWith("https://")) {
    src = `.${src}`;
  }

  // async
  Image(src, options);

  return `url('/img/built/${filename}')`;
}

function pad(num) {
  return `${num}`.padStart(2, '0');
}
function getCacheBuster() {
  if(process.env.ELEVENTY_PRODUCTION) {
    let d = new Date();
    // Daily
    // return `_${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`;

    // Weekly
    return `_${d.getFullYear()}${pad(d.getMonth()+1)}_${d.getDate() % 7}`;
  }

  // return a throwaway constant cachebuster ref so that we don’t accidentally request production urls during local dev before they’re available online.
  return "_localdev";
}
function getFullUrlFromPath(path) {
  let domain = "https://www.zachleat.com";
  return domain + path;
}

function opengraphImageHtml(targetUrl) {
  let urlCacheBust = "?cb1";
  let fullUrl = `https://v1.opengraph.11ty.dev/${encodeURIComponent(targetUrl + urlCacheBust)}/`;

  let options = {
    formats: ["webp", "jpeg"], // careful, AVIF here is a little slow!
    widths: [375, 650], // 1200 is not used, max rendered size is about 450px.
    urlFormat: function({width, format}) {
      let size;
      if(width <= 400) {
        size = "small";
      } else if(width <= 700) {
        size = "medium";
      } else {
        size = "auto";
      }

      return `${fullUrl}${size}/${format}/${getCacheBuster()}/`;
    }
  };

  let stats = Image.statsByDimensionsSync(fullUrl, 1200, 630, options);
  return Image.generateHTML(stats, {
    alt: `OpenGraph image for ${targetUrl}`,
    loading: "lazy",
    decoding: "async",
    sizes: "(min-width: 64em) 50vw, 100vw",
    class: "project_img",
  });
}

function getScreenshotUrl(fullUrl) {
  let urlCacheBust = "?cb1";
  return `https://v1.screenshot.11ty.dev/${encodeURIComponent(fullUrl + urlCacheBust)}/opengraph/${getCacheBuster()}/`;
}
function getScreenshotUrlFromPath(path) {
  return getScreenshotUrl(getFullUrlFromPath(path));
}

function screenshotImageHtmlFullUrl(fullUrl) {
  let targetUrl = getScreenshotUrl(fullUrl);
  let options = {
    formats: ["jpeg"],
    widths: ["auto"],
    urlFormat: function() {
      return targetUrl;
    }
  };

  let stats = Image.statsByDimensionsSync(targetUrl, 1200, 630, options);
  return Image.generateHTML(stats, {
    alt: `Screenshot image for ${targetUrl}`,
    loading: "lazy",
    decoding: "async",
    class: "",
  });
}

module.exports = function(eleventyConfig) {
  // eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addLiquidFilter("backgroundimage", backgroundImageFilter);
  // eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addLiquidShortcode("opengraphImageHtmlFullUrl", opengraphImageHtml);

  eleventyConfig.addLiquidShortcode("opengraphImageHtml", function({url}) {
    return opengraphImageHtml(getFullUrlFromPath(url));
  });

  eleventyConfig.addLiquidShortcode("screenshotImageHtmlFullUrl", screenshotImageHtmlFullUrl);
  eleventyConfig.addLiquidShortcode("rawScreenshotImageFromFullUrl", function(fullUrl) {
    return getScreenshotUrl(fullUrl);
  });
	eleventyConfig.addLiquidShortcode("rawScreenshotImage", function(postUrl) {
    return getScreenshotUrlFromPath(postUrl);
	});

	eleventyConfig.addLiquidShortcode("ogImageSource", function({url, inputPath}) {
		// special title og images, only for _posts
		if(inputPath.startsWith("./web/_posts/")) {
			return getScreenshotUrlFromPath(`/opengraph${url}`);
		}

		// raw screenshot
		return getScreenshotUrlFromPath(url);
		// return getScreenshotUrlFromPath("/og/default.jpeg");
	});
};

module.exports.screenshotImageHtmlFullUrl = screenshotImageHtmlFullUrl;