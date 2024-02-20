import styled from 'styled-components';

export const TitleContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h4`
  font-size: 1.2em;
  font-weight: 600;
  color: #362e5d;
`;

export const CloseIcon = styled.div`
  position: absolute;
  right: 0px;
  cursor: pointer;
`;
export const SuccessMessage = styled.h4`
  color: green;
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
`;
export const ErrorMessage = styled.h4`
  color: red;
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
`;
