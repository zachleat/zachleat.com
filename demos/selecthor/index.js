function Selecthor( targetEl ) {
	// this is where the source code is rendered to, the syntax highlighted element
	this.target = targetEl;
	this.rendered = document.createElement( "div" );

	this.classes = {
		match: "match"
	};
	this.i18n = {
		match: {
			singular: "match",
			plural: "matches"
		}
	};
}

Selecthor.prototype.fetch = function( url ) {
	return fetch( url )
		.then(function (response) {
			return response.text();
		}).then(function (text) {
			this.setHtml( text );
		}.bind( this )).catch(function( error ) {
			console.error( 'Looks like there was a problem. ', error );
		});
};

Selecthor.prototype.escapeHtml = function( html ) {
	var escape = document.createElement( "textarea" );
	escape.textContent = html;

	return escape.innerHTML;
};

Selecthor.prototype.setHtml = function( html ) {
	this.target.innerHTML = this.escapeHtml( html );
	hljs.highlightBlock( this.target );

	this.rendered.innerHTML = html;
	this.sync();
};

Selecthor.prototype.sync = function() {
	var opened = -1;
	var unclosed = [];
	var lastNode;

	this.target.querySelectorAll( ".hljs-tag" ).forEach(function( node ) {
		if( node.textContent.indexOf( "</" ) === -1 ) {
			opened++;
			unclosed.push( opened );

			node.classList.add( "start-tag" );
			node.setAttribute( "data-tagindex", opened );
		} else {
			node.classList.add( "end-tag" );
			node.setAttribute( "data-tagindex", unclosed.pop() );
		}
	});

	var index = 0;
	this.rendered.querySelectorAll( "*" ).forEach(function( node ) {
		node.setAttribute( "data-tagindex", index++ );
	});
};

Selecthor.prototype.reset = function() {
	document.querySelectorAll( "." + this.classes.match ).forEach(function( node ) {
		node.classList.remove( this.classes.match );
	}.bind( this ));
};

Selecthor.prototype.setTagIndeces = function( selector ) {
	var matchCount = 0;
	if( selector ) {
		try {
			var matches = [];
			this.rendered.querySelectorAll( selector ).forEach(function( node ) {
				matches.push( "[data-tagindex='" + node.getAttribute( "data-tagindex" ) + "']" );
				this.target.querySelectorAll( matches.join( "," ) ).forEach(function( highlightedNode ) {
					highlightedNode.classList.add( this.classes.match );
				}.bind( this ));
				matchCount++;
				node.classList.add( this.classes.match );
			}.bind( this ));

		} catch( e ) {
			// uhhh
		}
	}
	return matchCount;
};

Selecthor.prototype.updateCount = function( count ) {
	// update count
	document.getElementById( "selector-count" ).innerHTML = count + " " + ( count !== 1 ? this.i18n.match.plural : this.i18n.match.singular );
};

Selecthor.prototype.select = function( selector ) {
	this.reset();

	var count = this.setTagIndeces( selector );
	this.updateCount( count );
};

// Cut the mustard
if( !( "fetch" in window ) ) {
	throw "The Fetch API is required for Selecthor http://caniuse.com/#feat=fetch";
}
if( !( "querySelectorAll" in document ) ) {
	throw new Error( "Native querySelectorAll is required for Selecthor http://caniuse.com/#feat=queryselector" );
}

// Wrap source code checkbox
document.getElementById( "sourcecode-wrap" ).addEventListener( "change", function( e ) {
	document.getElementById( "source-code" ).classList.toggle( "sourcecode-wrap" );
}, false );

// Selecthor instance
var sel = new Selecthor( document.getElementById( "import-target" ) );
// sel.fetch( "demo-definition-list.html" );
// sel.fetch( "demo-list-without-list.html" );
sel.fetch( "demo-table.html" );

document.getElementById( "selector-input" ).addEventListener( "input", function( e ) {
	sel.select( e.target.value );
}, false );
