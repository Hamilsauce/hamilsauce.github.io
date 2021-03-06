import { toneTable } from './noteSource.js';
import { csvToJson } from './csvToJson.js';



const divOut = document.querySelector('.note-table');
const inputVal = document.querySelector('.noteInput');
const subBut = document.querySelector('.subBut');


//**csv conversion**

const mapTheData = (n) => {
 let mappedData = [];
  n.forEach(curr => {
    let entries = Object.entries(curr); // <-- replace n[3] witth query (n[?])
    let props = entries
      .map(e => {
        let [k, v] = e;
        let key = k.trim();
        let val = v.trim();
        return `<li class="note-prop">${key}: ${val}</li>`;
      });
    mappedData.push(props);
  });
    return mappedData;
}

const mapTheData2 = (n) => {
  let mappedData = [];
  n.forEach(curr => {
    let entries = Object.values(curr); // <-- replace n[3] witth query (n[?])
    let props = entries
      .map(e => {
        let val = e.trim();
        return `<td class="note-prop">${val}</td>`;
      });
    mappedData.push(props);
    console.log(mappedData)
  });
  return mappedData
}

let reducer = (arr) => {
  //reduce array of html elems to single string
  let joined = arr.reduce((item, acc) => {
    return acc += item;
  }, '');
  // return joined;
  return `<tr>${joined}</tr>`;
}
let reducer2 = (arr) => {
  //reduce array of html elems to single string
  let joined = arr.reduce((item, acc) => {
    return acc += item;
  }, '');
  return joined;
}

//query function
const filterData = (data, query) => {
  let filterResults = data
    .filter(noteObj => {
      return noteObj.Note.toUpperCase()
        .indexOf(query.toUpperCase()) > -1;
    });
  return filterResults;
}

let noteData = csvToJson(toneTable, 'tab');

subBut.addEventListener('click', e => {
  let filterNote = filterData(noteData, inputVal.value)
  let mapped = mapTheData2(filterNote)
  let reduced = reducer(mapped);
  
  divOut.innerHTML = reduced;
})