import React                from 'react';
import ReactDOM             from 'react-dom';
import './index.css';
import App                  from './App';
import * as serviceWorker   from './serviceWorker';

import axios                from 'axios'
import { BrowserRouter }    from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


// Request Base URL
// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = 'https://salty-gorge-73556.herokuapp.com/';


// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, 
                document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
