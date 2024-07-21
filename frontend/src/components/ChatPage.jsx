import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openAddChannelModal } from "../slices/modalSlice";
import { setupSocket } from "../api/chatApi";
import Messages from "./Messages";
import ChannelList from "./ChannelsList";

const ChatPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = setupSocket();
    return cleanup();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

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
          </div>
          <ChannelList />
        </div>
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
