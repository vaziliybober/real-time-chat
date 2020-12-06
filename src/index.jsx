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
import plugRollbar from './rollbar.js';
import App from './components/App.jsx';
import AppContext from './contexts/AppContext.js';
import reducer, { actions } from './slices/index.js';

plugRollbar(process.env.NODE_ENV || 'development');

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = configureStore({
  reducer,
});

const socket = io();
socket.on('newMessage', (data) => {
  const message = data.data.attributes;
  store.dispatch(actions.addMessage({ message }));
});
socket.on('newChannel', (data) => {
  const channel = data.data.attributes;
  store.dispatch(actions.addChannel({ channel }));
});
socket.on('removeChannel', (data) => {
  const { id } = data.data;
  store.dispatch(actions.removeChannel({ id }));
});
socket.on('renameChannel', (data) => {
  const channel = data.data.attributes;
  store.dispatch(actions.renameChannel({ channel }));
});

const getOrCreateUserName = () => {
  const cookieValue = Cookies.get().userName;
  if (!cookieValue) {
    const userName = faker.name.findName();
    Cookies.set('userName', userName);
    return userName;
  }

  return cookieValue;
};

const generalChannelId = gon.channels[0].id;
store.dispatch(actions.setChannels({ channels: gon.channels, currentId: generalChannelId }));
store.dispatch(actions.setMessages({ messages: gon.messages }));

const appContextValue = {
  userName: getOrCreateUserName(),
  generalChannelId,
};

ReactDOM.render(
  <Provider store={store}>
    <AppContext.Provider value={appContextValue}>
      <App />
    </AppContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
