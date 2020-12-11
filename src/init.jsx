import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import gon from 'gon';
import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import Rollbar from 'rollbar';
import faker from 'faker';
import { io } from 'socket.io-client';
import App from './components/App.jsx';
import AppContext from './contexts/AppContext.js';
import reducer, { actions } from './slices/index.js';

export default () => {
  new Rollbar({
    accessToken: "9fd42b56bd4e4003aebf42e15e27d794",
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        environment: process.env.NODE_ENV || 'development'
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const generalChannelId = gon.channels[0].id;
  const store = configureStore({
    reducer,
    preloadedState: {
      channels: {
        byId: Object.fromEntries(gon.channels.map((ch) => [ch.id, ch])),
        allIds: gon.channels.map((ch) => ch.id),
        currentId: generalChannelId,
      },
      messages: {
        byId: Object.fromEntries(gon.messages.map((m) => [m.id, m])),
        allIds: gon.messages.map((m) => m.id),
      },
    },
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

  // I think this part is imperative by nature
  /* eslint-disable functional/no-let */
  let { userName } = Cookies.get();
  if (!userName) {
    userName = faker.name.findName();
    Cookies.set('userName', userName);
  }
  /* eslint-enable functional/no-let */

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
};
