/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modals',
  initialState: { name: '', args: {} },
  reducers: {
    setModal: (state, { payload }) => {
      const { name, args } = payload;
      state.name = name;
      if (args) state.args = args;
      else state.args = {};
    },
    closeModal: (state) => {
      state.name = '';
      state.args = {};
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
