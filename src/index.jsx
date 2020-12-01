import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

console.log(document.getElementById('chat'));

const actions = {
  setChannels: createAction('CHANNEL_SET'),
  setMessages: createAction('MESSAGE_SET')
};

const channels = createReducer({ byId: [], allIds: [] }, {
  [actions.setChannels]: (state, { payload } ) => ({
    byId: Object.fromEntries(payload.channels.map((channel) => [channel.id, channel])),
    allIds: payload.channels.map((channel) => channel.id),
  })
});

const messages = createReducer({ byId: [], allIds: [] }, {
  [actions.setMessages]: (state, { payload }) => ({
    byId: Object.fromEntries(payload.messages.map((message) => [message.id, message])),
    allIds: payload.messages.map((message) => message.id),
  })
});

const store = configureStore({
  reducer: { channels, messages }
});

store.dispatch(actions.setChannels({ channels: gon.channels }));
//store.dispatch(actions.setMessages({ channels: gon.messages }));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('chat'),
);
