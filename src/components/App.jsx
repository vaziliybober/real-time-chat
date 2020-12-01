import React from 'react';
import { connect } from 'react-redux';

const Channels = (props) => {
  const { channels } = props;
  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2"><span>Channels</span><button type="button" className="ml-auto p-0 btn btn-link">+</button></div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item"><button type="button" className="nav-link btn-block mb-2 text-left btn btn-light">{channel.name}</button></li>
        ))}
      </ul>
    </div>
  );
}

const Chat = (props) => {
  const { messages } = props;
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages.map((message) => <div key={message.id}><b>{messages.name}</b>: {messages.text}</div>)}
        </div>
        <div className="mt-auto">
          <form noValidate="" className="">
            <div className="form-group">
              <div className="input-group">
                <input onChange={(e) => { e.preventDefault(); }} name="body" aria-label="body" className="mr-2 form-control"/><button aria-label="submit" type="submit" className="btn btn-primary">Submit</button>
                <div className="d-block invalid-feedback">&nbsp;</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const App = (props) => {
  const { channels, messages } = props;

  return (
    <div className="row h-100 pb-3">
      <Channels channels={channels}></Channels>
      <Chat messages={messages}></Chat>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { channels, messages } = state;
  const props = {
    channels: channels.allIds.map((id) => channels.byId[id]),
    messages: messages.allIds.map((id) => messages.byId[id])
  };

  return props;
}

export default connect(mapStateToProps)(App);