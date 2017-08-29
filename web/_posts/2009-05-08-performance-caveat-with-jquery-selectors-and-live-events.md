---
title: Performance Caveat with jQuery Selectors and Live Events
author: Zach Leatherman
layout: post
permalink: /performance-caveat-with-jquery-selectors-and-live-events/
Version Specific Article:
  - jQuery 1.3.2
categories:
  - JavaScript
tags:
  - research
---

*Prerequisite: Knowledge/Experience with [jQuery Live Events][1] (new in jQuery 1.3), and the concept of [Event Delegation][2].*

 [1]: http://docs.jquery.com/Events/live
 [2]: http://icant.co.uk/sandbox/eventdelegation/

When developing on the front end, it’s easy to prioritize correctness over performance. Performance is the step child that gets lost while you’re pulling your hair out worrying about cross browser compatibility. It’s very important to regularly benchmark your JavaScript code, using a [profiler][3] or some form of benchmarking code paired with a cross browser logging utility (see [Firebug Lite][4], [YUI Logger][5], or [log4javascript][6]).

 [3]: http://getfirebug.com/js.html
 [4]: http://getfirebug.com/lite.html
 [5]: http://developer.yahoo.com/yui/logger/
 [6]: http://log4javascript.org/

Event delegation is a great way to program for performance. The `live` jQuery method was a great addition to the jQuery core, it makes event delegation really easy (see also the `closest` method). Unfortunately, it isn’t quite what I expected.

For example, say you have a page containing approximately 500 custom tooltip components on it (not typical, but stick with me, this is to prove a point). How might one go about adding a simple live event to activate each tooltip when the user hovers over it?

    $('span.myTooltip').live('mouseover', function(event) {
        // activate tooltip
    });

See the problem? jQuery will actually run the selector on the document, resulting in unnecessary overhead. jQuery is only assigning a single event handler to top level of the document, why does it need to know what nodes it will be binding to before assigning the callback?

What can we do? Let’s create a jQuery function, instead of a method, so it won’t query the document. Try this on for size:

    $.live = function(selector, type, fn) {
        var r = $([]);
        r.selector = selector;
        if(type && fn) {
            r.live(type, fn);
        }
        return r;
    };

## Usage

    // Single event type
    $.live('span.myTooltip', 'mouseover', function(event) {
        // activate tooltip
    });
     
    // Multiple event types (you can call the jQuery live method on the return value from the function)
    $.live('span.myTooltip')
        .live('mouseover', function(event) {
            // activate tooltip
        })
        .live('mouseout', function(event) {
            // deactivate tooltip
        });

Also, as a side note, keep in mind that jQuery `live` **doesn’t** support space separated events, like `bind` does.

    // Will not work.
    $('span.myTooltip').live('mouseover mouseout', function() {});

Have fun!
