
export class Model {
  constructor({ children, key, type }) {
    this.children = children || [];
    this.key = key || '';
    this.type = type || 'Model';
  }
}

export class DocumentModel extends Model { constructor(children, name) { super({ children, name, type: 'Document' }); } }

export class NodeModel extends Model {
  constructor({ children, key, attributes, value, parent, depth }) {
    super({ children, key, type: 'Node' });
    this.attributes = attributes;
    this.value = value;
    this.parent = parent;
    this.depth = depth;
  }
}

/* --- BUILDER --- */

export class AndroidParser2 {
  constructor() {
    this.TYPES = { xml: "application/xml" };
    this.documents = new Map();
    this.parser = new DOMParser();

  }

  createDocument(xmlString, name = '') {
    const doc = this.parser.parseFromString(xmlString, this.TYPES.xml);
    if (doc == null) return null;
    return this.documents.set(name, doc.documentElement).get(name);
  }

  parse(xmlString, type) {
    const doc = this.parser.parseFromString(xmlString, this.TYPES.xml);
    return doc.querySelector('parsererror') ?
      null : doc; //.documentElement;
  }

  getDocument(name = '') { return this.documents.has(name) ? this.documents.get(name) : null; }

  buildChordModel(doc, parent) {
    const chordModel = {
      type: 'chordModel',
      chords: [...doc.children]
        .reduce((chords, chord, i) => [
          ...chords,
          {
            type: chord.tagName,
            element: chord,
            ...[...chord.attributes].reduce((attrs, attr, i) => ({ ...attrs, [attr.name]: attr.value }), {}),
            children: [...chord.children]
              .reduce((strings, string, i) => [
                ...strings,
                {
                  element: string,
                  ...[...string.attributes]
                    .reduce((stringAttrs, stringAttr) => ({
                      ...stringAttrs,
                      [stringAttr.name]: stringAttr.value
                    }), {}),
                }
              ], []),
          }
        ], [])
    };
    return chordModel;
  }

  createNodeModel(opt = {}) {
    return new NodeModel({
      // key: opt.key || null,
      parent: opt.parentElement || null,
      children: opt.children ? [...opt.children] : [],
      // depth: opt.depth || 0,
      attributes: opt.attributes || {},
    });
  }

  traverse(node, callback) {
    callback(node);
    if (node.children.length > 0) {
      [...node.children].forEach((child) => {
        this.traverse(child, callback);
      });
    }
  }

  render(doc) {
    let app = this.createNodeModel(doc);
    console.log('app', app);
    this.traverse(doc, (node) => {
      let temp = this.createNodeModel({ ...node });
      // if (temp.children) {

      // }
      app.children.push(temp);
    });
    return app;
    // targetElement.appendChild(containerEl);
  }

  walkTheDOM(node, func) {
    func(node);
    node = node.firstElementChild;
    while (node) {
      this.walkTheDOM(node, func);
      node = node.nextElementSibling;
    }
  }

  checkParseStatus(doc) {
    const errorNode = doc.querySelector('parsererror');
    if (errorNode) {
      console.error("error while parsing");
    } else {
      // console.log(doc.documentElement.nodeName);
    }
  }
  attach(doc, parent) { }
}

const xmlPath = '';
const req = await fetch('/.dev/screen-resources/transaction-history/trans-history-screen.xml');
const xmlSerial = await req.text();


const xml2json = xml => {
  var el = xml.nodeType === 9 ? xml.documentElement : xml;
  var h = { name: el.nodeName };
  h.content = Array.from(el.childNodes || []).filter(e => e.nodeType === 3).map(e => e.textContent).join('').trim();
  h.attributes = Array.from(el.attributes || []).filter(a => a).reduce((h, a) => { h[a.name.replace(/\.|\-/g, '')] = a.value; return h; }, {});
  h.children = Array.from(el.childNodes || []).filter(e => e.nodeType === 1).map(c => h[c.nodeName.replace(/\.|\-/g, '')] = xml2json(c));

  return h;
};
const app = document.querySelector('.app');
const androidParser = new AndroidParser2();
const docu = androidParser.createDocument(xmlSerial, 'android');
const andy = xml2json(docu);
const pandy = await JSON.stringify(andy, null, 3);

console.log('pandy', andy);
