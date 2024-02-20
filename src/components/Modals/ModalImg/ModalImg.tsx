import React, { useState, useRef } from 'react';
import { ImageContainer, ModalImageContainer } from './ModalImg.style';
import { ReactComponent as CloseIcon } from './../../../assets/Icons/Closeicons.svg';
import { ErrorMessage } from '../../Input/Input.style';

interface ModalImgProps {
  src: string;
  onFileChange: (file: File | null) => void;
}

const ModalImg: React.FC<ModalImgProps> = ({ src, onFileChange }) => {
  const [srcImg, setSrcImg] = useState<string>(src);
  const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hasError = !!inputErrorMessage;

  const handleRemoveImage = () => {
    setSrcImg('');
    setInputErrorMessage('');
    onFileChange(null);
  };

  const handleSelectImage = (file: File) => {
    setInputErrorMessage('');
    onFileChange(file);
    setSrcImg(URL.createObjectURL(file));
  };

  const handleValidation = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5242880; // 5MB in bytes
    if (!allowedTypes.includes(file.type)) {
      setInputErrorMessage('Tipo de arquivo não permitido');
      return false;
    }
    if (file.size > maxSize) {
      setInputErrorMessage('Arquivo muito grande');
      return false;
    }
    return true;
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && handleValidation(selectedFile)) {
      handleSelectImage(selectedFile);
    }
  };

  return (
    <ModalImageContainer data-testid="modal-image-container">
      <ImageContainer hasError={!!inputErrorMessage} srcImg={srcImg}>
        {srcImg ? (
          <div>
            <CloseIcon
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'white',
                padding: '5px',
                borderRadius: '50%',
              }}
              onClick={() => handleRemoveImage()}
            ></CloseIcon>
            <img src={srcImg} alt="Image" />
          </div>
        ) : (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg, .jpeg, .png, .webp"
              multiple={false}
              onChange={handleFileInputChange}
              data-testid="file-input"
            />
            <CloseIcon
              style={{
                backgroundColor: hasError ? '#ffcdcd' : 'ece9fd',
                color: hasError ? '#ff0000' : '#3f3d56',
                padding: '5px',
                borderRadius: '50%',
                rotate: '-45deg',
              }}
              onClick={() => fileInputRef.current?.click()}
            ></CloseIcon>
          </>
        )}
      </ImageContainer>
      {inputErrorMessage && (
        <ErrorMessage data-testid="input-error">
          {inputErrorMessage}
        </ErrorMessage>
      )}
    </ModalImageContainer>
  );
};

export default ModalImg;
