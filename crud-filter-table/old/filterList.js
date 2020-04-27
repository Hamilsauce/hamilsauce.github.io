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

const addClass = (el, className) => {
  el.classList.add(className)
}
const removeClass = (el, className) => {
  el.classList.remove(className)
}


const filterTable = () => {
  const table = document.querySelector("#datatable");
  const tableBody = document.querySelector(".tableBody");
  const headerRow = document.querySelector(".header-row");
  const rows = tableBody.querySelectorAll("tr");
  const input = document.querySelector("#search-input");
  const filter = input.value.toUpperCase();

  for (let i = 0; i < rows.length; i++) {
    const fields = rows[i].querySelectorAll("td");
    let colMatches = 0;

    fields.forEach(field => {
      if (field) {
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

document.querySelector('#search-input')
  .addEventListener('keyup', e => {
    filterTable();
  });


const tableBody = document.querySelector(".tableBody");
tableBody.querySelectorAll('tr').forEach((row, index, tableRows) => {
  row.addEventListener('dblclick', e => {
    let activeField = e.target;
    if (window.activeRowIndex == index) { //tableBody.querySelectorAll('tr').indexOf(row)) {
      stopEdit(activeField, row);
      window.activeRowIndex = -1;
    } else {
      startEdit(activeField, row);
      window.activeRowIndex = index;
    }
  })

  row.addEventListener('blur', e => {
    let activeField = e.target;

    // if (window.activeRowIndex == index) { //tableBody.querySelectorAll('tr').indexOf(row)) {
    stopEdit(activeField, tableRows[window.activeRowIndex]);
    window.activeRowIndex = index;
  })
});

const startEdit = (field, row) => {
  field.focus();
  row.contentEditable = true;
  addClass(field, 'editing')
  addClass(row, 'selectedRow')
  styleStore.elementReference(row);
  styleStore.storeBackgroundColor()
  styleStore.storeFontColor()
  row.style.backgroundColor = 'rgba(250, 250, 250, 0.84)';
  row.style.color = 'rgba(90, 87, 90, 1);'
  selectText(field);
}

const stopEdit = (field, row) => {
  field.style.backgroundColor = styleStore.getStoredBackround()
  row.style.color = styleStore.getStoredFontColor()
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
document.querySelector('#search-input').addEventListener('keyup', e => {
  const clearButton = document.querySelector('.clearButton')
  const search = document.querySelector('#search-input');
  console.log('clearbutton');


  if (search.value.length > 0) {
    addClass(clearButton, 'show')
  } else if (search.value.length === 0) {
    removeClass(clearButton, 'show')
  }
  filterTable()
})

// document.querySelector('#search-input').addEventListener('change', e => {
//   const clearButton = document.querySelector('.clearButton')
//   console.log('clearbutton');
//   const search = e.target;
//   if (search.value.length > 0) {
//     addClass(clearButton, 'show')
//   } else if (search.value.length === 0) {
//     removeClass(clearButton, 'show')
//   }
// })

document.querySelector('.clearButton').addEventListener('click', e => {
  const search = document.querySelector('#search-input');
  const clearButton = document.querySelector('.clearButton');
  search.value = '';
  filterTable();
  removeClass(clearButton, 'show');

})