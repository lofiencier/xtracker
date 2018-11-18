import React, {Component} from 'react';
import xpath from 'xpath';
// let select =
// xpath.useNamespaces({'publish':'http://localhost:8080/publish/'}); import
// {selector} from './select'
import {select, getMultiSelector, getQuerySelector, optimize} from 'optimal-select'

export default class Tracker extends Component {
  constructor() {
    super();

  }
  componentDidMount() {
    document
      .documentElement
      .addEventListener('click', e => {
        if (!e.ctrlKey) {
          e.preventDefault();
          e.stopPropagation();
          console.log(e.target);
          console.log(this.EtoX(e.target));
          console.log(this.x_(this.EtoX(e.target)));
          // console.log(e.target);
          // console.log("SELECT:", select(e.target));
          // console.log("MULTI:", getMultiSelector([e.target]));
          // console.log('QUERY:',getQuerySelector(`.category-list li:nth-of-type(3)
          // label`))
          return null;
        }
      })
    // console.log(xpath.evaluate(`//*[@id="app"]`,document)); console.log();
  }
  EtoX(element) {
    const idx = (sib, name) => sib
      ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name)
      : 1;
    const segs = elm => !elm || elm.nodeType !== 1
      ? ['']
      : elm.id && document.querySelector(`#${elm.id}`) === elm
        ? [`id("${elm.id}")`]
        : [
          ...segs(elm.parentNode),
          `${elm
            .localName
            .toLowerCase()}[${idx(elm)}]`
        ];
    return segs(element).join('/');
  }
  x_(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
      xnodes.push(xres);
    }
    return xnodes;
  }
  XtoE(path) {
    return (new XPathEvaluator())
      .evaluate(path, document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue;
  }

  addListener() {}

  render() {
    return <i></i>
  }
}