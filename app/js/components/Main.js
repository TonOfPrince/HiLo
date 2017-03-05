import React, {Component} from 'react';
import {render} from 'react-dom';
import {PageView} from './page/page.component';

class Main extends Component {

    render() {
        return <PageView />;
    }
}

render((<Main />), document.getElementById('app'));
