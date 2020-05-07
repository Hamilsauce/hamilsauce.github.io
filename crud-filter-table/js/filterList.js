//* Dynamic table generations
//TODO: Add ability to inject custom data into the table (file input, copy paste, etc)

import {
  DataTable
} from './tableBuilder.js'
import {
  sampleData
} from './data.js'

//@Util functions
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

const toggleClass = (el, className) => {
  el.classList.toggle(className)
}
const addClass = (el, className) => {
  el.classList.add(className)
}
const removeClass = (el, className) => {
  el.classList.remove(className)
}
//@ End Utils

const appState = {
  filters: ['1'],
  clickCount: 0,
  pinnedRowId: -1,
  incrementClicks() {
    this.clickCount < 1 ? this.clickCount += 1 : this.clickCount = 0;
  }
};

//! initalize table
const colNames = ['Name', 'Country'];
const datatable = new DataTable(sampleData, colNames, document.querySelector('.table-container'));

datatable.createTable()
//! end


const filterTable = () => {
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

//! EVENTLISTENER
//* search input
document.querySelector('#search-input')
  .addEventListener('keyup', e => {
    filterTable();
  });

//! EVENTLISTENER
//*handles row selection/editing
const tableBody = document.querySelector('tbody');
tableBody.querySelectorAll('tr').forEach((row, index, tableRows) => {
  row.addEventListener('dblclick', e => {
    if (!e.target.classList.contains('table-field')) return;

    let activeField = e.target;
    if (window.activerowId == index) {
      stopEdit(activeField, row);
      window.activerowId = -1;
    } else {
      startEdit(activeField, row);
      window.activerowId = index;
    }
  })
  //! EVENTLISTENER
  //* deselects row on blur
  row.addEventListener('blur', e => {
    let activeField = e.target;
    stopEdit(activeField, tableRows[window.activerowId]);
    window.activerowId = index;
  })
});

//* row edit/selection
const startEdit = (field, row) => {
  field.focus();
  row.contentEditable = true;
  row.querySelector('.action-field').contentEditable = false;
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

//* row edit/selection
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

//*text select code
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


//!EVENTLISTENER
//* toggles clearButton
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

//! EVENTLISTENER
//* toggles clearButton
document.querySelector('#search-input').addEventListener('change', e => {
  const clearButton = document.querySelector('.clearButton')
  const search = e.target;
  if (search.value.length > 0) {
    addClass(clearButton, 'show')
  } else if (search.value.length === 0) {
    removeClass(clearButton, 'show')
  }
})

//! EVENTLISTENER
//* toggles clearButton
document.querySelector('.clearButton').addEventListener('click', e => {
  const search = document.querySelector('#search-input');
  // const clearButton = document.querySelector('.fa-times-circle');
  search.value = '';
  filterTable();
  removeClass(e.target, 'show');

})

//! EVENTLISTENER - header menus
//* toggles header menus when header is clicked, makes sure only 1 displays at ta time
document.querySelector('.tableHeader').querySelectorAll('.header')
  .forEach(head => {
    head.addEventListener('click', e => {
      let menu = head.childNodes[1];
      if (appState.activeHeaderMenu && menu != appState.activeHeaderMenu) {
        removeClass(appState.activeHeaderMenu, 'show');
      }
      if (menu.contains(e.target)) return; //!stops the menu from closing if it is clicked
      toggleClass(menu, 'show')
      appState.activeHeaderMenu = menu;
    })
  });

//! EVENTLISTENER - header menus
//* Handles/routes header menu list item/buttons to col specific actions
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

//* adds/removes columsn from the filter list
const updateFilters = (selectedAction) => {
  const filters = appState.filters;
  const columnHeader = selectedAction.parentNode.parentNode;
  const columnId = selectedAction.dataset.columnId;

  if (filters.includes(columnId)) { //! If alrady filtering by that column, remove from filter list and remove filtering class
    filters.splice(filters.indexOf(columnId), 1)
    removeClass(selectedAction, 'filterSelected')
    removeClass(columnHeader, 'filterSelected')
  } else {
    filters.push(columnId)
    addClass(selectedAction, 'filterSelected')
    addClass(columnHeader, 'filterSelected')
  }
}

const showRowActionButtons = targetRow => {
  const rowButtons = document.querySelectorAll('.action-field');
  if (!targetRow.classList.contains('table-field')) return;

  const rowId = targetRow.dataset.rowId;
  rowButtons.forEach(buttons => {
    if (buttons.dataset.rowId == rowId) {
      addClass(buttons, 'show');
    } else {
      removeClass(buttons, 'show');
    }
  })
}

//! EVENTLISTENER - Displays row actions when row is clicked on
document.querySelectorAll('.tableRow').forEach(row => {
  row.addEventListener('click', e => {
    showRowActionButtons(e.target)
  })
})

//! EVENTLISTENER - listens for any click outside menu
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

const pinRow = (targetRow) => {
  const table = document.querySelector('.datatable');
  const rows = table.querySelectorAll('.tableRow');
  let pinRowButton = targetRow.querySelector('.pinRowButton');
  let actionField = targetRow.querySelector('.action-field');

  rows[0].parentNode.insertBefore(targetRow, rows[0])
  addClass(targetRow, 'pinned')
  addClass(actionField, 'pinned')
  addClass(pinRowButton, 'active')
}

const unpinRow = (targetRow) => {
  const table = document.querySelector('.datatable');
  const rows = table.querySelectorAll('.tableRow');
  let pinRowButton = targetRow.querySelector('.pinRowButton');
  let actionField = targetRow.querySelector('.action-field');
  let rowId = rows[0].dataset.rowId;
  removeClass(targetRow, 'pinned')
  removeClass(pinRowButton, 'active')
  removeClass(actionField, 'pinned')

  let originalIndex = rowId - 1; //*if unpinned, put row back in original order
  rows[originalIndex].parentNode.insertBefore(rows[0], rows[originalIndex])
}

//!EVENT LISTENER - Pin Rows
document.querySelectorAll('.pinRowButton')
  .forEach((btn) => {
    btn.addEventListener('click', e => {
      let targetRow = e.target.parentNode.parentNode.parentNode;
      let rowId = targetRow.dataset.rowId;
      if (targetRow.classList.contains("pinned")) {
        unpinRow(targetRow)
        appState.pinnedRowId = -1;

      } else {
        appState.pinnedRowId = rowId;
        pinRow(targetRow)
      }
      console.log(appState);
    })
  })

const sortTable = (colIndex) => {
  var table, rows, switching, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.querySelector(".datatable");
  switching = true;
  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.rows;
    //! test if a pinned row needs to be skupped during sort (if so, sip 2, if not skip 1)
    let skipRows = appState.pinnedRowId != -1 ? 2 : 1;
    let i = skipRows;

    //! dont loop through headers (length - 1)
    for (i; i < (rows.length - 2); i++) {
      shouldSwitch = false;
      /* current row td and next row td: */
      x = rows[i].getElementsByTagName("TD")[colIndex - 1];
      y = rows[i + 1].getElementsByTagName("TD")[colIndex - 1];

      if (dir == "asc") {
        //* Check if the two rows should switch place based on the direction, asc or desc, If so, mark as a switch and break the loop:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      //* If a switch has been marked, make the switch and mark that a switch has been done:
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //* Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}