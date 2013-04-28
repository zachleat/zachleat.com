---
title: 'Performance Caveat with jQuery Selectors and Live Events'
author: Zach Leatherman
layout: post
permalink: /performance-caveat-with-jquery-selectors-and-live-events/
Version Specific Article:
  - jQuery 1.3.2
bttc_cache:
  - 1299719279:5
categories:
  - JavaScript
tags:
  - Event Delegation
  - jQuery
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

    $&#40;'span.myTooltip'&#41;.live&#40;'mouseover', function&#40;event&#41; &#123;
        // activate tooltip
    &#125;&#41;;

See the problem? jQuery will actually run the selector on the document, resulting in unnecessary overhead. jQuery is only assigning a single event handler to top level of the document, why does it need to know what nodes it will be binding to before assigning the callback?

What can we do? Let’s create a jQuery function, instead of a method, so it won’t query the document. Try this on for size:

    $.live = function&#40;selector, type, fn&#41;
    &#123;
        var r = $&#40;&#91;&#93;&#41;;
        r.selector = selector;
        if&#40;type && fn&#41; &#123;
            r.live&#40;type, fn&#41;;
        &#125;
        return r;
    &#125;;

## Usage

    // Single event type
    $.live&#40;'span.myTooltip', 'mouseover', function&#40;event&#41; &#123;
        // activate tooltip
    &#125;&#41;;
    &nbsp;
    // Multiple event types (you can call the jQuery live method on the return value from the function)
    $.live&#40;'span.myTooltip'&#41;
        .live&#40;'mouseover', function&#40;event&#41; &#123;
            // activate tooltip
        &#125;&#41;
        .live&#40;'mouseout', function&#40;event&#41; &#123;
            // deactivate tooltip
        &#125;&#41;;

Also, as a side note, keep in mind that jQuery `live` **doesn’t** support space separated events, like `bind` does.

    // Will not work.
    $&#40;'span.myTooltip'&#41;.live&#40;'mouseover mouseout', function&#40;&#41; &#123;&#125;&#41;;

Have fun!