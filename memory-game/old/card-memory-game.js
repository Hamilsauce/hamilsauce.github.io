import { symbols, addSymbol } from './symbols.js';
import { Card } from './Cards.js';
const cardSymbols = ['A', 'B', 'C'];

const userform = document.querySelector('.userform');
let allCards = document.querySelectorAll('.grid-cell');

let selected = [];
let matched = [];

const deck = {
  symbolCount: null,
  symbols: ['A', 'B', 'C'],
  setSymbolCount() {
    return this.symbols.length;
  }
}
console.log('sym count', deck.setSymbolCount())

//tests if matching pair when selected array has 2
const checkSelected = cardPair => {
  let [card1, card2] = cardPair;
  setTimeout(() => {
    if (card1.textContent === card2.textContent) {
      cardPair.forEach(card => {
        card.classList.remove('selected');
        card.classList.add('matched');
      });
      matched.push(card1.textContent);
    } else {
      cardPair.forEach(card => {
        card.classList.remove('selected');
      });
    }
    selected.length = 0;
  }, 1000)
}

const selectCard = (card, prevTarget) => {
  card.classList.add('selected');
  selected.push(card);
}

//Handle card clicks: mark as selected, if less than 2 then add to selected arrqy
const addHandlers = () => {
  let prevTarget;

  allCards.forEach(card => {
    card.addEventListener('click', e => {
      if (card === prevTarget) {
        card.classList.toggle('selected');
        selected.length = 0;
      } else if (selected.length === 0 && card !== prevTarget) {
        console.log('event handle length 0');
        selectCard(card, prevTarget);
      } else if (selected.length === 1 && card !== prevTarget) {
        console.log('event handle 1');
        selectCard(card, prevTarget);
        checkSelected(selected);
      } else if (selected.length === 2) {
        console.log('event handle 2');
        checkSelected(selected);
      }
      prevTarget = card;
      //selected.length = 0;
    });
  });
}

const cellCountIn = document.querySelector('.cellCountIn');
const subBut = document.querySelector('.submitButton2');
const board = document.querySelector('.game-grid');

// const makeCards = (cardCount, boardName) => {
//  console.log(typeof parseInt(cardCount))
//   for (let c = 0; c < parseInt(cardCount); c++) {
//     let cardClass = `cell${c}`;
//     let newCard = new Card(cardClass, c);
//     newCard.renderSelf(boardName);
//     //console.log(newCard.getAttribute('class'))
//     // addHandlers();
//     console.log('poo')
//   }
//   allCards = document.querySelectorAll('.grid-cell');
// }

// subBut.addEventListener('click', e => {

//   makeCards(cellCountIn.value, 'game-grid');

// })


const cardMaker = (cSymbol, boardName) => {
  let cardClass = `cell${cSymbol}`;
  let newCard = new Card(cardClass, cSymbol);
  newCard.renderSelf(boardName);
  //console.log(newCard.getAttribute('class'))
  allCards = document.querySelectorAll('.grid-cell');
  addHandlers();
}

userform.addEventListener('submit', e => {
  e.preventDefault();
  let symIn = document.querySelector('.symbolIn');
  // cardMaker(symIn.value, 'game-grid');
  console.log(cardMaker(symIn.value, 'game-grid'))

  symIn.value = '';
});
addHandlers();


