var ZL = {
	getDistFolder: function() {
		var distMeta = document.querySelector( 'meta[name="dist"]' );

		return distMeta ? distMeta.content : '';
	}
};

// FOUT log
;(function( doc ) {
	return;

	var start;
	var times = [];
	var loadingStartTimes = {};
	var loadingEndTimes = {};
	var cancel = false;
	window.onload = function() {
		cancel = true;
	};

	function getDimensions( element ) {
		return {
			width: element.offsetWidth,
			height: element.offsetHeight
		};
	}

	function getNodesSize( parent, nodes ) {
		var size = getDimensions( parent );
		var hasTextChildren = false;
		var totalExemptSize = 0;
		var exemptSizes = [];

		parent.childNodes.forEach(function( child ) {
			var childSize;
			if( child.nodeType === 3 && child.textContent.trim() ) {
				hasTextChildren = true;
			} else if( child.nodeType === 1 ) {
				switch ( child.tagName.toLowerCase() ) {
					// things that might change size when they’re loading
					case "iframe":
					case "img":
					case "picture":
					case "svg":
					case "object":
					case "video":
					case "audio":
					// case "canvas":
						childSize = getDimensions( child )
						exemptSizes.push( childSize );
						break;
				}

				nodes = getNodesSize( child, nodes );
			}
		});

		if( !parent.reflowData ) {
			parent.reflowData = {
				sizes: [],
				exempted: []
			};
		}

		if( hasTextChildren ) {
			parent.reflowData.sizes.push( size );
			parent.reflowData.exempted.push( exemptSizes );
			nodes.push( parent );
		}

		return nodes;
	}

	function init() {
		times.push( performance.now() );
		var nodes = getNodesSize( document.body, [] );

		if( !cancel ) {
			requestAnimationFrame(init);
		} else {
			finish( times, nodes )
		}
	}

	function finish( times, nodes ) {
		console.log( "Iterations: ", times.length );
		var totalScore = 0;
		nodes.forEach(function( node ) {
			var score = calculateReflow( node );
			node.reflowData.score = score;
			totalScore += score;
		});
		console.log( "Total Text Reflow Score: ", totalScore );
		nodes.forEach(function( node ) {
			var percent = ( node.reflowData.score / totalScore ).toFixed( 5 ) * 100;
			if( percent > 1 ) {
				console.log( node.reflowData.score, percent + "%", node );
			}
		});
	}

	function calculateReflow( node ) {
		var sizes = node.reflowData.sizes;
		var reflowScore = 0;
		for( var j = 1, k = sizes.length; j < k; j++ ) {
			if( sizes[ j ].width !== sizes[ j - 1 ].width || 
				sizes[ j ].height !== sizes[ j - 1 ].height ) {
				reflowScore += Math.abs( sizes[ j ].width * sizes[ j ].height - sizes[ j - 1].width * sizes[ j - 1].height );
				// TODO exempt sizes
			}
		}
		return reflowScore;
	}

	requestAnimationFrame(init);

	function isWebFont( family ) {
		var result = false;
		doc.fonts.forEach(function( font ) {
			if( font.family === family ) {
				result = true;
			}
		});

		return true;
	}

	// Returns false if not a webfont
	// TODO featureSettings, stretch, unicodeRange, variant
	function getFontFaceInstance( family, weight, style ) {
		var result = false;
		var weightLookup = {
			normal: '400',
			bold: '700'
		};

		doc.fonts.forEach(function( font ) {
			if( font.family === family &&
				( font.weight === weight || font.weight === weightLookup[ weight ] ) &&
				font.style === style ) {
				result = font;
			}
		});

		return result;
	}
})( document );

;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var templateName = doc.querySelector( 'meta[name="template"]' );
	var classes = [ "enhanced-js" ];

	if( templateName ) {
		classes.push( "tmpl-" + templateName.content );
	}
	// gradient inference
	if( 'matchMedia' in window ) {
		classes.push( "has-gradient" );
	}
	if( sessionStorage.latoLoaded && sessionStorage.latoBoldItalicLoaded ) {
		classes.push( "lato-loaded" );
		classes.push( "lato-b-loaded" );
	}

	document.documentElement.className += " " + classes.join( " " );
})( document );

// Fonts
;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	// TODO import this using npm and grunt

/*! fontfaceonload - v0.1.6 - 2015-03-13
 * https://github.com/zachleat/fontfaceonload
 * Copyright (c) 2015 Zach Leatherman (@zachleat)
 * MIT License */

;(function( win, doc ) {
	"use strict";

	var TEST_STRING = 'AxmTYklsjo190QW',
		SANS_SERIF_FONTS = 'sans-serif',
		SERIF_FONTS = 'serif',

		// lighter and bolder not supported
		weightLookup = {
			normal: '400',
			bold: '700'
		},

		defaultOptions = {
			tolerance: 2, // px
			delay: 100,
			glyphs: '',
			success: function() {},
			error: function() {},
			timeout: 5000,
			weight: '400', // normal
			style: 'normal'
		},

		// See https://github.com/typekit/webfontloader/blob/master/src/core/fontruler.js#L41
		style = [
			'display:block',
			'position:absolute',
			'top:-999px',
			'left:-999px',
			'font-size:48px',
			'width:auto',
			'height:auto',
			'line-height:normal',
			'margin:0',
			'padding:0',
			'font-variant:normal',
			'white-space:nowrap'
		],
		html = '<div style="%s">' + TEST_STRING + '</div>';

	var FontFaceOnloadInstance = function() {
		this.fontFamily = '';
		this.appended = false;
		this.serif = undefined;
		this.sansSerif = undefined;
		this.parent = undefined;
		this.options = {};
	};

	FontFaceOnloadInstance.prototype.getMeasurements = function () {
		return {
			sansSerif: {
				width: this.sansSerif.offsetWidth,
				height: this.sansSerif.offsetHeight
			},
			serif: {
				width: this.serif.offsetWidth,
				height: this.serif.offsetHeight
			}
		};
	};

	FontFaceOnloadInstance.prototype.load = function () {
		var startTime = new Date(),
			that = this,
			serif = that.serif,
			sansSerif = that.sansSerif,
			parent = that.parent,
			appended = that.appended,
			dimensions,
			options = this.options,
			ref = options.reference;

		function getStyle( family ) {
			return style
				.concat( [ 'font-weight:' + options.weight, 'font-style:' + options.style ] )
				.concat( "font-family:" + family )
				.join( ";" );
		}

		var sansSerifHtml = html.replace( /\%s/, getStyle( SANS_SERIF_FONTS ) ),
			serifHtml = html.replace( /\%s/, getStyle(  SERIF_FONTS ) );

		if( !parent ) {
			parent = that.parent = doc.createElement( "div" );
		}

		parent.innerHTML = sansSerifHtml + serifHtml;
		sansSerif = that.sansSerif = parent.firstChild;
		serif = that.serif = sansSerif.nextSibling;

		if( options.glyphs ) {
			sansSerif.innerHTML += options.glyphs;
			serif.innerHTML += options.glyphs;
		}

		function hasNewDimensions( dims, el, tolerance ) {
			return Math.abs( dims.width - el.offsetWidth ) > tolerance ||
					Math.abs( dims.height - el.offsetHeight ) > tolerance;
		}

		function isTimeout() {
			return ( new Date() ).getTime() - startTime.getTime() > options.timeout;
		}

		(function checkDimensions() {
			if( !ref ) {
				ref = doc.body;
			}
			if( !appended && ref ) {
				ref.appendChild( parent );
				appended = that.appended = true;

				dimensions = that.getMeasurements();

				// Make sure we set the new font-family after we take our initial dimensions:
				// handles the case where FontFaceOnload is called after the font has already
				// loaded.
				sansSerif.style.fontFamily = that.fontFamily + ', ' + SANS_SERIF_FONTS;
				serif.style.fontFamily = that.fontFamily + ', ' + SERIF_FONTS;
			}

			if( appended && dimensions &&
				( hasNewDimensions( dimensions.sansSerif, sansSerif, options.tolerance ) ||
					hasNewDimensions( dimensions.serif, serif, options.tolerance ) ) ) {

				options.success();
			} else if( isTimeout() ) {
				options.error();
			} else {
				if( !appended && "requestAnimationFrame" in window ) {
					win.requestAnimationFrame( checkDimensions );
				} else {
					win.setTimeout( checkDimensions, options.delay );
				}
			}
		})();
	}; // end load()

	FontFaceOnloadInstance.prototype.cleanFamilyName = function( family ) {
		return family.replace( /[\'\"]/g, '' ).toLowerCase();
	};
	FontFaceOnloadInstance.prototype.cleanWeight = function( weight ) {
		return '' + (weightLookup[ weight ] || weight);
	};

	FontFaceOnloadInstance.prototype.checkFontFaces = function( timeout ) {
		var _t = this;
		doc.fonts.forEach(function( font ) {
			if( _t.cleanFamilyName( font.family ) === _t.cleanFamilyName( _t.fontFamily ) &&
				_t.cleanWeight( font.weight ) === _t.cleanWeight( _t.options.weight ) &&
				font.style === _t.options.style ) {
				font.load().then(function() {
					_t.options.success();
					win.clearTimeout( timeout );
				});
			}
		});
	};

	FontFaceOnloadInstance.prototype.init = function( fontFamily, options ) {
		var timeout;

		for( var j in defaultOptions ) {
			if( !options.hasOwnProperty( j ) ) {
				options[ j ] = defaultOptions[ j ];
			}
		}

		this.options = options;
		this.fontFamily = fontFamily;

		// For some reason this was failing on afontgarde + icon fonts.
		if( !options.glyphs && "fonts" in doc ) {
			if( options.timeout ) {
				timeout = win.setTimeout(function() {
					options.error();
				}, options.timeout );
			}

			this.checkFontFaces( timeout );
		} else {
			this.load();
		}
	};

	var FontFaceOnload = function( fontFamily, options ) {
		var instance = new FontFaceOnloadInstance();
		instance.init(fontFamily, options);

		return instance;
	};

	// intentional global
	win.FontFaceOnload = FontFaceOnload;
})( this, this.document );

	var docEl = doc.documentElement;
return;
	if( !sessionStorage.latoLoaded || sessionStorage.latoBoldItalicLoaded ) {
		// FontFaceOnload( "Lato", {
		FontFaceOnload( "LatoSubset", {
			error: function() {},
			success: function() {
				docEl.className += " lato-loaded";
				sessionStorage.latoLoaded = true;

				var counter = 0;
				var success = function() {
					counter++;
					// if( counter === 3 ) {
					if( counter === 4 ) {
						docEl.className += " lato-b-loaded";
						sessionStorage.latoBoldItalicLoaded = true;
					}
				};

				FontFaceOnload( "Lato", {
					success: success
				});
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
		
	}

})( document );