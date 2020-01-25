
class CardSymbols {
  constructor(symbols) {
    this.symbols = symbols
  }
}

export function addSymbol(sym) {
  if (symbols.indexOf(sym) === -1) {
    symbols.push(sym);
    return symbols;
  } else {
    alert(' symbol already exists');
  }
}

export let symbols = [1,2,3,4,5,6];
// export let symbols = [1,1,2,2,3,3,4,4];
// export let symbols = [1,2,3,4,];

// export const shuffle = array => {
//   for (let i = array.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

{symbols}