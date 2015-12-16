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

	function getSanePercent( percent ) {
		return percent ? ( "" + ( percent * 100 ) ).substr( 0, 5 ) : percent;
	}

	function getDimensions( element ) {
		return {
			width: element.offsetWidth,
			height: element.offsetHeight
		};
	}

	function getNodesSize( parent, nodes ) {
		var size = getDimensions( parent );
		var isLeafNode = true;
		var hasTextChildren = false;

		parent.childNodes.forEach(function( child ) {
			if( child.nodeType === 1 ) {
				isLeafNode = false;
				nodes = getNodesSize( child, nodes );
			} else if ( child.nodeType === 3 && child.textContent.trim() ) {
				hasTextChildren = true;
			}
		});

		if( !parent.reflowData ) {
			parent.reflowData = {
				sizes: []
			};
		}

		if( parent.nodeType === 1 && ( isLeafNode || hasTextChildren ) ) {
			parent.reflowData.sizes.push( size );
			nodes.push( parent );
		}

		return nodes;
	}

	function init() {
		times.push( performance.now() );
		var nodes = getNodesSize( document.body, [] );

		if( cancel ) {
			finish( times, nodes );
		} else {
			requestAnimationFrame( init );
		}
	}

	function finish( times, nodes ) {
		console.log( "Iterations: ", times.length );
		if( times.length < 4 ) {
			console.warn( "Number of iterations (raF needs to run at least 4 times) for reflow score may be too low. Try refreshing.")
		}
		var totalScore = 0;
		nodes.forEach(function( node ) {
			var unweightedScore = calculateReflow( node );
			var score = calculateWeightedReflow( node );
			var changedAt = getChangeDescription( node );
// console.log( node, score, node.reflowData );
			node.reflowData.unweightedScore = unweightedScore;
			node.reflowData.score = score;
			node.reflowData.changeDesc = changedAt;
			totalScore += score;
		});

		console.log( "Total Text Reflow Score: ", totalScore.toFixed( 2 ) );
		nodes.forEach(function( node ) {
			var percent = getSanePercent( node.reflowData.score / totalScore );
			if( percent ) {
				console.log( percent + "%", "changed at " + node.reflowData.changeDesc.join( ", " ) + " page complete", "adds " + node.reflowData.score + " (" + node.reflowData.unweightedScore + " unweighted)", node );
			}
		});
	}

	function calculateReflow( node ) {
		var sizes = node.reflowData.sizes;
		var reflowScore = 0;
		var score;

		for( var j = 1, k = sizes.length; j < k; j++ ) {
			score = Math.abs( sizes[ j ].width * sizes[ j ].height -
					sizes[ j - 1 ].width * sizes[ j - 1 ].height );
			reflowScore += score;
		}

		return reflowScore;
	}

	function calculateWeightedReflow( node ) {
		var sizes = node.reflowData.sizes;
		var reflowScore = 0;
		var score;
		var timeWeight;

		for( var j = 1, k = sizes.length; j < k; j++ ) {
			score = Math.abs( sizes[ j ].width * sizes[ j ].height -
					sizes[ j - 1 ].width * sizes[ j - 1 ].height );
			timeWeight = ( ( j - 1 ) / k ) * 4;

			reflowScore += score * timeWeight;
		}

		return reflowScore;
	}

	function getChangeDescription( node ) {
		var sizes = node.reflowData.sizes;
		var changes = [];
		var score;

		for( var j = 1, k = sizes.length; j < k; j++ ) {
			score = Math.abs( sizes[ j ].width * sizes[ j ].height -
					sizes[ j - 1 ].width * sizes[ j - 1 ].height );

			if( score ) {
				changes.push( getSanePercent( ( j - 1 ) / k ) + "%" );
			}
		}

		return changes;
	}

	requestAnimationFrame(init);

	// function isWebFont( family ) {
	// 	var result = false;
	// 	doc.fonts.forEach(function( font ) {
	// 		if( font.family === family ) {
	// 			result = true;
	// 		}
	// 	});

	// 	return true;
	// }

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