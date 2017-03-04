import React, {Component} from 'react';
import styles from './card.module.css';

export class Card extends Component {

    render() {
    	let {card} = this.props;
        return <div className = {styles.card}>
        	<img src = {card.image} />
        </div>
    }
}
