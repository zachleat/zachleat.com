---
title: My Favorite Typinator Macros
note-tags:
  - Productivity
  - Utilities
tweet: 'https://twitter.com/zachleat/status/902227572184023040'
templateEngineOverride: md
---

I used to use [TextExpander](https://textexpander.com/) for text expansion/macros and use [Typinator](https://www.ergonis.com/products/typinator/) now. I don’t remember why I switched (I think it was vaguely associated with performance) but I’m happy with Typinator now. I use this utility a lot, probably more than a hundred times per day.

Here is an example of what it looks like:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">How I use Typinator (a snippet manager) to automate `em` calculations in CSS (with pixel size comments):<br><br>alt: <a href="https://t.co/5vEVFKylSt">https://t.co/5vEVFKylSt</a> <a href="https://t.co/gM0b9r8hq5">pic.twitter.com/gM0b9r8hq5</a></p>&mdash; Zach Leatherman (@zachleat) <a href="https://twitter.com/zachleat/status/902227572184023040?ref_src=twsrc%5Etfw">August 28, 2017</a></blockquote>

And here is a small sampling of my favorite macros:

| Name | Abbreviation | Expansion |
| - | - | - |
| Numero | `;no` | `№` |
| Ratios | `;ratio` | `∶∶∶∶` |
| Ellipsis | `;sis` | `…` |
| Zero Width Space | `;zerow` | `​` |
| Feet | `;feet` | `′` |
| Inches | `;inch` | `″` |
| My email address | `;ema` | `zachleatherman@gmail.com` |
| Shrug face | `;?` | `¯\_(ツ)_/¯` |
| Troll | `;troll` | `ಠ_ಠ` |

It really gets fancy when Typinator can do user prompts (with default values) and math based on those values. For example, I use a macro that will automatically calculate an `em` value based on a supplied parent size (and output a comment documenting the math).

## `em` Units

Abbreviation: `;ems` expands to:

```
{{size=?Size}}{{parentsize=?Parent Size<16>}}{{#size/parentsize}}em; /* {{#size}}px /{{#parentsize}} */
```

Sample Output:

```css
2em; /* 32px /16 */
```

## `em` Media Query

Abbrevation: `;emq` expands to:

```
@media (min-width: {{size=?Size}}{{#size/16}}em) {. /* {{#size}}px */
{^}
.}
```

Sample Output:

```css
@media (min-width: 48em) { /* 768px */

}
```

## `html` page

Abbrevation: `;html` expands to:

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
    </head>
    <body>
        {^}
    </body>
</html>
```

`{^}` controls where your cursor goes.

## `console.log`

Abbreviation: `;log` expands to:

```js
console.log( {^} );
```

_I totally use proper debugging tools and unit tests and barely use this one I swear._