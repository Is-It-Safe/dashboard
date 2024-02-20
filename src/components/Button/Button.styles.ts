import styled from 'styled-components';
import { ButtonProps } from './Button';

export const BasicButton = styled.button.attrs((props) => ({
  type: props.type || 'button',
}))<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${(props) => (props.primary ? '#5C45ED' : '#ffffff')};
  color: ${(props) => (props.primary ? '#FAF9FF' : '#190a33')};
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  width: ${(props) => (props.grow ? '' : 'fit-content')};
  flex: ${(props) => (props.grow ? '1' : '')};
  max-height: ${(props) => (props.grow ? '56px' : '')};
`;

export const TextButton = styled.div`
  height: fit-content;
  width: fit-content;
`;
