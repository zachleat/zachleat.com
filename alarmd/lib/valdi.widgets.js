YAHOO.util.Event.onDOMReady( function()
{
	YAHOO.valdi.each( Ext.query( 'select[valdi:widget="hierarchicalOptions"]' ), function( j, obj )
	{
		YAHOO.valdi.widget.hierarchicalOptions.update.apply( obj, [] );
	} );

	YAHOO.valdi.each( Ext.query( 'select[valdi:widget="hierarchicalOptions"]' ), function( j, obj )
	{
		var parentComponent = YAHOO.valdi.widget.hierarchicalOptions.getParentComponent( obj );
		YAHOO.util.Event.addListener( parentComponent, YAHOO.valdi.formgetHeavyEventType( parentComponent ), YAHOO.valdi.widget.hierarchicalOptions.update, obj, true );
		/* YAHOO.UP.events.subscribe( 'form-resetall', function( fireArg, obj )
		{
			window.setTimeout( function() { YAHOO.valdi.widget.hierarchicalOptions.update.apply( obj, [] ); }, 10*j );
			//YAHOO.valdi.widget.hierarchicalOptions.update.apply( obj, [] );
		}, obj ); */
	} );

	// select none, select all, remove all options, set counter
	YAHOO.valdi.each( Ext.query( '*[valdi:widget="multipleOptionList"]' ), function( j, obj )
	{
		/* YAHOO.UP.events.subscribe( 'form-resetall', function( fireArg, obj )
		{
			YAHOO.valdi.widget.multipleOptionList.clear( obj );
		}, obj ); */

		YAHOO.util.Event.addListener( Ext.query( 'input[valdi:widgetComponent="addButton"], a[valdi:widgetComponent="addButton"], button[valdi:widgetComponent="addButton"]', obj ), 'click', YAHOO.valdi.widget.multipleOptionList.add, obj );
		YAHOO.util.Event.addListener( Ext.query( 'input[valdi:widgetComponent="removeButton"], a[valdi:widgetComponent="removeButton"], button[valdi:widgetComponent="removeButton"]', obj ), 'click', YAHOO.valdi.widget.multipleOptionList.remove, obj );
		YAHOO.util.Event.addListener( Ext.query( 'input[valdi:widgetComponent="addSource"]', obj ), 'keypress', function( e, obj )
		{
			if( YAHOO.util.Event.getCharCode( e ) == 13 )
			{
				YAHOO.util.Event.stopEvent( e );
				YAHOO.valdi.widget.multipleOptionList.add( e, obj );
			}
		}, obj );
		YAHOO.util.Event.addListener( Ext.query( 'select[valdi:widgetComponent="optionList"]', obj ), 'keydown', function( e, obj )
		{
			var keyCode = YAHOO.util.Event.getCharCode( e );
			var wrappedElement = YAHOO.valdi.formgetElement( this );
			if( e.ctrlKey && keyCode == 65 ) // ctrl + (A=65)
			{
				// select all
				YAHOO.util.Event.stopEvent( e );
				YAHOO.valdi.widget.multipleOptionList.selectAll.call( null, e, obj );
				/* var selectedValues = [];
				YAHOO.valdi.each( Ext.query( 'option', this ), function( j, optionObj )
				{
					selectedValues.push( optionObj.getAttribute( 'value' ) );
				} );
				YAHOO.valdi.formsetValue( wrappedElement, selectedValues ); */
			} else if( keyCode == 46 || keyCode == 8 ) { // delete=46, bksp=8
				YAHOO.util.Event.stopEvent( e );
				YAHOO.valdi.widget.multipleOptionList.remove( e, obj );
			}
		}, obj );
		YAHOO.util.Event.addListener( Ext.query( 'div.note.quickLinks a[valdi:attribute="selectAll"]', obj ), 'click', YAHOO.valdi.widget.multipleOptionList.selectAll, obj );
		YAHOO.util.Event.addListener( Ext.query( 'div.note.quickLinks a[valdi:attribute="selectNone"]', obj ), 'click', function( e, obj )
		{
			var targetElement = YAHOO.valdi.widget.multipleOptionList.getTargetElement( obj );
			if( targetElement )
			{
				if( YAHOO.valdi.widget.multipleOptionList.isTypeRadio( obj ) )
				{
					YAHOO.valdi.formsetValue( targetElement, '' );
				} else {
					YAHOO.valdi.formsetValue( targetElement, [] );
				}
			}
		}, obj );
		YAHOO.util.Event.addListener( Ext.query( 'div.note.quickLinks a[valdi:attribute="sort"]', obj ), 'click', YAHOO.valdi.widget.multipleOptionList.sort, obj );
	} );

	YAHOO.valdi.each( Ext.query( 'fieldset[valdi:widget="collapsible"], div[valdi:widget="collapsible"]' ), function( j, fieldsetObj )
	{
		var defaultOpen = fieldsetObj.getAttribute( 'valdi:uriId' ) && YAHOO.UP.util.uri.getHashValue( fieldsetObj.getAttribute( 'valdi:uriId' ) ) != null;
		if( !YAHOO.util.Dom.hasClass( fieldsetObj, 'collapsible' ) )
		{
			if( !defaultOpen ) YAHOO.valdi.widget.collapsible.toggle.call( fieldsetObj );
			else YAHOO.util.Dom.addClass( fieldsetObj, 'collapsible-open' );
		}/*  else {
			YAHOO.valdi.hide( Ext.query( 'div.fieldset', fieldsetObj ) );
		} */

		var legends = Ext.query( 'legend, div.legend', fieldsetObj );
		YAHOO.util.Dom.addClass( legends, 'clickable' );
		YAHOO.valdi.each( legends, function( j, legendObj )
		{
			if( legendObj.getAttribute( 'valdi:accesskey' ) != null )
			{
				YAHOO.util.Event.addListener( document, 'keydown', function( e )
				{
					if( e.altKey && String.fromCharCode( YAHOO.util.Event.getCharCode( e ) ).toLowerCase() == this.getAttribute( 'valdi:accesskey' ).toLowerCase() )
					{
						var listeners = YAHOO.util.Event.getListeners( this, 'click' );
						for( var j = 0; j < listeners.length; j++ )
						{
							listeners[ j ].fn.apply( listeners[ j ].adjust );
						}
						YAHOO.util.Event.stopEvent( e );
					}
				}, legendObj, true );
			}
			YAHOO.util.Event.addListener( legendObj, 'click', YAHOO.valdi.widget.collapsible.toggle, legendObj.parentNode, true );
		} );
		//YAHOO.UP.util.toggle( Ext.query( 'div.fieldset', fieldsetObj ) );
	} );

	YAHOO.valdi.each( Ext.query( 'label[valdi:widget="labelAsValue"]' ), function( j, label )
	{
		if( label.htmlFor == null ) throw new Error( 'When using the labelAsValue widget, make sure your label has a for attribute set.' );
		var targetElement = YAHOO.util.Dom.get( label.htmlFor );
		if( targetElement )
		{
			YAHOO.util.Event.addListener( targetElement, 'focus', YAHOO.valdi.widget.labelAsValue.focus, label );
			YAHOO.util.Event.addListener( targetElement, 'blur', YAHOO.valdi.widget.labelAsValue.blur, label );
			YAHOO.valdi.hide( label );
			YAHOO.valdi.widget.labelAsValue.blur.call( targetElement, null, label );
		}
		/* YAHOO.UP.events.subscribe( 'form-resetall', function( fireArg, label )
		{
			window.setTimeout( function() { YAHOO.valdi.widget.labelAsValue.blur.call( targetElement, null, label ); }, 100 );
		}, label ); */
	} );
} );

YAHOO.namespace( 'valdi.widget' );
YAHOO.namespace( 'valdi.widget.labelAsValue' );
YAHOO.valdi.widget.labelAsValue.focus = function( e, label )
{
	if( label == null ) return;
	if( YAHOO.valdi.formgetValue( this ) == label.innerHTML )
	{
		YAHOO.util.Dom.removeClass( this, 'labelAsValue' );
		YAHOO.valdi.formsetValue( this, '' );
		this.select(); // otherwise cursor will not appear in ie6
		this.focus();
	}
};
YAHOO.valdi.widget.labelAsValue.blur = function( e, label )
{
	if( label == null ) return;
	if( YAHOO.valdi.formgetValue( this ) == '' || YAHOO.valdi.formgetValue( this ) == label.innerHTML ) // checkEmpty function
	{
		YAHOO.util.Dom.addClass( this, 'labelAsValue' );
		YAHOO.valdi.formsetValue( this, label.innerHTML );
	} else {
		YAHOO.util.Dom.removeClass( this, 'labelAsValue' );
	}
};
YAHOO.namespace( 'valdi.widget.multipleOptionList' );
YAHOO.valdi.widget.multipleOptionList.getTargetElement = function( multipleOptionList )
{
	var selectElement = Ext.queryOne( 'select[valdi:widgetComponent="optionList"]', multipleOptionList );
	if( selectElement ) return YAHOO.valdi.formgetElement( selectElement );

	var checkboxElement = Ext.queryOne( 'div[valdi:widgetComponent="optionList"] input[type="checkbox"]', multipleOptionList );
	if( checkboxElement ) return YAHOO.valdi.formgetElement( checkboxElement );

	var radioElement = Ext.queryOne( 'div[valdi:widgetComponent="optionList"] input[type="radio"]', multipleOptionList );
	if( radioElement ) return YAHOO.valdi.formgetElement( radioElement );
	//else throw new Error( 'No target elements exist for the multiple option list widget.' );
};
YAHOO.valdi.widget.multipleOptionList.getTarget = function( multipleOptionList )
{
	return Ext.queryOne( 'select[valdi:widgetComponent="optionList"], div[valdi:widgetComponent="optionList"]', multipleOptionList );
};
YAHOO.valdi.widget.multipleOptionList._getType = function( multipleOptionList )
{
	var selectString;
	if( YAHOO.valdi.widget.multipleOptionList.isTypeCheckBox( multipleOptionList ) ) selectString = 'checkbox';
	else if( YAHOO.valdi.widget.multipleOptionList.isTypeRadio( multipleOptionList ) ) selectString = 'radio';
	else throw new Error( 'Invalid option type for multipleOptionList.' );

	return selectString;
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
YAHOO.valdi.widget.multipleOptionList.isTypeRadio = function( multipleOptionList )
{
	var target = YAHOO.valdi.widget.multipleOptionList.getTarget( multipleOptionList );
	return target.nodeName.toLowerCase() == 'div' && target.getAttribute( 'valdi:optionType' ) && target.getAttribute( 'valdi:optionType' ) == 'radio';
};
// obj is the multipleOptionList div
YAHOO.valdi.widget.multipleOptionList.add = function( e, obj )
{
	if( e ) YAHOO.util.Event.preventDefault( e );
	var source = Ext.query( 'input[valdi:widgetComponent="addSource"]', obj )[ 0 ];

	if( source != null )
	{
		/* if( !YAHOO.UP.validation.isValid( source ) || YAHOO.UP.validation.isWhiteListed( source, e ) )
		{
			return;
		} */

		var newValue = YAHOO.valdi.form.getValueRaw( source );

		if( newValue != '' )
		{
			YAHOO.valdi.widget.multipleOptionList.addManual( obj, newValue, newValue );

			YAHOO.valdi.formsetValue( source, '' );
		}
		if( e != null ) source.focus();
	} else {
		var str = Ext.queryOne( '*[valdi:widgetComponent="addButton"]', obj ).getAttribute( 'valdi:prompt' );
		if( str == null ) str = 'What would you like to add?';
		var addition = window.prompt( str, '' );
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
	} else {
		var typeString = YAHOO.valdi.widget.multipleOptionList._getType( obj );
		numberOfOptions = Ext.query( 'input[type="' + typeString + '"]', target ).length + 1;

		var id = target.getAttribute( 'id' ).concat( numberOfOptions );
		optionNode = document.createElement( 'label' );
		optionNode.htmlFor = id;
		
		//var inputNode = document.createElement( 'input' );
		var inputNode = YAHOO.valdi.widget.multipleOptionList.isTypeRadio( obj ) ? document.createNamedElement( 'input', target.getAttribute( 'id' ) + '__radio' ) : document.createElement( 'input' );
		inputNode.setAttribute( 'id', id );
		inputNode.setAttribute( 'type', typeString );
		inputNode.setAttribute( 'value', value );
		//inputNode.value = value;
		YAHOO.util.Dom.addClass( inputNode, typeString );
		optionNode.appendChild( inputNode );
		optionNode.appendChild( document.createTextNode( text ) );
		//YAHOO.valdi.formgetAllElements
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
YAHOO.valdi.widget.multipleOptionList.addMultipleManual = function( obj, keyValues )
{
	YAHOO.valdi.each( keyValues, function( key, text )
	{
		YAHOO.valdi.widget.multipleOptionList.addManual( obj, key, text );
	} );
};
YAHOO.valdi.widget.multipleOptionList.remove = function( e, obj )
{
	if( e ) YAHOO.util.Event.preventDefault( e );
	var target = YAHOO.valdi.widget.multipleOptionList.getTarget( obj );

	var newValue;
	if( target.getAttribute( 'valdi:allowDelete' ) != null )
	{
		var numberOfOptions;
		var min;
		if( YAHOO.valdi.widget.multipleOptionList.isTypeSelect( obj ) )
		{
			newValue = YAHOO.valdi.form.getValueRaw( target );
			if( newValue == [] ) return;
			var previousIndex = target.selectedIndex;
			YAHOO.valdi.each( newValue, function( k, selectedOption )
			{
				target.removeChild( Ext.queryOne( 'option[value="' + selectedOption + '"]', target ) );
			} );
			numberOfOptions = Ext.query( 'option', target ).length;
			min = target.getAttribute( 'size' );
		} else if( YAHOO.valdi.widget.multipleOptionList.isTypeCheckBox( obj ) ) {
			newValue = YAHOO.valdi.form.getValueRaw( Ext.query( 'input[type="checkbox"]', target ) );
			if( newValue == [] ) return;
			YAHOO.valdi.each( newValue, function( k, selectedOption )
			{
				// remove the parent label
				target.removeChild( Ext.queryOne( 'input[value="' + selectedOption + '"]', target ).parentNode );
			} );
			numberOfOptions = Ext.query( 'input[type="checkbox"]', target ).length;
		} else if( YAHOO.valdi.widget.multipleOptionList.isTypeRadio( obj ) ) {
			newValue = YAHOO.valdi.form.getValueRaw( Ext.query( 'input[type="radio"]', target ) );
			if( newValue == '' ) return;
			target.removeChild( Ext.queryOne( 'input[value="' + newValue + '"]', target ).parentNode );
			numberOfOptions = Ext.query( 'input[type="radio"]', target ).length;
		}

		YAHOO.valdi.widget.multipleOptionList.updateCounter( obj, numberOfOptions, min );

		if( YAHOO.valdi.widget.multipleOptionList.isTypeSelect( obj ) )
		{
			if( ( previousIndex + 1 ) > numberOfOptions ) previousIndex = numberOfOptions - 1;
			target.selectedIndex = previousIndex;
		}
	}
};
YAHOO.valdi.widget.multipleOptionList.updateCounter = function( widgetDiv, numberOfOptions, min )
{
	if( Ext.query( 'span[valdi:widgetComponent="counter"]', widgetDiv ).length > 0 )
	{
		var size = min || 1;
		Ext.query( 'span[valdi:widgetComponent="counter"]', widgetDiv )[ 0 ].innerHTML = numberOfOptions > ( size - 1 ) ? '(' + numberOfOptions + ')' : '';
	}
};
YAHOO.valdi.widget.multipleOptionList.selectAll = function( e, obj )
{
	//var target = YAHOO.valdi.widget.multipleOptionList.getTarget( obj );
	YAHOO.util.Event.stopEvent( e );
	var formElement = YAHOO.valdi.widget.multipleOptionList.getTargetElement( obj );
	if( !formElement ) return;

	YAHOO.valdi.formsetValue( formElement, YAHOO.valdi.formgetAvailableValue( formElement ) );

	if( YAHOO.valdi.widget.multipleOptionList.isTypeSelect( obj ) )
	{
		formElement.focus();
	}
};
YAHOO.valdi.widget.multipleOptionList.clear = function( widgetDiv )
{
	var target = YAHOO.valdi.widget.multipleOptionList.getTarget( widgetDiv );
	var min;
	if( YAHOO.valdi.widget.multipleOptionList.isTypeSelect( widgetDiv ) )
	{
		if( target.getAttribute( 'valdi:allowDelete' ) == 'true' )
		{
			target.innerHTML = '';
			//YAHOO.valdi.widget.multipleOptionList.getTarget( obj ).options.length = 0;
		}
		min = target.getAttribute( 'size' );
	} else {
		target.innerHTML = '';
	}
	YAHOO.valdi.widget.multipleOptionList.updateCounter( widgetDiv, 0, min );
};

/* FIX SORT
	bugs: 	doesn't sort right when text != values */
YAHOO.valdi.widget.multipleOptionList.sort = function( e, obj )
{
	var wrappedElement = YAHOO.valdi.widget.multipleOptionList.getTargetElement( obj );
	//var wrappedElement = YAHOO.valdi.formgetElement( Ext.queryOne( 'select[valdi:widgetComponent="optionList"]', obj ) );
	YAHOO.util.Event.stopEvent( e );
	var preSelectedValues = YAHOO.valdi.formgetValue( wrappedElement );
	var preAvailableValues = YAHOO.valdi.formgetAvailableValue( wrappedElement );
	YAHOO.valdi.widget.multipleOptionList.clear( obj );

	var preOptions = new Array();
	preOptions = preOptions.concat( preAvailableValues );
	preAvailableValues.sort();
	if( preOptions.toString() == preAvailableValues.toString() )
	{
		preAvailableValues.reverse();
	}
	YAHOO.valdi.each( preAvailableValues, function( j, value )
	{
		YAHOO.valdi.widget.multipleOptionList.addManual( obj, value, value );
	} );
	var numberOfOptions = preAvailableValues.length;
	var size;
	if( YAHOO.valdi.widget.multipleOptionList.isTypeSelect( obj ) )
	{
		size = wrappedElement.getAttribute( 'size' );
	} else {
		size = 1;
	}
	YAHOO.valdi.formsetValue( YAHOO.valdi.widget.multipleOptionList.getTargetElement( obj ), preSelectedValues );
	YAHOO.valdi.widget.multipleOptionList.updateCounter( obj, numberOfOptions, size || 1 );
};

YAHOO.namespace( 'valdi.widget.hierarchicalOptions' );
YAHOO.valdi.widget.hierarchicalOptions.update = function( e ) /* ~250ms per call */
{
	// the scope has been redefined to be the child object in the hierarchy (event was fired from parent)
	var dataStore;
	var cacheId = this.getAttribute( 'valdi:cacheId' ) ? this.getAttribute( 'valdi:cacheId' ) : 'hierarchicalOptions_' + this.getAttribute( 'id' );
	if( YAHOO.valdi.cache.has( cacheId ) )
	{
		dataStore = YAHOO.valdi.cache.get( cacheId );
	} else {
		dataStore = {};
		YAHOO.valdi.each( this.options, function( k, optionObj )
		{
			if( optionObj.getAttribute( 'valdi:parentValue' ) )
			{
				if( dataStore[ optionObj.getAttribute( 'valdi:parentValue' ) ] == null )
				{
					dataStore[ optionObj.getAttribute( 'valdi:parentValue' ) ] = [];
				}
				var selected = optionObj[ 'defaultSelected' ];
				dataStore[ optionObj.getAttribute( 'valdi:parentValue' ) ][ optionObj.getAttribute( 'value' ) ] = { 'value': optionObj.innerHTML, 'selected': selected };
			}
		} );
		
		YAHOO.valdi.cache.add( cacheId, dataStore );
	}

	var parentComponent = YAHOO.valdi.widget.hierarchicalOptions.getParentComponent( this );
	var currentValue = YAHOO.valdi.form.getValueRaw( parentComponent );

	if( dataStore[ currentValue ] )
	{
		if( this.getAttribute( 'valdi:hideParentDivWithNoOptions' ) && this.getAttribute( 'valdi:hideParentDivWithNoOptions' ) == 'true' )
		{
			YAHOO.valdi.show( YAHOO.valdi.formcallRaw( this, YAHOO.valdi.formgetParentDivElement ) );
		} else {
			YAHOO.valdi.show( this );
			YAHOO.valdi.hide( Ext.query( 'span.emptyLabel', this.parentNode ) );
		}

		var selectedItems = YAHOO.valdi.form.getValueRaw( this );
		this.innerHTML = '';
		var option = document.createElement( 'option' );
		option.value = '';
		option.innerHTML = '&nbsp;';
		this.appendChild( option );
		for( var j in dataStore[ currentValue ] )
		{
			var option = document.createElement( 'option' );
			option.value = j;
			option.innerHTML = dataStore[ currentValue ][ j ][ 'value' ] != '' ? dataStore[ currentValue ][ j ][ 'value' ] : j;
			if( !e && dataStore[ currentValue ][ j ][ 'selected' ] && !YAHOO.valdi.util.Array.hasValue( selectedItems, j ) )
			{
				selectedItems.push( j ); //option.setAttribute( 'selected', 'selected' );
			}
			this.appendChild( option );
		}
		YAHOO.valdi.formsetValueRaw( this, selectedItems );
	} else {
		if( this.getAttribute( 'valdi:hideParentDivWithNoOptions' ) && this.getAttribute( 'valdi:hideParentDivWithNoOptions' ) == 'true' )
		{
			YAHOO.valdi.hide( YAHOO.valdi.formcallRaw( this, YAHOO.valdi.formgetParentDivElement ) );
		} else {
			YAHOO.valdi.hide( this );
			YAHOO.valdi.show( Ext.query( 'span.emptyLabel', this.parentNode ) );
		}
	}

	YAHOO.valdi.widget.hierarchicalOptions.hideChildrenComponents( this );
};
YAHOO.valdi.widget.hierarchicalOptions.getParentComponent = function( /* HTML element */childObject )
{
	try {
		return document.getElementById( childObject.getAttribute( 'valdi:parentComponent' ) );
	} catch(e) {
		throw new Error( 'Problem fetching parent component (' + childObject.getAttribute( 'valdi:parentComponent' ) + ') in hierarchical options widget.' );
	}
};
YAHOO.valdi.widget.hierarchicalOptions.hideChildrenComponents = function( /* HTML element */parentObj )
{
	YAHOO.valdi.each( Ext.query( 'select[valdi:parentComponent="' + parentObj.getAttribute( 'id' ) + '"]' ), function( j, obj )
	{
		if( obj.getAttribute( 'valdi:hideParentDivWithNoOptions' ) && obj.getAttribute( 'valdi:hideParentDivWithNoOptions' ) == 'true' )
		{
			YAHOO.valdi.hide( YAHOO.valdi.formcallRaw( obj, YAHOO.valdi.formgetParentDivElement ) );
		} else {
			YAHOO.valdi.hide( obj );
			YAHOO.valdi.show( Ext.query( 'span.emptyLabel', obj.parentNode ) );
		}
		var childrensChildren = Ext.query( 'select[valdi:parentComponent="' + obj.getAttribute( 'id' ) + '"]' );
		if( childrensChildren.length > 0 ) YAHOO.valdi.widget.hierarchicalOptions.hideChildrenComponents( obj );
	} );
};
YAHOO.namespace( 'valdi.widget.collapsible' );
YAHOO.valdi.widget.collapsible.show = function( e )
{
	YAHOO.valdi.show( Ext.query( 'div.fieldset', this ) );
	if( !YAHOO.util.Dom.hasClass( this, 'collapsible-open' ) ) YAHOO.valdi.toggle( [ this ], 'collapsible', 'collapsible-open' );
};
YAHOO.valdi.widget.collapsible.toggle = function( e )
{
	YAHOO.valdi.toggle( Ext.query( 'div.fieldset', this ) );
	return YAHOO.valdi.toggle( [ this ], 'collapsible', 'collapsible-open' );
};

YAHOO.namespace( 'valdi.widget.smartLabel' );
YAHOO.util.Event.addListener( window, 'load', function( e )
{
	YAHOO.valdi.each( Ext.query( 'span[valdi:widget="smartLabel"]' ), function( j, spanObj )
	{
		var target = spanObj.getAttribute( 'valdi:targetId' );
		if( target )
		{
			var targetObj = YAHOO.util.Dom.get( target );
			alert( 'Not yet implemented (smartLabel)' );
			//YAHOO.UP.validation.addGenericListener( [ targetObj ], YAHOO.valdi.widget.smartLabel.update, spanObj );
			//YAHOO.valdi.widget.smartLabel.update.apply( targetObj, [ null, spanObj ] );
		}
	} );
} );
YAHOO.valdi.widget.smartLabel.update = function( e, obj )
{
	// this = the form element that the label is monitoring
	// obj = the span element holding the label
	var value = YAHOO.valdi.form.getValueRaw( this );
	if( YAHOO.lang.isArray( value ) && value.length == 1 ) value = value[ 0 ];
	if( parseInt( value, 10 ) == 1 )
	{
		YAHOO.valdi.show( obj );
		YAHOO.valdi.hide( Ext.query( 'span[valdi:type="plural"]', obj ) );
		YAHOO.valdi.show( Ext.query( 'span[valdi:type="singular"]', obj ) );
	} else if( parseInt( value, 10 ) == 0 || parseInt( value, 10 ) > 1 ) {
		YAHOO.valdi.show( obj );
		YAHOO.valdi.hide( Ext.query( 'span[valdi:type="singular"]', obj ) );
		YAHOO.valdi.show( Ext.query( 'span[valdi:type="plural"]', obj ) );
	} else {
		YAHOO.valdi.hide( obj );
	}
};

YAHOO.namespace( 'valdi.widget.inlineEdit' );
YAHOO.util.Event.addListener( window, 'load', function( e )
{
	YAHOO.valdi.each( Ext.query( 'div[valdi:widget="inlineEdit"]' ), function( j, divObj )
	{
		var target = divObj.getAttribute( 'valdi:targetId' );
		if( target )
		{
			var targetObj = YAHOO.util.Dom.get( target );
			alert( 'Not yet implemented (inlineEdit)' );
			//YAHOO.UP.validation.addHeavyListener( [ targetObj ], YAHOO.valdi.widget.inlineEdit.update, divObj );
			// end actual comment
			//YAHOO.valdi.widget.inlineEdit.update.apply( targetObj, [ null, divObj ] );
			YAHOO.util.Event.addListener( divObj, 'click', function( e, obj )
			{
				YAHOO.valdi.hide( this );
				YAHOO.valdi.formsetValueRaw( obj, YAHOO.valdi.util.String.trim( this.innerHTML ) );
				YAHOO.valdi.show( obj );
				obj.focus();
			}, targetObj );
			YAHOO.util.Event.addListener( divObj, 'mouseover', function( e )
			{
				YAHOO.util.Dom.addClass( this, 'inlineEditHover' );
			} );
			YAHOO.util.Event.addListener( divObj, 'mouseout', function( e )
			{
				YAHOO.util.Dom.removeClass( this, 'inlineEditHover' );
			} );
		}
	} );
} );
YAHOO.valdi.widget.inlineEdit.update = function( e, obj )
{
	// this = the form element that the label is monitoring
	// obj = the div element holding the text
	var value = YAHOO.valdi.form.getValueRaw( this );
	YAHOO.valdi.hide( this );
	YAHOO.valdi.show( obj );
	obj.innerHTML = value;
};