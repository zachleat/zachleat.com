/*! zachleat.com - v2.6.1 - 2022-12-22
* Copyright (c) 2022 Zach Leatherman; @license MIT License */
// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-588046-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();

class FilterContainer extends HTMLElement {
  constructor() {
    super();
    this.attrs = {
      oninit: "oninit",
      valueDelimiter: "delimiter",
      leaveUrlAlone: "leave-url-alone",
      mode: "filter-mode",
      bind: "data-filter-key",
      results: "data-filter-results",
      resultsExclude: "data-filter-results-exclude",
    };
    this.classes = {
      enhanced: "filter-container--js",
      hidden: "filter--hide",
    }
  }

  connectedCallback() {
    this.init();
  }

  init() {
    this._lookedFor = {};

    this.classList.add(this.classes.enhanced);

    this.bindEvents(this.formElements);

    if(this.hasAttribute(this.attrs.oninit)) {
      // This timeout was necessary to fix a bug with Google Chrome 93
      // Navigate to a filterable page, navigate away, use the back button to return
      // (connectedCallback would filter before the DOM was ready)
      window.setTimeout(() => {
        for(let key in this.formElements) {
          this.initFormElements(this.formElements[key]);
          this.applyFilterForKey(key);
          this.renderResultCount(true);
        }
      }, 0);
    }
  }

  get valueDelimiter() {
    if(!this._valueDelimiter) {
      this._valueDelimiter = this.getAttribute(this.attrs.valueDelimiter) || ",";
    }

    return this._valueDelimiter;
  }

  get formElements() {
    if(!this._lookedFor.formElements) {
      let selector = `:scope [${this.attrs.bind}]`;
      let results = {};
      for(let node of this.querySelectorAll(selector)) {
        let attr = node.getAttribute(this.attrs.bind);
        if(!results[attr]) {
          results[attr] = [];
        }
        results[attr].push(node);
      }
      this._formElements = results;
      this._lookedFor.formElements = true;
    }

    return this._formElements;
  }

  getAllKeys() {
    return Object.keys(this.formElements);
  }
  
  getElementSelector(key) {
    return `data-filter-${key}`
  }

  getKeyFromAttributeName(attributeName) {
    return attributeName.substr("data-filter-".length);
  }

  getFilterMode(key) {
    if(!this.modes) {
      this.modes = {};
    }
    if(!this.modes[key]) {
      this.modes[key] = this.getAttribute(`${this.attrs.mode}-${key}`);
    }
    if(!this.modes[key]) {
      if(!this.globalMode) {
        this.globalMode = this.getAttribute(this.attrs.mode);
      }
      return this.globalMode;
    }

    return this.modes[key];
  }

  bindEvents() {
    this.addEventListener("input", e => {
      let closest = e.target.closest(`[${this.attrs.bind}]`);
      if(closest) {
        this.applyFilterForElement(closest);
        requestAnimationFrame(() => {
          this.renderResultCount();
        });
      }
    }, false);
  }

  initFormElements(formElements) {
    for(let el of formElements) {
      let urlParamValues = this.getUrlFilterValues(el);
      for(let value of urlParamValues) {
        let type = el.getAttribute("type");
        if(el.tagName === "INPUT" && (type === "checkbox" || type === "radio")) {
          if(el.value === value) {
            el.checked = true;
          }
        } else {
          el.value = value;
        }
      }
    }
  }

  getFormElementKey(formElement) {
    return formElement.getAttribute(this.attrs.bind);
  }

  _getMap(key) {
    let values = [];
    for(let formElement of this.formElements[key]) {
      let type = formElement.getAttribute("type");
      if(formElement.tagName === "INPUT" && (type === "checkbox" || type === "radio")) {
        if(formElement.checked) {
          values.push(formElement.value);
        }
      } else {
        values.push(formElement.value);
      }
    }

    if(!this.hasAttribute(this.attrs.leaveUrlAlone)) {
      this.updateUrl(key, values);
    }

    let elementsSelectorAttr = this.getElementSelector(key);
    let selector = `:scope [${elementsSelectorAttr}]`;
    let elements = this.querySelectorAll(selector);

    let map = new Map();
    for(let element of Array.from(elements)) {
      let isValid = this.elementIsValid(element, elementsSelectorAttr, values);
      map.set(element, isValid)
    }
    return map;
  }

  _applyMapForKey(key, map) {
    if(!key) {
      return;
    }

    for(let [element, isVisible] of map) {
      let cls = `filter-${key}--hide`;
      if(isVisible) {
        element.classList.remove(cls);
      } else {
        element.classList.add(cls);
      }
    }
  }

  applyFilterForElement(formElement) {
    let key = this.getFormElementKey(formElement);
    this.applyFilterForKey(key);
  }

  applyFilterForKey(key) {
    let firstFormElementForDelimiter = this.formElements[key][0];
    if(!firstFormElementForDelimiter) {
      return;
    }
    let map = this._getMap(key);
    this._applyMapForKey(key, map);
  }

  _hasValue(needle, haystack = [], mode = "any") {
    if(!haystack || !haystack.length || !Array.isArray(haystack)) {
      return false;
    }

    if(!Array.isArray(needle)) {
      needle = [needle];
    }

    // all must match
    if(mode === "all") {
      let found = true;
      for(let lookingFor of haystack) {
        if(!needle.some((val) => val === lookingFor)) {
          found = false;
        }
      }
      return found;
    }

    for(let lookingFor of needle) {
      // has any, return true
      if(haystack.some((val) => val === lookingFor)) {
        return true;
      }
    }
    return false;
  }

  elementIsValid(element, attributeName, values) {
    let hasAttr = element.hasAttribute(attributeName);
    if(hasAttr && (!values.length || !values.join(""))) { // [] or [''] for value="" radio
      return true;
    }
    let haystack = (element.getAttribute(attributeName) || "").split(this.valueDelimiter);
    let key = this.getKeyFromAttributeName(attributeName);
    let mode = this.getFilterMode(key);
    if(hasAttr && this._hasValue(haystack, values, mode)) {
      return true;
    }
    return false;
  }

  /*
   * Feature: Result count
   */

  get resultsCounter() {
    if(!this._lookedFor.resultsCounter) {
      this._results = this.querySelector(`:scope [${this.attrs.results}]`);
      this._lookedFor.resultsCounter = true;
    }

    return this._results;
  }

  getGlobalCount() {
    let keys = this.getAllKeys();
    let selector = keys.map(key => {
      return `:scope [${this.getElementSelector(key)}]`;
    }).join(",");
    let elements = this.querySelectorAll(selector);

    return Array.from(elements)
      .filter(entry => this.elementIsVisible(entry))
      .filter(entry => !this.elementIsExcluded(entry))
      .length;
  }

  elementIsVisible(element) {
    for(let cls of element.classList) {
      if(cls.startsWith("filter-") && cls.endsWith("--hide")) {
        return false;
      }
    }
    return true;
  }

  elementIsExcluded(element) {
    return element.hasAttribute(this.attrs.resultsExclude);
  }

  getLabels() {
    if(this.resultsCounter) {
      let attrValue = this.resultsCounter.getAttribute(this.attrs.results);
      let split = attrValue.split("/");
      if(split.length === 2) {
        return split;
      }
    }
    return ["Result", "Results"];
  }

  _renderResultCount(count) {
    if(!this.resultsCounter) {
      return;
    }
    if(!count) {
      count = this.getGlobalCount();
    }

    let labels = this.getLabels();
    this.resultsCounter.innerText = `${count} ${count !== 1 ? labels[1] : labels[0]}`;
  }

  renderResultCount(isOnload = false) {
    if(!this.resultsCounter) {
      return;
    }

    if(!isOnload && this.resultsCounter.hasAttribute("aria-live")) {
      // This timeout helped VoiceOver
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this._renderResultCount()
      }, 250);
    } else {
      this._renderResultCount();
    }
  }

  /*
   * Feature: Work with URLs
   */

  getUrlSearchValue() {
    let s = window.location.search;
    if(s.startsWith("?")) {
      return s.substr(1);
    }
    return s;
  }

  getUrlFilterValues(formElement) {
    let params = new URLSearchParams(this.getUrlSearchValue());
    let key = this.getFormElementKey(formElement);
    return params.getAll(key);
  }

  // Future improvement: url updates currently once per key (we could group these into one)
  updateUrl(key, values) {
    let params = new URLSearchParams(this.getUrlSearchValue());
    let keyParamsStr = params.getAll(key).sort().join(",");
    let valuesStr = values.slice().sort().join(",");

    if(keyParamsStr !== valuesStr) {
      params.delete(key);
      for(let value of values) {
        if(value) { // ignore ""
          params.append(key, value);
        }
      }

      let baseUrl = window.location.pathname;
      history.replaceState({}, '', `${baseUrl}${params.toString().length > 0 ? `?${params}`: ""}` );
    }
  }
}

if("customElements" in window) {
  window.customElements.define("filter-container", FilterContainer);
}