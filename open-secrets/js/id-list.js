const polModel = [
  {
    Id: 1,
    CID: "N00036633",
    LastName: "Abraham",
    FirstName: "Ralph",
    Party: "R",
    Office: "LA05",
    FECCandID: "H4LA05221"
  }
 ]
const endpoint = 'https://hamilsauce.github.io/open-secrets/data/cids-lite.json'
let arrayData = []

fetch(endpoint)
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
  
const buildList = data => {
  data.forEach(([id, last, first]) => {
    let full = `${first[1]} ${last[1]}`

    const item = document.createElement('div');
    item.classList.add('candidate-option')
    item.dataset.cid = id[1];
    item.appendChild(document.createTextNode(full));
    item.addEventListener('click', e => {
      console.log(item.dataset.cid);
		const list = document.querySelector('#candidate-list')
		list.classList.toggle('show')
    });
    document.querySelector('#candidate-list').appendChild(item)
  })
}
//MOVE TO DIFF MODULE THIS BUILDS LISTS ONLY
document.querySelector('#list-search')
	.addEventListener('click', e => {
		const list = document.querySelector('#candidate-list')
		list.classList.toggle('show')
	})
	