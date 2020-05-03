//  sample queryString: `https://www.opensecrets.org/api/?method=candIndustry&cid=N00007360&cycle=2020&apikey=__apikey__`
import { searchInput, createSearch } from './search.js'
let store = {};

const query = {
  baseUrl: 'https://www.opensecrets.org/api/',
  method: 'candIndustry',
  cid: 'N00007360',
  cycle: '2020',
  apikey: 'f7f0d2ef3a3a39bf0816523af406df39',
  output: 'json',
  constructString() {
    this.cid = searchInput;
    const qstring = `${this.baseUrl}?method=${this.method}&cid=${this.cid}&cycle=${this.cycle}&apikey=${this.apikey}&output=${this.output}`;
    return qstring;
  }
}

createSearch();

export const fetchCands = () => {
  
  fetch(query.constructString())
    .then(res => res.json())
    .then(result => {
      const data = result.response.industries;
      const cand = Object.values(data)[0].cand_name;
      const inds = extractInds(Object.values(data)[1])

      console.log(cand, inds);

      assembleDisplay(cand, inds)
    })
}
const extractInds = inds => {
  const fixedInds = inds
    .map(ind => {
      return Object.values(ind)[0]
    });
  return fixedInds;
}

// fetchCands(query.constructString());

const assembleDisplay = (cand, inds) => {
 document.querySelector('.content').classList.add('out');
 setTimeout(() => {
 document.querySelector('.content').classList.remove('out');
 }, 1000)
  const container = document.querySelector('.ind-container')
  container.innerHTML = '';
  const candDisplay = document.querySelector('.candidate-display')
  candDisplay.innerHTML = '';
  createCandHeader(cand, candDisplay)
  inds.forEach((ind, index) => {
    append(createListCard(ind, index), container);
  })
}
const createCandHeader = (cand, parent) => {
  const candHeader = document.createElement('h1');
  addClass(candHeader, 'cand-header')
  candHeader.appendChild(document.createTextNode(cand));
  append(candHeader, parent);

  const yearHeader = document.createElement('h3');
  addClass(yearHeader, 'year-header')
  yearHeader.appendChild(document.createTextNode(`2020`));
  append(yearHeader, parent);
}

const createListCard = (ind, index) => {
  const indCard = document.createElement('div');
  addClass(indCard, 'ind-list-card')
  addIndex(indCard, index)

  append(createIndustryName(ind, index), indCard)
  append(createList(ind, index), indCard)

  return indCard;
}

const createIndustryName = (ind, index) => {
  const name = document.createElement('button');
  addClass(name, 'ind-name')
  addClass(name, 'collapsible')
  addIndex(name, index)

  name.appendChild(document.createTextNode(ind.industry_name));
  name.addEventListener('click', e => {
  	let coll = e.target
  	console.log('clixk');
  	coll.classList.toggle("active");
  	var content = coll.nextElementSibling;
  	if (content.style.maxHeight) {
  	  content.style.maxHeight = null;
  	} else {
  	  content.style.maxHeight = content.scrollHeight + "px";
  	}
  })

  return name
}

const createList = (ind) => {
  const keepList = ['indivs', 'pacs', 'total']

  const indContent = document.createElement('div');
  addClass(indContent, 'ind-content')
  const list = document.createElement('ul');
  addClass(list, 'ind-list')

  Object.entries(ind)
    .forEach(([key, val]) => {
      if (keepList.includes(key)) {
        if (key === 'indivs') key = 'Individuals'
        if (key === 'pacs') key = 'PACs'
        const li = document.createElement('li');
        addClass(li, 'ind-item')

        const keyDiv = document.createElement('div');
        addClass(keyDiv, 'list-key')
        append(document.createTextNode(`${key}:`), keyDiv);
        append(keyDiv, li);

        const valDiv = document.createElement('div');
        addClass(valDiv, 'list-value')
        append(document.createTextNode(`$${Number(val).toLocaleString()}`), valDiv);
        append(valDiv, li);
        append(li, list);
      }
    });
  append(list, indContent)
  return indContent;
}

const collapse = (e) => {
  let coll = e.target
  console.log('clixk');
  coll.classList.toggle("active");
  var content = coll.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

document.querySelector('.app').addEventListener('newQuery', e => {
  console.log('heard new qyery');
  fetchCands(query.constructString())
})

//  UTILS
const append = (newChild, newParent) => {
  newParent.appendChild(newChild);
}
const addClass = (el, className) => {
  el.classList.add(className)
}
const removeClass = (el, className) => {
  el.classList.remove(className)
}
const addIndex = (el, index) => {
  el.dataset.index = index + 1;
}
// const generateNewEl = (tag, className = "", index = "") => {
//   const newEl = document.createElement(tag);
//   if (className === "") {
//     continue
//   } else {
//     addClass(newEl, className);
//   }
//   if (Index = "") {
//     continue
//   } else {
//     addIndex(newEl, className);
//   }
//   return newEl;
fetchCands()

{ fetchCands }