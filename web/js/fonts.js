/* Fonts */
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ||
		!( "keys" in Object ) ||
		sessionStorage.webfontStageOne && sessionStorage.webfontStageTwo ) {
		return;
	}

	var docEl = doc.documentElement;
console.log( 'test' );
	FontFaceOnload( "LatoSubset", {
		success: function() {
			docEl.className += " webfont-stage-1";
			sessionStorage.webfontStageOne = true;

			var stage2 = {
				Lato: {},
				LatoBold: {
					weight: 700
				},
				LatoItalic: {
					style: "italic"
				},
				LatoBoldItalic: {
					weight: 700,
					style: "italic"
				}
			};
			var counter = 0;
			var param;
			var numberOfFonts = Object.keys( stage2 ).length;
			var success = function() {
				counter++;
				if( counter === numberOfFonts ) {
					docEl.className += " webfont-stage-2";
					sessionStorage.webfontStageTwo = true;
				}
			};

			for( var name in stage2 ) {
				param = stage2[ name ];
				param.success = success;
				FontFaceOnload( name, param );
			}
		}
	});

})( document );