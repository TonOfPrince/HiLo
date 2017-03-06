import React, {Component} from 'react';
import {observer} from "mobx-react";
import styles from './button.module.css';

class Button extends Component {

    render() {
        let {text, isDisabled, onClick} = this.props;
        let className = isDisabled ? styles.disabled : styles.button;
        onClick = isDisabled ? _.noop : onClick;
        return <div onClick = {onClick} className = {className}>
            {text}
        </div>;
    }
}

Button.defaultProps = {
    isDisabled: false,
};

export const ButtonView = observer(Button);
