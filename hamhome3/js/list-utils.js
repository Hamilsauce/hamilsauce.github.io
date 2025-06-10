const BASE_PAGES_URL = 'https://hamilsauce.github.io'
const BASE_REPO_URL = 'https://github.com/Hamilsauce'

const OwnerModel = {
  html_url: '',
  avatar_url: '',
  login: '',
}

const RepoItemModel = {
  created_at: '',
  updated_at: '',
  pushed_at: '',
  size: Number,
  has_pages: Boolean,
  fork: '',
  name: '',
  git_url: '',
  html_url: '',
}

const formatUser = ({ login, avatar_url, html_url}) => {};

const formatRepoItem = (item = RepoItemModel) => {
  const pagesUrl = item.has_pages 
};
const formatRepoList = () => {};