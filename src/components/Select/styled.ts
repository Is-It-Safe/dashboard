import styled from 'styled-components';

type ISelect = {
  hasError?: boolean;
  isFocused?: boolean;
  isSelected?: boolean;
};

export const BasicSelect = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  gap: 4px;
  width: 100%;
`;

export const LabelSelect = styled.div<ISelect>`
  color: ${(props) => (props.hasError ? '#EB3D3D' : '#5b3cf1')};
  position: absolute;
  top: -12px;
  left: 8px;
  background-color: white;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 24px;
  z-index: 1;
`;

export const ErrorMessage = styled.span`
  color: #eb3d3d;
  font-size: 14px;
  font-weight: 600;
`;

export const StyledControl = styled.div<ISelect>`
  border-color: ${(props) =>
    props.hasError ? '#eb3d3d' : props.isFocused ? '#6200EE' : '#9D8DF4'};
  font-weight: ${(props) => (props.isFocused ? 600 : 400)};
  border-width: ${(props) => (props.isFocused ? '0.2px' : '1px')};
`;

export const StyledOption = styled.div<ISelect>`
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#a0a0a0' : 'white')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};

  &:hover {
    background-color: '#9D8DF4';
    color: 'white';
  }
`;
