import {symbols,shuffle} from './symbols.js';
import { Card, Deck } from './Cards.js';
import {GameClock} from './gameClock.js';
import {Game} from './Game.js';

const userform = document.querySelector('.userform');
let allCards = document.querySelectorAll('.grid-cell');

// document.querySelector('.modal').style.display = 'none';
document.querySelector('.endModal').style.display = 'none';

//log initial page load stuff
let game = new Game(0, 0, 3);
const clock = new GameClock;
let prevTarget;

function cardClicker(event) {
  let card = event.target;

  if (card === prevTarget && card.classList.contains('selected')) {
    card.classList.remove('selected');
    game.selected.splice(game.selected.indexOf(card), 1);
    prevTarget = '';
  } else if (game.selected.length === 0 && card !== prevTarget) {
    selectCard(card);
    prevTarget = card;
  } else if (game.selected.length === 1 && card !== prevTarget) {
    selectCard(card);
    checkSelected(game.selected);
    prevTarget = card;
  } else if (game.selected.length === 2) {
    checkSelected(game.selected);
    prevTarget = card;
  }
}

//tests if matching pair when selected array has 2
const checkSelected = cardPair => {
  let [card1, card2] = cardPair;
  let deckCheck;

  if (card1.textContent === card2.textContent) {
    cardPair.forEach(card => {
      let sym = card.textContent;
      setTimeout(() => { //! remove selected class, replace with matched. then remove event lsiteners
        card.classList.remove('selected');
        card.classList.add('matched');
      }, 1000);
      card.removeEventListener('click', cardClicker);

      let cardObjIndex = game.deck.cards //! get index of card object wtih matching symbol as that of clicked card div
        .findIndex(cardObj => {
          return cardObj.cardSymbol == sym;
        });
      let matchedCard = game.deck.cards.splice(cardObjIndex, 1); //! move said card to matched array (out of deck)
      matchedCard.isMatched = true;
      game.matched.push(matchedCard);
      deckCheck = game.deck.cards.length == 0 ? 'allCardsMatched' : '';
    });
  } else { //! if no match, jsut remove the selected class
    cardPair.forEach(card => {
      card.classList.remove('selected');
    });
  }
  game.selected.length = 0;
  document.querySelector('.turns-counter').innerHTML = game.addTurn();

  if (deckCheck === 'allCardsMatched') { //! checks if all cards have been matched, initiates end game if so
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
const addHandlers = () => { //! move to class oother module
  allCards.forEach(card => {
    card.addEventListener('click', cardClicker);
  });
}

const cardMaker = (cSymbol, boardName) => {
  let cardClass = `cell${cSymbol}`;
  let newCard = new Card(cardClass, cSymbol);
  game.countCard();

  newCard.renderSelf(boardName);
  return newCard;
}

//!
//log End of  game functions
//!
const refreshCards = symbols => {
  symbols.forEach(symbol => {
    game.deck.addCard(cardMaker(symbol, 'game-grid'));
  });
}

const newGame = () => {
  document.querySelector('.game-grid').innerHTML = '';
  game.resetGame();
  shuffle(symbols);
  refreshCards(symbols)

  allCards = document.querySelectorAll('.grid-cell');
  addHandlers();
  clock.start(document.querySelector('.time-counter'))
}

document.querySelector('.newGameButton').addEventListener('click', e => {
  setTimeout(() => {
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.dimmer').style.display = 'none';

  }, 300);

  newGame();
})

const endGame = () => {
  const endModal = document.querySelector('.endModal');
  game.gameTime = clock.finalTime;
  game.gameOver();

  document.querySelector('.game-grid').innerHTML = '';
  document.querySelector('.turns-counter').innerHTML = '0';
  setTimeout(() => {
    document.querySelector('.dimmer').style.display = 'flex';
    endModal.style.display = 'grid';
  }, 300);
}

document.querySelector('.restartButton').addEventListener('click', (e) => {
  const endModal = document.querySelector('.endModal');

  setTimeout(() => {
    document.querySelector('.dimmer').style.display = 'none';
    endModal.style.display = 'none';
  }, 300);
  newGame();
});

userform.addEventListener('submit', e => {
  e.preventDefault();
  let symIn = document.querySelector('.symbolIn');

  symIn.value = '';
});