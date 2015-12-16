/* Fonts */
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var docEl = doc.documentElement;

	if( !sessionStorage.latoStageOne || !sessionStorage.latoStageTwo ) {
		// FontFaceOnload( "Lato", {
		FontFaceOnload( "LatoSubset", {
			error: function() {},
			success: function() {
				docEl.className += " lato-loaded";
				sessionStorage.latoStageOne = true;

				var counter = 0;
				var success = function() {
					counter++;
					// if( counter === 3 ) {
					if( counter === 4 ) {
						docEl.className += " lato-b-loaded";
						sessionStorage.latoStageTwo = true;
					}
				};

				FontFaceOnload( "Lato", {
					success: success
				});
				FontFaceOnload( "LatoBold", {
					weight: 700,
					success: success
				});
				FontFaceOnload( "LatoItalic", {
					style: 'italic',
					success: success
				});
				FontFaceOnload( "LatoBoldItalic", {
					weight: 700,
					style: 'italic',
					success: success
				});
			}
		});
		
	}

})( document );