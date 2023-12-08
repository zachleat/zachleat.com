---
title: "A New Technique for Image Optimization: SVG Short Circuiting"
video_title: Stop worrying about huge image uploads with Eleventy Image and CloudCannon CMS
tags:
  - cloudcannon
metadata:
  youtubeId: Dsd831CSazA
opengraphSkipFace: true
---
Working on an [Image Optimization tutorial for CloudCannon (using Eleventy)](https://cloudcannon.com/blog/automatically-optimize-your-images-with-eleventy-image-and-cloudcannon/), I stumbled into what I think is a neat little trick for automated image optimization.

There are three kinds of optimization that [Eleventy Image](https://www.11ty.dev/docs/plugins/image/) can do:

1. **Raster to raster**: Convert a large raster input image (PNG, JPEG, WebP, AVIF, etc) into smaller raster output images (pretty standard).
	* One nice feature here is that Eleventy Image will automatically swap between `<img>` and `<picture>` for you automatically based on the combination of output `formats` and `widths` options you’ve used for any specific image.
2. **Vector to raster**: Convert a large vector image (SVG) into smaller sized raster outputs (again, pretty standard).
	* This also includes an option to leave SVG inputs as SVG-only (skipping raster outputs altogether) with `svgShortCircuit: true`.
3. **Vector to raster/vector**: this new approach uses `svgShortCircuit: "size"` to convert a large vector image (SVG) into a mixture of vector and raster outputs while discarding the raster images that are larger in file weight than their vector counterpart.

Read more about the [Eleventy Image options for SVG](https://www.11ty.dev/docs/plugins/image/#options-for-svg).

<p data-demo-label="Related Post" class="livedemo">Astute readers might remember the post <a href="/web/vector-raster-split/"><em>Vector? Raster? Why not Both!</em></a> which detailed an approach to manually subset and overlay an image as two separate layers: a vector layer and a raster layer.</p>

## SVG Short Circuiting Examples

### Mexico

The Mexico Flag is a pretty complex SVG (139.55 kB uncompressed). If we use Eleventy Image, we can look at the output images:

<table>
	<thead>
		<tr>
			<th>Size</th>
			<th>Format</th>
			<th>Percent</th>
			<th>Width</th>
		</tr>
	</thead>
	<tbody>
		<tr class="yes">
			<td><code>53 kB</code> (Brotli compressed)</td>
			<td>svg</td>
			<td>
				<code><em>100%</em></code>
			</td>
			<td><code>980w</code></td>
		</tr>
		<tr class="no">
			<td><code>56.28 kB</code> (Discarded)</td>
			<td>jpeg</td>
			<td><code>106.19%</code></td>
			<td><code>1600w</code></td>
		</tr>
		<tr>
			<td><code>31.07 kB</code></td>
			<td>webp</td>
			<td><code>58.63%</code></td>
			<td><code>1600w</code></td>
		</tr>
		<tr>
			<td><code>18.52 kB</code></td>
			<td>avif</td>
			<td><code>34.95%</code></td>
			<td><code>1600w</code></td>
		</tr>
		<tr>
			<td><code>6.68 kB</code></td>
			<td>jpeg</td>
			<td><code>12.60%</code></td>
			<td><code>400w</code></td>
		</tr>
		<tr>
			<td><code>3.85 kB</code></td>
			<td>webp</td>
			<td><code>7.27%</code></td>
			<td><code>400w</code></td>
		</tr>
		<tr>
			<td><code>3.39 kB</code></td>
			<td>avif</td>
			<td><code>6.39%</code></td>
			<td><code>400w</code></td>
		</tr>
	</tbody>
</table>

When using `svgShortCircuit: "size"` and `svgCompressionSize: "br"`, the largest JPEG is discarded from the output as its file size is larger than the SVG. We prefer the vector output!

Here’s what the generated markup looks like:

```html
<picture>
	<source type="image/avif" srcset="1IB2wrqzRT-400.avif 400w, 1IB2wrqzRT-1600.avif 1600w" sizes="…">
	<source type="image/webp" srcset="1IB2wrqzRT-400.webp 400w, 1IB2wrqzRT-1600.webp 1600w" sizes="…">
	<source type="image/jpeg" srcset="1IB2wrqzRT-400.jpeg 400w, 1IB2wrqzRT-980.svg 980w" sizes="…">
	<source type="image/svg+xml" srcset="1IB2wrqzRT-980.svg 980w" sizes="…">
	<img src="1IB2wrqzRT-400.jpeg" alt="Flag of Mexico" width="980" height="560" loading="eager" decoding="async">
</picture>
```

_(`sizes` attribute omitted for clarity)_

This approach is _somewhat experimental_ (and is not enabled by default in Eleventy Image), although it works well in practice. This technique involves replacing large raster formats in `<source>` with SVG. Specifically, you might notice the `image/jpeg` type above has an SVG image included: `<source type="image/jpeg" srcset="1IB2wrqzRT-400.jpeg 400w, 1IB2wrqzRT-980.svg 980w">`.

### Tiger

The Ghostscript Tiger is less complex (68.63 kB uncompressed) but still benefits from SVG short circuiting. Let’s look at the Eleventy Image output here:

<table>
	<thead>
		<tr>
			<th>Size</th>
			<th>Format</th>
			<th>Percent</th>
			<th>Width</th>
		</tr>
	</thead>
	<tbody>
		<tr class="yes">
			<td><code>19.63 kB</code> (Brotli compressed)</td>
			<td>svg</td>
			<td>
				<code><em>100%</em></code>
			</td>
			<td><code>900w</code></td>
		</tr>
		<tr class="no">
			<td><code>254.67 kB</code> (Discarded)</td>
			<td>jpeg</td>
			<td><code>1297.30%</code></td>
			<td><code>1600w</code></td>
		</tr>
		<tr class="no">
			<td><code>179.77 kB</code> (Discarded)</td>
			<td>webp</td>
			<td><code>915.77%</code></td>
			<td><code>1600w</code></td>
		</tr>
		<tr class="no">
			<td><code>81.36 kB</code> (Discarded)</td>
			<td>avif</td>
			<td><code>414.43%</code></td>
			<td><code>1600w</code></td>
		</tr>
		<tr class="no">
			<td><code>38.84 kB</code> (Discarded)</td>
			<td>jpeg</td>
			<td><code>197.84%</code></td>
			<td><code>400w</code></td>
		</tr>
		<tr class="no">
			<td><code>35.04 kB</code> (Discarded)</td>
			<td>webp</td>
			<td><code>178.49%</code></td>
			<td><code>400w</code></td>
		</tr>
		<tr class="no">
			<td><code>21.28 kB</code> (Discarded)</td>
			<td>avif</td>
			<td><code>108.41%</code></td>
			<td><code>400w</code></td>
		</tr>
	</tbody>
</table>

Using this technique, the output HTML looks like this:

```html
<img src="59IGmw9rii-900.svg" alt="Ghostscript Tiger" width="900" height="900" loading="eager" decoding="async">
```

After size comparisons, only the vector is used in the final output and all of the raster outputs are discarded—the markup is simplified to an `<img>`.

The output above using `svgShortCircuit: "size"` is identical to the output if we had used `svgShortCircuit: true` to automatically discard the raster outputs. At some point in the future we may have [a feature that uses heuristics to swap between `"size"` and `true` to avoid unnecessary image processing](https://github.com/11ty/eleventy-img/issues/199).

It should be noted that this image optimization technique only works for build-time image optimizations and is a great example of how a build step can take the performance of your web site beyond what request-time image optimization is capable of.

## Demo

{% originalPostEmbed "https://gnarly-ginger.cloudvent.net/" %}

With a nod to the tech stack, here are a few things I used to construct the demo:

* [CloudCannon’s site mounting](/web/site-mounting/)
* [`<browser-window>` Web Component](/web/browser-window/)
* [`<resize-asaurus>` Web Component](/web/resizeasaurus/)

## Walkthrough on YouTube

<div><youtube-lite-player @slug="{{ metadata.youtubeId }}" @label="{{ video_title }}"></youtube-lite-player></div>

---

_Originally posted on:_

{% originalPostEmbed "https://cloudcannon.com/blog/automatically-optimize-your-images-with-eleventy-image-and-cloudcannon/" %}