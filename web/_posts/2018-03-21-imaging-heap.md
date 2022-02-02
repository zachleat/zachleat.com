---
title: 'imaging-heap, Measuring Responsive Image Efficiency'
tags:
  - project
---
_From deep in the archives (2 years late!), filed under “things I built but never posted on my web site”:_

A command line tool to measure the efficiency of your responsive image markup across viewport sizes and device pixel ratios.

Works out-of-the-box with `img` (of course), `img[srcset]`, `img[srcset][sizes]`, `picture`, `picture[srcset]`, `picture[srcset][sizes]`. Ignores `*.svg` files. No support for background images yet.

* `npm install -g imaging-heap`
* e.g. `imagingheap https://www.zachleat.com/`
* View on: [GitHub](https://github.com/filamentgroup/imaging-heap) or [npm](https://www.npmjs.com/package/imaging-heap) 
* [Retweet](https://twitter.com/zachleat/status/976535994781650944)


## Inspired by

* Hugely inspired by the [NCC Image Checker Chrome Extension](https://github.com/nccgroup/image-checker) (which is a great visual tool). The main difference here is that imaging-heap will collate data across viewport sizes and device pixel ratios.
* [RespImageLint](https://ausi.github.io/respimagelint/) a Linter Bookmarklet for Responsive Images

## Sample output

```
╔══════════╤══════════╤═══════╤════════════╤════════╤════════════╤════════╤════════════╗
║          │ Image    │ @1x   │ @1x        │ @2x    │ @2x        │ @3x    │ @3x        ║
║          │ Width in │ Image │ Percentage │ Image  │ Percentage │ Image  │ Percentage ║
║ Viewport │ Layout   │ Width │ Match      │ Width  │ Match      │ Width  │ Match      ║
╟──────────┼──────────┼───────┼────────────┼────────┼────────────┼────────┼────────────╢
║ 320px    │ 161px    │ 301px │ 187.0%     │ 301px  │ 93.5%      │ 601px  │ 125.2%     ║
║ 480px    │ 241px    │ 301px │ 124.9%     │ 601px  │ 125.2%     │ 601px  │ 83.5%      ║
║ 640px    │ 321px    │ 601px │ 187.2%     │ 601px  │ 93.6%      │ 901px  │ 93.9%      ║
║ 800px    │ 401px    │ 601px │ 149.9%     │ 901px  │ 112.6%     │ 1201px │ 100.1%     ║
║ 960px    │ 480px    │ 600px │ 125.0%     │ 900px  │ 93.8%      │ 1200px │ 83.3%      ║
║ 1120px   │ 560px    │ 600px │ 107.1%     │ 1200px │ 107.1%     │ 1200px │ 71.4%      ║
║ 1280px   │ 640px    │ 900px │ 140.6%     │ 1200px │ 93.8%      │ 1200px │ 62.5%      ║
╚══════════╧══════════╧═══════╧════════════╧════════╧════════════╧════════╧════════════╝
```
