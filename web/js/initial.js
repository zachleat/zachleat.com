var ZL = {
	getDistFolder: function() {
		var distMeta = document.querySelector( 'meta[name="dist"]' );

		return distMeta ? distMeta.content : '';
	}
};

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

