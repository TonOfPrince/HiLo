import React, {Component} from 'react';
import {observer} from "mobx-react";
import {ButtonView} from '../button/button.component';
import styles from './controls.module.css';

class Controls extends Component {

    render() {
        let {game} = this.props;
        let cantPass = !game.canPass;
        let gameisOver = game.isOver;
        return <div>
            <div className = {styles.group}>
                <ButtonView onClick = {() => game.checkHi()} text = "HI" isDisabled = {gameisOver}/>
                <ButtonView onClick = {() => game.checkLo()} text = "LO" isDisabled = {gameisOver}/>
            </div>
            <div className = {styles.group}>
                <ButtonView onClick = {() => game.pass()} text = "Pass" isDisabled = {gameisOver || cantPass}/>
                <ButtonView onClick = {() => game.resetGame()} text = "Reset"/>
            </div>
        </div>;
    }
}

export const ControlsView = observer(Controls);
