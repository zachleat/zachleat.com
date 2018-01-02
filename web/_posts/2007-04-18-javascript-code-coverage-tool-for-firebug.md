---
title: JavaScript Code Coverage Tool for Firebug
author: Zach Leatherman
layout: post
permalink: /javascript-code-coverage-tool-for-firebug/
categories:
  - JavaScript
  - project
  - Web Browsers
tags:
  - Code Coverage
  - Firebug
  - Firefox
  - Selenium
  - deprecated
  - project
  - feedtrim
  - popular-posts-total
postRankTotalViews: 17
daysPosted: 3912
yearsPosted: 10.7
---

[**Download FirebugCodeCoverage-0.1.xpi**][1]

 [1]: http://www.zachleat.com/Projects/firebugCodeCoverage/FirebugCodeCoverage-0.1.xpi

Recently, I’ve become interested in client side automated testing tools. When I found the [Selenium][2] plug-in for Firefox, I was blown away. I can record actions in my browser and play them back! No more manual testing of JavaScript code!

 [2]: http://www.openqa.org/selenium-ide/

Researching a little bit more about automated testing tools led to the discovery of a metric called ‘Code Coverage’, a statistic that gives you a percentage of how much of your code executed during a certain period of time (usually while your automated test was executing).

Of course, I immediately thought of [Joe Hewitt’s Firebug][3] extension for Firefox, which includes a feature for JavaScript Profiling. The Profile feature of Firebug was similar to a Function Entry Code Coverage report, so I decided to modify the feature and release an add-on for Firefox that showed (at a file level) a list of which functions executed and which functions did not.

 [3]: http://www.getfirebug.com/

![coverage.gif][4]

 [4]: /web/wp-content/uploads/2007/04/coverage.gif

So, now, to test my JavaScript code coverage, I will write automated tests using the Selenium IDE plug-in for Firefox, hit the Code Coverage button in Firebug, and try to get my Code Coverage statistics in the upper 90%’s.

Screenshot Example of running the tool at yahoo.com  
![Code Coverage][5]

 [5]: /web/wp-content/uploads/2007/04/coverage2.gif

[**Download FirebugCodeCoverage-0.1.xpi**][1].

**Requirements (obviously)**

*   Mozilla Firefox
*   Firebug Extension for Mozilla Firefox

**Limitations**:

*   Does not include statistics on anonymous functions.
*   Is limited to function (entry) code coverage, does not include other forms such as exit, statement, condition, or path code coverage. (Description: [Wikipedia][6])
*   Is my first Firefox add-on, so there was a learning curve involved.

 [6]: http://en.wikipedia.org/wiki/Code_coverage

**Future Improvements**:

*   Automated integration with Selenium IDE (one button to run tests and do code coverage)
*   Better display of results, instead of a big kludge of function names
*   Additional types of coverage, depending on what options are available from [jsdIDebuggerService][7]

 [7]: http://www.xulplanet.com/references/xpcomref/ifaces/jsdIDebuggerService.html

**Update:** After many requests and much self deliberation, I have decided not to update the plugin to work with newer versions of Firefox. Code Coverage doesn’t belong in the browser, it’s just the wrong place in the tool chain to have something like this. Code Coverage results need to be exportable, and the utility must be executable from the command line to use with unit tests and continuous integration.
