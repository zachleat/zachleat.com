---
title: Deferreds and a Better Geolocation API
author: Zach Leatherman
layout: post
permalink: /deferred-geolocation/
categories:
  - JavaScript
---

*Warning, this article is intended for Deferred unbelievers to convince them that Deferred objects are both easy and useful. If you’re already a Deferred object expert, you might want to skip this one.*

Earlier this year I was given the opportunity to attend the jQuery Conference in San Francisco. I was delighted to go, able to finally meet some of the JavaScript greats I’d been stalking following online for years.

Looking back on the conference, the one presentation that had the **biggest impact on the way that I code** had to have been [Dan Heberden][1]‘s “[Deferreds, Putting Laziness to Work.][2]” (I would be remiss if I didn’t also mention inspiration from a [recent presentation][3] by [Eli Perelman][4] at the [Omaha jQuery Meetup][5].)

 [1]: https://twitter.com/danheberden
 [2]: http://danheberden.com/presentations/deferreds-putting-laziness-to-work/
 [3]: http://speakerdeck.com/u/eliperelman/p/jquery-deferreds-and-promises
 [4]: https://twitter.com/eliperelman
 [5]: http://www.meetup.com/jquery-omaha/

At first, Deferred objects sound scary. I can assure you that they’re actually incredibly easy and incredibly useful. Today we’ll go through the simple task of **reworking the [Geolocation API][6] to use jQuery Deferred objects**.

 [6]: http://www.w3.org/TR/geolocation-API/

Here is the standard Geolocation API to retrieve the user’s current position:

{% highlight js %}
navigator.geolocation.getCurrentPosition(function(position) {
  // success
}, function(error) {
  // failure
}, {
  // options
  enableHighAccuracy: true
});
{% endhighlight %}

When the above API is called, a prompt is shown to the user asking if they want to divulge their location information to the domain of the currently active web site. Typically this prompt is a non-blocking asynchronous operation (although not explicitly defined in the specification).

Let’s go ahead and change it to use a jQuery Deferred object:

{% highlight js %}
function getCurrentPositionDeferred(options) {
  var deferred = $.Deferred();
  navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, options);
  return deferred.promise();
};
{% endhighlight %}

Notice that the success callback is replaced by the deferred object’s resolve method and the error callback is replaced by the reject method. All of our function arguments are removed from the API. We’re left with one simple options argument.

This allows us to do things like:

{% highlight js %}
getCurrentPositionDeferred({
  enableHighAccuracy: true
}).done(function() {
  // success
}).fail(function() {
  // failure
}).always(function() {
  // executes no matter what happens.
  // I've used this to hide loading messages.
});
// You can add an arbitrary number of
// callbacks using done, fail, or always.
{% endhighlight %}

We could also use `$.when` to run code upon completion of two arbitrary and contrived operations like a Geolocation call and an Ajax request. Awesome.

To coordinate between multiple Deferred objects, use $.when:

{% highlight js %}
$.when(getCurrentPositionDeferred(), $.ajax("/someUrl")).done(function() {
  // both the ajax call and the geolocation call have finished successfully.
});
{% endhighlight %}

I wonder what other browser native APIs could be better served by using Deferred objects instead of function arguments.
