---
title: 'If the Menu Fitts, We Must Acquit'
author: Zach Leatherman
layout: post
permalink: /if-the-menu-fitts-we-must-acquit/
categories:
  - Interface Design
  - Usability
tags:
  - Fitts's Law
  - Gmail
  - Google Reader
  - MacOS
  - Windows
  - Wordpress
---

One of the first things you’ll learn when diving into a self-taught course on usability is the hugely popular Fitts’s Law. In a nutshell, Fitts’s Law tries to predict the time needed to move to a “target area” (usually a link, menu, button, or form element) as a function of the distance to the element and its size. **The bigger/closer the element, the faster a user can move to it.**

Now, upon discovering myself a newly minted Mac OS convert from the hugely popular World of Windows, I quickly discovered that the application menus (File, Edit, etc) were one of the glaring differences I’d have to adjust to. Mac OS had all menus separated from the application window, all the way at the top of the screen. Coming from the Windows environment, this seemed unintuitive. But after reading more about Fitts’s Law, I discovered the reasoning: the [edges of the screen are treated as an infinite height or width][1]! Which is just a way of modifying the Fitts’s Law to say: **the easiest things to click on are at the edges of the screen.** That’s why the close icon or the Start Menu is so easy to access on Windows, and [why the Application Menu is at the top of the screen in Mac OS][2].

 [1]: http://www.codinghorror.com/blog/2006/08/fitts-law-and-infinite-width.html
 [2]: http://www.asktog.com/basics/firstPrinciples.html#fittsLaw

We know about Fitts’s Law, but **why aren’t we applying it to our web applications?** Why aren’t we using the power of infinite height/width to help out on our designs? It seems like this crucial usability law has been overlooked on the web, and without good reason. Let’s look at a few applications that get it wrong (of course, in my humble opinion).

![Wordpress Admin Menu][3]![Google Mail Menu][4]![Google Reader Menu][5]

 [3]: /web/wp-content/uploads/2010/02/Screen-shot-2010-02-15-at-11.08.15-PM.png "Screen shot 2010-02-15 at 11.08.15 PM"
 [4]: /web/wp-content/uploads/2010/02/Screen-shot-2010-02-15-at-11.12.57-PM.png "Screen shot 2010-02-15 at 11.12.57 PM"
 [5]: /web/wp-content/uploads/2010/02/Screen-shot-2010-02-15-at-11.09.16-PM.png "Screen shot 2010-02-15 at 11.09.16 PM"



All of these screenshots were taken from 100% width designs, with no real reason not to incorporate the ideas behind Fitts’s Law into the menuing system. At first glance when I brought up Google Reader, I was excited. The hover behavior appeared when the mouse cursor was positioned at the very far left of the screen, but was disappointed to discover that the although the hover background color had changed, the entire hover target was not clickable.

Naturally, I decided to make a test of my own, to test which web browsers allowed *Fitts’s Law Menus*. The test case encompassed both left and bottom aligned menus, for completeness. A top menu was excluded, given that the top of the screen is reserved for browser chrome or application menuing. A right menu was also excluded as the right portion of the screen is reserved for the page scrollbar (which is the easiest scrollbar to manipulate with your mouse, per the same rules).

Also, on the Mac OS 10.6 and Windows XP operating systems, a *Fitts’s Law Menu* at the bottom of the screen is not possible, given that the Dock and Taskbar in these operating systems occupy at least a 4 pixel trough of the bottom-most space on the monitor, even as a hover target in “auto-hide” mode. **Everyone is fighting over these crucial and very useful edge pixels.**

To test whether or not this behavior is working correctly, **maximize your browser window** and **move the cursor as far left on the screen as possible**, but still over the menu. If the links are still clickable, congratulations, your browser works!

## [View the Demo / Test Page for the Fitts’s Law Menu][6]

 [6]: /test/fittmenu/

## Compatibility Table

<table class="compatibility">
<thead>
<tr>
<th>Browser</th>
<th>Operating System</th>
<th>Left Menu</th>
<th>Bottom Menu</th>
<th>Status Bar</th>
<th>Detail</th>
</tr>
</thead>
<tbody>
<tr>
<td>Internet Explorer 8</td>
<td>Windows XP</td>
<td class="no">no</td>
<td class="no">no</td>
<td>yes</td>
<td>IE8 has a small 3 pixel border on the left and right of each window.</td>
</tr>
<tr>
<td>Internet Explorer 7</td>
<td>Windows XP</td>
<td class="no">no</td>
<td class="no">no</td>
<td>yes</td>
<td>IE7 has a small 3 pixel border on the left and right of each window.</td>
</tr>
<tr>
<td>Internet Explorer 6</td>
<td>Windows XP</td>
<td class="no">no</td>
<td class="no">no</td>
<td>yes</td>
<td>IE6 has a small 3 pixel border on the left and right of each window.</td>
</tr>
<tr>
<td>Google Chrome</td>
<td>Windows XP and Mac OS 10.6</td>
<td class="yes">yes</td>
<td class="no">no</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>Mozilla Firefox 3.5 and 3.6</td>
<td>Windows XP and Mac OS 10.6</td>
<td class="yes">yes</td>
<td class="no">no</td>
<td>yes</td>
<td></td>
</tr>
<tr>
<td>Safari 4.0.4</td>
<td>Windows XP and Mac OS 10.6</td>
<td class="yes">yes</td>
<td class="no">no</td>
<td>no</td>
<td></td>
</tr>
</tbody>
</table>



*The full screen mode of each individual browser was considered outside the scope of this study.*

## Conclusion

We should stand on the shoulders of giants and reuse the usability studies already completed on software that has gone before us. The left side of the browser window is the best place to utilize Fitts’s Law, and we should move our left-aligned menus on fluid width designs to occupy the space flush with the window’s edge to increase the speed at which those menus will be accessible by users. Having an infinite width menu is a big click target to hit.
