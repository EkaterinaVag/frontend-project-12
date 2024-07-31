import { Button } from 'react-bootstrap';

const ModalForm = ({
  onHide,
  onSubmit,
  submitLabelKey,
  isLoading,
  t,
  children,
}) => (
  <form onSubmit={onSubmit}>
    {children}
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '5px',
        marginTop: '15px',
      }}
    >
      <Button variant="secondary" onClick={onHide}>
        {t('buttons.cancel')}
      </Button>
      <Button variant="primary" type="submit" disabled={isLoading}>
        {t(submitLabelKey)}
      </Button>
    </div>
  </form>
);

export default ModalForm;
