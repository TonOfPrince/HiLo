import React, {Component} from 'react';
import {observer} from "mobx-react";
import _ from 'lodash';
import {CardView} from '../card/card.component';
import {ControlsView} from '../controls/controls.component';
import {PlayerView} from '../player/player.component';
import {StatsView} from '../stats/stats.component';
import gameStore from '../../models/game';
import styles from './page.module.css';

class Page extends Component {

    componentWillMount() {
        this.game = gameStore;
        this.game.startNewGame();
    }

    render() {
        let {playerOne, topCard, playerTwo} = this.game;
        return <div className = {styles.page}>
            <PlayerView
                player = {playerOne}
                game = {this.game}
            />
            <div>
                <CardView card = {topCard} />
                <StatsView game = {this.game} />
                <ControlsView game = {this.game} />
            </div>
            <PlayerView
                player = {playerTwo}
                game = {this.game}
            />
        </div>;
    }
}

export const PageView = observer(Page);
