const cardMapping = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
};

export class Card {
    constructor({code, image, images, suit, value}) {
        this.code = code;
        this.image = image;
        this.images = images;
        this.suit = suit;
        this.value = value;
    }

    isGreaterThan(otherCard) {
        return cardMapping[this.value] > cardMapping[otherCard.value]
    }

    isLessThan(otherCard) {
        return cardMapping[this.value] < cardMapping[otherCard.value]
    }

};
