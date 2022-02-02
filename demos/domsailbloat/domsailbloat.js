Firebug.extend(function(FBL) { with (FBL) {

var ignoreHTMLProps =
{
    // ignores the attributes injected by Sizzle, otherwise it will 
    // be visible on IE (when enumerating element.attributes)
    sizcache: 1,
    sizset: 1
};

// ignores also the cache property injected by firebug
ignoreHTMLProps[cacheID] = 1;
// TODO: xxxpedro cache remove this expando property
ignoreHTMLProps[cacheID+"b"] = 1;

	
Firebug.DOMSailBloat = extend(Firebug.Module, 
{
    appendTreeNode: function(nodeArray, html)
    {
        var reTrim = /^\s+|\s+$/g;
        
        if (!nodeArray.length) nodeArray = [nodeArray];
        
        for (var n=0, node; node=nodeArray[n]; n++)
        {
            if (node.nodeType == 1)
            {
                if (Firebug.ignoreFirebugElements && node.firebugIgnore) continue;
                
                var uid = node[cacheID];
                var child = node.childNodes;
                var childLength = child.length;
                
                var nodeName = node.nodeName.toLowerCase();
                
                var nodeVisible = isVisible(node);
                
                var hasSingleTextChild = childLength == 1 && node.firstChild.nodeType == 3 &&
                        nodeName != "script" && nodeName != "style";
                
                var nodeControl = '';
                if(!hasSingleTextChild && childLength > 0) {
                	nodeControl = '<div class="nodeControl"></div>';
                }
                
                var isIE = false;

                if(isIE && nodeControl)
                    html.push(nodeControl);
              
                if (typeof uid != 'undefined')
                    html.push(
                        '<div class="objectBox-element' + (hasSingleTextChild || childLength === 0 ? ' treesize-nochildren' : '') + '" ',
                        'id="', uid,                                                                                        
                        '">',
                        !isIE && nodeControl ? nodeControl: "",                        
                        '<span ',
                        cacheID, 
                        '="', uid,
                        '"  class="nodeBox',
                        nodeVisible ? "" : " nodeHidden",
                        '">&lt;<span class="nodeTag">', nodeName, '</span>'
                    );
                else
                    html.push(
                        '<div class="objectBox-element' + (hasSingleTextChild || childLength === 0 ? ' treesize-nochildren' : '') + '"><span class="nodeBox',
                        nodeVisible ? "" : " nodeHidden",
                        '">&lt;<span class="nodeTag">', 
                        nodeName, '</span>'
                    );
                
                for (var i = 0; i < node.attributes.length; ++i)
                {
                    var attr = node.attributes[i];
                    if (!attr.specified || Firebug.ignoreFirebugElements && 
                        ignoreHTMLProps.hasOwnProperty(attr.nodeName))
                            continue;
                    
                    var name = attr.nodeName.toLowerCase();
                    var value = name == "style" ? formatStyles(node.style.cssText) : attr.nodeValue;
                    var escaped = escapeHTML(value);
                    
                    html.push('&nbsp;<span class="nodeName">', name,
                        '</span>=&quot;<span class="nodeValue">', false && escaped.length > 20 ? escaped.substr(0,20) + '...' : escaped,
                        '</span>&quot;')
                        
                }
                
                // Just a single text node child
                if (hasSingleTextChild)
                {
                    var value = child[0].nodeValue.replace(reTrim, '');
                    if(value)
                    {
                        html.push(
                                '&gt;<span class="nodeText">',
                                escapeHTML(value),
                                '</span>&lt;/<span class="nodeTag">',
                                nodeName,
                                '</span>&gt;</span></div>'
                            );
                    }
                    else
                      html.push('/&gt;</span></div>'); // blank text, print as childless node
                
                }
                else if (childLength > 0)
                {
                	var allChildren = Firebug.browser.document.documentElement.getElementsByTagName('*').length,
                		nodeChildren = node.getElementsByTagName('*').length,
                		percentage = Math.ceil(nodeChildren*100/allChildren);

                	html.push('&gt; <span class="treesize' + (percentage > 50 ? ' treesize-hog' : '') + '">' + nodeChildren + ' node' + (nodeChildren != 1 ? 's' : '') + ', ' + percentage + '%</span></span></div>');
                }
                else 
                    html.push('/&gt;</span></div>');
          
            } 
            else if (node.nodeType == 3)
            {
                if ( node.parentNode && ( node.parentNode.nodeName.toLowerCase() == "script" ||
                     node.parentNode.nodeName.toLowerCase() == "style" ) )
                {
                    var value = node.nodeValue.replace(reTrim, '');
                    
                    if(isIE){
                        var src = value+'\n';
                       
                    }else {
                        var src = '\n'+value+'\n';
                    }
                    
                    var match = src.match(/\n/g);
                    var num = match ? match.length : 0;
                    var s = [], sl = 0;
                    
                    for(var c=1; c<num; c++){
                        s[sl++] = '<div line="'+c+'">' + c + '</div>';
                    }
                    
                    html.push('<div class="lineNo">',
                            s.join(''),
                            '</div><pre class="sourceCode">',
                            escapeHTML(src),
                            '</pre>'
                        );
                      
                }
                else
                {
                    var value = node.nodeValue.replace(reTrim, '');
                    if (value)
                        html.push('<div class="nodeText">', escapeHTML(value),'</div>');
                }
            }
        }
    },
    
    appendTreeChildren: function(treeNode)
    {
        var doc = Firebug.chrome.document;
        var uid = treeNode.id;
        var parentNode = documentCache[uid];
        
        if (parentNode.childNodes.length == 0) return;
        
        var treeNext = treeNode.nextSibling;
        var treeParent = treeNode.parentNode;
        
        var isIE = false;
        var control = isIE ? treeNode.previousSibling : treeNode.firstChild;
        control.className = 'nodeControl nodeMaximized';
        
        var html = [];
        var children = doc.createElement("div");
        children.className = "nodeChildren";
        this.appendTreeNode(parentNode.childNodes, html);
        children.innerHTML = html.join("");
        
        treeParent.insertBefore(children, treeNext);
        
        var closeElement = doc.createElement("div");
        closeElement.className = "objectBox-element";
        closeElement.innerHTML = '&lt;/<span class="nodeTag">' + 
            parentNode.nodeName.toLowerCase() + '&gt;</span>'
        
        treeParent.insertBefore(closeElement, treeNext);
        
    },
    
    removeTreeChildren: function(treeNode)
    {
        var children = treeNode.nextSibling;
        var closeTag = children.nextSibling;
        
        var isIE = false;
        var control = isIE ? treeNode.previousSibling : treeNode.firstChild;
        control.className = 'nodeControl';
        
        children.parentNode.removeChild(children);  
        closeTag.parentNode.removeChild(closeTag);  
    },
    
    isTreeNodeVisible: function(id)
    {
        return $(id);
    },
    
    select: function(el)
    {
        var id = el && el[cacheID];
        if (id)
            this.selectTreeNode(id);
    },
    
    selectTreeNode: function(id)
    {
        id = ""+id;
        var node, stack = [];
        while(id && !this.isTreeNodeVisible(id))
        {
            stack.push(id);
            
            var node = documentCache[id].parentNode;

            if (node && typeof node[cacheID] != "undefined")
                id = ""+node[cacheID];
            else
                break;
        }
        
        stack.push(id);
        
        while(stack.length > 0)
        {
            id = stack.pop();
            node = $(id);
            
            if (stack.length > 0 && documentCache[id].childNodes.length > 0)
              Firebug.DOMSailBloat.appendTreeChildren(node);
        }
        
        selectElement(node);
        
        fbPanel1.scrollTop = Math.round(node.offsetTop - fbPanel1.clientHeight/2);
    }
    
});

Firebug.registerModule(Firebug.DOMSailBloat);

// ************************************************************************************************
// HTML Panel

function DOMSailBloatPanel(){};
DOMSailBloatPanel.prototype = extend(Firebug.Panel,
{
	name: "DOMSailBloat",
    title: "DOM Sailbloat",
    create: function(){
	    Firebug.Panel.create.apply(this, arguments);
	    
	    this.panelNode.style.padding = "4px 3px 1px 15px";
	    this.contentNode.style.minWidth = "500px";
	    
	    if (Env.Options.enablePersistent || Firebug.chrome.type != "popup")
	        this.createUI();
	},
	createUI: function()
    {
        var rootNode = Firebug.browser.document.documentElement;
        var html = [];
        Firebug.DOMSailBloat.appendTreeNode(rootNode, html);

        var d = this.contentNode;
        d.innerHTML = html.join("");
        this.panelNode.appendChild(d);
    },
    destroy: function()
    {
        selectedElement = null
        fbPanel1 = null;
        
        Firebug.Panel.destroy.apply(this, arguments);
    },
    initialize: function(){
        Firebug.Panel.initialize.apply(this, arguments);

        addEvent(this.panelNode, 'click', Firebug.DOMSailBloat.onTreeClick);

        fbPanel1 = $("fbPanel1");

        if(!selectedElement)
        {
            Firebug.DOMSailBloat.selectTreeNode(Firebug.browser.document.body[cacheID]);
        }

        // TODO: xxxpedro
        addEvent(fbPanel1, 'mousemove', Firebug.DOMSailBloat.onListMouseMove);
        addEvent($("fbContent"), 'mouseout', Firebug.DOMSailBloat.onListMouseMove);
        addEvent(Firebug.chrome.node, 'mouseout', Firebug.DOMSailBloat.onListMouseMove);

        // treesize ADDED
        var style = createGlobalElement('style'),
        	css = '#fbDOMSailBloat div.objectBox-element, #fbDOMSailBloat span.nodeTag, #fbDOMSailBloat span.nodeValue, #fbDOMSailBloat span.nodeText { color: #777 !important; }' +
        		  '#fbDOMSailBloat span.treesize { color: #222 !important; }' +
        		  '#fbDOMSailBloat span.treesize-hog { color: #000088 !important; }' +
        		  '#fbHTML span.treesize { display: none; }';

        style.type = 'text/css';

        if (style.styleSheet)
            style.styleSheet.cssText = css;
        else
            style.appendChild(Firebug.chrome.document.createTextNode(css));
        
        Firebug.chrome.document.getElementsByTagName("head")[0].appendChild(style);
    },
    reattach: function()
    {
        // TODO: panel reattach
        //if(FirebugChrome.selectedHTMLElementId)
        //    Firebug.DOMSailBloat.selectTreeNode(FirebugChrome.selectedHTMLElementId);
    },
    
    updateSelection: function(object)
    {
        var id = object[cacheID];
        
        if (id)
        {
            Firebug.DOMSailBloat.selectTreeNode(id);
        }
    }
});

Firebug.registerPanel(DOMSailBloatPanel);

//************************************************************************************************

var formatStyles = function(styles)
{
    return isIE ?
        // IE return CSS property names in upper case, so we need to convert them
        styles.replace(/([^\s]+)\s*:/g, function(m,g){return g.toLowerCase()+":"}) :
        // other browsers are just fine
        styles;
};

// ************************************************************************************************

var selectedElement = null
var fbPanel1 = null;

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
var selectedSidePanelTS, selectedSidePanelTimer;

var selectElement= function selectElement(e)
{
    if (e != selectedElement)
    {
        if (selectedElement)
            selectedElement.className = "objectBox-element";
            
        e.className = e.className + " selectedElement";

        if (FBL.isFirefox)
            e.style.MozBorderRadius = "2px";
        
        else if (FBL.isSafari)
            e.style.WebkitBorderRadius = "2px";
        
        selectedElement = e;
        
        FirebugChrome.selectedHTMLElementId = e.id;
        
        var target = documentCache[e.id];
        var selectedSidePanel = Firebug.chrome.getPanel("HTML").sidePanelBar.selectedPanel;
        
        var stack = FirebugChrome.htmlSelectionStack;
        
        stack.unshift(target);
        
        if (stack.length > 2)
            stack.pop();
        
        var lazySelect = function()
        {
            selectedSidePanelTS = new Date().getTime();
            
            selectedSidePanel.select(target, true);
        };
        
        if (selectedSidePanelTimer)
        {
            clearTimeout(selectedSidePanelTimer);
            selectedSidePanelTimer = null;
        }
        
        if (new Date().getTime() - selectedSidePanelTS > 100)
            setTimeout(lazySelect, 0)
        else
            selectedSidePanelTimer = setTimeout(lazySelect, 150);
    }
}


// ************************************************************************************************
// ***  TODO:  REFACTOR  **************************************************************************
// ************************************************************************************************
Firebug.DOMSailBloat.onTreeClick = function (e)
{
    e = e || event;
    var targ;
    
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
    if (targ.nodeType == 3) // defeat Safari bug
        targ = targ.parentNode;
        
    
    if (targ.className.indexOf('nodeControl') != -1 || targ.className == 'nodeTag')
    {
        var isIE = false;
        
        if(targ.className == 'nodeTag')
        {
            var control = isIE ? (targ.parentNode.previousSibling || targ) :
                          (targ.parentNode.previousSibling || targ);

            selectElement(targ.parentNode.parentNode);
            
            if (control.className.indexOf('nodeControl') == -1)
                return;
            
        } else
            control = targ;
        
        FBL.cancelEvent(e);
        
        var treeNode = isIE ? control.nextSibling : control.parentNode;
        
        //FBL.Firebug.Console.log(treeNode);
        
        if (control.className.indexOf(' nodeMaximized') != -1) {
            FBL.Firebug.DOMSailBloat.removeTreeChildren(treeNode);
        } else {
            FBL.Firebug.DOMSailBloat.appendTreeChildren(treeNode);
        }
    }
    else if (targ.className == 'nodeValue' || targ.className == 'nodeName')
    {
        /*
        var input = FBL.Firebug.chrome.document.getElementById('treeInput');
        
        input.style.display = "block";
        input.style.left = targ.offsetLeft + 'px';
        input.style.top = FBL.topHeight + targ.offsetTop - FBL.fbPanel1.scrollTop + 'px';
        input.style.width = targ.offsetWidth + 6 + 'px';
        input.value = targ.textContent || targ.innerText;
        input.focus(); 
        /**/
    }
}

function onListMouseOut(e)
{
    e = e || event || window;
    var targ;
    
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
    if (targ.nodeType == 3) // defeat Safari bug
      targ = targ.parentNode;
        
      if (hasClass(targ, "fbPanel")) {
          FBL.Firebug.Inspector.hideBoxModel();
          hoverElement = null;        
      }
};
    
var hoverElement = null;
var hoverElementTS = 0;

Firebug.DOMSailBloat.onListMouseMove = function onListMouseMove(e)
{
    try
    {
        e = e || event || window;
        var targ;
        
        if (e.target) targ = e.target;
        else if (e.srcElement) targ = e.srcElement;
        if (targ.nodeType == 3) // defeat Safari bug
            targ = targ.parentNode;
            
        var found = false;
        while (targ && !found) {
            if (!/\snodeBox\s|\sobjectBox-selector\s/.test(" " + targ.className + " "))
                targ = targ.parentNode;
            else
                found = true;
        }
        
        if (!targ)
        {
            FBL.Firebug.Inspector.hideBoxModel();
            hoverElement = null;
            return;
        }
        
        /*
        if (typeof targ.attributes[FBL.cacheID] == 'undefined') return;
        
        var uid = targ.attributes[FBL.cacheID];
        if (!uid) return;
        /**/
        
        if (typeof targ.attributes[FBL.cacheID] == 'undefined') return;
        
        var uid = targ.attributes[FBL.cacheID];
        if (!uid) return;
        
        var el = FBL.documentCache[uid.value];
        
        var nodeName = el.nodeName.toLowerCase();
    
        if (FBL.isIE && " meta title script link ".indexOf(" "+nodeName+" ") != -1)
            return;
    
        if (!/\snodeBox\s|\sobjectBox-selector\s/.test(" " + targ.className + " ")) return;
        
        if (el.id == "FirebugUI" || " html head body br script link iframe ".indexOf(" "+nodeName+" ") != -1) { 
            FBL.Firebug.Inspector.hideBoxModel();
            hoverElement = null;
            return;
        }
      
        if ((new Date().getTime() - hoverElementTS > 40) && hoverElement != el) {
            hoverElementTS = new Date().getTime();
            hoverElement = el;
            FBL.Firebug.Inspector.drawBoxModel(el);
        }
    }
    catch(E)
    {
    }
}

}});