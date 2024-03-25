import { render } from '@testing-library/react';
import { Modal } from './Modal';

afterEach(() => {
  jest.resetAllMocks();
});

const mockHeaderText = 'Modal Header';
const mockContentText = 'Modal Content';

describe('Modal component', () => {
  it('should render the modal content correctly when showModal is true', () => {
    const { getByText, queryByTestId } = render(
      <Modal header={mockHeaderText} showModal={true}>
        {mockContentText}
      </Modal>
    );

    expect(getByText(mockHeaderText)).toBeInTheDocument();
    expect(getByText(mockContentText)).toBeInTheDocument();
    expect(queryByTestId('modal-container')).toBeInTheDocument();
  });

  it('should not render the modal content when showModal is false', () => {
    const { queryByText, queryByTestId } = render(
      <Modal header={mockHeaderText} showModal={false}>
        {mockContentText}
      </Modal>
    );

    expect(queryByText(mockHeaderText)).not.toBeInTheDocument();
    expect(queryByText(mockContentText)).not.toBeInTheDocument();
    expect(queryByTestId('modal-container')).not.toBeInTheDocument();
  });

  it('should verify if the modal is accessible', () => {
    const { getByTestId, getByRole } = render(
      <Modal header={mockHeaderText} showModal={true}>
        {mockContentText}
      </Modal>
    );
    const modal = getByTestId('modal-container');
    const dialogRole = getByRole('dialog');

    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('role', 'dialog');
    expect(dialogRole).toBeInTheDocument();
  });
});
