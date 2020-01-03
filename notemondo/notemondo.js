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


const jake = new User('farts');
console.log(jake.password)

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
    let i = 0;
    let entries = Object.values(curr); // <-- replace n[3] witth query (n[?])
    let props = entries
      .map(e => {
        let val = e.trim();
        return `<td class="note-prop row${++i}">${val}</td>`;
      });
    i = 0;
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

  userform.addEventListener('submit', e => {
    e.preventDefault();
    //clear existing data from table so that only filtered rows will display, rather than
    //not clearing and old data exisitng  with filtered data
    document.querySelector('.noteTable').innerHTML = /*html*/ `
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


pwSubmit.addEventListener('click', e => {
  e.preventDefault();
  let authMsg = jake.checkLogin(pwField.value)
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
  console.log(authStatus)

  // jake.password.validateInput();
});


const cancelButton = document.querySelector('.pwCancel');
cancelButton.addEventListener('click', e => {
  modalContainer.style.display = 'none';
  dimmer.style.display = 'flex';
});

editButton.addEventListener('click', e => {
  modalContainer.style.display = 'block';
  dimmer.style.display = 'flex';
  loginModal.style.display = 'flex';
});

