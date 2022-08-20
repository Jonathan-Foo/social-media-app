import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { legacy_createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; 
import {BrowserRouter as Router} from 'react-router-dom';
import GlobalStyle from './theme/GlobalStyle';
import reducers from './reducers';


const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <GlobalStyle />
        <Router>
            <App />
        </Router>
    </Provider>
);

