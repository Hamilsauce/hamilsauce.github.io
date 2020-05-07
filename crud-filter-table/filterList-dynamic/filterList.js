//* Dynamic table generations
//TODO: Add ability to inject custom data into the table (file input, copy paste, etc)

import {
  DataTable
} from './tableBuilder.js'
import {
  sampleData
} from './data.js'

//Util functions
const styleStore = {
  elementReference(el) {
    this.element = el;
  },
  storeBackgroundColor() {
    this.background = this.element.style.backgroundColor;
  },
  storeFontColor() {
    this.fontColor = this.element.style.color;
  },
  getStoredBackround() {
    return this.background;
  },
  getStoredFontColor() {
    return this.fontColor;
  }
}
const appState = {
  filters: ['1'],
  clickCount: 0,
  incrementClicks() {
    this.clickCount < 1 ? this.clickCount += 1 : this.clickCount = 0;
  }
};
console.log(appState);

const toggleClass = (el, className) => {
  el.classList.toggle(className)
}
const addClass = (el, className) => {
  el.classList.add(className)
}
const removeClass = (el, className) => {
  el.classList.remove(className)
}
// End Utils

const colNames = ['Name', 'Country'];



const datatable = new DataTable(sampleData, colNames, document.querySelector('.table-container'));
datatable.createTable()

const filterTable = () => {
  const table = document.querySelector(".datatable");
  const tableBody = document.querySelector("tbody");
  const headerRow = document.querySelector(".header-row");
  const rows = document.querySelectorAll(".tableRow");
  const input = document.querySelector("#search-input");
  const filter = input.value.toUpperCase();

  for (let i = 0; i < rows.length; i++) {
    const fields = rows[i].querySelectorAll("td");
    let colMatches = 0;

    fields.forEach(field => {
      if (field && appState.filters.includes(field.dataset.columnId)) {

        let txtValue = field.textContent || field.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          colMatches += 1;
        }
      }
    })
    if (colMatches > 0) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

//EVENTLISTENER
document.querySelector('#search-input')
  .addEventListener('keyup', e => {
    filterTable();
  });



//EVENTLISTENER
const tableBody = document.querySelector('tbody');
tableBody.querySelectorAll('tr').forEach((row, index, tableRows) => {
  row.addEventListener('dblclick', e => {
    if (!e.target.classList.contains('table-field')) return;

    let activeField = e.target;
    if (window.activerowId == index) { //tableBody.querySelectorAll('tr').indexOf(row)) {
      stopEdit(activeField, row);
      window.activerowId = -1;
    } else {
      startEdit(activeField, row);
      window.activerowId = index;
    }
  })
  //EVENTLISTENER
  row.addEventListener('blur', e => {
    let activeField = e.target;
    stopEdit(activeField, tableRows[window.activerowId]);
    window.activerowId = index;
  })
});

const startEdit = (field, row) => {
  field.focus();
  row.contentEditable = true;
  addClass(field, 'editing')
  addClass(row, 'selectedRow')
  styleStore.elementReference(field);
  styleStore.storeBackgroundColor()
  styleStore.storeFontColor()
  row.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  row.style.color = 'rgba(90, 87, 90, 1);'
  row.style.textDecoration = 'underline';
  selectText(field);
}

const stopEdit = (field, row) => {
  row.style.textDecoration = 'none';
  row.style.color = styleStore.getStoredFontColor()
  field.style.backgroundColor = styleStore.getStoredBackround()
  field.style.fontStyle = 'normal';
  removeClass(field, 'editing')
  removeClass(row, 'selectedRow')
  deselectText();
  row.contentEditable = false;
}


//!text select code
const selectText = (el) => {
  if (document.body.createTextRange) {
    let range = document.body.createTextRange();
    range.moveToElementText(el);
    range.select();
  } else if (window.getSelection) {
    let selection = window.getSelection();
    let range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
const deselectText = () => {
  let wSelection = window.getSelection()
  wSelection.removeAllRanges();
}


//! filter clear button code   - event listeners
//EVENTLISTENER
document.querySelector('#search-input').addEventListener('keyup', e => {
  const clearButton = document.querySelector('.clearButton')
  const search = e.target;
  filterTable()
  if (search.value.length > 0) {
    addClass(clearButton, 'show')
  } else if (search.value.length === 0) {
    removeClass(clearButton, 'show')
  }
})

//EVENTLISTENER
document.querySelector('#search-input').addEventListener('change', e => {
  const clearButton = document.querySelector('.clearButton')

  const search = e.target;
  if (search.value.length > 0) {
    addClass(clearButton, 'show')
  } else if (search.value.length === 0) {
    removeClass(clearButton, 'show')
  }
})

//EVENTLISTENER
document.querySelector('.clearButton').addEventListener('click', e => {
  const search = document.querySelector('#search-input');
  const clearButton = document.querySelector('.fa-times-circle');
  search.value = '';
  filterTable();
  removeClass(e.target, 'show');

})
//EVENTLISTENER
const tableHeader = document.querySelector('.tableHeader')
tableHeader.querySelectorAll('.header')
  .forEach((head, index) => {
    head.addEventListener('click', e => {
      let menu = head.childNodes[1];
      if (appState.activeHeaderMenu && menu != appState.activeHeaderMenu) {
        console.log(menu != appState.activeHeaderMenu);

        removeClass(appState.activeHeaderMenu, 'show');
      }

      if (menu.contains(e.target)) return; //!stops the menu from closing if it is clicked
      toggleClass(menu, 'show')
      appState.activeHeaderMenu = menu;

    })

  });

//EVENTLISTENER
//! Handles/routes header clicks to actions
document.querySelectorAll('.header-menu')
  .forEach((menu, index) => {
    menu.childNodes.forEach(li => {
      li.addEventListener('click', e => {


        const targetHeader = e.target
        const colIndex = targetHeader.dataset.columnId;

        if (li.dataset.columnAction === 'highlight') {
          highlightColumn(colIndex)
        } else if (li.dataset.columnAction === 'addToFilter') {
          updateFilters(targetHeader)
        } else if (li.dataset.columnAction === 'sort') {
          sortTable(colIndex)
        }
        setTimeout((e) => {
          removeClass(menu, 'show')
        }, 600)
      })
    })
  })

const highlightColumn = (index) => {
  const allFields = document.querySelectorAll('.table-field');
  allFields.forEach(td => {
    if (td.dataset.columnId === index) toggleClass(td, 'highlight');
  })
}

const updateFilters = (selectedAction) => {
  const filters = appState.filters;
  const columnHeader = selectedAction.parentNode.parentNode;

  const columnId = selectedAction.dataset.columnId;
  if (filters.includes(columnId)) { //! If alrady filtering by that column, remove from filter list and remove filtering class
    filters.splice(filters.indexOf(columnId), 1)

    removeClass(selectedAction, 'filterSelected')
    removeClass(columnHeader, 'filterSelected')
    console.log(selectedAction);
  } else {
    filters.push(columnId)

    addClass(selectedAction, 'filterSelected')
    addClass(columnHeader, 'filterSelected')
    console.log(selectedAction);
  }
  console.log(appState.filters);

}
//EVENTLISTENER
document.querySelectorAll('.tableRow').forEach(row => {
  row.addEventListener('click', e => {
    const rowButtons = document.querySelectorAll('.action-field');
    if (!e.target.classList.contains('table-field')) return;

    const rowId = e.target.dataset.rowId;
    rowButtons.forEach(buttons => {
      if (buttons.dataset.rowId == rowId) {
        addClass(buttons, 'show');
      } else {
        removeClass(buttons, 'show');
      }
    })
  })
})
console.log(document.querySelector('.deleteRowButton'));

//EVENTLISTENER - listens for any xlick outside menu
window.addEventListener('click', e => {
  appState.clickTarget = e.target;
  if (!appState.activeHeaderMenu) return;

  let clicks = appState.clickCount;
  appState.incrementClicks();
  if (e.target != appState.activeHeaderMenu.contains(e.target)) {

    if (appState.clickCount > 0) {
      removeClass(appState.activeHeaderMenu, 'show');
      appState.activeHeaderMenu = '';
      clicks = 0;
    }

  } else if (e.target.childNodes.classList.contains('header-menu')) {
    appState.activeHeaderMenu = e.target;
    addClass(appState.activeHeaderMenu, 'show')
  }
})

console.log(document.querySelector('.deleteRowButton').childNodes);

//!!! DELETE ENTRIES Needs some fixing
//

//EVENTLISTENER
const btnContainers = document.querySelectorAll('.rowButtons');
btnContainers.forEach(div => {
  div.addEventListener('click', e => {
    const deleteButton = document.querySelector('.deleteRowButton');
    if (e.currentTarget.contains(deleteButton)) {
      console.log('gottem!');


      const index = parseInt(e.target.parentNode.dataset.rowId);
      const rows = document.querySelectorAll('.tableRow');
      console.log(index);
      console.log(rows[index]);

      addClass(rows[index], 'delete');
      rows.forEach((row, id) => {
        if (id == index) {
          addClass(row, 'deleted')
        }
      })
    }
  })

})


const sortTable = (colIndex) => {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector(".datatable");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[colIndex - 1];
      y = rows[i + 1].getElementsByTagName("TD")[colIndex - 1];

      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

document.querySelectorAll('.pinButton')
  .forEach((btn, index) => {

    btn.addEventListener('click', e => {
      console.log('e.target');
      console.log(e.target);

      console.log('index');
      console.log(index);

      // const rowId = e.target.parentNode.dataset.rowId;
      const table = document.querySelector('.datatable');
      const rows = table.rows;
      console.log(rows[index])
      console.log(rows[index].parentNode)
      rows[index].parentNode.insertBefore(rows[index + 1], rows[1])
    })
  })



// const btnContainers = document.querySelectorAll('.rowButtons');
// btnContainers.forEach(div => {
//   div.addEventListener('click', e => {
//     console.log('test');
//     if (e.target.classList.contains('deleteRowButton')) {
//       console.log('gottem!');


//       const index = parseInt(e.target.parentNode.dataset.rowId);
//       console.log(index);

//       let filteredData = sampleData
//         .filter((item, id, data) => {
//           console.log(item, index, id);

//           return id !== index;
//         })
//       console.log(filteredData);
//       datatable.rebuild(filteredData)

//     }
//   })
// })