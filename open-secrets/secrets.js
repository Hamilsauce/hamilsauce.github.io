//  sample queryString: `https://www.opensecrets.org/api/?method=candIndustry&cid=N00007360&cycle=2020&apikey=__apikey__`
let store = {};

const query = {
  baseUrl: 'https://www.opensecrets.org/api/',
  method: 'candIndustry',
  cid: 'N00007360',
  cycle: '2020',
  apikey: 'f7f0d2ef3a3a39bf0816523af406df39',
  output: 'json',
  constructString() {
    const qstring = `${this.baseUrl}?method=${this.method}&cid=${this.cid}&cycle=${this.cycle}&apikey=${this.apikey}&output=${this.output}`;
    return qstring;
    1
  }
}

const fetchCands = (url) => {
  fetch(url)
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

fetchCands(query.constructString());

const assembleDisplay = (cand, inds) => {
  const container = document.querySelector('.ind-container')
  const candDisplay = document.querySelector('.candidate-display')
createCandHeader(cand, candDisplay)
  inds.forEach((ind, index) => {
    append(createListCard(ind, index), container);
  })



}
const createCandHeader = (cand, parent) => {
  const candHeader = document.createElement('h2');
  addClass(candHeader, 'cand-header')
  candHeader.appendChild(document.createTextNode(cand));
  append(candHeader, parent);


  const yearHeader = document.createElement('p');
  addClass(yearHeader, 'year-header')
  yearHeader.appendChild(document.createTextNode(`2020`));
  append(yearHeader, parent);

}
const createListCard = (ind, index) => {
  // const indContainer = generateNewEl('div', 'industry-container', index)
  const indCard = document.createElement('div');
  addClass(indCard, 'ind-list-card')
  addIndex(indCard, index)

  append(createIndustryName(ind, index), indCard)
  append(createList(ind, index), indCard)
  return indCard;

}
const createIndustryName = (ind, index) => {
  // const name = generateNewEl('h3', 'candidate-header')
  const name = document.createElement('button');
  addClass(name, 'ind-name')
  addClass(name, 'collapsible')
  addIndex(name, index)

  name.appendChild(document.createTextNode(ind.industry_name));
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
        // const li = this.generateNewEl('li', 'industry-item');
        const keyDiv = document.createElement('div');
        addClass(keyDiv, 'list-key')
        append(document.createTextNode(`${key}:`), keyDiv);
        append(keyDiv, li);

        const valDiv = document.createElement('div');
        addClass(valDiv, 'list-value')
        append(document.createTextNode(`$${Number(val).toLocaleString()}`), valDiv);
        append(valDiv, li);

        // const text = `${key}:    $${Number(val).toLocaleString()}`
        // append(document.createTextNode(text), li);
        append(li, list);
      }
    });
  append(list, indContent)
  return indContent;
}

/*
<div class="industry-name ${industry name}" data-index="index"></div> 

<ul class = "industry-details-list" data - index = "index" >
  <li class="industryItem pac"></li> 
  <li class = "industryItem indivs"> </li> 
  <li class = "industryItem total"> </li>
</ul>
*/



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
const generateNewEl = (tag, className = "", index = "") => {
  const newEl = document.createElement(tag);
  if (className === "") {
    continue
  } else {
    addClass(newEl, className);
  }
  if (Index = "") {
    continue
  } else {
    addIndex(newEl, className);
  }
  return newEl;
}