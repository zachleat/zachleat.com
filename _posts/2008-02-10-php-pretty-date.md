---
title: 'PHP <span class="widow">Pretty Date</span>'
author: Zach Leatherman
layout: post
permalink: /php-pretty-date/
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299718307:0
categories:
  - PHP
  - Projects
tags:
  - Dates
  - Propel
---
# 

This class is pretty much a direct port of [John Resig’s JavaScript Pretty Date][1] to PHP 5. A few notes:

 [1]: http://ejohn.org/blog/javascript-pretty-date/

*   Requires PHP >= 5.10, due to the usage of PHP’s new [DateTime][2]class.
*   The new DateTime object parses strings using PHP’s [strtotime][3], so you don’t need to pass in an ISO8601 formatted date, as in JavaScript Pretty Date. Try “now”, or “next Wednesday”, or “ 2 weeks 4 days 23 hours 9 seconds”.
*   Extended to handle Months and Years in the past (JavaScript version only goes to weeks)

 [2]: http://us3.php.net/manual/en/function.date-create.php
 [3]: http://us3.php.net/manual/en/function.strtotime.php

Usage:

    // pass in a String DateTime, compared to another String DateTime (defaults to now)
    $myString = Date_Difference::getStringResolved&#40;'-7 weeks'&#41;;
    $myString = Date_Difference::getStringResolved&#40;'-7 weeks', ' 1 week'&#41;;
    &nbsp;
    // pass in a DateTime object, compared to another DateTime object (defaults to now)
    // useful with the Propel ORM, which uses DateTime objects internally.
    $myString = Date_Difference::getString&#40;new DateTime&#40;'-7 weeks'&#41;&#41;;
    $myString = Date_Difference::getString&#40;new DateTime&#40;'-7 weeks'&#41;, new DateTime&#40;' 1 week'&#41;&#41;;

[Download PHP Pretty Date][4] (PHP 5.10 , 1.86KB)  


 [4]: http://www.zachleat.com/Projects/phpPrettyDate/Date_Difference.phps