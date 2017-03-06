import React, {Component} from 'react';
import {observer} from "mobx-react";
import styles from './card.module.css';

class Card extends Component {

    render() {
        let {card, game} = this.props;
        return <div className = {styles.card}>
            {
                game.isLoading ?
                    <span>Loading...</span> :
                    <img src = {card.image} />
            }
        </div>
    }
}

export const CardView = observer(Card);
