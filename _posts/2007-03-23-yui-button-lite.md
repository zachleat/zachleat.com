---
title: 'YUI Button Lite'
author: Zach Leatherman
layout: post
permalink: /yui-button-lite/
Version Specific Article:
  - YUI 2.2.0
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299723096:0
categories:
  - JavaScript
tags:
  - Button
  - YUI
---
# 

Do you want the cool clean look of the new YUI Button component, but without all the seedy overhead of split buttons or button groups or components that shouldn’t even be pigeonholed into a button component to begin with? Keep in mind that this approach only works for the method called “[Using pre-defined Button Control HTML.][1]”

 [1]: http://developer.yahoo.com/yui/button/#buildingfromtemplate

Well, here’s the trick to do it.

Create the button as the YUI Button Examples and Documentation say to do so. Include the Button CSS file button/assets/button.css. But just **don’t** include the YUI JavaScript file button-beta[-min].js.

Instead, use the following JavaScript to replace the functions for button coloring for hover, focus, and active.

    YAHOO.util.Event.addListener&#40; window, 'load', function&#40; e &#41;
    &#123;
    	var yuiButtons = YAHOO.util.Dom.getElementsByClassName&#40; 'yuibutton', 'span' &#41;;
    	YAHOO.util.Event.addListener&#40; yuiButtons, 'mouseover', function&#40; e &#41;
    	&#123;
    		YAHOO.util.Dom.addClass&#40; this, 'hover' &#41;;
    	&#125; &#41;;
    	YAHOO.util.Event.addListener&#40; yuiButtons, 'mouseout', function&#40; e &#41;
    	&#123;
    		YAHOO.util.Dom.removeClass&#40; this, 'hover' &#41;;
    	&#125; &#41;;
    	YAHOO.util.Event.addListener&#40; yuiButtons, 'mousedown', function&#40; e &#41;
    	&#123;
    		YAHOO.util.Dom.addClass&#40; this, 'active' &#41;;
    	&#125; &#41;;
    	YAHOO.util.Event.addListener&#40; yuiButtons, 'mouseup', function&#40; e &#41;
    	&#123;
    		YAHOO.util.Dom.removeClass&#40; this, 'active' &#41;;
    	&#125; &#41;;
    	YAHOO.util.Event.addListener&#40; yuiButtons, 'focus', function&#40; e &#41;
    	&#123;
    		YAHOO.util.Dom.addClass&#40; this, 'focus' &#41;;
    	&#125; &#41;;
    	YAHOO.util.Event.addListener&#40; yuiButtons, 'blur', function&#40; e &#41;
    	&#123;
    		YAHOO.util.Dom.removeClass&#40; this, 'focus' &#41;;
    	&#125; &#41;;
    &#125; &#41;;

If you’re just using the standard buttons anyway, you’re going to see a speed improvement in performance on hover color changes.