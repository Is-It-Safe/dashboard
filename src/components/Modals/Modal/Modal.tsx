import { ReactNode } from 'react';
import { Container, Content, Header } from './Modal.styles';

type IModal = {
  header?: ReactNode;
  children: ReactNode;
  showModal: boolean;
};

const Modal = ({ header, children, showModal }: IModal) => {
  return (
    <>
      {showModal && (
        <Container data-testid="modal-container" aria-modal role="dialog">
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
