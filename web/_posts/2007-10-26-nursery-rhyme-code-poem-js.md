---
title: 'Nursery Rhyme Code <span class="widow">Poem [JavaScript]</span>'
author: Zach Leatherman
layout: post
permalink: /nursery-rhyme-code-poem-js/
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299719071:0
categories:
  - Artistic
  - JavaScript
tags:
  - Code Poem
  - Nursery Rhymes
---

    &#40;function&#40;&#41;
    &#123;
        function BlindMouse&#40;&#41; &#123;&#125;
        BlindMouse.prototype.tail = true;
        BlindMouse.prototype.run = function&#40;after&#41; &#123;&#125;;
    &nbsp;
        function Mice&#40;mouse1, mouse2, mouse3&#41;
        &#123;
            this.mice = &#91;&#93;;
            this.mice.push&#40;mouse1, mouse2, mouse3&#41;;
            this.declare = function&#40;&#41;
            &#123;
                return this.mice.length   ' Blind Mice';
            &#125;;
            this.run = function&#40;after&#41;
            &#123;
                for&#40;var j=,k=this.mice.length;j