---
title: Wash your mouth out with SOAP and the YUI Connection Manager
author: Zach Leatherman
layout: post
permalink: /wash-your-mouth-out-with-soap-and-the-yui-connection-manager/
Version Specific Article:
  - YUI 2.2.2
categories:
  - JavaScript
tags:
  - deprecated
  - feedtrim
---

Now you’ve done it. You watched an R rated movie while your parents weren’t looking and used some of your newfound acquired colorful language in front of them. Your mom goes for the Dial Liquid Soap, she’s going to wash that profanity right out of your dirty little mouth.

Harsh? Maybe, but I couldn’t say the word ‘Bastards’ without feeling Dial on my cleansed taste buds. Maybe I should take legal action against the cinematic classic ‘[Hot Shots][1].’

 [1]: http://www.imdb.com/title/tt0102059/

What are we here for? Not liquid soap, perhaps some profanity. But really, you want to use the SOAP web services protocol with your Yahoo User Interface application, in particular the Connection Manager component. This tutorial assumes you are at least familiar with [the examples provided on the Yahoo! UI Library: Connection Manager website][2].

 [2]: http://developer.yahoo.com/yui/connection/

How is SOAP different than any other AJAX call using the Connection Manager? Well, normally, when you perform an HTTP Post AJAX call, it is passing in a key-value pair string encoded with the normal key=value&key2=value format. But when doing a SOAP call, we want to post an XML SOAP Envelope to the server instead of this key-value pair string. In case you’re reading this article and don’t know what a SOAP Envelope looks like, I’ll post a sample here:  

    <s11:Envelope xmlns:s11="http://schemas.xmlsoap.org/soap/envelope/">
    <s11:Header>
    </s11:Header>
    <s11:Body>
    </s11:Body>
    </s11:Envelope>

Of course, it is beyond the scope of this article to argue whether a REST or a SOAP format for your Service Oriented Architecture is a better choice. You’re stuck with SOAP, otherwise you wouldn’t have read this far.

So, let’s post our SOAP Envelope using the YUI Connection Manager with the code provided below:

    var targetUrl = 'http://www.zachleat.com/postToServer.php'; // this is not a real URL
     
    var callback = {
      success: function(o)
      {
        var root = o.responseXML.documentElement; 
        if( root.getElementsByTagName( 'faultstring' ).length > 0 ) // faultstring is a standard SOAP error message format
        {
          var faultstring = root.getElementsByTagName( 'faultstring' )[0].firstChild.nodeValue;
          var detailed = '';
          YAHOO.UP.util.each( root.getElementsByTagName( 'detail' )[0].childNodes, function( j, textNode )
          {
            if( textNode.nodeValue != null ) detailed += textNode.nodeValue;
          } );
          // do something with your error message stored in the faultstring variable, with a more detailed message in the detailed variable
        } else {
          // this is an actual success.
        }
      }, 
      failure: function( o )
      {
        // do something with your failure.
      }
    };
     
    var message = '<s11:Envelope...YOUR SOAP MESSAGE HERE';
     
    // we need to set our own header.
    YAHOO.util.Connect._use_default_post_header = false;
    YAHOO.util.Connect.initHeader( 'Content-Type', 'text/xml', false );
    var ajaxCall = YAHOO.util.Connect.asyncRequest( 'POST', targetUrl, callback, message);

I hope this code helps some of you bastards.
