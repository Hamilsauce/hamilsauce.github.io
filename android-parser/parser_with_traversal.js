import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { download } = ham;

const walker = (el, fn) => {
  fn(el);
  el = el.firstElementChild;
  while (el) {
    walk(el, fn);
    el = el.nextElementSibling;
  }
};

export const traverse = async (url = './index.html', selectorNames = ['resource-id'], docType = 'xml') => {
  if (!Orders[order]) return console.error('Order parameter invalid');

  const mimeType = docType === 'xml' ? 'application/xml' : 'text/html';

  const selectors = new Map();
  const req = await fetch(url);
  const resp = await req.text();

  const dom = new DOMParser().parseFromString(resp, mimeType).documentElement;
  const body = dom.children[1];

  walker(body, node => {
    let classes = [...node.classList];
    let id = node.id;

    if (classes) { selectors.set(...classes.map((cl, i) => `.${ cl }`), '{}'); }
    if (id) { selectors.set(`#${ id }`, '{}'); }
  });

  const selectorText = [...selectors]
    .reduce((acc, [k, v], i) => `${ acc }\n${ k } ${ v }\n`, '')
    .replace(/{} undefined/g, '')
    .trim();

  // const selectorText2 = selectorText1.replace(/{} undefined/g, '')
  // const selectorText3 = selectorText2.trim()

  download('style.css', selectorText);
  return selectorText;
};



function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

const walk = (el, fn) => {
  fn(el);
  el = el.firstElementChild;
  while (el) {
    walk(el, fn);
    el = el.nextElementSibling;
  }
};

const Orders = {
  chron: 'chron',
  alpha: 'alpha',
  attr: 'attr',
  log: () => console.log(this),
};

export const traverse2 = async (url = './index.html', order = Orders.chron) => {
  if (!Orders[order]) return console.error('Order parameter invalid');

  const selectors = new Map();
  const req = await fetch(url);
  const resp = await req.text();
  const dom = new DOMParser().parseFromString(resp, 'text/html').documentElement;
  const body = dom.children[1];


  walk(body, node => {
    let classes = [...node.classList];
    let id = node.id;
    if (classes) { selectors.set(...classes.map((cl, i) => `.${ cl }`), '{}'); }
    if (id) { selectors.set(`#${ id }`, '{}'); }
  });

  switch (Orders[order]) {
    case 'chron':
      console.log('chron');
      // code
      break;

    case 'alpha':
      // code
      console.log('alpha');
      break;

    case 'attr':
      // code
      break;
  }

  if (Orders[order]) { }


  const selectorText1 = [...selectors].reduce((acc, [k, v], i) => {
    return `${ acc }\n${ k } ${ v }\n`;
  }, '');

  const selectorText2 = selectorText1.replace(/{} undefined/g, '');
  const selectorText3 = selectorText2.trim();

  download('style.css', selectorText3);
  return selectorText3;
};