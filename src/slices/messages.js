/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { actions as channelsActions } from './channels.js';

const slice = createSlice({
  name: 'messages',
  initialState: { byId: [], allIds: [] },
  reducers: {
    setMessages: (state, { payload }) => {
      const { messages } = payload;
      return {
        byId: Object.fromEntries(messages.map((message) => [message.id, message])),
        allIds: messages.map((message) => message.id),
      };
    },

    addMessage: (state, { payload }) => {
      const { message } = payload;
      state.byId[message.id] = message;
      state.allIds.push(message.id);
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: (state, { payload }) => {
      const { id: channelId } = payload;
      return {
        byId: _.omitBy(state.byId, (m) => m.channelId === channelId),
        allIds: state.allIds.filter((id) => state.byId[id].channelId !== channelId),
      };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
