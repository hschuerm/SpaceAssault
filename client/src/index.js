import React from 'react';
import { render } from 'react-dom';

import App from './app';

const rootElement = document.getElementById('root');

fetch("./config.json")
    .then(res => res.json())
    .then(config => render(
        <React.StrictMode>
            <App config={config} />
        </React.StrictMode>,
        rootElement
    ));