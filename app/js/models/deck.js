export class Deck {
    constructor({remaining, deck_id}) {
        this.remaining = remaining;
        this.deckID = deck_id;
    }

    updateRemaining(remaining) {
        this.remaining = remaining;
    }

    updateDeckID(deckID) {
        this.deckID = deckID;
    }
};
