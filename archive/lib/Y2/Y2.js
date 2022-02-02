/*
 * Y2.util.Dom, a CSS Selector Interface for YAHOO.util.Dom
 * Zach Leatherman (http://www.zachleat.com/)
 * 
 * This file includes DomQuery from ExtJS (released under MIT license)
 * 
 * Ext - JS Library 1.0 Alpha 3 - Rev 4
 * Copyright(c) 2006-2007, Jack Slocum.
 * 
 * http://www.extjs.com/license.txt
 */
if( typeof Ext == 'undefined' ) var Ext = function(){};
Ext.DomQuery = function(){
    var cache = {}, simpleCache = {}, valueCache = {};
    var nonSpace = /\S/;
    var trimRe = /^\s*(.*?)\s*$/;
    var tplRe = /\{(\d+)\}/g;
    var modeRe = /^(\s?[\/>]\s?|\s|$)/;
    var tagTokenRe = /^(#)?([\w-\*]+)/;
    
    function child(p, index){
        var i = 0;
        var n = p.firstChild;
        while(n){
            if(n.nodeType == 1){
               if(++i == index){
                   return n;
               }
            }
            n = n.nextSibling;
        }
        return null;
    };
    
    function next(n){
        while((n = n.nextSibling) && n.nodeType != 1);
        return n;
    };
    
    function prev(n){
        while((n = n.previousSibling) && n.nodeType != 1);
        return n;
    };
    
    function clean(d){
        var n = d.firstChild, ni = -1;
 	    while(n){
 	        var nx = n.nextSibling;
 	        if(n.nodeType == 3 && !nonSpace.test(n.nodeValue)){
 	            d.removeChild(n);
 	        }else{
 	            n.nodeIndex = ++ni;
 	        }
 	        n = nx;
 	    }
 	    return this;
 	};

    function byClassName(c, a, v, re, cn){
        if(!v){
            return c;
        }
        var r = [];
        for(var i = 0, ci; ci = c[i]; i++){
            cn = ci.className;
            if(cn && (' '+cn+' ').indexOf(v) != -1){
                r[r.length] = ci;
            }
        }
        return r;
    };

    function attrValue(n, attr){
        if(!n.tagName && typeof n.length != "undefined"){
            n = n[0];
        }
        if(!n){
            return null;
        }
        if(attr == "for"){
            return n.htmlFor;
        }
        if(attr == "class" || attr == "className"){
            return n.className;
        }
        return n.getAttribute(attr) || n[attr];
          
    };
    
    function getNodes(ns, mode, tagName){
        var result = [], cs;
        if(!ns){
            return result;
        }
        mode = mode ? mode.replace(trimRe, "$1") : "";
        tagName = tagName || "*";
        if(typeof ns.getElementsByTagName != "undefined"){
            ns = [ns];   
        }
        if(mode != "/" && mode != ">"){
            for(var i = 0, ni; ni = ns[i]; i++){
                cs = ni.getElementsByTagName(tagName);
                for(var j = 0, ci; ci = cs[j]; j++){
                    result[result.length] = ci;
                }
            }
        }else{
            for(var i = 0, ni; ni = ns[i]; i++){
                var cn = ni.getElementsByTagName(tagName);
                for(var j = 0, cj; cj = cn[j]; j++){
                    if(cj.parentNode == ni){
                        result[result.length] = cj;
                    }
                }
            }
        }
        return result;
    };
    
    function concat(a, b){
        if(b.slice){
            return a.concat(b);
        }
        for(var i = 0, l = b.length; i < l; i++){
            a[a.length] = b[i];
        }
        return a;
    }
    
    function byTag(cs, tagName){
        if(cs.tagName || cs == document){
            cs = [cs];
        }
        if(!tagName){
            return cs;
        }
        var r = []; tagName = tagName.toLowerCase();
        for(var i = 0, ci; ci = cs[i]; i++){
            if(ci.nodeType == 1 && ci.tagName.toLowerCase()==tagName){
                r[r.length] = ci;
            }
        }
        return r; 
    };
    
    function byId(cs, attr, id){
        if(cs.tagName || cs == document){
            cs = [cs];
        }
        if(!id){
            return cs;
        }
        var r = [];
        for(var i = 0,ci; ci = cs[i]; i++){
            if(ci && ci.id == id){
                r[r.length] = ci;
                return r;
            }
        }
        return r; 
    };
    
    function byAttribute(cs, attr, value, op, custom){
        var r = [], st = custom=="{";
        var f = Ext.DomQuery.operators[op];
        for(var i = 0; ci = cs[i]; i++){
            var a;
            if(st){
                a = Ext.DomQuery.getStyle(ci, attr);
            }
            else if(attr == "class" || attr == "className"){
                a = ci.className;
            }else if(attr == "for"){
                a = ci.htmlFor;
            }else if(attr == "href"){
                a = ci.getAttribute("href", 2);
            }else{
                a = ci.getAttribute(attr);
            }
            if((f && f(a, value)) || (!f && a)){
                r[r.length] = ci;
            }
        }
        return r;
    };
    
    function byPseudo(cs, name, value){
        return Ext.DomQuery.pseudos[name](cs, value);
    };
    
    // This is for IE MSXML which does not support expandos.
    // IE runs the same speed using setAttribute, however FF slows way down
    // and Safari completely fails so they need to continue to use expandos.
    var isIE = window.ActiveXObject ? true : false;

    var key = 30803;

    function nodupIEXml(cs){
        var d = ++key;
        cs[0].setAttribute("_nodup", d);
        var r = [cs[0]];
        for(var i = 1, len = cs.length; i < len; i++){
            var c = cs[i];
            if(!c.getAttribute("_nodup") != d){
                c.setAttribute("_nodup", d);
                r[r.length] = c;
            }
        }
        for(var i = 0, len = cs.length; i < len; i++){
            cs[i].removeAttribute("_nodup");
        }
        return r;
    }

    function nodup(cs){
        var len = cs.length, c, i, r = cs, cj;
        if(!len || typeof cs.nodeType != "undefined" || len == 1){
            return cs;
        }
        if(isIE && typeof cs[0].selectSingleNode != "undefined"){
            return nodupIEXml(cs);
        }
        var d = ++key;
        cs[0]._nodup = d;
        for(i = 1; c = cs[i]; i++){
            if(c._nodup != d){
                c._nodup = d;
            }else{
                r = [];
                for(var j = 0; j < i; j++){
                    r[r.length] = cs[j];
                }
                for(j = i+1; cj = cs[j]; j++){
                    if(cj._nodup != d){
                        cj._nodup = d;
                        r[r.length] = cj;
                    }
                }
                return r;
            }
        }
        return r;
    }

    function quickDiffIEXml(c1, c2){
        var d = ++key;
        for(var i = 0, len = c1.length; i < len; i++){
            c1[i].setAttribute("_qdiff", d);
        }
        var r = [];
        for(var i = 0, len = c2.length; i < len; i++){
            if(c2[i].getAttribute("_qdiff") != d){
                r[r.length] = c2[i];
            }
        }
        for(var i = 0, len = c1.length; i < len; i++){
           c1[i].removeAttribute("_qdiff");
        }
        return r;
    }

    function quickDiff(c1, c2){
        var len1 = c1.length;
        if(!len1){
            return c2;
        }
        if(isIE && c1[0].selectSingleNode){
            return quickDiffIEXml(c1, c2);
        }
        var d = ++key;
        for(var i = 0; i < len1; i++){
            c1[i]._qdiff = d;
        }
        var r = [];
        for(var i = 0, len = c2.length; i < len; i++){
            if(c2[i]._qdiff != d){
                r[r.length] = c2[i];
            }
        }
        return r;
    }
    
    function quickId(ns, mode, root, id){
        if(ns == root){
           var d = root.ownerDocument || root;
           return d.getElementById(id);
        }
        ns = getNodes(ns, mode, "*");
        return byId(ns, null, id);
    }
    
    return {
        getStyle : function(el, name){
            return Ext.fly(el).getStyle(name);
        },
        /**
         * Compiles a selector/xpath query into a reusable function. The returned function
         * takes one parameter "root" (optional), which is the context node from where the query should start. 
         * @param {String} selector The selector/xpath query
         * @param {String} type (optional) Either "select" (the default) or "simple" for a simple selector match
         * @return {Function}
         */
        compile : function(path, type){
            // strip leading slashes
            while(path.substr(0, 1)=="/"){
                path = path.substr(1);
            }
            type = type || "select";
            
            var fn = ["var f = function(root){\n var mode; var n = root || document;\n"];
            var q = path, mode, lq;
            var tk = Ext.DomQuery.matchers;
            var tklen = tk.length;
            var mm;
            while(q && lq != q){
                lq = q;
                var tm = q.match(tagTokenRe);
                if(type == "select"){
                    if(tm){
                        if(tm[1] == "#"){
                            fn[fn.length] = 'n = quickId(n, mode, root, "'+tm[2]+'");';
                        }else{
                            fn[fn.length] = 'n = getNodes(n, mode, "'+tm[2]+'");';
                        }
                        q = q.replace(tm[0], "");
                    }else if(q.substr(0, 1) != '@'){
                        fn[fn.length] = 'n = getNodes(n, mode, "*");';
                    }
                }else{
                    if(tm){
                        if(tm[1] == "#"){
                            fn[fn.length] = 'n = byId(n, null, "'+tm[2]+'");';
                        }else{
                            fn[fn.length] = 'n = byTag(n, "'+tm[2]+'");';
                        }
                        q = q.replace(tm[0], "");
                    }
                }
                while(!(mm = q.match(modeRe))){
                    var matched = false;
                    for(var j = 0; j < tklen; j++){
                        var t = tk[j];
                        var m = q.match(t.re);
                        if(m){
                            fn[fn.length] = t.select.replace(tplRe, function(x, i){
                                                    return m[i];
                                                });
                            q = q.replace(m[0], "");
                            matched = true;
                            break;
                        }
                    }
                    // prevent infinite loop on bad selector
                    if(!matched){
                        throw 'Error parsing selector, parsing failed at "' + q + '"';
                    }
                }
                if(mm[1]){
                    fn[fn.length] = 'mode="'+mm[1]+'";';
                    q = q.replace(mm[1], "");
                }
            }
            fn[fn.length] = "return nodup(n);\n}";
            eval(fn.join(""));
            return f;
        },
        
        /**
         * Selects a group of elements.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @return {Array}
         */
        select : function(path, root, type){
            if(!root || root == document){
                root = document;
            }
            if(typeof root == "string"){
                root = document.getElementById(root);
            }
            var paths = path.split(",");
            var results = [];
            for(var i = 0, len = paths.length; i < len; i++){
                var p = paths[i].replace(trimRe, "$1");
                if(!cache[p]){
                    cache[p] = Ext.DomQuery.compile(p);
                    if(!cache[p]){
                        throw p + " is not a valid selector";
                    }
                }
                var result = cache[p](root);
                if(result && result != document){
                    results = results.concat(result);
                }
            }
            return results;
        },
        
        /**
         * Selects a single element.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @return {Element}
         */
        selectNode : function(path, root){
            return Ext.DomQuery.select(path, root)[0];
        },
        
        /**
         * Selects the value of a node, optionally replacing null with the defaultValue.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @param {String} defaultValue
         */
        selectValue : function(path, root, defaultValue){
            path = path.replace(trimRe, "$1");
            if(!valueCache[path]){
                valueCache[path] = Ext.DomQuery.compile(path, "select");
            }
            var n = valueCache[path](root);
            n = n[0] ? n[0] : n;
            var v = (n && n.firstChild ? n.firstChild.nodeValue : null);
            return (v === null ? defaultValue : v);
        },
        
        /**
         * Selects the value of a node, parsing integers and floats.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @param {Number} defaultValue
         * @return {Number}
         */
        selectNumber : function(path, root, defaultValue){
            var v = Ext.DomQuery.selectValue(path, root, defaultValue || 0);
            return parseFloat(v);
        },
        
        /**
         * Returns true if the passed element(s) match the passed simple selector (e.g. div.some-class or span:first-child)
         * @param {String/HTMLElement/Array} el An element id, element or array of elements
         * @param {String} selector The simple selector to test
         * @return {Boolean}
         */
        is : function(el, ss){
            if(typeof el == "string"){
                el = document.getElementById(el);
            }
            var isArray = (el instanceof Array);
            var result = Ext.DomQuery.filter(isArray ? el : [el], ss);
            return isArray ? (result.length == el.length) : (result.length > 0);
        },
        
        /**
         * Filters an array of elements to only include matches of a simple selector (e.g. div.some-class or span:first-child)
         * @param {Array} el An array of elements to filter
         * @param {String} selector The simple selector to test
         * @param {Boolean} nonMatches If true, it returns the elements that DON'T match 
         * the selector instead of the ones that match
         * @return {Array}
         */
        filter : function(els, ss, nonMatches){
            ss = ss.replace(trimRe, "$1");
            if(!simpleCache[ss]){
                simpleCache[ss] = Ext.DomQuery.compile(ss, "simple");
            }
            var result = simpleCache[ss](els);
            return nonMatches ? quickDiff(result, els) : result;
        },
        
        /**
         * Collection of matching regular expressions and code snippets. 
         */
        matchers : [{
                re: /^\.([\w-]+)/,
                select: 'n = byClassName(n, null, " {1} ");'
            }, {
                re: /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
                select: 'n = byPseudo(n, "{1}", "{2}");'
            },{
                re: /^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
                select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
            }, {
                re: /^#([\w-]+)/,
                select: 'n = byId(n, null, "{1}");'
            },{
                re: /^@([\w-]+)/,
                select: 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
            }
        ],
        
        /**
         * Collection of operator comparison functions. The default operators are =, !=, ^=, $=, *= and %=.
         * New operators can be added as long as the match the format <i>c</i>= where <i>c<i> is any character other than space, &gt; &lt;.
         */
        operators : {
            "=" : function(a, v){
                return a == v;
            },
            "!=" : function(a, v){
                return a != v;
            },
            "^=" : function(a, v){
                return a && a.substr(0, v.length) == v;
            },
            "$=" : function(a, v){
                return a && a.substr(a.length-v.length) == v;
            },
            "*=" : function(a, v){
                return a && a.indexOf(v) !== -1;
            },
            "%=" : function(a, v){
                return (a % v) == 0;
            }
        },
        
        /**
         * Collection of "pseudo class" processors. Each processor is passed the current nodeset (array)
         * and the argument (if any) supplied in the selector.
         */
        pseudos : {
            "first-child" : function(c){
                var r = [], n;
                for(var i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.previousSibling) && n.nodeType != 1);
                    if(!n){
                        r[r.length] = ci;
                    }
                }
                return r;
            },
            
            "last-child" : function(c){
                var r = [];
                for(var i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.nextSibling) && n.nodeType != 1);
                    if(!n){
                        r[r.length] = ci;
                    }
                }
                return r;
            },
            
            "nth-child" : function(c, a){
                var r = [];
                if(a != "odd" && a != "even"){
                    for(var i = 0, ci; ci = c[i]; i++){
                        var m = child(ci.parentNode, a);
                        if(m == ci){
                            r[r.length] = m;
                        }
                    }
                    return r;
                }
                var p;
                // first let's clean up the parent nodes
                for(var i = 0, l = c.length; i < l; i++){
                    var cp = c[i].parentNode;
                    if(cp != p){
                        clean(cp);
                        p = cp;
                    }
                }
                // then lets see if we match
                for(var i = 0, ci; ci = c[i]; i++){
                    var m = false;
                    if(a == "odd"){
                        m = ((ci.nodeIndex+1) % 2 == 1);
                    }else if(a == "even"){
                        m = ((ci.nodeIndex+1) % 2 == 0);
                    }
                    if(m){
                        r[r.length] = ci;
                    }
                }
                return r;
            },
            
            "only-child" : function(c){
                var r = [];
                for(var i = 0, ci; ci = c[i]; i++){
                    if(!prev(ci) && !next(ci)){
                        r[r.length] = ci;
                    }
                }
                return r;
            },
            
            "empty" : function(c){
                var r = [];
                for(var i = 0, ci; ci = c[i]; i++){
                    var cns = ci.childNodes, j = 0, cn, empty = true;
                    while(cn = cns[j]){
                        ++j;
                        if(cn.nodeType == 1 || cn.nodeType == 3){
                            empty = false;
                            break;
                        }
                    }
                    if(empty){
                        r[r.length] = ci;
                    }
                }
                return r;
            },
            
            "contains" : function(c, v){
                var r = [];
                for(var i = 0, ci; ci = c[i]; i++){
                    if(ci.innerHTML.indexOf(v) !== -1){
                        r[r.length] = ci;
                    }
                }
                return r;
            },

            "nodeValue" : function(c, v){
                var r = [];
                for(var i = 0, ci; ci = c[i]; i++){
                    if(ci.firstChild && ci.firstChild.nodeValue == v){
                        r[r.length] = ci;
                    }
                }
                return r;
            },

            "checked" : function(c){
                var r = [];
                for(var i = 0, ci; ci = c[i]; i++){
                    if(ci.checked == true){
                        r[r.length] = ci;
                    }
                }
                return r;
            },
            
            "not" : function(c, ss){
                return Ext.DomQuery.filter(c, ss, true);
            },
            
            "odd" : function(c){
                return this["nth-child"](c, "odd");
            },
            
            "even" : function(c){
                return this["nth-child"](c, "even");
            },
            
            "nth" : function(c, a){
                return c[a-1];
            },
            
            "first" : function(c){
                return c[0];
            },
            
            "last" : function(c){
                return c[c.length-1];
            },
            
            "has" : function(c, ss){
                var s = Ext.DomQuery.select;
                var r = [];
                for(var i = 0, ci; ci = c[i]; i++){
                    if(s(ss, ci).length > 0){
                        r[r.length] = ci;
                    }
                }
                return r;
            },
            
            "next" : function(c, ss){
                var is = Ext.DomQuery.is;
                var r = [];
                for(var i = 0, ci; ci = c[i]; i++){
                    var n = next(ci);
                    if(n && is(n, ss)){
                        r[r.length] = ci;
                    }
                }
                return r;
            },
            
            "prev" : function(c, ss){
                var is = Ext.DomQuery.is;
                var r = [];
                for(var i = 0, ci; ci = c[i]; i++){
                    var n = prev(ci);
                    if(n && is(n, ss)){
                        r[r.length] = ci;
                    }
                }
                return r;
            }
        }
    };
}();

Ext.query = Ext.DomQuery.select;


if (typeof Y2 == "undefined") {
    var Y2 = {};
}
Y2.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a .length; i=i+1) {
        d=a[i].split(".");
        o=window;
        for (j=0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }
    return o;
};

Y2.namespace( 'Y2.util' );
Y2.util.Dom = (function(){
	if( !YAHOO || !YAHOO.util.Dom )
		throw new Error( 'Please include both YAHOO and YAHOO.util.Dom first.' );

	var d = YAHOO.util.Dom;
	var adapter;
	if( typeof jDomQuery != 'undefined' ) adapter = jDomQuery;
	else if( typeof jQuery != 'undefined' ) adapter = jQuery;
	else if( typeof Ext.DomQuery != 'undefined' ) adapter = Ext.DomQuery.select;
	else throw new Error( 'Please include the source code for a DOM Querying Engine.' );

	function select( el, contextNode )
	{
		if( !YAHOO.lang.isString( el ) )
			return el;
		return contextNode ? adapter( el, contextNode ) : adapter( el );
	}

    /* argumentLength is 1 based */
	function selector( func, args, hasContextNode, bIsSingle )
	{
        var newargs = [];
		var selector = hasContextNode ? select( args[ 0 ], args[ 1 ] ) : select( args[ 0 ] );
		if( bIsSingle ) newargs.push( selector[ 0 ] );
		else newargs.push( selector );

        for( var j = hasContextNode ? 2 : 1, k=args.length; j<k; j++ )
            newargs.push(args[j]);

        return func.apply( null, newargs );
	}

    function selectorDouble( func, args, hasFirstContextNode, hasSecondContextNode, bIsSingle )
    {
        var newargs = [];
		var selector = hasFirstContextNode ? select( args[ 0 ], args[ 1 ] ) : select( args[ 0 ] );
		if( bIsSingle ) newargs.push( selector[ 0 ] );
		else newargs.push( selector );

        if( hasFirstContextNode && hasSecondContextNode )   selector = select( args[2], args[3] );
        else if( hasSecondContextNode )                     selector = select( args[1], args[2] );
        else if( hasFirstContextNode )                      selector = select( args[2] );
        else                                                selector = select( args[1] );

        if( bIsSingle ) newargs.push( selector[0] );
		else newargs.push( selector );

        return func.apply( null, newargs );
    }

	return {
		addClassAll: function() { return selector( d.addClass, arguments, arguments.length >= 3 ); },
		addClass: function() { return selector( d.addClass, arguments, arguments.length >= 3, true ); },
		removeClassAll: function() { return selector( d.removeClass, arguments, arguments.length >= 3 ); },
		removeClass: function() { return selector( d.removeClass, arguments, arguments.length >= 3, true ); },
		replaceClassAll: function() { return selector( d.replaceClass, arguments, arguments.length >= 4 ); },
		replaceClass: function() { return selector( d.replaceClass, arguments, arguments.length >= 4, true ); },
		hasClassAll: function() { return selector( d.hasClass, arguments, arguments.length >= 3 ); },
		hasClass: function() { return selector( d.hasClass, arguments, arguments.length >= 3, true ); },
		batchAll: function() { return selector( d.batch, arguments, !YAHOO.lang.isFunction( arguments[ 1 ] ) && arguments.length >= 3 ); },
		batch: function() { return selector( d.batch, arguments, !YAHOO.lang.isFunction( arguments[ 1 ] ) && arguments.length >= 3, true ); },
		generateIdAll: function() { return selector( d.generateId, arguments, !YAHOO.lang.isString(arguments[1]) && arguments.length >= 2 ); },
		generateId: function() { return selector( d.generateId, arguments, !YAHOO.lang.isString(arguments[1]) && arguments.length >= 2, true ); },
		getAll: function() { return selector( d.get, arguments, arguments.length >= 2 ); },
		get: function() { return selector( d.get, arguments, arguments.length >= 2, true ); },
        getChildren: function() { return selector( d.getChildren, arguments, arguments.length >= 2, true ); },
        getChildrenBy: function() { return selector( d.getChildrenBy, arguments, arguments.length >= 3, true ); },
        getAncestorBy: function() { return selector( d.getAncestorBy, arguments, arguments.length >= 3, true ); },
        getAncestorByClassName: function() { return selector( d.getAncestorByClassName, arguments, arguments.length >= 3, true ); },
		getAncestorByTagName: function() { return selector( d.getAncestorByTagName, arguments, arguments.length >= 3, true ); },
        getFirstChild: function() { return selector( d.getFirstChild, arguments, arguments.length >= 2, true ); }, // :first
        getFirstChildBy: function() { return selector( d.getFirstChildBy, arguments, arguments.length >= 3, true ); },
        getLastChild: function() { return selector( d.getLastChild, arguments, arguments.length >= 2, true ); }, // :last
        getLastChildBy: function() { return selector( d.getLastChildBy, arguments, arguments.length >= 3, true ); },
        getNextSibling: function() { return selector( d.getNextSibling, arguments, arguments.length >= 2, true ); },
        getNextSiblingBy: function() { return selector( d.getNextSiblingBy, arguments, arguments.length >= 3, true ); },
        getPreviousSibling: function() { return selector( d.getPreviousSibling, arguments, arguments.length >= 2, true ); },
        getPreviousSiblingBy: function() { return selector( d.getPreviousSiblingBy, arguments, arguments.length >= 3, true ); },
        getRegionAll: function() { return selector( d.getRegion, arguments, arguments.length >= 2 ); },
        getRegion: function() { return selector( d.getRegion, arguments, arguments.length >= 2, true ); },
        getStyle: function() { return selector( d.getStyle, arguments, arguments.length >= 3, true ); },
        getStyleAll: function() { return selector( d.getStyle, arguments, arguments.length >= 3 ); },
        getXAll: function() { return selector( d.getX, arguments, arguments.length >= 2 ); },
        getX: function() { return selector( d.getX, arguments, arguments.length >= 2, true ); },
        getYAll: function() { return selector( d.getY, arguments, arguments.length >= 2 ); },
        getY: function() { return selector( d.getY, arguments, arguments.length >= 2, true ); },
        getXYAll: function() { return selector( d.getXY, arguments, arguments.length >= 2 ); },
        getXY: function() { return selector( d.getXY, arguments, arguments.length >= 2, true ); },
        inDocument: function() { return selector( d.inDocument, arguments, arguments.length >= 2, true ); },
		insertAfter: function() { return selectorDouble( d.insertAfter, arguments, !YAHOO.lang.isString( arguments[1] ) && arguments.length >= 3, !YAHOO.lang.isString( arguments[arguments.length-1] ) && arguments.length >= 3, true ); },
		insertBefore: function() { return selectorDouble( d.insertBefore, arguments, !YAHOO.lang.isString( arguments[1] ) && arguments.length >= 3, !YAHOO.lang.isString( arguments[arguments.length-1] ) && arguments.length >= 3, true ); },
		isAncestor: function() { return selectorDouble( d.isAncestor, arguments, !YAHOO.lang.isString( arguments[1] ) && arguments.length >= 3, !YAHOO.lang.isString( arguments[arguments.length-1] ) && arguments.length >= 3, true ); },
        setStyle: function() { return selector( d.setStyle, arguments, arguments.length >= 4, true ); },
        setStyleAll: function() { return selector( d.setStyle, arguments, arguments.length >= 4 ); },
        setX: function() { return selector( d.setX, arguments, arguments.length >= 3, true ); },
        setXAll: function() { return selector( d.setX, arguments, arguments.length >= 3 ); },
        setY: function() { return selector( d.setY, arguments, arguments.length >= 3, true ); },
        setYAll: function() { return selector( d.setY, arguments, arguments.length >= 3 ); },
        setXY: function() { return selector( d.setXY, arguments, !YAHOO.lang.isArray(arguments[1]) && arguments.length >= 3, true ); },
        setXYAll: function() { return selector( d.setXY, arguments, !YAHOO.lang.isArray(arguments[1]) && arguments.length >= 3 ); },
	}
})();

