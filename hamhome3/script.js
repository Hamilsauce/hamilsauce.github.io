import { fetchRepoData } from '../hamhome3/js/repo-data.js';
import localStore from '../hamhome3/js/local-store.js';
const app = document.querySelector('#app');
const appBody = document.querySelector('#app-body');
const appTitle = document.querySelector('#app-title');
const appHeaderRight = document.querySelector('#app-header-right');
const appHeaderLeft = document.querySelector('#app-header-left');
const repoSearch = document.querySelector('#repo-search-input')

const STORE_KEY = 'HAMILSAUCE_REPOS';

const init = async () => {
  if (localStore.has(STORE_KEY)) {
    return localStore.get(STORE_KEY);
  }

  const response = await fetchRepoData();

  return localStore.set(STORE_KEY, response);
};

const repoData = await init();

const owner = repoData[0].owner;
const img = document.createElement('img');
img.src = owner.avatar_url;
img.classList.add('avatar');

appHeaderLeft.innerHTML = '';
appHeaderLeft.append(img);

img.addEventListener('click', e => {

  location.href = owner.html_url;
});

const filtered = repoData
  // .filter(({ fork, has_pages }, i) => has_pages && !fork)
  // .sort(({updated_at: datestringA}, {updated_at: datestringB}) => new Date(Date.parse(datestringB)) - new Date(Date.parse(datestringA)))
  .filter(({ fork, has_pages }, i) => !fork && has_pages)
  .sort((a, b) => a.updated_at < b.updated_at ? 1 : -1)
  .map((x, i) => {
    if (x.has_pages === true) {
      x.pages_url = `https://hamilsauce.github.io/${x.name}/`;
    }

    return x;
  })
  .map(({ created_at, updated_at, html_url, name, pages_url }, i) => {
    const url = pages_url ?? html_url;
    const formattedName = name.replace(/-/g, " ");
    const template = `
      <div class="list-item-top-row">
        <a href="${url}" class="repo-name">${formattedName}</a>
      </div>
      <div class="list-item-middle-row"></div>
      <div class="list-item-bottom-row">
        <div class="repo-dates">
          <div class="repo-created-date">created: ${new Date(created_at).toLocaleDateString()}</div>
          <div class="repo-updated-date">updated: ${new Date(updated_at).toLocaleDateString()}</div>
        </div>
      </div>`;

    const el = document.createElement('li');
    el.classList.add('list-item');
    el.innerHTML = template;
    el.dataset.name = formattedName

    el.addEventListener('pointerup', (e) => {
      el.querySelector('a').click()
    });

    return el;
  });

const repoList = document.querySelector('#repo-list');
repoList.append(...filtered);

appTitle.addEventListener('click', e => {
  const isInverted = app.classList.contains('invert');

  if (isInverted) {
    app.classList.remove('invert');
    app.classList.add('outvert');
  }
  else {
    app.classList.add('invert');
    app.classList.remove('outvert');
  }
});


appTitle.addEventListener('click', e => {
  const isInverted = app.classList.contains('invert')

  if (isInverted) {
    app.classList.remove('invert')
    app.classList.add('outvert')
  }
  else {
    app.classList.add('invert')
    app.classList.remove('outvert')
  }
});

repoSearch.addEventListener('input', e => {
  console.log(e.data)

  const listItems = [...document.querySelectorAll('.list-item')];

  listItems.forEach((el, i) => {
    const repoName = el.dataset.name
    console.warn('repoName.includes(repoSearch.value)', repoName.includes(repoSearch.value))
    el.dataset.hide = repoName.includes(repoSearch.value) ?
      false : true;
  });
});
