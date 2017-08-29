---
title: Using Phing to automate JavaScript and CSS Minimization
author: Zach Leatherman
layout: post
permalink: /using-phing-to-automate-javascript-and-css-minimization/
Version Specific Article:
  - Phing (Unknown)
categories:
  - CSS
  - JavaScript
  - PHP
tags:
  - deprecated
  - feedtrim
---

*This article may be too advanced for beginner programmers. Unfortunately, I will not support any code that I do not write (in this case), so if you have troubles installing some of the packages required below, please see the authors of the problem code. Thank you.*

PHING! [Party on Wayne. Party on Garth!][1]

 [1]: http://en.wikipedia.org/wiki/Wayne's_World

If you’ve never used Phing, it’s an automation tool for PHP that is a port of Java’s ANT Build tool. But it’s not just for building (obviously, that’d be silly). You can hook all kinds of tasks into Phing: unit tests for your PHP code (you’re doing test driven development, aren’t you?), building your documentation, etc. But today, let’s look at automation of my favorite front end development tasks: packing (minimizing) our JavaScript and CSS.

To do this, I’m going to hook you up with two Filters for Phing that will use the [PHP port of Dean Edwards JavaScript Packer][2], and the PHP class [CSSTidy][3].

 [2]: http://joliclic.free.fr/php/javascript-packer/en/
 [3]: http://csstidy.sourceforge.net/

Here’s what you’ll be responsible for:

1.  Download both CSSTidy and the PHP port of Packer using the links above.
2.  Download Phing if you don’t already have it, and install it. Note the following change I had to make to my Phing binphing.bat file to get it working: Change `set PHP_CLASSPATH="%PHING_HOME%classes"` to remove the quotes: `set PHP_CLASSPATH=%PHING_HOME%classes`
3.  Download the two Filters I made for Phing: **[JSPackerFilter.phps][4]** and **[CssTidyFilter.phps][5]**, change the extensions to .php and copy into your phing directory `\classes\phing\filters\`
4.  Change the path in the include_once declaration at the top of each of the files to point to the csstidy and packer libraries you downloaded above: 

        include_once "C:\Lib\packer.php-1.0\class.JavaScriptPacker.php";
        include_once "C:\Lib\csstidy-1.3\class.csstidy.php";

5.  Get a working build file set up to point the directories your project is using. Here is a sample I made:     

        <project name="testProject" default="pack-all">
            <target name="pack-all" depends="pack-javascript,pack-css"/>
            <target name="pack-javascript">
                <copy todir="./Web/js" overwrite="true">
                    <fileset dir="../Web/js">
                        <include name="*.js" />
                    </fileset>
         
                    <filterchain>
                        <filterreader classname="phing.filters.JSPackerFilter">
                          <param name="encoding" value="62"/><!-- 0,10,62,95 or 'None', 'Numeric', 'Normal', 'High ASCII'. -->
                          <param name="fastDecode" value="true"/><!-- include the fast decoder in the packed result -->
                          <param name="specialCharacters" value="false"/><!-- have you flagged your private and local variables in the script -->
                        </filterreader>
                    </filterchain>
                </copy>
            </target>
            <target name="pack-css">
                <copy todir="./Web/css" overwrite="true">
                    <fileset dir="../Web/css">
                        <include name="*.css" />
                    </fileset>
         
                    <filterchain>
                        <filterreader classname="phing.filters.CssTidyFilter">
                            <param name="remove_last_;" value="true"/>
                            <param name="preserveCss" value="false"/>
                            <param name="template" value="high_compression"/>
                        </filterreader>
                    </filterchain>
                </copy>
            </target>
        </project>
        
    
    Templates for CssTidy include: `low_compression`, `default`, `high_compression` (declarations are limited to one line apiece), `highest_compression` (everything is put on one line).
    
    The above build file is set up to work with the following directory structure:
    
    *   Build 
        *   Web 
            *   css
            *   js
        *   **build.xml**
    *   Web 
        *   css
        *   js
    
    Files are copied from the source in /Web to the /Build/Web directory. I hope that you can see from the build.xml file above that the target directory is specified in the copy tag, todir attribute.
    
        <copy todir="./Web/js" overwrite="true">
    
    and the source directory is specified in the fileset tag, dir attribute.
    
        <fileset dir="../Web/css">
            <include name="*.css" />
        </fileset>

 [4]: /Projects/phing/JSPackerFilter.phps
 [5]: /Projects/phing/CssTidyFilter.phps

And then, all you need to do is navigate to the directory holding your build.xml and run the phing command (if you have phing in your path. If not, you can use an absolute link to phing, for example `c:\software\phing\bin\phing`). Your minimized javascript and css will be in the Build directory!
