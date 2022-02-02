# Fixed-fixed: a CSS `position:fixed` qualifier

- (c)2012 @scottjehl, Filament Group
- Dual license: MIT and/or GPLv2

## Explanation

CSS fixed-positioning varies widely in browser support, and it's difficult to test. This repo includes a test that attempts to qualify the application of CSS <code>position:fixed</code>. Rather than testing immediately, it waits for the user to scroll, at which point it checks to see if fixed positioning is working properly. Prior to scroll, the script assumes fixed-positioning works, adding a class of `fixed-supported` that can be used to qualify any `position:fixed` CSS rules. When fixed positioning is tested and deemed unsupported, the class is removed, allowing any fixed-positioned elements to safely degrade to some other layout.

One caveat in details of the approach: there are a few known browsers that report false results when running the included feature test. These browsers are no longer in development, but since they are popular, this script looks for them name and deems their `position:fixed` support as false immediately, never needing to run the test. Of course, this sort of blacklisting is quite untenable to maintain, so it is only used in the event that a feature test can not be reliably used. These browsers are Android 2.1, Opera Mobile (less than 11.0, 11.5 works but dynamically re-positions instead of true fixed), Opera Mini (latest), and Firefox Mobile (latest).

Hat tip: the idea behind the testing portion of this approach was inspired by @Kangax's [Position Fixed Test](http://kangax.github.com/cft/#IS_POSITION_FIXED_SUPPORTED)

## Usage

Just qualify any `position:fixed` usage in your stylesheet with a `.fixed-supported` parent class selector, like so:

    .fixed-supported header { position: fixed; }

That class will be present on the HTML element in CSS fixed-supporting browsers. You can apply an initial/degraded layout in browsers that don't support fixed positioning properly by writing selectors that do not use the `.fixed-supported` selector.

See [`index.html`](http://filamentgroup.github.com/fixed-fixed/) for an example.

## Compressed source (minified with uglify.js):

	/*! Fixedfixed: a CSS position:fixed qualifier. (c)2012 @scottjehl, Filament Group, Inc. Dual license: MIT and/or GPLv2 */(function(a,b){function f(){var e="scrollTop"in a.document.body?a.document.body.scrollTop:a.document.documentElement.scrollTop;if(e!==b&&e>0&&a.document.body){a.document.body.insertBefore(d,a.document.body.firstChild);if(!d.getBoundingClientRect||d.getBoundingClientRect().top!==0)a.document.documentElement.className=a.document.documentElement.className.replace(c,"");a.document.body.removeChild(d),a.removeEventListener?a.removeEventListener("scroll",f,!1):a.detachEvent("onscroll",f)}}var c="fixed-supported",d=a.document.createElement("div"),e=a.navigator.userAgent;d.style.position="fixed",d.style.top=0;if(!(e.match(/Android 2\.[1256]/)&&e.indexOf("AppleWebKit")>-1)||!(e.match(/Opera Mobi\/([0-9]+)/)&&RegExp.$1<7458)||!a.operamini||{}.toString.call(a.operamini)!=="[object OperaMini]"||!(e.match(/Fennec\/([0-9]+)/)&&RegExp.$1<6))a.document.documentElement.className+=" "+c,a.addEventListener?a.addEventListener("scroll",f,!1):a.attachEvent("onscroll",f)})(this)