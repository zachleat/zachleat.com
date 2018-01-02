---
title: 'Don&#8217;t Let the Door Hit You Onunload and Onbeforeunload'
author: Zach Leatherman
layout: post
permalink: /dont-let-the-door-hit-you-onunload-and-onbeforeunload/
Version Specific Article:
  - Opera 9.27
categories:
  - Interface Design
  - JavaScript
  - Web Browsers
tags:
  - highlight
  - research
  - popular-posts
  - popular-posts-total
postRank: 13
daysPosted: 3542
yearsPosted: 9.7
postRankTotalViews: 3
---

Many people attempt a last ditch effort to save page state in the browser by using the onunload or onbeforeunload events. This has been studied at great length by [Patrick Hunlock][1], who uses the perhaps now common knowledge of using a Synchronous Ajax call to perform the page state save.

 [1]: http://www.hunlock.com/blogs/Mastering_The_Back_Button_With_Javascript

Another use for the onbeforeunload event to allow the user to cancel the action that initiated the user leaving in the first place. Gmail uses this technique when the user is in the middle of writing a draft of an e-mail and attempts to leave the page.

![][3img]

*Gmail pops up this prompt when the user attempts to leave the page while drafting an email.*

 [3img]: /web/wp-content/uploads/2008/04/gmail-confirm.png

Worthy to note, however, is that Opera [doesn’t fire the unload event][3] when the browser refreshes the page, or uses the back/forward buttons to browse off of the page (I had no success with the fix posted in the comments on that page). What’s worse, Opera never fires the onbeforeunload event. This creates a serious problem with attempting to save page state prior to a user leaving your page.

 [3]: http://www.quirksmode.org/bugreports/archives/2004/11/load_and_unload.html

Browser support aside, I believe that the onbeforeunload prompt is not an ideal way to protect the user from lost work (or unsaved page state). Humanized has argued, and I agree, that [an undo operation is much easier on the end user than a warning message][4]. The strange thing is, Gmail could save the draft in a synchronous Ajax request in the onunload event. They aren’t using the prompt to save Opera users from losing their drafts, since the Opera web browser doesn’t even fire the onbeforeunload event. (Interestingly enough, they are using some sort of browser history management to fire a warning to the user when they press back, or forward, in Opera — but Reload can’t be caught using this method, so your draft email could be lost).

 [4]: http://www.alistapart.com/articles/neveruseawarning

From a User Interface design standpoint, I would recommend just sticking with onunload. You can still perform your synchronous Ajax call in the method to save the state of your page, so that the user can later resume their state or undo the operation. (Except for Back/Forward/Refresh in Opera, until they support a better onunload or any onbeforeunload). The onbeforeunload prompt is an unnecessary evil, and doesn’t do much besides annoy the end user with another warning message and a mouse click.
