import React from 'react';
import Channels from './Channels';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';

const App = () => (
  <div className="row h-100 pb-3">
    <div className="col-3 border-right">
      <Channels />
    </div>
    <MessageBox>
      <MessageForm />
    </MessageBox>
  </div>
);

export default App;
