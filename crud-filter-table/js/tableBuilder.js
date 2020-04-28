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
      this.appendNewTextNode(col, header);
      this.append(this.createHeaderMenu(index), header);
      this.append(header, headerRow);

      if (index === cols.length - 1) {
        const actionHeader = this.generateNewEl('th', 'action-header', index + 1);
        this.appendNewTextNode('actions', actionHeader);
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
      newRow.dataset.rowIndex = index + 1;

      this.createCells(newRow, entry);
      this.addClass(newRow, 'tableRow')
    })
    //! tbody was automatically created when we inserted rows, so setting class now
  }

  createCells(row, entry) {
    Object.entries(entry)
      .forEach(([key, val], index, fields) => {
        const cell = row.insertCell();
        cell.dataset.rowIndex = row.dataset.rowIndex;
        this.addColumnIndex(cell, index)
        this.addClass(cell, 'table-field');
        this.appendNewTextNode(val, cell);

        if (index === fields.length - 1) {
          const actionCell = row.insertCell();
          actionCell.dataset.rowIndex = row.dataset.rowIndex;
          this.addColumnIndex(actionCell, index + 1)
          this.addClass(actionCell, 'action-field');
          const deleteRowButton = `
              <svg version="1.1" class="deleteRowButton"  id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width = "512px"
                height = "512px" viewBox = "0 0 512 512" enable - background = "new 0 0 512 512" xml: space = "preserve" >
                <g><path d="M128,405.429C128,428.846,147.198,448,170.667,448h170.667C364.802,448,384,428.846,384,405.429V160H128V405.429z M416,96 h-80l-26.785-32H202.786L176,96H96v32h320V96z"/>
                < /g></svg>
           `;
          const editRowButton = `
                <svg version="1.1" class="editRowButton" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                  <g><rect x="178.846" y="92.087" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 224.3476 631.1498)" width="128.085" height="354.049"/>
                  <path d="M471.723,88.393l-48.115-48.114c-11.723-11.724-31.558-10.896-44.304,1.85l-45.202,45.203l90.569,90.568l45.202-45.202 C482.616,119.952,483.445,100.116,471.723,88.393z"/><polygon points="64.021,363.252 32,480 148.737,447.979 	"/>
                  </g></svg>
              </span>`;
          ''
          actionCell.innerHTML += `<div class="rowButtons" data-row-index="${actionCell.dataset.rowIndex}" data-column-index="${index + 1}">${editRowButton}${deleteRowButton}</div>`
          // this.appendNewTextNode('action', actionCell);

        }
      })
  }
  rebuild(newData) {
    this.data = newData;
    this.createTable();
  }

  append(newChild, newParent) {
    newParent.appendChild(newChild);
  }
  appendNewTextNode(text, newParent) {
    newParent.appendChild(document.createTextNode(text))
  }
  addClass(el, className) {
    el.classList.add(className)
  }
  addColumnIndex(el, index) {
    el.dataset.columnIndex = index + 1;
  }
  generateNewEl(tag, className, index) {
    const newEl = document.createElement(tag);
    this.addClass(newEl, className);
    this.addColumnIndex(newEl, index);
    return newEl;
  }
}

{
  DataTable
}