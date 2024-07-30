import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { useGetChannelsQuery } from '../api/chatApi';
import { setCurrentChannel } from '../slices/currentChannelSlice';
import ChannelsList from './ChannelsList';

const ChannelsBox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannel = useSelector(
    (state) => state.currentChannel.currentChannel,
  );

  const { data: channels, isLoading, error } = useGetChannelsQuery();

  useEffect(() => {
    if (!currentChannel && channels) {
      dispatch(setCurrentChannel(channels[0]));
    }
  }, [channels, currentChannel, dispatch]);

  if (error) toast.error(t('toastsTexts.error'));

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      <ChannelsList channels={channels} isLoading={isLoading} />
    </ul>
  );
};

export default ChannelsBox;
