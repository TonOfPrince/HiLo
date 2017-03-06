import React, {Component} from 'react';
import {observer} from "mobx-react";
import styles from './card.module.css';

class Card extends Component {

    render() {
        let {card} = this.props;
        return <div className = {styles.card}>
            <img src = {card.image} />
        </div>
    }
}

export const CardView = observer(Card);
