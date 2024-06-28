import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.";
import { useNavigate } from "react-router-dom";
import { useGetChannelsQuery } from "../ChannelsApi";
import { useGetMessagesQuery } from "../MessagesApi";

const ChatPage = () => {
  const { data: channels, isLoading, error } = useGetChannelsQuery();
  const { data: messages } = useGetMessagesQuery();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    token ? authContext.logIn() : navigate("/login");
  }, [authContext, navigate]);

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error}`;

  return (
    <div class="container h-100 my-4 overflow-hidden rounded shadow">
      <div class="row h-100 bg-white flex-md-row">
        <div class="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div class="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button
              type="button"
              class="p-0 text-primary btn btn-group-vertical"
            >
              <span class="visually-hidden">+</span>
            </button>
          </div>
          <ul
            id="channels-box"
            class="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {channels && channels.map((channel) => (
              <li class="nav-item w-100">
                <button type="button" class="w-100 rounded-0 text-start btn">
                  <span class="me-1">#</span>
                  {channel.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div class="col p-0 h-100">
          <div class="d-flex flex-column h-100">
            <div class="bg-light mb-4 p-3 shadow-sm small">
              <p class="m-0">
                <b># general</b>
              </p>
              <span class="text-muted">0 сообщений</span>
            </div>
            {messages && messages.map((message) => (
              <div id="messages-box" class="chat-messages overflow-auto px-5 ">
                {message.body}
              </div>
            ))}
            <div class="mt-auto px-5 py-3">
              <form novalidate="" class="py-1 border rounded-2">
                <div class="input-group has-validation">
                  <input
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    class="border-0 p-0 ps-2 form-control"
                    value=""
                  />
                  <button
                    type="submit"
                    disabled=""
                    class="btn btn-group-vertical"
                  >
                    <span class="visually-hidden">Отправить</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
