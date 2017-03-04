import React, {Component} from 'react';
import {render} from 'react-dom';
import _ from 'lodash';
import {Button} from '../button/button.component';

export class Controls extends Component {

    render() {
        let {game} = this.props;
        let passIsDisabled = !game.canPass();
        return <div>
            {/* high */}
            <Button onClick = {() => game.checkHi()} text = "HI"/>
            {/* lo*/}
            <Button onClick = {() => game.checkLo()} text = "LO"/>
            {/* pass*/}
            <Button onClick = {() => game.pass()} text = "Pass" isDisabled = {passIsDisabled}/>
            {/* reset*/}
            <Button onClick = {() => game.resetGame()} text = "Reset"/>
        </div>;
    }
}
