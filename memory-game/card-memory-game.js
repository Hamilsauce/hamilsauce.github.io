import {
  symbols,
  shuffle
} from './symbols.js';
import {
  Card,
  Deck
} from './Cards.js';
import {
  GameClock
} from './game-clock/gameClock.js';

const userform = document.querySelector('.userform');
let allCards = document.querySelectorAll('.grid-cell');
let turnDisplay = document.querySelector('.turns-counter');
const newGameButton = document.querySelector('.modalMiddle');

document.querySelector('.modal').style.display = 'grid';
document.querySelector('.endModal').style.display = 'none';
// document.querySelector('.endModal').addEventListener('click', e => {
//   e.target.style.display = 'none';
// })


class Game {
  constructor(turns, time, stars) {
    this.selected = [],
      this.matched = [],
      this.turns = turns,
      this.gameTime = time,
      this.cardCount = 0,
      this.stars,
      this.playedOn = new Date().toDateString();
    this.playedAt = new Date().toLocaleTimeString();
    this.deck = this.newDeck(),
      this.gameHistory = this.getHistory();
  }
  getHistory() {
    let history = localStorage.getItem('gameHistory') ?
      JSON.parse(localStorage.getItem('gameHistory')) : [];
    console.log(history);
    return history;
  }
  addTurn() {
    this.turns++;
    return this.turns;
  }
  countCard() {
    this.cardCount++;
  }
  newDeck() {
    let deck = new Deck();
    this.cardCount = deck.deckSize;
    console.log(this.cardCount);
    return deck;

  }
  gameOver() {
    console.log('in gamover');
console.log(game);

    let check =
      this.matched.length === this.cardCount ? true : false;
    console.log(  this.matched.length);

    if (check === true) {
      console.log('check is true');

      this.calculateStars();
      this.saveGame();
    }

    return check;
  }
  resetGame() {
    this.turns = 0;
    this.cardCount = 0;
    this.matched = [];
    this.gameTime = '0:00';
    console.log(`reset - deck size is ${this.deck.cards.length}`);
  }
  calculateStars() {
    const perfectGame = this.matched.length / 2;
    let actualGame = this.turns;
    if (actualGame / perfectGame <= 2) {
      this.stars = 3;
    } else if (actualGame / perfectGame <= 3.25) {
      this.stars = 2;
    } else {
      this.stars = 1;
    }

  }
  saveGame() {
    let gameId = this.gameHistory.length
    console.log('history:');

    console.log(this.gameHistory);
    let newSave = {
      id: gameId,
      gameDate: this.playedOn,
      elapsedTime: clock.finalTime,
      stars: this.stars,
      deckSize: this.matched.length,
      playerTurns: this.turns
    }
    this.gameHistory.push(newSave);
    localStorage.setItem('gameHistory',JSON.stringify(this.gameHistory));

  }
}


let game = new Game(0, 0, 3);
const clock = new GameClock;
console.log(clock)
let prevTarget;
console.log('gamehistory');

console.log(game.gameHistory);

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
    clock.stop();
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
  game.countCard();
  console.log(game.cardCount);

  newCard.renderSelf(boardName);
  return newCard;
}

const refreshCards = symbols => {
  symbols.forEach(symbol => {
    game.deck.addCard(cardMaker(symbol, 'game-grid'));
  });
}

const newGame = () => {
  game.resetGame();
  shuffle(symbols);
  refreshCards(symbols)

  allCards = document.querySelectorAll('.grid-cell');
  addHandlers();
  console.log(game);

  clock.start(document.querySelector('.time-counter'))


}

newGameButton.addEventListener('click', e => {
  document.querySelector('.modal').style.display = 'none';
  newGame();


})

userform.addEventListener('submit', e => {
  e.preventDefault();
  let symIn = document.querySelector('.symbolIn');
  console.log(cardMaker(symIn.value, 'game-grid'))

  symIn.value = '';
});

const endGame = () => {
  console.log('Game = ended!');
  game.gameOver();
  const endModal = document.querySelector('.endModal');
  const restartButton = document.querySelector('.restartButton');

  document.querySelector('.game-grid').innerHTML = '';
  document.querySelector('.turns-counter').innerHTML = '0';
  endModal.style.display = 'grid';

  restartButton.addEventListener('click', (e) => {
    endModal.style.display = 'none';
    newGame();

  });

}
