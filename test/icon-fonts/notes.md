  ## Ligatures:

* Use `text-rendering: optimizeLegibility`. Still has a lot of gnarly WebKit bugs listed on MDN. I believe this is also what caused the [dorkq grunt débâcle](https://github.com/gruntjs/gruntjs.com/issues/81).

    	The browser emphasizes legibility over rendering speed and geometric precision. This enables kerning and optional ligatures.

	Source: [MDN text-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering).

	* In Symbolset, the ligatures have individually selectable characters.
	
	
	
## Private Use Areas (PUA)

*There are 3 PUAs in Unicode but the latter two are only available in UTF-16.*

It’s important to note that the PUA is sometimes used by the default Operating System font.  [See characters used by the PUA](http://www.fileformat.info/info/unicode/block/private_use_area/utf8test.htm) For example, Mac OS Chrome has a variety of characters starting with `0xf7a0`. iOS’s PUA is littered with Emoji characters. Often times when a PUA character is not used, the OS uses its own specified default character. This can often be a rectangle or it can be as obtuse as an alien face (Android). For this reason it is assumed that using the PUA for fallback white-space is visually unreliable.

