// *TODO this could be placed in it's own module as it only relies on url input from external source
let records = [];
let htmlArray = [];
let messages = [];
const url = `https://hamilsauce.github.io/tgram-fun-chat.json`; //${apiKey}

//! list builder
const lister = list => {
  let listArr = list.map(item => {
      return `<li class="listItem" id="${item}">${item}</li>`
    })
    .reduce((itemOut, acc) => {
      return acc += itemOut;
    }, '');
  console.log(listArr);
  return listArr;
}
//! end list builder

//! general purpose/reusable functions
const validateName = name => {
  return name.trim() ? true : false;
}

const showData = data => {
  let objData = Object.entries(data);
  console.log(objData);
};

const htmlOut = list => {
  let dataDisplay = document.querySelector('#divContents');
  dataDisplay.innerHTML = `<ul class="list">${list}</ul>`
}
//!end resuable stuff

let request = obj => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open(obj.mthod || 'GET', obj.url, true);
    if (obj.headers) {
      Object.keys(obj.headers).forEach(key => {
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(obj.body);
  });
}
//* Call request function
request({url: url})
  .then(data => {
    let chatData = JSON.parse(data);
    messages = chatData.chats['list'][0].messages;
  });


const filterMessagesByName = name => {
  const errorMessage = `Name entered isn't valid.`;

  if (validateName(name) === false) {
    return errorMessage;
  } else {
    let msgByName = messages
      .filter(msg => {
        return msg.from === name;
      });
    return msgByName;
  }
}

//* Listens for the request submit button to run query and return some results
document.querySelector('.getDataButton').addEventListener('click', (e) => {
  e.preventDefault();
  const displayTotal = document.querySelector('.display-header1');
  const displayPerc = document.querySelector('.display-header2');
  const nameInput = document.querySelector('.name-input');

  let resultMsgs = filterMessagesByName(nameInput.value);
  let percent = Math.round(((resultMsgs.length / messages.length) * 100));

  displayTotal.innerText = `${resultMsgs.length} messages`;
  displayPerc.innerText = `${percent}% of all`;

  //* will return unique list of names
let newMsgs = messages.map(msg => {
    return msg.from;
  });
  console.log(newMsgs);
})

//TODO under construction -- will return unique list of names

//todo let mymsgs = Object.entries(messages)[0][1];
//todo let newMsgs = mymsgs.map(msg => {
//todo   return msg.from;
//todo });
//todo console.log(newMsgs);





document.querySelector('.collapse').addEventListener('click', (e) => {
  const userform = document.querySelector('.userform');
  const container = document.querySelector('.top-container');

  if (userform.style.display === 'none') {
    userform.style.display = 'block';
  } else {
    userform.style.display = 'none';
    // container.style.height = '1px';
  }
})

function saveDataToFile() {
  // const data = document.querySelector('#divContents');
  const blob = new Blob([JSON.stringify(messages)]);
  let a = document.body.appendChild(document.createElement('a'));

  a.href = window.URL.createObjectURL(blob);
  a.download = 'telegram-messages' + '.txt';
  a.click();
  a = null;
}




























/*
let dataDisplay = document.querySelector('#divContents');
let dataMessage = document.querySelector('#data-display-message');
  let propNames = Object.keys(VARIABLE);
        */
/*
*This is all optional, just didgs through the json to get data and display it.
*Request has been made tho
records = Object.entries(VARIABLE[propNames[1]]);
records.forEach(ITEM => {
    let [entryName, entryDetails] = ITEM;
    let entryDate = new Date(entryName).toDateString();
    let printData = rec => {
        let recOut = [];
        rec.forEach(recProp => {
            let propKey = recProp[0];
            let propVal = recProp[1]
            if (propKey !== '5. volume') {
                let line = `
                <li style="text-align: center;">
                    <p>${propKey.slice(3)}</p> ${currencyFormatter.format(propVal)}
                </li>`;
              recOut.push(line);
            }
        });
        return recOut.join('');
    };
    let recordHTML = `
                <div class="record">
                    <div class="entry-name-container">${entryDate}</div>
                    <ul class="entry-details-list">${printData(Object.entries(entryDetails))}</ul>
                </div>`;
    htmlArray.push(recordHTML);
});*/
/*
  dataMessage.innerHTML = `Currently viewing results`;
  dataDisplay.innerHTML = htmlArray.join('');
  document.querySelector('.date-finder-container').style.display = "flex";
  document.querySelector('#data-container').style.borderTop = "0px";
})
.catch(error => {
  let dataMessage = document.querySelector('#data-display-message');
  dataMessage.innerHTML = 'Something went wrong! Try again n00b';

  console.log(error);
});*/