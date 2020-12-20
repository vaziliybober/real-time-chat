const generalChannelId = 1;
const randomChannelId = 2;

export default {
  channels: [
    { id: generalChannelId, name: 'general', removable: false },
    { id: randomChannelId, name: 'random', removable: false },
  ],
  messages: [],
  currentChannelId: generalChannelId,
};
