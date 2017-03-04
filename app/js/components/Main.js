import React, {Component} from 'react';
import {render} from 'react-dom';
import _ from 'lodash';
import {Button} from './button/button.component';
import {Card} from './card/card.component';
import {Score} from './score/score.component';
import {Controls} from './controls/controls.component';
import {Player} from './player/player.component';
import {CardModel} from '../models/card';
import {Game} from '../models/game';
import styles from './main.module.css';

class Main extends Component {

    componentWillMount() {
        this.game = new Game(() => this.forceUpdate());
        this.game.startNewGame();
    }

    render() {
        let {playerOne, topCard, deck, pointsAvailable, playerTwo} = this.game.state;
        return <div className = {styles.page}>
            <Player
                player = {playerOne}
                game = {this.game}
            />
            <div>
                {/* card */}
                <Card card = {topCard} />
                {/* cards remain*/}
                <div> remaining {deck.remaining}
                </div>
                {/* points available*/}
                <div> pointsAvailable {pointsAvailable}
                </div>

                <Controls game = {this.game} />
            </div>
            <Player
                player = {playerTwo}
                game = {this.game}
            />
        </div>;
    }
}

render((<Main />), document.getElementById('app'));
