/* Icons */

// Grunticon
;(function( doc ) {
	// IE8+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var distFolder = ZL.getDistFolder();
	// grunticon.loadCSS( distFolder + "icons/icons.data.svg.css" ).onloadcssdefined(function() {
	// 	// only switches the icons on after they’ve loaded
	// 	doc.documentElement.className += " grunticon";
	// });
	grunticon( [ distFolder + "icons/icons.data.svg.css",
		distFolder + "icons/icons.data.png.css",
		distFolder + "icons/icons.fallback.css" ] );

})( document );

// Load Defer JS and CSS
;(function( doc ) {
	// IE8+
	if( 'querySelector' in doc ) {
		grunticon.loadCSS( ZL.getDistFolder() + "defer.min.css" );
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

	// Filter Posts Menu
	var filter = doc.getElementById( 'post-filter' );
	var posts = doc.getElementById( 'main-posts-list' );

	function updateFilter() {
		if( !filter.checked ) {
			posts.classList.remove( "all" );
			posts.classList.add( "deprecated" );
		} else {
			posts.classList.remove( "deprecated" );
			posts.classList.add( "all" );
		}
	}

	if( filter && posts && ( "classList" in posts ) ) {
		posts.classList.add( "enhanced" );

		updateFilter();
		filter.addEventListener( 'change', updateFilter, false );
	}
})( document );