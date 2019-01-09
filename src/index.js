import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

import gamePlayReducer from './store/reducers/gamePlay';
import fieldReducer from './store/reducers/field';

const rootReducer = combineReducers({
    gamePlay: gamePlayReducer,
    field: fieldReducer
});

const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
    
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
