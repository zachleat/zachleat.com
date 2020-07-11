/* Icons */

// Load Defer JS
;(function( doc ) {
	// IE8+
	if( 'querySelector' in doc ) {
		loadJS( ZL.getDistFolder() + "defer.min.js" );
	}
})( document );

// Template JS
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var templateName = doc.querySelector( 'meta[name="template"]' );

	/* Fake w3c banner */
	var banner = ' w3c-b ' + [ 'ud', 'wd', 'cr', 'pr', 'r', 'wgn', 'ign', 'ed' ][ Math.floor( Math.random() * 8 ) ];
	document.documentElement.className += banner;
	document.documentElement.setAttribute( "data-w3c-banner-label", "Non-canonical web standards fan fiction" );
})( document );