export class Favorites {
  constructor() {
    this.favorites = this.getFavorites(),
    this.viewingFavorites = false 
  }
  addFavorite(fave) {
    this.favorites.push(fave);
    console.log(JSON.stringify(fave))
    console.log(JSON.stringify(this.favorites))
  }
  getFavorites() {
    if(localStorage.getItem('favorites')) {
      const favesObj = JSON.parse(localStorage.getItem('favorites'));
      const storedFaves = favesObj.favorites;
      console.log(storedFaves);
      return storedFaves;
    } else {
      console.log('no faves')
      return [];
    }

  }
  storeFavorites() {
    const favesObject = {
      favorites: this.favorites
    }
    localStorage.setItem('favorites', JSON.stringify(favesObject))
  }
  clear() {
    this.favorites.length = 0;
    localStorage.removeItem('favorites')
  }
}
{Favorites}