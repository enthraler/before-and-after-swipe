import React from 'react';
import ReactDOM from 'react-dom';
import './hello.less';

export default class Hello {
    constructor(config) {
        this.container = config.container;
    }

    render(authorData) {
        var greeting = `Hello ${authorData.name}, I am an AMD JS Module compiled with Webpack, Babel and React!`;
        ReactDOM.render(
            <h1>{greeting}</h1>,
            this.container
        );
    }
}
