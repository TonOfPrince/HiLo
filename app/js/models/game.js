import _ from 'lodash';
import {Player} from './player';
import {Card} from './card';
import {Deck} from './deck';

const PAGE = 'page';
const PLAYER_ONE = 'playerOne';
const PLAYER_TWO = 'playerTwo';
const TOP_CARD = 'topCard';
const REMAINING = 'remaining';
const POINTS_AVAILABLE = 'pointsAvailable';
const CONTROLS = 'controls';

export class Game {
    constructor(updateViews) {
        let playerOne = new Player(1)
        this.state = {
            playerOne,
            playerTwo: new Player(2),
            activePlayer: playerOne,
            topCard: {},
            pointsAvailable: 0,
            deck: new Deck({remaining: 52}),
            correctConsecutiveGuesses: 0,
        }
        this.updateViews = updateViews;
    }

    updateState(newState) {
        _.forIn(newState, (value, key) => this.state[key] = value);
        this.updateViews();
    }

    startNewGame() {
        this.fetchDeck()
            .then(() => this.drawCard())
            .then(({cards, remaining}) => {
                let {deck} = this.state;
                deck.updateRemaining(remaining);
                this.updateState({
                    topCard: new Card(cards[0]),
                    pointsAvailable: 1,
                });
            });
    }

    fetchDeck() {
        return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(response => response.json())
            .then(({deck_id, remaining}) => this.updateState({
                deck: new Deck({deck_id, remaining})
            }));
    }

    drawCard() {
        let {deckId, pointsAvailable, deck} = this.state;
        return fetch(`https://deckofcardsapi.com/api/deck/${deck.deckID}/draw/?deck_count=1`)
            .then(response => response.json());
    }

    checkHi() {
        let {topCard, pointsAvailable, deck, activePlayer, correctConsecutiveGuesses} = this.state;
        this.drawCard()
            .then(({cards, remaining}) => {
                let newCard = new Card(cards[0]);
                let isNewCardGreater = newCard.isGreaterThan(topCard);
                let newState = {topCard: newCard};
                _.extend(newState, {
                    pointsAvailable: isNewCardGreater ? pointsAvailable + 1 : 1,
                    correctConsecutiveGuesses: isNewCardGreater ? correctConsecutiveGuesses + 1 : 0,
                });
                if (!isNewCardGreater) {
                    activePlayer.addPoints(pointsAvailable);
                }
                deck.updateRemaining(remaining);
                this.updateState(newState)
            });
    }

    checkLo() {
        let {topCard, pointsAvailable, deck, activePlayer, correctConsecutiveGuesses} = this.state;
        this.drawCard()
            .then(({cards, remaining}) => {
                let newCard = new Card(cards[0]);
                let isNewCardLess = newCard.isLessThan(topCard);
                let newState = {topCard: newCard};
                _.extend(newState, {
                    pointsAvailable: isNewCardLess ? pointsAvailable + 1 : 1,
                    correctConsecutiveGuesses: isNewCardLess ? correctConsecutiveGuesses + 1 : 0,
                });
                if (!isNewCardLess) {
                    activePlayer.addPoints(pointsAvailable);
                }
                deck.updateRemaining(remaining);
                this.updateState(newState)
            }); 
    }

    canPass() {
        let {correctConsecutiveGuesses} = this.state;
        return correctConsecutiveGuesses >= 3;
    }

    pass() {
        let {activePlayer, playerOne, playerTwo} = this.state;
        if (this.canPass()) {
            this.updateState({
                activePlayer: playerOne.isActive(activePlayer) ? playerTwo : playerOne,
                correctConsecutiveGuesses: 0,
            });
        }
    }

    resetGame() {
        let {playerOne, playerTwo} = this.state;
        playerOne.resetPoints();
        playerTwo.resetPoints();
        this.startNewGame();
    }
}