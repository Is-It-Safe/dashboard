import { render, screen, fireEvent } from '@testing-library/react';
import ModalImg from './ModalImg';

jest.mock('../../assets/Icons/Closeicons.svg', () => ({
  ReactComponent: () => <svg data-testid="close-icon" />,
}));

const createObjectURLMock = jest.fn();
URL.createObjectURL = createObjectURLMock;

describe('ModalImg Component', () => {
  it('renders correctly with no image source', () => {
    render(<ModalImg src="" onFileChange={() => {}} />);

    const modalImageContainer = screen.getByTestId('modal-image-container');
    expect(modalImageContainer).toBeInTheDocument();

    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).toBeInTheDocument();
  });

  it('renders correctly with an image source', () => {
    const src = 'mock-image-source.jpg';
    render(<ModalImg src={src} onFileChange={() => {}} />);

    const modalImageContainer = screen.getByTestId('modal-image-container');
    expect(modalImageContainer).toBeInTheDocument();

    const image = screen.getByAltText('Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', src);

    const closeIcon = screen.getByTestId('close-icon');
    expect(closeIcon).toBeInTheDocument();
  });

  it('handles file input change correctly', () => {
    const onFileChangeMock = jest.fn();
    render(<ModalImg src="" onFileChange={onFileChangeMock} />);

    const fileInput = screen.getByTestId('file-input');

    const file = new File(['mock-image'], 'mock-image.jpg', {
      type: 'image/jpeg',
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(onFileChangeMock).toHaveBeenCalledWith(file);

    expect(createObjectURLMock).toHaveBeenCalledWith(file);
  });
});
