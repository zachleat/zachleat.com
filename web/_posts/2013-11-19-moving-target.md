---
title: 'The Elusive :target Feature Test'
author: Zach Leatherman
layout: post
permalink: /moving-target/
categories: null
tags:
  - research
  - highlight
date: 2013-11-20T17:59:00.000Z
---

**Update: I rewrote this post after determining my feature test was unnecessarily complex. Check out the [post diff](https://github.com/zachleat/zachleat.com/commit/54b7cc7f4e26bacc849696dfa58fadec5dad5709).**

**Update #2: This has [made its way into Modernizr](https://github.com/Modernizr/Modernizr/pull/1107).**

*If you’re not familiar with `:target`, check out [this very simple example](http://www.zachleat.com/test/css-target-feature-test/control.html) before reading this post.*

`:target` is a CSS pseudo-class that is often overlooked. It’s a very useful tool in the performance toolkit for moving content hiding from JavaScript up the toolchain into CSS. *“Anything CSS can do, JavaScript can do worse”*.

With proper Progressive Enhancement, using `:target` can unfairly feel like it’s creating additional work for you to do since you’ll often still have to write that JavaScript for browsers that don’t support `:target` ([IE8 and below don’t support it—but surpringly Android 2.1+ and Windows Phone 7.5 do](https://developer.mozilla.org/en-US/docs/Web/CSS/:target#Browser_compatibility)). The benefit of using `:target` is perceived performance. The non-primary content (non-active pages/tabs/menus/et cetera) is hidden higher in the waterfall (assuming a best practice of loading your CSS at the top of the page) than they would’ve been if the hiding code lived in JavaScript.

Another great benefit to using target is that it allows you to use history entries when navigating around on the page (and direct linking to specific content) unless you opt-out of this feature using JavaScript. Chris Coyier describes this is in his post *[On Target](http://css-tricks.com/on-target/)* (see the section titled ‘Fighting the Jump’). One limitation of this approach is the current [WebKit (and Blink)](https://bugs.webkit.org/show_bug.cgi?id=83490) and Gecko bugs that do not reevaluate CSS when the hash is updated using `replaceState` (without modifying history) or `pushState` (to add a history entry) ([JSBin Example](http://jsbin.com/esunoh/2)).

{% highlight js %}
$("a[href^=#]").on("click", function(e) {
  e.preventDefault();
  history.pushState({}, "", this.href);
});
{% endhighlight %}

There are two issues with this method of Fighting the Jump:

* The page jumps to the newly targetted content.
* The CSS rules are not re-evaluated.

We can eliminate the second issue with the long forgotten [`location.replace()`](https://developer.mozilla.org/en-US/docs/Web/API/Location.replace) method (or it’s twin brother `location.hash`). You can use `replace` in lieu of `replaceState` (or `hash` instead of `pushState`) to update the hash and re-evaluate CSS.

{% highlight js %}
// Will re-evaluate CSS.
// Yes, including any newly applicable :target rules.
location.replace( '#myhash' );
{% endhighlight %}

Sadly, this method does not resolve the first issue with “Fighting the Jump.” The page will still scroll to the newly targetted content. But it does allow us to avoid adding a history entry. (If you are fine with the history entry, don’t add any JavaScript at all.)

{% highlight js %}
$("a[href^=#]").on("click", function(e) {
  e.preventDefault();
  // Basically the same as doing nothing except we bypass a history entry.
  location.replace( '#' + this.href.substr( this.href.lastIndexOf( '#' ) + 1 ) );
});
{% endhighlight %}

However, we won’t use the same mechanism for our feature test. As it turns out, a `:target` feature test is much simpler.

## Feature Test

Requirements for a good `:target` feature test:

* Must be able to execute prior to DOMContentLoaded.
* Must be unobtrusive and **not** add a history entry.

A previous version of this blog post included a feature test that attempted to set the hash and measure the updated CSS rules to see if `:target` applied. This turned out to be woefully overcomplicated. We can exploit the fact that `querySelector` will throw an error if you feed it an unsupported selector (`:target`, for example). This means we don’t have to modify the hash at all, which is much safer. (Credit to [@wilto](https://twitter.com/wilto) for showing me this method.)

* [Code is also available on GitHub](https://github.com/zachleat/Compatibility-Tests/tree/master/css-target-feature-test) (both the new `querySelector` method and the old `insertNode` method)

### Demos

#### [The new `document.querySelectorAll(':target')` Method](http://www.zachleat.com/test/css-target-feature-test/querySelector.html)

* Chrome 31: Passes
* Firefox 25: Passes
* IE7, IE8: Fails Correctly (Not supported)
* IE9, IE10: Passes
* Safari 7: Passes
* Android 2.3: Passes
* Windows Phone 7.5: Passes
* BB6.1, BB7: Passes
* **BB5: Passes Correctly** and does not require an opt-out like the other method.
* **Kindle 3.4: Passes** and does not add a history entry like the other method.
* **Opera Mini: Passes correctly (unlike the other method) but [requires a server refresh to repaint the page](https://github.com/Modernizr/Modernizr/pull/1107).**
* Opera 9.10: Fails Correctly (Not supported)
* Opera 12: Passes

#### [The old `location.replace` Method](http://www.zachleat.com/test/css-target-feature-test/insertNode.html)

*(Included for posterity)*

* Chrome 31: Passes
* Firefox 3.6: Opts out of the test to use document.scripts. Otherwise, would pass.
* Firefox 25: Passes
* IE6, IE7, IE8: Fails Correctly (Not supported)
* IE9, IE10: Passes
* Safari 4, 5, 5.1, 6, and 7: Passes
* Opera Mobile: Passes
* Android 2.3: Passes
* Android 4.1: Passes
* Windows Phone 7.5: Passes
* iOS 7: Passes
* BB6.1, BB7: Passes
* BB5: Opt-ed out of the test using a [weak inference](https://gist.github.com/jdalton/812950). This test caused BB5 to go all infinite redirect, so the feature test hard-returns false for any non-WebKit Blackberry.
* Kindle 3.4: Passes (But adds a history entry)
* Opera Mini: Fails Incorrectly (Is supported, but buggy)
* Opera 9.10: Fails Correctly (Not supported)
* Opera 12: Passes

## Related

* A [Modernizr issue requesting a `:target` feature test](https://github.com/Modernizr/Modernizr/issues/440), note that Opera Mini fails the above test correctly and does not false positive as discussed in this issue.
