function injectCss( href ) {
	var link = document.createElement( 'link' ),
		head = document.head || document.getElementsByTagName( 'head' )[ 0 ];

	link.setAttribute( 'href', href );
	link.setAttribute( 'rel', 'stylesheet' );
	head.appendChild( link );
}

function injectJs( src ) {
	var script = document.createElement( 'script' ),
		head = document.head || document.getElementsByTagName( 'head' )[ 0 ];

	script.setAttribute( 'src', src );
	head.appendChild( script );
}

(function( doc ) {
	if( !( 'querySelectorAll' in doc ) ) {
		return;
	}

	injectCss( 'http://fonts.googleapis.com/css?family=Bitter:700' );
	injectCss( '/web/dist/icons.min.css' );

	var iliveinomaha = doc.createElement( 'div' );
	iliveinomaha.className = 'iliveinomaha';
	iliveinomaha.innerHTML = '<a href="http://iliveinomaha.com"><img src="/web/img/iliveinomaha.gif" alt="I live in Omaha."></a>';
	doc.body.appendChild( iliveinomaha );
})( document );

// Google Analytics
//
// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', '']);
// _gaq.push(['_trackPageview']);

// (function() {
// 	var ga = document.createElement('script');
// 	ga.type = 'text/javascript';
// 	ga.async = true;
// 	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
// 	var s = document.getElementsByTagName('script')[0];
// 	s.parentNode.insertBefore(ga, s);
// })();