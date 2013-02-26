---
title: 'Nursery Rhyme Code <span class="widow">Poem [PHP]</span>'
author: Zach Leatherman
layout: post
permalink: /nursery-rhyme-design-patterns-php/
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299719076:0
categories:
  - Artistic
  - PHP
tags:
  - Code Poem
  - Nursery Rhymes
---
# 

    < ?php
    class I &#123;
        public __construct&#40;&#41;
        &#123;
            $star = new Star&#40;&#41;;
            $star->size = 'little';
            $star->twinkle&#40;&#41;;
            $star->twinkle&#40;&#41;;
    &nbsp;
            self::wonder&#40;$star, 'What are you?'&#41;;
    &nbsp;
            $world = new World&#40;&#41;;
            $world->elevation = 'So High';
            $star->setAbove&#40;$world&#41;;
    &nbsp;
            $d = new Diamond&#40;&#41;;
            $d->position = 'In the sky';
            $star->setLike&#40;$d&#41;;
    &nbsp;
            $star->twinkle&#40;&#41;;
            $star->twinkle&#40;&#41;;
            $star->size; // returns 'little'
    &nbsp;
            self::wonder&#40;$star, 'What are you?'&#41;;
        &#125;
    &nbsp;
        public static function wonder&#40;$obj, $query&#41;
        &#123;
            $obj->query&#40;$query&#41;;
        &#125;
    &#125;

*The above **code poem** is released under the BSD license.* To use in production environment without error, please precede with the following command: `error_reporting(0);` Obviously I’m kidding, don’t use this code. Not even for enterprise software.