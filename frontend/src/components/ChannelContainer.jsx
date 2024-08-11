import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { openAddChannelModal } from '../store/slices/modalSlice';
import ChannelsBox from './ChannelsBox';

const ChannelContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => dispatch(openAddChannelModal())}
        >
          {t('plus')}
          <span className="visually-hidden">{t('plus')}</span>
        </button>
      </div>
      <ChannelsBox />
    </div>
  );
};

export default ChannelContainer;
