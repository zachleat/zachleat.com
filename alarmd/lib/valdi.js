YAHOO.namespace( 'valdi' );
YAHOO.valdi.each = function( obj, func, args, bReturnArgs )
{
	if( bReturnArgs == null ) bReturnArgs = true;
	// nicely written code (args was modified) is from jQuery
	/* if( !YAHOO.lang.isArray( obj ) && !YAHOO.lang.isObject( obj ) )
		func.apply( obj, [0, obj, args] );
	else  */
	if ( obj && !obj['length'] )
		for ( var i in obj )
			args = func.apply( obj[i], [i, obj[i], args] );
	else if( obj && obj[ 'length' ] )
		for ( var i = 0, ol = obj['length']; i < ol; i++ )
			if ( ( args = func.apply( obj[i], [i, obj[i], args] ) ) === false ) break;
	return bReturnArgs ? args : obj;
};
/* returns if the primary class is being added or not (className or 'shown') */
YAHOO.valdi.toggle = function( elements , /* optional */className, /* optional */toggleToClassName )
{
	if( YAHOO.lang.isString( elements ) ) throw new Error( 'YAHOO.valdi.toggle does not handle strings, it needs an array.' );
	var added = 0, taken = 0;
	YAHOO.valdi.each( elements, function( j , element )
	{
		if( className && YAHOO.util.Dom.hasClass( element, className ) ) {
			YAHOO.util.Dom.removeClass( element, className );
			if( toggleToClassName ) YAHOO.util.Dom.addClass( element, toggleToClassName );
			taken++;
		} else if( className ) {
			if( toggleToClassName ) YAHOO.util.Dom.removeClass( element, toggleToClassName );
			YAHOO.util.Dom.addClass( element, className );
			added++;
		} else if( YAHOO.util.Dom.hasClass( element, 'hidden' ) ) {
			YAHOO.valdi.show( element );
			added++;
		} else {
			YAHOO.valdi.hide( element );
			taken++;
		}
	} );
	return added >= taken;
};
YAHOO.valdi.isShown = function( elements )
{
	if( YAHOO.lang.isString( elements ) ) elements = YAHOO.util.Dom.get( elements );
	if( !YAHOO.util.Dom.hasClass( elements, 'shown' ) )
		return false;
	return true;
};
YAHOO.valdi.show = function( elements )
{
	if( YAHOO.lang.isString( elements ) ) elements = YAHOO.util.Dom.get( elements );
	YAHOO.util.Dom.removeClass( elements, 'hidden' );
	YAHOO.util.Dom.addClass( elements, 'shown' );
};
YAHOO.valdi.hide = function( elements )
{
	if( YAHOO.lang.isString( elements ) ) elements = YAHOO.util.Dom.get( elements );
	YAHOO.util.Dom.removeClass( elements, 'shown' );
	YAHOO.util.Dom.addClass( elements, 'hidden' );
};

YAHOO.namespace( 'valdi.cache' );
YAHOO.valdi.cache._store = {};
YAHOO.valdi.cache.add = function()//( key, value ) or ( key, subkey, value )
{
	if( arguments.length == 2 )
	{
		YAHOO.valdi.cache._store[ arguments[ 0 ] ] = arguments[ 1 ];
	} else if( arguments.length == 3 ) {
		if( !YAHOO.valdi.cache._store[ arguments[ 0 ] ] ) YAHOO.valdi.cache._store[ arguments[ 0 ] ] = {};
		YAHOO.valdi.cache._store[ arguments[ 0 ] ][ arguments[ 1 ] ] = arguments[ 2 ];
	}
};
YAHOO.valdi.cache.update = YAHOO.valdi.cache.add;
YAHOO.valdi.cache.has = function( key, subkey )
{
	if( subkey != null ) return YAHOO.valdi.cache._store[ key ] != null && YAHOO.valdi.cache._store[ key ][ subkey ] != null;
	return YAHOO.valdi.cache._store[ key ] != null;
};
YAHOO.valdi.cache.get = function( key, subkey )
{
	if( subkey != null ) return YAHOO.valdi.cache._store[ key ][ subkey ];
	return YAHOO.valdi.cache._store[ key ];
};
YAHOO.valdi.cache.remove = function( key, subkey )
{
	if( subkey != null ) delete YAHOO.valdi.cache._store[ key ][ subkey ];
	else delete YAHOO.valdi.cache._store[ key ];
};
YAHOO.valdi.cache.clear = function( e ) // on unload
{
	delete YAHOO.valdi.cache._store;
};

YAHOO.namespace( 'valdi.util' );
YAHOO.valdi.util.accessKey = function( key, callback )
{
	YAHOO.util.Event.addListener( document, 'keydown', function( e )
	{
		if( e.altKey && String.fromCharCode( YAHOO.util.Event.getCharCode( e ) ).toLowerCase() == key.toLowerCase() )
		{
			callback();
			YAHOO.util.Event.stopEvent( e );
		}
	} );
};

YAHOO.namespace( 'valdi.Math' );
/* Logical XOR in JavaScript with Variable number of Arguments 
*/
YAHOO.valdi.Math.XOR = function()
{
	var b = false;
	for( var j = 0; j < arguments.length; j++ )
	{
		if( arguments[ j ] && !b ) b = true;
		else if( arguments[ j ] && b ) return false;
	}
	return b;
};
YAHOO.namespace( 'valdi.util.Array' );
YAHOO.valdi.util.Array.hasValue = function( arg1, arg2 )
{
	var a, b;
	if( YAHOO.valdi.Math.XOR( YAHOO.lang.isArray( arg1 ), YAHOO.lang.isArray( arg2 ) ) )
	{
		if( YAHOO.lang.isArray( arg1 ) )
		{
			a = arg1;
			b = arg2;
		} else {
			a = arg2;
			b = arg1;
		}
	} else {
		throw new Error( 'You cannot pass two Arrays into the hasValue function.' );
	}
	for( var j in a )
	{
		if( a[ j ] == b ) return true;
	}
	return false;
};
YAHOO.namespace( 'valdi.util.String' );
YAHOO.valdi.util.String.simpleReplace = function( str, searchFor, replaceWith )
{
	// if searchFor does not occur in the string
	var indexOccurs = str.indexOf( searchFor );
	if( -1 == indexOccurs )
	{
		return str.toString();
	} else {
		var newString = str.substring( 0, indexOccurs ) + replaceWith + str.substr( indexOccurs + searchFor.length );
		return YAHOO.valdi.util.String.simpleReplace( newString, searchFor, replaceWith );
	}
};
YAHOO.valdi.util.String.trim = function( str )
{
   return str.replace(/^\s*|\s*$/g,"");
};