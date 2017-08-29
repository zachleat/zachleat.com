---
title: Fundamental Problem with YUI Button
author: Zach Leatherman
layout: post
permalink: /fundamental-problem-with-yui-button/
Version Specific Article:
  - YUI 2.2.0
categories:
  - JavaScript
tags:
  - deprecated
  - feedtrim
---

Buttons! Let’s make them obvious and good looking. Let’s make them have inline images and cool hover colors. Let’s make them three dimensional. Especially so, let’s make them from markup so that we don’t take functionality away from technology disabled users.

Ruh roh Shaggy! The [YUI Button][1] component is misbehaving. It is taking away the submit event fired when the button is clicked and firing the submit() function programmatically.

 [1]: http://yuiblog.com/blog/2007/02/20/yui-220-released/

So, how do you fire the listener functions that are waiting for the submit event to fire, while at the same time using the sleek buttons provided by YUI?

Try this plug and play function:

    YAHOO.widget.Button.prototype._submitForm = function() {
        var oForm = this.getForm();
        if(oForm) {
            YAHOO.widget.Button.addHiddenFieldsToForm(oForm);
            this.createHiddenField();
        var listeners = YAHOO.util.Event.getListeners( oForm, 'submit' );
        var submitForm = true;
        for( var j = 0; j < listeners.length; j++ )
        {
          if( listeners[ j ].fn.apply( listeners[ j ].adjust ) == false ) submitForm = false;
        }
            if( submitForm ) oForm.submit();
        }
    };

(Make sure you include this after you’ve loaded the YUI Button javascript file.) There are a few caveats to this approach.

First, you’ll have to remove any references to the event object inside your listener function (most of the examples use the variable e). For example:

    YAHOO.util.Event.addListener( myForm, 'submit', function( e ) {} );

Inside my submit listener functions, I just check to make sure e is not null prior to using it.

Second, if you wish to cancel the submit, you’ll have to return false inside of your submit listener function.

A sleeker approach would be to revert back to having the button fire the ‘submit’ event. But I’ll leave that as an exercise to the original developer, Mr. Todd Kloots (props).

Update: After a little more code searching, it would seem like the submit event is never being canceled by the YUI Button javascript. However, when you comment out the line that that fires the submit programmatically (oForm.submit();), the form still isn’t submitted. I’ll have to research a bit more.
