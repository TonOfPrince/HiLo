import React, {Component} from 'react';
import {observer} from 'mobx-react';

class Status extends Component {

    render() {
    	let {player, game} = this.props;
    	let playerIsActive = player.isActive(game.activePlayer);
        let gameIsOver = game.isOver;

        if (gameIsOver) {
            let playerStatus = game.getPlayerStatus(player);
            switch(playerStatus) {
            case 'win':
                return <div>You win!</div>;
            case 'lose':
                return <div>You lose!</div>
            case 'tie':
                return <div>You tie!</div>
            }
        } else if (playerIsActive) {
            return <div>It's your turn!</div>
        } else {
            return false;
        }
    }
}

export const StatusView = observer(Status);
