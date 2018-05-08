/* Icons */

;(function( doc ) {
	// IE9+, Android 2.3+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var distFolder = ZL.getMeta( 'dist' );
	// grunticon.loadCSS( distFolder + "icons/icons.data.svg.css" ).onloadcssdefined(function() {
	// 	// only switches the icons on after they’ve loaded
	// 	doc.documentElement.className += " grunticon";
	// });
	grunticon( [ distFolder + "icons/icons.data.svg.css",
		distFolder + "icons/icons.data.png.css",
		distFolder + "icons/icons.fallback.css" ] );

	var icons = ZL.getMeta( "icons" );
	if( icons === "browserlogos" ) {
		grunticon( [ distFolder + "browserlogos/icons.data.svg.css",
			distFolder + "browserlogos/icons.data.png.css",
			distFolder + "browserlogos/icons.fallback.css" ]);
	}

})( document );

// Load Defer JS and CSS
;(function( doc ) {
	// IE8+
	if( 'querySelector' in doc ) {
		var distFolder = ZL.getMeta( 'dist' );
		grunticon.loadCSS( distFolder + "defer.min.css" );
		loadJS( distFolder + "defer.min.js" );
	}
})( document );

// Template JS
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	/* Fake w3c banner */
	var banner = ' w3c-b ' + [ 'ud', 'wd', 'cr', 'pr', 'r', 'wgn', 'ign', 'ed' ][ Math.floor( Math.random() * 8 ) ];
	document.documentElement.className += banner;
	document.documentElement.setAttribute( "data-w3c-banner-label", "Non-canonical web standards fan fiction" );

	// Filter Posts Menu
	var filter = doc.getElementById( 'post-filter' ),
		filterForm = doc.getElementById( 'post-filter-form' ),
		posts = doc.getElementById( 'main-posts-list' ),
		initialClassName = '';

	function updateFilter() {
		posts.className = initialClassName + ' ' + filter.options[ filter.selectedIndex ].value;
	}

	if( filter && posts && 'addEventListener' in doc ) {
		initialClassName = posts.className + ' enhanced';
		updateFilter();
		filter.addEventListener( 'change', updateFilter, false );
	}
})( document );