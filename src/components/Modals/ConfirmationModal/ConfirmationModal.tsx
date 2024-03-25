import { Modal } from '../Modal/Modal';
import { ErrorMessage, SuccessMessage } from './ConfirmationModal.styles';

type IConfirmationModal = {
  showmodal: boolean;
  hasError?: boolean;
};

const ConfirmationModal = ({ showmodal, hasError }: IConfirmationModal) => {
  return (
    <Modal showModal={showmodal}>
      {hasError ? (
        <ErrorMessage>
          Ocorreu um erro ao atualizar o local. Por favor, tente novamente.
        </ErrorMessage>
      ) : (
        <SuccessMessage>Alterações feitas com sucesso</SuccessMessage>
      )}
    </Modal>
  );
};

export { ConfirmationModal };
