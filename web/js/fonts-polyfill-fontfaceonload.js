/* Fonts */
;(function( doc ) {
	if( "fonts" in document ||
		navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.state === "activated" ||
		sessionStorage.webfontStageOne && sessionStorage.webfontStageTwo ) {
		return;
	}

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
			// Currently emulating `font-display: optional`, don’t add any classes
			sessionStorage.webfontStageOne = true;
			sessionStorage.webfontStageTwo = true;
		}
	};

	for( var name in stage2 ) {
		param = stage2[ name ];
		param.success = success;
		FontFaceOnload( name, param );
	}

})( document );