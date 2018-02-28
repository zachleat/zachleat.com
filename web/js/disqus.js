// Disqus Comments
var disqus_shortname = 'web367';

;(function() {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	// Only fetch if the ID for disqus comments exists.
	var loaderBtn = document.getElementById( 'disqus-loader' );
	if( loaderBtn && "addEventListener" in window ) {
		loaderBtn.addEventListener("click", function(e) {
			e.preventDefault();

			var dsq = document.createElement('script');
			dsq.type = 'text/javascript';
			dsq.async = true;
			dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
			(document.head || document.body).appendChild(dsq);
		}, false);
	}
})();