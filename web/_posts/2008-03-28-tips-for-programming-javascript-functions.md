---
title: Tips for Programming JavaScript Functions
author: Zach Leatherman
layout: post
permalink: /tips-for-programming-javascript-functions/
categories:
  - JavaScript
tags:
  - jQuery
  - feedtrim
---

*This article is about my personal coding style, given little tips and tricks that I use to make my code cleaner and more readable.*

## Required and Optional Arguments

There are generally two styles used when programming a new function in JavaScript. The first, most obvious, and least extensible method is putting each argument as its own argument in the function definition, as so:

    // For our purposes, assume arg1 is required, and arg2 and arg3 are optional.
    function myFunction(arg1, arg2, arg3) {
       arg2 = arg2 || 'defaultValue';
       arg3 = arg3 || 'defaultValue';
    }

One obvious downside to this method is that it requires a line of code for each optional argument to define a default value. What if you want to pass in an arg3, but not an arg2? Your call could end up like: `myFunction('myArg1', null, 'myArg3');`. This might work in the beginning, but what about when you have more than 3 arguments defined? That’s going to get messier than a Dick Cheney hunting party.

The next method people generally move to when they have a lot of optional arguments in their function definition is to put all the arguments into a single object argument, like the following:

    // taken from jQuery
     $.ajax({
       type: "POST",
       url: "some.php",
       data: "name=John&location=Boston",
       success: function(msg){}
     });

The benefit to this method is that you can populate all the defaults easily by using jQuery.extend, like so:

    // simulated code, not from jQuery
    $.ajax = function(args)
    {
        var defaultArgs = {
            type: 'GET',
            data: '',
            dataType: 'text'
        };
        // overwrites defaultArgs with args values, stores result into args.
        args = jQuery.extend({}, defaultArgs, args);
        if(!args['url']) {
              return;
        }
    };

The args object would end up with the following value:

    {
       type: "POST",
       url: "some.php",
       data: "name=John&location=Boston",
       success: function(msg){},
       dataType: 'text'
    }

This method can be easily seen as extensible. You could put a metric shit ton of optional arguments in your function (the option is there, I won’t judge you), and you could define them in any order inside of the object without having to put in null spacers like the previous method.

But what about required arguments? The Ajax method above requires a URL, and the script can’t guess a default for that variable. But it isn’t immediately obvious to the end-user that URL is always required. And what’s more, you’ll have to put specific code inside your function to check that the required arguments were sent in the object. (Think `if(!args['url']) { return; }` as shown two code blocks up.)

Which leads me to my favorite way to define functions: a combination of the two methods. Declare your required arguments as explicit arguments, and pile the rest into an optional arguments object. Here I’ll show you how I would define the Ajax function using this method:

    // jQuery doesn't use this argument structure, so don't copy and paste this.
     $.ajax('some.php', {
       type: "POST",
       data: "name=John&location=Boston",
       success: function(msg){}
     });

This way, it is immediately obvious which is a required argument and which is optional, and your required arguments will never be accidentally assigned a default value in your code. If the end-user doesn’t send in all of the required arguments, the resulting error message will be obvious and easily fixed, without a ton of code inside of your function to check that the end-user obeyed the function defintion.

## Setting Default Values for Optional Arguments

When developing code, sometimes it is obvious that the method described above for optional arguments may be overkill for a tiny little utility method. Sometimes you just want a boolean flag, or a single optional argument. When that occassion arrives, it’s time to put on your robe and coding hat, because we’re going to town.

In the beginning of JavaScript maturity, my `<body>` was going through a lot of changes. I was confused about a lot of things, and you’d see a lot of lines of code like this (embarrassingly enough):

    function myFunction(runDoSomething)
    {
         if(runDoSomething == null) {
              // never make your default true, as I'll show you below
              runDoSomething = true;
         }
         if(runDoSomething) {
              doSomething();
         }
    }

Ugh, checking against null? Janet Reno looked better in the morning. But now that I’m a full grown man that can open his own pickle jars, I’ve got some guidelines:

1.  When the argument is optional and might be left out, define it in your code in such a way that if it does have a value, it will not evaluate to boolean false (0, false, undefined, null, ”, NaN). In other words, don’t make the value the user passes in for this argument be false. False is the value it should have when it’s empty. See the example below:

        // runDoSomething is still optional
        function myFunction(runDoSomething)
        {
             if(runDoSomething) {
                  doSomething();
             }
        }
    
    We didn’t have to assign a default value to arg1, because if it’s `null`, then `doSomething()` won’t execute. Don’t ever use arg1 in a way that would have you passing in false, because false and null are the same in a boolean comparison.  
1. When using non-boolean optional arguments, another way to avoid assigning a default value to an optional argument is to use the OR operator to give you a default value where you’re using it. This is really only useful when you use the argument in one single place inside of your function. If you’re using it more than once, it’s best to define the default value at the top of the function.

        function myFunction(arg1)
        {
             // arg1 is used only once
             jQuery('#myId').html(arg1 || 'myDefaultValue');
        }
        function myFunction(arg1)
        {
             arg1 = arg1 || 'myDefaultValue;
             // arg1 is used multiple times
             jQuery('#myId').html(arg1);
             jQuery('#myOtherId').html(arg1);
        }
    
Hopefully you’ve learned something from this post. It is the byproduct of many mistakes and overcomplicated functions that I’ve refactored to end up with this result.
