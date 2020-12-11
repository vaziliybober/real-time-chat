/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const slice = createSlice({
  name: 'channels',
  initialState: {
    byId: [], allIds: [], currentId: null, defaultId: null,
  },
  reducers: {
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
        currentId: id === state.currentId ? state.defaultId : state.currentId,
        defaultId: state.defaultId,
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
