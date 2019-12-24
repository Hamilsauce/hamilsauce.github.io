import { toneTable } from './noteSource.js';
import { csvToJson } from './csvToJson.js';



const divOut = document.querySelector('.note-table');
const noteTable = document.querySelector('.noteTable');
const inputVal = document.querySelector('.noteInput');
const subBut = document.querySelector('.subBut');


//**csv conversion**

const mapTheData = (n) => {
 let mappedData = [];
  n.forEach(curr => {
    // console.log(curr);

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
  });
  return mappedData
  console.log(mappedData);

}

let reducer = (arr) => {
  let tableArray = [];

  arr.forEach(row => {
    let tRow = document.createElement('tr');
    tRow.innerHTML = row.join('');

     document.querySelector('.noteTable').appendChild(tRow);
  })
  };

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


(() => {
  //build initial table at page load, then set event handler for queries
  let noteData = csvToJson(toneTable, 'tab');
  let mapped = mapTheData2(noteData);
  let reduced = reducer(mapped);

  document.querySelector('.noteInput').addEventListener('change', e => {
    e.preventDefault();
      //clear existing data from table so that only filtered rows will display, rather than
      //not clearing and old data exisitng  with filtered data
    document.querySelector('.noteTable').innerHTML = /*html*/`
      <tr class="colNames">
        <th>Note</th>
        <th>Frequency</th>
        <th>Wavelength</th>
      </tr>
    `;

      let filterNote = filterData(noteData, inputVal.value)
      let mapped = mapTheData2(filterNote)
      let reduced = reducer(mapped);

     // noteTable.innerHTML = reduced;
    })
})();
