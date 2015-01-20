;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var templateName = doc.querySelector( 'meta[name="template"]' );

	/* Fake w3c banner */
	var banner = ' w3c-b ' + [ 'ud', 'wd', 'cr', 'pr', 'r', 'wgn', 'ign', 'ed' ][ Math.floor( Math.random() * 8 ) ];

	document.documentElement.className += ' enhanced-js' +
		( templateName ? " tmpl-" + templateName.content : "" ) +
		// gradient inference
		( 'matchMedia' in window ? " has-gradient" : "" ) + 
		banner;

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
})( document );

// Fonts
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	/*! fontfaceonload - v0.1.4 - 2015-01-01
	 * https://github.com/zachleat/fontfaceonload
	 * Copyright (c) 2015 Zach Leatherman (@zachleat)
	 * MIT License */
	;(function(e,t){"use strict";var n="AxmTYklsjo190QW",r="sans-serif",i="serif",s={tolerance:2,delay:100,glyphs:"",success:function(){},error:function(){},timeout:5e3},o=["display:block","position:absolute","top:-999px","left:-999px","font-size:48px","width:auto","height:auto","line-height:normal","margin:0","padding:0","font-variant:normal","white-space:nowrap"],u='<div style="%s">'+n+"</div>",a=function(){this.fontFamily="",this.appended=!1,this.serif=undefined,this.sansSerif=undefined,this.parent=undefined,this.options={}};a.prototype.getMeasurements=function(){return{sansSerif:{width:this.sansSerif.offsetWidth,height:this.sansSerif.offsetHeight},serif:{width:this.serif.offsetWidth,height:this.serif.offsetHeight}}},a.prototype.load=function(){function g(e,t,n){return Math.abs(e.width-t.offsetWidth)>n||Math.abs(e.height-t.offsetHeight)>n}function y(){return(new Date).getTime()-n.getTime()>p.timeout}var n=new Date,s=this,a=s.serif,f=s.sansSerif,l=s.parent,c=s.appended,h,p=this.options,d=p.reference,v=u.replace(/\%s/,o.concat("font-family:"+r).join(";")),m=u.replace(/\%s/,o.concat("font-family:"+i).join(";"));l||(l=s.parent=t.createElement("div")),l.innerHTML=v+m,f=s.sansSerif=l.firstChild,a=s.serif=f.nextSibling,p.glyphs&&(f.innerHTML+=p.glyphs,a.innerHTML+=p.glyphs),function b(){d||(d=t.body),!c&&d&&(d.appendChild(l),c=s.appended=!0,h=s.getMeasurements(),f.style.fontFamily=s.fontFamily+", "+r,a.style.fontFamily=s.fontFamily+", "+i),c&&h&&(g(h.sansSerif,f,p.tolerance)||g(h.serif,a,p.tolerance))?p.success():y()?p.error():!c&&"requestAnimationFrame"in window?e.requestAnimationFrame(b):e.setTimeout(b,p.delay)}()},a.prototype.checkFontFaces=function(n){var r=this;t.fonts.forEach(function(t){t.family.toLowerCase()===r.fontFamily.toLowerCase()&&t.load().then(function(){r.options.success(),e.clearTimeout(n)})})},a.prototype.init=function(n,r){var i;for(var o in s)r.hasOwnProperty(o)||(r[o]=s[o]);this.options=r,this.fontFamily=n,!r.glyphs&&"fonts"in t?(r.timeout&&(i=e.setTimeout(function(){r.error()},r.timeout)),this.checkFontFaces(i)):this.load()};var f=function(e,t){var n=new a;return n.init(e,t),n};e.FontFaceOnload=f})(this,this.document);

	var distMeta = doc.querySelector( 'meta[name="dist"]' ),
		distFolder = distMeta ? distMeta.content : '';

	FontFaceOnload( "Lato", {
		success: function() {
			doc.documentElement.className += " lato-loaded";

			// Don’t use loadCSS for this, the media switching was
			// breaking the font repaint
			var ss = doc.createElement( "link" );
			var ref = doc.head || doc.getElementsByTagName( "head" )[ 0 ];
			ss.rel = "stylesheet";
			ss.href = distFolder + "fonts-defer.css";
			ref.appendChild( ss, ref );
		}
	});

})( document );

// Grunticon
;(function( doc ) {
	// IE8+
	if( !( 'querySelector' in doc ) ) {
		return;
	}

	var distMeta = doc.querySelector( 'meta[name="dist"]' ),
		distFolder = distMeta ? distMeta.content : '';

	/* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
	;(function(e){"use strict";var t=e.document,n=e.navigator,a=e.Image,r=!(!t.createElementNS||!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||e.opera&&-1===n.userAgent.indexOf("Chrome")||-1!==n.userAgent.indexOf("Series40")),o=function(n,a){a=a||function(){};var r=t.createElement("link"),o=t.getElementsByTagName("script")[0];r.rel="stylesheet",r.href=n,r.media="only x",r.onload=a,o.parentNode.insertBefore(r,o),e.setTimeout(function(){r.media="all"})},i=function(e,n){if(e&&3===e.length){var A=new a;A.onerror=function(){i.method="png",o(e[2])},A.onload=function(){var t=1===A.width&&1===A.height,a=e[t&&r?0:t?1:2];i.method=t&&r?"svg":t?"datapng":"png",i.href=a,o(a,n)},A.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",t.documentElement.className=t.documentElement.className+" grunticon"}};i.loadCSS=o,e.grunticon=i})(this);

	grunticon( [ distFolder + "icons/icons.data.svg.css",
		distFolder + "icons/icons.data.png.css",
		distFolder + "icons/icons.fallback.css" ] );

})( document );

// Disqus Comments
var disqus_shortname = 'web367';

;(function() {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
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

// Twitter Follow Button
;(function( doc ) {
	// IE9+ and not on the home page.
	if( !( 'geolocation' in navigator ) || !doc.querySelector( 'meta[name="template"][content="page"]' ) ) {
		return;
	}

	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
})( document );

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-588046-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();