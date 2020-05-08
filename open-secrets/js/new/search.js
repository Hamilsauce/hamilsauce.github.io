//TODO NOTES
// Paramaterize:
// - listSourceUrl
// - keep array (turn into query value option)
// - #list-search and #candidate-list
// -
// - remove pronect specific cod

let searchInput = 'N00007360';
const newQuery = new CustomEvent('newQuery', { bubbles: true, detail: { param: searchInput } })


export const createSearch = () => {
  //TODO param the url
  const listSourceUrl = 'https://hamilsauce.github.io/open-secrets/data/cids-lite.json'
  fetch(listSourceUrl)
    .then(res => res.json())
    .then(data => {
      let listData = data.map(cand => {
        return Object.entries(cand)
          .filter((prop) => {
          	//TODO make keep array usrd for specifyjng display text and query value associatedsearchInput
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
   //TODO remove tnis patticular
    let full = `${first[1]} ${last[1]}`

    const listOption = document.createElement('div');
    listOption.classList.add('list-option')
    listOption.dataset.itemQueryValue = id[1];
    listOption.appendChild(document.createTextNode(full));

    //registers listeners as search listOptions are created.
    listOption.addEventListener('click', e => {
      const list = document.querySelector('#candidate-list') //parameterize this
      const searchBox = document.querySelector('#list-search'); //parameterize this

      searchBox.value = listOption.textContent
      searchInput = listOption.dataset.itemQueryValue;
      list.classList.toggle('show')


      newQuery.detail.param = searchInput
      listOption.dispatchEvent(newQuery)
    });
    document.querySelector('#candidate-list').appendChild(listOption)
  })
}

//event listeners for filtrring and queryjng with thr search
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
  opt = list.querySelectorAll(".list-option");
  for (i = 0; i < opt.length; i++) {
    let txtValue = opt[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      opt[i].style.display = "";
    } else {
      opt[i].style.display = "none";
    }
  }
}

{ createSearch }