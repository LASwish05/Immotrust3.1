import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';

import { StateContextProvider } from './context';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider activeChain='goerli' clientId='6307c0bb8fcceae10d5804f3c94e3c0e'>
        <Router>
        <StateContextProvider>
            <App />
        </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)