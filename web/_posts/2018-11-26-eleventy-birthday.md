---
title: "Happy Birthday Eleventy! \U0001F389"
tags:
  - eleventy
---

Eleventy’s [very first commit](https://github.com/11ty/eleventy/commit/00ad9192605d5d501de6aae193701c5a2297ef2c) was on November 26, 2017—which makes today Eleventy’s first birthday!

Not familiar with Eleventy? Read more about [the project’s goals](/web/introducing-eleventy/).

In one short year, Eleventy has released [40 different versions](https://www.11ty.io/docs/versions/), collected [~1100 GitHub stars](https://github.com/11ty/eleventy/stargazers), closed 257 issues, and written 535 unit tests! We have historical documentation for [all versions of the project](https://www.11ty.io/docs/versions/).

The [reviews and feedback so far](https://www.11ty.io/docs/testimonials/) have been really lovely. The project won a [Google Open Source Award](/web/eleventy-google-award/). It’s being used to build the [official Google V8 JavaScript engine web site](https://v8.dev/) (and [many other sites](https://www.11ty.io/docs/sites/)).

## Project Naming

Astute observers will note that the [first version](https://github.com/11ty/eleventy/commit/00ad9192605d5d501de6aae193701c5a2297ef2c) was actually called `elevenisland`. I had intended to use the abbreviation `11Il`, three distinct characters noted for their typographic confusion. Looking back on this, I think I made the right decision not to take this path.

Some might think that the name Eleventy is an homage to Spinal Tap (_turn it up to eleven_) or more directly, Lord of the Rings. I chose it because of a story my grandma Nonnie loved to tell about how I learned to count. Rather than move from ten to eleven like a normal child, I felt it appropriate to use the `teen` suffix for the numbers eleven and twelve, counting “ten, eleventy-teen, twelvety-teen, thirteen, …” I always liked that story and it seemed as appropriate a reason as any.

## A Few Tips for Open Source Project Management

Keep in mind that this is a side project for me. I work on this after my kid goes to sleep and not when she wants to play with me (which is all the time 😀). How does this work?

> May your open source projects be just successful enough but not too successful
> —[January 17, 2018](https://twitter.com/zachleat/status/953740453505052672)

### Don’t Push Yourself

This is probably the most important thing I’ve learned from managing an open source side project. If you’re not feeling it, don’t force yourself to work on it! If you force it, you’ll burn out. Let it go and don’t feel bad about it 😇. Open source is a marathon, not a sprint. Time off from the project is an investment in the project’s longevity.

### Obsessively Write Tests

Tests are an investment in things I don’t want to waste time on later. I wrote a lot of tests and have been getting really good mileage out of the [Ava JavaScript test runner](https://github.com/avajs).

### Issues are a Gift

I do want to say thank you to everyone that opened an issue with a question or a bug or a feature request. I know many open source maintainers will complain that issues are a distraction but they are truly the most valuable signal of how a project is doing. Every question is an opportunity to find the confusing parts of the software. Every bug report can expose a test that is missing from your test suite. Every feature request is a tiny sliver of hope for what the project could be!

This tweet made me so happy:

> This here is just a shoutout to <a href="https://twitter.com/zachleat">@zachleat</a> not only for the great work on <a href="https://twitter.com/eleven_ty">@eleven_ty</a>, but for being super polite, supportive, and *nice* in responses to issues and questions on GH. All of open source should be so pleasant! 12/10, would buy a beverage of choice.
> —sylvia villegas (@svillegastweets) [November 19, 2018](https://twitter.com/svillegastweets/status/1064561995142197248)


### Close All Feature Requests

All that being said, the best thing any open source project can do is to close all feature requests. I first saw this from [the Lodash project in a tweet thread about how they manage their GitHub issues](https://twitter.com/samselikoff/status/991395669016436736) and I decided to take a similar tact.

Simply, feature request issues are closed and put into an _Enhancement queue_. I add the following macro comment to the issue (and a `Needs Votes` label) so that everyone knows what’s going on.

> This repository is now using [lodash style issue management](https://twitter.com/samselikoff/status/991395669016436736) for enhancements. This means enhancement issues will now be closed instead of leaving them open.

> The enhancement backlog can be found here: https://github.com/11ty/eleventy/issues?utf8=%E2%9C%93&q=label%3Aneeds-votes+sort%3Areactions-%2B1-desc+

> Don’t forget to upvote the top comment with 👍!

When a feature request is completed, the `Needs Votes` label is removed.

I’ve managed open source projects before and they all inevitably fall prey to scope creep. A project designed to solve a specific need is suddenly exposed to the world, a world full of people with slightly different needs. It is a net-positive that those needs are communicated, but enhancements are often the most time consuming type of issue one can open. You can’t please everyone and even letting those requests occupy brain-time can be damaging to a project’s momentum. So, closing feature request issues is a lovely way to mitigate that drag and has the side effect of letting bug issues quickly rise to the top, increasing bug fix momentum.

I really believe that this is the best decision any open source project can make for a maintainer’s well-being.

## Thank You!

Thank you to everyone that has supported my little project. Thank you to everyone that has tried it out, left some feedback, recommended it to a friend, or sent out a tweet about Eleventy. Thank you to everyone that has gifted us [a star on GitHub](https://github.com/11ty/eleventy).

I still have big plans for Eleventy—stay tuned!
