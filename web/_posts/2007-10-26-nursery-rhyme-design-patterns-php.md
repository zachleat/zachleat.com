---
title: 'Nursery Rhyme Code Poem [PHP]'
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

    <?php
    class I {
        public __construct()
        {
            $star = new Star();
            $star->size = 'little';
            $star->twinkle();
            $star->twinkle();
     
            self::wonder($star, 'What are you?');
     
            $world = new World();
            $world->elevation = 'So High';
            $star->setAbove($world);
     
            $d = new Diamond();
            $d->position = 'In the sky';
            $star->setLike($d);
     
            $star->twinkle();
            $star->twinkle();
            $star->size; // returns 'little'
     
            self::wonder($star, 'What are you?');
        }
     
        public static function wonder($obj, $query)
        {
            $obj->query($query);
        }
    }

*The above **code poem** is released under the BSD license.* To use in production environment without error, please precede with the following command: `error_reporting(0);` Obviously I’m kidding, don’t use this code. Not even for enterprise software.