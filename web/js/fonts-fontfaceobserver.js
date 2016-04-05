/* Fonts */
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ||
		sessionStorage.webfontStage1 && sessionStorage.webfontStage2 ) {
		return;
	}

	var docEl = doc.documentElement;
	var observer = new FontFaceObserver( "LatoSubset", {
		weight: 400
	});

	observer.check().then(function () {
		docEl.className += " webfont-stage-1";
		sessionStorage.webfontStage1 = true;

		Promise.all([
			(new FontFaceObserver( "Lato", {
				weight: 400
			})).check(),
			(new FontFaceObserver( "LatoBold", {
				weight: 700
			})).check(),
			(new FontFaceObserver( "LatoItalic", {
				style: "italic"
			})).check(),
			(new FontFaceObserver( "LatoBoldItalic", {
				weight: 700,
				style: "italic"
			})).check(),
		]).then(function () {
			docEl.className += " webfont-stage-2";
			sessionStorage.webfontStage2 = true;
		});
	});

})( document );