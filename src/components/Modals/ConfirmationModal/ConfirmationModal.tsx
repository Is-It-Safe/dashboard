import { useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { ErrorMessage, SuccessMessage } from './ConfirmationModal.styles';
import { set } from 'react-hook-form';

type IConfirmationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  hasError?: boolean;
};

const ConfirmationModal = ({
  showmodal,
  setShowModal,
  hasError,
}: IConfirmationModal) => {
  return (
    <Modal showModal={showmodal} setShowModal={setShowModal}>
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
