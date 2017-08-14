/* Fonts */
;(function( doc ) {
	// Radio select emulator in footer
	function setEmulatorRadioValue( value ) {
		var radios = document.querySelectorAll( '#fontloademu [name="fontloademu"]' );
		for( var j = 0, k = radios.length; j < k; j++ ) {
			radios[ j ].checked = value === radios[ j ].value;
		}
	}

	// IE9+
	if( !( 'geolocation' in navigator ) || !( "keys" in Object ) ) {
		return;
	} else if( sessionStorage.webfontStageOne && sessionStorage.webfontStageTwo ) {
		document.addEventListener( "DOMContentLoaded", function() {
			setEmulatorRadioValue( "" );
		}, false );

		return;
	}

	setEmulatorRadioValue( "font-fallback" );

	var docEl = doc.documentElement;
	FontFaceOnload( "LatoSubset", {
		success: function() {
			docEl.className += " webfont-stage-1";
			sessionStorage.webfontStageOne = true;

			setEmulatorRadioValue( "font-latosubset" );

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

					setEmulatorRadioValue( "" );
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