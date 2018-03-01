// Twitter Follow Button
;(function( doc ) {
	// IE9+ and not on the home page.
	if( !( 'geolocation' in navigator ) || !doc.querySelector( 'meta[name="template"][content="page"]' ) ) {
		return;
	}

	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
})( document );