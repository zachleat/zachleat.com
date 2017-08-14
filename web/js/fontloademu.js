(function() {
	// Font Loading Emulator (in the footer)
	var fontloademu = document.getElementById( 'fontloademu' );
	if( !fontloademu ) {
		return;
	}

	// JS form, enabled with JS.
	fontloademu.style.display = "block";

	var radios = fontloademu.querySelectorAll( '[name="fontloademu"]' );
	var classes = [];

	for( var j = 0, k = radios.length; j < k; j++ ) {
		classes.push( radios[ j ].value );

		radios[ j ].addEventListener( 'change', function() {
			var docEl = document.documentElement;
			classes.forEach(function( cls ) {
				if( cls ) {
					docEl.classList.remove( cls );
				}
			});

			if( this.value && this.checked ) {
				docEl.classList.add( this.value );
			}
		}, false);
	}
})();