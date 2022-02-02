/*
 * Y2.util.Dom, a CSS Selector Interface for YAHOO.util.Dom
 * Zach Leatherman (http://www.zachleat.com/)
 */
if (typeof Y2 == "undefined") {
    var Y2 = {};
}
Y2.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a .length; i=i+1) {
        d=a[i].split(".");
        o=window;
        for (j=0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }
    return o;
};

Y2.namespace( 'Y2.util' );
Y2.util.Dom = (function(){
	if( !YAHOO || !YAHOO.util.Dom )
		throw new Error( 'Please include both YAHOO and YAHOO.util.Dom first.' );

	var d = YAHOO.util.Dom;
	var adapter;
	if( typeof jDomQuery != 'undefined' ) adapter = jDomQuery;
	else if( typeof jQuery != 'undefined' ) adapter = jQuery;
	else if( typeof Ext.DomQuery != 'undefined' ) adapter = Ext.DomQuery.select;
	else throw new Error( 'Please include the source code for a DOM Querying Engine.' );

	function select( el, contextNode )
	{
		if( !YAHOO.lang.isString( el ) )
			return el;
		return contextNode ? adapter( el, contextNode ) : adapter( el );
	}

    /* argumentLength is 1 based */
	function selector( func, args, hasContextNode, bIsSingle )
	{
        var newargs = [];
		var selector = hasContextNode ? select( args[ 0 ], args[ 1 ] ) : select( args[ 0 ] );
		if( bIsSingle ) newargs.push( selector[ 0 ] );
		else newargs.push( selector );

        for( var j = hasContextNode ? 2 : 1, k=args.length; j<k; j++ )
            newargs.push(args[j]);

        return func.apply( null, newargs );
	}

    function selectorDouble( func, args, hasFirstContextNode, hasSecondContextNode, bIsSingle )
    {
        var newargs = [];
		var selector = hasFirstContextNode ? select( args[ 0 ], args[ 1 ] ) : select( args[ 0 ] );
		if( bIsSingle ) newargs.push( selector[ 0 ] );
		else newargs.push( selector );

        if( hasFirstContextNode && hasSecondContextNode )   selector = select( args[2], args[3] );
        else if( hasSecondContextNode )                     selector = select( args[1], args[2] );
        else if( hasFirstContextNode )                      selector = select( args[2] );
        else                                                selector = select( args[1] );

        if( bIsSingle ) newargs.push( selector[0] );
		else newargs.push( selector );

        return func.apply( null, newargs );
    }

	return {
		addClassAll: function() { return selector( d.addClass, arguments, arguments.length >= 3 ); },
		addClass: function() { return selector( d.addClass, arguments, arguments.length >= 3, true ); },
		removeClassAll: function() { return selector( d.removeClass, arguments, arguments.length >= 3 ); },
		removeClass: function() { return selector( d.removeClass, arguments, arguments.length >= 3, true ); },
		replaceClassAll: function() { return selector( d.replaceClass, arguments, arguments.length >= 4 ); },
		replaceClass: function() { return selector( d.replaceClass, arguments, arguments.length >= 4, true ); },
		hasClassAll: function() { return selector( d.hasClass, arguments, arguments.length >= 3 ); },
		hasClass: function() { return selector( d.hasClass, arguments, arguments.length >= 3, true ); },
		batchAll: function() { return selector( d.batch, arguments, !YAHOO.lang.isFunction( arguments[ 1 ] ) && arguments.length >= 3 ); },
		batch: function() { return selector( d.batch, arguments, !YAHOO.lang.isFunction( arguments[ 1 ] ) && arguments.length >= 3, true ); },
		generateIdAll: function() { return selector( d.generateId, arguments, !YAHOO.lang.isString(arguments[1]) && arguments.length >= 2 ); },
		generateId: function() { return selector( d.generateId, arguments, !YAHOO.lang.isString(arguments[1]) && arguments.length >= 2, true ); },
		getAll: function() { return selector( d.get, arguments, arguments.length >= 2 ); },
		get: function() { return selector( d.get, arguments, arguments.length >= 2, true ); },
        getChildren: function() { return selector( d.getChildren, arguments, arguments.length >= 2, true ); },
        getChildrenBy: function() { return selector( d.getChildrenBy, arguments, arguments.length >= 3, true ); },
        getAncestorBy: function() { return selector( d.getAncestorBy, arguments, arguments.length >= 3, true ); },
        getAncestorByClassName: function() { return selector( d.getAncestorByClassName, arguments, arguments.length >= 3, true ); },
		getAncestorByTagName: function() { return selector( d.getAncestorByTagName, arguments, arguments.length >= 3, true ); },
        getFirstChild: function() { return selector( d.getFirstChild, arguments, arguments.length >= 2, true ); }, // :first
        getFirstChildBy: function() { return selector( d.getFirstChildBy, arguments, arguments.length >= 3, true ); },
        getLastChild: function() { return selector( d.getLastChild, arguments, arguments.length >= 2, true ); }, // :last
        getLastChildBy: function() { return selector( d.getLastChildBy, arguments, arguments.length >= 3, true ); },
        getNextSibling: function() { return selector( d.getNextSibling, arguments, arguments.length >= 2, true ); },
        getNextSiblingBy: function() { return selector( d.getNextSiblingBy, arguments, arguments.length >= 3, true ); },
        getPreviousSibling: function() { return selector( d.getPreviousSibling, arguments, arguments.length >= 2, true ); },
        getPreviousSiblingBy: function() { return selector( d.getPreviousSiblingBy, arguments, arguments.length >= 3, true ); },
        getRegionAll: function() { return selector( d.getRegion, arguments, arguments.length >= 2 ); },
        getRegion: function() { return selector( d.getRegion, arguments, arguments.length >= 2, true ); },
        getStyle: function() { return selector( d.getStyle, arguments, arguments.length >= 3, true ); },
        getStyleAll: function() { return selector( d.getStyle, arguments, arguments.length >= 3 ); },
        getXAll: function() { return selector( d.getX, arguments, arguments.length >= 2 ); },
        getX: function() { return selector( d.getX, arguments, arguments.length >= 2, true ); },
        getYAll: function() { return selector( d.getY, arguments, arguments.length >= 2 ); },
        getY: function() { return selector( d.getY, arguments, arguments.length >= 2, true ); },
        getXYAll: function() { return selector( d.getXY, arguments, arguments.length >= 2 ); },
        getXY: function() { return selector( d.getXY, arguments, arguments.length >= 2, true ); },
        inDocument: function() { return selector( d.inDocument, arguments, arguments.length >= 2, true ); },
		insertAfter: function() { return selectorDouble( d.insertAfter, arguments, !YAHOO.lang.isString( arguments[1] ) && arguments.length >= 3, !YAHOO.lang.isString( arguments[arguments.length-1] ) && arguments.length >= 3, true ); },
		insertBefore: function() { return selectorDouble( d.insertBefore, arguments, !YAHOO.lang.isString( arguments[1] ) && arguments.length >= 3, !YAHOO.lang.isString( arguments[arguments.length-1] ) && arguments.length >= 3, true ); },
		isAncestor: function() { return selectorDouble( d.isAncestor, arguments, !YAHOO.lang.isString( arguments[1] ) && arguments.length >= 3, !YAHOO.lang.isString( arguments[arguments.length-1] ) && arguments.length >= 3, true ); },
        setStyle: function() { return selector( d.setStyle, arguments, arguments.length >= 4, true ); },
        setStyleAll: function() { return selector( d.setStyle, arguments, arguments.length >= 4 ); },
        setX: function() { return selector( d.setX, arguments, arguments.length >= 3, true ); },
        setXAll: function() { return selector( d.setX, arguments, arguments.length >= 3 ); },
        setY: function() { return selector( d.setY, arguments, arguments.length >= 3, true ); },
        setYAll: function() { return selector( d.setY, arguments, arguments.length >= 3 ); },
        setXY: function() { return selector( d.setXY, arguments, !YAHOO.lang.isArray(arguments[1]) && arguments.length >= 3, true ); },
        setXYAll: function() { return selector( d.setXY, arguments, !YAHOO.lang.isArray(arguments[1]) && arguments.length >= 3 ); },
	}
})();