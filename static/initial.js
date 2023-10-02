;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var classes = [ "enhanced-js" ];

	document.documentElement.className += " " + classes.join( " " );

	// home-made analytics (elizabeacon) 😅
	if(location.hostname === "www.zachleat.com") {
		navigator.sendBeacon("https://subtle-yeot-bd8178.netlify.app/", JSON.stringify({
			path: location.pathname
		}));
	}
})( document );

