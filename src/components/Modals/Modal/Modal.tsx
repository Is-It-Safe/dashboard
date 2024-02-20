import { ReactNode } from 'react';
import { Container, Content, Header } from './Modal.styles';
import { Frame } from '../../../layout';

type IModal = {
  header?: ReactNode;
  children: ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ header, children, showModal, setShowModal }: IModal) => {
  return (
    <>
      {showModal && (
        <Container data-testid="modal-container">
          <Content>
            <Header>{header}</Header>
            {children}
          </Content>
        </Container>
      )}
    </>
  );
};

export { Modal };
