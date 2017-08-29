---
title: A Story About Proxy Filters
author: Zach Leatherman
layout: post
permalink: /proxy-filter/
categories: null
tags: null
---

_At local development meetups, I quite often see former coworkers. Omaha, while having a metro population of over 900,000, feels like a small town and the development community is tightly knit. At a recent meetup, I was reminded of this story by a former colleague that I though would be fun to share._

Working at a large Fortune 150 company had its benefits and drawbacks, most of which I won't bore you with. Everything has a process. The clothing that is allowed in the workplace has an HR process, which explains the popularity of khaki pants (the Ford Taurus of business casual). The computer hardware they purchase to put in your cubicle has through a very rigorous approval process. The computer software you’re allowed to install on your computer has a process (no, you cannot have administrative rights to your own machine). Hm. I might be getting carried away here.

One of my primary complaints about working in a huge IT department was the process governing what web sites you are allowed to visit. Many companies administer this process with something called a Proxy Filter (or Content Filter or HTTP Proxy with Content Filtering, _et cetera et cetera_). A Proxy Filter attempts to sanitize the web to a subset of web sites that are considered to be productive and helpful to the company. Anything outside this realm is considered unproductive and blocked. It's kind of like the Great Firewall of China, but at a corporate level. It should also be noted without comment that there is one other popular use case for this type of software: parents that are only [_thinking of the children_](https://www.youtube.com/watch?v=RybNI0KB1bg).

Some of the sites blocked by this implementation of a Proxy Filter were of no consequence. Facebook, for example, was and continues to be not particularly useful to my job as a web developer (this is not commentary on React). Dropbox was blocked in a Sisyphean attempt to prevent internal documents from leaking out into the world. The biggest problems were Flickr and YouTube. These web sites were often used to host educational materials that were crucial to improving my craft both as a programmer and more specifically as a web developer.

The usefulness of proxy filters is specious, at best.  I fought with the proxy server, not only as a blocker to my own personal education, but also technically. Each piece of software that needed to connect to an external server would need additional configuration to work with the proxy. It was a pain in the ass.

Through it all, I was curious. The only way to survive the bureaucracy of process in a large company is to maintain a rebellious “ask forgiveness, not permission” mentality. I wanted to know which sites were blocked by the proxy filter. I wanted to know what percentage of the web I was granted access to and what percentage was filtered. So I did what any enterprising (nay, _enterprise_) developer would do: I wrote a script to test it.

I downloaded a [CSV file containing the domains for the top web sites, as provided by Alexa](https://support.alexa.com/hc/en-us/articles/200449834-Does-Alexa-have-a-list-of-its-top-ranked-websites-). I wrote a script that would go through each one of these entries, using a headless web browser to make a request to that web site, and log the HTTP response code. If the response code matched the status returned by a filtered proxy request, I knew the domain was blocked. I would finally discover the breadth at which my access to the web was being fettered.

Now, the flaw in my logic was not in the code I had written. The flaw was perhaps in my own lack of insight and naïvety with the data. I had not opened up the CSV file to see what domains I would be testing.

As I sat in my fabric box wearing my own version of Ford Taurus business casualwear, I watched the filtered domains log out to my console. I felt the temperature of my face rise and turn red as though I’d just thoroughly embarrassed myself in front of a large crowd of people. I should have anticipated this: _a large number of the top web sites were in fact porn sites_. My computer had visited at least 10 pornographic domains before I had the reaction time to cancel the script’s execution.

Of course, nothing visual had shown on my screen because the requests were made in the console (the requests were blocked anyway). But to system administrators, the IP address belonging to the computer in my official cubicle with my official nameplate had just tried to look at a bunch of porn. Not just one or two accidental visits, but the sort of pornographic volume to which could be considered to be a serious problem.

The strangest thing about this story is that it has no further detail. I was never approached about this later, by anyone. It was never brought up in a meeting or in a yearly review. No consequences at all. I assume that these requests were buried underneath the myriad of other completely harmless requests to YouTube embeds and Facebook widgets. Or maybe there was a rampant porn problem and my intrusions were but a blip in a sea of workplace inappropriateness.

Whatever the reason, I do know one thing for certain: I'll not soon forget the day that I tried to visit a bunch of porn sites at work.
