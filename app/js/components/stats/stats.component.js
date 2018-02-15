import React, {Component} from 'react';
import {observer} from "mobx-react";
import styles from './stats.module.css';

class Stats extends Component {

    render() {
        let {deck, pointsAvailable, numberOfGuessesLeft} = this.props.game;
        return <div className = {styles.stats}>
            <div> Cards remaining: {deck.remaining}</div>
            <div> Points on the line: {pointsAvailable}</div>
            <div> You need {numberOfGuessesLeft} to pass </div>
        </div>;
    }
}

export const StatsView = observer(Stats);
