import Spinner from './Spinner';

const MessagesBox = ({ channelMessages, isLoading }) => (
  <div id="messages-box" className="chat-messages overflow-auto px-5">
    {isLoading && <Spinner />}
    {channelMessages
      && channelMessages.map((message) => (
        <div key={message.id}>
          <strong>{message.username}</strong>
          :
          {message.body}
        </div>
      ))}
  </div>
);

export default MessagesBox;
