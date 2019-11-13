import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '../App';

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

const isClient = typeof global.window !== 'undefined';
if (isClient) {
    global.window.onload = () => {
        ReactDOM.hydrate(
            React.createElement(
                BrowserRouter,
                {},
                React.createElement(
                    Route,
                    { component: App },
                ),
            ),
            global.document.getElementById('root'),
        );
    };
}

export = null
