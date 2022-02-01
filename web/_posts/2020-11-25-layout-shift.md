---
title: Ruthlessly Eliminating Layout Shift on netlify.com
tags:
  - web-components
imgNoPictureOptions:
  formats:
    - jpeg
  widths:
    - null
imageAttr:
  banner:
    src: ./web/img/posts/layout-shift/banner.png
    alt: Screenshot of the banner on netlify.com
  oldsite:
    src: ./web/img/posts/layout-shift/old-site.png
    alt: Filmstrip showing hidden banner for ~600ms on old netlify.com design
    class: primary
  newsite:
    src: ./web/img/posts/layout-shift/new-site.png
    alt: Filmstrip showing hidden banner for ~600ms on the new netlify.com design
    class: primary
  results:
    src: ./web/img/posts/layout-shift/new-site-fixed.png
    alt: Filmstrip showing banner visible on first render
    class: primary
  chart:
    src: ./web/img/posts/layout-shift/layout-shifts.png
    alt: 'Graph of Layout Shifts: previous has .35 and new has 0'
---
On the Netlify web site, we have a little banner that appears at the top to drive traffic to new and exciting things happening in Netlify-land.

<div class="livedemo livedemo-mixed livedemo-auto" data-demo-label="Announcement Banner">{% image imageAttr.banner %}</div>

That banner has exactly two features:

1. An advanced HTML feature known only to a select few <em>Old Guard</em> developers: the hyperlink.
2. A close button (which saves the preference for future page loads)

There are a few key performance milestones in the lifecycle of this component, and this is how worked previously:

1. The page’s initial render. The banner is ⚠️⚠️⚠️ hidden by default. Without JavaScript or before JavaScript loads, the banner is hidden.
2. After the JavaScript loads, we check `localStorage` to see if the user has closed the banner previously. We hash this preference to the banner URL so that if the banner changes, it will render even if the user has opted out previously. If applicable, render the banner.
3. Lastly we bind JavaScript events to the close button. Events are not necessary for the hyperlink, because its behavior is delivered exlusively in HTML (very much wow).

Steps 2 and 3 were bundled and executed together in the same component code file. And in some [earlier iterations of the site](https://webpagetest.org/video/compare.php?tests=200526_GE_3bac7c5d7f3e40ea0eb25db86b65b66e-r%3A5-c%3A0&thumbSize=200&ival=16.67&end=visual), up the amount of time that elapsed between Step 1 and 2 could be up to ~600 ms.

{% image imageAttr.oldsite imgNoPictureOptions %}

On [our new site (faster, mind you) redesign](https://webpagetest.org/video/compare.php?tests=201125_Di9X_11c25281710129654355efb9be2104ea-r%3A3-c%3A0&thumbSize=200&ival=100&end=visual) we inlined the JavaScript for Steps 2 and 3 into the end of the `<body>` and the delay was still very present:

{% image imageAttr.newsite imgNoPictureOptions %}

## The fix

What we needed to do was swap the behavior. The common use case was to visit the site without the opt-in preference to hide the banner. We must make the banner visible by default and make the JavaScript path to hide it the exception to the rule.

This changes our previously mentioned Step 1, the page’s initial render, show the banner. Without JavaScript or before JavaScript loads, the banner should be visible.

We also split the JavaScript code for the component into two separate pieces: one piece to check whether or not the user has the preference to hide and a separate Web Component to bind the events.

_Update_: I’ve packaged up the code below and [put it on GitHub for re-use](https://github.com/zachleat/herald-of-the-dog).

### CSS and HTML

We use opacity to toggle the close button so that it doesn’t reflow the component when it’s enabled via JavaScript.

```css
.banner--hide announcement-banner,
announcement-banner[hidden] {
  display: none;
}
[data-banner-close] {
  opacity: 0;
  pointer-events: none;
}
.banner--show-close [data-banner-close] {
  opacity: 1;
  pointer-events: auto;
}
```

```html
<announcement-banner>
  <a href="https://www.netlify.com/sustainability/">Read about our Sustainability</a>
  <button type="button" data-banner-close>Close</button>
</announcement-banner>
```

### JavaScript

`banner-helper.js`, put into the `<head>`:

```js
// the current banner CTA URL, we inject this from a JSON data file
let ctaUrl = "https://www.netlify.com/sustainability/";
let savedCtaUrl = localStorage.getItem("banner--cta-url");

if(savedCtaUrl === ctaUrl) {
  document.documentElement.classList.add("banner--hide");
}
```

`banner.js`, defer this until later (how much later is up to you):

```js
class Banner extends HTMLElement {
  connectedCallback() {
    // No matter when this runs, the close button will not be visible
    // until after this class is added—prevents ghost clicks on the button
    // before the event listener is added.
    this.classList.add("banner--show-close");

    let button = this.getButton();
    if(button) {
      button.addEventListener("click", () => {
        this.savePreference();
        this.close();
      });
    }
  }

  getButton() {
    return this.querySelector("[data-banner-close]");
  }

  savePreference() {
    let cta = this.querySelector("a[href]");
    if(cta) {
      let ctaUrl = cta.getAttribute("href");
      localStorage.setItem("banner--cta-url", ctaUrl);
    }
  }

  close() {
    this.setAttribute("hidden", true);
  }
}

window.customElements.define("announcement-banner", Banner);
```

Astute readers will notice that the above is a web component but let’s just keep that between us.

## The Results

Note that the [first render contains the banner](https://webpagetest.org/video/compare.php?tests=201125_DiAJ_d03dece53d218fafa5a8e00c4c22a809-r%3A1-c%3A0&thumbSize=200&ival=100&end=visual)! This is the same render behavior whether or not JavaScript is in play.

{% image imageAttr.results imgNoPictureOptions %}

In this [waterfall comparison](https://webpagetest.org/video/compare.php?tests=201125_DiCC_6c46324998300e1d9695c4359b5004b4%2C201125_Di7H_7267acbae0816330717ab9192388c5d6&thumbSize=200&ival=100&end=visual), you might note that we reduced layout shift metrics to zero.

{% image imageAttr.chart %}

And because we inlined the script for repeat views into the `<head>`, when you hide the banner and navigate to a new page, the banner will be hidden before first render too.

Not too bad for a few small changes!

Next target will be to improve the web font render.
