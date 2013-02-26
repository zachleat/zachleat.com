---
title: 'Scare Your Visitors with this JavaScript Gravatar Plugin'
author: Zach Leatherman
excerpt: "Here's a use case.  An unregistered visitor visits your blog, and decides that your <strong>content is so good that it merits a comment</strong>!  Congratulations, you've fooled them!  But since they're leaving a comment, why not show them a preview of their gravatar?"
layout: post
permalink: /scare-your-visitors-with-this-javascript-gravatar-plugin/
bttc_cache:
  - 1299718312:0
categories:
  - JavaScript
  - Projects
tags:
  - Gravatar
  - jQuery
---
# 

## [See the Demo][1]

 [1]: /javascript/gravatar/index.html

## [Download the Source Code][2]

 [2]: /javascript/gravatar/jquery.gravatar.js

  
  
  


![Tournology Blog Comment Form][3]

 [3]: http://www.zachleat.com/web/wp-content/uploads/2009/01/blog-comment.png "blog-comment"

Here’s a use case. An unregistered visitor visits your blog, and decides that your **content is so good that it merits a comment**! Congratulations, you’ve fooled them! Now you can [twply their account details for $1200 on Sitepoint][4]! Just kidding. But generally, when you visit a blog’s commenting section (such as the [Tournology Blog][5] shown above), you’ll see a simple form to authenticate you’re not a spammer, generally including (among other things) an e-mail address field.

 [4]: http://www.centernetworks.com/twply-twitter-replies-auction
 [5]: http://www.tournology.com/blog/

  
  
  


![Tournology Blog Comment Form With Gravatar][6]

 [6]: http://www.zachleat.com/web/wp-content/uploads/2009/01/blog-comment-after.png "blog-comment-after"

Well, since they’re typing their e-mail address, wouldn’t it be cool if we could **show them their gravatar** right there, inline with the blog comment form? Well, that’s now possible with my new **[JavaScript Gravatar Plugin][7]**! It doesn’t have any server side language dependencies.

 [7]: http://www.zachleat.com/javascript/gravatar/jquery.gravatar.js

  
  
  


![Gravatar Signup Page][8]

 [8]: http://www.zachleat.com/web/wp-content/uploads/2009/01/gravatar-signup.png "gravatar-signup"

Hell, [gravatar.com][9] could even use this to **improve the user experience of registering your e-mail account**. Right now it does a full page refresh and doesn’t even show you a preview!

 [9]: http://en.gravatar.com/

  


## [See the Demo][1]

## [Download the Source Code][2]

  


## Licensing

Licensed under the [WTFPL][10], as highly recommended by [Isaac Schleuter][11] ([see discussion][12]). 

 [10]: http://sam.zoy.org/wtfpl/
 [11]: http://foohack.com/
 [12]: /web/2007/04/05/google-using-yui-grids-css/

  


## JavaScript Dependencies:

*   Requires [jQuery][13] (Feel free to port and post a link!)
*   Requires [md5.js][14]

 [13]: http://jquery.com
 [14]: http://pajhome.org.uk/crypt/md5/md5.js

  


## Example Usage:

Easiest form, onblur of email text input field:

    $&#40;'#emailTextField'&#41;.blur&#40;function&#40;event&#41;
    &#123;
        $&#40;this&#41;.after&#40;$.gravatar&#40;$&#40;this&#41;.val&#40;&#41;&#41;&#41;;
    &#125;&#41;;

Showing all options, again onblur of email text input field.

    $&#40;'#email'&#41;.blur&#40;function&#40;event&#41;
    &#123;
        $&#40;'body'&#41;.append&#40;$.gravatar&#40;$&#40;this&#41;.val&#40;&#41;, &#123;
            // integer size: between 1 and 512, default 80 (in pixels)
            size: 200,
            // maximum rating (in order of raunchiness, least to most): g (default), pg, r, x
            rating: 'pg',
            // url to define a default image (can also be one of: identicon, monsterid, wavatar)
            image: 'identicon'
        &#125;&#41;&#41;;
    &#125;&#41;;

**Update:** This script has been moved to [Github][15].

 [15]: http://github.com/zachleat/jQuery-Gravatar