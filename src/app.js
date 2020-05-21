import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import configureStore from './store/configureStore';
import { loadCharacters } from './actions';
const store = configureStore();

const template = (
    <>
        <h1>Hola mundo</h1>
        <button onClick={()=>{
            store.dispatch(loadCharacters("Spider", [], [], true));
        }}>Load</button>
    </>
);
ReactDOM.render(template, document.getElementById('app'));
