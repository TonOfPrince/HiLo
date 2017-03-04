export class Player {
    constructor(id) {
        this.points = 0;
        this.playerID = id;
    }

    addPoints(newPoints) {
        this.points += newPoints;
    }

    resetPoints() {
        this.points = 0;
    }

    isActive(player) {
        return player.playerID === this.playerID;
    }
};
