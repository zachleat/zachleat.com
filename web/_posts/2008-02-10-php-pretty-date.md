---
title: PHP Pretty Date
author: Zach Leatherman
layout: post
permalink: /php-pretty-date/
description: PHP script to show the relative difference between a time and now.
categories:
  - project
tags:
  - Dates
  - Propel
  - project
  - feedtrim
---

This class is pretty much a direct port of [John Resig’s JavaScript Pretty Date][1] to PHP 5. A few notes:

 [1]: http://ejohn.org/blog/javascript-pretty-date/

*   Requires PHP >= 5.10, due to the usage of PHP’s new [DateTime][2]class.
*   The new DateTime object parses strings using PHP’s [strtotime][3], so you don’t need to pass in an ISO8601 formatted date, as in JavaScript Pretty Date. Try “now”, or “next Wednesday”, or “ 2 weeks 4 days 23 hours 9 seconds”.
*   Extended to handle Months and Years in the past (JavaScript version only goes to weeks)

 [2]: http://us3.php.net/manual/en/function.date-create.php
 [3]: http://us3.php.net/manual/en/function.strtotime.php

Usage:

    // pass in a String DateTime, compared to another String DateTime (defaults to now)
    $myString = Date_Difference::getStringResolved('-7 weeks');
    $myString = Date_Difference::getStringResolved('-7 weeks', '+1 week');
     
    // pass in a DateTime object, compared to another DateTime object (defaults to now)
    // useful with the Propel ORM, which uses DateTime objects internally.
    $myString = Date_Difference::getString(new DateTime('-7 weeks'));
    $myString = Date_Difference::getString(new DateTime('-7 weeks'), new DateTime('+1 week'));

[Download PHP Pretty Date][4] (PHP 5.10 , 1.86KB)  

 [4]: http://www.zachleat.com/Projects/phpPrettyDate/Date_Difference.phps

[http://www.zachleat.com/Projects/phpPrettyDate/Date_Difference.phps](http://www.zachleat.com/Projects/phpPrettyDate/Date_Difference.phps)
