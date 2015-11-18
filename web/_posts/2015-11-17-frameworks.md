---
title: 'The Blameworks of Frameworks'
author: Zach Leatherman
layout: post
permalink: /javascript-frameworks/

---

Earlier this week, Paul Lewis wrote a [great post gathering data on the performance of popular JavaScript frameworks on mobile devices](https://aerotwist.com/blog/the-cost-of-frameworks/). It was a great conversation starter, evidenced by the many blog post responses it garnered from [Tom Dale](http://tomdale.net/2015/11/javascript-frameworks-and-mobile-performance/), [Dave Rupert](http://daverupert.com/2015/11/framework-cost/), and [Soledad Penadés](http://soledadpenades.com/2015/11/17/some-additional-thoughts-on-the-recent-discussion-about-frameworks-vs-vanilla-js-on-mobile/).

> “It seems to me that developer ergonomics should be less important than our users’ needs.”—Paul Lewis

One of the great things about Paul’s post is that his data clearly debunks a relationship between framework file size and execution time. Notably, React and Polymer had similar results despite Polymer having a ~3.5x file size. Of note, Paul’s data is still a subset of the big picture—it’s limited to JavaScript execution time and [doesn’t include transfer time](https://twitter.com/aerotwist/status/666278458775896064), which may somewhat equalize the relationship between framework file size and performance cost. Also of note, [62% of mobile connections are 2G](https://twitter.com/raymondcamden/status/666674488495353856).

_(Related: Scott Jehl’s [More Weight Doesn’t Mean More Wait](https://www.filamentgroup.com/lab/weight-wait.html))_

As much snark as I talk on twitter about frameworks, it isn’t difficult to see their allure.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">check out my new javascript framework that works for space travel and your commute to work—don’t worry about speed <a href="https://t.co/IC6zDuZa9q">pic.twitter.com/IC6zDuZa9q</a></p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/666711475608666112">November 17, 2015</a></blockquote>

At [NebraskaJS](http://nebraskajs.com/) we’ve had many great speakers talk about the utility of React, Angular, Ember, and many others. As a meetup organizer, it isn’t my job to filter these talks to topics that I personally agree with or would advocate for. It’s my job to attempt to learn and help others learn from the many different perspectives that exist in our community.

That being said, my Filament Group colleagues John Bender, Todd Parker, and Scott Jehl tackled this very same topic almost a year ago with the [Performance Impact of Popular JavaScript MVC Frameworks](https://www.filamentgroup.com/lab/mv-initial-load-times.html). I’d recommend you read the whole thing—it’s very good. The data they gathered shows the big picture because it measures initial render on a variety of network connections.

The counter-argument presented against these blog posts is that TodoMVC isn’t a great test case.

> “TodoMVC is a miniscule app and is in no way representative of the apps most developers work on day to day.”—Tom Dale

However, a more complex application isn’t going to do anything to _improve_ your initial render time. If you’re developing an application that isn’t for a corporate intranet with captive employee users, you need to meet certain critical performance benchmarks of the impatient user or they will abandon your site. At time of writing, [wpostats.com documents 18 different high profile cases about users and performance](http://wpostats.com/). Users don’t care about a developer ergonomics sob story—they want the site to load fast.

In my mind, the discussion here is **not** a cage match between frameworks and _vanilla_ JavaScript. We can’t realistically make a blanket statement that you should or should not use frameworks. Attempting to frame it as such would take us down a yellow brick road trying to help our humble strawman find his brain.

> “The bottom line is that I don’t think “reduce the amount of code” is a reasonable lesson for the average developer to follow.”—Tom Dale

Additionally, oversimplifying to “less is more” does a disservice to the debate as well.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">“There is no such thing as a performance budget… less is more”&#10;&#10;Wrong. Use CSS/JS?&#10;&#10;Our business is trading bytes for features, responsibly.</p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/609408429522845696">June 12, 2015</a></blockquote>

The trick is to pick the right framework (or lack thereof) that best meets the needs of our users. We need to see past our own biases. Evaluating our own application’s complexity can be difficult. It’s human nature to want our work to be complex (and challenging and intellectually stimulating). But in a quest to be prepared for all possible project requirements, we too often inherit baggage and overengineering orthagonal to our user’s true need.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">So much product development time is spent undoing complexity that should have been left out in the first place.</p>&mdash; Jason Fried (@jasonfried) <a href="https://twitter.com/jasonfried/status/666351638836326400">November 16, 2015</a></blockquote>

I wouldn’t and couldn’t credibly say that you should forgo frameworks altogether. If you decide to spend valuable kilobytes on a framework, fortunately there is plenty of competition to choose from. Just like DOM libraries used to compete on selector engine performance, the onus is on framework authors to compete against each other on initial render performance. Vote with your `npm install` and choose one that is focused on (mobile) performance. Frameworks exist that don’t prohibitively hamper the perceived performance of your site. Frameworks exist that have a fast initial (preferably server side) render. The data is pretty clear. Choose wisely. Your users will appreciate you for it.