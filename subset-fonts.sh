UNICODE_RANGE_11TY="U+31,U+74,U+79"

echo "Bench Nine, just the characters for 11ty"
pyftsubset "web/css/fonts/benchnine/BenchNine-Bold.ttf" --output-file="BenchNine-Bold-11ty-subset.woff2" --flavor=woff2 --layout-features=kern,salt --no-hinting --desubroutinize --unicodes=$UNICODE_RANGE_11TY
