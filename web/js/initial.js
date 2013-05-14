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

function isEnhancedExperience() {
	return 'querySelectorAll' in document;
}

(function( doc ) {
	if( !isEnhancedExperience() ) {
		return;
	}
	var withJs = ' with-js',
		distMeta = doc.querySelector( 'meta[name="dist"]' ),
		distFolder = distMeta ? distMeta.content : '';

	document.documentElement.className += withJs;

	// Google Web Font
	injectCss( 'http://fonts.googleapis.com/css?family=Bitter:700' );

	// Zurb Foundation Social Icons
	injectCss( distFolder + 'icons.min.css' );

	// I Live in Omaha Banner
	var iliveinomaha = doc.createElement( 'div' );
	iliveinomaha.className = 'iliveinomaha';
	iliveinomaha.innerHTML = '<a href="http://iliveinomaha.com"><img src="/web/img/iliveinomaha.gif" alt="I live in Omaha."></a>';
	doc.body.appendChild( iliveinomaha );

	// Filter Posts Menu
	var filter = doc.getElementById( 'post-filter' ),
		filterForm = doc.getElementById( 'post-filter-form' ),
		posts = doc.getElementById( 'main-posts-list' ),
		initialClassName = '';

	function updateFilter() {
		posts.className = initialClassName + ' ' + filter.options[ filter.selectedIndex ].value;
	}

	if( filter && posts && 'addEventListener' in doc ) {
		filterForm.className += withJs;
		initialClassName = posts.className;
		updateFilter();
		filter.addEventListener( 'change', updateFilter, false );
	}
})( document );

// Disqus Comments
var disqus_shortname = 'web367';

(function() {
	if( !isEnhancedExperience() ) {
		return;
	}

	if( document.getElementById( 'disqus_thread' ) ) {
		var dsq = document.createElement('script');
		dsq.type = 'text/javascript';
		dsq.async = true;
		dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	}
})();

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