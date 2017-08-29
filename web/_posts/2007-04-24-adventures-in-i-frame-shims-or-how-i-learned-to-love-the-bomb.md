---
title: I-Frame Shims or How I Learned to Stop Worrying and Love the Bomb
author: Zach Leatherman
layout: post
permalink: /adventures-in-i-frame-shims-or-how-i-learned-to-love-the-bomb/
Version Specific Article:
  - Internet Explorer 6
categories:
  - CSS
  - JavaScript
  - Web Browsers
tags:
  - deprecated
  - feedtrim
---

So again, I show up late to the party. IE7 is already out, but my target customers are still using IE6. So today, boys and girls, we’re going to discover the magical world of using I-Frame shims to hide those bleeding heart select boxes from showing through our layered elements.

Typically, when creating an I-Frame shim, you’re going to create the i-frame dynamically using document.createElement. Let’s start out with some successful code.

    var iframeShim = document.createElement( 'iframe' );
    iframeShim.setAttribute( 'src', 'javascript:"";' );
    iframeShim.setAttribute( 'frameBorder', '0' );

Now for some caveats you might have encountered with code not matching the above:

**I-Frame frameBorder attribute**  
Are you trying to get rid of that nasty i-frame border in Internet Explorer 6 (IE6)? Tried CSS properties? Tried setting the frameBorder attribute? It turns out that when setting the frameBorder attribute, the name of the attribute is case sensitive. Using frameborder will not work correctly, but using frameBorder (with a capital B) will give the desired result. [Source: [FlashApe][1]]

 [1]: http://www.visible-form.com/blog/createelement-and-events-and-iframe-borders/

**HTTPS and I-Frame src attribute**  
Is your page hosted on a secure domain (https instead of just http)? Is the dynamically created iframe causing the following error message in Internet Explorer?

*This page contains both secure and nonsecure items. Do you want to display the nonsecure items?*

Some have suggested that changing the src attribute to point to a blank html page with no content is the solution, but that’s an extra http request on your page that is unnecessary. Others have suggested that that changing the src attribute to javascript:false works. It does, in fact, but writes the text ‘false’ to your iframe content. Others have suggested javascript:void(0) as your src attribute value [Source: [ewbi.develops][2]], but some Internet Explorer clients still have secure and nonsecure items alert popup. I have not figured out the factors that separate these Internet Explorer clients. 

 [2]: http://ewbi.blogs.com/develops/2004/07/ie_iframe_and_h.html

**Update**: ~~The correct solution is in face setting “javascript:false;document.write(“”);” as your src value, as I found in the [jQuery BlockUI][3] plugin. This is a silver bullet fix that will avoid all the problems I have encountered.~~

 [3]: http://malsup.com/jquery/block/

**Update Again**: I have revisited this problem and it looks like (as mentioned in the comments) there is a problem with the solution presented in the first update (infinite load). After researching some DOMContentLoaded solutions, I thought to try the “//:” source they were attempting for their deferred script source. Alas, it didn’t work. However, `javascript:"";` **does work**, so the above solution has been modified. Keep in mind, the whole point of this solution is to **avoid** an additional unnecessary HTTP request.
