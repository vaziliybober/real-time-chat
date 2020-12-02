import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import gon from 'gon';
import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import faker from 'faker';
import { io } from 'socket.io-client';
import App from './components/App.jsx';
import UserNameContext from './contexts/UserNameContext.js';
import actions from './actions/index.js';
import reducer from './reducers/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = configureStore({
  reducer,
});

store.dispatch(actions.setChannels({ channels: gon.channels }));
store.dispatch(actions.setMessages({ messages: gon.messages }));
store.dispatch(actions.setCurrentChannelId({ id: gon.channels[0].id }));

const socket = io();
socket.on('newMessage', (data) => {
  const message = data.data.attributes;
  store.dispatch(actions.addMessage({ message }));
});

const userName = Cookies.get().userName ?? Cookies.set('userName', faker.name.findName());

ReactDOM.render(
  <Provider store={store}>
    <UserNameContext.Provider value={userName}>
      <App />
    </UserNameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
