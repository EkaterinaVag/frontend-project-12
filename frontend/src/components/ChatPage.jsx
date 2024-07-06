import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGetChannelsQuery } from "../api/chatApi";
import Messages from "./Messages";

const ChatPage = () => {
  const { data: channels, isLoading, error } = useGetChannelsQuery();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeChannel, setActiveChannel] = useState({
    id: "1",
    name: "general",
    removable: false,
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    token ? authContext.logIn() : navigate("/login");
  }, [authContext, navigate]);

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error}`;

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
            >
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul
            id="channels-box"
            className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {channels &&
              channels.map((channel) => (
                <li className="nav-item w-100" key={channel.id}>
                  <button
                    type="button"
                    className={`w-100 rounded-0 text-start btn ${
                      activeChannel.id === channel.id ? "btn-secondary" : ""
                    }`}
                    onClick={() => setActiveChannel(channel)}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <Messages channel={activeChannel} />
      </div>
    </div>
  );
};

export default ChatPage;
