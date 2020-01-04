import { toneTable } from './noteSource.js';
import { csvToJson } from './csvToJson.js';
import { User } from './pword.js';

const divOut = document.querySelector('.note-table');
const noteTable = document.querySelector('.noteTable');
const inputVal = document.querySelector('.noteInput');
const subBut = document.querySelector('.subBut');
const userform = document.querySelector('.userform');
const pwField = document.querySelector('.passwordField');
const pwSubmit = document.querySelector('.pwSubmit');
const editButton = document.querySelector('.editButton');
const modalContainer = document.querySelector('.modal-container');
const dimmer = document.querySelector('.dimmer');
const loginModal = document.querySelector('.loginModal');
const cancelButton = document.querySelector('.pwCancel');

const jake = new User('farts');
console.log(jake.password)

//log: dataset/table construction functions

//! map note data values/prop vals/fields to html
const mapTheData = (arrOfNoteObjects) => {  //* takes value returned from CsvToJson
  let mappedData = [];
  arrOfNoteObjects.forEach(curr => {
    let i = 0;
    let entries = Object.values(curr); //* for Each note obj in array, get prop values
    let props = entries
      .map(e => {                      //* for each prop value, embed in td markup string
        let val = e.trim();
        return `<td class="note-prop row${++i}">${val}</td>`;
      });
    i = 0;
    mappedData.push(props); //* store array of tds (3, 1 for each note obj prop) in array
  });
  return mappedData
}

//! take array of td arrays > reduce td to rows > rows to data body
let reduceAndAppendRows = (arr) => {
  arr.forEach(row => {                          //*for each array of tds in array
    let tRow = document.createElement('tr'); //*create a row
    tRow.innerHTML = row.join('');            //* set row's markup as td's reduced to single string
    document.querySelector('.noteTable').appendChild(tRow); //* slap that bad boy on the end of the table
  })
};
//Old row reducer
// let reducer2 = (arr) => {
//   let joined = arr.reduce((item, acc) => {
//     return acc += item;
//   }, '');
//   return joined;
// }

const filterData = (data, query) => { //! makes new array from CsvToJson return value of notes matching search
  let filterResults = data
    .filter(noteObj => {
      return noteObj.Note.toUpperCase()
        .indexOf(query.toUpperCase()) > -1;
    });
  return filterResults;
}
//log: end dataset/table construction fns

(() => {
  //! build initial table at page load...
  let noteData = csvToJson(toneTable, 'tab');
  let mapped = mapTheData(noteData);
  reduceAndAppendRows(mapped);

  //!  then set event handler for queries
  userform.addEventListener('submit', e => {  //* replace existing table/markup/data w/ headers only (clear out old data)
    e.preventDefault();
    document.querySelector('.noteTable').innerHTML = /*html*/ `
      <tr class="colNames">
        <th>Note</th>
        <th>Frequency</th>
        <th>Wavelength</th>
      </tr>
    `;
    //! execute!
    let filterNote = filterData(noteData, inputVal.value)  //* 1) filter note data according to user input,
    let mapped = mapTheData(filterNote)                   //*  2) map note obj props to sets of td elements,
    reduceAndAppendRows(mapped);                          //* 3) reduce sets of tds to rows, append to table
  })
})();

//! UI/Dom/Modal/Event handlingB
const msgModal = document.querySelector('.msgModal');
const displayMsg = authMsg => {
  const msgText = document.querySelector('.authText');
  msgText.textContent = authMsg;
  msgModal.style.display = 'flex';

  setTimeout(() => {
    msgModal.style.display = 'none';
    modalContainer.style.display = 'none';
  }, 3000);
}

msgModal.addEventListener('click', e => {
  modalContainer.style.display = 'none';
});

//!password submit button
pwSubmit.addEventListener('click', e => {
  e.preventDefault();
  let authMsg = jake.checkLogin(pwField.value)  //* tests input against stored pword
  let authStatus = jake.authorized;

  if (authStatus) {
    document.querySelectorAll('.note-prop')
      .forEach(td => {
        td.contentEditable = true;
        td.classList.add('editable');
      });
  }

  setTimeout(() => {
    loginModal.style.display = 'none';
    displayMsg(authMsg);
  }, 500);

  pwField.value = '';
  //TODO jake.password.validateInput();
});

cancelButton.addEventListener('click', e => {
  modalContainer.style.display = 'none';
  dimmer.style.display = 'flex';
});

editButton.addEventListener('click', e => {
  modalContainer.style.display = 'block';
  dimmer.style.display = 'flex';
  loginModal.style.display = 'flex';
});

