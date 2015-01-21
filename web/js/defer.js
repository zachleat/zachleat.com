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