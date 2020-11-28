import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

console.log(document.getElementById('chat'));

const { channels, messages } = gon;

ReactDOM.render(
  <App channels={channels} messages={messages}/>,
  document.getElementById('chat')
);
