/* eslint-disable no-param-reassign */

import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import _ from 'lodash';
import actions from '../actions/index.js';

const currentChannelIdReducer = createReducer(null, {
  [actions.setCurrentChannelId]: (state, { payload }) => payload.id,
  [actions.removeChannel]: () => 1, // FIXME: what if it's not 1?
});

const channelsReducer = createReducer({ byId: [], allIds: [] }, {
  [actions.setChannels]: (state, { payload }) => {
    const { channels } = payload;
    return {
      byId: Object.fromEntries(channels.map((channel) => [channel.id, channel])),
      allIds: channels.map((channel) => channel.id),
    };
  },
  [actions.addChannel]: (state, { payload }) => {
    const { channel } = payload;
    state.byId[channel.id] = channel;
    state.allIds.push(channel.id);
  },
  [actions.removeChannel]: (state, { payload }) => {
    const { id } = payload;
    return {
      byId: _.omit(state.byId, id),
      allIds: _.without(state.allIds, id),
    };
  },
  [actions.renameChannel]: (state, { payload }) => {
    const { channel } = payload;
    state.byId[channel.id] = channel;
  },
});

const messagesReducer = createReducer({ byId: [], allIds: [] }, {
  [actions.setMessages]: (state, { payload }) => {
    const { messages } = payload;
    return {
      byId: Object.fromEntries(messages.map((message) => [message.id, message])),
      allIds: messages.map((message) => message.id),
    };
  },

  [actions.addMessage]: (state, { payload }) => {
    const { message } = payload;
    state.byId[message.id] = message;
    state.allIds.push(message.id);
  },

  [actions.removeChannel]: (state, { payload }) => {
    const { id: channelId } = payload;
    return {
      byId: _.omitBy(state.byId, (m) => m.channelId === channelId),
      allIds: state.allIds.filter((id) => state.byId[id].channelId !== channelId),
    };
  },
});

export default combineReducers({
  currentChannelId: currentChannelIdReducer,
  channels: channelsReducer,
  messages: messagesReducer,
});
