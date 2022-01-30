var ZL = {
	getDistFolder: function() {
		var distMeta = document.querySelector( 'meta[name="dist"]' );

		return distMeta ? distMeta.content : '';
	},
	// Font loading Radio select emulator in footer
	setEmulatorRadioValue: function( value ) {
		var radios = document.querySelectorAll( '#fontloademu [name="fontloademu"]' );
		for( var j = 0, k = radios.length; j < k; j++ ) {
			radios[ j ].checked = value === radios[ j ].value;
		}
	}
};

;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var classes = [ "enhanced-js" ];

	document.documentElement.className += " " + classes.join( " " );
})( document );

