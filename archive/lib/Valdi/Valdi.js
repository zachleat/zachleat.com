var Valdi = function()
{
	var parsedSearchString 	= false;
	var getVariables 		= {};

	function parseSearchString()
	{
		if( !parsedSearchString ) // only parse it once!
		{
			if( window.location.search.length > 1 )
			{
				var questionMark = window.location.href.indexOf( '?' );
				var temp = window.location.href.substr( questionMark + 1 ).split( '&' );
				for( var j = 0; j < temp.length; j++ )
				{
					var keyValue = temp[ j ].split( '=' );
					getVariables[ keyValue[ 0 ] ] = decodeURI( keyValue[ 1 ] );
				}
			}
			parsedSearchString = true;
		}
	}

	return {
		Params: {
			Get: function( key, defaultValue )
			{
				parseSearchString();
				return getVariables[ key ] != null ? decodeURIComponent( getVariables[ key ] ) : defaultValue;
			},
			GetInt: function( key, defaultValue )
			{
				return parseInt( Valdi.Params.Get( key, defaultValue ), 10 );
			},
			Set: function( key, value )
			{
				parseSearchString();
				getVariables[ key ] = encodeURIComponent( value );
				return value;
			},
			Encode: function()
			{
				var str = [];
				for( var j in getVariables )
					str[ str.length ] = j + '=' + encodeURI( getVariables[ j ] );
				return '?' + str.join( '&' );
			}
		}
	};
}();