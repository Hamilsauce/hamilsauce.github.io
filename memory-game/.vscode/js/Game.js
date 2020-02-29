import {
    Deck,
    Card
} from './Cards.js';
// import * as firebase from 'firebase';

// var firebaseConfig = {
//     apiKey: "AIzaSyDlj4rmHO_kq3Z6ya2zqgGdP0AUg2znX9I",
//     authDomain: "memory-card-app.firebaseapp.com",
//     databaseURL: "https://memory-card-app.firebaseio.com",
//     projectId: "memory-card-app",
//     storageBucket: "memory-card-app.appspot.com",
//     messagingSenderId: "174804862889",
//     appId: "1:174804862889:web:64474a9820dd9d87c6e6b8",
//     measurementId: "G-9ENQL2QJRE"
// };
// firebase.initializeApp(firebaseConfig);

//* Class managing game state
export class Game {
    constructor(gameBoard) {
        this.gameBoard = gameBoard,
            this.selected = [],
            this.matched = [],
            this.turns = 0,
            // this.gameTime = '0:00',
            this.stars,
            this.playedOn = new Date().toDateString();
        this.playedAt = new Date().toLocaleTimeString();
        this.deck = this.newDeck(),
            this.gameHistory = this.getHistory();
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
        this.deck.length = 0;
    }
    calculateStars() {
        const perfectGame = this.matched.length / 2;
        let actualGame = this.turns;

        if (actualGame / perfectGame <= 1.6) {
            console.log(actualGame / perfectGame);

            this.stars = 3;
        } else if (actualGame / perfectGame <= 2) {
            console.log(actualGame / perfectGame);

            this.stars = 2;
        } else {
            console.log(actualGame / perfectGame);

            this.stars = 1;
        }
    }
    saveGame() {
        let gameId = this.gameHistory.length
        let newSave = {
            id: gameId,
            gameDate: this.playedOn,
            elapsedTime: this.gameTime,
            stars: this.stars,
            deckSize: this.matched.length,
            playerTurns: this.turns
        }
        this.gameHistory.push(newSave);
        localStorage.setItem('gameHistory', JSON.stringify(this.gameHistory));
    }
    getHistory() {
        let history = localStorage.getItem('gameHistory') ?
            JSON.parse(localStorage.getItem('gameHistory')) : [];
        return history;
    }
}

{
    Game
}