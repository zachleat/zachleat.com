/* Fonts */
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) || !( "keys" in Object ) ) {
		return;
	}

	var docEl = doc.documentElement;
	var timer = new Date();
	var WAIT_TIME = 3000;

	function firstStageSuccess() {
		docEl.className += " webfont-stage-1";

		var stage2 = {
			ComicNeueBold: {
				weight: 700
			},
			ComicNeueItalic: {
				weight: 300,
				style: "italic"
			},
			ComicNeueBoldItalic: {
				weight: 700,
				style: "italic"
			}
		};
		var counter = 0;
		var param;
		var numberOfFonts = Object.keys( stage2 ).length;
		var secondStageSuccess = function() {
			counter++;
			if( counter === numberOfFonts ) {
				docEl.className += " webfont-stage-2";
				sessionStorage.webfontStageTwo = true;
			}
		};

		for( var name in stage2 ) {
			param = stage2[ name ];
			param.success = secondStageSuccess;
			FontFaceOnload( name, param );
		}
	}

	FontFaceOnload( "ComicNeue", {
		weight: 300,
		success: function() {
			var offset = new Date() - timer;
			var left = WAIT_TIME - offset;
			if( left > 0 ) {
				setTimeout( firstStageSuccess, left );
			} else {
				firstStageSuccess();
			}
		}
	});

})( document );