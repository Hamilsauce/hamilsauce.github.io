import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import { AndroidParser } from "./AndroidParser.js";

const form = document.querySelector('#parserForm');
const attributeInput = document.querySelector('#attributeInput');
const xmlTextArea = document.querySelector('#xmlTextArea');
const errorMsg = document.querySelector('#errorMsg');

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};


const cache = {};

const parseIt = (xml, selector) => {
  const xmlDoc = AndroidParser.parse(xml);
  console.log({xmlDoc});

  if (!xmlDoc) return errorMsg.classList.add('hasError');
  else errorMsg.classList.remove('hasError');

  const xmlNodes = [...xmlDoc.querySelectorAll('*')];
  return xmlNodes.filter(_ => _.attributes[selector])
    .reduce((dict, el) => {
      if (!el.attributes[selector]) return;

      let selected;
      if (selector === 'resource-id') {
        selected = el.attributes.getNamedItem('resource-id').value.replace('com.leaguestock.android:id/', '');
      }
      return {
        ...dict, [toCamel(selected)]: 'id=' + selected
      };
    }, {});
};

form.addEventListener('submit', async e => {
  e.preventDefault();

  if (xmlTextArea.value) {
    const filename = `android-parser-selector-map.json`;
    const selector = attributeInput.value;

    cache.xml = xmlTextArea.value;
    const dict = parseIt(xmlTextArea.value, selector);
    console.log({dict});
    if (dict) {

      let output = JSON.stringify(dict, null, 2).replace(/: "/g, ": '");
      output = output.replace(/",/g, "',");
      output = output.replace(/"\n/g, "'\n");
      output = output.replace(/"/g, '');
      xmlTextArea.value = output;
    }

    return;
  }
});