var ZL = {
	getDistFolder: function() {
		var distMeta = document.querySelector( 'meta[name="dist"]' );

		return distMeta ? distMeta.content : '';
	}
};

;(function( w ) {
	if( !( 'geolocation' in navigator ) || !w.opener ) {
		return;
	}

	// only do it 3 times max
	// if( !localStorage.targetBlankEducated ) {
	// 	localStorage.targetBlankEducated = 0;
	// 	return;
	// }

	// if( localStorage.targetBlankEducated < 3 ) {
		w.opener.location= ( w.location.origin || "https://www.zachleat.com" ) + "/web/refer/?from=" + encodeURI( document.referrer );
	// 	localStorage.targetBlankEducated++;
	// }
})( window );

;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var templateName = doc.querySelector( 'meta[name="template"]' );
	var classes = [ "enhanced-js" ];

	if( templateName ) {
		classes.push( "tmpl-" + templateName.content );
	}
	// gradient inference
	if( 'matchMedia' in window ) {
		classes.push( "has-gradient" );
	}

	// Fonts
	if( sessionStorage.webfontStageOne && sessionStorage.webfontStageTwo ) {
		// Don’t push this class, webfont-stage-1 is just for the subset font (since full roman is layered on top, we don’t need it)
		// classes.push( "webfont-stage-1" );
		classes.push( "webfont-stage-2" );
	}

	document.documentElement.className += " " + classes.join( " " );
})( document );

