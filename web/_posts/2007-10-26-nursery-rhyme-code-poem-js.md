---
title: 'Nursery Rhyme Code Poem [JavaScript]'
author: Zach Leatherman
layout: post
permalink: /nursery-rhyme-code-poem-js/
categories:
  - Artistic
  - JavaScript
tags:
  - Code Poem
  - feedtrim
  - Nursery Rhymes
---

    (function()
    {
        function BlindMouse() {}
        BlindMouse.prototype.tail = true;
        BlindMouse.prototype.run = function(after) {};
     
        function Mice(mouse1, mouse2, mouse3)
        {
            this.mice = [];
            this.mice.push(mouse1, mouse2, mouse3);
            this.declare = function()
            {
                return this.mice.length + ' Blind Mice';
            };
            this.run = function(after)
            {
                for(var j=0,k=this.mice.length;j<k ;j++) {
                    this.mice[j].run(after);
                }
            };
            this.cutOff = function(prop, weapon)
            {
                for(var j=0,k=this.mice.length;j<k;j++) {
                    this.mice[j][prop] = false;
                }
            };
        }
     
        var mice = new Mice(new BlindMouse(), new BlindMouse(), new BlindMouse());
        alert(mice.declare());
        alert(mice.declare());
     
        function seeHow(they, func)
        {
            they[func]();
        }
     
        seeHow(mice, 'run');
        seeHow(mice, 'run');
     
        var farmersWife = function()
        {
            var weapon = 'Carving Knife';
            return {
                cutOff: function(creatures, prop)
                {
                    creatures.cutOff('tail', weapon);
                }
            }
        }();
     
        mice.run(farmersWife);
     
        farmersWife.cutOff(mice, 'tail');
     
        function haveYouSeen(obj, timeSpan)
        {
            return true;
        }
     
        if(haveYouSeen('Such a Thing', 'Your Life')) {
            alert('as ' + mice.declare() + '?');
        }
    }());

*The above **code poem** is released under the BSD license. To use in production environment without error, please enclose with a try-catch block. Obviously I’m kidding, don’t use this code. Not even for enterprise software.*
