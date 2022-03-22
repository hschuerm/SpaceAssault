import React from 'react';
import { render } from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './app';

const theme = createTheme({
    palette: {
        mode: "dark"
    }
});


const rootElement = document.getElementById('root');

fetch("./config.json")
    .then(res => res.json())
    .then(config => render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <App config={config} />
            </ThemeProvider>
        </React.StrictMode>,
        rootElement
    ));