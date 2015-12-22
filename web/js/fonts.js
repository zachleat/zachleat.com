/* Fonts */
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var docEl = doc.documentElement;

	if( sessionStorage.latoStageOne && sessionStorage.latoStageTwo ) {

	} else {
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
				var name;
				var param;
				var success = (function() {
					var numberOfFonts = 0;
					for( var name in stage2 ) {
						numberOfFonts++;
					}

					return function() {
						counter++;
						if( counter === numberOfFonts ) {
							docEl.className += " lato-b-loaded";
							sessionStorage.latoStageTwo = true;
						}
					};
				})();

				for( var name in stage2 ) {
					param = stage2[ name ];
					param.success = success;
					FontFaceOnload( name, param );
				}
			}
		});
		
	}

})( document );