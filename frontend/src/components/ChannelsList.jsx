import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import ChannelItem from "./ChannelItem";
import DropdownMenu from "./DropdownMenu";
import { useGetChannelsQuery } from "../api/chatApi";
import { setCurrentChannel } from "../slices/currentChannelSlice";

const ChannelList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { data: channels, isLoading, error } = useGetChannelsQuery();

  useEffect(() => {
    if (channels) {
      dispatch(setCurrentChannel(channels[0]));
    }
  }, []);

  if (isLoading) return <div>{t("loadingChannels")}</div>;
  if (error) toast.error(t("toastsTexts.error"));

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels &&
        channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <div role="group" className="d-flex dropdown btn-group">
              {!channel.removable && <ChannelItem channel={channel} />}
              {channel.removable && <DropdownMenu channel={channel} />}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ChannelList;
