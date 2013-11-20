---
title: 'The Elusive :target Feature Test'
author: Zach Leatherman
layout: post
permalink: /moving-target/
categories:
tags:
---

*If you’re not familiar with `:target`, check out [this very simple example](http://www.zachleat.com/test/css-target-feature-test/control.html) before reading this post.*

`:target` is a CSS pseudo-class that is often overlooked. It’s a very useful tool in the performance toolkit for moving content hiding from JavaScript up the toolchain into CSS. *“Anything CSS can do, JavaScript can do worse”*.

With proper Progressive Enhancement, using `:target` can unfairly feel like it’s creating additional work for you to do since you’ll often still have to write that JavaScript for browsers that don’t support `:target` ([IE8 and below don’t support it—but surpringly Android 2.1+ and Windows Phone 7.5 do](https://developer.mozilla.org/en-US/docs/Web/CSS/:target#Browser_compatibility)). The benefit of using `:target` is perceived performance. The non-primary content (non-active pages/tabs/menus/et cetera) is hidden higher in the waterfall (assuming a best practice of loading your CSS at the top of the page) than they would’ve been if the hiding code lived in JavaScript.

Another great benefit to using target is that it allows you to use history entries when navigating around on the page (and direct linking to specific content) unless you opt-out of this feature using JavaScript. Chris Coyier describes this is in his post *[On Target](http://css-tricks.com/on-target/)* (see the section titled ‘Fighting the Jump’). One limitation of this approach is the current [WebKit (and Blink)](https://bugs.webkit.org/show_bug.cgi?id=83490) and Gecko bugs that do not reevaluate CSS when the hash is updated using `replaceState` (without modifying history) or `pushState` (to add a history entry) ([JSBin Example](http://jsbin.com/esunoh/2)).

The secret here, which we can also use to create a unobtrusive `:target` feature test, is the long forgotten [`location.replace()`](https://developer.mozilla.org/en-US/docs/Web/API/Location.replace) method (or it’s more obvious twin `location.hash`). You can use these in lieu of `replaceState` and `pushState`, respectively, to update the hash (use `replace` to do so without adding a history entry).

{% highlight js %}
// Will re-evaluate CSS.
// Yes, including any newly applicable :target rules.
location.replace( '#myhash' );
{% endhighlight %}

You might see where I’m going with this.

{% highlight html %}
<style>
#myhash:target { color: red; }
</style>
<div id="myhash"></div>
{% endhighlight %}

You can then use JavaScript to test the text color. If it’s red, :target is supported. (Really, any property could be used for testing purposes here.)

## Feature Test

Requirements for a good `:target` feature test:

* Must be able to execute prior to DOMContentLoaded.
* Must be unobtrusive:
    * Must **not** add a history entry.
    * If the page already has a hash, restore it after running the test.
    * If the page did not have a hash, attempt to remove the unsightly empty `#` from the URL (only if `replaceState` is supported). Important to note that using `replaceState` to remove the empty `#` will not have unintended consequences with the bugs discussed prior since the HTML specification requires ID attributes to be at least one character in length, so there won’t be any CSS `:target` rules applicable to an empty hash.

## [Demo and Feature Test Source Code](http://www.zachleat.com/test/css-target-feature-test/insertNode.html)

* [Code is also available on GitHub](https://github.com/zachleat/Compatibility-Tests/tree/master/css-target-feature-test).

I tested this on the following browsers:

* Chrome 31: Passes
* Firefox 3.6: Passes 
* Firefox 25: Passes
* IE6, IE7, IE8: Fails Correctly (Not supported)
* IE9, IE10: Passes
* Safari 4, 5, 5.1, 6, and 7: Passes
* Opera Mobile: Passes
* Android 4.1: Passes
* Windows Phone 7.5: Passes
* iOS 7: Passes
* BB6.1, BB7: Passes
* BB5: Opt-ed out of the test using a [weak inference](https://gist.github.com/jdalton/812950). This test caused BB5 to go all infinite redirect, so the feature test hard-returns false for any non-WebKit Blackberry.
* Kindle 3.4: Passes
* Opera Mini: Fails Correctly (Not supported)

## Related

* A [Modernizr issue requesting a `:target` feature test](https://github.com/Modernizr/Modernizr/issues/440), note that Opera Mini fails the above test correctly and does not false positive as discussed in this issue.
