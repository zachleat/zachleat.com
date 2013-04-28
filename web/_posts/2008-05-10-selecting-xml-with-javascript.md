---
title: 'Selecting XML Nodes with JavaScript (Peril <span class="widow">of getElementsByTagName)</span>'
author: Zach Leatherman
excerpt: |
  Parsing XML in the browser can be a tricky beast.  There are many different wrong ways to do it, which can leave you cold and naked in a snowstorm if you're not careful.  So, let's put on the metaphorical electric one-sie of standards based code and let the power of Edison heat our JavaScript code like the innards of a <a href="http://starwars.wikia.com/wiki/Tauntaun">tauntaun</a>.
layout: post
permalink: /selecting-xml-with-javascript/
btc_comment_counts:
  - 'a:0:{}'
btc_comment_summary:
  - 'a:0:{}'
bttc_cache:
  - 1299713418:4
categories:
  - JavaScript
tags:
  - jQuery
  - XML
  - YUI
---

*There are two popular camps for ajax data formats right now: XML and JSON. Both have their (dis-)advantages. The purpose of this article is to show you how to effectively parse XML in the browser.*

### Super Fast Beginner’s Primer

*   Case 1: **Node** (or un-namespaced node, null-namespaced node): a node without a prefix, such as child here:  
    ``
*   Case 2: **Default namespaced node**: a node without a prefix, but a parent node (or itself) has a xmlns attribute, like both root and child here:  
    ``
*   Case 3: **Namespaced node**: a node with a prefix, and a parent node (or itself) declaring a xmlns with that prefix attached, like both child and root here:  
    ``

### /End Primer

Parsing XML in the browser can be a tricky beast. There are many different wrong ways to do it, which can leave you cold and naked in a snowstorm if you’re not careful. So, let’s put on the metaphorical electric one-sie of standards based code and let the power of Edison heat our JavaScript code like the innards of a [tauntaun][1].

 [1]: http://starwars.wikia.com/wiki/Tauntaun

If there is one thing you can take away from this article, its that the problems with XML in JavaScript have already been solved, and there is library code out there to do the job for you. But libraries aren’t a substitute for knowledge (abstraction is a dangerous thing during education), so let’s learn **why** these problems are occurring so we can wrinkle our gray matter and increase our productivity at the same time.

## Use Cases

These are the main use cases that takes place when selecting a node inside of an XML document:

1.  **Case 1**: Selecting un-namespaced nodes (or nodes in the null namespace):     
    
    This one is easy. If you can guarantee that your XML will never have any namespaces, you’re home free. Take your get out of jail free card and run for the hills. Using this assumption, you can query nodes inside of your XML Document object using nothing other than `getElementsByTagName()`. Lucky bastard.
    
        // assume oDocEl is the documentElement inside of an XML Document 
        var correctForCase1 = oDocEl.getElementsByTagName&#40;'child'&#41;;

2.  **Case 2**: Selecting default namespaced nodes:     
    
    Tread lightly, this is about to get serious. In most cases, historically I had thought that using the solution described for Case 1 would be sufficient in this case. I had learned awhile back that Internet Explorer treats node names (including namespace prefix and local name together) as one string. So, the method for Case 1 should work for Internet Explorer, especially in the case of node sans prefix. In Firefox, you’d have to use getElementsByTagNS(), but that would be just a simple wrapper.
    
    Then I met an Internet Explorer exception. The only unique thing about this installation of Internet Explorer 7 was that it had MSXML 6 installed, when all the other computers I had tested on were using MSXML 3. The obvious conclusion here is that MSXML 6 won’t select child nodes for Case 2.
    
        var incorrectForCase2 = oDocEl.getElementsByTagName&#40;'child'&#41;;
    
    Here’s the right way to select nodes for Case 2. Fair warning, to keep the code examples here simple, this solution requires Sarissa (sarissa.js and sarissa\_ieemu\_xpath.js) to be included on the page prior to usage.
    
        // assume oDoc is an XML Document object.
        oDoc.setProperty&#40;"SelectionNamespaces", "xmlns:whatever='http://example.com/'"&#41;;
        var oDocEl = oDoc.documentElement;
        var correctForCase2A = oDocEl.selectNodes&#40;'whatever:child'&#41;;
        var correctForCase2B = oDocEl.selectSingleNode&#40;'whatever:child'&#41;;
    
    Note how we’ve mapped what was the default namespace (without a prefix) to be a namespace WITH a prefix during the node selection.
    
    It should be noted that when the resultant XML has a namespace attached (Case 2 and 3), Firefox works fine using getElementsByTagNameNS. IE doesn’t include support for that method, however, so we’re forced to find a more complete solution.  
    *   **Case 3**: Select a non-default namespaced node:     
        
        As I mentioned in Case 2, normally (pre-MSXML 6), you’d be able to perform a `getElementsByTagName('prefix:child')` in IE and use getElementsByTagNameNS in Firefox as usual. But that has changed now. We need to set up the SelectionNamespaces property for IE, and we’ll use Sarissa to take it cross-browser for us.
        
            // assume oDoc is an XML Document object.
            oDoc.setProperty&#40;"SelectionNamespaces", "xmlns:whatever='http://example.com/'"&#41;;
            var oDocEl = oDoc.documentElement;
            var correctForCase3A = oDocEl.selectNodes&#40;'whatever:child'&#41;;
            var correctForCase3B = oDocEl.selectSingleNode&#40;'whatever:child'&#41;;
            // Note, this is the same code as Case 2 (which is a good thing)
        
        Note that we did *not* have to use the same prefix that was defined by the result XML. We can map it to whatever we want (literally).   
        ## Why is this important?
        
        Because most libraries don’t handle Case 2 and Case 3, which are important parts of XML. Here’s some code straight from YUI 2.5.1 (DataSource component):
        
            // Line 1394
            var xmlNode = result.getElementsByTagName&#40;key&#41;;
            if&#40;xmlNode && xmlNode.item&#40;&#41; && xmlNode.item&#40;&#41;.firstChild&#41; &#123;
                data = xmlNode.item&#40;&#41;.firstChild.nodeValue;
            &#125;
            else &#123;
                   data = "";
            &#125;
        
        Notice how they just do getElementsByTagName. For shame :( jQuery doesn’t handle Case 2 or Case 3 either. (Proof is an exercise to the reader :P) So, if you have XML data sources with namespaces, it would do you well to use the solution presented in this article, or you’re going to have headaches later.
        
        ## Springer’s Final Word
        
        Don’t use getElementsByTagName. If you do, PLEASE include a note saying that your code isn’t going to support namespaced XML. Branch your selection code to check if Sarissa has been included on the page, and use Sarissa for namespaced XML if it’s there. It’s not fun to be pidgin-holed into the simplest case of XML.