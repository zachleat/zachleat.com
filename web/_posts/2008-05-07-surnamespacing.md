---
title: Surnamespacing
author: Zach Leatherman
excerpt: >-
  Everyone has a library.  Everyone has their own utility classes and functions
  they're using in their own personal and contracted projects.  And now that
  everyone has a blog too, they're all releasing their libraries as open source,
  using the commando underoo philosophy of wild, free, and unrestricted naming
  schemes for their code.  Not anymore.  Let's surnamespace.
layout: post
permalink: /surnamespacing/
categories:
  - Humor
  - Java
  - JavaScript
  - PHP
tags:
  - feedtrim
---

Everyone has a library. Everyone has their own utility classes and functions they’re using in their own personal and contracted projects. And now that everyone has a blog too, they’re all releasing their libraries as open source, using the commando underoo philosophy of wild, free, and unrestricted naming schemes for their code. Not anymore. Let’s surnamespace.

What does surnamespacing give me?

*   **Accountability**: Your code is directly linked to your family honor. You’d be surprised how hard people work at test cases and increased code coverage when the respect of their lineage is at stake.
*   **Connect** with your Extended Family: Connect with programmers sharing your namespace, your family is now your development team.
*   **Minimize Collisons**: The ball and chain associated with an imposed naming scheme means that we won’t have everyone using foo and bar to hold their code, unless you’re the lucky son of a bitch that has inherited that top notch surnamespace real estate.
*   **Faster** Initial Development Cycle: Sometimes naming your library is the hardest part. Skip this step and just surnamespace it.
Jesus Christ, please show me some examples:

**JavaScript Surnamespacing**

    var Christ = {
        Jesus: {
            walkOn: function(obj) {},
            turn: function(from, to) {},
            respawn: function() {}
        }
    };
    // Sample Usage
    Christ.Jesus.walkOn('water');
    Christ.Jesus.turn('water', 'wine');
    Christ.Jesus.respawn();

**Java Surnamespacing**

    package Christ;
    public class Jesus {
        public void walkOn(String s) {}
        public void turn(String from, String to) {}
        public void respawn() {}
    }

**PHP 6 Surnamespacing ([projected usage][1])**

    namespace Christ {
        class Jesus {
            public function walkOn($obj) {}
            public function turn($from, $to) {}
            public function respawn() {}
        }
    }

**Update**: Apparently I can’t write Java code. Don’t tell work.

 [1]: http://php.net/~derick/meeting-notes.html
