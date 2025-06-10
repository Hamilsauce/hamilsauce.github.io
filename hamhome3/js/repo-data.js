const apiUrl = 'https://api.github.com/users/hamilsauce/repos?per_page=100&type=owner';

export const fetchRepoData = async (url = apiUrl) => {
  return await (await fetch(url)).json();
};