---
title: 'Registration Forms Suck, Let&#8217;s Mitigate Suckiness'
author: Zach Leatherman
excerpt: >-
  A lot of people <strong>complain about registration forms</strong>. Some
  people have suggested getting rid of them altogether, allowing users to
  utilize login credentials from accounts they already have through OpenID.  But
  registration forms aren't going away.  How can we make them more friendly?
layout: post
permalink: /registration-forms-suck-lets-mitigate-suckiness/
categories:
  - Application Design
tags:
  - API
  - Forms
  - OpenID
  - Registration
  - Security
---

![Signup Form][1]

A lot of people **complain about registration forms**. Some people have suggested getting rid of them altogether, allowing users to utilize login credentials from accounts they already have through OpenID. But even with a highly technical audience, OpenID adoption is [problematic][2].

 [1]: /web/wp-content/uploads/2009/01/signup-form.png "signup-form"
 [2]: http://blog.stackoverflow.com/2008/10/stack-overflow-openid-case-study/

So, some sites have gone two ways, allowing OpenID, but also a proprietary registration system. This too, [is problematic][3]. It would seem that given a choice, the **John Doe the Plumber style user will choose a proprietary account** over the confusing user experience presented to them through OpenID.

 [3]: http://www.wetpaintcentral.com/page/OpenID?t=anon

But the annoyance doesn’t just lie with account registration for web applications. Typing your personal information on every blog you comment at is also repetitive and unnecessary. [Some sites][4] even require account registration for something so minor and transient as a blog comment.

 [4]: http://www.ajaxian.com

Unfortunately, for the time being, it looks like **registration forms are here to stay**. So, what can we do to make those registration forms more usable, more efficient, and ultimately downright friendly? I know that you’re ahead of me on this one: **Let’s auto-complete information for the user**.

Please keep in mind that this power can be used for both good and evil. Essentially what we’re discussing here is data mining available information from various social networking sites on the internet, trying to glean personal information about an end user that has volunteered a piece of their data already. What can we get from what we already have?

Once a user has typed in their **e-mail address**, we can:

*   Retrieve Twitter profile information ([example shown on Chris Heilmann’s blog][5]): 
    *   Full Name
    *   Short Personal Description
    *   Location
    *   Web site URL
    *   Time Zone
    *   Favorite Colors (used on their profile)
*   Retrieve an **avatar** if they’ve registered for the Gravatar web service ([See my earlier post discussing this][6]).
*   Get their [upcoming calendar events][7] from a public Google Calendar. (Perhaps not as useful for autocompleting forms, but interesting)
*   Find their [UID on Flickr][8], which gives you [a source][9] for: 
    *   Full Name
    *   Location
    *   Flickr Avatar

 [5]: http://www.wait-till-i.com/2009/01/08/using-twitter-as-a-data-provider-to-automatically-fill-forms/
 [6]: http://www.zachleat.com/web/2009/01/08/scare-your-visitors-with-this-javascript-gravatar-plugin/
 [7]: http://gdata-javascript-client.googlecode.com/svn/trunk/samples/calendar/simple_sample/simple_sample.html
 [8]: http://www.flickr.com/services/api/flickr.people.findByEmail.html
 [9]: http://www.flickr.com/services/api/flickr.people.getInfo.html

If you know any of their social networking usernames, you can:

*   [find their MyBlogLog profile][10], if they’ve linked the service to their account ([Sample query, I added my twitter][11]). Now we have: 
    *   MyBlogLog Screen Name and ID, from which you get their [MyBlogLog profile][12]: 
        *   Nickname
        *   Picture
        *   Age
        *   Sex
        *   Location
        *   A list of tags they use to describe themselves.
    *   MyBlogLog Avatar

 [10]: http://developer.yahoo.com/mybloglog/V1/member_find_byservice.html
 [11]: http://mybloglog.yahooapis.com/v1/user/service/twitter/zachleat?AppId=YahooDemo&format=xml
 [12]: http://developer.yahoo.com/mybloglog/V1/member_find_byid.html

Those are only some of the proof of concept API’s that I’ve listed here. The interesting piece of this, is that once you have a small piece of information, it **opens up the door to other searches**.

One can only imagine how many leaves are in this tree. For example:

*   Facebook’s [Users.getInfo][13] ([in JavaScript][14])
*   Yahoo’s Social Tools, get an [end user’s GUID][15] and go to town on [their profile][16]. 
    *   Google Contacts, I didn’t even start to look through [their API’s][17]. 
    Before you start jumping the privacy fence to a self induced heart attack, remember that **all this information has been volunteered** by each individual participating in each of these services. Remember, with great power comes great responsibility.
    
    What do you think? Scary or useful?

 [13]: http://wiki.developers.facebook.com/index.php/Users.getInfo
 [14]: http://wiki.developers.facebook.com/index.php/JavaScript_Client_Library
 [15]: http://developer.yahoo.com/social/rest_api_guide/introspective-guid-resource.html
 [16]: http://developer.yahoo.com/social/rest_api_guide/social_dir_api.html
 [17]: http://code.google.com/apis/contacts/
