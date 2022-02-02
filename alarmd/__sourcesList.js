YAHOO.util.Event.onDOMReady( function()
{
	// select none, select all, remove all options, set counter
	YAHOO.valdi.each( Ext.query( '*[valdi:widget="multipleOptionList"]' ), function( j, obj )
	{
		YAHOO.util.Event.addListener( Ext.query( 'input[valdi:widgetComponent="addButton"], a[valdi:widgetComponent="addButton"], button[valdi:widgetComponent="addButton"]', obj ), 'click', YAHOO.valdi.widget.multipleOptionList.add, obj );
		YAHOO.util.Event.addListener( Ext.query( 'input[valdi:widgetComponent="addSource"]', obj ), 'keypress', function( e, obj )
		{
			if( YAHOO.util.Event.getCharCode( e ) == 13 )
			{
				YAHOO.util.Event.stopEvent( e );
				YAHOO.valdi.widget.multipleOptionList.add( e, obj );
			}
		}, obj );
	} );
} );

YAHOO.namespace( 'valdi.widget.multipleOptionList' );
YAHOO.valdi.widget.multipleOptionList.getTargetElement = function( multipleOptionList )
{
	var selectElement = Ext.queryOne( 'select[valdi:widgetComponent="optionList"]', multipleOptionList );
	var checkboxElement = Ext.queryOne( 'div[valdi:widgetComponent="optionList"] input[type="checkbox"]', multipleOptionList );
	if( selectElement ) return selectElement;
	else if( checkboxElement ) return checkboxElement;
	//else throw new Error( 'No target elements exist for the multiple option list widget.' );
};
YAHOO.valdi.widget.multipleOptionList.getTarget = function( multipleOptionList )
{
	return Ext.queryOne( 'select[valdi:widgetComponent="optionList"], div[valdi:widgetComponent="optionList"]', multipleOptionList );
};
YAHOO.valdi.widget.multipleOptionList.isTypeSelect = function( multipleOptionList )
{
	var target = YAHOO.valdi.widget.multipleOptionList.getTarget( multipleOptionList );
	return target.nodeName.toLowerCase() == 'select';
};
YAHOO.valdi.widget.multipleOptionList.isTypeCheckBox = function( multipleOptionList )
{
	var target = YAHOO.valdi.widget.multipleOptionList.getTarget( multipleOptionList );
	return target.nodeName.toLowerCase() == 'div' && target.getAttribute( 'valdi:optionType' ) && target.getAttribute( 'valdi:optionType' ) == 'checkbox';
};
// obj is the multipleOptionList div
YAHOO.valdi.widget.multipleOptionList.add = function( e, obj )
{
	if( e ) YAHOO.util.Event.preventDefault( e );
	var source = Ext.query( 'input[valdi:widgetComponent="addSource"]', obj )[ 0 ];

	if( source != null )
	{
		/*if( !YAHOO.valdi.validation.isValid( source ) || YAHOO.valdi.validation.isWhiteListed( source, e ) )
		{
			return;
		}*/
	
		var newValue = YAHOO.valdi.form.getValueRaw( source );
	
		if( newValue != '' )
		{
			YAHOO.valdi.widget.multipleOptionList.addManual( obj, newValue, newValue );
	
			YAHOO.valdi.form.setValue( source, '' );
		}
		source.focus();
	} else {
		var addition = window.prompt( 'Input the URL of the source (Accepts: MP3, YouTube)' + "\n" + ' or last.fm (\'last.fm/tag/yourTag\' or \'last.fm/user/yourUsername\')', '' );
		if( addition != null && addition != '' )
			YAHOO.valdi.widget.multipleOptionList.addManual( obj, addition, addition );
	}
};
/* obj is the valdi:widget="multipleOptionList" div. */
YAHOO.valdi.widget.multipleOptionList.addManual = function( obj, value, text )
{
	var target = YAHOO.valdi.widget.multipleOptionList.getTarget( obj );
	var optionNode, numberOfOptions;
	if( YAHOO.valdi.widget.multipleOptionList.isTypeSelect( obj ) )
	{
		optionNode = document.createElement( 'option' );
		optionNode.setAttribute( 'value', value );
		optionNode.appendChild( document.createTextNode( text ) );

		numberOfOptions = Ext.query( 'option', target ).length + 1;
	} else if( YAHOO.valdi.widget.multipleOptionList.isTypeCheckBox( obj ) ) {
		numberOfOptions = Ext.query( 'input[type="checkbox"]', target ).length + 1;

		var id = target.getAttribute( 'id' ).concat( numberOfOptions );
		optionNode = document.createElement( 'label' );
		optionNode.htmlFor = id;
		var inputNode = document.createElement( 'input' )
		inputNode.setAttribute( 'type', 'checkbox' );
		inputNode.setAttribute( 'class', 'checkbox' );
		inputNode.setAttribute( 'id', id );
		inputNode.setAttribute( 'value', value );
		optionNode.appendChild( inputNode );
		optionNode.appendChild( document.createTextNode( text ) );

		//YAHOO.valdi.form.getAllElements
	}
	target.appendChild( optionNode );

	// update counter
	if( Ext.query( 'span[valdi:widgetComponent="counter"]', obj ).length > 0 )
	{
		var size = target.getAttribute( 'size' ) ? target.getAttribute( 'size' ) : 1;
		if( numberOfOptions > ( size - 1 ) )
		{
			Ext.query( 'span[valdi:widgetComponent="counter"]', obj )[ 0 ].innerHTML = '(' + numberOfOptions + ')';
		}
	}
};