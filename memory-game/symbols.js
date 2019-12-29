export function addSymbol(sym) {
  if (symbols.indexOf(sym) === -1) {
    symbols.push(sym);
    return symbols;
  } else {
    alert(' symbol already exists');
  }
}

export let symbols = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
// export let symbols = [1,1,2,2,3,3,4,4];

export const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}

{symbols, shuffle}