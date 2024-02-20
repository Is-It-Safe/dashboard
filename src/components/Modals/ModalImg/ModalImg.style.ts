import styled from 'styled-components';

interface ImageContainerProps {
  srcImg: string;
  hasError: boolean;
}

export const ModalImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ImageContainer = styled.div<ImageContainerProps>`
  width: 100%;
  aspect-ratio: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.srcImg
      ? 'none'
      : props.hasError
      ? '2px dashed #eb3d3d'
      : '1px dashed #9D8DF4'};
  img {
    width: 100%;
    height: auto;
    border-radius: 6px;
  }
  div {
    position: relative;
  }
  input {
    display: none;
  }
`;
