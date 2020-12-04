import { createAction } from '@reduxjs/toolkit';

const actions = {
  setCurrentChannelId: createAction('CHANNEL_CURRENT_ID_SET'),
  setChannels: createAction('CHANNELS_SET'),
  addChannel: createAction('CHANNEL_ADD'),
  removeChannel: createAction('CHANNEL_REMOVE'),
  renameChannel: createAction('CHANNEL_RENAME'),
  setMessages: createAction('MESSAGES_SET'),
  addMessage: createAction('MESSAGE_ADD'),
};

export default actions;
