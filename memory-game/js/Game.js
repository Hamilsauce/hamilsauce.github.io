import {
  Deck,
  Card
} from './Cards.js';

//* Class managing game state
export class Game {
  constructor(gameBoard) {
    this.gameHistory = this.getHistory(),
    this.gameBoard = gameBoard,
      this.selected = [],
      this.matched = [],
      this.turns = 0,
      this.stars,
      this.playerName = '',
      this.playedOn = new Date().toDateString(),
      this.playedAt = new Date().toLocaleTimeString(),
      this.deck = this.newDeck()
  }
  newDeck() {
    let deck = new Deck();
    return deck;
  }
  setBoard() {
    this.deck.cards.forEach(card => {
      this.gameBoard.appendChild(card.renderSelf());
    })
  }
  countCard() {
    this.cardCount++;
  }
  addTurn() {
    this.turns++;
    return this.turns;
  }
  gameOver() {
    let check = this.deck.deckSize === 0 ?
      true : false;

    if (check === true) {
      this.getPlayerName();
      this.calculateStars();
      this.saveGame();
      this.getHistory();
    }
    return check;
  }
  resetGame() {
    this.turns = 0;
    this.cardCount = 0;
    this.matched = [];
    this.gameTime = '0:00';
    this.deck.length = 0;
  }
  getPlayerName() {
    let name = prompt('Enter name: ');
    this.playerName = name.length === 0 ? 'Anon' : name;
  }
  calculateStars() {
    const starsDisplay = document.querySelector('.starsDisplay');
    const perfectGame = this.matched.length / 2;
    let actualGame = this.turns;

    if (actualGame / perfectGame <= 1.6) {
      starsDisplay.style.color = 'rgba(53, 163, 39, 0.904)';
      console.log(actualGame / perfectGame);
      this.stars = 3;
    } else if (actualGame / perfectGame <= 2) {
      starsDisplay.style.color = 'rgba(189, 162, 40, 0.904)';
      console.log(actualGame / perfectGame);
      this.stars = 2;
    } else {
      starsDisplay.style.color = 'rgba(189, 40, 40, 0.904)';
      console.log(actualGame / perfectGame);
      this.stars = 1;
    }
  }
  saveGame() {
    let gameId = this.gameHistory.length + 1
    let newSave = {
      id: gameId,
      gameDate: this.playedOn,
      playerName: this.playerName,
      elapsedTime: this.gameTime,
      stars: this.stars,
      deckSize: this.matched.length,
      playerTurns: this.turns
    }
    console.log('new game');
    console.log(newSave);

    firebase.database().ref("gameHistory/" + newSave.id).update(newSave);
  }
  async getHistory() {
    const snapshot = await firebase.database().ref('/gameHistory/').once('value');
    this.gameHistory = Object.values(snapshot.val())
      .sort((a, b) => {
        if (a.id > b.id) {
          return -1;
        } else if (a.id < b.id) {
          return 1;
        } else {
          return 0;
        }
      });
    sessionStorage.setItem('gameHistory', JSON.stringify(this.gameHistory));
    // console.log(this.gameHistory);
  }
}

{
  Game
}