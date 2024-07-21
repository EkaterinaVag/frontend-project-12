import { useGetMessagesQuery, useSendMessageMutation } from "../api/chatApi";
import { useSelector } from "react-redux";

const Messages = () => {
  const currentChannel = useSelector(
    (state) => state.currentChannel.currentChannel
  );
  const { data: messages, isLoading: messagesLoading } = useGetMessagesQuery();

  const [
    addMessage,
    { isLoading: sendMessageLoading, error: sendMessageError },
  ] = useSendMessageMutation();

  const username = useSelector((state) => state.auth.username);

  const channelMessages = messages?.filter(
    (message) => message.channelId === currentChannel.id
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = {
      body: event.target.body.value,
      channelId: currentChannel.id,
      username: username,
    };

    try {
      await addMessage(newMessage);
      event.target.body.value = "";
    } catch (error) {
      console.error("Error adding message:", sendMessageError);
    }
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {currentChannel.name}</b>
          </p>
          <span className="text-muted">
            {channelMessages && channelMessages.length} сообщений
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messagesLoading && <p>Загрузка сообщений...</p>}
          {channelMessages &&
            channelMessages.map((message) => (
              <div key={message.id}>
                <strong>{message.username}</strong>: {message.body}
              </div>
            ))}
        </div>

        <div className="mt-auto px-5 py-3">
          <form
            noValidate=""
            className="py-1 border rounded-2"
            onSubmit={handleSubmit}
          >
            <div className="input-group has-validation">
              <input
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
              />
              <button
                type="submit"
                disabled={sendMessageLoading}
                className="btn btn-group-vertical"
              >
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
