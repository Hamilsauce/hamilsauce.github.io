// *TODO this could be placed in it's own module as it only relies on url input from external source
let records = [];
let htmlArray = [];
let messages = [];
const url = `https://hamilsauce.github.io/tgram-fun-chat.json`; //${apiKey}

/* list builder */
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
/* end list builder */

const showData = data => {
  let objData = Object.entries(data);
  console.log(objData);
};

const htmlOut = list => {
  let dataDisplay = document.querySelector('#divContents');
  dataDisplay.innerHTML = `<ul class="list">${list}</ul>`
}

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
/**/
request({url: url})
.then(data => {
  let chatData = JSON.parse(data);
  messages = chatData.chats['list'][0].messages;
});

const filterMessagesByName = name => {
  let msgByName = messages
      .filter(msg => {
          return msg.from === name;
      });
  return msgByName;
}

document.querySelector('.getDataButton').addEventListener('click', (e) => {
const display = document.querySelector('.data-display');
e.preventDefault();
  let stevesMsgs = filterMessagesByName('Ian Nantucket');

  display.innerText = stevesMsgs.length;
  //console.log(stevesMsgs);
  // htmlOut(lister(Object.entries(stevesMsgs)))
})

const userList = msgs => {
let uniqueNames = msgs
  .map(msg => {
    c
  })
}


// console.log(records);n
//console.log(lister(records));








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