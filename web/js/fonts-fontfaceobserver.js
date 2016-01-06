/* Fonts */
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ||
		sessionStorage.latoStageOne && sessionStorage.latoStageTwo ) {
		return;
	}

	var docEl = doc.documentElement;
	var observer = new FontFaceObserver( "LatoSubset", {
		weight: 400
	});

	observer.check().then(function () {
		docEl.className += " lato-loaded";
		sessionStorage.latoStageOne = true;

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
			docEl.className += " lato-b-loaded";
			sessionStorage.latoStageTwo = true;
		});
	});

})( document );