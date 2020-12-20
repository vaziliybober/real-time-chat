import { getCallback } from './socket.io-client.js';

export default () => ({
  emit: (name, data) => {
    getCallback(name)(data);
  },
});
