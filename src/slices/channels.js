/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const slice = createSlice({
  name: 'channels',
  initialState: { byId: [], allIds: [], currentId: null },
  reducers: {
    setChannels: (state, { payload }) => {
      const { channels, currentId } = payload;
      return {
        byId: Object.fromEntries(channels.map((channel) => [channel.id, channel])),
        allIds: channels.map((channel) => channel.id),
        currentId,
      };
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentId = payload.id;
    },
    addChannel: (state, { payload }) => {
      const { channel } = payload;
      state.byId[channel.id] = channel;
      state.allIds.push(channel.id);
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      return {
        byId: _.omit(state.byId, id),
        allIds: _.without(state.allIds, id),
        currentId: id === state.currentId ? null : state.currentId,
      };
    },
    renameChannel: (state, { payload }) => {
      const { channel } = payload;
      state.byId[channel.id] = channel;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
