;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var classes = [ "enhanced-js" ];

	document.documentElement.className += " " + classes.join( " " );
})( document );

