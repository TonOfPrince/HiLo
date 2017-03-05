import {action, extendObservable} from 'mobx';

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

    constructor({value, image}) {
        extendObservable(this, {
            value,
            image,
            isGreaterThan: action('is card greater than another card', (otherCard) => {
                return cardMapping[this.value] > cardMapping[otherCard.value];
            }),
            isLessThan: action('is card less than another card', (otherCard) => {
                return cardMapping[this.value] < cardMapping[otherCard.value];
            }),
        })
    }

};
