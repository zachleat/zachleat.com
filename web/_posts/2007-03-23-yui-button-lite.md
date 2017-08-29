---
title: YUI Button Lite
author: Zach Leatherman
layout: post
permalink: /yui-button-lite/
Version Specific Article:
  - YUI 2.2.0
categories:
  - JavaScript
tags:
  - deprecated
  - feedtrim
---

Do you want the cool clean look of the new YUI Button component, but without all the seedy overhead of split buttons or button groups or components that shouldn’t even be pigeonholed into a button component to begin with? Keep in mind that this approach only works for the method called “[Using pre-defined Button Control HTML.][1]”

 [1]: http://developer.yahoo.com/yui/button/#buildingfromtemplate

Well, here’s the trick to do it.

Create the button as the YUI Button Examples and Documentation say to do so. Include the Button CSS file button/assets/button.css. But just **don’t** include the YUI JavaScript file button-beta[-min].js.

Instead, use the following JavaScript to replace the functions for button coloring for hover, focus, and active.

    YAHOO.util.Event.addListener( window, 'load', function( e )
    {
        var yuiButtons = YAHOO.util.Dom.getElementsByClassName( 'yuibutton', 'span' );
        YAHOO.util.Event.addListener( yuiButtons, 'mouseover', function( e )
        {
            YAHOO.util.Dom.addClass( this, 'hover' );
        } );
        YAHOO.util.Event.addListener( yuiButtons, 'mouseout', function( e )
        {
            YAHOO.util.Dom.removeClass( this, 'hover' );
        } );
        YAHOO.util.Event.addListener( yuiButtons, 'mousedown', function( e )
        {
            YAHOO.util.Dom.addClass( this, 'active' );
        } );
        YAHOO.util.Event.addListener( yuiButtons, 'mouseup', function( e )
        {
            YAHOO.util.Dom.removeClass( this, 'active' );
        } );
        YAHOO.util.Event.addListener( yuiButtons, 'focus', function( e )
        {
            YAHOO.util.Dom.addClass( this, 'focus' );
        } );
        YAHOO.util.Event.addListener( yuiButtons, 'blur', function( e )
        {
            YAHOO.util.Dom.removeClass( this, 'focus' );
        } );
    } );

If you’re just using the standard buttons anyway, you’re going to see a speed improvement in performance on hover color changes.
