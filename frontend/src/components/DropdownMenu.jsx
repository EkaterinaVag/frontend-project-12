import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ChannelItem from './ChannelItem';
import {
  openRenameChannelModal,
  openRemoveChannelModal,
} from '../slices/modalSlice';

const DropdownMenu = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannel = useSelector((state) => state.currentChannel.currentChannel);

  const handleRemoveChannel = () => dispatch(openRemoveChannelModal(channel));

  const handleRenameChannel = () => dispatch(openRenameChannelModal(channel));

  return (
    <Dropdown as={ButtonGroup} className="me-2 w-100">
      <ChannelItem channel={channel} />
      <Dropdown.Toggle
        split
        variant={currentChannel?.id === channel.id ? 'secondary' : ''}
        id="channelDropdown"
      >
        <span className="visually-hidden">{t('dropdown')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemoveChannel}>
          {t('buttons.remove')}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel}>
          {t('buttons.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
