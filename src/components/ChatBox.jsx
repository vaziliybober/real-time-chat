import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

const ChatBox = (props) => {
  const chatBoxRef = useRef();
  useEffect(() => {
    const div = chatBoxRef.current;
    div.scrollTop = div.scrollHeight - div.clientHeight;
  });

  const { messages, children } = props;
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" ref={chatBoxRef} className="chat-messages overflow-auto mb-3">
          {messages.map((message) => (
            <div key={message.id}>
              <b>{message.userName}</b>
              :
              {' '}
              {message.text}
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
  const { messages: { allIds, byId } } = state;
  return {
    messages: allIds.map((id) => byId[id]),
  };
};

export default connect(mapStateToProps)(ChatBox);
