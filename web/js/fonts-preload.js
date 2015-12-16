/* Preload fonts */
;(function( doc ) {
	// IE9+
	if( !( 'requestAnimationFrame' in window ) ) {
		return;
	}

	function printFontStatus() {
		console.group();
		document.fonts.forEach(function(font) {
			console.log(font.family, font.status);
		});
		console.groupEnd();
	}

	var preload = {
		"LatoSubset": true,
		// "Lato": true,
		// "LatoBold": true,
		// "LatoItalic": true,
		// "LatoBoldItalic": true
	};

	function loadFont( family, str ) {
		var el = document.createElement( "font" );
		el.style.fontFamily = family;
		el.innerHTML = str || "Ab"; // non-empty
		doc.body.appendChild( el );
		el.offsetWidth;
		printFontStatus();
		doc.body.removeChild( el );
	}

	if( "fonts" in doc ) {
		doc.fonts.forEach(function( font ) {
			// Firefox has quotes in the family name
			if( preload[ font.family.replace( /[\'\"]/g, '' ) ] ) {
				font.load();
				printFontStatus();
			}
		});
	} else {
		for( var j in preload ) {
			;(function() {
				var family = preload[ j ];
				requestAnimationFrame(function() {
					loadFont( family );
				});
			})();
		}
	}

})( document );