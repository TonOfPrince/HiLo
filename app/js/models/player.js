import { action, extendObservable } from 'mobx';

export class Player {
    constructor(id) {
        extendObservable(this, {
            points: 0,
            playerID: id,
            name: '',
            addPoints: action('add points to player', newPoints => {
                this.points += newPoints;
            }),
            resetPoints: action('set points back to 0', () => this.points = 0),
            updateName: action('update name', val => this.name = val),
        })
    }

    isActive(player) {
        return player.playerID === this.playerID;
    }

};
