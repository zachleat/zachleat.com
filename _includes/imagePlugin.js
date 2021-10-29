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
  let d = new Date();
  return `___${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`;
}

function getDomainUrl(path) {
  // TODO this but better
  // show boring home page image for everything so we don’t prematurely request a post image that hasn’t been published yet.
  let domain = "https://www.zachleat.com";
  if(process.env.ELEVENTY_PRODUCTION) {
    return domain + path;
  }
  return domain;
}

module.exports = function(eleventyConfig) {
  // eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addLiquidFilter("backgroundimage", backgroundImageFilter);
  // eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addLiquidShortcode("opengraphImageHtml", function({url, data}) {
    let targetUrl = getDomainUrl(url);
    let fullUrl = `https://v1.opengraph.11ty.dev/${encodeURIComponent(targetUrl)}/`;

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
      alt: data.title || `OpenGraph image for ${targetUrl}`,
      loading: "lazy",
      decoding: "async",
      sizes: "(min-width: 64em) 50vw, 100vw",
      class: "project_img",
    });
  });

  function getScreenshotUrl(fullUrl) {
    return `https://v1.screenshot.11ty.dev/${encodeURIComponent(fullUrl)}/opengraph/${getCacheBuster()}/`;
  }
  function getScreenshotUrlFromPath(path) {
    return getScreenshotUrl(getDomainUrl(path));
	}

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