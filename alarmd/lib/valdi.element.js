YAHOO.namespace( 'valdi.Dom' );
YAHOO.valdi.Dom.createElement = function( node, name, type )
{
	var element;
	try {
		element = document.createElement( '<' + node + ( name ? ' name="'+name+'"' : '' ) + ( type ? ' type="'+type+'"' : '' ) + '>' );
	} catch (e) {}
	if( !element || !element.name || !element.type )
	{
		element = document.createElement( node );
		if( name ) element.setAttribute( 'name', name );
		if( type ) element.setAttribute( 'type', type );
	}
	return element;
};
YAHOO.valdi.Dom.setStyle = function( elements, styles /* string with multiple style declarations: border:0;height:90px */ )
{
	var split = styles.split( ';' );
	for( var j = 0; j < split.length; j++ )
	{
		var keyvalue = split[ j ].split( ':' );
		YAHOO.util.Dom.setStyle( elements, keyvalue[ 0 ], keyvalue[ 1 ] );
	}
};
YAHOO.valdi.Dom.addClass = function( elements, classNames /* array */ )
{
	for( var j = 0; j < classNames.length; j++ )
	{
		YAHOO.util.Dom.addClass( elements, classNames[ j ] );
	}
};
YAHOO.valdi.Dom.setAttribute = function( node, name, value )
{
	// name and type attributes must be set at create time, use YAHOO.valdi.Dom.createElement (for IE )
	var corrections = {
		'accesskey': 'accessKey',
		'usemap': 'useMap',
		'maxlength': 'maxLength',
		'frameborder': 'frameBorder'
	};
	var preadded = {
		'name': '',
		'type': ''
	};
	var lName = name.toLowerCase();
	if( lName == 'style' )
	{
		YAHOO.valdi.Dom.setStyle( node, value );
	} else if( lName == 'class' ) {
		YAHOO.valdi.Dom.addClass( node, value.split( ' ' ) );
	} else if( lName == 'for' ) {
		node.htmlFor = value;
	} else if( lName == 'checked' && ( value == 'checked' || value == 'true' ) ) {
		node.checked = true;
		node.defaultChecked = true;
	} else if( YAHOO.lang.isString( preadded[ lName ] ) && node.getAttribute( lName ) ) {
		// do nothing
	} else if( lName.substr( 0, 2 ) == 'on' ) { // ideally we would use YAHOO.util.Event.addListener, but who sets these as strings anyway?
		node[ lName ] = value;
	} else {
		if( corrections[ lName ] ) node.setAttribute( corrections[ lName ], value );
		else node.setAttribute( lName, value );
	}
};
YAHOO.valdi.Dom.appendChildren = function( parentNode, /* Array */children )
{
	for( var j = 0; j < children.length; j++ )
	{
		if( YAHOO.lang.isArray( children[ j ] ) )
			YAHOO.valdi.Dom.appendChildren( parentNode, children[ j ] );
		else
			parentNode.appendChild( children[ j ] );
	};
};
// depth first search to the first leaf
YAHOO.valdi.Dom.getLeaf = function( parentNode )
{
	var max = 20, j = 0;
	while( parentNode.firstChild != null && j < max )
	{
		parentNode = parentNode.firstChild;
		j++;
	}
	if( j == max ) throw 'Infinite Loop Protection called (' + max + ' loops for getLeaf)';
	return parentNode;
};

YAHOO.valdi.Dom.getNonWhitespaceNodes = function( parentNode )
{
	var children = [];
	for( var j = 0; j < parentNode.childNodes.length; j++ )
	{
		if( !YAHOO.valdi.Dom.isWhitespaceNode( parentNode.childNodes[ j ] ) ) children.push( parentNode.childNodes[ j ] );
	}
	return children;
};
// Mozilla considers whitespace as a text node
// http://developer.mozilla.org/en/docs/Whitespace_in_the_DOM
YAHOO.valdi.Dom.isWhitespaceNode = function( node )
{
	return node.nodeType == 8 || ( ( node.nodeType == 3 ) && !( /[^\t\n\r ]/.test( node.data ) ) );
};

YAHOO.namespace( 'valdi.element' );
YAHOO.valdi.element = function( obj, parent, mode, argument ) // #idString, .classString, [@att1="value",att2="value"] @ is optional
{
	var f = YAHOO.valdi.element.constants.USE_FRAGMENTS;
	mode = YAHOO.valdi.element._initMode( mode, argument );

	var nodes = YAHOO.valdi.element._get( obj );

	if( parent )
	{
		if( YAHOO.lang.isString( parent ) ) parent = YAHOO.util.Dom.get( parent );			
		if( mode == YAHOO.valdi.element.constants.REPLACE )
			parent.innerHTML = '';
	}

	if( parent && !f )
	{
		for( var j = 0; j < nodes.length; j++ )
		{
			switch( mode )
			{
				case YAHOO.valdi.element.constants.APPEND:
				case YAHOO.valdi.element.constants.REPLACE:
					parent.appendChild( nodes[ j ] );
					break;
				case YAHOO.valdi.element.constants.UNSHIFT:
					parent.insertBefore( nodes[ j ], parent.firstChild );
					break;
				case YAHOO.valdi.element.constants.INSERT:
					//var childNodes = Ext.query( '*', parent ); // gets rid of those pesky \n nodes
					var childNodes = YAHOO.valdi.Dom.getNonWhitespaceNodes( parent );
					if( !YAHOO.lang.isNumber( argument ) || argument >= childNodes.length )
					{
						throw 'Incorrect index for INSERT mode in YAHOO.valdi.element';
					}
					parent.insertBefore( nodes[ j ], childNodes[ argument ] );
					break;
				default:
					throw 'Unknown mode for valdi.element';
			}
		}
	} else if( f ) {
		return YAHOO.valdi.element.execNodeFragment( nodes.join( '' ), parent, mode );
	}
	return nodes;
};
YAHOO.valdi.element.append = function( obj, parent )
{
	return YAHOO.valdi.element( obj, parent, YAHOO.valdi.element.constants.APPEND );
};
YAHOO.valdi.element.replace = function( obj, parent )
{
	return YAHOO.valdi.element( obj, parent, YAHOO.valdi.element.constants.REPLACE );
};
YAHOO.valdi.element.unshift = function( obj, parent )
{
	return YAHOO.valdi.element( obj, parent, YAHOO.valdi.element.constants.UNSHIFT );
};
YAHOO.valdi.element.insert = function( obj, parent, index )
{
	if( index == null ) return YAHOO.valdi.element.unshift( obj, parent );

	return YAHOO.valdi.element( obj, parent, YAHOO.valdi.element.constants.INSERT, index );
};
// @todo: make this api to simplify exec (remove it, make it work transparently)
// @todo: try to use {var} instead of <var>

YAHOO.valdi.element.compile = function( obj )
{
	return YAHOO.valdi.element._get( obj ).join( '' );
};
/* values is the Array containing the values for the loop.
*/
YAHOO.valdi.element.exec = function( str, parent, values, mode, argument )
{
	mode = YAHOO.valdi.element._initMode( mode, argument );

	var split = str.split( YAHOO.valdi.element.matchers[ 'variable' ] );
	if( split.length > 1 )
	{
		for( var j = 1; j < split.length; j+=2 ) // every odd index should be a variable to replace
		{
			var index = split[ j ].substr( 1, split[ j ].length - 2 );
			if( YAHOO.lang.isNumber( parseInt( index, 10 ) ) )
				index = parseInt( index, 10 );
			if( index != null && values && values[ index ] != null )
			{
				split[ j ] = values[ index ];
			}
		}
	}
	return YAHOO.valdi.element.execNodeFragment( split.join( '' ), parent, mode, argument );
};
YAHOO.valdi.element._initMode = function( mode, argument )
{
	if( mode == null ) return YAHOO.valdi.element.constants.APPEND;
	else if( mode == YAHOO.valdi.element.constants.INSERT && argument == null ) return YAHOO.valdi.element.constants.UNSHIFT;
	return mode;
};
YAHOO.valdi.element.execNodeFragment = function( node, parent, mode, argument )
{
	if( parent )
	{
		if( parent.insertAdjacentHTML )
		{
			switch( mode )
			{
				case YAHOO.valdi.element.constants.APPEND:
				case YAHOO.valdi.element.constants.REPLACE:
					parent.insertAdjacentHTML( 'beforeEnd', node );
					return [ parent.lastChild ]; // warning: will return only the last root level node
					break;
				case YAHOO.valdi.element.constants.UNSHIFT:
					parent.insertAdjacentHTML( 'afterBegin', node );
					return [ parent.firstChild ]; // warning: will return only the first root level node
					break;
				case YAHOO.valdi.element.constants.INSERT:
					throw 'INSERT mode is not supported for HTML Fragments in valdi.element.execNodeFragment';
				default:
					throw 'Unknown mode for valdi.element.execNodeFragment';
			}
		} else {
			var range = parent.ownerDocument.createRange();
			switch( mode )
			{
				case YAHOO.valdi.element.constants.APPEND:
				case YAHOO.valdi.element.constants.REPLACE:
					if( parent.lastChild )
					{
						range.setStartAfter( parent.lastChild );
						frag = range.createContextualFragment( node );
						parent.appendChild( frag );
					} else {
						parent.innerHTML = node;
					}
					return [ parent.lastChild ]; // warning: will return only the last root level node
				case YAHOO.valdi.element.constants.UNSHIFT:
					if( parent.firstChild )
					{
						range.setStartBefore( parent.firstChild );
						frag = range.createContextualFragment( node );
						parent.insertBefore( frag, parent.firstChild );
					} else {
						parent.innerHTML = node;
					}
					return [ parent.firstChild ]; // warning: will return only the first root level node
				case YAHOO.valdi.element.constants.INSERT:
					throw 'INSERT mode is not supported for HTML Fragments in valdi.element.execNodeFragment';
				default:
					throw 'Unknown mode for valdi.element.execNodeFragment';
			}
		}
	} else {
		var unparent = document.createElement( 'div' );
		if( unparent.insertAdjacentHTML )
		{
			unparent.insertAdjacentHTML( 'afterBegin', node );
		} else {
			unparent.innerHTML = node;
		}
		var child = unparent.firstChild;
		unparent = null;
		return [ child ]; // warning: will return only the first root level node
	}
};

YAHOO.namespace( 'YAHOO.valdi.element.constants' );
// modes
YAHOO.valdi.element.constants.APPEND = 0;
YAHOO.valdi.element.constants.UNSHIFT = 1; // insert at the beginning
YAHOO.valdi.element.constants.INSERT = 2; // argument is the index before which you wish you insert your nodes
YAHOO.valdi.element.constants.REPLACE = 3; // get rid of any child content and replace with your nodes

// config
YAHOO.valdi.element.constants.USE_FRAGMENTS = true;
YAHOO.valdi.element.constants.TEXT_NODE_CHAR = '#'; // BadgerFish JSON convention uses a '$' to indicate a text node

YAHOO.valdi.element._get = function( obj )
{
	var f = YAHOO.valdi.element.constants.USE_FRAGMENTS;
	if( YAHOO.lang.isString( obj ) )
	{
		return [ YAHOO.valdi.element._parseString( obj ) ];
	} else {
		var arg = [];
		for( var key in obj )
		{
			var value = obj[ key ];
			var isTextNode = YAHOO.lang.isObject( value ) && value.nodeName != null && value.nodeName.toLowerCase() == '#text';
			var isNode = !isTextNode && YAHOO.lang.isObject( value ) && value.nodeName != null;
			if( !YAHOO.lang.isNumber( parseInt( key ) ) )
			{
				var parentNode;
				if( !f )
				{
					parentNode = YAHOO.valdi.element._parseString( key );
					var leaf = YAHOO.valdi.Dom.getLeaf( parentNode );
					if( isTextNode || isNode )
						leaf.appendChild( value );
					else /* parentNode =  */
						YAHOO.valdi.Dom.appendChildren( leaf, YAHOO.valdi.element._get( value ) );
				} else {
					//@TODO handle raw elements
					if( isTextNode || isNode )
						throw 'Raw DOM nodes are not yet supported with HTML Fragments.  Try setting YAHOO.valdi.element.constants.USE_FRAGMENTS to false.';
					else
						parentNode = YAHOO.valdi.element._parseString( key, YAHOO.valdi.element._get( value ) );
				}

				arg[ arg.length ] = parentNode;
			} else {
				if( isTextNode || isNode )
					arg[ arg.length ] =  value;
				else
					arg = arg.concat( YAHOO.valdi.element._get( value ) );
			}
		}
		return arg;
	}
};
YAHOO.valdi.element.matchers = {
	// in style declarations, {}, quotes are not required for values
	'style': /([\w<>-]+)\=(?:['"])?([\w<>\s-#\(\)%]+)(?:["'])?(?:\,)?/g,
	// in attributes, quotes _are_ required for values and you can't nest them, ie: '"' or "'"
	'attribute': /(?:\[)?(?:@)?((?:[\w<>-]+\:)?(?:[\w<>-]+))\=(?:['"])([^'"]+)(?:["'])(?:[(?:,)|(?:\])])/g,
	'node': /((?:[\w<>-]+\:)?(?:[\w<>-]+))(\#[\w<>-]+)?((?:\.[\w<>\+-]+)*)?(\{.*\})?(\[.*\])?/g,
	'variable': /(<\w+>)/
};
YAHOO.valdi.element._parseString = function( str, children )
{
	var f = YAHOO.valdi.element.constants.USE_FRAGMENTS;
	if( str.substr( 0, 1 ) == YAHOO.valdi.element.constants.TEXT_NODE_CHAR )
	{
		if( !f ) return document.createTextNode( str.substr( 1 ) );
		else return str.substr( 1 );
	}

	if( f ) var output = [], outputLen = 0, openNodes = [], openNodesLen = 0;
	var topLevelNode, parentNode, node;
	var executed = false;
	RegExp.lastIndex = 0;
	var reg = new RegExp( YAHOO.valdi.element.matchers[ 'node' ] );
	while( ( node = reg.exec( str ) ) != null )
	{
		if( f ) var classStr = '', styleStr = '';
		executed = true;
		var current;
		var attributeList = {};
		if( node[ 5 ] )
		{
			var attributes;
			RegExp.lastIndex = 0;
			var attReg = new RegExp( YAHOO.valdi.element.matchers[ 'attribute' ] );
			while( ( attributes = attReg.exec( node[ 5 ] ) ) != null )
			{
				attributeList[ attributes[ 1 ].toLowerCase() ] = attributes[ 2 ];
			}
		}
		if( !f )
		{
			if( attributeList[ 'name' ] || attributeList[ 'type' ] )
			{
				current = YAHOO.valdi.Dom.createElement( node[ 1 ], attributeList[ 'name' ], attributeList[ 'type' ] );
			} else {
				current = document.createElement( node[ 1 ] );
			}
		} else {
			output[ outputLen++ ] = '<' + node[ 1 ];
		}
		
		if( node[ 2 ] )
		{
			if( !f ) current.setAttribute( 'id', node[ 2 ].substr( 1 ) );
			else output[ outputLen++ ] = ' id="' + node[ 2 ].substr( 1 ) + '"';
		}
		if( node[ 3 ] )
		{
			if( !f ) YAHOO.valdi.Dom.addClass( current, node[ 3 ].substr( 1 ).split( '.' ) );
			else classStr += node[ 3 ].substr( 1 ).split( '.' ).join( ' ' );
		}
		for( var j in attributeList )
		{
			if( !f ) 
			{
				YAHOO.valdi.Dom.setAttribute( current, j, attributeList[ j ] );
			} else {
				if( j == 'class' ) classStr += ' ' + attributeList[ j ];
				else if( j == 'style' ) styleStr += attributeList[ j ] + ( attributeList[ j ].substr( attributeList[ j ].length - 1 ) == ';' ? '' : ';' );
				else output[ outputLen++ ] = ' ' + j + '="' + attributeList[ j ] + '"';
			}
		}
		if( node[ 4 ] )
		{
			var styles = [];
			var len = 0;
			var style;
			RegExp.lastIndex = 0;
			var attReg = new RegExp( YAHOO.valdi.element.matchers[ 'style' ] );
			while( ( style = attReg.exec( node[ 4 ] ) ) != null )
			{
				styles[len++] = style[ 1 ].toLowerCase() + ':' + style[ 2 ];
			}
			if( !f ) YAHOO.valdi.Dom.setStyle( current, styles.join( ';' ) );
			else styleStr += styles.join( ';' );
		}

		if( !f )
		{
			if( parentNode != null ) // we've looped once already
			{
				parentNode.appendChild( current );
			} else {
				topLevelNode = current;
			}
			parentNode = current;
		} else {
			if( classStr != '' ) output[ outputLen++ ] = ' class="' + classStr + '"';
			if( styleStr != '' ) output[ outputLen++ ] = ' style="' + styleStr + '"';
			// @TODO check to see if no child nodes, then />
			output[ outputLen++ ] = '>';
			openNodes[ openNodesLen++ ] = node[ 1 ];
		}
	}
	if( !executed )
		throw 'Could not parse node string (' + str + ') in YAHOO.valdi.element._parseString';

	if( !f )
	{
		return topLevelNode;
	} else {
		if( children )
		{
			for( var j = 0; j < children.length; j++ )
			{
				output[ outputLen++ ] = children[ j ];
			}
		}
		for( var j = openNodes.length - 1; j >= 0; j-- )
		{
			output[ outputLen++ ] = '</' + openNodes[ j ] + '>';
		}
		return output.join( '' );
	}
};