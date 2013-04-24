---
title: Surnamespacing
author: Zach Leatherman
excerpt: "Everyone has a library.  Everyone has their own utility classes and functions they're using in their own personal and contracted projects.  And now that everyone has a blog too, they're all releasing their libraries as open source, using the commando underoo philosophy of wild, free, and unrestricted naming schemes for their code.  Not anymore.  Let's surnamespace."
layout: post
permalink: /surnamespacing/
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299718970:0
categories:
  - Humor
  - Java
  - JavaScript
  - PHP
---
# 

Everyone has a library. Everyone has their own utility classes and functions they’re using in their own personal and contracted projects. And now that everyone has a blog too, they’re all releasing their libraries as open source, using the commando underoo philosophy of wild, free, and unrestricted naming schemes for their code. Not anymore. Let’s surnamespace.

What does surnamespacing give me?

*   **Accountability**: Your code is directly linked to your family honor. You’d be surprised how hard people work at test cases and increased code coverage when the respect of their lineage is at stake.
*   **Connect** with your Extended Family: Connect with programmers sharing your namespace, your family is now your development team.
*   **Minimize Collisons**: The ball and chain associated with an imposed naming scheme means that we won’t have everyone using foo and bar to hold their code, unless you’re the lucky son of a bitch that has inherited that top notch surnamespace real estate.
*   **Faster** Initial Development Cycle: Sometimes naming your library is the hardest part. Skip this step and just surnamespace it.
Jesus Christ, please show me some examples:

**JavaScript Surnamespacing**

    var Christ = &#123;
        Jesus: &#123;
            walkOn: function&#40;obj&#41; &#123;&#125;,
            turn: function&#40;from, to&#41; &#123;&#125;,
            respawn: function&#40;&#41; &#123;&#125;
        &#125;
    &#125;;
    // Sample Usage
    Christ.Jesus.walkOn&#40;'water'&#41;;
    Christ.Jesus.turn&#40;'water', 'wine'&#41;;
    Christ.Jesus.respawn&#40;&#41;;

**Java Surnamespacing**

    package Christ;
    public class Jesus &#123;
        public void walkOn&#40;String s&#41; &#123;&#125;
        public void turn&#40;String from, String to&#41; &#123;&#125;
        public void respawn&#40;&#41; &#123;&#125;
    &#125;

**PHP 6 Surnamespacing ([projected usage][1])**

    namespace Christ &#123;
        class Jesus &#123;
            public function walkOn&#40;$obj&#41; &#123;&#125;
            public function turn&#40;$from, $to&#41; &#123;&#125;
            public function respawn&#40;&#41; &#123;&#125;
        &#125;
    &#125;

**Update**: Apparently I can’t write Java code. Don’t tell work.

 [1]: http://php.net/~derick/meeting-notes.html