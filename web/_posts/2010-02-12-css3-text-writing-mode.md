---
title: 'CSS 3 Text: A Tale of <span class="widow">writing-mode Woe</span>'
author: Zach Leatherman
layout: post
permalink: /css3-text-writing-mode/
bttc_cache:
  - 1299698222:2
categories:
  - CSS
  - Web Browsers
---
# 

After reading an interesting article on using the [writing-mode CSS property][1] to display vertical text (I’m always interested in how to abuse what browsers currently support into something new and exciting), I decided to look into this `writing-mode` property and see what opportunities it might present.

 [1]: http://www.thecssninja.com/css/real-text-rotation-with-css

Generally when exploring a development opportunity, I tend to prioritize my adventures towards things that are supported in Internet Explorer first. This often has the biggest cross-browser payoff, since the other browser vendors tend to have a quicker draw than the Microsoft Team. However, surprisingly enough, this `writing-mode` study proved the opposite to be true. It seems very interesting that Microsoft has decided to implement a portion of the CSS 3 specification, given its general stance of moving slower than an iceberg to avoid “breaking the web.” But I, for one, welcome our new choose-your-own-adventure standards loving overlords.

As far as my tests go, the only browser to support the `writing-mode` property at all is Internet Explorer, which was very surprising. At it’s heart, though, `writing-mode` is just shorthand for two other properties: `direction` and `block-progression`. Luckily, **Firefox, Safari, Chrome and IE back through at least version 6 support the `direction` property** and have proprietary options for rotation, which **allows for emulation of a few of the unsupported `writing-mode`‘s**, but not all of them. The missing piece of `writing-mode` emulation belongs to the `block-progression` property, which isn’t supported by anyone, and would allow elements to flow reverse vertically (start at the bottom of a block and flow upwards).

*It’s important to note that while [IE8 has really set the bar for implementation here][2] and has chosen to support `writing-mode: lr-bt` and `writing-mode: rl-bt`, they aren’t used to display any known language text. They’re just included for completeness, and aren’t a part of the [W3C CSS 3 Text Module specification.][3]*

 [2]: http://blogs.msdn.com/ie/archive/2009/05/29/the-css-corner-writing-mode.aspx
 [3]: http://www.w3.org/TR/2003/CR-css3-text-20030514/

## [View the Demo / Test Page][4]

 [4]: http://zachleat.com/test/writing-mode/

## Compatibility Table

writing-mode

Internet Explorer  
(Trident)

Mozilla Firefox  
(Gecko)

Apple Safari  
(Webkit)

Google Chrome  
(Webkit)

6

7

8

3.6

4

4

`lr-tb`

yes

yes

yes

yes

yes

yes

`rl-tb`

emulatable

yes

yes

emulatable

emulatable

emulatable

`lr-bt`

no

no

yes

no

no

no

`rl-bt`

no

no

yes

no

no

no

`tb-lr`

no

no

yes

no

no

no

`tb-rl`

yes

yes

yes

emulatable

emulatable

emulatable

`bt-lr`

no

no

yes

no

no

no

`bt-rl`

emulatable

yes

yes

emulatable

emulatable

emulatable

## CSS Code for Emulation

writing-mode

CSS

`lr-tb`

    // Default

`rl-tb`

    direction: rtl;

`lr-bt`

    // Not possible using W3C spec

`rl-bt`

    // Not possible using W3C spec

`tb-lr`

    // Not possible using W3C spec

`tb-rl`

    -webkit-transform: rotate&#40;90deg&#41;;
    -moz-transform: rotate&#40;90deg&#41;;
    filter: progid:DXImageTransform.Microsoft.BasicImage&#40;rotation=1&#41;;

`bt-lr`

    // Not possible using W3C spec

`bt-rl`

    direction: rtl;
    -webkit-transform: rotate&#40;90deg&#41;;
    -moz-transform: rotate&#40;90deg&#41;;
    filter: progid:DXImageTransform.Microsoft.BasicImage&#40;rotation=1&#41;;

## Conclusion

Given that **4 of the 6 known writing modes are available** or available through CSS emulation means we’re in pretty good shape on the internationalization front. Consulting the Microsoft provided table for common use cases, we’re only in trouble when trying to use the “Mongolian script writing system” and an “Arabic script block quote embedded in Mongolian script document.”

In some far fetched fantasy-world legacy application where a page may use tables for layout, I could see an application team possibly using the `direction` property to redistribute the tables for a print stylesheet. But that certainly wouldn’t be a common use case, since using CSS for layouts is going to give you much more flexibility in that regard. If you can think of any other off the wall uses for `writing-mode` or `direction`, I’d love to hear them!

## Related

*   Very [complete article on CSS 3 writing-mode][5], including some `direction` properties that don’t exist in the specification (like `ttb`, `ltr-ttb`, and `ltr-btt`)
*   [Bugzilla Bug for writing-mode in Firefox][6]
*   As of the time of this writing, I was unable to find any results for writing-mode on the Webkit bug tracker.

 [5]: http://fantasai.inkedblade.net/style/discuss/vertical-text/#logical
 [6]: https://bugzilla.mozilla.org/show_bug.cgi?id=writing-mode