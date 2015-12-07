;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	// Hamburger Icon
	if( 'requestAnimationFrame' in window ) {

		function getDocHeight() {
			var body = doc.body;
			var html = doc.documentElement;

			return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
		}

		function getDocWidth() {
			var body = doc.body;
			var html = doc.documentElement;

			return Math.max( body.offsetWidth, html.clientWidth, html.offsetWidth );
		}

		function getRand( min, max ) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		var state = 0;
		var docHeight;
		var docWidth;
		var icon = doc.getElementById( 'hamburger' );
		icon.className += ' enabled';

		function addLayer() {
			if( !docHeight ) {
				docHeight = getDocHeight();
			}
			var node = doc.createElement( 'div' );
			node.className = 'beforeanimate';
			icon.appendChild( node );
			icon.offsetWidth;
			node.className = '';

			if( !!state ) {
				if( icon.offsetHeight < docHeight - 20 ) {
					requestAnimationFrame( addLayer );
				} // else trigger complete
			}
		}

		icon.addEventListener( 'click', function() {
			if( state > 2 ) {
				state = 0;

				// reset
				requestAnimationFrame(function() {
					icon.innerHTML = '<div></div><div></div><div></div>';
				});
				icon.className = 'hamburger enabled';
			} else if( state === 2 ) {
				state++;
				var bars = icon.childNodes;
				for( var j = 0, k = bars.length; j < k; j++ ) {
					bars[ j ].style.transform = 'none';
				}
			} else if( state === 1 ) {
				state++;
				var bars = icon.childNodes;

				if( !docWidth ) {
					docWidth = getDocWidth();
				}

				for( var j = 0, k = bars.length; j < k; j++ ) {
					(function() {
						var bar = bars[ j ];
						requestAnimationFrame(function() {
							var x = getRand( -1*docWidth + 16, 16 );
							var y = getRand( -40, 40 );
							var rotate = getRand( -180, 180 );
							var scale = Math.random() * 2;
							var transform = 'translateX(' + x + 'px) translateY(' + y + 'px) rotate(' + rotate + 'deg)';
							bar.style.transform = transform;
						});
					})();
				}
			} else {
				state = 1;
				icon.innerHTML = '';
				requestAnimationFrame( addLayer );
			}
		}, false );
	}
})( document );
