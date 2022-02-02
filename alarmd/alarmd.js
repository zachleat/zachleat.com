YAHOO.util.Event.onDOMReady( function()
{
	YAHOO.util.Event.addListener( 'add', 'click', function() { YAHOO.alarmd.addAlarm(); } );
	YAHOO.util.Event.addListener( 'test', 'click', YAHOO.alarmd.trigger );
	YAHOO.util.Event.addListener( 'reset', 'click', YAHOO.alarmd.resetAll );
	YAHOO.util.Event.addListener( 'lite', 'click', YAHOO.alarmd.nightMode );
	YAHOO.util.Event.addListener( 'offline', 'change', YAHOO.alarmd.goOffline );
	/* if( !window.google || !google.gears ) {} else {
		YAHOO.valdi.show( document.getElementById( 'offline' ).parentNode );
	} */

	YAHOO.valdi.util.accessKey( 'r', function() { YAHOO.alarmd.addAlarm(); } );
	YAHOO.util.Event.addListener( 'fontBigger', 'click', YAHOO.alarmd.template.fontBigger );
	YAHOO.util.Event.addListener( 'fontSmaller', 'click', YAHOO.alarmd.template.fontSmaller );
	YAHOO.util.Event.addListener( 'fontSet', 'click', YAHOO.alarmd.template.fontSet );
	YAHOO.util.Event.addListener( 'fontMax', 'click', YAHOO.alarmd.template.fontAuto );
	YAHOO.util.Event.addListener( Ext.query( '.colorSet' ), 'click', YAHOO.alarmd.template.setColorPreset );

	if( YAHOO.alarmd.getTimeZone( new Date() ) != null )
		YAHOO.util.Dom.get( 'zone' ).appendChild( document.createTextNode( YAHOO.alarmd.getTimeZone( new Date() ) ) );

	window.setInterval( YAHOO.alarmd.updateClock, 1000 );

	YAHOO.util.Event.addListener( document, 'keydown', function( e )
	{
		var keymashCount;
		if( YAHOO.valdi.cache.has( 'keymash' ) )
		{
			keymashCount = YAHOO.valdi.cache.get( 'keymash' );
			keymashCount++;
			YAHOO.valdi.cache.update( 'keymash', keymashCount );
			if( keymashCount > 5 )
			{
				YAHOO.alarmd.kill();
			}
		} else {
			keymashCount = 0;
			YAHOO.valdi.cache.add( 'keymash', 0 );
		}
		if( !YAHOO.valdi.cache.has( 'keymashTimeout' ) )
		{
			var timeout = window.setTimeout( function() {
				YAHOO.valdi.cache.update( 'keymash', 0 );
				YAHOO.valdi.cache.remove( 'keymashTimeout' );
			}, 1000 );
			YAHOO.valdi.cache.add( 'keymashTimeout', timeout );
		}
	} );

	YAHOO.alarmd.settings.read();
	YAHOO.util.Event.addListener( window, 'unload', function( e ) { YAHOO.alarmd.settings.save(); } );
	YAHOO.util.Event.addListener( 'save', 'click', function( e ) { YAHOO.alarmd.settings.save( e ); } );
	/* YAHOO.util.Event.addListener( 'src', 'change', function( e ) { YAHOO.alarmd.cache(); } ); */
	YAHOO.util.Event.addListener( 'default', 'click', function( e ) { YAHOO.alarmd.settings.defaults(); } );
	YAHOO.util.Event.addListener( 'preferences-display', 'click', function( e )
	{
		YAHOO.valdi.toggle( [ 'preferences' ] );
	} );
} );

YAHOO.namespace( 'alarmd' );
YAHOO.alarmd.nightMode = function()
{
	YAHOO.util.Dom.get( 'alarm' ).innerHTML = '';
	YAHOO.valdi.toggle( Ext.query( '.hide-night-mode' ) );
};
/* YAHOO.alarmd.cache = function()
{
	var src = YAHOO.valdi.form.getValueRaw( 'src' )[ 0 ];
	var type = YAHOO.alarmd.type.getType( src );
	if( src == null || src == '' ) src = 'https://www.youtube.com/v/ICecxOfmFtU'; // Rage - Wake Up
	var alarm = YAHOO.util.Dom.get( 'alarm' );
	YAHOO.valdi.hide( alarm );

	var content;
	switch( type )
	{
		case YAHOO.alarmd.type.YOUTUBE:
			src = YAHOO.valdi.util.String.simpleReplace( src, 'watch?v=', 'v/' );
			content = '<embed src="' + src + '&autoplay=1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="350"></embed>';
			break;
		case YAHOO.alarmd.type.PANDORA_EMBED:
		case YAHOO.alarmd.type.PANDORA:
			alert( 'Cannot cache Pandora streams.' );
			alarm.setAttribute( 'cached', 'false' );
			YAHOO.valdi.hide( 'cached' );
			return;
		case YAHOO.alarmd.type.LASTFM:
			alert( 'Cannot cache LastFM streams.' );
			alarm.setAttribute( 'cached', 'false' );
			YAHOO.valdi.hide( 'cached' );
			return;
		default:
			throw 'Invalid Alarm Source (' + src + ') for Caching';
			break;
	}

	alarm.innerHTML = '';
	if( content ) alarm.innerHTML = content;

	var killAlarm = YAHOO.valdi.element( { 'span.color-night.clickable': '#KILL IT' }, alarm );
	YAHOO.util.Event.addListener( killAlarm, 'click', function( e )
	{
		//YAHOO.util.Event.removeListener( this, 'click' );
		YAHOO.alarmd.kill();		
	} );
	YAHOO.valdi.element( { 'span#kill-note.color-night': '#CLICK ABOVE or MASH SOME KEYS' }, alarm );

	alarm.setAttribute( 'cached', 'true' );
	YAHOO.valdi.show( 'cached' );
}; */

YAHOO.namespace( 'YAHOO.alarmd.type' );
YAHOO.alarmd.type.YOUTUBE = 2;
YAHOO.alarmd.type.PANDORA = 3;
YAHOO.alarmd.type.PANDORA_EMBED = 4;
YAHOO.alarmd.type.LASTFM = 5;
YAHOO.alarmd.type.getType = function( src )
{
	if( src == null || src == '' ) return;
	if( src.indexOf( 'youtube.com' ) > -1 ) {
		return YAHOO.alarmd.type.YOUTUBE;
	} else if( src.indexOf( 'pandora.com' ) > -1 && src.indexOf( '.swf' ) > -1 ) {
		return YAHOO.alarmd.type.PANDORA_EMBED;
	} else if( src.indexOf( 'pandora.com' ) > -1 ) {
		return YAHOO.alarmd.type.PANDORA;
	} else if( src.indexOf( 'last.fm' ) > -1 ) {
		return YAHOO.alarmd.type.LASTFM;
	}
};

YAHOO.alarmd.trigger = function()
{
	var alarm = YAHOO.util.Dom.get( 'alarm' );
	if( alarm.getAttribute( 'cached' ) && alarm.getAttribute( 'cached' ) == 'true' )
	{
		YAHOO.valdi.show( alarm );
		alarm.setAttribute( 'cached', 'false' );
		YAHOO.valdi.hide( 'cached' );
		return;
	}
	alarm.innerHTML = '';

	var src = YAHOO.valdi.form.getValueRaw( 'src' )[ 0 ];
	if( src == null || src == '' ) src = 'https://www.youtube.com/v/ICecxOfmFtU'; // Rage - Wake Up
	var type = YAHOO.alarmd.type.getType( src );

	var content;
	switch( type )
	{
		case YAHOO.alarmd.type.YOUTUBE:
			src = YAHOO.valdi.util.String.simpleReplace( src, 'watch?v=', 'v/' );
			content = '<embed src="' + src + '&autoplay=1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="350"></embed>';
			break;
		case YAHOO.alarmd.type.PANDORA_EMBED:
			//content = '<embed src="https://www.pandora.com:443/radio/tuner_8_0_0_0_pandora_mini.swf" quality=high bgcolor=#FFFFFF WIDTH="640" HEIGHT="250" MENU="false" NAME="radio" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer" FlashVars="_tunervar_cmd=mini&_tunervar_shost=www.pandora.com&_tunervar_skin=pandora_mini&_tunervar_zone=prod&_tunervar_width=640&_tunervar_amazonurl=http%3A%2F%2Fwww.amazon.com%2Fexec%2Fobidos%2Fredirect%3Ftag%3Dsavagebeast-20&_tunervar_height=250&_tunervar_host=www.pandora.com&_tunervar_ar=0&_tunervar_port=80&_tunervar_sport=443&_tunervar_itunesurl=http%3A%2F%2Fclick.linksynergy.com%2Ffs-bin%2Fstat%3Fid%3DFLenzF8lvbI%26offerid%3D78941%26type%3D3%26subid%3D0%26tmpid%3D1826"></embed>';
			YAHOO.valdi.element( 'iframe[style="width:640px;height:250px",frameborder="0",src="http://www.pandora.com/?cmd=mini"]', alarm );
			break;
		/* case YAHOO.alarmd.type.PANDORA:
			window.open( src, 'alarmdWindow' );
			return; */
		case YAHOO.alarmd.type.LASTFM:
			//content = '<style type="text/css">table.lfmWidget20070527022148 td {margin:0 !important;padding:0 !important;border:0 !important;}table.lfmWidget20070527022148 tr.lfmHead a:hover {background:url(http://panther1.last.fm/widgets/images/en/header/radio/regular_black.gif) no-repeat 0 0 !important;}table.lfmWidget20070527022148 tr.lfmEmbed object {float:left;}table.lfmWidget20070527022148 tr.lfmFoot td.lfmConfig a:hover {background:url(http://panther1.last.fm/widgets/images/en/footer/black_np.gif) no-repeat 0 0 !important;;}table.lfmWidget20070527022148 tr.lfmFoot td.lfmView a:hover {background:url(http://panther1.last.fm/widgets/images/en/footer/black_np.gif) no-repeat -85px 0 !important;}table.lfmWidget20070527022148 tr.lfmFoot td.lfmPopup a:hover {background:url(http://panther1.last.fm/widgets/images/en/footer/black_np.gif) no-repeat -159px 0 !important;}</style>';
			//content += '<table class="lfmWidget20070527022148" cellpadding="0" cellspacing="0" border="0" style="width:184px;"><tr class="lfmHead"><td><a title="Music tagged indie " href="http://www.last.fm/listen/globaltags/indie" target="_blank" style="display:block;overflow:hidden;height:20px;width:184px;background:url(http://panther1.last.fm/widgets/images/en/header/radio/regular_black.gif) no-repeat 0 -20px;text-decoration:none;"></a></td></tr><tr class="lfmEmbed"><td><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="184" height="140" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab%23version=7,0,0,0" style="float:left;"><param name="bgcolor" value="000000" /><param name="movie" value="http://panther1.last.fm/widgets/radio/3.swf" /><param name="quality" value="high" /><param name="allowScriptAccess" value="sameDomain" /><param name="FlashVars" value="lfmMode=radio&amp;radioURL=globaltags%2Findie&amp;title=Music+tagged+indie+&amp;theme=black&amp;autostart=1" /><embed src="http://panther1.last.fm/widgets/radio/3.swf" type="application/x-shockwave-flash" name="widgetPlayer" bgcolor="000000" width="184" height="140" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer"  FlashVars="lfmMode=radio&amp;radioURL=globaltags%2Findie&amp;title=Music+tagged+indie+&amp;theme=black&amp;autostart=1" allowScriptAccess="sameDomain"></embed></object></td></tr><tr class="lfmFoot"><td style="background:url(http://panther1.last.fm/widgets/images/footer_bg/black.gif) repeat-x 0 0;text-align:right;"><table cellspacing="0" cellpadding="0" border="0" style="width:184px;"><tr><td class="lfmConfig"><a href="http://www.last.fm/widgets/?widget=radio&amp;url=globaltags%2Findie&amp;colour=black&amp;width=regular&amp;autostart=1&amp;from=widget" title="Get your own" target="_blank" style="display:block;overflow:hidden;width:85px;height:20px;float:right;background:url(http://panther1.last.fm/widgets/images/en/footer/black_np.gif) no-repeat 0 -20px;text-decoration:none;"></a></td><td class="lfmView" style="width:74px;"><a href="http://www.last.fm/" title="Visit Last.fm" target="_blank" style="display:block;overflow:hidden;width:74px;height:20px;background:url(http://panther1.last.fm/widgets/images/en/footer/black_np.gif) no-repeat -85px -20px;text-decoration:none;"></a></td><td class="lfmPopup"style="width:25px;"><a href="http://www.last.fm/widgets/popup/?widget=radio&amp;url=globaltags%2Findie&amp;colour=black&amp;width=regular&amp;autostart=1&amp;from=widget&amp;resize=1" title="Load this radio in a pop up" target="_blank" style="display:block;overflow:hidden;width:25px;height:20px;background:url(http://panther1.last.fm/widgets/images/en/footer/black_np.gif) no-repeat -159px -20px;text-decoration:none;" onclick="window.open(this.href + \'&amp;resize=0','lfm_popup','height=240,width=234,resizable=yes,scrollbars=yes\'); return false;"></a></td></tr></table></td></tr></table>';
			var mode = src.split( '/' );
			if( mode[ 1 ].toLowerCase() == 'tag' )
			{
				var tag = mode[ 2 ];
				if( tag == 'null' ) tag = 'indie';
				content = '<embed src="http://panther1.last.fm/widgets/radio/3.swf" type="application/x-shockwave-flash" name="widgetPlayer" bgcolor="000000" width="184" height="140" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer"  FlashVars="lfmMode=radio&amp;radioURL=globaltags%2F' + tag + '&amp;title=Music+tagged+' + tag + '+&amp;theme=black&amp;autostart=1" allowScriptAccess="sameDomain"></embed>';
			} else if( mode[ 1 ].toLowerCase() == 'user' ) {
				var user = mode[ 2 ];
				if( user == 'null' ) user = 'theweezel';
				content = '<embed src="http://panther1.last.fm/widgets/radio/3.swf" type="application/x-shockwave-flash" name="widgetPlayer" bgcolor="000000" width="184" height="140" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer"  FlashVars="lfmMode=radio&amp;radioURL=user%2F' + user + '%2Fpersonal&amp;title=' + user + '%E2%80%99s+Radio+Station&amp;theme=black&amp;autostart=1" allowScriptAccess="sameDomain"></embed>';
			} else if( mode[ 1 ].toLowerCase() == 'playlist' ) {
				// theweezel's playlist
				// var user = mode[ 2 ];
				// if( user == 'null' ) user = 'theweezel';
				// content = '<embed src="http://panther1.last.fm/widgets/playlist/3.swf" type="application/x-shockwave-flash" name="widgetPlayer" bgcolor="000000" width="184" height="284" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer"  FlashVars="lfmMode=playlist&amp;resourceType=37&amp;resourceID=101470&amp;radioURL=user%2F' + user + '%2Fplaylist&amp;username=' + user + '&amp;title=' + user + '%E2%80%99s+Playlist&amp;theme=black&amp;autostart=1" allowScriptAccess="sameDomain"></embed>';
			}
			break;
		default:
            window.open( src, 'alarmdWindow' );
			//throw 'Invalid Alarm Source (' + src + ')';
			break;
	}
	if( content ) alarm.innerHTML = content;
	
	var killAlarm = YAHOO.valdi.element( { 'span.color-night.clickable': '#KILL IT' }, alarm );
	YAHOO.util.Event.addListener( killAlarm, 'click', function( e )
	{
		//YAHOO.util.Event.removeListener( this, 'click' );
		YAHOO.alarmd.kill();		
	} );
	YAHOO.valdi.element( { 'span#kill-note.color-night': '#CLICK ABOVE or MASH SOME KEYS' }, alarm );
};
YAHOO.alarmd.kill = function( string )
{
	YAHOO.util.Dom.get( 'alarm' ).innerHTML = string != null ? string : '';
};
YAHOO.alarmd.updateClock = function()
{
	YAHOO.util.Dom.get( 'clock' ).innerHTML = '';
	var now = new Date();
	var clockValue;
	if( YAHOO.valdi.form.CheckBox.isChecked( 'countdown' ) )
	{
		var firstAlarmDateObj = YAHOO.valdi.cache.get( 'alarms-first' );
		if( firstAlarmDateObj )
		{
			clockValue = { 'span.clock-width': YAHOO.alarmd.displayTimeDifferenceExtended( firstAlarmDateObj ) };
		} else {
			YAHOO.valdi.form.setValueRaw( 'countdown', [] );
			alert( 'You need at least one alarm to be in Count Down mode.' );
		}
	} else {
		clockValue = YAHOO.alarmd.displayTime( now );
	}
	YAHOO.valdi.element( clockValue, 'clock' );

	var todaysCheckBox = YAHOO.util.Dom.get( 'alarm-dow-' + now.getDay() );
	if( todaysCheckBox )
	{
		if( !YAHOO.util.Dom.hasClass( todaysCheckBox.parentNode, 'color-dusk' ) )
		{
			var allLabels = Ext.query( 'label.dow', todaysCheckBox.parentNode.parentNode );
			YAHOO.util.Dom.removeClass( allLabels, 'color-dusk' );
			YAHOO.util.Dom.addClass( todaysCheckBox.parentNode, 'color-dusk' );
		}
	}

	var appliesToNow = YAHOO.alarmd.appliesToDate( now );
	var alertShown = YAHOO.valdi.isShown( 'today-alert' );
	if( !appliesToNow && !alertShown )
		YAHOO.valdi.show( 'today-alert' );
	else if( appliesToNow && alertShown )
		YAHOO.valdi.hide( 'today-alert' );

	var appliesToTomorrow = YAHOO.alarmd.appliesToDate( new Date( now.getTime() + 1000*60*60*24 ) );
	var alertShown = YAHOO.valdi.isShown( 'tomorrow-alert' );
	if( !appliesToTomorrow && !alertShown )
		YAHOO.valdi.show( 'tomorrow-alert' );
	else if( appliesToTomorrow && alertShown )
		YAHOO.valdi.hide( 'tomorrow-alert' );
};
YAHOO.alarmd.displayTime = function( timeObj, bShowSeconds )
{
	var is24HourFormat = YAHOO.valdi.form.getValueRaw( 'format' )[ 0 ] == '24';
	var showSeconds;
	if( bShowSeconds == null ) showSeconds = YAHOO.valdi.form.CheckBox.isChecked( 'seconds' );
	else showSeconds = bShowSeconds;

	var str = {};
	if( is24HourFormat ) str[ 'span.h' ] = '#' + ( timeObj.getHours() < 10 ? '0' : '' ) + timeObj.getHours();
	else str[ 'span.h' ] = '#' + ( timeObj.getHours() == 0 || timeObj.getHours() == 12 ? 12 : timeObj.getHours() % 12 );
	str[ 'span.m' ] = '#:' + ( timeObj.getMinutes() < 10 ? '0' : '' ) + timeObj.getMinutes();

	var suffix = [];
	if( showSeconds ) suffix.push( { 'span.s.color-night': '#:' + ( timeObj.getSeconds() < 10 ? '0' : '' ) + timeObj.getSeconds() } );
	if( !is24HourFormat && timeObj.getHours() >= 12 ) suffix.push( '# PM' ); 
	else if( !is24HourFormat && timeObj.getHours() < 12 ) suffix.push( '# AM' );
	str[ 'span.suffix' ] = suffix;

	return { 'span.clock-width': str };
};
YAHOO.alarmd.displayTimeDifferenceExtended = function( futureTime, pastTime )
{
	if( pastTime == null ) pastTime = new Date();

	var seconds = Math.ceil( ( futureTime.getTime() - pastTime.getTime() ) / 1000 );
	var minutes = 0, hours = 0;
	if( seconds > 60 )
	{
		minutes = Math.floor( seconds / 60 );
		seconds = seconds % 60;
	}
	if( minutes > 60 )
	{
		hours = Math.floor( minutes / 60 );
		minutes = minutes % 60;
	}

	var bNumberFormat = YAHOO.valdi.form.CheckBox.isChecked( 'format' );

	var el = {};
	if( hours > 0 ) el[ 'span.h' ] = bNumberFormat ? '#' + ( hours < 10 ? '0' : '' ) + hours + ':' : [ '#' + hours, { 'span.suffix.color-night': '#H ' } ];
	if( minutes > 0 ) el[ 'span.m' ] = bNumberFormat ? '#' + ( minutes < 10 ? '0' : '' ) + minutes : [ '#' + minutes, { 'span.suffix.color-night': '#M' } ];
	if( minutes == 0 || YAHOO.valdi.form.CheckBox.isChecked( 'seconds' ) )
	{
		if( bNumberFormat ) el[ 'span.suffix span.s.color-night' ] = '#:' + ( seconds < 10 ? '0' : '' ) + seconds;
		else el[ 'span.suffix span.s' ] = [ '# ' + seconds, { 'span.color-night': '#S' } ];
	}

	return el;
};
YAHOO.alarmd.displayTimeDifference = function( futureTime, pastTime )
{
	if( pastTime == null ) pastTime = new Date();

	var diffMinutes = Math.ceil( ( futureTime.getTime() - pastTime.getTime() ) / ( 1000*60 ) );
	var diffHours = 0, diffHoursRounded = 0;
	if( diffMinutes > 60 )
	{
		diffHours = Math.floor( diffMinutes / 60 );
		diffHoursRounded = Math.round( diffMinutes / 60 );
		diffMinutes = diffMinutes % 60;
	}
	if( diffHours == 0 && diffMinutes == 0 ) return { 'span.h': '#NOW' };
	if( diffHoursRounded > 9 )
	{
		return { 'span.h': '#' + diffHoursRounded + 'h ' };
	} else {
		var el = {};
		if( diffHours > 0 ) el[ 'span.h' ] = '#' + diffHours + 'h ';
		if( diffMinutes > 0 ) el[ 'span.m' ] = '#' + diffMinutes + 'm';
		return el;
	}
};
YAHOO.alarmd.resetAll = function()
{
	if( confirm( 'This will erase all of your alarms.  Do you wish to continue?' ) )
	{
		YAHOO.valdi.each( Ext.query( 'div.alarm' ), function( j, alarm )
		{
			YAHOO.alarmd.removeAlarm.call( alarm );
			YAHOO.util.Event.removeListener( window, 'unload' );
			window.location.href += '&';
		} );
	}
};
YAHOO.alarmd.removeAlarm = function( e )
{
	window.clearInterval( YAHOO.valdi.cache.get( 'alarms', this.getAttribute( 'id' ) ) );
	YAHOO.valdi.cache.remove( 'alarms', this.getAttribute( 'id' ) );
	YAHOO.valdi.cache.remove( 'alarms-date', this.getAttribute( 'id' ) );
	if( YAHOO.util.Dom.hasClass( this, 'first' ) )
	{
		if( this.nextSibling != null )
			YAHOO.alarmd.changeFirstAlarm( this.nextSibling );
		else
			YAHOO.valdi.cache.remove( 'alarms-first' );
	}
	this.parentNode.removeChild( this );
};
YAHOO.alarmd.addAlarm = function( defaultPrompt )
{
	var alarmTime = prompt( 'What time do you want the alarm to go off? (Accepts +20m, +2h)', defaultPrompt != null ? defaultPrompt : '' );
	if( alarmTime == null || alarmTime == '' ) return false;

	return YAHOO.alarmd.addAlarmManual( alarmTime );
};
YAHOO.alarmd.addAlarmManual = function( alarmTime )
{
	var timeObj = YAHOO.alarmd.parseTime( alarmTime );
	if( timeObj == null )
	{
		alert( 'Could not parse ' + alarmTime );
		return false;
	}

	var allAlarms = YAHOO.util.Dom.get( 'active' );
	var minutesTilAlarm = Math.floor( ( timeObj.getTime() - (new Date()).getTime() ) / ( 1000*60 ) );

	var index = allAlarms.childNodes.length;
	var activeAlarm = YAHOO.valdi.element( 'div#alarm-' + index + '.alarm.color-night-border[alarmd:minutes="' + minutesTilAlarm + '",title="Double Click to Edit"]' )[ 0 ];
	YAHOO.alarmd.initAlarm( activeAlarm, timeObj );
	YAHOO.valdi.cache.add( 'alarms-date', activeAlarm.getAttribute( 'id' ), timeObj );

	if( allAlarms.childNodes.length == 0 )
	{
		YAHOO.alarmd.changeFirstAlarm( activeAlarm );
		allAlarms.appendChild( activeAlarm );
	} else if( Ext.query( 'div.alarm[alarmd:minutes="' + minutesTilAlarm + '"]' ).length == 0 ) {
		YAHOO.valdi.each( allAlarms.childNodes, function( j, child )
		{
			var childMinutesTilAlarm = parseInt( child.getAttribute( 'alarmd:minutes' ), 10 );
			var nextChildMinutesTilAlarm = child.nextSibling ? parseInt( child.nextSibling.getAttribute( 'alarmd:minutes' ), 10 ) : 0;
			if( minutesTilAlarm < childMinutesTilAlarm ) {
				YAHOO.alarmd.changeFirstAlarm( activeAlarm );
				allAlarms.insertBefore( activeAlarm, allAlarms.firstChild );
				return false;
			} else if( minutesTilAlarm > childMinutesTilAlarm && minutesTilAlarm < nextChildMinutesTilAlarm ) {
				allAlarms.insertBefore( activeAlarm, child.nextSibling );
				YAHOO.util.Dom.addClass( activeAlarm, 'hide-night-mode' );
				return false;
			} else if( j == allAlarms.childNodes.length - 1 ) {
				allAlarms.appendChild( activeAlarm );
				YAHOO.util.Dom.addClass( activeAlarm, 'hide-night-mode' );
				// done anyway
			}
		} );
	} 

	var interval = window.setInterval( function() {
		var now = new Date();
		activeAlarm.setAttribute( 'alarmd:minutes', Math.ceil( ( timeObj.getTime() - now.getTime() ) / ( 1000*60 ) ) );
		if( timeObj.getTime() < now.getTime() )
		{
			var appliesToNow = YAHOO.alarmd.appliesToDate( now );
			// TRIGGER ALARM
			if( appliesToNow ) YAHOO.alarmd.trigger();
			timeObj.setTime( timeObj.getTime() + 1000*60*60*24 );
			var letsMove = allAlarms.removeChild( activeAlarm );
			allAlarms.appendChild( letsMove );
			YAHOO.alarmd.changeFirstAlarm( allAlarms.firstChild );
		}
		YAHOO.alarmd.updateAlarm( activeAlarm, timeObj );
	}, 5000 );

	YAHOO.util.Event.addListener( activeAlarm, 'dblclick', function( e )
	{
		var str = Ext.queryOne( 'div.time span.h', this ).innerHTML
			+ Ext.queryOne( 'div.time span.m', this ).innerHTML
			+ Ext.queryOne( 'div.time span.suffix', this ).innerHTML;
		if( YAHOO.alarmd.addAlarm( str ) != false )
		{
			YAHOO.alarmd.removeAlarm.call( this, e );
		}
	}, activeAlarm, true );
	YAHOO.valdi.cache.add( 'alarms', activeAlarm.getAttribute( 'id' ), interval );
};
YAHOO.alarmd.changeFirstAlarm = function( newFirstAlarmDiv )
{
	var previousFirstAlarmDivs = Ext.query( 'div.alarm.first' );
	if( previousFirstAlarmDivs.length > 0 )
	{
		YAHOO.util.Dom.removeClass( previousFirstAlarmDivs, 'first' );
		YAHOO.util.Dom.addClass( previousFirstAlarmDivs, 'hide-night-mode' );
	}

	YAHOO.valdi.cache.update( 'alarms-first', YAHOO.valdi.cache.get( 'alarms-date', newFirstAlarmDiv.getAttribute( 'id' ) ) );
	YAHOO.util.Dom.addClass( newFirstAlarmDiv, 'first' );
	YAHOO.util.Dom.removeClass( newFirstAlarmDiv, 'hide-night-mode' );	
};
YAHOO.alarmd.appliesToDate = function( date )
{
	var dow = Ext.query( '#dow input[type="checkbox"]' );
	return dow.length > 0 ? YAHOO.valdi.form.getValueRaw( dow ).join( '' ).indexOf( date.getDay() ) > -1 : false;
};
YAHOO.alarmd.initAlarm = function( alarmDiv, timeObj )
{
	YAHOO.valdi.element.replace( {
		'span.kill.clickable.color-night[title="Delete this Alarm"]': '#X',
		'div.time.color-night': YAHOO.alarmd.displayTime( timeObj, false ),
		'div.diff.color-morning': YAHOO.alarmd.displayTimeDifference( timeObj )
	}, alarmDiv );

	YAHOO.util.Event.addListener( Ext.query( 'span.kill', alarmDiv ), 'click', YAHOO.alarmd.removeAlarm, alarmDiv, true );
};
YAHOO.alarmd.updateAlarm = function( alarmDiv, timeObj )
{
	YAHOO.valdi.element.replace( YAHOO.alarmd.displayTime( timeObj, false ), Ext.queryOne( 'div.time', alarmDiv ) );
	YAHOO.valdi.element.replace( YAHOO.alarmd.displayTimeDifference( timeObj ), Ext.queryOne( 'div.diff', alarmDiv ) );
};
YAHOO.alarmd.parseTime = function( value )
{
	var relativeTime = new RegExp( /\+\s?([0-9]+)\s?([HhMmSs])?/g ); // @todo: add combinations of h, m, s together, or 01:01:01 syntax
	if( ( node = relativeTime.exec( value ) ) != null )
	{
		var now = new Date();
		if( node[ 2 ] && node[ 2 ].toUpperCase() == 'S' ) now.setTime( now.getTime() + parseInt( node[ 1 ], 10 )*1000 );
		else if( node[ 2 ] && node[ 2 ].toUpperCase() == 'M' ) now.setTime( now.getTime() + parseInt( node[ 1 ], 10 )*1000*60 );
		else now.setTime( now.getTime() + parseInt( node[ 1 ], 10 )*1000*60*60 ); // default to hours

		return now;
	}
	// normalize when minutes are fully typed in
	// allow an empty hour or minute string => 00
	var isValid = (new RegExp( '^((0?[0-9])|(1[0-9])|(2[0-3]))[^0-9]?(0?[0-9]|[1-5][0-9])?[^0-9A-Za-z]?(am|AM|pm|PM)?$' )).test( value );
	var isAMSpecified = value.toUpperCase().indexOf( 'AM' ) > -1;
	var isPMSpecified = value.toUpperCase().indexOf( 'PM' ) > -1;
	var strippedValue = ( new String( value ) ).replace( /[^0-9]/g, '' );
	var normalizedValue = ( new String( value ) ).replace( /[^0-9]/g, ':' );
	//var isAmbiguous = false;
	//var normalizeValue = false;
	//var autoComplete = false;

	var hour, minute;
	if( strippedValue.length == 1 )
	{
		hour = parseInt( strippedValue, 10 );
		minute = 0;
		//autoComplete = true;
	} else if( isValid && strippedValue.length == 4 ) {
		hour = parseInt( strippedValue.substr( 0, 2 ), 10 );
		minute = parseInt( strippedValue.substr( 2 ), 10 );
		//normalizeValue = true;
	} else if( isValid && strippedValue.length == 2 ) {
		if( ( parseInt( strippedValue, 10 ) >= 24 || normalizedValue.indexOf( ':' ) > -1 )
			&& parseInt( strippedValue.substr( 1 ), 10 ) >= 6 )
		{
			hour = parseInt( strippedValue.substr( 0, 1 ), 10 );
			minute = parseInt( strippedValue.substr( 1 ), 10 );
			//normalizeValue = true;
		} else if( parseInt( strippedValue, 10 ) < 24 ) {
			hour = parseInt( strippedValue, 10 );
			minute = 0;
			//autoComplete = true;
		} else {
			hour = parseInt( strippedValue.substr( 0, 1 ), 10 );
			minute = parseInt( strippedValue.substr( 1, 1 ), 10 );
			//autoComplete = true;
		}
	} else if( isValid && strippedValue.length == 3 && normalizedValue.indexOf( ':' ) > -1 ) {
		var split = normalizedValue.split( ':' );
		hour = parseInt( split[ 0 ], 10 );
		minute = parseInt( split[ 1 ], 10 );
		//if( split[ 1 ].length == 2 || minute >= 6 ) normalizeValue = true;
	} else if( isValid && strippedValue.length == 3 ) {
		if( parseInt( strippedValue.substr( 0, 1 ), 10 ) >= 2 && parseInt( strippedValue.substr( 1, 1 ), 10 ) >= 6 )
		{
			isValid = false;
		} else if( parseInt( strippedValue.substr( 0, 1 ), 10 ) < 2 && parseInt( strippedValue.substr( 1, 1 ), 10 ) >= 6 ) {
			hour = parseInt( strippedValue.substr( 0, 2 ), 10 );
			minute = parseInt( strippedValue.substr( 2 ), 10 );
		} else if( parseInt( strippedValue.substr( 0, 2 ), 10 ) >= 24 && parseInt( strippedValue.substr( 1, 1 ), 10 ) < 6 ) {
			hour = parseInt( strippedValue.substr( 0, 1 ), 10 );
			minute = parseInt( strippedValue.substr( 1 ), 10 );
			//normalizeValue = true;
		} else {
			// assume first two digits are the hour instead of throwing error message.
			hour = parseInt( strippedValue.substr( 0, 1 ), 10 );
			minute = parseInt( strippedValue.substr( 1 ), 10 );
			//autoComplete = true;
		}
	}

	if( isValid && hour!= null && minute != null )
	{
		if( isAMSpecified && hour == 12 ) hour = 0;
		if( isPMSpecified && hour < 12 ) hour += 12;

		var now = new Date();
		now.setSeconds( 0 );

		if( hour < now.getHours() || hour == now.getHours() && minute < now.getMinutes() )
		{
			now.setHours( hour );
			now.setMinutes( minute );
			now.setTime( now.getTime() + 1000*60*60*24 ); // 1 day more
		} else {
			now.setHours( hour );
			now.setMinutes( minute );
		}

		return now;
	}
};
YAHOO.alarmd.isDaylightSavings = function( dateObj )
{
	return dateObj.toString().indexOf( 'DT' ) != -1 || dateObj.toString().indexOf( 'Daylight Time' ) != -1;
};
/* returns a 3 character representation of the time zone. */
YAHOO.alarmd.getTimeZone = function( dateObj )
{
	// DT is IE and Daylight Time is Firefox
	var timeZoneOffset = dateObj.getTimezoneOffset();
	var hoursOffset = -1 * Math.floor( timeZoneOffset / 60 );

	return YAHOO.alarmd.getTimeZoneFromHourOffset( hoursOffset, YAHOO.alarmd.isDaylightSavings( dateObj ) );
};
YAHOO.alarmd.getTimeZoneFromHourOffset = function( hoursOffset, bIsDaylightSavings )
{
	var timeZoneString;

	if( hoursOffset == -3 && bIsDaylightSavings ) timeZoneString = 'Atlantic Daylight Time';
	//else if( hoursOffset == 3 ) timeZoneString = '';
	else if( hoursOffset == -4 && bIsDaylightSavings ) timeZoneString = 'Eastern Daylight Time';
	else if( hoursOffset == -4 ) timeZoneString = 'Atlantic Standard Time';
	else if( hoursOffset == -5 && bIsDaylightSavings ) timeZoneString = 'Central Daylight Time';
	else if( hoursOffset == -5 ) timeZoneString = 'Eastern Standard Time';
	else if( hoursOffset == -6 && bIsDaylightSavings ) timeZoneString = 'Mountain Daylight Time';
	else if( hoursOffset == -6 ) timeZoneString = 'Central Standard Time';
	else if( hoursOffset == -7 && bIsDaylightSavings ) timeZoneString = 'Pacific Daylight Time';
	else if( hoursOffset == -7 ) timeZoneString = 'Mountain Standard Time';
	else if( hoursOffset == -8 && !bIsDaylightSavings ) timeZoneString = 'Pacific Standard Time';

	return timeZoneString;
};

YAHOO.namespace( 'YAHOO.alarmd.settings' );
YAHOO.alarmd.settings.defaults = function()
{
	if( confirm( 'This will erase all of your saved settings.  Do you wish to continue?' ) )
	{
		YAHOO.valdi.cookie.erase( 'settings' );
		YAHOO.util.Event.removeListener( window, 'unload' );
		window.location.href = window.location.href + '?';
	}
};
YAHOO.alarmd.settings.read = function()
{
	var s = YAHOO.valdi.cookie.read( 'settings' );
	if( !s ) return;
	var split = s.split( '&' );
	var selectedValue;

	// hide existing options
	var preValues = YAHOO.valdi.form.getAvailableValueRaw( 'src' );
	YAHOO.valdi.hide( Ext.query( '#src option' ) );

	YAHOO.valdi.each( split, function( j, keyvalue )
	{
		var pair = keyvalue.split( '=' );
		if( pair[ 0 ] == 'f' )
		{
			YAHOO.valdi.form.setValueRaw( 'format', pair[ 1 ] == 'true' ? [ '24' ] : [] );
		} else if( pair[ 0 ] == 's' ) {
			YAHOO.valdi.form.setValueRaw( 'seconds', pair[ 1 ] == 'true' ? [ 'seconds' ] : [] );
		} else if( pair[ 0 ] == 'fs' ) {
			YAHOO.alarmd.template.fontSetValue( pair[ 1 ] );
		} else if( pair[ 0 ] == 'c' ) {
			YAHOO.alarmd.template.setColorPresetValue( pair[ 1 ] );
		} else if( pair[ 0 ] == 'ct' ) {
			YAHOO.valdi.form.setValueRaw( 'countdown', [ 'countdown' ] );
		} else if( pair[ 0 ] == 'dow' ) {
			YAHOO.valdi.form.setValueRaw( Ext.query( '#dow input[type="checkbox"]' ), pair[ 1 ].split( '' ) );
		} else if( pair[ 0 ].substr( 0, 3 ) == 'src' ) {
			var value = decodeURIComponent( pair[ 1 ] );
			// if value in str exists, unhide the option
			if( YAHOO.valdi.util.Array.hasValue( preValues, value ) )
			{
				YAHOO.valdi.show( Ext.query( '#src option[value="' + value + '"]' ) );
			} else {
				YAHOO.valdi.widget.multipleOptionList.addManual( YAHOO.util.Dom.get( 'srcList' ), decodeURIComponent( pair[ 1 ] ), decodeURIComponent( pair[ 1 ] ) );
			}
		} else if( pair[ 0 ].substr( 0, 3 ) == 'sel' ) {
			selectedValue = [ decodeURIComponent( pair[ 1 ] ) ];
		} else if( pair[ 0 ].substr( 0, 3 ) == 'alm' ) {
			YAHOO.alarmd.addAlarmManual( decodeURIComponent( pair[ 1 ] ) );
		}
	} );

	if( selectedValue ) YAHOO.valdi.form.setValueRaw( 'src', selectedValue );
	//console.log( s );
};
YAHOO.alarmd.settings.save = function( e )
{
	var str = '';
	str += 'f=' + ( YAHOO.valdi.form.getValueRaw( 'format' )[ 0 ] == '24' ); // is 24 hour format
	str += '&s=' + ( YAHOO.valdi.form.getValueRaw( 'seconds' )[ 0 ] == 'seconds' ); // show seconds
	str += '&fs=' + YAHOO.util.Dom.getStyle( 'clock', 'fontSize' ).substringBeforeLast( 'px' ); // font size
	str += '&c=' + Ext.query( 'body' )[ 0 ].className; // color
	str += '&ct= ' + YAHOO.valdi.form.CheckBox.isChecked( 'countdown' ); // countdown mode
	str += '&dow=' + YAHOO.valdi.form.getValueRaw( Ext.query( '#dow input[type="checkbox"]' ) ).join( '' ); // days of the week
	YAHOO.valdi.each( YAHOO.valdi.form.getAvailableValueRaw( 'src' ), function( j, src )
	{
		str += '&src' + j + '=' + encodeURIComponent( src );
	} );
	YAHOO.valdi.each( Ext.query( '#active .alarm .time' ), function( j, alarm )
	{
		str += '&alm' + j + '=' + encodeURIComponent( Ext.queryOne( '.h', alarm ).innerHTML + Ext.queryOne( '.m', alarm ).innerHTML + Ext.queryOne( '.suffix', alarm ).innerHTML );
	} );
	var selectedValue = YAHOO.valdi.form.getValueRaw( 'src' ).join( '' );
	if( selectedValue.length > 0 ) str += '&sel=' + encodeURIComponent( selectedValue );
	if( YAHOO.valdi.cookie.read( 'settings' ) == str )
	{
		// only passed in e when clicked
		if( e ) alert( 'Settings have already been saved.' );
	} else {
		YAHOO.valdi.cookie.create( 'settings', str, 99999 );
		// only passed in e when clicked
		if( e ) alert( 'Settings Saved.' );
	}
};
YAHOO.namespace( 'YAHOO.alarmd.template' );
YAHOO.alarmd.template.fontBigger = function( e )
{
	var currentSize = parseInt( YAHOO.util.Dom.getStyle( 'clock', 'fontSize' ).substringBeforeLast( 'px' ), 10 );
	YAHOO.util.Dom.setStyle( 'clock', 'fontSize', Math.round( currentSize * 1.25 ) + 'px' );
	if( e ) YAHOO.util.Event.stopEvent( e );
	
};
YAHOO.alarmd.template.fontSmaller = function( e )
{
	var currentSize = parseInt( YAHOO.util.Dom.getStyle( 'clock', 'fontSize' ).substringBeforeLast( 'px' ), 10 );
	YAHOO.util.Dom.setStyle( 'clock', 'fontSize', Math.round( currentSize * 0.8 ) + 'px' );
	if( e ) YAHOO.util.Event.stopEvent( e );
};
YAHOO.alarmd.template.fontAuto = function( e )
{
	var clockSpan = Ext.queryOne( '#clock span.clock-width' );
	var counter = 0;
	var width = clockSpan.offsetWidth;
	while( width < YAHOO.util.Dom.getViewportWidth() && counter < 20 )
	{
		YAHOO.alarmd.template.fontBigger();
		width = clockSpan.offsetWidth;
		counter++;
	}
	while( width > YAHOO.util.Dom.getViewportWidth() && counter < 20 )
	{
		YAHOO.alarmd.template.fontSmaller();
		width = clockSpan.offsetWidth;
		counter++;
	}
};
YAHOO.alarmd.template.fontSet = function( e )
{
	var currentSize = parseInt( YAHOO.util.Dom.getStyle( 'clock', 'fontSize' ).substringBeforeLast( 'px' ), 10 );
	var size = prompt( 'What font size do you want? (in Pixels)', currentSize );
	if( size == null || size == '' ) return;
	YAHOO.alarmd.template.fontSetValue( size );
	if( e ) YAHOO.util.Event.stopEvent( e );
};
YAHOO.alarmd.template.fontSetValue = function( pixels )
{
	YAHOO.util.Dom.setStyle( 'clock', 'fontSize', parseInt( pixels, 10 ) + 'px' );
};
YAHOO.alarmd.template.setColorPreset = function( e )
{
	YAHOO.alarmd.template.setColorPresetValue( this.getAttribute( 'alarmd:color' ) );
	/*if( this.innerHTML.toLowerCase() == 'r' ) Ext.query( 'body' )[ 0 ].className = 'red';
	else if( this.innerHTML.toLowerCase() == 'g' ) Ext.query( 'body' )[ 0 ].className = 'green';
	else if( this.innerHTML.toLowerCase() == 'b' ) Ext.query( 'body' )[ 0 ].className = 'blue';
	else if( this.innerHTML.toLowerCase() == 'dr' ) Ext.query( 'body' )[ 0 ].className = 'darkred';*/
};
YAHOO.alarmd.template.setColorPresetValue = function( className )
{
	Ext.query( 'body' )[ 0 ].className = className;
};
/* YAHOO.alarmd.template.setPrimaryColor = function( e )
{
	var color = prompt( 'What do you want your primary bright color to be? (in Hexadecimal)', '#f00' );
	if( color == null || color == '' ) return;

	var newColor = ( new String( color ) ).replace( /[^0-9^a-f^A-F]/g, '' );
	var r, g, b;
	if( newColor.length == 3 )
	{
		r = parseInt( newColor.substr( 0, 1 ), 16 );
		g = parseInt( newColor.substr( 1, 1 ), 16 );
		b = parseInt( newColor.substr( 2, 1 ), 16 );
	} else if( newColor.length == 6 ) {
		r = parseInt( newColor.substr( 0, 2 ), 16 );
		g = parseInt( newColor.substr( 2, 2 ), 16 );
		b = parseInt( newColor.substr( 4, 2 ), 16 );
	} else {
		alert( 'Could not parse color: ' + color );
		return;
	}

	if( r > 15 ) r = Math.floor( r / 16 );
	if( g > 15 ) g = Math.floor( g / 16 );
	if( b > 15 ) b = Math.floor( b / 16 );

	var colors = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
	var day = [ colors[r], colors[g], colors[b] ];
	var night = [ r < 9 ? 0 : r - 9, g < 9 ? 0 : g - 9, b < 9 ? 0 : b - 9 ];
	var dusk = [ r < 5 ? 0 : colors[r - 5], g < 5 ? 0 : colors[g - 5], b < 5 ? 0 : colors[b - 5] ];
	var morning = [ r < 7 ? 0 : r - 7, g < 7 ? 0 : g - 7, b < 7 ? 0 : b - 7 ];
	var nightBorder = [ r < 12 ? 0 : r - 12, g < 12 ? 0 : g - 12, b < 12 ? 0 : b - 12 ];

	if( Ext.query( '.color-day' ).length > 0 ) YAHOO.util.Dom.setStyle( Ext.query( '.color-day' ), 'color', '#' + day.join('') );
	if( Ext.query( '.color-night' ).length > 0 ) YAHOO.util.Dom.setStyle( Ext.query( '.color-night' ), 'color', '#' + night.join('') );
	if( Ext.query( '.color-dusk' ).length > 0 ) YAHOO.util.Dom.setStyle( Ext.query( '.color-dusk' ), 'color', '#' + dusk.join('') );
	if( Ext.query( '.color-morning' ).length > 0 ) YAHOO.util.Dom.setStyle( Ext.query( '.color-morning' ), 'color', '#' + morning.join('') );
	if( Ext.query( '.color-night-border' ).length > 0 ) YAHOO.util.Dom.setStyle( Ext.query( '.color-night-border' ), 'color', '#' + nightBorder.join('') + ' !important' );
}; */

YAHOO.alarmd.goOffline = function()
{
	if (!window.google || !google.gears)
	{
		if( confirm( 'To go offline you need Google Gears.  Do you want to go to the installation page?' ) )
		{
			location.href = 'http://code.google.com/apis/gears/install.html';
			return;
		}
	}
};
