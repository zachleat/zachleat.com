---
title: 'Architecture Choices: Callbacks and Events in JavaScript'
author: Zach Leatherman
layout: post
permalink: /architecture-choices-callbacks-and-events-in-javascript/
categories:
  - JavaScript
tags:
  - Callbacks
  - Events
  - jQuery
  - feedtrim
---

*Warning: Blog Post written for Beginner and Intermediate JavaScript Developers*

Like any well intentioned programmer, you’re writing reusable code in JavaScript. Maybe it’s a simple widget, maybe it’s a higher level plug-in for your favorite JavaScript library. But now you want to provide a mechanism for your friendly neighborhood developer to extend your code by hooking into it with a little bit of code of their own. How do you accomplish this?

Generally, it can be done one of two ways:

*   A callback function
*   A custom event

A callback function is a function passed into your code as an argument that will be executed at the time the library code specifies. For instance, callback functions are usually supplied for for Ajax XmlHttpRequest’s to execute, one callback if the Ajax Request is successful, and another on failure. See the following code as an example:

End-Developer’s Code:

     $.ajax({
       type: "POST",
       url: "some.php",
       data: "name=John&location=Boston",
       success: function(msg){
         alert( "Data Saved: " + msg );
       }
     });

Library Code (from jQuery):

    // taken out of context, just know that s stands for the options object passed into $.ajax() above.
    if ( s.success )
      s.success( data, status );

In the above code example taken straight from the [jQuery documentation][1], the success key of the object being passed into the ajax() function is a callback function. It will be executed after the Ajax request has successfully completed.

 [1]: http://docs.jquery.com/Ajax/jQuery.ajax#options

The other mechanism you can use for controlling dependent function execution is a custom event. Custom events provide more flexability because they use the publish/subscribe mechanism. That means, instead of the library author deciding how many callbacks he or she is going to allow you to pass into their method as arguments, he or she will just trigger a custom event, which will fire all functions the end-developer has said they want to subscribe to that event. See the following example from the jQuery documentation.

End-Developer’s Code:

    $(document).bind("myCustomEvent", function(e, msg){
       alert( "Data Saved: " + msg );
    });
    $(document).bind("myCustomEvent", function(e, msg){
       alert( "More Data Saved: " + msg );
    });
    // We can subscribe as many functions as we want to myCustomEvent.

Library Code:

    // again, no context here
    $(document).trigger("myCustomEvent", [ "My Message" ]);

As you can see above, custom events are much more extensible and customizable to your needs. Want to attach 10 functions to myCustomEvent? Sure, go right ahead. Want to try to attach 10 callbacks to the ajax success method above, that’s going to be a bit more work. The benefit to using callbacks lies in their disposability and isolation. Perhaps you don’t want to publish to the world when your Ajax Request completes — maybe you just want to handle the completion and be done with it.

Let’s Review.

**Callback Functions**: Private Disposable – Limited by Design of Parent Code (Number of callbacks)  
**Custom Events**: Extensible (Any number of functions attached) – Public – Not Disposable (Functions stay attached after execution, and continue to fire when triggered)
