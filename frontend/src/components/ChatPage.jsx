import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openAddChannelModal, closeAddChannelModal } from "../modalSlice";
import {
  useGetChannelsQuery,
  useAddChannelMutation,
  setupSocket,
} from "../api/chatApi";
import Messages from "./Messages";
import AddChannelModal from "./AddChannelModal";
import ChannelManagement from "./ ChannelManagement";


const ChatPage = () => {
  const dispatch = useDispatch();
  const { data: channels, isLoading, error, refetch } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const showAddChannelModal = useSelector(
    (state) => state.modal.showAddChannelModal
  );

  const [currentChannel, setCurrentChannel] = useState({
    id: "1",
    name: "general",
    removable: false,
  });

  useEffect(() => {
    const cleanup = setupSocket();

    return cleanup();
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

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
              onClick={() => dispatch(openAddChannelModal())}
            >
              +<span className="visually-hidden">+</span>
            </button>
            {showAddChannelModal && (
              <AddChannelModal
                onHide={() => dispatch(closeAddChannelModal())}
                addChannel={addChannel}
              />
            )}
          </div>
          <ul
            id="channels-box"
            className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {channels &&
              channels.map((channel) => (
                <li className="nav-item w-100" key={channel.id}>
       
                  <div role="group" className="d-flex dropdown btn-group">
                    <button
                      type="button"
                      className={`w-100 rounded-0 text-start btn ${
                        currentChannel.id === channel.id ? "btn-secondary" : ""
                      }`}
                      onClick={() => setCurrentChannel(channel)}
                    >
                      <span className="me-1">#</span>
                      {channel.name}
                    </button>
                    {channel.removable && (
                      <ChannelManagement
                        currentChannel={currentChannel}
                        channel={channel}
                      />
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <Messages channel={currentChannel} />
      </div>
    </div>
  );
};

export default ChatPage;
