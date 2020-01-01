import { Deck } from './Cards.js';

export class Game {
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
        return deck;
    }
    gameOver() {
        let check = this.matched.length === this.cardCount ?
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
}

{Game}