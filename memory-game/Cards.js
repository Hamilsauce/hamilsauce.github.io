export class Card {
  constructor(className, cardSymbol) {
    this.className = className;
    this.cardSymbol = cardSymbol;
    this.sharedClassName = 'grid-cell';
    this.isSelected = false
  }
  renderSelf(parentClassName) {
    let cardEl = document.createElement('div');

    cardEl.classList.add(`${this.className}`);
    cardEl.classList.add('grid-cell');
    // cardEl.setAttribute('class', `${this.sharedClassName} ${this.className}`);
    let cardText = document.createTextNode(this.cardSymbol);
    cardEl.appendChild(cardText);

    const gameBoard = document.querySelector(`.${parentClassName}`);
    gameBoard.appendChild(cardEl);

    console.log(`rendered card`);
  }

  toggleSelected() {
    this.isSelected = !this.isSelected;
  }
  toggleMatched() {
    this.matched = !this.matched;
  }
}

export class Deck {
  constructor(){
    this.cards = [],
    this.deckSize = 0
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
    this.getDeckSize();
  }

}

{Card, Deck}