import { action, computed, extendObservable } from 'mobx';
import _ from 'lodash';
import {Player} from './player';
import {Card} from './card';
import {Deck} from './deck';

class GameStore {

    constructor() {
        let playerOne = new Player(1);
        extendObservable(this, {
            playerOne,
            playerTwo: new Player(2),
            activePlayer: playerOne,
            topCard: {},
            pointsAvailable: 0,
            isLoading: false,
            deck: new Deck({remaining: 52}),
            correctConsecutiveGuesses: 0,
            startNewGame: action('starts a new game', () => {
                this.isLoading = true;
                return this.fetchDeck()
                    .then(() => this.drawCard())
                    .then(({cards, remaining}) => {
                        this.pointsAvailable = 1;
                        this.activePlayer = this.playerOne;
                        this.deck.updateRemaining(remaining);
                        this.topCard = new Card(cards[0]);
                        this.isLoading = false;
                    });
            }),
            fetchDeck: action('fetch a new deck', () => {
                return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
                    .then(response => response.json())
                    .then(({deck_id, remaining}) => this.deck = new Deck({deck_id, remaining}));
            }),
            checkHi: action('check if new card is higher than previous card', () => {
                this.isLoading = true;
                this.drawCard()
                    .then(({cards, remaining}) => {
                        let newCard = new Card(cards[0]);
                        let isNewCardGreater = newCard.isGreaterThan(this.topCard);
                        this.topCard = newCard;
                        if (!isNewCardGreater) {
                            this.activePlayer.addPoints(this.pointsAvailable);
                        }
                        this.correctConsecutiveGuesses = isNewCardGreater ? this.correctConsecutiveGuesses + 1 : 0;
                        this.pointsAvailable = isNewCardGreater ? this.pointsAvailable + 1 : 1;
                        this.deck.updateRemaining(remaining);
                        this.isLoading = false;
                    });
            }),
            checkLo: action('check if new card is lower than previous card', () => {
                this.isLoading = true;
                this.drawCard()
                    .then(({cards, remaining}) => {
                        let newCard = new Card(cards[0]);
                        let isNewCardLess = newCard.isLessThan(this.topCard);
                        this.topCard = newCard;
                        if (!isNewCardLess) {
                            this.activePlayer.addPoints(this.pointsAvailable);
                        }
                        this.correctConsecutiveGuesses = isNewCardLess ? this.correctConsecutiveGuesses + 1 : 0;
                        this.pointsAvailable = isNewCardLess ? this.pointsAvailable + 1 : 1;
                        this.deck.updateRemaining(remaining);
                        this.isLoading = false;
                    });
            }),
            pass: action('pass play to other player', () => {
                if (this.canPass) {
                    this.activePlayer = this.playerOne.isActive(this.activePlayer) ?
                        this.playerTwo :
                        this.playerOne;
                    this.correctConsecutiveGuesses = 0;
                }
            }),
            canPass: computed(() => this.correctConsecutiveGuesses >= 3),
            isOver: computed(() => this.deck.remaining === 0),

        });
    }

    drawCard() {
        return fetch(`https://deckofcardsapi.com/api/deck/${this.deck.deckID}/draw/?deck_count=1`)
            .then(response => response.json());
    }

    getPlayerStatus(player) {
        let winnerID;
        if (this.playerOne.points > this.playerTwo.points) {
            winnerID = 1;
        } else if (this.playerOne.points < this.playerTwo.points) {
            winnerID = 2;
        } else {
            return 'tie';
        }
        if (player.playerID === winnerID) {
            return 'win';
        } else {
            return 'lose';
        }
    }

    resetGame() {
        this.playerOne.resetPoints();
        this.playerTwo.resetPoints();
        this.startNewGame();
    }
};

const gameStore = new GameStore();

export default gameStore;
export { GameStore };
