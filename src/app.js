import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import { PersistGate } from 'redux-persist/integration/react';
const { store, persistor} = configureStore();

const jsx =  (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
        </PersistGate>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
