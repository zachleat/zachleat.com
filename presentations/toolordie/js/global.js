;(function( w ) {
	"use strict";

	if( !("getElementsByClassName" in document) || ( window.blackberry && !window.WebKitPoint ) ) {
		return;
	}

	// Keyboard Navigation
	document.addEventListener( 'keydown', function( event ) {
		if( event.keyCode == 37 ) {
			history.back();
		}

		if( event.keyCode == 39 ) {
			document.querySelector( '.next' ).click();
		}
	});

	// Google Web Fonts
	w.WebFontConfig = {
		google: { families: [ 'Bitter:400,700:latin' ] }
	};
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);

})( window );