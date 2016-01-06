/* Fonts */
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ||
		!( "keys" in Object ) ||
		sessionStorage.latoStageOne && sessionStorage.latoStageTwo ) {
		return;
	}

	var docEl = doc.documentElement;

	FontFaceOnload( "LatoSubset", {
		success: function() {
			docEl.className += " lato-loaded";
			sessionStorage.latoStageOne = true;

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
					docEl.className += " lato-b-loaded";
					sessionStorage.latoStageTwo = true;
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