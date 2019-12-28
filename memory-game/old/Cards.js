export class Card {
  constructor(className, cardSymbol) {
    this.className = className;
    this.cardSymbol = cardSymbol;
    this.sharedClassName = 'grid-cell';
    this.isSelected = false,
    this.isMatched = false
  }
  renderSelf(parentClassName) {
    const gameBoard = document.querySelector(`.${parentClassName}`);
    let cardEl = document.createElement('div');
    cardEl.classList.add(`${this.className}`);
    cardEl.classList.add('grid-cell');

    let cardText = document.createTextNode(this.cardSymbol);
    cardEl.appendChild(cardText);

    gameBoard.appendChild(cardEl);
    console.log(`rendered card`);
  }
  toggleSelected() {
    this.isSelected = !this.isSelected;
  }
  addMatched() {
    this.matched = true;
  }
}

export class Deck {
  constructor(cards){
    this.cards = cards || []
  }
  getDeckSize() {
    this.deckSize = this.cards.length;
    return this.deckSize;
  }
  shuffle() {
    const rando = Math.random(1 - 2 / 0.5);
    return rando;
  }
  addCard(card) {
    this.cards.push(card);
  }

}

{Card, Deck}