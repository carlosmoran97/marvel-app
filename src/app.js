import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import axios from 'axios'
axios.get(`${process.env.MARVEL_API_URL}/characters?apikey=${process.env.MARVEL_PUBLIC_KEY}`).then((value)=>{
    console.log(value);
});
const template = <h1>Hola mundo</h1>;
ReactDOM.render(template, document.getElementById('app'));
