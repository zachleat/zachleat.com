mkdir -p _site

rm -rf _site/unicode-range-interchange
npx degit zachleat/unicode-range-interchange _site/unicode-range-interchange

rm -rf _site/alarmd2
npx degit zachleat/ALARMd _site/alarmd2

# rm -rf _site/bigtext
# npx degit zachleat/bigtext _site/bigtext

rm -rf _site/presentations/toolordie
npx degit zachleat/ToolOrDie _site/presentations/toolordie

rm -rf _site/web-fonts/demos
npx degit zachleat/web-font-loading-recipes _site/web-fonts/demos
