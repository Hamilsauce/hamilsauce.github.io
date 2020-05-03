import {fetchCands} from './secrets.js'

export let searchInput = 'N00007360';

export const createSearch = () => {
const cidListUrl = 'https://hamilsauce.github.io/open-secrets/data/cids-lite.json'
  fetch(cidListUrl)
    .then(res => res.json())
    .then(data => {
      let listData = data.map(cand => {
        return Object.entries(cand)
          .filter((prop) => {
            let keep = ['CID', 'FirstName', 'LastName']
            return keep.includes(prop[0])
          })
      });
      buildList(listData)
    })
    .catch(error => console.log(error));
}

const buildList = data => {
  data.forEach(([id, last, first]) => {
    let full = `${first[1]} ${last[1]}`

    const item = document.createElement('div');
    item.classList.add('candidate-option')
    item.dataset.cid = id[1];
    item.appendChild(document.createTextNode(full));

    item.addEventListener('click', e => {
      const list = document.querySelector('#candidate-list')
      const searchBox = document.querySelector('#list-search');
  

      searchBox.value = item.textContent
      searchInput = item.dataset.cid;
      list.classList.toggle('show')
const newQuery = new CustomEvent('newQuery')
    fetchCands()
      item.dispatchEvent(newQuery)
      console.log(newQuery);
      console.log(searchInput);
    });
    document.querySelector('#candidate-list').appendChild(item)
  })
}

document.querySelector('#list-search')
  .addEventListener('click', e => {
    const list = document.querySelector('#candidate-list')
    list.classList.toggle('show')
  })
document.querySelector('#list-search')
  .addEventListener('keyup', e => {
    filterSearchList();
  })

function filterSearchList() {
  var input, filter, ul, li, opt, i;
  input = document.getElementById("list-search");
  filter = input.value.toUpperCase();
  let list = document.getElementById("candidate-list");
  opt = list.querySelectorAll(".candidate-option");
  for (i = 0; i < opt.length; i++) {
    let txtValue = opt[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      opt[i].style.display = "";
    } else {
      opt[i].style.display = "none";
    }
  }
}

{ searchInput, createSearch }