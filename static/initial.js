/*! zachleat.com - v2.6.1 - 2022-12-22
* Copyright (c) 2022 Zach Leatherman; @license MIT License */
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var classes = [ "enhanced-js" ];

	document.documentElement.className += " " + classes.join( " " );
})( document );

