import React, {Component} from 'react';
import {render} from 'react-dom';
import {PageView} from './page/page.component';

const Main = props => <PageView />;

render((<Main />), document.getElementById('app'));
