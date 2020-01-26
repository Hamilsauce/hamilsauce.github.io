export class Card {
  constructor(className, cardSymbol, eventHandler) {
    this.className = className;
    this.cardSymbol = cardSymbol;
    this.sharedClassName = 'grid-cell';
    this.eventHandler = eventHandler,
    this.isSelected = false
  }
  renderSelf() {
    let cardEl = document.createElement('div');
    let cardText = document.createTextNode(this.cardSymbol);

    cardEl.classList.add(`${this.className}`);
    cardEl.classList.add('grid-cell');
    cardEl.appendChild(cardText);
    cardEl.addEventListener('click', this.eventHandler);

    return cardEl;
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
  updateDeckSize() {
    this.deckSize = this.cards.length;
    return this.deckSize;
  }
  createMatchingCards() {
  let dupedCards = this.cards
        .reduce((result, curr) => {
          return result.concat([curr, curr]);
        }, []);
    this.cards = dupedCards;

    this.updateDeckSize();
  }
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  generateCard(card) {
    this.cards.push(card);
    this.updateDeckSize();
  }

}

{ Card, Deck }