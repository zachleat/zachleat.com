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

module.exports = function(eleventyConfig) {
  // eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addLiquidFilter("backgroundimage", backgroundImageFilter);
  // eleventyConfig.addJavaScriptFunction("image", imageShortcode);
};