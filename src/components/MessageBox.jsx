import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

const MessageBox = (props) => {
  const MessageBoxRef = useRef();
  useEffect(() => {
    const div = MessageBoxRef.current;
    div.scrollTop = div.scrollHeight - div.clientHeight;
  });

  const { messages, children } = props;
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" ref={MessageBoxRef} className="chat-messages overflow-auto mb-3">
          {messages.map((message) => (
            <div key={message.id}>
              <b>{message.userName}</b>
              {`: ${message.text}`}
            </div>
          ))}
        </div>
        <div className="mt-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { channels: { currentId }, messages: { allIds, byId } } = state;
  return {
    messages: allIds.map((id) => byId[id]).filter((m) => m.channelId === currentId),
  };
};

export default connect(mapStateToProps)(MessageBox);
