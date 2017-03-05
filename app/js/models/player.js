import { action, extendObservable } from 'mobx';

export class Player {
    constructor(id) {
        extendObservable(this, {
            points: 0,
            playerID: id,
            addPoints: action('add points to player', newPoints => {
                this.points += newPoints;
            }),
            resetPoints: action('set points back to 0', () => this.points = 0),
        })
    }

    isActive(player) {
        return player.playerID === this.playerID;
    }

};
