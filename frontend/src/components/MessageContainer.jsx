import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useGetMessagesQuery, useSendMessageMutation } from '../api/chatApi';
import useSubmitMessage from '../hooks/useSubmitMessage';
import MessagesBox from './MessagesBox';
import MessageForm from './MessageForm';
import getCurrentChannel from '../store/slices/currentChannelSelectors';
import { getUsername } from '../store/slices/authSelectors';

const MessageContainer = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(getCurrentChannel);
  const username = useSelector(getUsername);
  const [sendMessage, { isLoading: sendMessageLoading }] = useSendMessageMutation();
  const { data: messages, isLoading: messagesLoading } = useGetMessagesQuery();
  const channelMessages = messages?.filter((message) => message.channelId === currentChannel?.id);
  const handleSubmit = useSubmitMessage(sendMessage, currentChannel, username, t);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {`# ${currentChannel ? currentChannel.name : ''}`}
            </b>
          </p>
          <span className="text-muted">
            {channelMessages
              && t('messages.key', { count: channelMessages.length })}
          </span>
        </div>
        <MessagesBox channelMessages={channelMessages} isLoading={messagesLoading} />
        <MessageForm handleSubmit={handleSubmit} isLoading={sendMessageLoading} />
      </div>
    </div>
  );
};

export default MessageContainer;
