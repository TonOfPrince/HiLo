import React, {Component} from 'react';
import {observer} from "mobx-react";
import {StatusView} from './subcomponents/status.component';
import styles from './player.module.css';

class Player extends Component {

    render() {
        let {player, game} = this.props;
        let playerIsActive = player.isActive(game.activePlayer);

        return <div className = {styles.player}>
            <div>Player {player.playerID}</div>
            <div>Points: {player.points}</div>
            <input onChange={e => {
            	console.log(e.target.value);
            	player.updateName(e.target.value);
            }}/>

            <div>Name: {player.name}</div>
            <StatusView player = {player} game = {game} />
        </div>;
    }
}

export const PlayerView = observer(Player);
