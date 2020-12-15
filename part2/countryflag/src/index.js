import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';

/*
const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)
*/

axios.get('https://restcountries.eu/rest/v2/all').then(response => {
  const country = response.data
  ReactDOM.render(
    <App country={country} />,
    document.getElementById('root')
  )
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

