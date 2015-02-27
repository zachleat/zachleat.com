var ZL = {
	getDistFolder: function() {
		var distMeta = document.querySelector( 'meta[name="dist"]' );

		return distMeta ? distMeta.content : '';
	}
};

;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var templateName = doc.querySelector( 'meta[name="template"]' );
	document.documentElement.className += ' enhanced-js' +
		( templateName ? " tmpl-" + templateName.content : "" ) +
		// gradient inference
		( 'matchMedia' in window ? " has-gradient" : "" );
})( document );

// Fonts
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	// TODO import this using npm and grunt

/*! fontfaceonload - v0.1.4 - 2015-01-23
 * https://github.com/zachleat/fontfaceonload
 * Copyright (c) 2015 Zach Leatherman (@zachleat)
 * MIT License */(function(e,t){"use strict";var n="AxmTYklsjo190QW",r="sans-serif",i="serif",s={tolerance:2,delay:100,glyphs:"",success:function(){},error:function(){},timeout:5e3,weight:"400",style:"normal"},o=["display:block","position:absolute","top:-999px","left:-999px","font-size:48px","width:auto","height:auto","line-height:normal","margin:0","padding:0","font-variant:normal","white-space:nowrap"],u='<div style="%s">'+n+"</div>",a=function(){this.fontFamily="",this.appended=!1,this.serif=undefined,this.sansSerif=undefined,this.parent=undefined,this.options={}};a.prototype.getMeasurements=function(){return{sansSerif:{width:this.sansSerif.offsetWidth,height:this.sansSerif.offsetHeight},serif:{width:this.serif.offsetWidth,height:this.serif.offsetHeight}}},a.prototype.load=function(){function v(e){return o.concat(["font-weight:"+p.weight,"font-style:"+p.style]).concat("font-family:"+e).join(";")}function y(e,t,n){return Math.abs(e.width-t.offsetWidth)>n||Math.abs(e.height-t.offsetHeight)>n}function b(){return(new Date).getTime()-n.getTime()>p.timeout}var n=new Date,s=this,a=s.serif,f=s.sansSerif,l=s.parent,c=s.appended,h,p=this.options,d=p.reference,m=u.replace(/\%s/,v(r)),g=u.replace(/\%s/,v(i));l||(l=s.parent=t.createElement("div")),l.innerHTML=m+g,f=s.sansSerif=l.firstChild,a=s.serif=f.nextSibling,p.glyphs&&(f.innerHTML+=p.glyphs,a.innerHTML+=p.glyphs),function w(){d||(d=t.body),!c&&d&&(d.appendChild(l),c=s.appended=!0,h=s.getMeasurements(),f.style.fontFamily=s.fontFamily+", "+r,a.style.fontFamily=s.fontFamily+", "+i),c&&h&&(y(h.sansSerif,f,p.tolerance)||y(h.serif,a,p.tolerance))?p.success():b()?p.error():!c&&"requestAnimationFrame"in window?e.requestAnimationFrame(w):e.setTimeout(w,p.delay)}()},a.prototype.checkFontFaces=function(n){var r=this;t.fonts.forEach(function(t){t.family.toLowerCase()===r.fontFamily.toLowerCase()&&t.weight===""+r.options.weight&&t.style===r.options.style&&t.load().then(function(){r.options.success(),e.clearTimeout(n)})})},a.prototype.init=function(n,r){var i;for(var o in s)r.hasOwnProperty(o)||(r[o]=s[o]);this.options=r,this.fontFamily=n,!r.glyphs&&"fonts"in t?(r.timeout&&(i=e.setTimeout(function(){r.error()},r.timeout)),this.checkFontFaces(i)):this.load()};var f=function(e,t){var n=new a;return n.init(e,t),n};e.FontFaceOnload=f})(this,this.document);

	var docEl = doc.documentElement;

	FontFaceOnload( "Lato", {
		success: function() {
			docEl.className += " lato-loaded";

			var counter = 0;
			var success = function() {
				counter++;
				if( counter === 3 ) {
					docEl.className += " lato-b-loaded";
				}
			};

			FontFaceOnload( "LatoBold", {
				weight: 700,
				success: success
			});
			FontFaceOnload( "LatoItalic", {
				style: 'italic',
				success: success
			});
			FontFaceOnload( "LatoBoldItalic", {
				weight: 700,
				style: 'italic',
				success: success
			});
		}
	});

})( document );