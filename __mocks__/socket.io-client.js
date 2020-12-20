const callbacks = {};

export const getCallback = (name) => callbacks[name];

export const io = () => ({
  on: (name, callback) => {
    callbacks[name] = callback;
  },
});
