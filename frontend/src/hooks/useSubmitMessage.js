import filter from 'leo-profanity';
import { toast } from 'react-toastify';

const useSubmitMessage = (addMessage, currentChannel, username, t) => async (e) => {
  e.preventDefault();
  const filtredMessage = filter.clean(e.target.body.value);
  const newMessage = {
    body: filtredMessage,
    channelId: currentChannel?.id,
    username,
  };

  try {
    await addMessage(newMessage);
    e.target.body.value = '';
  } catch (err) {
    toast.error(t('toastsTexts.error'));
  }
};

export default useSubmitMessage;
