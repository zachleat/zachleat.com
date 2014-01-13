function isEnhancedExperience() {
	return 'querySelectorAll' in document;
}

;(function( doc ) {
	if( !isEnhancedExperience() ) {
		return;
	}

	var withJs = ' with-js',
		distMeta = doc.querySelector( 'meta[name="dist"]' ),
		distFolder = distMeta ? distMeta.content : '';

	document.documentElement.className += withJs;

	// grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license.
	window.grunticon = function( css, foo ){
		// expects a css array with 3 items representing CSS paths to datasvg, datapng, urlpng
		if( !css || css.length !== 3 ){
			return;
		}

		// Thanks Modernizr & Erik Dahlstrom
		var w = window,
			svg = !!w.document.createElementNS && !!w.document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect && !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"),

			loadCSS = function( data ){
				var link = w.document.createElement( "link" ),
					ref = w.document.getElementsByTagName( "script" )[ 0 ];
				link.rel = "stylesheet";
				link.href = css[ data && svg ? 0 : data ? 1 : 2 ];
				ref.parentNode.insertBefore( link, ref );
			},

			// Thanks Modernizr
			img = new w.Image();

			img.onerror = function(){
				loadCSS( false );
			};

			img.onload = function(){
				loadCSS( img.width === 1 && img.height === 1 );
			};

			img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	};

	grunticon( [ distFolder + "icons/icons.data.svg.css",
		distFolder + "icons/icons.data.png.css",
		distFolder + "icons/icons.fallback.css" ] );

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

;(function() {
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

// TypeKit
;(function() {
	if( !isEnhancedExperience() ) {
		return;
	}

	var config = {
		kitId: 'lhh1seg',
		scriptTimeout: 3000
	};
	var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s);
})();

// Twitter Follow Button
;(function() {
	if( !isEnhancedExperience() || !document.querySelectorAll( '.twitter-follow' ).length ) {
		return;
	}

	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
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