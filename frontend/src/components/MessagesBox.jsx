import { useTranslation } from 'react-i18next';

const MessagesBox = ({ channelMessages, isLoading }) => {
  const { t } = useTranslation();

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {isLoading && <p>{t('messages.loading')}</p>}
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
};

export default MessagesBox;
