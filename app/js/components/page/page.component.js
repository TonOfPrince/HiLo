import React, {Component} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import styles from './page.module.css';

const Page = props => <div className = {styles.page}>
</div>;

export const PageView = observer(Page);
