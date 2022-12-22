// const sass = require("sass");
// const path = require("node:path");

// module.exports = function(eleventyConfig) {
//    // add as a valid template language to process, e.g. this adds to --formats
//   eleventyConfig.addTemplateFormats("scss");

//   eleventyConfig.addExtension("scss", {
//     outputFileExtension: "css", // optional, default: "html"

//     // can be an async function
//     compile: function (inputContent, inputPath) {
//       let parsed = path.parse(inputPath);

//       let result = sass.compileString(inputContent, {
//         loadPaths: [
//           parsed.dir || ".",
//           this.config.dir.includes
//         ]
//       });

//       this.addDependencies(inputPath, result.loadedUrls);

//       return (data) => {
//         return result.css;
//       };
//     }
//   });
// };
