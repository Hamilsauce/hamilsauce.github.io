import { symbols, shuffle } from './symbols.js';
import { Card, Deck } from './Cards.js';
const cardSymbols = ['A', 'B', 'C'];

const userform = document.querySelector('.userform');
let allCards = document.querySelectorAll('.grid-cell');
let turnDisplay = document.querySelector('.turns-counter');
const newGameButton = document.querySelector('.modalMiddle');

let matched = [];


class Game {
  constructor(turns, time, stars) {
    this.selected = [],
      this.matched = [],
      this.turns = turns,
      this.time = time,
      this.stars,
      this.playedOn = new Date().toDateString();
    this.deck = this.newDeck(),
      this.history = function() {
        let prevGames = localStorage.getItem('gameHistory');
        console.log(prevGames);
      }
  }
  newDeck(firstCard) {
    return new Deck();
  }
  gameOver() {

  }
  resetGame() {
    this.deck.cards.length = 0;
    console.log(`reset - deck size is ${this.deck.cards.length}`);
  }
  calculateStars() {

  }
  saveGame() {
    let newSave = {
      turns: this.turns,
      gameTime: this.time,
      deckSize: Deck.length(),
      gameTurns: this.turns,
    }

  }
}

const game = new Game(0, 0, 3);
console.log(JSON.stringify(game));
console.log(JSON.stringify(game.deck));

//tests if matching pair when selected array has 2
const checkSelected = cardPair => {
  let [card1, card2] = cardPair;

  setTimeout(() => {
    if (card1.textContent === card2.textContent) {
      cardPair.forEach(card => {
        card.classList.remove('selected');
        card.classList.add('matched');
      });
      game.matched.push(card1.textContent);
    } else {
      cardPair.forEach(card => {
        card.classList.remove('selected');
      });
    }
    game.selected.length = 0;
  }, 1000);
  game.turns++;
  turnDisplay.innerHTML = game.turns;
  //console.log(JSON.stringify(game));

};
//adds clicked card to selected array
const selectCard = (card, prevTarget) => {
  card.classList.add('selected');
  game.selected.push(card);
  console.log(game.selected)
}

//Handle card clicks: mark as selected, if less than 2 then add to selected arrqy
const addHandlers = () => {
  let prevTarget;
  let cardClickListener = [
    'click',
    function(event) {
      if (card === prevTarget) {
        card.classList.remove('selected');
      } else if (game.selected.length === 0 && card !== prevTarget) {
        console.log('event handle length 0');
        selectCard(card);
      } else if (game.selected.length === 1 && card !== prevTarget) {
        console.log('event handle 1');
        selectCard(card);
        checkSelected(game.selected);
      } else if (game.selected.length === 2) {
        console.log('event handle 2');
        console.log(game.selected);
        checkSelected(game.selected);
      }
    },
    true
  ];

  allCards.forEach(card => {
    card.addEventListener('click', e => {
      if (card === prevTarget) {
        card.classList.remove('selected');
      } else if (game.selected.length === 0 && card !== prevTarget) {
        console.log('event handle length 0');
        selectCard(card);
      } else if (game.selected.length === 1 && card !== prevTarget) {
        console.log('event handle 1');
        selectCard(card);
        checkSelected(game.selected);
      } else if (game.selected.length === 2) {
        console.log('event handle 2');
        console.log(game.selected);
        checkSelected(game.selected);
      }
      prevTarget = card;
      console.log(prevTarget.classList);
    });
  });
}

const cardMaker = (cSymbol, boardName) => {
  let cardClass = `cell${cSymbol}`;
  let newCard = new Card(cardClass, cSymbol);

  newCard.renderSelf(boardName);

  return newCard;


}

const refreshCards = symbols => {
  console.log('refresh before: ');
  //console.log(JSON.stringify(game));

  symbols.forEach(symbol => {
    game.deck.addCard(cardMaker(symbol, 'game-grid'));
  });
  console.log('refresh after carmaker: ');
  console.log(JSON.stringify(game.deck));
}

newGameButton.addEventListener('click', e => {
  document.querySelector('.modal').style.display = 'none';
  game.resetGame();
  shuffle(symbols);
  refreshCards(symbols)
  //console.log(JSON.stringify(game));

  allCards = document.querySelectorAll('.grid-cell');
  addHandlers();

})


// userform.addEventListener('submit', e => {
//   e.preventDefault();
//   let symIn = document.querySelector('.symbolIn');
//   console.log(cardMaker(symIn.value, 'game-grid'))

//   symIn.value = '';
// });


//immediately add event listeners
// (() => {
//  addHandlers();
//  turnDisplay.innerHTML = turns;
// })();  


// const cellCountIn = document.querySelector('.cellCountIn');
// const subBut = document.querySelector('.submitButton2');
// const board = document.querySelector('.game-grid');

// const makeCards = (cardCount, boardName) => {
//   console.log(typeof parseInt(cardCount))
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