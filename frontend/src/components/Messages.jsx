import { useGetMessagesQuery, useAddMessageMutation } from "../messagesApi";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Messages = ({ channel }) => {
  const {
    data: messages,
    isLoading: messagesLoading,
  } = useGetMessagesQuery();

  const [addMessage, { isLoading: addMessageLoading, error: addMessageError }] =
    useAddMessageMutation();

  const username = JSON.parse(localStorage.getItem("username"));

  const channelMessages = messages?.filter(
    (message) => message.channelId === channel.id
  );

  const [socketMessages, setSocketMessages] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    const handelNewMessage = (payload) => setSocketMessages((prevMessages) => [...prevMessages, payload]);

    socket.on('newMessage', handelNewMessage);

    return () => socket.off('newMessage', handelNewMessage);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = {
      body: event.target.body.value,
      channelId: channel.id,
      username: username,
    };

    try {
      await addMessage(newMessage);
      event.target.body.value = "";
    } catch (error) {
      console.error("Error adding message:", addMessageError);
    }
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {channel.name}</b>
          </p>
          <span className="text-muted">0 сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messagesLoading && <p>Загрузка сообщений...</p>}
          {(channelMessages || []).concat(socketMessages).map((message) => (
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
                disabled={addMessageLoading}
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
