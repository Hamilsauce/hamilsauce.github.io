import {
  csvToJson
} from './csvToJson.js'
// utility funcs
const toggleClass = (state, selector, newClass) => {
  let classSelector = `${selector}`;
  const input = document.querySelector(classSelector)
  if (state === true) {
    input.classList.add(newClass);
  } else if (state === false) {
    input.classList.remove(newClass);
  } else {
    input.classList.toggle(newClass);
  }
}

//holds neceessary info til submit
const store = {
  saveData(key, data) {
    this[key] = data;
    sessionStorage.setItem('converterStore', JSON.stringify(this));
  },
  viewSessionStorage() {
    let storage = JSON.parse(sessionStorage.getItem('converterStore'));
    console.log(storage);
  }

};

const readFile = async (e) => {
    let fileList = await e.target.files[0]
    let data = await fileList.text()
    return data;
  }
  (() => {
    const filePicker = document.querySelector('.filePicker');
    filePicker.addEventListener('change', e => {
      const fileContent = readFile(e)
        .then(data => {
          let content = data;
          console.log(content);
          store.saveData('fileText', content);
        })
    })
  })()

document.querySelector('.delimInput')
  .addEventListener('change', e => {
    let delimInput = e.target.value;
    console.log(delimInput);


    handleInput(delimInput);
  })

const handleInput = delim => {
  const customInput = document.querySelector('.customInput');
  if (delim == 'custom') {
    toggleClass(true, '.customInputContainer', 'show')
    customInput.addEventListener('change', e => store.saveData('delim', e.target.value));
  } else {
    toggleClass(false, '.customInputContainer', 'show')
    store.saveData('delim', delim);
  }
}

document.querySelector('.submitButton')
  .addEventListener('click', e => {
    e.preventDefault();
    const display = document.querySelector('.contentDisplay')
    const output = csvToJson(store.fileText, ',');

    display.textContent = output;
    console.log(output);
  })
  
document.querySelector('.saveButton')
  .addEventListener('click', e => {
    e.preventDefault();
    const display = document.querySelector('.contentDisplay')
    const text = display.textContent; 
    
     saveAs(text, newFile.filename)
    
    const output = csvToJson(store.fileText, ',');

    display.textContent = output;
    console.log(output);
  })