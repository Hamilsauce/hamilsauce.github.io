const getgit = url => {
  // let base = 'https://hamilsauce.github.io/'
  // let name = f
  // let url = f/

  fetch(url)
    .then(res => res.text())
    .then(result => {
      out(result)
      getView(url)
    })
}

const getView = (url) => {
  const viewer = document.querySelector('.content-view')
  viewer.src = url;
}

const toggleCollapse = (el) => {
  el.classList.toggle('collapsed')

  let kids = !el.classList.contains('collapsed') ? el.querySelectorAll('.childCollapsed') : el.querySelectorAll('.ctrl')
  const btn = document.querySelector('.submitButton')

  kids.forEach(kid => {
    if (el.classList.contains('collapsed') && !kid.classList.contains('submitButton')) {
      kid.classList.remove('ctrl')
      kid.classList.add('childCollapsed')
      btn.value = 'Search Again'
    } else if (!el.classList.contains('collapsed')) {
      kid.classList.remove('childCollapsed')
      kid.classList.add('ctrl')
      btn.value = 'Go'
    }
  })
}

const handleUrlCheckBox = () => {
  let chBox = document.querySelector('.hamhomeCheck')
  const urlIn = document.querySelector('.urlInput')
  let urlTest = true;
  let url = '';
  console.log('url value at start of handleChbox');

  console.log(urlIn.value);

  if (chBox.checked) {
    let hamBase = 'https://hamilsauce.github.io/'
    urlIn.value = `${urlIn.value}`
    urlTest = true;
  } else {
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    url = `${proxy}/${urlIn.value}`
    urlIn.value = '';
    urlTest = false;

  }

  let urlOut = urlTest === false ? url : urlIn.value;

  return urlOut;
}

const out = file => {
  let fileHeader = document.querySelector('.fileHeader')
  let resultDisplay = document.querySelector('.output')
  let stringData = JSON.stringify(file, null, 2)

  resultDisplay.textContent = stringData;
}

document.querySelector('.userform').addEventListener('submit', e => {
  e.preventDefault();

  const chBox = document.querySelector('.hamhomeCheck');
  let url = handleUrlCheckBox()
  console.log(url);

  getgit(url);
})

document.querySelector('.hamhomeCheck').addEventListener('change', e => {
  handleUrlCheckBox()
})

document.querySelector('.submitButton').addEventListener('click', e => {
  e.preventDefault();
  const form = document.querySelector('.userform')
  getgit(handleUrlCheckBox());
  toggleCollapse(form);
})

window.onload = () => {
  // handleUrlCheckBox()
  console.log(document.querySelector('.hamhomeCheck').checked);
};