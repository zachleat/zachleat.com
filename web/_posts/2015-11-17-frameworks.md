---
title: 'Frameworks, not Blameworks'
author: Zach Leatherman
layout: post
permalink: /javascript-frameworks/
---

Earlier this week, Paul Lewis wrote a [great post gathering data on the performance of popular JavaScript frameworks on mobile devices](https://aerotwist.com/blog/the-cost-of-frameworks/). It was a great conversation starter, evidenced by the many blog post responses it garnered from [Tom Dale](http://tomdale.net/2015/11/javascript-frameworks-and-mobile-performance/), [Dave Rupert](http://daverupert.com/2015/11/framework-cost/), and [Soledad Penadés](http://soledadpenades.com/2015/11/17/some-additional-thoughts-on-the-recent-discussion-about-frameworks-vs-vanilla-js-on-mobile/).

> “It seems to me that developer ergonomics should be less important than our users’ needs.”—Paul Lewis

One of the great things about Paul’s post is that his data clearly debunks a relationship between framework file size and JavaScript execution time. Notably, React and Polymer had similar results despite React having ~3.5x the file size.

_(Related: Scott Jehl’s [More Weight Doesn’t Mean More Wait](https://www.filamentgroup.com/lab/weight-wait.html))_

It should also be noted that Paul’s data is a partial view of the big picture—it focuses only on JavaScript execution time and [doesn’t include transfer time](https://twitter.com/aerotwist/status/666278458775896064). Including transfer time may contribute to a stronger relationship between framework file size and overall performance cost. This is an important piece of the puzzle given that [2G makes up 62% of mobile connections](https://twitter.com/raymondcamden/status/666674488495353856).

As much snark as I talk on twitter about frameworks, it isn’t difficult to see their allure.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">check out my new javascript framework that works for space travel and your commute to work—don’t worry about speed <a href="https://t.co/IC6zDuZa9q">pic.twitter.com/IC6zDuZa9q</a></p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/666711475608666112">November 17, 2015</a></blockquote>

At [NebraskaJS](http://nebraskajs.com/) we’ve had many great speakers talk about the utility of React, Angular, Ember, and many others. As a meetup organizer, it isn’t my job to filter these talks to topics that I personally agree with or would advocate for. It’s my job to attempt to learn and help others learn from the many different perspectives that exist in our community.

## Prior Art

That being said, my Filament Group colleagues John Bender, Todd Parker, and Scott Jehl tackled this very same topic almost a year ago with the [Performance Impact of Popular JavaScript MVC Frameworks](https://www.filamentgroup.com/lab/mv-initial-load-times.html). I’d recommend you read the whole thing—it’s very good. The data they gathered shows the big picture because it measures initial render on a variety of network connections.

## Miniscule Apps

The counter-argument presented against these blog posts is that TodoMVC isn’t a great test case.

> “TodoMVC is a miniscule app and is in no way representative of the apps most developers work on day to day.”—Tom Dale

However, a more complex application isn’t going to do anything to _improve_ your initial render time. If you’re developing an application that is for a corporate employee intranet with captive users, your performance needs might be different. However if your code lives on the public internet, it is subject to consumer choice. You need to meet certain critical performance benchmarks of the impatient user or they will abandon your site. At time of writing, [wpostats.com documents 18 different high profile cases about the relationship between performance and user engagement](http://wpostats.com/). Users don’t care about a developer ergonomics sob story—they want the site to load fast or they’ll go somewhere else.

## It Depends

In my mind, the discussion here is **not** a cage match between frameworks and _vanilla_ JavaScript. We can’t realistically make a blanket statement that you should or should not use frameworks. Attempting to frame it as such would take us down a yellow brick road trying to help our humble strawman find his brain.

## ~~Less is More~~

> “The bottom line is that I don’t think “reduce the amount of code” is a reasonable lesson for the average developer to follow.”—Tom Dale

Oversimplifying to “less is more” does a disservice to the debate as well.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">“There is no such thing as a performance budget… less is more”&#10;&#10;Wrong. Use CSS/JS?&#10;&#10;Our business is trading bytes for features, responsibly.</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/609408429522845696">June 12, 2015</a></blockquote>

The trick is to pick the right framework (or lack thereof) that best meets the needs of our users. This includes making performance a priority, but on the users’ terms: on their device, their network connection, their web browser configured to their needs.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">So much product development time is spent undoing complexity that should have been left out in the first place.</p>&mdash; Jason Fried (@jasonfried) <a href="https://twitter.com/jasonfried/status/666351638836326400">November 16, 2015</a></blockquote>

## Competition and Choice

Again, I wouldn’t and couldn’t credibly say that you should forgo frameworks altogether. That’s the wrong discussion to have. If you decide to spend valuable kilobytes on a framework, fortunately there are plenty of frameworks to choose from. Just like DOM libraries used to compete on selector engine performance, the onus is on framework authors to compete against each other on initial render performance.

> “The average Smartphone visitor to your business website will beat a hasty retreat if it doesn’t load inside 3 seconds.”—[Strangeloop Networks study](http://www.aykira.com.au/2014/04/importance-website-loading-speed-top-3-factors-limit-website-speed/)

Your framework choice sets the performance baseline that your application code will pile on top of. Visitors are impatient and choosing the wrong framework can set the performance baseline too high even for “miniscule” applications.

Vote with your `npm install` and choose one that is focused on (mobile) performance. Frameworks exist that don’t prohibitively hamper the perceived performance of your site. Frameworks exist that have a fast initial (preferably server side) render. The data is clear. Choose wisely. Your users will stick around long enough to thank you for it.

---

_A previous version of this article stated that Polymer was 3.5x the file size of React. The reverse is true. Thanks [notbrent](https://twitter.com/notbrent/status/667740388279451649)._
