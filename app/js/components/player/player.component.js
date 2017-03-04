import React, {Component} from 'react';
import styles from './player.module.css';

export class Player extends Component {

    render() {
    	let {player, game} = this.props;
    	let playerIsActive = player.isActive(game.state.activePlayer);
        return <div className = {styles.player}>
        	<div>Player {player.playerID}</div>
            <div>Points: {player.points}</div>
            {
            	playerIsActive ?
            		<div>It's Your Turn!</div> :
            		false
            }
        </div>;
    }
}
