import 'github-markdown-css/github-markdown.css';
import '@bndynet/dialog/dist/dialog.css';
import '@bndynet/dialog-themes/dist/dialog-dark.css';
import './styles/default.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './redux';

import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.querySelector('#app'),
);
