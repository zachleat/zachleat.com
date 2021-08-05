---
title: Fire SVG animations (SMIL) when the SVG is visible
seo:
  openGraphBackgroundImage: /og/sources/glasses.jpg
postRank: 4
tags:
  - popular-posts
---
Had a use case come in where the design had an SVG animation that ran one interation and only one. It looked like this (some content has been removed):

{% capture svgContents %}
{% include posts/smil-animation.svg %}
{% endcapture %}
{{ svgContents | removeNewlines }}

If you’re on a device with a small vertical viewport size, you may not have noticed the above animation. Unfortunately the animations start (and complete!) whether or not the SVG is visible!

I wanted to wire the animations up to IntersectionObserver to make sure they only started animating when visible. Here’s how I did it:

## Modify the SVG

I found all of the instances of `<animate>` or `<animateTransform>` and wired up the `begin` attributes to properly cascade the order of the animation internally. I want all of them to start when my bezier curve starts animating, so I added an `id` to that animation (there was an issue with dashes in that `id`, so beware using dashes):

```markup/1
<animate
  id="mysvgline"
  attributeType="xml"
  attributeName="stroke-dashoffset"
  from="500"
  to="0"
  dur=".8s"
  begin="0s"
/>
```

_Learn how to animate a line/curve: [{% imgavatar "css" %}CSS Tricks: How SVG Line Animation Works](https://css-tricks.com/svg-line-animation-works/)_

Take note of the `begin` attribute above, that will be important later.

Now I want to find the other animations in my SVG that I want to start at the same time and change their `begin` attribute to use the `id` from above with a `.begin` suffix. This starts this animation when the referenced animation starts. It looks like this:

```markup/1
<animateMotion
  begin="mysvgline.begin"
  dur=".8s"
  repeatCount="1"
  fill="freeze"
  path="M35.5 20C216.281 20 352.411 182 512.5 182"
/>
```

Alternatively, you can use `.end` to start this animation when the referenced animation ends.

_(Side note: `repeatCount="1"` and `fill="freeze"` are best buddies. `fill="freeze"` means that your animation won’t rewind to the first frame at the end)_

Next go back to the original animation and change the `begin` attribute to `indefinite` (Read more at [MDN: `begin` - SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/begin#animate_animatecolor_animatemotion_animatetransform_set)). This tells the SVG not to start it until I use JavaScript to trigger it using `.beginElement()`.

```markup/6
<animate
  id="mysvgline"
  attributeType="xml"
  attributeName="stroke-dashoffset"
  from="500"
  to="0"
  dur=".8s"
  begin="indefinite"
/>
```

_(Another side note: just thinking aloud here as I write this—I wonder if I can use `<noscript>` inside of SVG as a no-JS fallback)_

## Add the IntersectionObserver

It might look like this:

```js
if ('IntersectionObserver' in window)  {
  // Recommended: make this selector more specific with a `data-animate-on-visible`
  let elements = document.querySelectorAll("svg");

  let observer = new IntersectionObserver(entries => {
    for(let entry of entries) {
      if(!entry.isIntersecting) {
        continue;
      }

      // Look for <animate> or <animateTransform> that need JS to start
      let beginElements = entry.target.querySelectorAll(`:scope [begin="indefinite"]`);
      for(let beginEl of beginElements) {
        beginEl.beginElement();

        // Unobserve so we don’t re-animate the dead
        observer.unobserve(entry.target);
      }
    }
  },
  {
    threshold: .5 // 50% of element must be visible
  });

  for(let elem of elements) {
    observer.observe(elem);
  }
}
```

## Try it yourself

* Here’s a Codepen for you to play with: [SVG `<animation begin="indefinite">` with IntersectionObserver](https://codepen.io/zachleat/pen/JjNaQVq)


## More Links

* [{% imgavatar "AmeliasBrain" %}Amelia Bellamy-Royds linked up this reference guide on SMIL from her SVG Book](https://oreillymedia.github.io/Using_SVG/extras/ch19-SMIL.html)
