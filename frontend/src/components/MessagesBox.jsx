import React, { useEffect, useRef } from 'react';

import Spinner from './Spinner';

const MessagesBox = ({ channelMessages, isLoading }) => {
  const messagesRef = useRef(null);
  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [channelMessages]);

  return (
    <div
      ref={messagesRef}
      id="messages-box"
      className="chat-messages overflow-auto px-5"
    >
      {isLoading && <Spinner />}
      {channelMessages?.map((message) => (
        <div key={message.id}>
          <strong>{message.username}</strong>
          :
          {' '}
          {message.body}
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
