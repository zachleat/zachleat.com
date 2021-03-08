const eleventyImg = require("@11ty/eleventy-img");
const glob = require("fast-glob");
const path = require("path");

(async () => {
  let sources = await glob("./og/*.svg", {
    caseSensitiveMatch: false
  });

  let promises = [];
  for(let imagePath of sources) {
    promises.push(eleventyImg(imagePath, {
      widths: [null],
      formats: ["jpeg"],
      outputDir: "./og/",
      filenameFormat: function (id, src, width, format, options) {
        let extension = path.extname(src);
        let name = path.basename(src, extension);

        return `${name}.${format}`;
      }
    }));
  }
  await Promise.all(promises);
})();