import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'

const store = configureStore();

const jsx =  (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
