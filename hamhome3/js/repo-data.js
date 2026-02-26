const apiUrl = 'https://api.github.com/users/hamilsauce/repos';

export const fetchRepoData = async (url = apiUrl) => {
  let page = 1
  let done = false
  let repos = []
  
  while (!done) {
    const apiUrlQuery = `https://api.github.com/users/hamilsauce/repos?per_page=100&page=${page}`;
    
    const res = await (await fetch(apiUrlQuery)).json();
    
    repos = repos.concat(res);
    done = res.length < 100;
    page++;
  }
  
  return repos
};
