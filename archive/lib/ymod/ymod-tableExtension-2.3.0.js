/*
	// columnSet and dataSource are instances of YAHOO.widget.ColumnSet and YAHOO.util.DataSource, respectively.
	var table = new YAHOO.widget.DataTable( 'myDataTable', columnSet, dataSource, { selectionMode: 'single' } );
	YAHOO.ymod.tableExtension.setup( table, function( contentDiv )
	{
		var myContent = '';
		var selectedRows = this.getSelectedRows();
		if( selectedRows.length > 0 )
		{
			myContent += 'Do something based on the row that is selected!';
		}
		contentDiv.innerHTML = myContent;
	} );
 */

YAHOO.namespace( 'YAHOO.ymod.tableExtension' );
YAHOO.ymod.tableExtension.setup = function( dataTable, contentCallback )
{
	dataTable.subscribe( 'headerRowMousedownEvent', YAHOO.ymod.tableExtension.cleanUp );
	dataTable.subscribe( 'rowClickEvent', YAHOO.ymod.tableExtension.selectRow, contentCallback );
};
YAHOO.ymod.tableExtension.selectRow = function( args, callback )
{
	if( this.get( 'selectionMode' ) == 'single' )
	{
		YAHOO.ymod.tableExtension.collapseAll.call( this );
		if( YAHOO.util.Dom.hasClass( args.target, 'yui-dt-selected' ) )
			this.unselectAllRows();
		else
			this.onEventSelectRow.call( this, args );

		YAHOO.ymod.tableExtension.clickAndExpand.call( this, args[ 'event' ], callback );
	}
};
YAHOO.ymod.tableExtension.clickAndExpand = function( e, content )
{
	var selectedRows = this.getSelectedTrEls();
	if( selectedRows.length > 0 )
	{
		if( YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'ymod-expandedData' ) )
		{
			YAHOO.util.Dom.removeClass( selectedRows[ 0 ].previousSibling, 'ymod-expanded' );
			selectedRows[ 0 ].parentNode.removeChild( selectedRows[ 0 ] );
		} else if( !YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'ymod-expanded' ) ) {
			var newRow = document.createElement( 'tr' );
			var newCell = document.createElement( 'td' );
			var newDiv = document.createElement( 'div' );
			YAHOO.util.Dom.addClass( newDiv, 'ymod-expandedDataContent' );
			if( content != null && YAHOO.lang.isFunction( content ) )
			{
				content.call( this, newDiv );
			} else {
				throw new Error( 'A function is needed for the content callback in ymod.datatable expandable.' );
			}
			newCell.appendChild( newDiv );
			newCell.colSpan = selectedRows[ 0 ].childNodes.length;
			newRow.appendChild( newCell );		
			YAHOO.util.Dom.addClass( newRow, 'ymod-expandedData' );
			YAHOO.util.Dom.addClass( newRow, 'yui-dt-selected' );
			if( YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'yui-dt-odd' ) ) YAHOO.util.Dom.addClass( newRow, 'yui-dt-odd' );
			else if( YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'yui-dt-even' ) ) YAHOO.util.Dom.addClass( newRow, 'yui-dt-even' );
			YAHOO.util.Dom.addClass( selectedRows[ 0 ], 'ymod-expanded' );

			if( selectedRows[ 0 ].nextSibling != null )
				selectedRows[ 0 ].parentNode.insertBefore( newRow, selectedRows[ 0 ].nextSibling );
			else 
				selectedRows[ 0 ].parentNode.appendChild( newRow );

			YAHOO.util.Event.addListener( newRow, 'click', function( e, dataTable )
			{
				YAHOO.ymod.tableExtension.collapseRow( this );
				dataTable.unselectAllRows();
				YAHOO.util.Event.stopEvent( e );
			}, this );
			YAHOO.util.Event.stopEvent( e );
			return newDiv;
		} else {
			selectedRows[ 0 ].parentNode.removeChild( selectedRows[ 0 ].nextSibling );
			YAHOO.util.Dom.removeClass( selectedRows[ 0 ], 'ymod-expanded' );
			YAHOO.util.Event.stopEvent( e );
		}
	}
};

// pass in the expanded content, NOT the parent row.
YAHOO.ymod.tableExtension.collapseRow = function( row )
{
	YAHOO.util.Dom.removeClass( row.previousSibling, 'ymod-expanded' );
	row.parentNode.removeChild( row );
};

YAHOO.ymod.tableExtension.cleanUp = function( args )
{
	if( this.get( 'selectionMode' ) == 'single' )
	{
		YAHOO.ymod.tableExtension.collapseAll.call( this );
		this.unselectAllRows();
	}
};

//scope must be the datatable object
YAHOO.ymod.tableExtension.collapseAll = function()
{
	var nodes = YAHOO.util.Dom.getElementsByClassName( 'ymod-expanded', 'tr', this._elTable );
	for( var j = 0, t = nodes.length; j < t; j++ )
	{
		nodes[ j ].parentNode.removeChild( nodes[ j ].nextSibling );
		YAHOO.util.Dom.removeClass( nodes[ j ], 'ymod-expanded' );
	}
};