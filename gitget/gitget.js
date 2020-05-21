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

const handleUrlCheckBox = (chBox) => {
  const urlIn = document.querySelector('.urlInput')

  if (chBox.checked) {
  let hamBase = 'https://hamilsauce.github.io/'
    urlIn.value = `${hamBase}${urlIn.value}`
    console.log(urlIn.value);
  } else {
    urlIn.value = '';
  }
}

const out = file => {
  let fileHeader = document.querySelector('.fileHeader')
  let resultDisplay = document.querySelector('.output')
  let stringData = JSON.stringify(file, null, 2)

  resultDisplay.textContent = stringData;
}

document.querySelector('.userform').addEventListener('submit', e => {
  e.preventDefault();
  const fileIn = document.querySelector('.urlInput')
  getgit(fileIn.value);
})

document.querySelector('.hamhomeCheck').addEventListener('change', e => {
  handleUrlCheckBox(e.target)
})

document.querySelector('.submitButton').addEventListener('click', e => {
  e.preventDefault();
  const fileIn = document.querySelector('.urlInput')
  const form = document.querySelector('.userform')
  getgit(fileIn.value);
  toggleCollapse(form);
  

  
})

window.onload = () => {
	// handleUrlCheckBox(document.querySelector('.hamhomeCheck'))
	console.log(document.querySelector('.hamhomeCheck').checked);
};
