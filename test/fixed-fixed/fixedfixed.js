/*! Fixedfixed: a CSS position:fixed qualifier. (c)2012 @scottjehl, Filament Group, Inc. Dual license: MIT and/or GPLv2 */
(function( w, undefined ){
	
	var supportedClass = "fixed-supported",
		unsupportedClass = "fixed-unsupported",
		el = w.document.createElement( "div" ),
		ua = w.navigator.userAgent,
		docEl = w.document.documentElement;
	
	// fix the test element
	el.style.position = "fixed";
	el.style.top = 0;

	// support test
	function checkFixed(){

		var docBody = w.document.body,
			scroll = ( docBody && ( "scrollTop" in docBody ) ? docBody.scrollTop : 0 ) || docEl.scrollTop;

		// only run test if there's a scroll we can compare
		if( scroll !== undefined && scroll > 0 && docBody ){
			docBody.insertBefore( el, docBody.firstChild );

			if( !el.getBoundingClientRect || el.getBoundingClientRect().top !== 0 ){
				// Fixed is not working or can't be tested
				docEl.className = docEl.className.replace( supportedClass, unsupportedClass );
			}

			// remove the test element
			docBody.removeChild( el );
				
			// unbind the handlers
			if( w.removeEventListener ){
				w.removeEventListener( "scroll", checkFixed, false );
			}
			else{
				w.detachEvent( "onscroll", checkFixed );
			}
		}
	}

	// if a particular UA is known to return false results with this feature test, try and avoid that UA here.
	if(
		// Android 2.1, 2.2, 2.5, and 2.6 Webkit
		!( ua.match( /Android 2\.[1256]/ ) && ua.indexOf( "AppleWebKit") > -1 ) ||
		// Opera Mobile less than version 11.0 (7458)
		!( ua.match( /Opera Mobi\/([0-9]+)/ ) && RegExp.$1 < 7458 ) ||
		// Opera Mini
		!( w.operamini && ({}).toString.call( w.operamini ) === "[object OperaMini]" ) ||
		// Firefox Mobile less than version 6
		!( ua.match( /Fennec\/([0-9]+)/ ) && RegExp.$1 < 6 )
		// If necessary, add the other untestable browsers here...
	){
		//add the HTML class for now.
		docEl.className += " " + supportedClass;
		
		// bind to scroll event so we can test and potentially degrade
		if( w.addEventListener ){
			w.addEventListener( "scroll", checkFixed, false );
		}
		else{
			w.attachEvent( "onscroll", checkFixed );
		}
	} else {
		docEl.className += " " + unsupportedClass;
	}
	alert( docEl.className );
}( this ));