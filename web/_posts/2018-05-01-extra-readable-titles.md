---
title: 'Obnoxiously Readable Responsive Text with Viewport Units'
permalink: /obnoxiously-readable/
---

Ever since I created [BigText](/web/bigtext-makes-text-big/) over _seven years_ ago, I’ve been a little bit obsessed with beautifully large text. Unfortunately my own blog had post titles that were—to be honest—a little bland. I wanted to spice it up a bit and move from fixed text sizes to dynamic text that grows with the viewport size. I’ve seen many iterations of this approach using `resize` handlers in JavaScript:

* [BigText](/web/bigtext-makes-text-big/), which uses JavaScript to find the right text size automatically (it’s a bit expensive and slow).
* [FitText.js](https://github.com/davatron5000/FitText.js) (from [Dave Rupert](https://github.com/davatron5000)) uses a developer-specified scaling factor to linearly scale the text size for you (fast but requires configuration).
    - [Non-jQuery version of FitText.js](https://github.com/adactio/FitText.js) from [Jeremy Keith](https://github.com/adactio)
* Another popular one is [FlowType.JS](http://simplefocus.com/flowtype/)—the concept is very similar.

There have been other incarnations of this style of JavaScript text resizing. But as far as I can tell, we had the option to retire all of these approaches when Viewport Units were well supported in 2012! _If CSS can do the job, do the job in CSS._ Delete your redundant JavaScripts, everyone!

I can already anticipate the first retort to post: the JavaScript plugins can resize to element size and not viewport size! Okay—really this is just another vote for container queries. We can manage this with CSS—it just requires additional, annoyingly attentive care to maintain code for the boundaries at which our text should be resizable and when it should be fixed. *But*—it’s still better than a JavaScript resize-event handler (in my humble opinion). If we know where our components live in our layout, we can just adjust our Viewport Unit values accordingly to fake a sort of _Container Unit_.

## Example

The current layout specifications for my own blog post layout are:

* Baseline is 100% fluid width.
* Content has a `max-width: 589px` (`31em` at `font-size: 19px`) and maintains this `max-width` even when adding the right rail.

_(This layout specification reminds me of `sizes` from `srcset` with responsive images, hmm…)_

This is a pretty simple example—we have two boundaries: the breakpoint at which we’ll switch to using Viewport Units, and an upper bound when we hit the content `max-width` (at `589px`).


<div class="livedemo top" data-demo-label="Using Bounded font-size: 6.25vw">
    <style>
    #demo-1 {
        font-size: 20px;
        line-height: 1;
    }
    @media (min-width: 20em) { /* 320px */
        #demo-1 {
            font-size: 6.25vw;
        }
    }
    @media (min-width: 36.8125em) { /* 589px */
        #demo-1 {
            font-size: 36.8125px;
        }
    }
    </style>
    <div id="demo-1">This text only scales when the container width changes.</div>
</div>

You can customize breakpoints and minimum font-size to your use case:

``` css
#demo-1 {
    /* Minimum font-size */
    font-size: 20px;
}

/* Arbitrary minimum breakpoint */
/* Transition from 20px minimum font-size to vw using this formula: */
@media (min-width: 320px) {
    #demo-1 {
        /* ( Minimum font-size / Breakpoint ) ✕ 100 */
        /* ( 20px / 320px ) ✕ 100 = 6.25vw */
        font-size: 6.25vw;
    }
}

/* Content max-width breakpoint */
/* Transition from vw to maximum font-size using this formula: */
@media (min-width: 589px) {
    #demo-1 {
        /* Breakpoint ✕ ( Viewport Units / 100 ) */
        /* 589px ✕ ( 6.25vw / 100 ) = 36.8125px */
        font-size: 36.8125px;
    }
}
```

_Caveat: I’m using `px` here in a few places where I’d normally use `ems` or `rems`, to make the example code easier to read._

### Formulas

#### Transition from Fixed Minimum font-size to Viewport Units

This is used in the above example at the `320px` breakpoint.

```
Viewport Units = ( font-size (px) / Breakpoint (px) ) ✕ 100
```

#### Transition from Viewport Units to Fixed Maximum font-size

This is used in the above example at the `589px` breakpoint.

```
font-size (px) = Breakpoint (px) ✕ ( Viewport Units / 100 )
```

After you have your pixels, of course you can convert to `rem` or `em` as desired.

### Smaller Delta

If you want the text to grow or shrink at a reduced rate, you can use `calc` to sum a `vw` unit with a fixed CSS unit (like `px` or `em`)—but getting your boundaries aligned properly is a bit more difficult and beyond the scope of what I’d like to cover here. An exercise left up to the reader 😇.

### Twin Props

{% highlight css %}
#demo-1 {
    /* Minimum font-size */
    font-size: 20px;
    font-size: 6.25vw;
}
{% endhighlight %}

I’ve seen some developers suggest forgoing the minimum media query altogether with the above code. This is _probably_ fine but I don’t really like that an unbounded minimum font-size could quickly become unreadable at super small breakpoints. Get on that smart watch, y’all.

## Bikeshedding a New Unit

It does make me wonder how container queries (or similar) might work with Viewport Units. I’m starting to see now that the addition of a future Container Unit might be warranted to simplify the above code.

{% highlight css %}
#demo-2 {
    font-size: 20px;
}
@media (min-width: 320px) {
    #demo-2 {
        /* Beware: `cw` is not a real unit */
        font-size: 6.25cw;
    }
}
{% endhighlight %}

This would alleviate the need for the second breakpoint altogether, as the font-size would be determined by the size of an arbitrary container, which already has an upper bound `max-width` on it.

## Anyway

All of this build-up is really just to say that I made all my blog post titles huge and it makes me really happy. I’m using Viewport Units with a minimum boundary only 😎.

If your screen is wide enough (perhaps—say—a viewport size of 3440px), you can probably read them from space:

<img src="/web/img/posts/extra-readable-titles/big.png" alt="Giant Viewport Preview of the Blog Post Title" class="primary">

This is likely just the beginning of a long string of changes I’ll make to the super-wide layout for my blog.