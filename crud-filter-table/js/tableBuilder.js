//TODO: Add ability to inject custom data into the table (file input, copy paste, etc)

export class DataTable {
  constructor(data, columnNames, parentElement) {
    this.data = data,
      this.columns = columnNames || [],
      this.parentElement = parentElement || document.querySelector('body'),
      this.columnActions = ['sort', 'addToFilter', 'highlight']
  }

  createTable() {
    this.table = document.createElement('table');
    this.table.classList.add('datatable');
    const thead = this.createTableHead();
    this.createRows();
    this.createHeaders(thead);
    this.append(this.table, this.parentElement);
  }

  createTableHead() {
    let thead = this.table.createTHead();
    this.addClass(thead, 'tableHeader');
    return thead;
  }

  createHeaders(thead) {
    const headerRow = thead.insertRow();
    this.addClass(headerRow, 'header-row')

    this.columns.forEach((col, index, cols) => {
      const header = this.generateNewEl('th', 'header', index)

      if (header.dataset.columnId == 1) {
        this.addClass(header, 'filterSelected')
      }
      this.appendNewTextNode(col, header);
      this.append(this.createHeaderMenu(index), header);
      this.append(header, headerRow);

      if (index === cols.length - 1) {
        const actionHeader = this.generateNewEl('th', 'action-header', index + 1);
        this.appendNewTextNode('', actionHeader);
        this.append(actionHeader, headerRow)
      }
    })
  }

  createHeaderMenu(index) {
    const menu = this.generateNewEl('ul', 'header-menu', index)
    this.columnActions
      .forEach(action => {
        const li = this.generateNewEl('li', 'menu-item', index);
        li.dataset.columnAction = action;
        this.appendNewTextNode(action, li);
        this.append(li, menu);
      })
    return menu;
  }

  createRows() {
    this.data.forEach((entry, index) => { //* Don't need to append or return inserted rows - .insertRows() does appends automatically
      const newRow = this.table.insertRow()
      newRow.dataset.rowId = index + 1;

      this.createCells(newRow, entry);
      this.addClass(newRow, 'tableRow')
    })
    //! tbody was automatically created when we inserted rows, so setting class now
  }

  createCells(row, entry) {
    Object.entries(entry)
      .forEach(([key, val], index, fields) => {
        const cell = row.insertCell();
        cell.dataset.rowId = row.dataset.rowId;
        this.addcolumnId(cell, index)
        this.addClass(cell, 'table-field');
        this.appendNewTextNode(val, cell);

        //* if the column just completed is the last accprding to header array, build on the actipon column,
        if (index === fields.length - 1) {
          const actionCell = row.insertCell();
          actionCell.dataset.rowId = row.dataset.rowId;
          this.addcolumnId(actionCell, index + 1)
          this.addClass(actionCell, 'action-field');

          const deleteRowButton = /*html*/ `
            <button class="row-action-button deleteRowButton">
              <i class="button-icon deleteRowIcon fas fa-trash"></i>
            </div>`;
          const filterRowButton = /*html*/ `
            <button class="row-action-button filterRowButton">
              <i class="button-icon filterRowIcon fas fa-filter"></i>
            </div>`;
          const undoRowButton = /*html*/ `
            <button class="row-action-button undoRowButton">
              <i class="button-icon const undoRowIcon fas fa-undo"></i>
            </div>`;
          const pinRowButton = /*html*/ `
            <button class = "row-action-button pinRowButton">
              <i class="button-icon pinRowIcon fas fa-thumbtack"></i>
            </button>`;
          actionCell.innerHTML += `${pinRowButton} | ${deleteRowButton}`
        }
      })
  }

  rebuild(newData) {
    const table = this.table

    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
    this.data = newData;
    this.createTable();
  }

  //! util funcs
  append(newChild, newParent) {
    newParent.appendChild(newChild);
  }
  appendNewTextNode(text, newParent) {
    newParent.appendChild(document.createTextNode(text))
  }
  addClass(el, className) {
    el.classList.add(className)
  }
  addcolumnId(el, index) {
    el.dataset.columnId = index + 1;
  }
  addrowId(el, index) {
    el.dataset.rowId = index;
  }
  generateNewEl(tag, className, index) {
    const newEl = document.createElement(tag);
    this.addClass(newEl, className);
    this.addcolumnId(newEl, index);
    return newEl;
  }
}



{
  DataTable
}