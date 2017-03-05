import {action, extendObservable} from 'mobx';

export class Deck {

    constructor({remaining = 52, deck_id = ''}) {
        extendObservable(this, {
            remaining,
            deckID: deck_id,
            updateRemaining: action('update number remaining in deck', newRemaining => {
                this.remaining = newRemaining;
            }),
            updateDeckID: action('update the decks id', newDeckID => {
                this.deckID = newDeckID
            })
        })
    }

};
