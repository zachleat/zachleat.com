---
title: 'Wash your mouth out with SOAP and the YUI <span class="widow">Connection Manager</span>'
author: Zach Leatherman
layout: post
permalink: /wash-your-mouth-out-with-soap-and-the-yui-connection-manager/
Version Specific Article:
  - YUI 2.2.2
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299723467:0
categories:
  - JavaScript
tags:
  - Ajax
  - SOAP
  - YUI
---
# 

Now you’ve done it. You watched an R rated movie while your parents weren’t looking and used some of your newfound acquired colorful language in front of them. Your mom goes for the Dial Liquid Soap, she’s going to wash that profanity right out of your dirty little mouth.

Harsh? Maybe, but I couldn’t say the word ‘Bastards’ without feeling Dial on my cleansed taste buds. Maybe I should take legal action against the cinematic classic ‘[Hot Shots][1].’

 [1]: http://www.imdb.com/title/tt0102059/

What are we here for? Not liquid soap, perhaps some profanity. But really, you want to use the SOAP web services protocol with your Yahoo User Interface application, in particular the Connection Manager component. This tutorial assumes you are at least familiar with [the examples provided on the Yahoo! UI Library: Connection Manager website][2].

 [2]: http://developer.yahoo.com/yui/connection/

How is SOAP different than any other AJAX call using the Connection Manager? Well, normally, when you perform an HTTP Post AJAX call, it is passing in a key-value pair string encoded with the normal key=value&key2=value format. But when doing a SOAP call, we want to post an XML SOAP Envelope to the server instead of this key-value pair string. In case you’re reading this article and don’t know what a SOAP Envelope looks like, I’ll post a sample here:  
`






`

Of course, it is beyond the scope of this article to argue whether a REST or a SOAP format for your Service Oriented Architecture is a better choice. You’re stuck with SOAP, otherwise you wouldn’t have read this far.

So, let’s post our SOAP Envelope using the YUI Connection Manager with the code provided below:

    var targetUrl = 'http://www.zachleat.com/postToServer.php'; // this is not a real URL
    &nbsp;
    var callback = &#123;
    	success: function&#40;o&#41;
    	&#123;
    		var root = o.responseXML.documentElement; 
    		if&#40; root.getElementsByTagName&#40; 'faultstring' &#41;.length >  &#41; // faultstring is a standard SOAP error message format
    		&#123;
    			var faultstring = root.getElementsByTagName&#40; 'faultstring' &#41;&#91;&#93;.firstChild.nodeValue;
    			var detailed = '';
    			YAHOO.UP.util.each&#40; root.getElementsByTagName&#40; 'detail' &#41;&#91;&#93;.childNodes, function&#40; j, textNode &#41;
    			&#123;
    				if&#40; textNode.nodeValue != null &#41; detailed  = textNode.nodeValue;
    			&#125; &#41;;
    			// do something with your error message stored in the faultstring variable, with a more detailed message in the detailed variable
    		&#125; else &#123;
    			// this is an actual success.
    		&#125;
    	&#125;, 
    	failure: function&#40; o &#41;
    	&#123;
    		// do something with your failure.
    	&#125;
    &#125;;
    &nbsp;
    var message = '