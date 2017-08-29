---
title: Javascript Objects are NOT JSON
author: Zach Leatherman
layout: post
permalink: /javascript-objects-are-not-json/
categories:
  - JavaScript
tags:
  - JSON
  - feedtrim
---

*The headline should more accurately read “Javascript Objects are not **necessarily** JSON.” But that waters it down a bit, don’t you think?*

I know this has been posted a few times before, but this is not something I knew until recently, and after learning it, have noticed quite a few other people doing it wrong as well. So, to risk adding another reverb to the echo chamber, I’ll post a link to a [good explanation][1] by Jesse Skinner on the specifics of the JSON specification.

 [1]: http://www.thefutureoftheweb.com/blog/json-is-not-just-object-notation

The main point here is that **all object keys and strings in JSON must have double quotes.** I encourage you to look through the [train track specification][2] to verify for yourself.

 [2]: http://json.org/

If you try to use Captain [Crockford’s JSON Parser][3], it won’t parse your string with single quotes or (un/single)-quoted object keys. His parser has a nice regex checker built-in (and a walker callback to let you parse date strings into Date() objects). It’s a good way to verify that external data, or a data source not under your control, is safe to eval and use in your own code.

 [3]: http://www.json.org/json2.js

Here are a few quick examples:

## Valid JSON

    {"myKey": "myString"}

Don’t use single quotes. Don’t use unquoted object keys.

## Invalid JSON

    {myKey: "myString"}
    {'myKey': 'myString'}

Credits to Jonathan Snook for the [initial write-up][4] and Crockford for formalizing JSON.

 [4]: http://www.snook.ca/archives/javascript/json_is_a_subse/
