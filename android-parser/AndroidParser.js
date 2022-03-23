import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
// import * as xml2js from 'https://unpkg.com/xml2js@0.4.9/lib/xml2js.js';
const { download } = ham;

export const selectorCollector = async (url = './index.html', selectorNames = ['resource-id'], docType = 'xml') => {
  if (!Orders[order]) return console.error('Order parameter invalid');

  const mimeType = docType === 'xml' ? 'application/xml' : 'text/html';
  const selectors = new Map();
  const req = await fetch(url);
  const resp = await req.text();

  const dom = new DOMParser().parseFromString(resp, mimeType).documentElement;
  const body = dom.children[1];

  walk(body, node => {
    let classes = [...node.classList];
    let id = node.id;

    if (classes) { selectors.set(...classes.map((cl, i) => `.${ cl }`), '{}'); }
    if (id) { selectors.set(`#${ id }`, '{}'); }
  });

  const selectorText = [...selectors]
    .reduce((acc, [k, v], i) => `${ acc }\n${ k } ${ v }\n`, '')
    .replace(/{} undefined/g, '')
    .trim();

  download('style.css', selectorText);
  return selectorText;
};

export class AndroidParser {
  static parse(xmlString, type = 'application/xml') {
    const doc = new DOMParser().parseFromString(xmlString, type).documentElement;
    return doc.querySelector('parsererror') ? null : doc;
  }

  static createObjectGraph(xmlDocument) {
    const doc = xmlDocument.nodeType === 9 ? xmlDocument.documentElement : xmlDocument;
    const h = { name: doc.nodeName };
    h.content = Array.from(doc.childNodes || []).filter(e => e.nodeType === 3).map(e => e.textContent).join('').trim();
    h.attributes = Array.from(doc.attributes || []).filter(a => a).reduce((h, a) => { h[a.name.replace(/\.|\-/g, '')] = a.value; return h; }, {});
    h.children = Array.from(doc.childNodes || []).filter(e => e.nodeType === 1).map(c => h[c.nodeName.replace(/\.|\-/g, '')] = xml2json(c));

    return h;
  }

  static graphFromString(xmlString = '') {
    const g = this.createObjectGraph(this.parse(xmlString));
    console.log('g', g);
    return g
  }

  static graphFromDocument(xmlDocument = '') {
    const g = this.createObjectGraph(xmlDocument);
    return g
  }
}


