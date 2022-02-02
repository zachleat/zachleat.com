(function() {
		function FoitFout() {}

		FoitFout.config = {
			delayBeforeFinish: 800,
			foitTimeout: 3000
		};

		FoitFout.classes = {
			preloadFinished: "fonts-loaded",
			fallbackRoman: "ff-card-fallback-roman",
			fallbackBold: "ff-card-fallback-bold",
			fallbackItalic: "ff-card-fallback-italic",
			fallbackBoldItalic: "ff-card-fallback-bolditalic",
			foitRoman: "ff-card-foit-roman",
			foitBold: "ff-card-foit-bold",
			foitItalic: "ff-card-foit-italic",
			foitBoldItalic: "ff-card-foit-bolditalic",
			start: "ff-card-start",
			end: "ff-card-finish"
		};

		FoitFout.prototype.ctm = function() {
			return "fonts" in document;
		};

		FoitFout.prototype.preload = function() {
			if( this.ctm() ) {
				document.documentElement.classList.add( "js" );

				Promise.all([
					document.fonts.load("1em Open Sans"),
					document.fonts.load("700 1em Open Sans"),
					document.fonts.load("italic 1em Open Sans"),
					document.fonts.load("italic 700 1em Open Sans")
				]).then(function () {
					document.documentElement.classList.add( FoitFout.classes.preloadFinished );
				}.bind(this));
			}
		};

		FoitFout.prototype.init = function() {
			this.foitCard = document.getElementById( "card1-foit" );
			this.foutCard = document.getElementById( "card1-fout" );
			this.foitRepaints = this.foitCard.previousElementSibling.querySelector( ".ff-card-repaints" );
			this.foutRepaints = this.foutCard.previousElementSibling.querySelector( ".ff-card-repaints" );

			this.randomizeButton = document.getElementById( "randomize" );
			this.groupedButton = document.getElementById( "groupedrepaints" );
			this.submitButton = document.getElementById( "startload" );

			this.loadTimeInputs = {
				roman: document.getElementById( "loadtime-roman" ),
				bold: document.getElementById( "loadtime-bold" ),
				italic: document.getElementById( "loadtime-italic" ),
				bolditalic: document.getElementById( "loadtime-bolditalic" )
			};
		};

		FoitFout.prototype.reset = function() {
			this.init();

			this.foitReflowCount = 0;
			this.foitRepaintCount = 0;
			this.foutReflowCount = 0;
			this.foutRepaintCount = 0;
			this.foitGroup = false;
			this.foutGroup = false;
			this.updateCounters();

			// Add both fallback and foit classes to FOIT card (fallback shows after 3s)
			this.foitCard.classList.add( FoitFout.classes.foitRoman, FoitFout.classes.foitBold, FoitFout.classes.foitItalic, FoitFout.classes.foitBoldItalic, FoitFout.classes.fallbackRoman, FoitFout.classes.fallbackBold, FoitFout.classes.fallbackItalic, FoitFout.classes.fallbackBoldItalic );

			// Add fallback classes to FOUT card
			this.foutCard.classList.add( FoitFout.classes.fallbackRoman, FoitFout.classes.fallbackBold, FoitFout.classes.fallbackItalic, FoitFout.classes.fallbackBoldItalic );

			this.foitCard.classList.remove( FoitFout.classes.start, FoitFout.classes.end );
			this.foutCard.classList.remove( FoitFout.classes.start, FoitFout.classes.end );
		};

		FoitFout.prototype.findLoadTime = function( variant ) {
			var loadtimeEl = this.loadTimeInputs[ variant ];
			var loadtime = loadtimeEl ? loadtimeEl.valueAsNumber : null;

			if( !loadtime ) {
				throw Error( "Could not find loadtime for " + variant );
			}

			return loadtime;
		};

		FoitFout.prototype.findMaxLoadTime = function() {
			return Math.max( this.findLoadTime( "roman" ), this.findLoadTime( "bold" ), this.findLoadTime( "italic" ), this.findLoadTime( "bolditalic" ) );
		};

		FoitFout.prototype._incrementCounters = function( foitRepaint, foitReflow, foutRepaint, foutReflow ) {
			var repaintGroupForMs = 100;

			if( !this.foitGroup && ( foitRepaint || foitReflow ) ) {
				this.foitRepaintCount += foitRepaint;
				this.foitReflowCount += foitReflow;

				this.foitGroup = true;
				window.setTimeout(function() {
					this.foitGroup = false;
				}.bind( this ), repaintGroupForMs);
			}

			if( !this.foutGroup && ( foutRepaint || foutReflow ) ) {
				this.foutRepaintCount += foutRepaint;
				this.foutReflowCount += foutReflow;

				this.foutGroup = true;
				window.setTimeout(function() {
					this.foutGroup = false;
				}.bind( this ), repaintGroupForMs);
			}
		};

		FoitFout.prototype.updateCounters = function() {
			this._updateCounters( this.foitRepaints, this.foitRepaintCount, this.foitReflowCount );
			this._updateCounters( this.foutRepaints, this.foutRepaintCount, this.foutReflowCount );
		};

		FoitFout.prototype._updateCounters = function( counterEl, repaintCount, reflowCount ) {
			var val = [];
			if( !repaintCount && !reflowCount ) {
				val.push( "&#160;" );
			} else {
				if( repaintCount ) {
					val.push( repaintCount + " repaint" + ( repaintCount !== 1 ? "s" : "" ) );
				}
				if( reflowCount ) {
					val.push( reflowCount + " reflow" + ( reflowCount !== 1 ? "s" : "" ) );
				}
			}

			counterEl.innerHTML = val.join( ", " );
		};

		FoitFout.prototype.emulateLoadVariant = function( variant, variantUpperCase ) {
			var lkey = variant.toLowerCase();
			var ukey = variantUpperCase || variant.substr(0, 1).toUpperCase() + variant.substr( 1 );

			var loadtime = this.findLoadTime( lkey );
			var self = this;
			var fallbackClass = FoitFout.classes[ 'fallback' + ukey ];
			var foitClass = FoitFout.classes[ 'foit' + ukey ];

			// FOIT
			if( loadtime <= FoitFout.config.foitTimeout ) {
				window.setTimeout(function() {
					this.foitCard.classList.remove( fallbackClass, foitClass );

					this._incrementCounters( 1, 1, 0, 0 );
					this.updateCounters();
				}.bind( this ), loadtime);
			} else {
				window.setTimeout(function() {
					this.foitCard.classList.remove( foitClass );

					this._incrementCounters( 1, 0, 0, 0 );
					this.updateCounters();
				}.bind( this ), FoitFout.config.foitTimeout);

				window.setTimeout(function() {
					this.foitCard.classList.remove( fallbackClass );

					this._incrementCounters( 1, 1, 0, 0 );
					this.updateCounters();
				}.bind( this ), loadtime);
			}

			// FOUT
			window.setTimeout(function() {
				this.foutCard.classList.remove( fallbackClass );

				this._incrementCounters( 0, 0, 1, 1 );
				this.updateCounters();
			}.bind( this ), loadtime);
		};

		FoitFout.prototype.emulateLoad = function() {
			this.disable();

			this.emulateLoadVariant( "roman" );
			this.emulateLoadVariant( "bold" );
			this.emulateLoadVariant( "italic" );
			this.emulateLoadVariant( "bolditalic", "BoldItalic" );

			window.setTimeout(function() {
				this.foitCard.classList.add( FoitFout.classes.end );
				this.foutCard.classList.add( FoitFout.classes.end );

				this.enable();
			}.bind( this ), this.findMaxLoadTime() + FoitFout.config.delayBeforeFinish );
		};

		// via https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
		FoitFout.prototype._random = function( min, max ) {
			min = Math.ceil( min );
			max = Math.floor( max );
			var rand = Math.floor(Math.random() * (max - min + 1)) + min;
			// find nearest 100
			return rand - rand % 100;
		};

		FoitFout.prototype.matchLoadTimes = function() {
			var val = this.loadTimeInputs.roman.value;
			this.loadTimeInputs.bold.value = val;
			this.loadTimeInputs.italic.value = val;
			this.loadTimeInputs.bolditalic.value = val;

			this.updateLoadTimesHash();
		};

		FoitFout.prototype.randomizeLoadTimes = function() {
			this.loadTimeInputs.roman.value = this._random( 400, 8000 );
			this.loadTimeInputs.bold.value = this._random( 400, 8000 );
			this.loadTimeInputs.italic.value = this._random( 400, 8000 );
			this.loadTimeInputs.bolditalic.value = this._random( 400, 8000 );

			this.updateLoadTimesHash();
		};

		FoitFout.prototype.updateLoadTimesHash = function() {
			var times = [];
			times.push( this.loadTimeInputs.roman.value );
			times.push( this.loadTimeInputs.bold.value );
			times.push( this.loadTimeInputs.italic.value );
			times.push( this.loadTimeInputs.bolditalic.value );
			window.location.replace( "#" + times.join( "," ) );
		};

		FoitFout.prototype.fetchUrlLoadTimes = function() {
			var hash = window.location.hash;
			hash = hash.substr( 1 );

			if( hash ) {
				var times = times = hash.split(",");
				if( times[ 0 ] ) {
					this.loadTimeInputs.roman.value = parseInt( times[ 0 ], 10 );
				}
				if( times[ 1 ] ) {
					this.loadTimeInputs.bold.value = parseInt( times[ 1 ], 10 );
				}
				if( times[ 2 ] ) {
					this.loadTimeInputs.italic.value = parseInt( times[ 2 ], 10 );
				}
				if( times[ 3 ] ) {
					this.loadTimeInputs.bolditalic.value = parseInt( times[ 3 ], 10 );
				}
			}
		};

		FoitFout.prototype.disable = function() {
			this.randomizeButton.disabled = true;
			this.groupedButton.disabled = true;
			this.submitButton.disabled = true;
		};

		FoitFout.prototype.enable = function() {
			this.randomizeButton.disabled = false;
			this.groupedButton.disabled = false;
			this.submitButton.disabled = false;
		};

		var ff = new FoitFout();
		ff.preload();

		document.addEventListener( "DOMContentLoaded", function() {
			ff.init();
			ff.fetchUrlLoadTimes();

			if( !ff.ctm() ) {
				ff.disable();
			}

			var formEl = document.getElementById( "timeout" );
			formEl.addEventListener( "submit", function( e ) {
				e.preventDefault();

				ff.updateLoadTimesHash();
				ff.reset();
				ff.emulateLoad();
			});

			var randomizeEl = document.getElementById( "randomize" );
			randomizeEl.addEventListener( "click", function( e ) {
				ff.randomizeLoadTimes();
			}, false );

			var groupedEl = document.getElementById( "groupedrepaints");
			groupedEl.addEventListener( "click", function( e ) {
				ff.matchLoadTimes();
			}, false );
		});
	})();