/* Fonts */
;(function( doc ) {
	if( !( "fonts" in document ) ) {
		return;
	} else if( sessionStorage.webfontStageOne && sessionStorage.webfontStageTwo ) {
		// a little leaky here
		ZL.setEmulatorRadioValue( "" );
		return;
	}

	var docEl = doc.documentElement;
	document.fonts.load("1em LatoSubset").then(function() {
		docEl.classList.add( "webfont-stage-1" );
		sessionStorage.webfontStageOne = true;

		ZL.setEmulatorRadioValue( "font-latosubset" );

		Promise.all([
			document.fonts.load("1em Lato"),
			document.fonts.load("700 1em LatoBold"),
			document.fonts.load("italic 1em LatoItalic"),
			document.fonts.load("italic 700 1em LatoBoldItalic")
		]).then(function () {
			docEl.classList.add( "webfont-stage-2" );
			sessionStorage.webfontStageTwo = true;

			ZL.setEmulatorRadioValue( "" );
		});
	});

})( document );