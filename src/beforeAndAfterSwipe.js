import React from 'react';
import ReactDOM from 'react-dom';
import './beforeAndAfterSwipe.less';

export default class BeforeAndAfterSwipe {
    constructor(config) {
        this.container = config.container;
    }

    render(authorData) {
        var greeting = `Hello ${authorData.name}, I am a before and after swipe enthraler!`;
        ReactDOM.render(
            <h1>{greeting}</h1>,
            this.container
        );
    }
}
