---
title: Placeholder Title for Article about HTML5 Placeholders
author: Zach Leatherman
layout: post
permalink: /placeholder/
categories:
  - HTML
  - JavaScript
tags:
  - highlight
  - research
---

When I’m not out fighting crime, I spend my days developing reusable components for the web. One of those reusable components I wrote was an implementation of a placeholder plugin. For the sake of privacy, all component names have been anonymized so I’ll refer to this home-grown implementation as The Mankini (if for no other reason than to drive some swimwear shopping traffic to my blog).

The Mankini’s development predated the HTML5 specification but the end result was functionally similar. The difference being that in addition to operating on text inputs and textareas, it also worked with LF/CR and selects (injects an option with an empty value). The HTML5 specification requires that LF/CR be stripped from the placeholder value.

One of the most important design considerations our interaction design team specified for The Mankini was that it was not to be used as a replacement for a form label. It was a complement to the form label and nothing more. The [HTML5 specification came to the same conclusion][13]: *“The placeholder attribute should not be used as an alternative to a label.”* The reasoning is obvious: if the form field has a non-empty value, you need to be able to easily identify the value’s semantic meaning.

![][14]  
Instead of putting the label text into the placeholder, use the placeholder to supplement the labels with an example e-mail and URL to provide more of a hint to the user for proper formatting. This example isn’t a huge usability issue since the three fields’ values would be easily identifiable, but it’s important to keep in mind.

## Placeholder Testing

I decided to run a [few compatibility tests][15] on the placeholder attribute to see where I could reuse the HTML5 placeholder inside of The Mankini (the test results are also available on [GitHub][16]). This yielded a few interesting things about some consistent and inconsistent cross-browser incompatibilities with the specification that I thought were worth sharing.

1.  The HTML5 spec states that the placeholder should be visible when *“element’s value is the empty string and/or the control is not focused.”* The and/or presents the implementor with a decision. Do they keep the placeholder text visible when the field is focused but the value is still empty? Or do I remove the placeholder when focusing into an empty field?  
      
    My personal preference is that the text remains until the user starts to type. Safari 5.1, iOS 5, and Chrome 17%2B were the only browser implementations to agree with this as of time of writing.
2.  The HTML5 spec has suggested (not required) that placeholders *only* apply to `<input type="text, search, password, tel, url, email, number">` and `<textarea>`. For some input types such as `hidden`, `radio`, or `checkbox` this limitation makes sense, the placeholder would add nothing to these elements. But for others like `datetime`, `date`, `month`, `week`, `time`, `datetime-local`, `color`, or `file` the argument can be made that it would be useful.
3.  There is [an open WebKit issue][17] to add placeholder support to contenteditable. Hopefully the specification gets modified and this gets added, as it would have been useful for my [BigText Demo Wizard][18] which manually implemented that same feature.
4.  `<input type="number">` support is broken in Safari and it’s already been [reported and fixed][19]. “The future is here, just not evenly distributed.”

As a side note, it should be said that both Opera and iOS both have comprehensively badass support of the new HTML5 form element types.

## Overlooked Polyfill Considerations

*   For those browsers that did implement the placeholder, it was well supported in password fields, showing as plaintext and then converting to masked input when the user started to enter data. This was a nice surprise, but polyfilling that behavior in old Internet Explorers will require additional lifting since dynamically changing the type attribute is not permitted.
*   Placeholder text should not be included with form submit.
*   Placeholder text should reinitialize on form reset (note: there is no `delegate` event for `reset` in jQuery)
*   Performance. Is the component required to iterate over all elements and add a class to initialize each one individually? For best performance, use CSS attribute selectors (`input[type="text"][placeholder]`) for the default style and iterate only to remove the light gray color on form elements with non-empty values. This only requires a className modification for a much smaller set of elements, only the ones with non-empty values. Remember that the browsers we polyfill are often the slowest.  
      
    Does the component modify the `className` property on `focus` and `blur`? I found this to be a huge performance issue for the Mankini in IE7 and IE8 on pages with large DOM trees and was a lot faster if the Mankini only modified one element’s style (think jQuery’s `$(this).css('color', '#000')`).
*   Clear the values on page unload. After page refresh, some browsers will attempt to save unsubmitted form values and re-enter the values when the page reloads (added after reviewing [Mathias Bynen’s jQuery-placeholder][20]).

## Bathwater, No Babies

[HTML5 Please][21] recommends that we use the new and shiny responsibly and gives the go-ahead to use the placeholder polyfill on our pages. I humbly disagree. This seems to be the same trap we fell into for rounded corners and box shadows. We put extra effort into trying to get our sites to render and behave identically cross-browser, when we should have just let them render in old browsers without rounded corners or box-shadows at all. To test whether or not a polyfill is necessary, I created a super complex decision workflow called **The Polyfill Test**. It consists of 2 steps:

1.  Look at your own browser statistics. If the feature is at >50%, continue to Step 2.
2.  Determine if the user will be able to complete their task without the feature. If the task is still completable without significant impairment, the polyfill isn’t necessary.

Globally, placeholder support is sitting at 60% and growing. This particular feature has passed the tipping point. If your audience isn’t a representative sample of the global web browser statistics (big enterprise intranets with 97% Internet Explorer), your mileage may vary.

If you’re already using validation on the form fields (client and/or server side) and you’re correctly using the placeholder to supplement (not replace) the field labels, I would argue that the polyfill isn’t needed. It’s an implementation nice-to-have, not a requirement.

*Update: Added note about Chrome 17+ support for placeholder text remaining on focus per Mathias’ feedback below.*

[13]: http://dev.w3.org/html5/spec/Overview.html#the-placeholder-attribute
[14]: /web/wp-content/uploads/2012/02/Screen-Shot-2012-02-05-at-12.12.09-AM.png "An example of misused placeholders"
[15]: http://www.zachleat.com/test/placeholder.html
[16]: https://github.com/zachleat/Compatibility-Tests/blob/master/placeholder.html
[17]: https://bugs.webkit.org/show_bug.cgi?id=21286
[18]: http://www.zachleat.com/web/bigtext-makes-text-big/
[19]: https://bugs.webkit.org/show_bug.cgi?id=61095
[20]: https://github.com/mathiasbynens/jquery-placeholder
[21]: http://html5please.us/#placeholder
