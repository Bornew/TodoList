import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyTodoList from './myTodoList';
import * as serviceWorker from './serviceWorker';

// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// If you want your app to work offline and load faster, you can change
ReactDOM.render(<MyTodoList />, document.getElementById('root'));
serviceWorker.unregister();



