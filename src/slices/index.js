import { combineReducers } from 'redux';
import channels, { actions as channelsActions } from './channels.js';
import messages, { actions as messagesActions } from './messages.js';
import modals, { actions as modalsActions } from './modals.js';

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalsActions,
};

export { actions };

export default combineReducers({
  channels,
  messages,
  modals,
});
