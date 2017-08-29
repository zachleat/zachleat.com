---
title: Pragmatic Progressive Enhancement
author: Zach Leatherman
layout: post
permalink: /pragmatic/
categories:
  - Application Design
  - Opinion
tags:
  - highlight
---

![][1]

 [1]: /web/wp-content/uploads/2011/05/juniper.jpg "Juniper Plant"

A few weeks ago at the jQuery Conference (San Francisco 2011), Nicholas Zakas delivered a wildly entertaining presentation entitled **[“Progressive Enhancement 2.0”][2]** (slides 65-79 are especially great), updating the basic rules of PE for a modern age. While prior Progressive Enhancement techniques included layering content, presentation, and behavior (conveniently represented as HTML, CSS, and JavaScript). PE 2.0 (not to be confused with our other 2nd generation friend, the Web) involves **multiple layers of CSS** for differing device capabilities (rounded corners for example) and **multiple layers of JavaScript** (ECMAScript 5 capable browsers, for example). He made the argument that this also included **ignoring older browsers** (in some cases) and only moving forward with new functionality for newer, more capable devices.

 [2]: http://www.slideshare.net/nzakas/progressive-enhancement-20

Like any web developer that believes in getting actual work done, I agree with his argument but not without exemption.

## Pieces of Flair

The benefit of Progressive Enhancement pays off when your code encounters a device is **incapable of interpreting the CSS or JavaScript correctly** in a way the code was intended. This could be because of a bug in the rendering or JavaScript engine (or God-forbid an error in the code itself), or it could be because the feature being utilized is newer than the device itself and it could not have supported it without clairvoyance or a time machine.

The example Nicholas used to display this case was the Twitter home page, which uses CSS border-radius to display rounded corners. In user agents that don’t support border-radius, such as IE&lt;9, the elements have sharp rectangular corners. Using Progressive Enhancement here is a no-brainer, especially for features (like rounded corners) that have no bearing on the actual meat of the page, the content.

But **when the feature is the content** and degradation requires additional work, the decision is more complex. **HTML5 `<video>` and `<audio>` probably aren’t an acceptible baseline** for progressive enhancement yet (based on current web browser statistics), and (video/audio) may never be an acceptable baseline depending on your views on universal accessible content. The best baseline might be a text-only transcript of the media. It really depends on how much importance the video/audio is to the core functionality of the page.

## Input

Historically speaking, in order of mainstream application the progression of input devices used to interact with (even back before web) applications was: keyboard, mouse, touch, and (even more recently) speech (see the [speech attribute on text inputs in Google Chrome][speech]). Logical progression concludes that we’ll see gesture APIs (think Microsoft Kinect) available at some point as well. It’s very important to consider that the ***the mechanism of input must also be carefully layered**. Start with a good baseline of keyboard support for your application, then add mouse interactions, then layer any specific (multi-)touch interactions on top of that, and so on. You don’t want to skip any intermediate input layers.

 [speech]: http://nooshu.com/experimenting-with-webkit-form-speech-input

In Nicholas’ presentation, he presented an example of the Yahoo! homepage, specifically modified for tablet devices (slide 115). He went on to describe that the carousel functionality on the main image on the page was not available when viewing the page in Firefox. I think this is a good example of what happens when you skip layers of input interactions, moving straight to touch, without first layering mouse-based input. The approach the Yahoo! team took might be okay if you can afford to develop multiple independent code bases for a single home page, but most teams are going to want to get as much out of a single code-base as they can.

## Cutting Fat

A side benefit of targeting Progressive Enhancement to your core functionality allows you to easily add ancillary features that **don’t need to span the entirety of your browser support spectrum**. Some might argue that the Carousel functionality in the Yahoo! tablet example could be considered ancillary, but the positioning and screen real estate dedicated to it suggests otherwise. Facebook’s chat in IE6 is a good example of this (slide 114). Is chat part of the core functionality that Facebook wants to guarantee device independent access to? Apparently not. Making decisions in this realm involves a real cost benefit analysis, **weighing the feature against user benefit, browser market share, and development/implementation time**.

## Exceptions

It’s important to note that **not all things can be developed using Progressive Enhancement**. There are certain use cases in which viewing the content in a lower fidelity than the author originally intended would destroy the value of content altogether. While these use cases are rare for most sites, most artistic endeavors can be classified as such. Consider [The Wilderness Downtown][twd], an amazing and beautiful interactive film built by Chris Milk using HTML5. The strong, vivid emotional connection between the film and the viewer would have been destroyed had the content been a text-based transcript, or just audio, or even just a video. **Art must not be compromised**.

 [twd]: http://www.thewildernessdowntown.com/

Now, some of you probably read the above paragraph and are thinking to yourself that your blog also qualifies under the above exemption (you’re the guy that doesn’t have full text feeds on his RSS aren’t you?). Just be real with yourself, most things probably don’t fit into the same level of interactivity as The Wilderness Downtown. **Don’t use art as an excuse.**

## Conclusion

Start with the **primary goal** of each individual page, this **must be universally accessible**. If the goal is to display text content, the text must be available sans-JavaScript. If the goal is to show a video or play audio, consider a transcript as your baseline. If the goal is to solicit form input from the end user, don’t skip input interaction layers. But don’t be afraid to shirk best practices on things that aren’t necessary to that goal, like social media links, a real-time chat client, trends/statistics, etc. **You’ll know what matters.**

*Update: Changed the title of the article.*
*Update: Rather than My Yahoo!, Nicholas informed me that it was just the Yahoo! homepage.*
