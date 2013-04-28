---
title: 'Fundamental Problem with YUI Button'
author: Zach Leatherman
layout: post
permalink: /fundamental-problem-with-yui-button/
Version Specific Article:
  - YUI 2.2.0
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299719515:0
categories:
  - JavaScript
tags:
  - Button
  - YUI
---

Buttons! Let’s make them obvious and good looking. Let’s make them have inline images and cool hover colors. Let’s make them three dimensional. Especially so, let’s make them from markup so that we don’t take functionality away from technology disabled users.

Ruh roh Shaggy! The [YUI Button][1] component is misbehaving. It is taking away the submit event fired when the button is clicked and firing the submit() function programmatically.

 [1]: http://yuiblog.com/blog/2007/02/20/yui-220-released/

So, how do you fire the listener functions that are waiting for the submit event to fire, while at the same time using the sleek buttons provided by YUI?

Try this plug and play function:

    YAHOO.widget.Button.prototype._submitForm = function&#40;&#41; &#123;
        var oForm = this.getForm&#40;&#41;;
        if&#40;oForm&#41; &#123;
            YAHOO.widget.Button.addHiddenFieldsToForm&#40;oForm&#41;;
            this.createHiddenField&#40;&#41;;
    		var listeners = YAHOO.util.Event.getListeners&#40; oForm, 'submit' &#41;;
    		var submitForm = true;
    		for&#40; var j = ; j < listeners.length; j   &#41;
    		&#123;
    			if&#40; listeners&#91; j &#93;.fn.apply&#40; listeners&#91; j &#93;.adjust &#41; == false &#41; submitForm = false;
    		&#125;
            if&#40; submitForm &#41; oForm.submit&#40;&#41;;
        &#125;
    &#125;;

(Make sure you include this after you’ve loaded the YUI Button javascript file.) There are a few caveats to this approach.

First, you’ll have to remove any references to the event object inside your listener function (most of the examples use the variable e). For example:

    YAHOO.util.Event.addListener&#40; myForm, 'submit', function&#40; e &#41; &#123;&#125; &#41;;

Inside my submit listener functions, I just check to make sure e is not null prior to using it.

Second, if you wish to cancel the submit, you’ll have to return false inside of your submit listener function.

A sleeker approach would be to revert back to having the button fire the ‘submit’ event. But I’ll leave that as an exercise to the original developer, Mr. Todd Kloots (props).

Update: After a little more code searching, it would seem like the submit event is never being canceled by the YUI Button javascript. However, when you comment out the line that that fires the submit programmatically (oForm.submit();), the form still isn’t submitted. I’ll have to research a bit more.