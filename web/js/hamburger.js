;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var templateName = doc.querySelector( 'meta[name="template"]' );

	/* Fake w3c banner */
	var banner = ' w3c-b ' + [ 'ud', 'wd', 'cr', 'pr', 'r', 'wgn', 'ign', 'ed' ][ Math.floor( Math.random() * 8 ) ];
	document.documentElement.className += banner;

	// Filter Posts Menu
	var filter = doc.getElementById( 'post-filter' ),
		filterForm = doc.getElementById( 'post-filter-form' ),
		posts = doc.getElementById( 'main-posts-list' ),
		initialClassName = '';

	function updateFilter() {
		posts.className = initialClassName + ' ' + filter.options[ filter.selectedIndex ].value;
	}

	if( filter && posts && 'addEventListener' in doc ) {
		initialClassName = posts.className;
		updateFilter();
		filter.addEventListener( 'change', updateFilter, false );
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

		var active;
		var docHeight;
		var docWidth;
		var icon = doc.getElementById( 'hamburger' );
		icon.className += ' enabled';

		function addLayer() {
			if( !docHeight ) {
				docHeight = getDocHeight();
			}
			if( !docWidth ) {
				docWidth = getDocWidth();
			}
			var node = doc.createElement( 'div' );
			node.className = 'beforeanimate';
			icon.appendChild( node );
			icon.offsetWidth;
			node.className = '';

			// window.setTimeout(function() {
			// 	var x = getRand( -1*docWidth + 16, 16 );
			// 	var y = getRand( -40, 40 );
			// 	var rotate = getRand( -180, 180 );
			// 	var scale = Math.random() * 2;
			// 	var transform = 'translateX(' + x + 'px) translateY(' + y + 'px) rotate(' + rotate + 'deg)';
			// 	node.style.transform = transform;
			// }, 400 );

			if( active ) {
				if( icon.offsetHeight < docHeight - 20 ) {
					requestAnimationFrame( addLayer );
				} // else trigger complete
			}
		}

		icon.addEventListener( 'click', function() {
			if( active ) {
				active = false;

				// reset
				requestAnimationFrame(function() {
					icon.innerHTML = "<div></div><div></div><div></div>";
				});
			} else {
				active = true;
				icon.innerHTML = '';
				requestAnimationFrame( addLayer );
			}
		}, false );
	}
})( document );
