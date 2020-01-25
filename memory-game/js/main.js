import {
  symbols
} from './symbols.js';
import {
  Card
} from './Cards.js';
import {
  GameClock
} from './gameClock.js';
import {
  Game
} from './Game.js';

const userform = document.querySelector('.userform');
document.querySelector('.endModal').style.display = 'none';

//*  page initialization stuff
let game = new Game(document.querySelector('.game-grid'));
const clock = new GameClock;
let prevTarget;
//* End page initialization stuff


//* Handles card select state, routes cards for match testing if appropriate
function handleCardSelect(event) {
  let card = event.target;

  const selectCard = (card) => { //adds clicked card to selected array
    card.classList.add('selected');
    game.selected.push(card);
  }

  if (card === prevTarget && card.classList.contains('selected')) { //! Tests if card already selected, deselects if so
    card.classList.remove('selected');
    game.selected.splice(game.selected.indexOf(card), 1);
    prevTarget = '';
  } else if (game.selected.length === 0 && card !== prevTarget) { //! tests if selected card is first or second selection, if first just adds to array
    selectCard(card);
    prevTarget = card;
  } else if (game.selected.length === 1 && card !== prevTarget) { //! if card is not 1st selected and not already selectd, test for matching symbols
    selectCard(card);
    checkSelected(game.selected);
    prevTarget = card;
  } else if (game.selected.length === 2) { //! this shouldnt happen
    checkSelected(game.selected);
    prevTarget = card;
  }

}

//* Manages general card and card array states
const checkSelected = cardPair => {
  let [card1, card2] = cardPair;
  let deckCheck;

  if (card1.textContent === card2.textContent) { //! a match is made!
    cardPair.forEach(card => {
      let sym = card.textContent;
      setTimeout(() => { //remove selected class, replace with matched. then remove event lsiteners
        card.classList.remove('selected');
        card.classList.add('matched');
      }, 1000);
      card.removeEventListener('click', handleCardSelect);

      let cardObjIndex = game.deck.cards //! get index of card object wtih matching symbol as that of clicked card div
        .findIndex(cardObj => {
          return cardObj.cardSymbol == sym;
        });
      let matchedCard = game.deck.cards.splice(cardObjIndex, 1); //! move said card to matched array (out of deck)
      matchedCard.isMatched = true;
      game.matched.push(matchedCard);
      game.deck.updateDeckSize();

      //!after each match is made, test if deck is depleted/game over or not
      deckCheck = game.deck.cards.length == 0 ? 'allCardsMatched' : '';
    });

  } else { //! if no match, jsut remove the selected class (puts it back into play)
    cardPair.forEach(card => {
      setTimeout(() => {
        card.classList.remove('selected');
        card.classList.add('noMatch');
      }, 250);
      setTimeout(() => { //remove selected class, replace with matched. then remove event lsiteners
        card.classList.remove('noMatch');
      }, 1000);

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
  console.log(game);

}

const cardMaker = (cSymbol) => {
  let cardClass = `cell${cSymbol}`;
  let newCard = new Card(cardClass, cSymbol, handleCardSelect);
  game.countCard();
  return newCard;
}

//*
//* End of  game functions
//*

const buildDeck = cardSymbols => { //! takes array of symbols, calls cardMaker on each, then adds each to game.deck. deck then duplicates to create matches
  cardSymbols.forEach(symbol => {
    game.deck.generateCard(cardMaker(symbol, 'game-grid'));
  });
  game.deck.createMatchingCards();
}

const newGame = () => {
  document.querySelector('.game-grid').innerHTML = '';

  game.resetGame();
  buildDeck(symbols);
  game.deck.shuffle();
  game.setBoard();

  // allCards = document.querySelectorAll('.grid-cell');
  // addHandlers();
  clock.start(document.querySelector('.time-counter'))
}

//TODO move into a module for UI updates (modal module maybe)
const displayStats = () => {
  const endModalTop = document.querySelector('.endModalTop');
  const starsDisplay = document.querySelector('.starsDisplay');
  const historyDisplay = document.querySelector('.gameHistoryDisplay');

  let pastGamesCount = game.gameHistory.length;
  historyDisplay.textContent = `Total Games ${pastGamesCount}`;

  let playerStars = game.stars;
  starsDisplay.textContent = playerStars;
}

const endGame = () => {
  const endModal = document.querySelector('.endModal');
  game.gameTime = clock.finalTime;
  game.gameOver();
  displayStats();
  document.querySelector('.game-grid').innerHTML = '';
  document.querySelector('.turns-counter').innerHTML = '0';

  setTimeout(() => {
    document.querySelector('.dimmer').style.display = 'flex';
    endModal.style.display = 'grid';
  }, 300);
  console.log(game);
}

document.querySelector('.newGameButton').addEventListener('click', e => {
  setTimeout(() => {
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.dimmer').style.display = 'none';

  }, 300);

  newGame();
})

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

