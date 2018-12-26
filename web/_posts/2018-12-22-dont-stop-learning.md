---
title: Don’t Stop Learning <del>Frameworks</del>
titleOverride: Don’t Stop Learning F̵r̵a̵m̵e̵w̵o̵r̵k̵s̵
permalink: /dont-stop-learning/
---
A few days ago, I read [an article](https://sizovs.net/2018/12/17/stop-learning-frameworks/). I liked it. I [shared it on Twitter](https://twitter.com/zachleat/status/1074776108422307840). I didn’t agree with everything in the blog post. In my experience if total agreement were a prerequisite to tweet, I would share zero things on Twitter (don’t get your hopes up 😇).

> More fundamentals! Less frameworks!<br><br>Skills with long shelf lives (unordered):<br><br>* HTML<br>* CSS<br>* JavaScript<br>* Progressive Enhancement<br>* Accessibility<br>* Typography<br>* Usability<br>* Design<br>* Clean Code and writing Testable Code<br><br>Lots of gold here: <a href="https://sizovs.net/2018/12/17/stop-learning-frameworks/">https://sizovs.net/2018/12/17/stop-learning-frameworks/</a><br><br>via <a href="https://twitter.com/nicknisi">@nicknisi</a>
> <br><a href="https://twitter.com/zachleat/status/1074776108422307840">December 17, 2018</a>

Coming back to the article and re-reading a few days later, save for the headline it still reads as a fairly measured take. Don’t spend too much of your non-work time learning the _framework du jour_ and spend time learning skills that will provide a good return on your investment and still be useful when the next thing comes along.

> One of the most important pieces of professional web development is prioritizing what to learn and when. It’s kind of like buying stocks. <br>[May 4, 2017](https://twitter.com/zachleat/status/860163324675227653)

One caveat—I don’t think that learning a framework is a waste of time. Any act of creation is a learning opportunity, independent of your particular constraints.

* If you’re a beginner you don’t have insight into the nuances of library/framework/tool selection—maybe you’ll try out your hand at Vue. Why not? (Do it—Vue is good.)
* If you’re trying to find a job and the job listing requirements all say “React experience,” you’re going to want to learn React.
* If you already have a job and the senior developers/architects have decided that the official stack uses Angular, you’re going to want to learn Angular.

> Learn fundamentals for a career! Learn frameworks for a job! <br>[Aaron Ralls ☃️☕️ (@cajunAA) on December 18, 2018](https://twitter.com/cajunAA/status/1075170373841367041)

## My Own Experience

My own web development experience has in fact traveled through a fair number of such JavaScript-specific tools. Early on in my career I learned a ton from the Yahoo! User Interface libraries. But perhaps the most idyllic example of this came early on in my web development career at the advent of Web 2.0.

The year was 2006. Internet Explorer 7 was but a newborn baby and Internet Explorer 6 was the default browser on the mega-corp beige boxes adorning every matching beige box cubicle. I had just started at the company and was placed on a project that already had the software stack laid out (coupled with a very lengthy requirements document). Due to various corporate agreements, the company had purchased a suite of tools that included an “AJAX/Web 2.0” framework called TIBCO General Interface. [I wrote a blog post about this tool ten years ago](https://www.zachleat.com/web/specific-inheritance-with-tibcos-general-interface/).

I poured over this thing—I learned it inside and out. Even though it was closed source and we only had access to obfuscated/minified JavaScript, I rewrote some of the internals to eek out some additional performance. I got in touch with the authors to contribute my changes back into the core package. I learned that XSLT could be quite speedy on Internet Explorer compared to direct DOM Node manipulation (`appendChild` et al). I learned a ton about debugging and performance profiling. Shout out to DynaTrace Ajax Edition, which had a really lovely performance profiler for old versions of Internet Explorer. It rivaled modern Chrome DevTools in a lot of ways and was way ahead of its time.

Looking back on this project—even though this framework never really came out of obscurity (and certainly passed back into it very quickly), I was able to take away some very beneficial skills independent of the framework and the project software stack. Not just skills about things that worked well, but insight into things that didn’t work well too. Perhaps unsurprisingly XSLT didn’t last 😎 but you get the idea. I picked up some skills that would be valuable moving forward. That’s the key and perhaps the nuance that the original article was missing—if and when your circumstances dictate that you’re going to be knee deep in a framework, look for those opportunities to learn something that will be useful to you on the next project using the next _framework du jour_.

> Been studying React’s source lately. Double buffering, lazy initialisation, singly linked lists, requestIdleCallback...you can learn a ton by reading the code of a popular open source project. <br>[Carl Mungazi 🇿🇼 (@CarlMungazi) December 21, 2018](https://twitter.com/CarlMungazi/status/1075912692685332480)

(See, Carl gets it.)

## Good Investments

Some other tech-specific and framework independent skills might include:

* How to get the most out of the *HTML* you write.
* How to write maintainable *CSS*.
* How to write unobtrusive, future-friendly, testable *JavaScript*.
* Proper *Accessibility* and *Usability principles*.
* How to measure *Performance* and familiarity with Web Browser DevTools.
* How to use *Progressive Enhancement* to wrangle the wide variety of device, browser, and network environments on the web.
* *Design principles* like the value of well-placed whitespace and contrast.
* *Typographic* improvements to the readability/usability of your text.

_This list is not meant to be exhaustive, but hopefully it can give you a few clues as to what bigger picture items to look for._

Are these things baseline requirements? Are they required fundamentals to build a thing for the web? For beginners: No, of course not! But for some professional use cases, some of them may be! It depends on what you’re building (and who for). A heaping dose of nuance for y’all.

My original tweet was only making the claim that investing time in some of the things on this list is a good long-bet. They’re good investments that can survive a framework-reset.

> ​1. 👏 Hire someone that’s good at HTML and CSS to build components independent of JS frameworks 👏<br>2. Plug components into a JS framework and layer on behavior later<br>3. Pay HTML/CSS devs what they deserve for giving part of your codebase longer shelf life than unpasteurized milk<br>[April 6, 2018](https://twitter.com/zachleat/status/982251377010270210)

## Hot Drama

It’s tough to communicate all of this nuance in a single tweet. Unfortunately, I think my words were misunderstood and misconstrued in a pretty heated five-hours-long Linus Torvalds-esque Quote Tweet 😞 thread from the [COO of npm](https://twitter.com/seldo/status/1075027798333493249). Quote Tweets can be devastating, especially when they come from a high profile person. The devastation compounds when the thread begins to argue against positions that you didn’t say and wouldn’t take.

All that said, I agree with some of the positions outlined in the Twitter thread and do not think our accurately communicated positions to be mutually exclusive. Yes, some inflammatory language was used in both the original blog post and in the tweet thread. But I really think the failure here wasn’t in the language but rather a breakdown in communication. An overeagerness to jump to outrage before spending time to listen. To that end I will to continue to listen to both Laurie and the original author of the blog post with the same deference that a healthy community needs to thrive.

If we still disagree, I have hope that we can disagree productively. Unfortunately the Quote Tweet format does very little to buoy that optimism. Hopefully this blog post has clarified my position.

**Keep on building, learning, and be excellent to each other, y’all.** 👍