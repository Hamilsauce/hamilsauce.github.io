// *TODO this could be placed in it's own module as it only relies on url input from external source
let records = [];
let htmlArray = [];
let messages = [];
const url = `https://hamilsauce.github.io/telegramData.json`; //${apiKey}

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

const htmlListOut = list => {
  let dataDisplay = document.querySelector('#divContents');
  dataDisplay.innerHTML = `<ul class="list">${list}</ul>`
}
//!end resuable stuff


//* will return unique list of names
const getNameList = messageList => {
  let uniques = messageList
    .map(msg => {
      return msg.from;
    })
  return uniques;

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
request({
    url: url
  })
  .then(data => {

    let chatData = JSON.parse(data);
    let chatList = chatData.chats['list'];
  let chatNameQuery = document.querySelector('.chatInput').value;

  let chatTarget = chatList.find(chat => {
    return chat.name === chatNameQuery;
  })

  messages = chatTarget.messages
    .filter(msg => {
      return msg.type === 'message';
    })
  console.log(messages)


    let uniqueNames = getNameList(messages);


  })


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
//* gets the chat specified by uer

const writeMsgCard = msg => {

}

//* Listens for the request submit button to run query and return some results
document.querySelector('.getDataButton').addEventListener('click', e => {
  e.preventDefault();
  const displayTotal = document.querySelector('.display-header1');
  const displayPerc = document.querySelector('.display-header2');
  const nameInput = document.querySelector('.name-input').value;

  let resultMsgs = filterMessagesByName(nameInput);
  let percent = Math.round(((resultMsgs.length / messages.length) * 100));

  displayTotal.innerText = `${resultMsgs.length} messages`;
  displayPerc.innerText = `${percent}% of all`;

})
console.log();



//*Collapse the form for more space
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