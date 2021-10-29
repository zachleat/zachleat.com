const Image = require("@11ty/eleventy-img");
const pkg = require("../package.json")
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

module.exports = function(eleventyConfig) {
  // eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addLiquidFilter("backgroundimage", backgroundImageFilter);
  // eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addLiquidShortcode("opengraphImageHtml", function({url, data}) {
    let domain = "https://www.zachleat.com";
    let fullUrl = `https://v1.opengraph.11ty.dev/${encodeURIComponent(domain + url)}/`;

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

        return `${fullUrl}${size}/${format}/_${pkg.version}/`;
      }
    };

    let stats = Image.statsByDimensionsSync(fullUrl, 1200, 630, options);
    return Image.generateHTML(stats, {
      alt: data.title || `OpenGraph image for ${url}`,
      loading: "lazy",
      decoding: "async",
      sizes: "(min-width: 64em) 50vw, 100vw",
      class: "project_img",
    });
  });

  function getScreenshotUrl(fullUrl, cacheBuster = "") {
    return `https://v1.screenshot.11ty.dev/${encodeURIComponent(fullUrl)}/opengraph/${cacheBuster ? `${cacheBuster}/` : ""}`;
  }
  function getScreenshotUrlFromPath(path, cacheBuster = "") {
		let domain = "https://www.zachleat.com";
		return getScreenshotUrl(domain + path, cacheBuster);
	}

  eleventyConfig.addLiquidShortcode("rawScreenshotImageFromFullUrl", function(fullUrl) {
    return getScreenshotUrl(fullUrl);
  });
	eleventyConfig.addLiquidShortcode("rawScreenshotImage", function(postUrl) {
    return getScreenshotUrlFromPath(postUrl);
	});

	function pad(num) {
		return `${num}`.padStart(2, '0');
	}
	eleventyConfig.addLiquidShortcode("ogImageSource", function({url, inputPath}, cacheBusterSuffix = "") {
		// special title og images, only for _posts
		if(inputPath.startsWith("./web/_posts/")) {
			let d = new Date();
			// daily cache buster
			let cacheBuster = `__${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}${cacheBusterSuffix}`;

			return getScreenshotUrlFromPath(`/opengraph${url}`, cacheBuster);
		}

		// raw screenshot
		return getScreenshotUrlFromPath(url);

		// return `${domain}/og/default.jpeg`;
	});
};