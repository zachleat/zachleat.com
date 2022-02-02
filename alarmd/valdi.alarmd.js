// fake Ext for Ext.DomQuery
Ext.DomQuery.matchers.push( {
	re: /^(?:([\[\{])(?:@)?([\w-]+(?:\:[\w-]+))\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
	select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
} );
Ext.queryOne = function( path, root )
{
	var query = Ext.query( path, root );
	return query.length > 0 ? query[ 0 ] : null;
};
String.prototype.substringBeforeLast = function( subject )
{
	var occursAt = this.lastIndexOf( subject );
	return this.substr( 0, occursAt );
};
String.prototype.substringAfterLast = function( subject )
{
	var occursAt = this.lastIndexOf( subject );
	return this.substr( occursAt + subject.length );
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

