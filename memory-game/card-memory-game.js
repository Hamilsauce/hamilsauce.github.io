import {
  symbols,
  shuffle
} from './symbols.js';
import {
  Card,
  Deck
} from './Cards.js';

const userform = document.querySelector('.userform');
let allCards = document.querySelectorAll('.grid-cell');
let turnDisplay = document.querySelector('.turns-counter');
const newGameButton = document.querySelector('.modalMiddle');

document.querySelector('.modal').style.display = 'grid';


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
      this.deck.deckSize < 2 ? true : false;
    console.log('order of this.deck.decksize, .deck.getDeckSize(), and check');
    console.log(this.deck.deckSize);
    console.log(this.deck.getDeckSize());
    console.log(check);



    return check;
  }
  resetGame() {
    this.deck.cards.length = 0;
    console.log(`reset - deck size is ${this.deck.cards.length}`);
  }
  calculateStars() {}
  saveGame() {
    let newSave = {
      turns: this.turns,
      gameTime: this.time,
      deckSize: Deck.length(),
      gameTurns: this.turns,
    }
  }
}

let prevTarget;

function cardClicker(event) {
  let card = event.target;

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
console.log(game.deck.length );

  if (game.deck.length == 0) {
    endGame();
    return;
  } else {
    prevTarget = card;
    console.log(prevTarget.classList);
  }
}

const game = new Game(0, 0, 3);

//tests if matching pair when selected array has 2
const checkSelected = cardPair => {
  let [card1, card2] = cardPair;

  setTimeout(() => {
    if (card1.textContent === card2.textContent) {
      cardPair.forEach(card => {
        let sym = card.textContent;
        card.classList.remove('selected');
        card.classList.add('matched');
        card.removeEventListener('click', cardClicker);

        let cardObjIndex = game.deck.cards //!move into deck class
          .findIndex(cardObj => {
            return cardObj.cardSymbol == sym;
          });
        let matchedCard = game.deck.cards.splice(cardObjIndex, 1);
        matchedCard.isMatched = true;
        game.matched.push(matchedCard);


      });

    } else {
      cardPair.forEach(card => {
        card.classList.remove('selected');
      });
    }
    game.selected.length = 0;
  }, 1000);
  turnDisplay.innerHTML = game.addTurn();
  console.log(game);

  console.log('game over check: ');
  console.log(game);

  if (game.deck.length == 0) {
    console.log('fuck me');
    
    endGame();
  }

};

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
  console.log('deck: ')
  console.log(game.deckSize)
  console.log(game.deck)

})

userform.addEventListener('submit', e => {
  e.preventDefault();
  let symIn = document.querySelector('.symbolIn');
  console.log(cardMaker(symIn.value, 'game-grid'))

  symIn.value = '';
});

const endGame = () => {
  console.log('Game = ended!');

  const endModal = document.querySelector('.endModal');
  const restartButton = document.querySelector('.restartButton');
  endModal.style.display = 'block';

  game.calculateStars();
  game.saveGame();
}
