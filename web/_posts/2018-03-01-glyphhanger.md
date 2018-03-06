---
title: It’s Dangerous to Go Stallone. Take Glyphhanger
permalink: /glyphhanger/
---

_Originally posted as [glyphhanger is for Subsetting Web Fonts](http://filamentgroup.com/lab/glyphhanger/) on the [Filament Group Lab](http://filamentgroup.com/lab/). Title by [Scott Jehl](https://www.filamentgroup.com/about/#scott-jehl)_

---

Psst.

Hey, you.

Yeah, you.

I’m gonna tell you a secret. A well guarded and little known secret—whispered about in hallway tracks of web performance conferences around the world. A web font performance trick that will take your font loading to the next level.

Here it is—are you ready? *Smaller web fonts load faster.* I know, I know. Mind blowing stuff.

Okay, fine–I’ll concede. This isn’t as groundbreaking or as secretive as I originally claimed. But it is helpful!

Practically speaking, making web fonts smaller is not always straightforward. The most straightforward optimization is to use compressed web font files, specifically the WOFF2 format but also its predecessor WOFF for compatibility.

A less well known, but very useful option—and the one I’d like to discuss in-depth today—is removing potentially unnecessary characters from a font file. This is a process called _subsetting_.

## Subsetting

Let’s start with the most popular font on Google Fonts, Roboto. For experiment’s sake (although you can download it from Google Fonts) let’s download an unoptimized copy straight from the source, the [Roboto GitHub repository](https://github.com/google/roboto/releases).

Opening up the `roboto-android.zip` file, we can find `Roboto-Regular.ttf`—a completely unoptimized desktop font version of Roboto. It weighs in at `306 KB` and includes 3,359 distinct glyphs (according to [Font Drop](https://fontdrop.info/)). That’s a hefty font. Not a hefty weight—we’re not using the bold version of Roboto—I only mean that the file size is large. Was that clear? Hopefully. I think you get what I mean.

Font Drop also reports that Roboto contains support for over 40 languages:

> Afrikaans  Albanian  Azerbaijani  Belarusian  Bosnian  Bulgarian  Catalan  Croatian  Czech  Danish  Dutch  English  Estonian  Finnish French  German  Greek  Hungarian  Icelandic  Italian  Latvian  Lithuanian  Macedonian  Maltese  Norwegian  Ossetic  Polish  Portugese Romanian  Russian  Serbian  Slovak  Slovenian  Spanisch  Swedish  Turkish  Ukrainian  Uzbek  Vietnamese  Zulu

Does your content necessitate characters for those languages? Or are those characters unnecessary and unlikely to appear on your site? This isn’t a hypothetical question—let’s answer it!

## Use glyphhanger

We can test our site to see what glyphs are used at a URL using a tool we’ve developed called `glyphhanger`.

Find `glyphhanger` on [**GitHub**](https://github.com/filamentgroup/glyphhanger) or [**npm**](https://www.npmjs.com/package/glyphhanger).

{% highlight-plain %}
npm install -g glyphhanger
{% endhighlight %}

At its simplest, glyphhanger can take a URL and return a Unicode range for all of the content used on the site.

For example (don’t include the `$` if you copy these commands):

{% highlight-plain %}
$ glyphhanger https://www.filamentgroup.com/
U+20,U+21,U+26,U+28,U+29,U+2B-38,U+3A,U+3F-47,U+49,U+4C-50,U+52-55,U+57-5A,U+61-70,U+72-77,U+79,U+7C,U+A9,U+DC,U+2014,U+2019,U+25A2
{% endhighlight %}

Let’s take `Roboto-Regular.ttf` and subset it this Unicode range. glyphhanger can help with this too:

_Subsetting functionality in glyphhanger requires you to install [fonttools], a python project. The glyphhanger README includes [installation instructions for Mac OS X](https://github.com/filamentgroup/glyphhanger#installing-pyftsubset)._

{% highlight-plain %}
$ glyphhanger https://www.filamentgroup.com/ --subset=Roboto-Regular.ttf --formats=woff2,woff
Subsetting Roboto-Regular.ttf to Roboto-Regular-subset.woff (was 298.45 KB, now 14.09 KB)
Subsetting Roboto-Regular.ttf to Roboto-Regular-subset.woff2 (was 298.45 KB, now 10.63 KB)
{% endhighlight %}

Note that in the above example, `--formats=woff2,woff` means to output both a WOFF and WOFF2 subset file. Valid options include: `woff2`, `woff`, `woff-zopfli` (for better WOFF compression compared to `woff`), and `ttf`.

### Make the files usable site-wide

This works great for a single page on our site. But to be fair, we want to use one set of web font files that works with all of the pages on our site—not just for the home page. There are a couple of ways to make this work:

1. Pass in multiple URLs
2. Use the glyphhanger Spider to find URLs for you
3. Pass in a white-list of characters or a `unicode-range`

Let’s look at a few examples:

#### Pass in multiple URLs

{% highlight-plain %}
$ glyphhanger https://www.filamentgroup.com/ https://www.filamentgroup.com/code/
{% endhighlight %}

#### Use the Spider to find URLs for you

Use the `--spider` option to find all of the `a[href]` attribute values that contain local URLs and spider those pages as well. This will report the union of all of the Unicode ranges.

{% highlight-plain %}
$ glyphhanger https://www.filamentgroup.com/ --spider --spider-limit=10
{% endhighlight %}

Configure the maximum limit with `--spider-limit` (default is 10).

#### Pass in a whitelist

Use the `--whitelist` option to pass in a Unicode range or a list of characters you’d like to include by default in addition to any URLs that get interpreted. At time of writing, glyphhanger (v3.0) also includes shortcuts for `--US_ASCII` and `--LATIN`.

Using `--whitelist` makes the URL argument optional.

{% highlight-plain %}
$ glyphhanger --whitelist="ABCD"
U+41-44
{% endhighlight %}

{% highlight-plain %}
$ glyphhanger --US_ASCII
U+20-7E
{% endhighlight %}

Let’s subset our Roboto font using a whitelist.

{% highlight-plain %}
$ glyphhanger --whitelist="U+20-7E" --subset=Roboto-Regular.ttf --formats=woff2
U+20-7E
Subsetting Roboto-Regular.ttf to Roboto-Regular-subset.woff2 (was 298.45 KB, now 10.78 KB)
{% endhighlight %}

Nice, right?

### Subset to a specific font-family

Let’s say, instead of Roboto, we have a specific monospace web font we’d like to use in our code blocks and syntax highlighted code on our site. The Unicode range for monospace code content may be very different from the characters used for other content on our site. glyphhanger can help here too. We can pass in a comma separated list of one or more `font-family` names to fetch only the content in nodes using those `font-family` values.

{% highlight-plain %}
$ glyphhanger --family='Consolas,monospace' https://www.filamentgroup.com/lab/preload-ctm.html
U+A,U+20-22,U+26,U+28,U+29,U+2B-30,U+38,U+3A-3E,U+41-43,U+45,U+4A,U+4C-4E,U+53,U+54,U+5B,U+5D,U+61-79,U+7B-7D
{% endhighlight %}

It works with `--subset` too. You can also use `--json` to see all ranges organized by `font-family`. `"*"` is the universal list of all characters on the page.

{% highlight-plain %}
$ glyphhanger https://www.filamentgroup.com/code/ --json
{"*": "U+20,U+21,U+26,U+28,U+29,U+2B-38,U+3A,U+3F-4A,U+4C-59,U+61-7A,U+A9,U+B0,U+2019,U+201C,U+201D","Source Sans Pro": "U+20,U+21,U+26,U+28,U+29,U+2B-38,U+3A,U+3F-4A,U+4C-59,U+61-7A,U+A9,U+B0,U+2019,U+201C,U+201D","Consolas": "U+20,U+28,U+29,U+3A,U+40,U+61,U+63-66,U+69,U+6B-70,U+72-75,U+78-7A"}
{% endhighlight %}

### Output CSS that you can use

glyphhanger will even make your `@font-face` blocks in CSS for you. Using `--css` will output a `@font-face` block to the console. Of course, it’ll add the `unicode-range`, but it’ll also add the right `src` with the correct file names returned from `--subset`. If you’re using `--family`, it’ll add a `font-family` value too.

{% highlight-plain %}
$ glyphhanger --US_ASCII --family='Source Sans Pro' --subset=Roboto-Regular.ttf --formats=woff2,woff --css
U+20-7E
Subsetting Roboto-Regular.ttf to Roboto-Regular-subset.woff (was 298.45 KB, now 14.37 KB)
Subsetting Roboto-Regular.ttf to Roboto-Regular-subset.woff2 (was 298.45 KB, now 10.78 KB)

@font-face {
  font-family: Source Sans Pro;
  src: url(Roboto-Regular-subset.woff2) format("woff2"), url(Roboto-Regular-subset.zopfli.woff) format("woff");
  unicode-range: U+20-7E;
}
{% endhighlight %}

## A Web Font Utility Belt

`glyphhanger` is a useful tool when working with web fonts—it can help optimize your font files very quickly. But don’t get too hasty. Take proper care to perform due diligence before subsetting:

1. Make sure subsetting agrees with the licensing restrictions on the font file.
2. Don’t be too aggressive with your subset. If you’re using web fonts for user generated content or content that is likely to change in the future, your Unicode range should be broad enough to accommodate this.

Download glyphhanger and give it a try! We welcome any and all feedback at our [Issue Tracker](https://github.com/filamentgroup/glyphhanger/issues). What else would you like to do with your web fonts?
