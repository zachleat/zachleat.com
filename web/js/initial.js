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
	if( sessionStorage.latoStageOne && sessionStorage.latoStageTwo ) {
		// Don’t push this class, lato-loaded is just for the subset font (we don’t need it)
		// classes.push( "lato-loaded" );
		classes.push( "lato-b-loaded" );
	}

	document.documentElement.className += " " + classes.join( " " );
})( document );

