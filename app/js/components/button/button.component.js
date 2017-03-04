import React, {Component} from 'react';
import styles from './button.module.css';

export class Button extends Component {

    render() {
    	let {text, isDisabled} = this.props;
    	let className = isDisabled ? styles.disabled : styles.button;
        return <div onClick = {this.props.onClick} className = {className}>
            {text}
        </div>;
    }
}

Button.defaultProps = {
	isDisabled: false,
};
