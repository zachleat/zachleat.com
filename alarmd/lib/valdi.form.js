YAHOO.namespace( 'valdi.form' );
/* returns a Wrapped Html Form Element (for Radios, Checkboxes) */
YAHOO.valdi.form.getElement = function( /* Child Html Form Element */formElement )
{
	if( YAHOO.valdi.form.Radio.isArray( formElement ) ) return Ext.query( 'input[type=radio]', formElement[ 0 ].parentNode.parentNode ); // account for labels
	else if( YAHOO.valdi.form.CheckBox.isArray( formElement ) ) return Ext.query( 'input[type=checkbox]', formElement[ 0 ].parentNode.parentNode );
	else if( YAHOO.valdi.form.Radio.is( formElement ) ) return Ext.query( 'input[type=radio]', formElement.parentNode ); // account for labels
	else if( YAHOO.valdi.form.CheckBox.is( formElement ) ) return Ext.query( 'input[type=checkbox]', formElement.parentNode );
	else if( YAHOO.valdi.form.Text.is( formElement )
			|| YAHOO.valdi.form.Password.is( formElement )
			|| YAHOO.valdi.form.TextArea.is( formElement )
			|| YAHOO.valdi.form.Select.isMultiple( formElement )
			|| YAHOO.valdi.form.Select.is( formElement )
			|| YAHOO.valdi.form.Button.is( formElement ) ) return formElement;
	else throw new Error( 'Could not find matching wrapper element.' );
};
YAHOO.valdi.form.getElementArgument = function( formElement )
{
	if( YAHOO.lang.isString( formElement ) ) return document.getElementById( formElement );
	else if( YAHOO.lang.isArray( formElement ) ) return YAHOO.util.Dom.get( formElement );
	else return formElement;
};
YAHOO.valdi.form.getClass = function( /* Wrapped Html Form Element */formElement )
{
	// make sure array checks are first
	if( YAHOO.valdi.form.Radio.isArray( formElement ) ) return YAHOO.valdi.form.Radio;
	else if( YAHOO.valdi.form.CheckBox.isArray( formElement ) ) return YAHOO.valdi.form.CheckBox;
	else if( YAHOO.valdi.form.Text.is( formElement ) ) return YAHOO.valdi.form.Text;
	else if( YAHOO.valdi.form.Password.is( formElement ) ) return YAHOO.valdi.form.Password;
	else if( YAHOO.valdi.form.TextArea.is( formElement ) ) return YAHOO.valdi.form.TextArea;
	else if( YAHOO.valdi.form.Select.is( formElement ) ) return YAHOO.valdi.form.Select;
	else if( YAHOO.valdi.form.Button.is( formElement ) ) return YAHOO.valdi.form.Button;
	else throw new Error( 'Could not find matching class for the form element.' );
};
YAHOO.valdi.form.getValueRaw = function( /* Child Html Form Element */formElement )
{
	if( YAHOO.lang.isString( formElement ) ) formElement = YAHOO.util.Dom.get( formElement );
	return YAHOO.valdi.form.getValue( YAHOO.valdi.form.getElement( formElement ) );
};
YAHOO.valdi.form.getValue = function( /* Wrapped Html Form Element */formElement )
{
	// if formElement is a checkbox or a radio and not an array, get the element first.
	return YAHOO.valdi.form.getClass( formElement ).getValue( formElement );
};
YAHOO.valdi.form.getAvailableValueRaw = function( /* Child Html Form Element */formElement )
{
	if( YAHOO.lang.isString( formElement ) ) formElement = YAHOO.util.Dom.get( formElement );
	return YAHOO.valdi.form.getAvailableValue( YAHOO.valdi.form.getElement( formElement ) );
};
YAHOO.valdi.form.getAvailableValue = function( /* Wrapped Html Form Element */formElement )
{
	return YAHOO.valdi.form.getClass( formElement ).getAvailableValue( formElement );
};
YAHOO.valdi.form.setValueRaw = function( /* Html Form Element */formElement, value )
{
	if( YAHOO.lang.isString( formElement ) ) formElement = YAHOO.util.Dom.get( formElement );
	YAHOO.valdi.form.setValue( YAHOO.valdi.form.getElement( formElement ), value );
};
YAHOO.valdi.form.setValue = function( /* Wrapped Html Form Element */formElement, value )
{
	YAHOO.valdi.form.getClass( formElement ).setValue( formElement, value );
};

YAHOO.valdi.form.isElementArray = function( /* Array */elements, /* function */checkFunction )
{
	var allElements = false;
	if( elements.length > 0 )
	{
		allElements = true;
		for( var j = 0; j < elements.length; j++ )
		{
			if( !checkFunction( elements[ j ] ) )
			{
				allElements = false;
				break;
			}
		}
	}
	return allElements;
};

YAHOO.namespace( 'YAHOO.valdi.form.Text' );
YAHOO.valdi.form.Text.is = function( element ) { return element.nodeName.toLowerCase() == 'input' && element.getAttribute( 'type' ) == 'text'; };
YAHOO.valdi.form.Text.getValue = function( /* Wrapped Html Form Element */formElement ) { return formElement.value; };
YAHOO.valdi.form.Text.getAvailableValue = YAHOO.valdi.form.Text.getValue;
YAHOO.valdi.form.Text.setValue = function( formElement, value ) { formElement.value = value; };

YAHOO.namespace( 'YAHOO.valdi.form.Password' );
YAHOO.valdi.form.Password.is = function( element ) { return element.nodeName.toLowerCase() == 'input' && element.getAttribute( 'type' ) == 'password'; };
YAHOO.valdi.form.Password.getValue = YAHOO.valdi.form.Text.getValue;
YAHOO.valdi.form.Password.getAvailableValue = YAHOO.valdi.form.Password.getValue;
YAHOO.valdi.form.Password.setValue = YAHOO.valdi.form.Text.setValue;

YAHOO.namespace( 'YAHOO.valdi.form.TextArea' );
YAHOO.valdi.form.TextArea.is = function( element ) { return element.nodeName.toLowerCase() == 'textarea'; };
YAHOO.valdi.form.TextArea.getValue = YAHOO.valdi.form.Text.getValue;
YAHOO.valdi.form.TextArea.getAvailableValue = YAHOO.valdi.form.TextArea.getValue;
YAHOO.valdi.form.TextArea.setValue = YAHOO.valdi.form.Text.setValue;

YAHOO.namespace( 'YAHOO.valdi.form.Radio' );
YAHOO.valdi.form.Radio.is = function( element ) { return element.nodeName.toLowerCase() == 'input' && element.getAttribute( 'type' ) == 'radio'; };
YAHOO.valdi.form.Radio.isArray = function( /* Array */elements ) { return YAHOO.valdi.form.isElementArray( elements, YAHOO.valdi.form.Radio.is ); };
YAHOO.valdi.form.Radio.getValue = function( /* Wrapped Html Form Element */formElement )
{
	for( var j = 0; j < formElement.length; j++ )
	{
		if( YAHOO.valdi.form.Radio.is( formElement[ j ] ) && formElement[ j ].checked ) return formElement[ j ].value;
	}
};
YAHOO.valdi.form.Radio.getAvailableValue = function( /* Wrapped Html Form Element */formElement )
{
	for( var j = 0; j < formElement.length; j++ )
	{
		if( YAHOO.valdi.form.Radio.is( formElement[ j ] ) ) return formElement[ j ].value;
	}
};
YAHOO.valdi.form.Radio.setValue = function( /* Wrapped Html Form Element */formElement, /* String */value )
{
	for( var j = 0; j < formElement.length; j++ )
	{
		if( YAHOO.valdi.form.Radio.is( formElement[ j ] ) && value == formElement[ j ].value ) formElement[ j ].checked = true;
	}
};

YAHOO.namespace( 'YAHOO.valdi.form.CheckBox' );
YAHOO.valdi.form.CheckBox.is = function( element ) { return element.nodeName.toLowerCase() == 'input' && element.getAttribute( 'type' ) == 'checkbox'; };
YAHOO.valdi.form.CheckBox.isChecked = function( element ) 
{
	element = YAHOO.valdi.form.getElementArgument( element );
	if( YAHOO.lang.isArray( element ) ) element = element[ 0 ];

	return YAHOO.valdi.form.getValueRaw( element )[ 0 ] == element.getAttribute( 'value' );
};
YAHOO.valdi.form.CheckBox.isArray = function( /* Array */elements ) { return YAHOO.valdi.form.isElementArray( elements, YAHOO.valdi.form.CheckBox.is ); };
YAHOO.valdi.form.CheckBox.getValue = function( /* Wrapped Html Form Element */formElement )
{
	var values = [];
	for( var j = 0; j < formElement.length; j++ )
	{
		if( YAHOO.valdi.form.CheckBox.is( formElement[ j ] ) && formElement[ j ].checked ) values.push( formElement[ j ].value );
	}
	return values;
};
YAHOO.valdi.form.CheckBox.getAvailableValue = function( /* Wrapped Html Form Element */formElement )
{
	var values = [];
	for( var j = 0; j < formElement.length; j++ )
	{
		if( YAHOO.valdi.form.CheckBox.is( formElement[ j ] ) ) values.push( formElement[ j ].value );
	}
	return values;
};
YAHOO.valdi.form.CheckBox.setValue = function( /* Wrapped Html Form Element */formElement, /* String */value )
{
	for( var j = 0; j < formElement.length; j++ )
	{
		if( YAHOO.valdi.form.CheckBox.is( formElement[ j ] ) )
		{
			if( YAHOO.valdi.util.Array.hasValue( value, formElement[ j ].value ) ) formElement[ j ].checked = true;
			else formElement[ j ].checked = false;
		}
	}
};

YAHOO.namespace( 'YAHOO.valdi.form.Select' );
YAHOO.valdi.form.Select.is = function( element ) { return element.nodeName.toLowerCase() == 'select'; };
YAHOO.valdi.form.Select.isMultiple = function( element ) { return element.nodeName.toLowerCase() == 'select' && element.getAttribute( 'multiple' ) == 'multiple'; };
YAHOO.valdi.form.Select.getValue = function( /* Wrapped Html Form Element */formElement )
{
	var values = [];
	if( formElement.options.length == 0 ) return values;
	YAHOO.valdi.each( formElement.options, function( i, obj )
	{
		if( obj.selected )
		{
			values.push( obj.getAttribute( 'value' ) );
		}
	} );
	return values;
};
YAHOO.valdi.form.Select.getAvailableValue = function( /* Wrapped Html Form Element */formElement )
{
	var values = [];
	YAHOO.valdi.each( Ext.query( 'option', formElement ), function( i, obj )
	{
		values.push( obj.getAttribute( 'value' ) );
	} );
	return values;
};
YAHOO.valdi.form.Select.setValue = function( /* Wrapped Html Form Element */formElement, /* String */value )
{
	if( (typeof value).toLowerCase() == 'string' ) value = [ value ];

	if( formElement.options.length == 0 ) return;
	YAHOO.valdi.each( formElement.options, function( i, obj )
	{
		var isSelected = YAHOO.valdi.util.Array.hasValue( value, obj[ 'value' ] );
		try {
			obj[ 'selected' ] = isSelected;
		} catch( e ) {}
	} );
};

YAHOO.namespace( 'YAHOO.valdi.form.Button' );
YAHOO.valdi.form.Button.is = function( element )
{
	return element.nodeName.toLowerCase() == 'button'
			|| element.nodeName.toLowerCase() == 'input' && element.getAttribute( 'type' ) == 'submit'
			|| element.nodeName.toLowerCase() == 'input' && element.getAttribute( 'type' ) == 'reset'
			|| element.nodeName.toLowerCase() == 'input' && element.getAttribute( 'type' ) == 'button';
};
YAHOO.valdi.form.Button.getValue = YAHOO.valdi.form.Text.getValue;
YAHOO.valdi.form.Button.getAvailableValue = YAHOO.valdi.form.Button.getValue;
YAHOO.valdi.form.Button.setValue = YAHOO.valdi.form.Text.setValue;