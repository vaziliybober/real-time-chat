import React from 'react';
import Channels from './Channels';
import ChatBox from './ChatBox';
import MessageForm from './MessageForm';

const App = () => (
  <div className="row h-100 pb-3">
    <Channels />
    <ChatBox>
      <MessageForm />
    </ChatBox>
  </div>
);

export default App;
