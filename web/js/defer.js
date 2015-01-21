// Grunticon
;(function( doc ) {
	// IE8+
	if( !( 'querySelector' in doc ) ) {
		return;
	}

	var distFolder = ZL.getDistFolder();

	/* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
	;(function(e){"use strict";var t=e.document,n=e.navigator,a=e.Image,r=!(!t.createElementNS||!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||e.opera&&-1===n.userAgent.indexOf("Chrome")||-1!==n.userAgent.indexOf("Series40")),o=function(n,a){a=a||function(){};var r=t.createElement("link"),o=t.getElementsByTagName("script")[0];r.rel="stylesheet",r.href=n,r.media="only x",r.onload=a,o.parentNode.insertBefore(r,o),e.setTimeout(function(){r.media="all"})},i=function(e,n){if(e&&3===e.length){var A=new a;A.onerror=function(){i.method="png",o(e[2])},A.onload=function(){var t=1===A.width&&1===A.height,a=e[t&&r?0:t?1:2];i.method=t&&r?"svg":t?"datapng":"png",i.href=a,o(a,n)},A.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",t.documentElement.className=t.documentElement.className+" grunticon"}};i.loadCSS=o,e.grunticon=i})(this);

	grunticon( [ distFolder + "icons/icons.data.svg.css",
		distFolder + "icons/icons.data.png.css",
		distFolder + "icons/icons.fallback.css" ] );

})( document );

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-588046-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();

// Disqus Comments
var disqus_shortname = 'web367';

;(function() {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	if( document.getElementById( 'disqus_thread' ) ) {
		var dsq = document.createElement('script');
		dsq.type = 'text/javascript';
		dsq.async = true;
		dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	}
})();

// Twitter Follow Button
;(function( doc ) {
	// IE9+ and not on the home page.
	if( !( 'geolocation' in navigator ) || !doc.querySelector( 'meta[name="template"][content="page"]' ) ) {
		return;
	}

	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
})( document );