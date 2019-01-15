---
title: Download a Twitter User’s Profile Image
note-tags:
  - JavaScript
  - Bash
  - Twitter
---
The [11ty.io web site](https://www.11ty.io/) uses avatar images for its Testimonial and Sites Using Eleventy features. I wrote a [script to automatically download those avatar images](https://github.com/11ty/11ty.io/blob/master/avatars.sh) based on usernames stored in data files in the 11ty.io repository.

In that same vein, I created a simpler utility borne from that script. It will:

1. Fetch the avatar image for any twitter username
2. Add the correct file extension (`png` or `jpg`)
3. Optimize the image using `jpegtran` or `pngcrush` (some of them were not optimized 🤷‍♂️)

Here’s an example:

```bash
$ ./fetch-twitter-image.sh zachleat
Created zachleat.jpg
```

_(Don’t type the `$` there)_

And here’s the script. Save the following content as `fetch-twitter-image.sh`:

```bash
wget --quiet -O $1.jpg https://twitter.com/$1/profile_image?size=bigger

file="$1.jpg"
type=$(file-type $file)

if [[ $type == *"image/jpeg"* ]]
then
  jpegtran "$file" > "$file_"
  mv "$file_" "$file"
  echo "Created $1.jpg"
elif [[ $type == *"image/png"* ]]
then
  pngcrush -brute "$file"
  rm $1.jpg
  mv pngout.png $1.png
  echo "Created $1.png"
fi
```

Don’t forget to add execute permissions to this file:

```bash
chmod +x fetch-twitter-image.sh
```

## Install the Dependencies

* wget: You probably already have this
* [file-type-cli](https://www.npmjs.com/package/file-type-cli) `npm install -g file-type-cli`
* [jpegtran](https://github.com/imagemin/jpegtran-bin) `npm install -g jpegtran-bin`
* [pngcrush](https://github.com/imagemin/pngcrush-bin#readme) `npm install -g pngcrush-bin`

(This script should be its own module on npm, huh?)

## Bonus tip: Iterate over a Data File

Given this arbitrary `data.json` JSON file:

```json
[{
    "twitterUsername": "zachleat"
},{
    "twitterUsername": "filamentgroup"
}]
```

Iterate over `data.json` using [`jq`](https://stedolan.github.io/jq/) and fetch all the images.

```bash
for handle in $(cat data.json | jq -r '.[] | .twitterUsername'); do
    ./fetch-twitter-image.sh $handle
done
```