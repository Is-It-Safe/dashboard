import { render, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal component', () => {
  it('renders the modal content correctly when showModal is true', () => {
    const headerText = 'Modal Header';
    const contentText = 'Modal Content';
    const setShowModalMock = jest.fn();
    const { getByText } = render(
      <Modal
        header={headerText}
        showModal={true}
        setShowModal={setShowModalMock}
      >
        {contentText}
      </Modal>
    );

    expect(getByText(headerText)).toBeInTheDocument();
    expect(getByText(contentText)).toBeInTheDocument();
  });

  it('does not render the modal content when showModal is false', async () => {
    const headerText = 'Modal Header';
    const contentText = 'Modal Content';
    const setShowModalMock = jest.fn();
    const { findByTestId } = render(
      <Modal
        header={headerText}
        showModal={false}
        setShowModal={setShowModalMock}
      >
        {contentText}
      </Modal>
    );

    const modal = await findByTestId('modal-container');

    expect(modal).toHaveStyle({
      display: 'none',
    });
  });

  it('calls setShowModal with false when close icon is clicked', async () => {
    const setShowModalMock = jest.fn();
    const { findByTestId } = render(
      <Modal showModal={true} setShowModal={setShowModalMock}>
        test
      </Modal>
    );

    const closeIcon = await findByTestId('close-modal');
    fireEvent.click(closeIcon);

    expect(setShowModalMock).toHaveBeenCalledWith(false);
  });
});
