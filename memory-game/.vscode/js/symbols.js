
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

{symbols}