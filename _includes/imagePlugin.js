const Image = require("@11ty/eleventy-img");

async function imageShortcode(attrs = {}, options = {}) {
  options = Object.assign({},{
    widths: [null],
    formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", "jpeg"] : ["webp", "jpeg"],
    urlPath: "/img/built/",
    outputDir: "./_site/img/built/",
    sharpAvifOptions: {
      lossless: true,
    },
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
  options = Object.assign({},{
    widths: [width || "auto"],
    formats: ["jpeg"],
    urlPath: "/img/built/",
    outputDir: "./_site/img/built/",
    sharpAvifOptions: {
      lossless: true,
    },
  }, options);

  src = `.${src}`;

  // async
  Image(src, options);

  // sync
  let metadata = Image.statsSync(src, options);

  let css = `url('${metadata.jpeg[0].url}')`;
  return css;
}

module.exports = function(eleventyConfig) {
  // eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addLiquidFilter("backgroundimage", backgroundImageFilter);
  // eleventyConfig.addJavaScriptFunction("image", imageShortcode);
};