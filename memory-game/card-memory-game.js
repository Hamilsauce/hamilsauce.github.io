import { symbols, shuffle } from './symbols.js';
import { Card, Deck } from './Cards.js';
import { GameClock } from './game-clock/gameClock.js';

const userform = document.querySelector('.userform');
let allCards = document.querySelectorAll('.grid-cell');
let turnDisplay = document.querySelector('.turns-counter');
const newGameButton = document.querySelector('.modalMiddle');

document.querySelector('.modal').style.display = 'grid';
document.querySelector('.endModal').style.display = 'none';
document.querySelector('.endModal').addEventListener('click', e => {
  e.target.style.display = 'none';
})


class Game {
  constructor(turns, time, stars) {
    this.selected = [],
      this.matched = [],
      this.turns = turns,
      this.time = time,
      this.stars,
      this.playedOn = new Date().toDateString();
      this.deck = this.newDeck(),
      this.history = function () {
        let prevGames = localStorage.getItem('gameHistory');
        console.log(prevGames);
      }
  }
  addTurn() {
    this.turns++;
    return this.turns;
  }
  newDeck() {
    return new Deck();
  }
  gameOver() {
    let check =
      this.matched.length === 16 ? true : false;
    console.log('order of this.deck.decksize, .deck.getDeckSize(), and check');
    console.log(this.deck.deckSize);
    console.log(this.deck.getDeckSize());
    console.log(check);
    return check;
  }
  resetGame() {
    this.turns = 0;
    this.matched = [];
    this.gameTime = '0:00';
    console.log(`reset - deck size is ${this.deck.cards.length}`);
  }
  calculateStars() {}
  saveGame() {
    let newSave = {
      gameDate: this.playedOn,
      gameTime: clock.finalTime,
      deckSize: this.matched.length,
      playerTurns: this.turns,
    }
    console.log(newSave);

  }
}


let game = new Game(0, 0, 3);
const clock = new GameClock;
console.log(clock)
let prevTarget;

function cardClicker(event) {
  let card = event.target;

  if (card === prevTarget) {
    card.classList.remove('selected');
  } else if (game.selected.length === 0 && card !== prevTarget) {
    selectCard(card);
  } else if (game.selected.length === 1 && card !== prevTarget) {
    selectCard(card);
    checkSelected(game.selected);
  } else if (game.selected.length === 2) {
    checkSelected(game.selected);
  }
  prevTarget = card;
}


//tests if matching pair when selected array has 2
const checkSelected = cardPair => {
  let [card1, card2] = cardPair;
  let deckCheck;

  if (card1.textContent === card2.textContent) {
    cardPair.forEach(card => {
      let sym = card.textContent;

      setTimeout(() => {
        card.classList.remove('selected');
        card.classList.add('matched');
      }, 1000);
      card.removeEventListener('click', cardClicker);

      let cardObjIndex = game.deck.cards //!move into deck class
        .findIndex(cardObj => {
          return cardObj.cardSymbol == sym;
        });
      let matchedCard = game.deck.cards.splice(cardObjIndex, 1);
      matchedCard.isMatched = true;
      game.matched.push(matchedCard);

      deckCheck = game.deck.cards.length == 0 ? 'allCardsMatched' : '';

    });
  } else {
    cardPair.forEach(card => {
      card.classList.remove('selected');
    });



  }

  game.selected.length = 0;
  turnDisplay.innerHTML = game.addTurn();

  if (deckCheck === 'allCardsMatched') {
    setTimeout(() => {
      endGame();
    }, 1500);

  };
}
//adds clicked card to selected array
const selectCard = (card) => {
  card.classList.add('selected');
  game.selected.push(card);
}

//Handle card clicks: mark as selected, if less than 2 then add to selected arrqy
//! move to class oother module
const addHandlers = () => {
  allCards.forEach(card => {
    card.addEventListener('click', cardClicker);
  });
}


const cardMaker = (cSymbol, boardName) => {
  let cardClass = `cell${cSymbol}`;
  let newCard = new Card(cardClass, cSymbol);

  newCard.renderSelf(boardName);
  return newCard;
}

const refreshCards = symbols => {
  symbols.forEach(symbol => {
    game.deck.addCard(cardMaker(symbol, 'game-grid'));
  });
}

newGameButton.addEventListener('click', e => {
  document.querySelector('.modal').style.display = 'none';

  game.resetGame();
  shuffle(symbols);
  refreshCards(symbols)

  allCards = document.querySelectorAll('.grid-cell');
  addHandlers();
  console.log(game);

  console.log('deck: ')
  console.log(game.deckSize)
  console.log(game.deck)
  clock.start(document.querySelector('.time-counter'))
  console.log(clock);

})

userform.addEventListener('submit', e => {
  e.preventDefault();
  let symIn = document.querySelector('.symbolIn');
  console.log(cardMaker(symIn.value, 'game-grid'))

  symIn.value = '';
});

const endGame = () => {
  console.log('Game = ended!');
  clock.stop();
  const endModal = document.querySelector('.endModal');
  const restartButton = document.querySelector('.restartButton');

  endModal.style.display = 'grid';

  game.calculateStars();
  game.saveGame();
}
